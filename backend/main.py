from __future__ import annotations

import csv
import hashlib
import json
import os
from pathlib import Path
from typing import Dict, List, Optional

from fastapi import FastAPI, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field


# --------------------------------------------------------------------------- #
# Configuration
# --------------------------------------------------------------------------- #
BASE_DIR = Path(__file__).parent
STATE_FILE = BASE_DIR / "db.json"
PRICES_FILE = BASE_DIR / "prices.csv"

ADMIN_TOKEN = os.getenv("ADMIN_TOKEN", "changeme").strip()
INITIAL_CASH = float(os.getenv("INITIAL_CASH", "10000000"))  # 10,000,000₩ 기본값
VISIBLE_TICKERS = int(os.getenv("VISIBLE_TICKERS", "6"))


# --------------------------------------------------------------------------- #
# Utility loaders
# --------------------------------------------------------------------------- #
def load_prices() -> Dict[int, Dict[str, float]]:
    if not PRICES_FILE.exists():
        raise RuntimeError(f"prices.csv not found at {PRICES_FILE}")

    prices: Dict[int, Dict[str, float]] = {}
    with PRICES_FILE.open(newline="", encoding="utf-8") as fh:
        reader = csv.DictReader(fh)
        for row in reader:
            day = int(row["day"])
            ticker = row["ticker"]
            price = float(row["price"])
            prices.setdefault(day, {})[ticker] = price

    if VISIBLE_TICKERS > 0:
        trimmed: Dict[int, Dict[str, float]] = {}
        for day, day_prices in prices.items():
            trimmed[day] = dict(list(day_prices.items())[:VISIBLE_TICKERS])
        prices = trimmed

    if not prices:
        raise RuntimeError("prices.csv must contain at least one day of prices.")
    return prices


def normalize_user_id(user_id: str) -> str:
    if not isinstance(user_id, str):
        return ""
    return user_id.strip().upper()


def ensure_state_defaults(data: Dict) -> Dict:
    data.setdefault("current_day", min(prices_by_day))
    data.setdefault("users", {})
    data.setdefault("accounts", {})
    data.setdefault("investments", {})

    normalized_users = {
        normalize_user_id(uid): payload for uid, payload in data["users"].items()
    }
    data["users"] = normalized_users

    normalized_accounts = {
        normalize_user_id(uid): payload for uid, payload in data["accounts"].items()
    }
    data["accounts"] = normalized_accounts
    return data


def load_state() -> Dict:
    if not STATE_FILE.exists() or STATE_FILE.stat().st_size == 0:
        # Initialize empty state
        default_state = {
            "current_day": min(prices_by_day),
            "users": {},
            "accounts": {},
            "investments": {},
        }
        save_state(default_state)
        return default_state

    with STATE_FILE.open(encoding="utf-8") as fh:
        return ensure_state_defaults(json.load(fh))


def save_state(data: Dict) -> None:
    STATE_FILE.parent.mkdir(parents=True, exist_ok=True)
    with STATE_FILE.open("w", encoding="utf-8") as fh:
        json.dump(data, fh, ensure_ascii=False, indent=2)


prices_by_day = load_prices()
state = load_state()


# --------------------------------------------------------------------------- #
# Helpers
# --------------------------------------------------------------------------- #
def get_price(day: int, ticker: str) -> float:
    try:
        return prices_by_day[day][ticker]
    except KeyError as exc:
        raise HTTPException(400, detail=f"Price not available for {ticker} on day {day}") from exc


def get_tickers_for_day(day: int) -> List[str]:
    try:
        return list(prices_by_day[day].keys())
    except KeyError as exc:
        raise HTTPException(400, detail=f"No price data for day {day}") from exc


def get_accounts() -> Dict[str, Dict[str, str]]:
    return state.setdefault("accounts", {})


def get_investments() -> Dict[str, List[Dict]]:
    return state.setdefault("investments", {})


def hash_password(normalized_user_id: str, password: str) -> str:
    base = f"{normalized_user_id}:{password}".encode("utf-8")
    return hashlib.sha256(base).hexdigest()


def ensure_user(user_id: str) -> Dict:
    normalized_user_id = normalize_user_id(user_id)
    if not normalized_user_id:
        raise HTTPException(400, detail="user_id is required")

    users = state.setdefault("users", {})
    if normalized_user_id not in users:
        holdings = {ticker: 0.0 for ticker in get_tickers_for_day(state["current_day"])}
        users[normalized_user_id] = {"cash": INITIAL_CASH, "holdings": holdings}
        save_state(state)
    return users[normalized_user_id]


def portfolio_value(user_id: str, day: Optional[int] = None) -> float:
    user = ensure_user(user_id)
    day = day or state["current_day"]

    total = user["cash"]
    for ticker, qty in user["holdings"].items():
        price = prices_by_day.get(day, {}).get(ticker)
        if price is not None:
            total += qty * price
    return round(total, 2)


# --------------------------------------------------------------------------- #
# Schemas
# --------------------------------------------------------------------------- #
class Order(BaseModel):
    ticker: str = Field(..., min_length=1)
    amount_krw: float


class OrderRequest(BaseModel):
    user_id: str = Field(..., min_length=1)
    orders: List[Order]


class AuthRequest(BaseModel):
    user_id: str = Field(..., min_length=1)
    password: str = Field(..., min_length=4)


# --------------------------------------------------------------------------- #
# FastAPI app
# --------------------------------------------------------------------------- #
app = FastAPI(title="Stock Simulation Backend", version="0.1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



def require_authentication(user_id: str, password: Optional[str]) -> str:
    normalized_user_id = normalize_user_id(user_id)
    if not normalized_user_id:
        raise HTTPException(400, detail="user_id is required")

    accounts = get_accounts()
    record = accounts.get(normalized_user_id)
    if not record:
        raise HTTPException(401, detail="등록되지 않은 사용자입니다.")

    if password is None:
        raise HTTPException(401, detail="비밀번호가 필요합니다.")

    expected_hash = record.get("password_hash")
    if expected_hash != hash_password(normalized_user_id, password):
        raise HTTPException(401, detail="비밀번호가 올바르지 않습니다.")
    return normalized_user_id


def record_investment(user_id: str, day: int, orders: List[Order]) -> None:
    investments = get_investments()
    entries = investments.setdefault(user_id, [])
    entries.append(
        {
            "day": day,
            "orders": [order.model_dump() for order in orders],
        }
    )
    # Keep latest 30 records per user to avoid uncontrolled growth
    if len(entries) > 30:
        investments[user_id] = entries[-30:]


@app.get("/health")
def health():
    return {"ok": True}


@app.get("/prices")
def get_prices(day: Optional[int] = None):
    d = day or state["current_day"]
    if d not in prices_by_day:
        raise HTTPException(400, detail=f"Day {d} is out of range.")
    return {"day": d, "prices": prices_by_day[d]}


@app.post("/signup")
def signup(req: AuthRequest):
    user_id = normalize_user_id(req.user_id)
    accounts = get_accounts()
    if user_id in accounts:
        raise HTTPException(400, detail="이미 등록된 아이디입니다.")

    accounts[user_id] = {"password_hash": hash_password(user_id, req.password)}
    ensure_user(user_id)
    save_state(state)
    return {"ok": True, "message": "가입이 완료되었습니다."}


@app.post("/login")
def login(req: AuthRequest):
    user_id = require_authentication(req.user_id, req.password)
    user = ensure_user(user_id)
    day = state["current_day"]
    return {
        "ok": True,
        "current_day": day,
        "user": {
            "cash": round(user["cash"], 2),
            "holdings": user["holdings"],
            "portfolio_value": portfolio_value(user_id, day),
        },
    }


@app.get("/state")
def get_state(user_id: str, x_auth_password: str = Header(...)):
    normalized_user_id = require_authentication(user_id, x_auth_password)
    u = ensure_user(normalized_user_id)
    d = state["current_day"]
    investments = get_investments().get(normalized_user_id, [])
    last_investment = investments[-1] if investments else None

    return {
        "current_day": d,
        "user": {
            "cash": round(u["cash"], 2),
            "holdings": u["holdings"],
            "portfolio_value": portfolio_value(normalized_user_id, d),
        },
        "last_investment": last_investment,
    }


@app.post("/order")
def post_order(req: OrderRequest, x_auth_password: str = Header(...)):
    if not req.orders:
        raise HTTPException(400, detail="at least one order is required")

    user_id = require_authentication(req.user_id, x_auth_password)
    u = ensure_user(user_id)
    day = state["current_day"]
    valid_tickers = set(get_tickers_for_day(day))

    for o in req.orders:
        if o.ticker not in valid_tickers:
            raise HTTPException(400, detail=f"Unknown ticker: {o.ticker}")

    for o in req.orders:
        price = get_price(day, o.ticker)
        if o.amount_krw > 0:
            if u["cash"] + 1e-9 < o.amount_krw:
                raise HTTPException(400, detail=f"Not enough cash for {o.ticker}")
            qty = o.amount_krw / price
            u["cash"] -= o.amount_krw
            u["holdings"][o.ticker] += qty
        elif o.amount_krw < 0:
            qty = abs(o.amount_krw) / price
            if u["holdings"].get(o.ticker, 0.0) + 1e-9 < qty:
                raise HTTPException(400, detail=f"Not enough holdings for {o.ticker}")
            u["holdings"][o.ticker] -= qty
            u["cash"] += abs(o.amount_krw)

    record_investment(user_id, day, req.orders)
    save_state(state)
    return {
        "ok": True,
        "user": {
            "cash": round(u["cash"], 2),
            "holdings": u["holdings"],
            "portfolio_value": portfolio_value(user_id),
        },
    }


@app.post("/admin/advance")
def admin_advance(x_admin_token: str = Header(None)):
    if not ADMIN_TOKEN:
        raise HTTPException(500, detail="ADMIN_TOKEN is not configured on the server.")
    if x_admin_token != ADMIN_TOKEN:
        raise HTTPException(403, detail="Invalid admin token")

    next_day = state["current_day"] + 1
    if next_day not in prices_by_day:
        raise HTTPException(400, detail="No more days defined in prices.csv")

    state["current_day"] = next_day

    tickers = set(get_tickers_for_day(next_day))
    for user in state["users"].values():
        for ticker in tickers:
            user["holdings"].setdefault(ticker, 0.0)

    save_state(state)
    return {"ok": True, "current_day": state["current_day"]}
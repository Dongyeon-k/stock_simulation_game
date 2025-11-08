import json
# ------------------------------
@app.get("/health")
def health():
return {"ok": True}


@app.get("/prices")
def get_prices(day: Optional[int] = None):
d = day or state["current_day"]
return {"day": d, "prices": prices_by_day.get(d, {})}


@app.get("/state")
def get_state(user_id: str):
u = ensure_user(user_id)
d = state["current_day"]
return {
"current_day": d,
"user": {
"cash": round(u["cash"], 2),
"holdings": u["holdings"],
"portfolio_value": portfolio_value(user_id),
}
}


@app.post("/order")
def post_order(req: OrderRequest):
u = ensure_user(req.user_id)
day = state["current_day"]


# 종목 존재 체크
valid_tickers = set(get_tickers_for_day(day))
for o in req.orders:
if o.ticker not in valid_tickers:
raise HTTPException(400, detail=f"Unknown ticker: {o.ticker}")


# 처리
for o in req.orders:
price = get_price(day, o.ticker)
if o.amount_krw > 0: # 매수
if u["cash"] < o.amount_krw:
raise HTTPException(400, detail=f"Not enough cash for {o.ticker}")
qty = o.amount_krw / price
u["cash"] -= o.amount_krw
u["holdings"][o.ticker] += qty
elif o.amount_krw < 0: # 매도
qty = abs(o.amount_krw) / price
if u["holdings"][o.ticker] < qty - 1e-9:
raise HTTPException(400, detail=f"Not enough holdings for {o.ticker}")
u["holdings"][o.ticker] -= qty
u["cash"] += abs(o.amount_krw)
# 0은 무시


save_state(state)
return {"ok": True, "user": {"cash": round(u["cash"],2), "holdings": u["holdings"], "portfolio_value": portfolio_value(req.user_id)}}


@app.post("/admin/advance")
def admin_advance(x_admin_token: str = Header(None)):
if x_admin_token != ADMIN_TOKEN:
raise HTTPException(403, detail="Invalid admin token")


# 다음 day로 이동
next_day = state["current_day"] + 1
if next_day not in prices_by_day:
raise HTTPException(400, detail="No more days defined in prices.csv")


state["current_day"] = next_day


# 새 day에 종목 구성이 바뀌었다면 보유 수량 키 보정
tickers = set(get_tickers_for_day(next_day))
for u in state["users"].values():
# 없는 종목은 무시(그대로 보유 가능), 새 종목은 0으로 추가
for t in tickers:
u["holdings"].setdefault(t, 0.0)


save_state(state)
return {"ok": True, "current_day": state["current_day"]}
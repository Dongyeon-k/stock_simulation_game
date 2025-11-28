import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { auth, db } from "../firebase";
import {
  DEFAULT_VISIBLE_TICKERS,
  getVisiblePrices,
  INITIAL_CASH,
  LAST_AVAILABLE_DAY,
  PRICES_BY_DAY,
} from "../data/prices";
import { sha256Hex } from "../utils/hash";

const DEFAULT_ADMIN_TOKEN_HASH = "057ba03d6c44104863dc7361fe4578965d1887360f90a0895882e58a6248fc86";
const MAX_INVESTMENT_HISTORY = 30;

const stateRef = () => doc(db, "meta", "state");
const userRef = (userId) => doc(db, "users", userId);
const investmentsCol = (userId) => collection(db, "users", userId, "investments");

const normalizeUserId = (value) => value?.trim().toUpperCase() ?? "";
const pseudoEmailFor = (userId) => `${userId}@stocksimgame.local`;

function ensureOrdersValid(prices, orders) {
  orders.forEach((order) => {
    if (!prices[order.ticker]) {
      throw new Error(`알 수 없는 종목입니다: ${order.ticker}`);
    }
    if (order.amount_krw === 0) {
      throw new Error("거래 금액은 0일 수 없습니다.");
    }
  });
}

function calculatePortfolioValue(userData, prices) {
  const holdings = userData.holdings || {};
  let total = userData.cash ?? INITIAL_CASH;
  Object.entries(holdings).forEach(([ticker, qty]) => {
    if (!prices[ticker]) return;
    total += qty * prices[ticker];
  });
  return Math.round(total * 100) / 100;
}

async function ensureStateDocument() {
  const ref = stateRef();
  const snap = await getDoc(ref);
  if (snap.exists()) {
    return snap.data();
  }

  const defaults = {
    currentDay: 1,
    visibleTickers: DEFAULT_VISIBLE_TICKERS,
    initialCash: INITIAL_CASH,
    adminTokenHash: DEFAULT_ADMIN_TOKEN_HASH,
    updatedAt: serverTimestamp(),
  };
  await setDoc(ref, defaults);
  return defaults;
}

async function ensureUserPortfolio(userId, currentDay, visibleTickers = DEFAULT_VISIBLE_TICKERS) {
  const ref = userRef(userId);
  await runTransaction(db, async (txn) => {
    const snapshot = await txn.get(ref);
    const prices = getVisiblePrices(currentDay, visibleTickers);
    const tickers = Object.keys(prices);

    if (!snapshot.exists()) {
      const holdings = Object.fromEntries(tickers.map((ticker) => [ticker, 0]));
      txn.set(ref, {
        cash: INITIAL_CASH,
        holdings,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return;
    }

    const data = snapshot.data();
    const holdings = { ...(data.holdings || {}) };
    let changed = false;
    tickers.forEach((ticker) => {
      if (typeof holdings[ticker] !== "number") {
        holdings[ticker] = 0;
        changed = true;
      }
    });
    if (changed) {
      txn.update(ref, { holdings, updatedAt: serverTimestamp() });
    }
  });
}

async function fetchLastInvestment(userId) {
  const q = query(investmentsCol(userId), orderBy("savedAt", "desc"), limit(1));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const docSnap = snapshot.docs[0];
  return { id: docSnap.id, ...docSnap.data() };
}

async function trimInvestmentHistory(userId) {
  const q = query(investmentsCol(userId), orderBy("savedAt", "desc"));
  const snapshot = await getDocs(q);
  if (snapshot.size <= MAX_INVESTMENT_HISTORY) return;
  const docs = snapshot.docs;
  const deletions = docs.slice(MAX_INVESTMENT_HISTORY);
  await Promise.all(deletions.map((docSnap) => deleteDoc(docSnap.ref)));
}

export async function signUpWithUserId(userId, password) {
  const normalized = normalizeUserId(userId);
  if (!normalized) {
    throw new Error("아이디를 입력해주세요.");
  }
  await createUserWithEmailAndPassword(auth, pseudoEmailFor(normalized), password);
  const state = await ensureStateDocument();
  await ensureUserPortfolio(normalized, state.currentDay, state.visibleTickers);
  return normalized;
}

export async function signInWithUserId(userId, password) {
  const normalized = normalizeUserId(userId);
  if (!normalized) {
    throw new Error("아이디를 입력해주세요.");
  }
  await signInWithEmailAndPassword(auth, pseudoEmailFor(normalized), password);
  const state = await ensureStateDocument();
  await ensureUserPortfolio(normalized, state.currentDay, state.visibleTickers);
  return normalized;
}

export async function signOutCurrentUser() {
  await signOut(auth);
}

export async function fetchDashboardState(userId) {
  const normalized = normalizeUserId(userId);
  const stateDoc = await ensureStateDocument();
  const { currentDay, visibleTickers = DEFAULT_VISIBLE_TICKERS } = stateDoc;
  await ensureUserPortfolio(normalized, currentDay, visibleTickers);

  const userSnap = await getDoc(userRef(normalized));
  if (!userSnap.exists()) {
    throw new Error("사용자 정보를 찾을 수 없습니다.");
  }
  const userData = userSnap.data();
  const prices = getVisiblePrices(currentDay, visibleTickers);
  const lastInvestment = await fetchLastInvestment(normalized);

  return {
    currentDay,
    prices,
    visibleTickers,
    user: {
      cash: userData.cash ?? INITIAL_CASH,
      holdings: userData.holdings || {},
      portfolioValue: calculatePortfolioValue(userData, prices),
    },
    lastInvestment,
  };
}

export async function submitUserOrders(userId, orders) {
  const normalized = normalizeUserId(userId);
  const stateDoc = await ensureStateDocument();
  const { currentDay, visibleTickers = DEFAULT_VISIBLE_TICKERS } = stateDoc;
  const prices = getVisiblePrices(currentDay, visibleTickers);

  await ensureUserPortfolio(normalized, currentDay, visibleTickers);

  ensureOrdersValid(prices, orders);

  await runTransaction(db, async (txn) => {
    const ref = userRef(normalized);
    const snap = await txn.get(ref);
    if (!snap.exists()) {
      throw new Error("사용자 정보가 없습니다.");
    }
    const data = snap.data();
    const holdings = { ...(data.holdings || {}) };
    let cash = data.cash ?? INITIAL_CASH;

    orders.forEach(({ ticker, amount_krw }) => {
      const price = prices[ticker];
      if (amount_krw > 0) {
        if (cash + 1e-9 < amount_krw) {
          throw new Error(`${ticker} 매수 금액이 보유 현금을 초과합니다.`);
        }
        const qty = amount_krw / price;
        holdings[ticker] = (holdings[ticker] || 0) + qty;
        cash -= amount_krw;
      } else {
        const qty = Math.abs(amount_krw) / price;
        if ((holdings[ticker] || 0) + 1e-9 < qty) {
          throw new Error(`${ticker} 매도 수량이 보유량을 초과합니다.`);
        }
        holdings[ticker] -= qty;
        cash += Math.abs(amount_krw);
      }
    });

    txn.update(ref, {
      cash: Math.round(cash * 100) / 100,
      holdings,
      updatedAt: serverTimestamp(),
    });
  });

  await addDoc(investmentsCol(normalized), {
    day: stateDoc.currentDay,
    orders,
    savedAt: serverTimestamp(),
  });
  await trimInvestmentHistory(normalized);

  return fetchDashboardState(normalized);
}

export async function advanceDayWithToken(token) {
  if (!token) {
    throw new Error("관리자 토큰을 입력하세요.");
  }
  const providedHash = await sha256Hex(token.trim());

  const nextDay = await runTransaction(db, async (txn) => {
    const ref = stateRef();
    const snap = await txn.get(ref);
    const state = snap.exists()
      ? snap.data()
      : {
          currentDay: 1,
          visibleTickers: DEFAULT_VISIBLE_TICKERS,
          adminTokenHash: DEFAULT_ADMIN_TOKEN_HASH,
        };

    const expectedHash = state.adminTokenHash || DEFAULT_ADMIN_TOKEN_HASH;
    if (providedHash !== expectedHash) {
      throw new Error("관리자 토큰이 올바르지 않습니다.");
    }

    const candidateDay = (state.currentDay || 1) + 1;
    if (candidateDay > LAST_AVAILABLE_DAY) {
      throw new Error("더 이상 정의된 Day가 없습니다.");
    }

    txn.set(
      ref,
      {
        ...state,
        currentDay: candidateDay,
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );

    return candidateDay;
  });

  return nextDay;
}

export function getDefinedDays() {
  return Object.keys(PRICES_BY_DAY).map(Number).sort((a, b) => a - b);
}


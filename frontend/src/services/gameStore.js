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
  writeBatch,
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

// 관리자 비밀번호 (환경변수로 설정 가능, 기본값: "top081800!")
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "top081800!";

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
  
  // ADMIN 계정은 회원가입 불가
  if (normalized === "ADMIN") {
    throw new Error("관리자 계정은 회원가입할 수 없습니다.");
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
  
  // ADMIN 계정인 경우 특정 비밀번호만 허용
  if (normalized === "ADMIN") {
    if (password !== ADMIN_PASSWORD) {
      throw new Error("관리자 비밀번호가 올바르지 않습니다.");
    }
    
    // ADMIN 계정이 Firebase Auth에 없으면 생성
    try {
      await signInWithEmailAndPassword(auth, pseudoEmailFor(normalized), password);
    } catch (error) {
      // 계정이 없거나 인증 실패 시 생성 시도
      const errorCode = error?.code || "";
      if (
        errorCode === "auth/user-not-found" ||
        errorCode === "auth/invalid-credential" ||
        errorCode === "auth/wrong-password"
      ) {
        try {
          await createUserWithEmailAndPassword(auth, pseudoEmailFor(normalized), password);
        } catch (createError) {
          // 이미 존재하는 경우 다시 로그인 시도
          if (createError?.code === "auth/email-already-in-use") {
            await signInWithEmailAndPassword(auth, pseudoEmailFor(normalized), password);
          } else {
            throw createError;
          }
        }
      } else {
        throw error;
      }
    }
  } else {
    // 일반 사용자는 기존 로직
    await signInWithEmailAndPassword(auth, pseudoEmailFor(normalized), password);
  }
  
  const state = await ensureStateDocument();
  // ADMIN 계정은 포트폴리오 생성하지 않음
  if (normalized !== "ADMIN") {
    await ensureUserPortfolio(normalized, state.currentDay, state.visibleTickers);
  }
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

// 관리자 계정 확인
export function isAdminAccount(userId) {
  return normalizeUserId(userId) === "ADMIN";
}

// 전체 초기화 - Firestore의 모든 데이터 삭제
export async function resetAllData() {
  const batch = writeBatch(db);
  
  // 모든 사용자 조회
  const usersSnapshot = await getDocs(collection(db, "users"));
  
  // 각 사용자의 투자 내역 삭제
  for (const userDoc of usersSnapshot.docs) {
    const userId = userDoc.id;
    if (userId === "ADMIN") continue; // 관리자 계정은 제외
    
    const investmentsSnapshot = await getDocs(investmentsCol(userId));
    investmentsSnapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    // 사용자 문서 삭제
    batch.delete(userDoc.ref);
  }
  
  // meta/state 문서 삭제
  const stateDoc = await getDoc(stateRef());
  if (stateDoc.exists()) {
    batch.delete(stateDoc.ref);
  }
  
  await batch.commit();
}

// 계정만 삭제 (투자 내역과 자산 정보는 유지)
export async function resetAccountsOnly() {
  const batch = writeBatch(db);
  
  const usersSnapshot = await getDocs(collection(db, "users"));
  
  for (const userDoc of usersSnapshot.docs) {
    const userId = userDoc.id;
    if (userId === "ADMIN") continue; // 관리자 계정은 제외
    batch.delete(userDoc.ref);
  }
  
  await batch.commit();
}

// 구매 내역만 삭제
export async function resetInvestmentsOnly() {
  const batch = writeBatch(db);
  
  const usersSnapshot = await getDocs(collection(db, "users"));
  
  for (const userDoc of usersSnapshot.docs) {
    const userId = userDoc.id;
    if (userId === "ADMIN") continue; // 관리자 계정은 제외
    
    const investmentsSnapshot = await getDocs(investmentsCol(userId));
    investmentsSnapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
  }
  
  await batch.commit();
}

// 자산 정보만 초기화 (현금을 초기값으로, 보유 종목을 0으로)
export async function resetAssetsOnly() {
  const stateDoc = await ensureStateDocument();
  const { currentDay, visibleTickers = DEFAULT_VISIBLE_TICKERS } = stateDoc;
  const prices = getVisiblePrices(currentDay, visibleTickers);
  const tickers = Object.keys(prices);
  
  const usersSnapshot = await getDocs(collection(db, "users"));
  
  const batch = writeBatch(db);
  
  for (const userDoc of usersSnapshot.docs) {
    const userId = userDoc.id;
    if (userId === "ADMIN") continue; // 관리자 계정은 제외
    
    const holdings = Object.fromEntries(tickers.map((ticker) => [ticker, 0]));
    batch.update(userDoc.ref, {
      cash: INITIAL_CASH,
      holdings,
      updatedAt: serverTimestamp(),
    });
  }
  
  await batch.commit();
}

// 모든 사용자 목록 조회 (평가 금액 포함)
export async function getAllUsersWithPortfolio() {
  const stateDoc = await ensureStateDocument();
  const { currentDay, visibleTickers = DEFAULT_VISIBLE_TICKERS } = stateDoc;
  const prices = getVisiblePrices(currentDay, visibleTickers);
  
  const usersSnapshot = await getDocs(collection(db, "users"));
  const users = [];
  
  for (const userDoc of usersSnapshot.docs) {
    const userId = userDoc.id;
    if (userId === "ADMIN") continue; // 관리자 계정 제외
    
    const userData = userDoc.data();
    const portfolioValue = calculatePortfolioValue(userData, prices);
    
    users.push({
      userId,
      cash: userData.cash ?? INITIAL_CASH,
      holdings: userData.holdings || {},
      portfolioValue,
      createdAt: userData.createdAt?.toDate?.() || null,
      updatedAt: userData.updatedAt?.toDate?.() || null,
    });
  }
  
  // 포트폴리오 가치 기준 내림차순 정렬
  users.sort((a, b) => b.portfolioValue - a.portfolioValue);
  
  return users;
}

// 특정 사용자 삭제
export async function deleteUser(userId) {
  const normalized = normalizeUserId(userId);
  if (normalized === "ADMIN") {
    throw new Error("관리자 계정은 삭제할 수 없습니다.");
  }
  
  const batch = writeBatch(db);
  
  // 사용자의 투자 내역 삭제
  const investmentsSnapshot = await getDocs(investmentsCol(normalized));
  investmentsSnapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });
  
  // 사용자 문서 삭제
  const userDocRef = userRef(normalized);
  batch.delete(userDocRef);
  
  await batch.commit();
}

// 사용자 자산 조정
export async function adjustUserAssets(userId, cashAdjustment, holdingsAdjustment) {
  const normalized = normalizeUserId(userId);
  if (normalized === "ADMIN") {
    throw new Error("관리자 계정의 자산은 조정할 수 없습니다.");
  }
  
  const ref = userRef(normalized);
  await runTransaction(db, async (txn) => {
    const snap = await txn.get(ref);
    if (!snap.exists()) {
      throw new Error("사용자를 찾을 수 없습니다.");
    }
    
    const data = snap.data();
    const currentCash = data.cash ?? INITIAL_CASH;
    const currentHoldings = { ...(data.holdings || {}) };
    
    // 현금 조정
    const newCash = cashAdjustment !== undefined 
      ? Math.max(0, currentCash + cashAdjustment)
      : currentCash;
    
    // 보유 종목 조정
    const newHoldings = { ...currentHoldings };
    if (holdingsAdjustment) {
      Object.entries(holdingsAdjustment).forEach(([ticker, adjustment]) => {
        const currentQty = newHoldings[ticker] || 0;
        newHoldings[ticker] = Math.max(0, currentQty + adjustment);
      });
    }
    
    txn.update(ref, {
      cash: Math.round(newCash * 100) / 100,
      holdings: newHoldings,
      updatedAt: serverTimestamp(),
    });
  });
}

// 순위 조회
export async function getRankings() {
  const users = await getAllUsersWithPortfolio();
  return users.map((user, index) => ({
    rank: index + 1,
    userId: user.userId,
    portfolioValue: user.portfolioValue,
    cash: user.cash,
    holdings: user.holdings,
  }));
}


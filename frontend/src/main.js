// src/main.js

import {
  signUpWithUserId,
  signInWithUserId,
  signOutCurrentUser,
  fetchDashboardState,
  submitUserOrders,
  isAdminAccount,
  resetAllData,
  resetAccountsOnly,
  resetInvestmentsOnly,
  resetAssetsOnly,
  getAllUsersWithPortfolio,
  deleteUser,
  adjustUserAssets,
  getRankings,
  advanceDayWithToken,
} from "./services/gameStore.js";
import { auth } from "./firebase.js";
import { onAuthStateChanged } from "firebase/auth";

// 백엔드 API URL 설정 (백엔드 API 사용 시)
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// 초기 로그인 화면 스타일 적용
document.body.classList.add("login-screen");

// DOM 요소 가져오기
const $ = (id) => document.getElementById(id);

const userIdInput = $("userId");
const passwordInput = $("password");
const btnSignup = $("btnSignup");
const btnLogin = $("btnLogin");
const btnLogout = $("btnLogout");
const statusCard = $("status");
const tradeCard = $("trade");
const loginCard = $("loginCard");
const adminCard = $("adminCard");
const adminDashboard = $("adminDashboard");
const loadHint = $("loadHint");
const pricesDiv = $("prices");
const btnReset = $("btnReset");

// 전역 상태
let currentUser = null;
let currentPassword = null;
let currentState = null;
let currentPrices = {};
let isAdmin = false;

// 이메일에서 userId 추출하는 함수
function extractUserIdFromEmail(email) {
  if (!email) return null;
  const match = email.match(/^(.+)@stocksimgame\.local$/);
  return match ? match[1].toUpperCase() : null;
}

// API 호출 헬퍼
async function apiCall(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: "알 수 없는 오류가 발생했습니다." }));
      throw new Error(error.detail || error.message || "요청 실패");
    }

    return response.json();
  } catch (error) {
    // 네트워크 오류 처리
    if (error instanceof TypeError && error.message.includes("fetch")) {
      console.error("API 호출 실패:", {
        url,
        endpoint,
        apiUrl: API_URL,
        error: error.message
      });
      throw new Error(
        `백엔드 서버에 연결할 수 없습니다.\n` +
        `서버가 실행 중인지 확인하세요: ${API_URL}\n` +
        `오류: ${error.message}`
      );
    }
    throw error;
  }
}

// UI 헬퍼 함수
function setLoading(message) {
  if (loadHint) loadHint.textContent = message ?? "";
}

function setStatus(html) {
  const statusContent = $("statusContent");
  if (statusContent) {
    statusContent.innerHTML = html;
  } else if (statusCard) {
    statusCard.innerHTML = html;
  }
}

// 회원가입
btnSignup.onclick = async () => {
  try {
    setLoading("회원가입 중입니다...");
    const userId = userIdInput.value.trim();
    const password = passwordInput.value;

    if (!userId || !password) {
      alert("아이디와 비밀번호를 입력하세요.");
      return;
    }

    if (password.length < 4) {
      alert("비밀번호는 4자 이상이어야 합니다.");
      return;
    }

    await signUpWithUserId(userId, password);

    alert("회원가입 완료! 로그인해주세요.");
    passwordInput.value = "";
  } catch (err) {
    console.error(err);
    alert("회원가입 실패: " + err.message);
  } finally {
    setLoading("");
  }
};

// 로그인
btnLogin.onclick = async () => {
  try {
    setLoading("로그인 중입니다...");
    const userId = userIdInput.value.trim();
    const password = passwordInput.value;

    if (!userId || !password) {
      alert("아이디와 비밀번호를 입력하세요.");
      return;
    }

    const normalizedUserId = await signInWithUserId(userId, password);
    currentUser = normalizedUserId;
    currentPassword = password;
    isAdmin = isAdminAccount(normalizedUserId);

    if (isAdmin) {
      await loadAdminDashboard();
    } else {
      await loadDashboard();
    }
  } catch (err) {
    console.error(err);
    alert("로그인 실패: " + err.message);
  } finally {
    setLoading("");
  }
};

// 로그아웃
async function handleLogout() {
  try {
    await signOutCurrentUser();
  } catch (err) {
    console.error("로그아웃 오류:", err);
  }
  
  currentUser = null;
  currentPassword = null;
  currentState = null;
  currentPrices = {};
  isAdmin = false;
  
  document.body.classList.add("login-screen");
  loginCard.style.display = "block";
  statusCard.style.display = "none";
  tradeCard.style.display = "none";
  adminCard.style.display = "none";
  if (adminDashboard) adminDashboard.style.display = "none";
  if (btnLogout) btnLogout.style.display = "none";
  userIdInput.value = "";
  passwordInput.value = "";
  setStatus("사용자 정보를 불러오면 현황이 나타납니다.");
}

if (btnLogout) {
  btnLogout.onclick = handleLogout;
}

// 대시보드 로드
async function loadDashboard() {
  try {
    setLoading("정보를 불러오는 중...");
    
    const state = await fetchDashboardState(currentUser);
    currentState = state;
    currentPrices = state.prices;

    // 화면 업데이트
    document.body.classList.remove("login-screen");
    loginCard.style.display = "none";
    statusCard.style.display = "block";
    tradeCard.style.display = "block";
    if (btnLogout) btnLogout.style.display = "inline-block";
    if (adminCard) adminCard.style.display = "block";
    if (adminDashboard) adminDashboard.style.display = "none";

    renderAccountStatus(state);
    renderHoldings(state);
    renderTradingSection(state);

    setLoading("");
  } catch (err) {
    console.error(err);
    alert("정보를 불러오는데 실패했습니다: " + err.message);
    setLoading("");
  }
}

// 계좌 현황 렌더링
function renderAccountStatus(state) {
  const user = state.user;
  const html = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
      <h3 style="margin: 0;">현재 계좌 현황</h3>
      <button id="btnLogout" type="button" class="btn-muted">로그아웃</button>
    </div>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 16px;">
      <div class="account-stat">
        <div style="font-size: 13px; color: var(--text-muted); margin-bottom: 4px;">사용자 ID</div>
        <div style="font-size: 18px; font-weight: 600;">${currentUser}</div>
      </div>
      <div class="account-stat">
        <div style="font-size: 13px; color: var(--text-muted); margin-bottom: 4px;">보유 현금</div>
        <div style="font-size: 18px; font-weight: 600; color: var(--primary);">${user.cash.toLocaleString()} ₩</div>
      </div>
      <div class="account-stat">
        <div style="font-size: 13px; color: var(--text-muted); margin-bottom: 4px;">포트폴리오 가치</div>
        <div style="font-size: 18px; font-weight: 600; color: var(--accent);">${user.portfolioValue.toLocaleString()} ₩</div>
      </div>
      <div class="account-stat">
        <div style="font-size: 13px; color: var(--text-muted); margin-bottom: 4px;">현재 Day</div>
        <div style="font-size: 18px; font-weight: 600;">Day ${state.currentDay}</div>
      </div>
    </div>
  `;
  setStatus(html);
  
  // 로그아웃 버튼 이벤트 재등록
  const logoutBtn = $("btnLogout");
  if (logoutBtn) {
    logoutBtn.onclick = handleLogout;
  }
}

// 보유 종목 렌더링
function renderHoldings(state) {
  const user = state.user;
  const holdings = user.holdings || {};
  const holdingsEntries = Object.entries(holdings).filter(([_, qty]) => qty > 0);

  if (holdingsEntries.length === 0) {
    return;
  }

  const holdingsHtml = `
    <div class="card" style="margin-top: 20px;">
      <h3>보유 종목</h3>
      <table>
        <thead>
          <tr>
            <th>종목</th>
            <th>보유 수량</th>
            <th>현재 가격</th>
            <th>평가 금액</th>
            <th>매도 금액 (₩)</th>
            <th>매도</th>
          </tr>
        </thead>
        <tbody>
          ${holdingsEntries.map(([ticker, qty]) => {
            const price = currentPrices[ticker] || 0;
            const value = qty * price;
            return `
              <tr>
                <td><strong>${ticker}</strong></td>
                <td>${qty.toFixed(4)}</td>
                <td>${price.toLocaleString()} ₩</td>
                <td>${value.toLocaleString()} ₩</td>
                <td>
                  <input 
                    type="number" 
                    id="sell_${ticker}" 
                    placeholder="매도 금액" 
                    min="0" 
                    step="1000"
                    style="width: 120px;"
                  />
                </td>
                <td>
                  <button 
                    class="btn-primary" 
                    onclick="handleSell('${ticker}')"
                    style="padding: 8px 16px; font-size: 14px;"
                  >
                    매도
                  </button>
                </td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    </div>
  `;

  const statusContent = $("statusContent");
  if (statusContent) {
    statusContent.insertAdjacentHTML("beforeend", holdingsHtml);
  }
}

// 거래 섹션 렌더링
function renderTradingSection(state) {
  const prices = state.prices;
  const html = `
    <div style="margin-top: 16px;">
      <table>
        <thead>
          <tr>
            <th>종목</th>
            <th>현재 가격</th>
            <th>매수 금액 (₩)</th>
            <th>매수</th>
          </tr>
        </thead>
        <tbody>
          ${Object.entries(prices).map(([ticker, price]) => `
            <tr>
              <td><strong>${ticker}</strong></td>
              <td>${price.toLocaleString()} ₩</td>
              <td>
                <input 
                  type="number" 
                  id="buy_${ticker}" 
                  placeholder="매수 금액" 
                  min="0" 
                  step="1000"
                  style="width: 120px;"
                />
              </td>
              <td>
                <button 
                  class="btn-primary" 
                  onclick="handleBuy('${ticker}')"
                  style="padding: 8px 16px; font-size: 14px;"
                >
                  매수
                </button>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
  if (pricesDiv) pricesDiv.innerHTML = html;
}

// 매수 처리
window.handleBuy = async function(ticker) {
  const input = document.getElementById(`buy_${ticker}`);
  const amount = parseFloat(input.value);

  if (!amount || amount <= 0) {
    alert("매수 금액을 입력해주세요.");
    return;
  }

  try {
    setLoading("매수 주문 처리 중...");
    
    await submitUserOrders(currentUser, [{ ticker, amount_krw: amount }]);

    input.value = "";
    await loadDashboard();
    alert("매수 주문이 완료되었습니다.");
  } catch (err) {
    console.error(err);
    alert("매수 실패: " + err.message);
  } finally {
    setLoading("");
  }
};

// 매도 처리
window.handleSell = async function(ticker) {
  const input = document.getElementById(`sell_${ticker}`);
  const amount = parseFloat(input.value);

  if (!amount || amount <= 0) {
    alert("매도 금액을 입력해주세요.");
    return;
  }

  try {
    setLoading("매도 주문 처리 중...");
    
    await submitUserOrders(currentUser, [{ ticker, amount_krw: -amount }]);

    input.value = "";
    await loadDashboard();
    alert("매도 주문이 완료되었습니다.");
  } catch (err) {
    console.error(err);
    alert("매도 실패: " + err.message);
  } finally {
    setLoading("");
  }
};

// 입력 초기화
btnReset.onclick = () => {
  Object.keys(currentPrices).forEach(ticker => {
    const buyInput = document.getElementById(`buy_${ticker}`);
    const sellInput = document.getElementById(`sell_${ticker}`);
    if (buyInput) buyInput.value = "";
    if (sellInput) sellInput.value = "";
  });
};

// 관리자 대시보드 로드
async function loadAdminDashboard() {
  try {
    setLoading("관리자 대시보드를 불러오는 중...");
    
    document.body.classList.remove("login-screen");
    loginCard.style.display = "none";
    statusCard.style.display = "none";
    tradeCard.style.display = "none";
    if (adminCard) adminCard.style.display = "none";
    if (adminDashboard) adminDashboard.style.display = "block";
    
    // 사용자 목록과 순위 자동 로드
    await refreshUsersList();
    await showRankings();
    
    setLoading("");
  } catch (err) {
    console.error(err);
    alert("관리자 대시보드를 불러오는데 실패했습니다: " + err.message);
    setLoading("");
  }
}

// 관리자 기능 초기화
function initAdminFunctions() {
  const btnAdminLogout = $("btnAdminLogout");
  const btnResetAll = $("btnResetAll");
  const btnResetAccounts = $("btnResetAccounts");
  const btnResetInvestments = $("btnResetInvestments");
  const btnResetAssets = $("btnResetAssets");
  const btnRefreshUsers = $("btnRefreshUsers");
  const btnViewRankings = $("btnViewRankings");
  const adminTokenInput = $("adminToken");
  const btnNext = $("btnNext");

  if (btnAdminLogout) {
    btnAdminLogout.onclick = handleLogout;
  }

  if (btnResetAll) {
    btnResetAll.onclick = async () => {
      if (!confirm("⚠️ 경고: 모든 데이터를 삭제하시겠습니까?\n계정, 구매 내역, 자산 정보 등 모든 것이 삭제됩니다.\n이 작업은 되돌릴 수 없습니다.")) {
        return;
      }
      if (!confirm("정말로 모든 데이터를 삭제하시겠습니까?")) {
        return;
      }
      try {
        setLoading("전체 초기화 중...");
        await resetAllData();
        alert("전체 초기화가 완료되었습니다.");
        await refreshUsersList();
      } catch (err) {
        console.error(err);
        alert("초기화 실패: " + err.message);
      } finally {
        setLoading("");
      }
    };
  }

  if (btnResetAccounts) {
    btnResetAccounts.onclick = async () => {
      if (!confirm("⚠️ 경고: 모든 계정을 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.")) {
        return;
      }
      try {
        setLoading("계정 삭제 중...");
        await resetAccountsOnly();
        alert("계정 삭제가 완료되었습니다.");
        await refreshUsersList();
      } catch (err) {
        console.error(err);
        alert("삭제 실패: " + err.message);
      } finally {
        setLoading("");
      }
    };
  }

  if (btnResetInvestments) {
    btnResetInvestments.onclick = async () => {
      if (!confirm("⚠️ 경고: 모든 구매 내역을 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.")) {
        return;
      }
      try {
        setLoading("구매 내역 삭제 중...");
        await resetInvestmentsOnly();
        alert("구매 내역 삭제가 완료되었습니다.");
        await refreshUsersList();
      } catch (err) {
        console.error(err);
        alert("삭제 실패: " + err.message);
      } finally {
        setLoading("");
      }
    };
  }

  if (btnResetAssets) {
    btnResetAssets.onclick = async () => {
      if (!confirm("⚠️ 경고: 모든 자산 정보를 초기화하시겠습니까?\n현금과 보유 종목이 초기값으로 돌아갑니다.\n이 작업은 되돌릴 수 없습니다.")) {
        return;
      }
      try {
        setLoading("자산 초기화 중...");
        await resetAssetsOnly();
        alert("자산 초기화가 완료되었습니다.");
        await refreshUsersList();
      } catch (err) {
        console.error(err);
        alert("초기화 실패: " + err.message);
      } finally {
        setLoading("");
      }
    };
  }

  if (btnRefreshUsers) {
    btnRefreshUsers.onclick = async () => {
      await refreshUsersList();
    };
  }

  if (btnViewRankings) {
    btnViewRankings.onclick = async () => {
      await showRankings();
    };
  }

  if (btnNext) {
    btnNext.onclick = async () => {
      const token = adminTokenInput?.value.trim();
      if (!token) {
        alert("관리자 토큰을 입력하세요.");
        return;
      }

      try {
        setLoading("Day를 진행하는 중...");
        await advanceDayWithToken(token);
        alert("다음 Day로 이동했습니다.");
        if (adminTokenInput) adminTokenInput.value = "";
        await refreshUsersList();
        await showRankings();
      } catch (err) {
        console.error(err);
        alert("Day 진행 실패: " + err.message);
      } finally {
        setLoading("");
      }
    };
  }
}

// 사용자 목록 새로고침
async function refreshUsersList() {
  try {
    setLoading("사용자 목록을 불러오는 중...");
    const users = await getAllUsersWithPortfolio();
    const usersListDiv = $("usersList");
    
    if (!usersListDiv) return;

    if (users.length === 0) {
      usersListDiv.innerHTML = '<p style="color: rgba(255,255,255,0.6);">등록된 사용자가 없습니다.</p>';
      setLoading("");
      return;
    }

    const html = `
      <div style="overflow-x: auto;">
        <table style="width: 100%; background: rgba(255,255,255,0.05); border-radius: 8px;">
          <thead>
            <tr>
              <th style="color: white;">사용자 ID</th>
              <th style="color: white;">보유 현금</th>
              <th style="color: white;">평가 금액</th>
              <th style="color: white;">보유 종목</th>
              <th style="color: white;">작업</th>
            </tr>
          </thead>
          <tbody>
            ${users.map((user) => {
              const holdingsList = Object.entries(user.holdings)
                .filter(([_, qty]) => qty > 0)
                .map(([ticker, qty]) => `${ticker}: ${qty.toFixed(2)}`)
                .join(", ") || "없음";
              
              return `
                <tr>
                  <td style="color: white;"><strong>${user.userId}</strong></td>
                  <td style="color: white;">${user.cash.toLocaleString()} ₩</td>
                  <td style="color: #4ade80; font-weight: 600;">${user.portfolioValue.toLocaleString()} ₩</td>
                  <td style="color: rgba(255,255,255,0.8); font-size: 13px;">${holdingsList}</td>
                  <td>
                    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                      <button 
                        class="btn-primary" 
                        onclick="handleAdjustAssets('${user.userId}')"
                        style="padding: 6px 12px; font-size: 13px; background: rgba(255,255,255,0.2); color: white; border: 1px solid rgba(255,255,255,0.3);"
                      >
                        자산 조정
                      </button>
                      <button 
                        class="btn-danger" 
                        onclick="handleDeleteUser('${user.userId}')"
                        style="padding: 6px 12px; font-size: 13px; background: #ff6b6b; color: white;"
                      >
                        삭제
                      </button>
                    </div>
                  </td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>
    `;
    
    usersListDiv.innerHTML = html;
    setLoading("");
  } catch (err) {
    console.error(err);
    alert("사용자 목록을 불러오는데 실패했습니다: " + err.message);
    setLoading("");
  }
}

// 순위 보기
async function showRankings() {
  try {
    setLoading("순위를 불러오는 중...");
    const rankings = await getRankings();
    const rankingsListDiv = $("rankingsList");
    
    if (!rankingsListDiv) return;

    if (rankings.length === 0) {
      rankingsListDiv.innerHTML = '<p style="color: rgba(255,255,255,0.6);">등록된 사용자가 없습니다.</p>';
      setLoading("");
      return;
    }

    const html = `
      <div style="overflow-x: auto;">
        <table style="width: 100%; background: rgba(255,255,255,0.05); border-radius: 8px;">
          <thead>
            <tr>
              <th style="color: white;">순위</th>
              <th style="color: white;">사용자 ID</th>
              <th style="color: white;">평가 금액</th>
              <th style="color: white;">보유 현금</th>
            </tr>
          </thead>
          <tbody>
            ${rankings.map((item, index) => {
              const medal = index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : "";
              return `
                <tr style="${index < 3 ? 'background: rgba(255,215,0,0.1);' : ''}">
                  <td style="color: white; font-weight: 600;">
                    ${medal} ${item.rank}위
                  </td>
                  <td style="color: white;"><strong>${item.userId}</strong></td>
                  <td style="color: #4ade80; font-weight: 600; font-size: 16px;">${item.portfolioValue.toLocaleString()} ₩</td>
                  <td style="color: rgba(255,255,255,0.8);">${item.cash.toLocaleString()} ₩</td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>
    `;
    
    rankingsListDiv.innerHTML = html;
    setLoading("");
  } catch (err) {
    console.error(err);
    alert("순위를 불러오는데 실패했습니다: " + err.message);
    setLoading("");
  }
}

// 사용자 삭제 처리
window.handleDeleteUser = async function(userId) {
  if (!confirm(`사용자 "${userId}"를 정말 삭제하시겠습니까?\n계정과 모든 투자 내역이 삭제됩니다.`)) {
    return;
  }
  
  try {
    setLoading("사용자 삭제 중...");
    await deleteUser(userId);
    alert("사용자가 삭제되었습니다.");
    await refreshUsersList();
    await showRankings();
  } catch (err) {
    console.error(err);
    alert("삭제 실패: " + err.message);
  } finally {
    setLoading("");
  }
};

// 자산 조정 처리
window.handleAdjustAssets = async function(userId) {
  const cashAdjustment = prompt(`${userId}의 현금을 조정하세요.\n양수: 추가, 음수: 차감\n예: 1000000 또는 -500000`);
  if (cashAdjustment === null) return;
  
  const cashAdj = parseFloat(cashAdjustment);
  if (isNaN(cashAdj)) {
    alert("올바른 숫자를 입력하세요.");
    return;
  }

  const holdingsInput = prompt(`${userId}의 보유 종목을 조정하세요.\n형식: TICKER:수량,TICKER:수량\n예: AAA:10,BBB:-5\n(양수: 추가, 음수: 차감)`);
  let holdingsAdj = null;
  
  if (holdingsInput && holdingsInput.trim()) {
    try {
      holdingsAdj = {};
      const pairs = holdingsInput.split(",");
      pairs.forEach(pair => {
        const [ticker, qty] = pair.trim().split(":");
        if (ticker && qty) {
          holdingsAdj[ticker.trim().toUpperCase()] = parseFloat(qty.trim());
        }
      });
    } catch (err) {
      alert("보유 종목 형식이 올바르지 않습니다.");
      return;
    }
  }

  try {
    setLoading("자산 조정 중...");
    await adjustUserAssets(userId, cashAdj, holdingsAdj);
    alert("자산이 조정되었습니다.");
    await refreshUsersList();
    await showRankings();
  } catch (err) {
    console.error(err);
    alert("자산 조정 실패: " + err.message);
  } finally {
    setLoading("");
  }
};

// 인증 상태 복원 함수
async function restoreAuthState() {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, async (user) => {
      if (user && user.email) {
        const userId = extractUserIdFromEmail(user.email);
        if (userId) {
          currentUser = userId;
          isAdmin = isAdminAccount(userId);
          
          try {
            if (isAdmin) {
              await loadAdminDashboard();
            } else {
              await loadDashboard();
            }
          } catch (err) {
            console.error("인증 상태 복원 실패:", err);
            // 복원 실패 시 로그인 화면 유지
            handleLogout();
          }
        }
      }
      resolve();
    });
  });
}

// 페이지 로드 시 관리자 기능 초기화 및 인증 상태 복원
initAdminFunctions();
restoreAuthState();

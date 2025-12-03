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
  advanceDayAsAdmin,
  watchStateChange,
  ensureStateDocument,
  fetchAllInvestments,
} from "./services/gameStore.js";
import { auth } from "./firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { Chart, registerables } from "chart.js";
import { getVisiblePrices, PRICES_BY_DAY, INITIAL_CASH, DEFAULT_VISIBLE_TICKERS } from "./data/prices.js";

Chart.register(...registerables);

// DOM 요소 가져오기
const $ = (id) => document.getElementById(id);

// 로딩 화면 요소
const authLoadingScreen = $("authLoadingScreen");

// 초기 상태: 인증 확인 전까지 모든 화면 숨김
const loginCard = $("loginCard");
const statusCard = $("status");
const tradeCard = $("trade");
const adminCard = $("adminCard");
const adminDashboard = $("adminDashboard");
const btnLogout = $("btnLogout");

// 인증 확인 전까지 모든 카드 숨김
if (loginCard) loginCard.style.display = "none";
if (statusCard) statusCard.style.display = "none";
if (tradeCard) tradeCard.style.display = "none";
if (adminCard) adminCard.style.display = "none";
if (adminDashboard) adminDashboard.style.display = "none";
if (btnLogout) btnLogout.style.display = "none";

const userIdInput = $("userId");
const passwordInput = $("password");
const btnSignup = $("btnSignup");
const btnLogin = $("btnLogin");
const loadHint = $("loadHint");
const loginMessage = $("loginMessage");
const pricesDiv = $("prices");
const btnReset = $("btnReset");

// 전역 상태
let currentUser = null;
let currentPassword = null;
let currentState = null;
let currentPrices = {};
let isAdmin = false;
let stateUnsubscribe = null; // 상태 변경 감시 구독 해제 함수
let portfolioChart = null; // 포트폴리오 구성 차트
let valueChart = null; // 자산 변화 차트

// 이메일에서 userId 추출하는 함수
function extractUserIdFromEmail(email) {
  if (!email) return null;
  const match = email.match(/^(.+)@stocksimgame\.local$/);
  return match ? match[1].toUpperCase() : null;
}

// UI 헬퍼 함수
function setLoading(message) {
  if (loadHint) loadHint.textContent = message ?? "";
}

// 로딩 오버레이 표시/숨김
let loadingOverlay = null;

function showLoadingOverlay(message = "처리 중...") {
  // 기존 오버레이가 있으면 제거
  if (loadingOverlay) {
    hideLoadingOverlay();
  }

  loadingOverlay = document.createElement("div");
  loadingOverlay.className = "loading-overlay";
  loadingOverlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(4px);
    z-index: 20000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.2s ease-out;
  `;

  const spinner = document.createElement("div");
  spinner.style.cssText = `
    width: 48px;
    height: 48px;
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top-color: #3b82f6;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin-bottom: 20px;
  `;

  const messageDiv = document.createElement("div");
  messageDiv.textContent = message;
  messageDiv.style.cssText = `
    color: white;
    font-size: 16px;
    font-weight: 600;
    text-align: center;
  `;

  loadingOverlay.appendChild(spinner);
  loadingOverlay.appendChild(messageDiv);
  document.body.appendChild(loadingOverlay);
}

function hideLoadingOverlay() {
  if (loadingOverlay) {
    loadingOverlay.style.animation = "fadeOut 0.2s ease-out forwards";
    setTimeout(() => {
      if (loadingOverlay && loadingOverlay.parentNode) {
        loadingOverlay.parentNode.removeChild(loadingOverlay);
      }
      loadingOverlay = null;
    }, 200);
  }
}

function showLoginMessage(message, type = "info") {
  if (loginMessage) {
    loginMessage.textContent = message || "";
    loginMessage.className = message ? type : "";
  }
}

function clearLoginMessage() {
  showLoginMessage("");
}

// 토스트 메시지 시스템
function showToast(message, type = "info", duration = 3000) {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  
  const icon = type === "success" ? "✅" : type === "error" ? "❌" : type === "warning" ? "⚠️" : "ℹ️";
  toast.innerHTML = `
    <span style="font-size: 20px;">${icon}</span>
    <span style="flex: 1; font-size: 14px; line-height: 1.5;">${message}</span>
  `;

  container.appendChild(toast);

  // 자동 제거
  setTimeout(() => {
    toast.classList.add("slide-out");
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, duration);
}

// 확인 모달 시스템
function showConfirm(message, title = "확인") {
  return new Promise((resolve) => {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    
    overlay.innerHTML = `
      <div class="modal">
        <h3>${title}</h3>
        <p>${message.replace(/\n/g, "<br>")}</p>
        <div class="modal-actions">
          <button class="btn-muted" id="modalCancel">취소</button>
          <button class="btn-primary" id="modalConfirm">확인</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    const cleanup = () => {
      overlay.style.animation = "fadeIn 0.2s ease-out reverse";
      setTimeout(() => {
        if (overlay.parentNode) {
          overlay.parentNode.removeChild(overlay);
        }
      }, 200);
    };

    overlay.querySelector("#modalConfirm").onclick = () => {
      cleanup();
      resolve(true);
    };

    overlay.querySelector("#modalCancel").onclick = () => {
      cleanup();
      resolve(false);
    };

    // 배경 클릭 시 취소
    overlay.onclick = (e) => {
      if (e.target === overlay) {
        cleanup();
        resolve(false);
      }
    };
  });
}

// 입력 모달 시스템
function showPrompt(message, title = "입력", defaultValue = "") {
  return new Promise((resolve) => {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    
    overlay.innerHTML = `
      <div class="modal">
        <h3>${title}</h3>
        <p style="margin-bottom: 16px;">${message.replace(/\n/g, "<br>")}</p>
        <label>
          <input type="text" id="modalInput" value="${defaultValue}" style="width: 100%;" />
        </label>
        <div class="modal-actions">
          <button class="btn-muted" id="modalCancel">취소</button>
          <button class="btn-primary" id="modalConfirm">확인</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    const input = overlay.querySelector("#modalInput");
    input.focus();
    input.select();

    const cleanup = () => {
      overlay.style.animation = "fadeIn 0.2s ease-out reverse";
      setTimeout(() => {
        if (overlay.parentNode) {
          overlay.parentNode.removeChild(overlay);
        }
      }, 200);
    };

    const handleConfirm = () => {
      const value = input.value.trim();
      cleanup();
      resolve(value);
    };

    overlay.querySelector("#modalConfirm").onclick = handleConfirm;
    
    overlay.querySelector("#modalCancel").onclick = () => {
      cleanup();
      resolve(null);
    };

    // Enter 키 처리
    input.onkeydown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleConfirm();
      } else if (e.key === "Escape") {
        e.preventDefault();
        cleanup();
        resolve(null);
      }
    };

    // 배경 클릭 시 취소
    overlay.onclick = (e) => {
      if (e.target === overlay) {
        cleanup();
        resolve(null);
      }
    };
  });
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
    clearLoginMessage();
    setLoading("회원가입 중입니다...");
    const userId = userIdInput.value.trim();
    const password = passwordInput.value;

    if (!userId || !password) {
      showLoginMessage("아이디와 비밀번호를 입력하세요.", "error");
      setLoading("");
      return;
    }

    if (password.length < 4) {
      showLoginMessage("비밀번호는 4자 이상이어야 합니다.", "error");
      setLoading("");
      return;
    }

    await signUpWithUserId(userId, password);

    showLoginMessage("회원가입 완료! 로그인해주세요.", "success");
    passwordInput.value = "";
  } catch (err) {
    console.error(err);
    showLoginMessage("회원가입 실패: " + err.message, "error");
  } finally {
    setLoading("");
  }
};

// 로그인
btnLogin.onclick = async () => {
  try {
    clearLoginMessage();
    setLoading("로그인 중입니다...");
    const userId = userIdInput.value.trim();
    const password = passwordInput.value;

    if (!userId || !password) {
      showLoginMessage("아이디와 비밀번호를 입력하세요.", "error");
      setLoading("");
      return;
    }

    const normalizedUserId = await signInWithUserId(userId, password);
    currentUser = normalizedUserId;
    currentPassword = password;
    isAdmin = isAdminAccount(normalizedUserId);

    clearLoginMessage();
    if (isAdmin) {
      await loadAdminDashboard();
    } else {
      await loadDashboard();
      // 일반 사용자인 경우 상태 감시 설정
      if (!isAdmin && !stateUnsubscribe) {
        setupStateWatcher();
      }
    }
  } catch (err) {
    console.error(err);
    showLoginMessage("로그인 실패: " + err.message, "error");
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
  
  // 상태 감시 구독 해제
  if (stateUnsubscribe) {
    stateUnsubscribe();
    stateUnsubscribe = null;
  }
  
  // 차트 정리
  if (portfolioChart) {
    portfolioChart.destroy();
    portfolioChart = null;
  }
  if (valueChart) {
    valueChart.destroy();
    valueChart = null;
  }
  
  currentUser = null;
  currentPassword = null;
  currentState = null;
  currentPrices = {};
  isAdmin = false;
  
  showLoginScreen();
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
    // 관리자 콘솔은 관리자만 볼 수 있음
    if (adminCard) adminCard.style.display = isAdmin ? "block" : "none";
    if (adminDashboard) adminDashboard.style.display = "none";

    await renderAccountStatus(state);
    renderHoldings(state);
    renderTradingSection(state);

    // 일반 사용자인 경우 상태 변경 감시 설정
    if (!isAdmin && !stateUnsubscribe) {
      setupStateWatcher();
    }

    setLoading("");
  } catch (err) {
    console.error(err);
    showToast("정보를 불러오는데 실패했습니다: " + err.message, "error");
    setLoading("");
  }
}

// Day별 포트폴리오 가치 계산
async function calculatePortfolioHistory(userId, currentDay, visibleTickers) {
  const investments = await fetchAllInvestments(userId);
  const history = [];
  
  // 초기 상태 (Day 1 시작 시)
  let cash = INITIAL_CASH;
  const holdings = {};
  
  // 각 Day별로 포트폴리오 가치 계산
  for (let day = 1; day <= currentDay; day++) {
    // 해당 Day의 투자 내역 적용
    const dayInvestments = investments.filter(inv => inv.day === day);
    dayInvestments.forEach(inv => {
      if (inv.orders) {
        const prices = getVisiblePrices(day, visibleTickers);
        inv.orders.forEach(({ ticker, amount_krw }) => {
          const price = prices[ticker];
          if (!price) return;
          
          if (amount_krw > 0) {
            // 매수
            const qty = amount_krw / price;
            holdings[ticker] = (holdings[ticker] || 0) + qty;
            cash -= amount_krw;
          } else {
            // 매도
            const qty = Math.abs(amount_krw) / price;
            holdings[ticker] = (holdings[ticker] || 0) - qty;
            cash += Math.abs(amount_krw);
          }
        });
      }
    });
    
    // 해당 Day의 가격으로 포트폴리오 가치 계산
    const prices = getVisiblePrices(day, visibleTickers);
    let portfolioValue = cash;
    Object.entries(holdings).forEach(([ticker, qty]) => {
      if (prices[ticker] && qty > 0) {
        portfolioValue += qty * prices[ticker];
      }
    });
    
    history.push({
      day,
      portfolioValue: Math.round(portfolioValue * 100) / 100,
      cash: Math.round(cash * 100) / 100,
    });
  }
  
  return history;
}

// 포트폴리오 구성 그래프 렌더링
function renderPortfolioChart(state) {
  const canvas = document.getElementById("portfolioChart");
  if (!canvas) return;
  
  const ctx = canvas.getContext("2d");
  
  // 기존 차트가 있으면 제거
  if (portfolioChart) {
    portfolioChart.destroy();
  }
  
  const user = state.user;
  const holdings = user.holdings || {};
  const prices = state.prices;
  
  // 보유 종목별 가치 계산
  const data = [];
  const labels = [];
  const colors = [
    "#3b82f6", "#f97316", "#10b981", "#8b5cf6", "#ef4444", "#f59e0b",
    "#06b6d4", "#ec4899", "#84cc16", "#6366f1"
  ];
  
  let colorIndex = 0;
  Object.entries(holdings).forEach(([ticker, qty]) => {
    if (qty > 0 && prices[ticker]) {
      const value = qty * prices[ticker];
      if (value > 0) {
        labels.push(ticker);
        data.push(value);
        colorIndex++;
      }
    }
  });
  
  // 현금도 추가
  if (user.cash > 0) {
    labels.push("현금");
    data.push(user.cash);
  }
  
  if (data.length === 0) {
    canvas.parentElement.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 40px;">보유 자산이 없습니다.</p>';
    return;
  }
  
  portfolioChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: colors.slice(0, data.length),
        borderWidth: 2,
        borderColor: "#ffffff",
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: "right",
          labels: {
            padding: 12,
            font: {
              size: 13,
            },
            generateLabels: function(chart) {
              const data = chart.data;
              if (data.labels.length && data.datasets.length) {
                return data.labels.map((label, i) => {
                  const value = data.datasets[0].data[i];
                  const total = data.datasets[0].data.reduce((a, b) => a + b, 0);
                  const percentage = ((value / total) * 100).toFixed(0);
                  return {
                    text: `${label}: ${value.toLocaleString('ko-KR')} ₩ (${percentage}%)`,
                    fillStyle: data.datasets[0].backgroundColor[i],
                    hidden: false,
                    index: i,
                  };
                });
              }
              return [];
            },
          },
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.label || "";
              const value = context.parsed || 0;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = ((value / total) * 100).toFixed(0);
              return `${label}: ${value.toLocaleString('ko-KR')} ₩ (${percentage}%)`;
            },
          },
        },
      },
    },
  });
}

// 자산 변화 그래프 렌더링
async function renderValueChart(state) {
  const canvas = document.getElementById("valueChart");
  if (!canvas) return;
  
  const ctx = canvas.getContext("2d");
  
  // 기존 차트가 있으면 제거
  if (valueChart) {
    valueChart.destroy();
  }
  
  try {
    const history = await calculatePortfolioHistory(
      currentUser,
      state.currentDay,
      state.visibleTickers
    );
    
    if (history.length === 0) {
      canvas.parentElement.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 40px;">데이터가 없습니다.</p>';
      return;
    }
    
    const labels = history.map(h => `Day ${h.day}`);
    const portfolioValues = history.map(h => h.portfolioValue);
    
    valueChart = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "포트폴리오 가치",
            data: portfolioValues,
            borderColor: "#3b82f6",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointHoverRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: true,
            position: "top",
            labels: {
              padding: 12,
              font: {
                size: 13,
              },
            },
          },
          tooltip: {
            mode: "index",
            intersect: false,
            callbacks: {
              label: function(context) {
                return `${context.dataset.label}: ${context.parsed.y.toLocaleString()} ₩`;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: false,
            ticks: {
              callback: function(value) {
                return value.toLocaleString() + " ₩";
              },
            },
            grid: {
              color: "rgba(15, 23, 42, 0.05)",
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
        interaction: {
          mode: "nearest",
          axis: "x",
          intersect: false,
        },
      },
    });
  } catch (err) {
    console.error("자산 변화 그래프 렌더링 실패:", err);
    canvas.parentElement.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 40px;">그래프를 불러올 수 없습니다.</p>';
  }
}

// 계좌 현황 렌더링
async function renderAccountStatus(state) {
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
    
    <!-- 포트폴리오 및 그래프 섹션 -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-top: 24px;">
      <div class="card" style="padding: 20px;">
        <h4 style="margin: 0 0 16px; font-size: 16px; color: var(--text);">포트폴리오 구성</h4>
        <div style="position: relative; height: 250px;">
          <canvas id="portfolioChart"></canvas>
        </div>
      </div>
      <div class="card" style="padding: 20px;">
        <h4 style="margin: 0 0 16px; font-size: 16px; color: var(--text);">자산 변화 추이</h4>
        <div style="position: relative; height: 250px;">
          <canvas id="valueChart"></canvas>
        </div>
      </div>
    </div>
  `;
  setStatus(html);
  
  // 로그아웃 버튼 이벤트 재등록
  const logoutBtn = $("btnLogout");
  if (logoutBtn) {
    logoutBtn.onclick = handleLogout;
  }
  
  // 그래프 렌더링
  renderPortfolioChart(state);
  await renderValueChart(state);
}

// 보유 종목 렌더링
function renderHoldings(state) {
  const user = state.user;
  const holdings = user.holdings || {};
  const holdingsEntries = Object.entries(holdings).filter(([_, qty]) => qty > 0);
  const isDay0 = state.currentDay === 0;

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
            <th>매도 주 수량</th>
            <th>매도</th>
          </tr>
        </thead>
        <tbody>
          ${holdingsEntries.map(([ticker, qty]) => {
            const price = currentPrices[ticker] || 0;
            const value = qty * price;
            const maxSellableShares = qty;
            return `
              <tr>
                <td><strong>${ticker}</strong></td>
                <td>${qty.toFixed(0)} 주</td>
                <td>${price.toLocaleString()} ₩</td>
                <td>${value.toLocaleString()} ₩</td>
                <td>
                  <input 
                    type="number" 
                    id="sell_${ticker}" 
                    placeholder="주 수량" 
                    min="0" 
                    step="0.0001"
                    max="${maxSellableShares}"
                    style="width: 120px;"
                    ${isDay0 ? 'disabled' : ''}
                  />
                </td>
                <td>
                  <div style="display: flex; gap: 8px;">
                    <button 
                      class="btn-primary" 
                      onclick="handleSell('${ticker}')"
                      style="padding: 8px 16px; font-size: 14px; flex: 1;"
                      ${isDay0 ? 'disabled' : ''}
                    >
                      매도
                    </button>
                    <button 
                      class="btn-muted" 
                      onclick="handleSellAll('${ticker}')"
                      style="padding: 8px 12px; font-size: 13px;"
                      ${isDay0 ? 'disabled' : ''}
                    >
                      전량 매도
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

  const statusContent = $("statusContent");
  if (statusContent) {
    statusContent.insertAdjacentHTML("beforeend", holdingsHtml);
  }
}

// 전날 대비 변동률 계산
function calculatePriceChange(currentDay, ticker, currentPrice, visibleTickers) {
  if (currentDay === 0) {
    return null; // Day 0에서는 변동률 없음
  }
  
  const prevDay = currentDay - 1;
  const prevPrices = getVisiblePrices(prevDay, visibleTickers);
  const prevPrice = prevPrices[ticker];
  
  if (!prevPrice || prevPrice === 0) {
    return null;
  }
  
  const changePercent = ((currentPrice - prevPrice) / prevPrice) * 100;
  return changePercent;
}

// 거래 섹션 렌더링
function renderTradingSection(state) {
  const prices = state.prices;
  const currentDay = state.currentDay;
  const visibleTickers = state.visibleTickers || DEFAULT_VISIBLE_TICKERS;
  const isDay0 = currentDay === 0;
  const user = state.user;
  const cash = user.cash || 0;
  
  const html = `
    <div style="margin-top: 16px;">
      ${isDay0 ? '<p style="color: var(--text-muted); font-size: 14px; margin-bottom: 12px;">⚠️ Day 0에서는 거래할 수 없습니다. 주식 종목과 가격만 확인할 수 있습니다.</p>' : ''}
      <table>
        <thead>
          <tr>
            <th>종목</th>
            <th>현재 가격</th>
            ${currentDay > 0 ? '<th>전날 대비</th>' : ''}
            <th>매수 주 수량</th>
            <th>매수</th>
          </tr>
        </thead>
        <tbody>
          ${Object.entries(prices).map(([ticker, price]) => {
            const changePercent = calculatePriceChange(currentDay, ticker, price, visibleTickers);
            let changeDisplay = '';
            
            if (changePercent !== null) {
              const isUp = changePercent > 0;
              const color = isUp ? '#ef4444' : '#3b82f6'; // 빨간색(상승), 파란색(하락)
              const arrow = isUp ? '↑' : '↓';
              const sign = isUp ? '+' : '';
              changeDisplay = `
                <td style="color: ${color}; font-weight: 600;">
                  ${arrow} ${sign}${changePercent.toFixed(2)}%
                </td>
              `;
            } else if (currentDay > 0) {
              changeDisplay = '<td>-</td>';
            }
            
            // 최대 매수 가능 주 계산
            const maxBuyableShares = Math.floor(cash / price);
            
            return `
            <tr>
              <td><strong>${ticker}</strong></td>
              <td>${price.toLocaleString()} ₩</td>
              ${changeDisplay}
              <td>
                <input 
                  type="number" 
                  id="buy_${ticker}" 
                  placeholder="주 수량" 
                  min="0" 
                  step="1"
                  max="${maxBuyableShares}"
                  style="width: 120px;"
                  ${isDay0 ? 'disabled' : ''}
                />
                ${!isDay0 ? `<div style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">최대 ${maxBuyableShares.toLocaleString()}주</div>` : ''}
              </td>
              <td>
                <button 
                  class="btn-primary" 
                  onclick="handleBuy('${ticker}')"
                  style="padding: 8px 16px; font-size: 14px;"
                  ${isDay0 ? 'disabled' : ''}
                >
                  매수
                </button>
              </td>
            </tr>
          `;
          }).join("")}
        </tbody>
      </table>
    </div>
  `;
  if (pricesDiv) pricesDiv.innerHTML = html;
}

// 매수 처리
window.handleBuy = async function(ticker) {
  const input = document.getElementById(`buy_${ticker}`);
  const shares = parseFloat(input.value);

  if (!shares || shares <= 0) {
    showToast("매수할 주 수량을 입력해주세요.", "warning");
    return;
  }

  if (!currentPrices[ticker]) {
    showToast("종목 가격 정보를 찾을 수 없습니다.", "error");
    return;
  }

  const price = currentPrices[ticker];
  const amount = shares * price;

  try {
    showLoadingOverlay("매수 주문 처리 중...");
    
    await submitUserOrders(currentUser, [{ ticker, amount_krw: amount }]);

    input.value = "";
    await loadDashboard();
    showToast(`${shares.toFixed(0)}주 매수가 완료되었습니다.`, "success");
  } catch (err) {
    console.error(err);
    showToast("매수 실패: " + err.message, "error");
  } finally {
    hideLoadingOverlay();
  }
};

// 매도 처리
window.handleSell = async function(ticker) {
  const input = document.getElementById(`sell_${ticker}`);
  const shares = parseFloat(input.value);

  if (!shares || shares <= 0) {
    showToast("매도할 주 수량을 입력해주세요.", "warning");
    return;
  }

  if (!currentPrices[ticker]) {
    showToast("종목 가격 정보를 찾을 수 없습니다.", "error");
    return;
  }

  const price = currentPrices[ticker];
  const amount = shares * price;

  try {
    showLoadingOverlay("매도 주문 처리 중...");
    
    await submitUserOrders(currentUser, [{ ticker, amount_krw: -amount }]);

    input.value = "";
    await loadDashboard();
    showToast(`${shares.toFixed(0)}주 매도가 완료되었습니다.`, "success");
  } catch (err) {
    console.error(err);
    showToast("매도 실패: " + err.message, "error");
  } finally {
    hideLoadingOverlay();
  }
};

// 전량 매도 처리
window.handleSellAll = async function(ticker) {
  if (!currentState || !currentState.user) {
    showToast("사용자 정보를 불러올 수 없습니다.", "error");
    return;
  }

  const holdings = currentState.user.holdings || {};
  const shares = holdings[ticker];

  if (!shares || shares <= 0) {
    showToast("매도할 주식이 없습니다.", "warning");
    return;
  }

  if (!currentPrices[ticker]) {
    showToast("종목 가격 정보를 찾을 수 없습니다.", "error");
    return;
  }

  const price = currentPrices[ticker];
  const amount = shares * price;

  try {
    showLoadingOverlay("전량 매도 주문 처리 중...");
    
    await submitUserOrders(currentUser, [{ ticker, amount_krw: -amount }]);

    await loadDashboard();
    showToast(`${shares.toFixed(0)}주 전량 매도가 완료되었습니다.`, "success");
  } catch (err) {
    console.error(err);
    showToast("매도 실패: " + err.message, "error");
  } finally {
    hideLoadingOverlay();
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
    
    // 현재 Day 정보 로드
    await refreshCurrentDay();
    
    // 사용자 목록과 순위 자동 로드
    await refreshUsersList();
    await showRankings();
    
    setLoading("");
  } catch (err) {
    console.error(err);
    showToast("관리자 대시보드를 불러오는데 실패했습니다: " + err.message, "error");
    setLoading("");
  }
}

// 현재 Day 정보 새로고침
async function refreshCurrentDay() {
  try {
    const stateDoc = await ensureStateDocument();
    const currentDay = stateDoc.currentDay ?? 0;
    const currentDayDisplay = $("currentDayDisplay");
    if (currentDayDisplay) {
      currentDayDisplay.textContent = `Day ${currentDay}`;
    }
  } catch (err) {
    console.error("Day 정보 불러오기 실패:", err);
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
      const confirmed1 = await showConfirm(
        "⚠️ 경고: 모든 데이터를 삭제하시겠습니까?\n\n" +
        "삭제되는 항목:\n" +
        "• 모든 사용자의 Firestore 데이터 (계정, 자산, 투자 내역)\n" +
        "• 모든 사용자의 Firebase Auth 계정 (ADMIN 제외)\n" +
        "• 게임 상태 정보 (Day가 1로 초기화됨)\n\n" +
        "⚠️ 주의: 이 작업은 되돌릴 수 없습니다.\n" +
        "삭제된 계정으로는 재가입이 가능합니다.",
        "전체 초기화 경고"
      );
      if (!confirmed1) return;
      
      const confirmed2 = await showConfirm("정말로 모든 데이터를 삭제하고 Day를 1로 초기화하시겠습니까?", "최종 확인");
      if (!confirmed2) return;
      
      try {
        setLoading("전체 초기화 중... (Firestore 데이터 삭제 중)");
        const result = await resetAllData();
        if (result && result.deletedCount !== undefined) {
          showToast(
            `전체 초기화가 완료되었습니다. Day가 1로 초기화되었고, ${result.deletedCount}개의 Auth 계정이 삭제되었습니다.`,
            "success",
            6000
          );
        } else {
          showToast("전체 초기화가 완료되었습니다. Day가 1로 초기화되었습니다.", "success", 5000);
        }
        await refreshCurrentDay();
        await refreshUsersList();
      } catch (err) {
        console.error(err);
        showToast("초기화 실패: " + err.message, "error", 6000);
      } finally {
        setLoading("");
      }
    };
  }

  if (btnResetAccounts) {
    btnResetAccounts.onclick = async () => {
      const confirmed = await showConfirm("⚠️ 경고: 모든 계정을 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.", "계정 삭제 경고");
      if (!confirmed) return;
      
      try {
        setLoading("계정 삭제 중...");
        await resetAccountsOnly();
        showToast("계정 삭제가 완료되었습니다.", "success");
        await refreshUsersList();
      } catch (err) {
        console.error(err);
        showToast("삭제 실패: " + err.message, "error");
      } finally {
        setLoading("");
      }
    };
  }

  if (btnResetInvestments) {
    btnResetInvestments.onclick = async () => {
      const confirmed = await showConfirm("⚠️ 경고: 모든 구매 내역을 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.", "구매 내역 삭제 경고");
      if (!confirmed) return;
      
      try {
        setLoading("구매 내역 삭제 중...");
        await resetInvestmentsOnly();
        showToast("구매 내역 삭제가 완료되었습니다.", "success");
        await refreshUsersList();
      } catch (err) {
        console.error(err);
        showToast("삭제 실패: " + err.message, "error");
      } finally {
        setLoading("");
      }
    };
  }

  if (btnResetAssets) {
    btnResetAssets.onclick = async () => {
      const confirmed = await showConfirm("⚠️ 경고: 모든 자산 정보를 초기화하시겠습니까?\n현금과 보유 종목이 초기값으로 돌아갑니다.\n이 작업은 되돌릴 수 없습니다.", "자산 초기화 경고");
      if (!confirmed) return;
      
      try {
        setLoading("자산 초기화 중...");
        await resetAssetsOnly();
        showToast("자산 초기화가 완료되었습니다.", "success");
        await refreshUsersList();
      } catch (err) {
        console.error(err);
        showToast("초기화 실패: " + err.message, "error");
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

  // 관리자 대시보드 Day 넘기기 버튼
  const btnAdvanceDay = $("btnAdvanceDay");
  if (btnAdvanceDay) {
    btnAdvanceDay.onclick = async () => {
      const confirmed = await showConfirm("⚠️ 다음 Day로 이동하시겠습니까?\n모든 사용자 화면이 자동으로 새로고침됩니다.", "Day 진행 확인");
      if (!confirmed) return;
      
      try {
        setLoading("Day를 진행하는 중...");
        const newDay = await advanceDayAsAdmin(currentUser);
        showToast(`Day ${newDay}로 이동했습니다! 모든 사용자 화면이 자동으로 새로고침됩니다.`, "success", 5000);
        
        // Day 정보 업데이트
        await refreshCurrentDay();
        // 사용자 목록과 순위도 새로고침 (새로운 가격이 적용되었으므로)
        await refreshUsersList();
        await showRankings();
      } catch (err) {
        console.error(err);
        showToast("Day 진행 실패: " + err.message, "error");
      } finally {
        setLoading("");
      }
    };
  }

  if (btnNext) {
    btnNext.onclick = async () => {
      const token = adminTokenInput?.value.trim();
      if (!token) {
        showToast("관리자 토큰을 입력하세요.", "warning");
        return;
      }

      try {
        setLoading("Day를 진행하는 중...");
        await advanceDayWithToken(token);
        showToast("다음 Day로 이동했습니다.", "success");
        if (adminTokenInput) adminTokenInput.value = "";
        await refreshUsersList();
        await showRankings();
      } catch (err) {
        console.error(err);
        showToast("Day 진행 실패: " + err.message, "error");
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
                .map(([ticker, qty]) => `${ticker}: ${qty.toFixed(0)}`)
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
    showToast("사용자 목록을 불러오는데 실패했습니다: " + err.message, "error");
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
    showToast("순위를 불러오는데 실패했습니다: " + err.message, "error");
    setLoading("");
  }
}

// 사용자 삭제 처리
window.handleDeleteUser = async function(userId) {
  const confirmed = await showConfirm(`사용자 "${userId}"를 정말 삭제하시겠습니까?\n계정과 모든 투자 내역이 삭제됩니다.`, "사용자 삭제 확인");
  if (!confirmed) return;
  
  try {
    setLoading("사용자 삭제 중...");
    await deleteUser(userId);
    showToast("사용자가 삭제되었습니다.", "success");
    await refreshUsersList();
    await showRankings();
  } catch (err) {
    console.error(err);
    showToast("삭제 실패: " + err.message, "error");
  } finally {
    setLoading("");
  }
};

// 자산 조정 처리
window.handleAdjustAssets = async function(userId) {
  const cashAdjustment = await showPrompt(
    `${userId}의 현금을 조정하세요.\n양수: 추가, 음수: 차감\n예: 1000000 또는 -500000`,
    "현금 조정",
    ""
  );
  if (cashAdjustment === null || cashAdjustment === "") return;
  
  const cashAdj = parseFloat(cashAdjustment);
  if (isNaN(cashAdj)) {
    showToast("올바른 숫자를 입력하세요.", "error");
    return;
  }

  const holdingsInput = await showPrompt(
    `${userId}의 보유 종목을 조정하세요.\n형식: TICKER:수량,TICKER:수량\n예: AAA:10,BBB:-5\n(양수: 추가, 음수: 차감)`,
    "보유 종목 조정",
    ""
  );
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
      showToast("보유 종목 형식이 올바르지 않습니다.", "error");
      return;
    }
  }

  try {
    setLoading("자산 조정 중...");
    await adjustUserAssets(userId, cashAdj, holdingsAdj);
    showToast("자산이 조정되었습니다.", "success");
    await refreshUsersList();
    await showRankings();
  } catch (err) {
    console.error(err);
    showToast("자산 조정 실패: " + err.message, "error");
  } finally {
    setLoading("");
  }
};

// 상태 변경 감시 설정 (일반 사용자용)
function setupStateWatcher() {
  // 기존 구독이 있으면 해제
  if (stateUnsubscribe) {
    stateUnsubscribe();
    stateUnsubscribe = null;
  }
  
  // 상태 변경 감시 시작
  stateUnsubscribe = watchStateChange((newDay, oldDay) => {
    console.log(`Day 변경 감지: Day ${oldDay} → Day ${newDay}`);
    
    // 사용자에게 알림 표시
    const notification = document.createElement("div");
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #4ade80;
      color: white;
      padding: 16px 24px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      z-index: 10000;
      font-weight: 600;
      animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = `새로운 Day ${newDay}로 이동했습니다! 화면을 새로고침합니다...`;
    document.body.appendChild(notification);
    
    // 1.5초 후 알림 제거하고 대시보드 새로고침
    setTimeout(() => {
      notification.remove();
      // 대시보드 새로고침
      loadDashboard();
    }, 1500);
  });
}

// 인증 상태 복원 함수
async function restoreAuthState() {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, async (user) => {
      // 인증 상태 확인 완료 후 로딩 화면 숨김
      if (authLoadingScreen) {
        authLoadingScreen.classList.add("hidden");
      }
      
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
              // 일반 사용자인 경우 상태 감시 설정
              if (!isAdmin && !stateUnsubscribe) {
                setupStateWatcher();
              }
            }
          } catch (err) {
            console.error("인증 상태 복원 실패:", err);
            // 복원 실패 시 로그인 화면 표시
            showLoginScreen();
          }
        } else {
          // userId 추출 실패 시 로그인 화면 표시
          showLoginScreen();
        }
      } else {
        // 인증된 사용자가 없으면 로그인 화면 표시
        showLoginScreen();
      }
      resolve();
    });
  });
}

// 로그인 화면 표시 함수
function showLoginScreen() {
  // 상태 감시 구독 해제
  if (stateUnsubscribe) {
    stateUnsubscribe();
    stateUnsubscribe = null;
  }
  
  // 로딩 화면 숨김 (이미 숨겨져 있을 수 있지만 안전하게 처리)
  if (authLoadingScreen) {
    authLoadingScreen.classList.add("hidden");
  }
  
  document.body.classList.add("login-screen");
  if (loginCard) loginCard.style.display = "block";
  if (statusCard) statusCard.style.display = "none";
  if (tradeCard) tradeCard.style.display = "none";
  if (adminCard) adminCard.style.display = "none";
  if (adminDashboard) adminDashboard.style.display = "none";
  if (btnLogout) btnLogout.style.display = "none";
  clearLoginMessage();
}

// 페이지 로드 시 관리자 기능 초기화 및 인증 상태 복원
initAdminFunctions();
restoreAuthState();

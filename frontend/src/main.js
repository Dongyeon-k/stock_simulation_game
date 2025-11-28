// src/main.js

// 백엔드 API URL 설정
// 백엔드 서버는 8000 포트에서 실행되어야 합니다
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
const loadHint = $("loadHint");
const pricesDiv = $("prices");
const btnReset = $("btnReset");

// 전역 상태
let currentUser = null;
let currentPassword = null;
let currentState = null;
let currentPrices = {};

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

    await apiCall("/signup", {
      method: "POST",
      body: JSON.stringify({ user_id: userId, password }),
    });

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

    const result = await apiCall("/login", {
      method: "POST",
      body: JSON.stringify({ user_id: userId, password }),
    });

    if (result.ok) {
      currentUser = userId;
      currentPassword = password;
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
btnLogout.onclick = () => {
  currentUser = null;
  currentPassword = null;
  currentState = null;
  currentPrices = {};
  
  document.body.classList.add("login-screen");
  loginCard.style.display = "block";
  statusCard.style.display = "none";
  tradeCard.style.display = "none";
  adminCard.style.display = "none";
  btnLogout.style.display = "none";
  userIdInput.value = "";
  passwordInput.value = "";
  setStatus("사용자 정보를 불러오면 현황이 나타납니다.");
};

// 대시보드 로드
async function loadDashboard() {
  try {
    setLoading("정보를 불러오는 중...");
    
    // 상태 조회
    const state = await apiCall(`/state?user_id=${encodeURIComponent(currentUser)}`, {
      headers: {
        "x-auth-password": currentPassword,
      },
    });

    currentState = state;

    // 가격 조회
    const pricesData = await apiCall(`/prices?day=${state.current_day}`);
    currentPrices = pricesData.prices;

    // 화면 업데이트
    document.body.classList.remove("login-screen");
    loginCard.style.display = "none";
    statusCard.style.display = "block";
    tradeCard.style.display = "block";
    btnLogout.style.display = "inline-block";
    
    // 관리자 카드는 항상 표시 (토큰 입력 후 사용)
    if (adminCard) {
      adminCard.style.display = "block";
    }

    renderAccountStatus(state);
    renderHoldings(state);
    renderTradingSection(pricesData);

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
        <div style="font-size: 18px; font-weight: 600; color: var(--accent);">${user.portfolio_value.toLocaleString()} ₩</div>
      </div>
      <div class="account-stat">
        <div style="font-size: 13px; color: var(--text-muted); margin-bottom: 4px;">현재 Day</div>
        <div style="font-size: 18px; font-weight: 600;">Day ${currentState.current_day}</div>
      </div>
    </div>
  `;
  setStatus(html);
  
  // 로그아웃 버튼 이벤트 재등록
  const logoutBtn = $("btnLogout");
  if (logoutBtn) {
    logoutBtn.onclick = btnLogout.onclick;
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
function renderTradingSection(pricesData) {
  const prices = pricesData.prices;
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
  pricesDiv.innerHTML = html;
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
    
    await apiCall("/order", {
      method: "POST",
      headers: {
        "x-auth-password": currentPassword,
      },
      body: JSON.stringify({
        user_id: currentUser,
        orders: [{ ticker, amount_krw: amount }],
      }),
    });

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
    
    await apiCall("/order", {
      method: "POST",
      headers: {
        "x-auth-password": currentPassword,
      },
      body: JSON.stringify({
        user_id: currentUser,
        orders: [{ ticker, amount_krw: -amount }],
      }),
    });

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

// 관리자 기능
const adminTokenInput = $("adminToken");
const btnNext = $("btnNext");

if (btnNext) {
  btnNext.onclick = async () => {
    const token = adminTokenInput?.value.trim();
    if (!token) {
      alert("관리자 토큰을 입력하세요.");
      return;
    }

    try {
      setLoading("Day를 진행하는 중...");
      await apiCall("/admin/advance", {
        method: "POST",
        headers: {
          "x-admin-token": token,
        },
      });

      if (currentUser) {
        await loadDashboard();
      }
      alert("다음 Day로 이동했습니다.");
      if (adminTokenInput) adminTokenInput.value = "";
    } catch (err) {
      console.error(err);
      alert("Day 진행 실패: " + err.message);
    } finally {
      setLoading("");
    }
  };
}

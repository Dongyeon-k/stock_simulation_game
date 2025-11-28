// src/main.js

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKRNx5MFaczdxMrH8pKfLiXISsCRw2Gro",
  authDomain: "stock-simulation-24b9b.firebaseapp.com",
  projectId: "stock-simulation-24b9b",
  storageBucket: "stock-simulation-24b9b.firebasestorage.app",
  messagingSenderId: "824547600994",
  appId: "1:824547600994:web:0a29d79221b8b613a8ff3b",
  measurementId: "G-9YQ52P6XVV"
};

// 2) Firebase 초기화
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// 초기 로그인 화면 스타일 적용
document.body.classList.add("login-screen");

// 3) DOM 요소 가져오기
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

// 4) UI 헬퍼 함수
function setLoading(message) {
  loadHint.textContent = message ?? "";
}

function setStatus(html) {
  const statusContent = $("statusContent");
  if (statusContent) {
    statusContent.innerHTML = html;
  } else {
    statusCard.innerHTML = html;
  }
}

// 5) 회원가입
btnSignup.onclick = async () => {
  try {
    setLoading("회원가입 중입니다...");
    const email = userIdInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
      alert("아이디와 비밀번호를 입력하세요.");
      return;
    }

    // 여기서는 "이메일" 자리에 userId를 그냥 넣어버리는 방식 (간단 버전)
    const cred = await auth.createUserWithEmailAndPassword(
      email + "@samsung.com",
      password
    );

    // 새 계좌 기본값 생성
    await db.collection("accounts").doc(cred.user.uid).set({
      userId: email,
      balance: 1_000_000,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    alert("회원가입 완료! 자동으로 로그인됩니다.");
  } catch (err) {
    console.error(err);
    alert("회원가입 실패: " + err.message);
  } finally {
    setLoading("");
  }
};

// 6) 로그인
btnLogin.onclick = async () => {
  try {
    setLoading("로그인 중입니다...");
    const email = userIdInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
      alert("아이디와 비밀번호를 입력하세요.");
      return;
    }

    await auth.signInWithEmailAndPassword(email + "@samsung.com", password);
  } catch (err) {
    console.error(err);
    alert("로그인 실패: " + err.message);
  } finally {
    setLoading("");
  }
};

// 7) 로그아웃
btnLogout.onclick = async () => {
  try {
    await auth.signOut();
    // 로그아웃 후 입력 필드 초기화
    userIdInput.value = "";
    passwordInput.value = "";
  } catch (err) {
    console.error(err);
    alert("로그아웃 실패: " + err.message);
  }
};

// 8) 로그인 상태 변경 감지
auth.onAuthStateChanged(async (user) => {
  if (user) {
    // 로그인 된 상태 - 로그인 카드 숨기고 거래 화면 표시
    document.body.classList.remove("login-screen");
    loginCard.style.display = "none";
    statusCard.style.display = "block";
    btnLogout.style.display = "inline-block";

    // 계좌 정보 가져오기
    const accSnap = await db.collection("accounts").doc(user.uid).get();
    if (!accSnap.exists) {
      setStatus("<p>계좌 정보가 없습니다.</p>");
      tradeCard.style.display = "none";
      adminCard.style.display = "none";
      return;
    }

    const acc = accSnap.data();

    setStatus(`
      <p style="margin: 6px 0 0; font-size: 14px; color: #64748b;">
        사용자 ID: <strong>${acc.userId}</strong>
      </p>
      <p style="margin: 4px 0 0;">잔액: <strong>${acc.balance.toLocaleString()} ₩</strong></p>
    `);

    // 거래 UI 활성화
    tradeCard.style.display = "block";

    // 관리자 계정 확인 (사용자 ID가 "admin"인 경우)
    if (acc.userId && acc.userId.toLowerCase() === "admin") {
      adminCard.style.display = "block";
    } else {
      adminCard.style.display = "none";
    }
  } else {
    // 로그아웃 상태 - 로그인 카드만 표시
    document.body.classList.add("login-screen");
    loginCard.style.display = "block";
    statusCard.style.display = "none";
    tradeCard.style.display = "none";
    adminCard.style.display = "none";
    btnLogout.style.display = "none";
    setStatus("사용자 정보를 불러오면 현황이 나타납니다.");
  }
});

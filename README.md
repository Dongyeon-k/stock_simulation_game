## Stock Simulation Game

주식 시뮬레이션 게임입니다. Firebase (Firestore + Authentication)를 백엔드로 사용하는 클라우드 기반 웹 게임입니다.

## 🚀 빠른 시작 (로컬 개발)

### 1. 프론트엔드 실행

```bash
cd frontend
npm install
npm run dev
```

브라우저에서 `http://localhost:5173` 접속 후 아이디/비밀번호로 가입/로그인하면 됩니다.

**참고**: 이 프로젝트는 Firebase를 사용하므로 별도의 백엔드 서버를 실행할 필요가 없습니다.

---

## 🌐 Firebase 배포 (프로덕션)

로컬 PC를 꺼도 다른 사람들이 접속할 수 있도록 Firebase에 배포하려면:

### 빠른 배포 가이드

```bash
# 1. Firebase CLI 설치 (최초 1회)
npm install -g firebase-tools

# 2. Firebase 로그인
firebase login

# 3. 배포 실행
npm run deploy
```

자세한 배포 가이드는 **[FIREBASE_DEPLOYMENT.md](./FIREBASE_DEPLOYMENT.md)**를 참고하세요.

배포 후 제공되는 URL (예: `https://stock-simulation-24b9b.web.app`)을 공유하면 다른 사람들도 접속할 수 있습니다! 🎉

---

## 📊 데이터 저장

- **Firestore Database**: 모든 사용자 계정, 자산, 투자 내역이 클라우드에 저장됩니다.
- **Firebase Authentication**: 사용자 인증을 관리합니다.
- **가격 데이터**: `frontend/src/data/prices.js`에 일별 주식 가격이 저장됩니다.

---

## 👨‍💼 관리자 기능

### 관리자 계정 로그인
- **아이디**: `ADMIN` (대소문자 구분 없음)
- **비밀번호**: 기본값은 `top081800!`입니다.
- 비밀번호 변경: `frontend/.env` 파일에 `VITE_ADMIN_PASSWORD=원하는비밀번호` 추가

### 관리자 대시보드 기능
관리자로 로그인하면 전용 대시보드가 표시되며, 다음 기능을 사용할 수 있습니다:
1. **Day 진행**: 게임을 다음 날로 진행
2. **전체 초기화**: Firestore의 모든 데이터 삭제
3. **사용자 관리**: 모든 사용자 목록 조회, 평가 금액 확인, 개인별 계정 삭제 및 자산 조정
4. **순위 조회**: 평가 금액 기준 순위 확인

---

## 📝 환경 변수

### 프론트엔드
- `VITE_ADMIN_PASSWORD`: 관리자 비밀번호 (기본값: `top081800!`)

`.env` 파일 생성 (선택사항):
```bash
# frontend/.env
VITE_ADMIN_PASSWORD=your_secure_password
```

---

## 🔧 프로젝트 구조

```
stock_simulation_game/
├── frontend/           # 프론트엔드 (Vite + Firebase)
│   ├── src/
│   │   ├── firebase.js      # Firebase 설정
│   │   ├── services/
│   │   │   └── gameStore.js # Firestore 데이터 접근
│   │   └── ...
│   └── ...
├── backend/            # 레거시 백엔드 (사용 안 함)
├── firebase.json       # Firebase 배포 설정
├── firestore.rules     # Firestore 보안 규칙
└── .firebaserc         # Firebase 프로젝트 ID
```

---

## 📚 추가 문서

- **[FIREBASE_DEPLOYMENT.md](./FIREBASE_DEPLOYMENT.md)**: 상세한 Firebase 배포 가이드
- **[DEPLOYMENT.md](./DEPLOYMENT.md)**: 일반 배포 방법 (레거시)

---

## ✅ 주요 기능

- ✅ Firebase 인증을 통한 회원가입/로그인
- ✅ 실시간 주식 거래 시뮬레이션
- ✅ 포트폴리오 관리 및 평가
- ✅ 관리자 대시보드 (사용자 관리, Day 진행 등)
- ✅ 순위 시스템
- ✅ 반응형 디자인

---

## 🔒 보안

- Firestore 보안 규칙으로 데이터 접근 제어
- 사용자는 자신의 데이터만 접근 가능
- 관리자만 전체 데이터 접근 가능


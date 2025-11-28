## Stock Simulation Game (Firebase Edition)

이 레포는 FastAPI 백엔드를 제거하고 **Firebase Authentication + Firestore**로 전면 이관된 버전입니다. 참가자는 아이디/비밀번호 조합으로 가입·로그인하고, 모든 자산/투자 기록은 Firestore에 저장됩니다.

---

### 1. 선행 준비
1. [Firebase Console](https://console.firebase.google.com/)에서 새 프로젝트를 생성합니다.
2. 웹 앱을 등록하고 발급된 `firebaseConfig`를 `frontend/src/firebase.js`에 붙여넣습니다.
3. 콘솔에서 다음 서비스를 활성화하세요.
   - **Authentication** → 이메일/비밀번호 로그인 사용 설정
   - **Cloud Firestore** → 데이터베이스 만들기 (개발 중에는 테스트 규칙, 배포 전에는 제한 규칙 적용)

> 기본 관리자 토큰은 `changeme`이며, `meta/state` 문서의 `adminTokenHash` 필드를 업데이트하면 언제든 교체할 수 있습니다. 새 토큰을 정하면 SHA-256 해시를 구해 해당 필드에 저장하세요.

---

### 2. Firestore 구조
```
meta/state                  // currentDay, visibleTickers, adminTokenHash 등
users/{USER_ID}             // cash, holdings 맵
users/{USER_ID}/investments // Day별 저장 내역 (orders, savedAt)
```

- 앱을 최초 실행하면 `meta/state`가 없을 경우 자동으로 생성되며 `currentDay=1`, `visibleTickers=6`, `adminTokenHash(=changeme)` 값을 갖습니다.
- 가격 데이터는 `frontend/src/data/prices.js`에 포함되어 있으며, Firestore에는 저장하지 않습니다.

---

### 3. 로컬 개발
```bash
cd frontend
npm install
npm run dev
```

- 브라우저에서 `http://localhost:5173` 접속 후 아이디/비밀번호로 가입/로그인하면 됩니다.
- Firebase Authentication에는 `USER_ID@stocksimgame.local` 형태의 가상 이메일이 생성됩니다.

---

### 4. 관리자 Day 전환
1. 로그인 여부와 상관없이 관리자 토큰을 입력하고 **다음 Day로 이동** 버튼을 누르면 됩니다.
2. 기본 토큰 `changeme` → SHA-256 해시 `057ba03d6c44104863dc7361fe4578965d1887360f90a0895882e58a6248fc86`.
3. Day 값은 Firestore `meta/state.currentDay`에 저장되며, 5일차까지 미리 정의된 가격 데이터를 순차적으로 사용합니다.

---

### 5. 배포
- `firebase init hosting`으로 Hosting을 설정하고, `npm run build` 후 `firebase deploy --only hosting`을 실행하면 정적 사이트를 배포할 수 있습니다.
- Firestore/Authentication 보안 규칙을 반드시 점검한 뒤 배포하세요.

---

필요 시 Cloud Functions로 관리자 로직을 이전하거나 Firestore 규칙을 고도화하여 추가적인 보안을 적용할 수 있습니다. 문제가 있으면 이 README를 참고해 구성을 다시 확인해주세요.


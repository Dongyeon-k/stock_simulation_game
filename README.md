## Stock Simulation Game

주식 시뮬레이션 게임입니다. FastAPI 백엔드와 Vite 프론트엔드로 구성되어 있습니다.

---

### 1. 백엔드 서버 실행

백엔드 서버를 먼저 실행해야 합니다:

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

또는 Python 모듈로 직접 실행:

```bash
cd backend
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

서버가 정상적으로 실행되면 `http://localhost:8000`에서 API를 사용할 수 있습니다.
`http://localhost:8000/docs`에서 Swagger UI를 통해 API를 테스트할 수 있습니다.

---

### 2. 프론트엔드 실행

새 터미널에서:

```bash
cd frontend
npm install
npm run dev
```

브라우저에서 `http://localhost:5173` 접속 후 아이디/비밀번호로 가입/로그인하면 됩니다.

---

### 3. 데이터 구조

- **백엔드**: `backend/db.json`에 사용자 계정, 자산, 투자 내역이 저장됩니다.
- **가격 데이터**: `backend/prices.csv`에 일별 주식 가격이 저장됩니다.

---

### 4. 관리자 기능

기본 관리자 토큰은 `changeme`입니다. 환경변수 `ADMIN_TOKEN`으로 변경할 수 있습니다.

관리자 콘솔에서 토큰을 입력하고 "다음 Day로 이동" 버튼을 클릭하면 게임이 다음 날로 진행됩니다.

---

### 5. 환경 변수 (백엔드)

- `ADMIN_TOKEN`: 관리자 토큰 (기본값: "changeme")
- `INITIAL_CASH`: 초기 현금 (기본값: 10000000)
- `VISIBLE_TICKERS`: 표시할 종목 수 (기본값: 6)

---

### 6. 배포

프론트엔드 빌드:
```bash
npm run build
```

빌드된 파일은 `frontend/dist/` 폴더에 생성됩니다.


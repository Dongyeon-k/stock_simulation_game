# Firebase 배포 가이드

이 문서는 Stock Simulation Game을 Firebase에 배포하여 로컬 PC를 끄더라도 다른 사람들이 접속하여 게임을 할 수 있도록 하는 방법을 안내합니다.

## 📋 사전 준비 사항

### 1. Firebase 프로젝트 설정

현재 프로젝트는 **stock-simulation-24b9b** Firebase 프로젝트를 사용합니다.

#### Firebase Console에서 확인/설정:
1. [Firebase Console](https://console.firebase.google.com) 접속
2. 프로젝트 선택: `stock-simulation-24b9b`
3. **Authentication (인증)** 활성화
   - Firebase Console → Authentication → Sign-in method
   - **이메일/비밀번호** 로그인 활성화
4. **Firestore Database** 생성
   - Firebase Console → Firestore Database → 데이터베이스 만들기
   - **테스트 모드로 시작** 선택 (보안 규칙은 배포 후 적용됨)

### 2. Firebase CLI 설치

```bash
# Firebase CLI가 설치되어 있지 않다면 설치
npm install -g firebase-tools

# Firebase에 로그인
firebase login

# 프로젝트 확인
firebase projects:list
```

## 🚀 배포 단계

### 1단계: Firebase CLI 로그인 확인

```bash
firebase login
```

브라우저가 열리면 Google 계정으로 로그인합니다.

### 2단계: 프로젝트 연결 확인

```bash
firebase use
```

출력 예시:
```
Active Project: stock-simulation-24b9b
```

만약 다른 프로젝트가 활성화되어 있다면:
```bash
firebase use stock-simulation-24b9b
```

### 3단계: 빌드 및 배포

프로젝트 루트 디렉토리에서 실행:

```bash
# 전체 배포 (Hosting + Firestore 규칙)
firebase deploy

# 또는 개별 배포
firebase deploy --only hosting        # 프론트엔드만 배포
firebase deploy --only firestore:rules # Firestore 규칙만 배포
```

배포가 시작되면:
1. 자동으로 프론트엔드 빌드가 실행됩니다 (`npm run build`)
2. 빌드된 파일이 Firebase Hosting에 업로드됩니다
3. Firestore 보안 규칙이 업로드됩니다

### 4단계: 배포 확인

배포가 완료되면 다음과 같은 메시지가 표시됩니다:

```
✔ Deploy complete!

Project Console: https://console.firebase.google.com/project/stock-simulation-24b9b/overview
Hosting URL: https://stock-simulation-24b9b.web.app
```

이제 **Hosting URL**을 다른 사람들에게 공유하면 접속할 수 있습니다! 🎉

## 🔐 보안 설정

### Firestore 보안 규칙 배포

배포 시 자동으로 `firestore.rules` 파일의 보안 규칙이 적용됩니다.

보안 규칙은 다음을 보장합니다:
- ✅ 사용자는 자신의 데이터만 읽고 쓸 수 있음
- ✅ 관리자(ADMIN)는 모든 데이터에 접근 가능
- ✅ 인증되지 않은 사용자는 접근 불가

### 관리자 계정 설정

관리자 계정은 자동으로 생성되며:
- **ID**: `ADMIN`
- **비밀번호**: 환경 변수 `VITE_ADMIN_PASSWORD`로 설정 (기본값: `top081800!`)

환경 변수를 변경하려면 `.env` 파일을 생성하거나 빌드 시 설정:
```bash
# .env 파일 생성 (frontend/.env)
VITE_ADMIN_PASSWORD=your_secure_password

# 또는 빌드 시 직접 지정
VITE_ADMIN_PASSWORD=your_secure_password npm run build
```

## 📝 주요 파일 설명

- `firebase.json`: Firebase 배포 설정
- `.firebaserc`: Firebase 프로젝트 ID 설정
- `firestore.rules`: Firestore 보안 규칙
- `frontend/src/firebase.js`: Firebase 클라이언트 설정

## 🔄 업데이트 배포

코드를 수정한 후 다시 배포하려면:

```bash
# 변경사항 커밋 (Git 사용 시)
git add .
git commit -m "업데이트 내용"

# Firebase에 재배포
firebase deploy
```

## 🐛 문제 해결

### 배포 실패 시

1. **빌드 에러 확인**
   ```bash
   cd frontend
   npm install
   npm run build
   ```

2. **Firebase 로그인 확인**
   ```bash
   firebase login
   firebase logout  # 필요시 다시 로그인
   firebase login
   ```

3. **프로젝트 ID 확인**
   ```bash
   firebase use
   # .firebaserc 파일 확인
   ```

### Firestore 규칙 배포 실패 시

```bash
# 규칙 문법 확인
firebase deploy --only firestore:rules --dry-run
```

### Hosting 배포 실패 시

```bash
# 빌드 파일 확인
ls -la frontend/dist

# 수동 빌드 후 배포
cd frontend
npm run build
cd ..
firebase deploy --only hosting
```

## 🌐 커스텀 도메인 설정 (선택 사항)

Firebase Console → Hosting → "사용자 도메인 추가"를 통해 커스텀 도메인을 설정할 수 있습니다.

## 📊 모니터링

배포 후 Firebase Console에서 다음을 확인할 수 있습니다:
- **Hosting**: 트래픽, 에러 로그
- **Firestore**: 데이터베이스 사용량, 읽기/쓰기 통계
- **Authentication**: 로그인 통계
- **Analytics**: 사용자 행동 분석 (설정된 경우)

## ✅ 배포 체크리스트

배포 전 확인사항:
- [ ] Firebase CLI 설치 및 로그인 완료
- [ ] Firebase 프로젝트 ID 확인 (`.firebaserc`)
- [ ] Authentication 활성화 확인
- [ ] Firestore Database 생성 확인
- [ ] 로컬에서 `npm run build` 성공 확인
- [ ] `firebase deploy` 실행
- [ ] 배포된 URL에서 접속 테스트
- [ ] 회원가입/로그인 기능 테스트
- [ ] 거래 기능 테스트
- [ ] 관리자 기능 테스트

## 🎯 주요 장점

✅ **서버리스**: 백엔드 서버가 필요 없음 (Firestore + Firebase Auth 사용)  
✅ **무료 티어**: 적은 트래픽에서는 무료로 사용 가능  
✅ **자동 HTTPS**: SSL 인증서 자동 관리  
✅ **CDN**: 전 세계 어디서나 빠른 접속  
✅ **24/7 운영**: 로컬 PC를 꺼도 계속 접속 가능  

---

**배포 완료 후 URL을 공유하여 다른 사람들이 게임에 참여할 수 있습니다!** 🚀


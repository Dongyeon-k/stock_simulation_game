# 배포 가이드

이 문서는 Stock Simulation Game을 다른 사람들이 접속할 수 있도록 배포하는 방법을 안내합니다.

## 배포 방법

### 방법 1: Firebase Hosting (권장)

Firebase Hosting을 사용하면 무료로 HTTPS가 적용된 안정적인 웹사이트를 배포할 수 있습니다.

#### 1단계: Firebase CLI 설치 및 로그인

```bash
# Firebase CLI가 설치되어 있지 않다면 설치
npm install -g firebase-tools

# Firebase에 로그인
firebase login
```

#### 2단계: 프로젝트 확인

`.firebaserc` 파일에서 프로젝트 ID를 확인하거나, Firebase Console에서 프로젝트를 선택합니다.

#### 3단계: 배포 실행

프로젝트 루트 디렉토리에서 실행:

```bash
# 빌드 및 배포 (firebase.json의 predeploy 스크립트가 자동 실행됨)
firebase deploy --only hosting
```

또는 수동으로 빌드 후 배포:

```bash
cd frontend
npm install
npm run build
cd ..
firebase deploy --only hosting
```

#### 4단계: 배포 확인

배포가 완료되면 다음과 같은 URL이 표시됩니다:
```
✔ Deploy complete!

Project Console: https://console.firebase.google.com/project/YOUR_PROJECT_ID/overview
Hosting URL: https://YOUR_PROJECT_ID.web.app
```

이제 이 URL을 다른 사람들에게 공유하면 접속할 수 있습니다!

---

### 방법 2: Vercel 배포

Vercel은 GitHub 연동을 통해 자동 배포가 가능합니다.

#### 1단계: GitHub에 코드 푸시

```bash
git add .
git commit -m "배포 준비"
git push origin main
```

#### 2단계: Vercel에 프로젝트 연결

1. [Vercel](https://vercel.com)에 가입/로그인
2. "New Project" 클릭
3. GitHub 저장소 선택
4. 프로젝트 설정:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

#### 3단계: 환경 변수 설정 (필요시)

Vercel 대시보드에서 환경 변수를 설정할 수 있습니다.

---

### 방법 3: Netlify 배포

Netlify도 GitHub 연동을 지원합니다.

#### 1단계: GitHub에 코드 푸시

#### 2단계: Netlify에 프로젝트 연결

1. [Netlify](https://www.netlify.com)에 가입/로그인
2. "Add new site" → "Import an existing project"
3. GitHub 저장소 선택
4. 빌드 설정:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`

---

## 배포 전 필수 확인 사항

### 1. Firebase Authentication 설정

Firebase Console → Authentication → Sign-in method에서:
- ✅ **이메일/비밀번호** 로그인 활성화 확인
- ✅ 승인된 도메인에 배포 URL 추가 (자동 추가됨)

### 2. Firestore 보안 규칙 설정

Firebase Console → Firestore Database → Rules에서 다음 규칙을 설정하세요:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 인증된 사용자만 자신의 계정 정보 읽기/쓰기
    match /accounts/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // 모든 사용자가 메타 상태 읽기 가능 (Day 정보 등)
    match /meta/state {
      allow read: if request.auth != null;
      allow write: if false; // 관리자만 수정 (Cloud Functions 사용 권장)
    }
    
    // 사용자별 투자 내역
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      match /investments/{investmentId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

**중요**: 배포 전에 반드시 보안 규칙을 테스트하세요!

### 3. Firebase Config 확인

`frontend/src/main.js` 또는 `frontend/index.html`의 Firebase 설정이 올바른지 확인:
- API Key
- Auth Domain
- Project ID
- 등이 올바르게 설정되어 있는지 확인

### 4. CORS 설정 (필요시)

Firebase를 사용하는 경우 CORS 설정은 필요 없습니다. Firebase는 자동으로 처리합니다.

---

## 배포 후 확인 사항

1. ✅ 배포된 URL에서 접속 테스트
2. ✅ 회원가입/로그인 기능 테스트
3. ✅ 거래 기능 테스트
4. ✅ 관리자 콘솔 테스트 (admin 계정으로)
5. ✅ 모바일 브라우저에서도 테스트

---

## 문제 해결

### 배포 후 로그인이 안 될 때

1. Firebase Console → Authentication → Settings → 승인된 도메인 확인
2. Firestore 보안 규칙 확인
3. 브라우저 콘솔에서 에러 메시지 확인

### 빌드 에러가 발생할 때

```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Firebase CLI 로그인 문제

```bash
firebase logout
firebase login
```

---

## 추가 보안 권장 사항

1. **관리자 토큰 변경**: 기본 토큰 `changeme`를 더 강력한 토큰으로 변경
2. **Firestore 규칙 강화**: Cloud Functions를 사용하여 관리자 기능 분리
3. **Rate Limiting**: Firebase App Check 사용 고려
4. **모니터링**: Firebase Analytics 및 Crashlytics 설정

---

## 빠른 배포 체크리스트

- [ ] Firebase CLI 설치 및 로그인 완료
- [ ] `firebase.json` 설정 확인
- [ ] Firebase Authentication 활성화 확인
- [ ] Firestore 보안 규칙 설정 완료
- [ ] 로컬에서 `npm run build` 성공 확인
- [ ] `firebase deploy --only hosting` 실행
- [ ] 배포된 URL에서 기능 테스트

배포가 완료되면 배포된 URL을 공유하여 다른 사람들이 접속할 수 있습니다! 🚀


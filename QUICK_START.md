# 🚀 빠른 배포 가이드

이 문서는 Firebase에 배포하는 가장 빠른 방법을 안내합니다.

## 1단계: Firebase CLI 설치 (최초 1회만)

```bash
npm install -g firebase-tools
```

## 2단계: Firebase 로그인

```bash
firebase login
```

브라우저가 열리면 Google 계정으로 로그인합니다.

## 3단계: 배포 실행

프로젝트 루트 디렉토리에서:

```bash
npm run deploy
```

또는:

```bash
firebase deploy
```

## 4단계: 배포 완료!

배포가 완료되면 다음과 같은 URL이 표시됩니다:

```
Hosting URL: https://stock-simulation-24b9b.web.app
```

이 URL을 다른 사람들에게 공유하면 접속할 수 있습니다! 🎉

---

## 다음 배포 시

코드를 수정한 후 다시 배포하려면:

```bash
npm run deploy
```

끝! 더 이상 `npm run dev`를 실행할 필요가 없습니다. 로컬 PC를 꺼도 접속 가능합니다! ✅

---

## 문제가 생겼다면?

자세한 배포 가이드는 [FIREBASE_DEPLOYMENT.md](./FIREBASE_DEPLOYMENT.md)를 참고하세요.


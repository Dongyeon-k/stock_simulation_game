# 🔒 Firestore 권한 문제 해결 가이드

## ✅ 해결 완료

"Missing or insufficient permissions" 오류를 해결하기 위해 Firestore 보안 규칙을 업데이트하고 배포했습니다.

## 🔧 적용된 변경사항

1. **보안 규칙 단순화**: 더 명확하고 작동하는 규칙으로 수정
2. **대소문자 구분 없이 비교**: 사용자 ID 비교 시 대소문자 구분 없이 처리
3. **관리자 권한 명확화**: 관리자가 모든 사용자 데이터에 접근 가능하도록 설정

## 📋 현재 보안 규칙 요약

- ✅ 인증된 사용자는 `meta/state` 읽기 가능
- ✅ 관리자만 `meta/state` 쓰기 가능
- ✅ 사용자는 자신의 `users/{userId}` 문서만 읽기/쓰기 가능
- ✅ 관리자는 모든 `users/{userId}` 문서 읽기/쓰기 가능
- ✅ 사용자는 자신의 `investments` 서브컬렉션만 접근 가능
- ✅ 관리자는 모든 `investments` 접근 가능

## 🧪 테스트 방법

### 1. 일반 사용자 테스트
1. 회원가입 후 로그인
2. 대시보드 정보가 정상적으로 표시되는지 확인
3. 주문(매수/매도)이 정상적으로 작동하는지 확인

### 2. 관리자 테스트
1. ADMIN 계정으로 로그인
2. 관리자 대시보드에서 사용자 목록이 표시되는지 확인
3. 순위 조회가 정상적으로 작동하는지 확인
4. Day 진행 기능이 정상적으로 작동하는지 확인

## 🐛 여전히 오류가 발생한다면

### 1. 브라우저 캐시 삭제
- 개발자 도구(F12) → Application → Clear storage

### 2. Firestore 규칙 확인
Firebase Console에서 확인:
- https://console.firebase.google.com/project/stock-simulation-24b9b/firestore/rules

### 3. 로그 확인
브라우저 콘솔(F12)에서 자세한 오류 메시지 확인

### 4. 규칙 재배포
```bash
firebase deploy --only firestore:rules
```

## 📝 참고사항

- Firestore 규칙은 배포 후 즉시 적용됩니다
- 규칙 변경 시 최대 1분 정도 소요될 수 있습니다
- 브라우저를 새로고침하면 새로운 규칙이 적용됩니다

---

**문제가 해결되었는지 확인해주세요!** ✅


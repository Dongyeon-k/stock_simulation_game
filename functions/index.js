const {onCall} = require("firebase-functions/v2/https");
const {HttpsError} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");

admin.initializeApp();

// 모든 사용자 Auth 계정 삭제 (ADMIN 제외)
exports.deleteAllUsers = onCall(
  {
    region: "us-central1",
    enforceAppCheck: false,
  },
  async (request) => {
    console.log("deleteAllUsers 함수 호출됨");
    console.log("request.auth:", request.auth ? "존재" : "없음");
    
    // 관리자만 호출 가능하도록 검증
    if (!request.auth) {
      console.error("인증 정보가 없습니다.");
      throw new HttpsError("unauthenticated", "인증이 필요합니다.");
    }

    const userEmail = request.auth.token.email || "";
    console.log("요청한 사용자 이메일:", userEmail);
    
    // ADMIN 계정인지 확인
    if (!userEmail.endsWith("@stocksimgame.local") || 
        !userEmail.toLowerCase().startsWith("admin@")) {
      console.error("권한 없음 - 관리자가 아님:", userEmail);
      throw new HttpsError("permission-denied", "관리자만 이 기능을 사용할 수 있습니다.");
    }
    
    console.log("관리자 인증 확인됨, 사용자 삭제 시작");

  try {
    let deletedCount = 0;
    let nextPageToken;

    do {
      const listUsersResult = await admin.auth().listUsers(1000, nextPageToken);
      
      for (const userRecord of listUsersResult.users) {
        const email = userRecord.email || "";
        
        // ADMIN 계정은 제외 (전체 초기화 시에도 ADMIN은 유지)
        if (email.toLowerCase() === "admin@stocksimgame.local") {
          continue;
        }
        
        // ADMIN을 제외한 모든 사용자 삭제 (도메인 제한 없음)
        await admin.auth().deleteUser(userRecord.uid);
        deletedCount++;
      }
      
      nextPageToken = listUsersResult.pageToken;
    } while (nextPageToken);

    console.log(`사용자 삭제 완료: ${deletedCount}개`);
    return {
      success: true,
      deletedCount,
      message: `${deletedCount}개의 사용자 계정이 삭제되었습니다.`,
    };
  } catch (error) {
    console.error("사용자 삭제 오류:", error);
    console.error("에러 스택:", error.stack);
    throw new HttpsError("internal", "사용자 삭제 중 오류가 발생했습니다: " + error.message);
  }
  }
);


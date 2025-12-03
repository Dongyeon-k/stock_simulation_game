// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyBKRNx5MFaczdxMrH8pKfLiXISsCRw2Gro",
  authDomain: "stock-simulation-24b9b.firebaseapp.com",
  projectId: "stock-simulation-24b9b",
  storageBucket: "stock-simulation-24b9b.firebasestorage.app",
  messagingSenderId: "824547600994",
  appId: "1:824547600994:web:0a29d79221b8b613a8ff3b",
  measurementId: "G-9YQ52P6XVV",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// 리전을 명시적으로 지정 (배포된 함수와 일치)
const functions = getFunctions(app, "us-central1");

// Analytics는 브라우저 환경+https에서만 동작하므로 필요 시 조건부 사용
let analytics;
if (typeof window !== "undefined" && window.location.protocol === "https:") {
  analytics = getAnalytics(app);
}

// 필요한 Firebase 서비스 export
export { app, analytics, auth, db, functions };
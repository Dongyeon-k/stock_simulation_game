import { defineConfig } from "vite";

// GitHub Pages에 배포할 때는 저장소 이름을 base로 설정해야 합니다.
// 예: export VITE_BASE_PATH="/stock_simulation_game/" 후 npm build
const base = process.env.VITE_BASE_PATH || "/";

export default defineConfig({
  base,
  server: {
    host: "0.0.0.0", // 로컬 네트워크의 모든 인터페이스에서 접속 가능
    port: 5173, // 기본 포트 (원하는 포트로 변경 가능)
    strictPort: false, // 포트가 사용 중이면 자동으로 다른 포트 사용
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});


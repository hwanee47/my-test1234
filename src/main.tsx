import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Stack } from "@/stackManager";
import { LoadingProvider } from "@/contexts";
import { initEruda } from "@/eruda";

// // Pull-to-refresh 방지
// let touchStartY = 0;
// let touchEndY = 0;

// document.addEventListener(
//   "touchstart",
//   (e) => {
//     touchStartY = e.touches[0].clientY;
//   },
//   { passive: true }
// );

// document.addEventListener(
//   "touchmove",
//   (e) => {
//     touchEndY = e.touches[0].clientY;
//     // 스크롤이 맨 위에서 시작되고 아래로 당기면 방지
//     if (window.scrollY === 0 && touchEndY > touchStartY) {
//       e.preventDefault();
//     }
//   },
//   { passive: false }
// );

initEruda();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LoadingProvider>
      <Stack />
    </LoadingProvider>
  </StrictMode>
);

import { useEffect } from "react";
import CanvasDemoPage from "./components/CanvasDemoPage.jsx";
import RecruitmentPage from "./components/RecruitmentPage.jsx";
import { publicAssetUrl } from "./utils/publicAssetUrl.js";

export default function App() {
  const applicationPath = new URL(publicAssetUrl("")).pathname;
  const path = window.location.pathname
    .replace(applicationPath, "")
    .replace(/^\/+|\/+$/g, "");
  const isWalkerDemo =
    path === "hanmi-eye-tracking" ||
    path === "hanmi-eye-tracking/index.html" ||
    path.startsWith("hanmi-eye-tracking/hanmi-eye-tracking");
  const isReadingDemo =
    path === "hanmi-reading-eye-tracking" ||
    path === "hanmi-reading-eye-tracking/index.html";
  const isCanvasDemo = isWalkerDemo || isReadingDemo;

  useEffect(() => {
    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = publicAssetUrl(
      isCanvasDemo ? "css/canvas-demo.css" : "css/main.css",
    );
    document.head.appendChild(stylesheet);
    return () => stylesheet.remove();
  }, [isCanvasDemo]);

  if (isWalkerDemo) return <CanvasDemoPage variant="walker" />;
  if (isReadingDemo) return <CanvasDemoPage variant="reading" />;
  return <RecruitmentPage />;
}

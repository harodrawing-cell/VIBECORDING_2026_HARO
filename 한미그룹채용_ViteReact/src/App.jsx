import CanvasDemoPage from "./components/CanvasDemoPage.jsx";
import RecruitmentPage from "./components/RecruitmentPage.jsx";

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, "");

  if (
    path === "/hanmi-eye-tracking" ||
    path === "/hanmi-eye-tracking/index.html" ||
    path.startsWith("/hanmi-eye-tracking/hanmi-eye-tracking")
  ) {
    return <CanvasDemoPage variant="walker" />;
  }

  if (
    path === "/hanmi-reading-eye-tracking" ||
    path === "/hanmi-reading-eye-tracking/index.html"
  ) {
    return <CanvasDemoPage variant="reading" />;
  }

  return <RecruitmentPage />;
}

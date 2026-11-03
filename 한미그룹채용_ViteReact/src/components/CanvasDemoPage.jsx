import { useEffect } from "react";
import CanvasPlayer from "./CanvasPlayer.jsx";
import { publicAssetUrl } from "../utils/publicAssetUrl.js";

const pages = {
  walker: {
    documentTitle: "한미 캐릭터 · 마우스 시선 추적",
    title: "새로운 미래를 향해 나아갑니다",
    description: "마우스를 움직이면 캐릭터가 바라봅니다.",
  },
  reading: {
    documentTitle: "한미 돋보기 캐릭터 · 마우스 시선 추적",
    title: "한미 생활을 더 즐겁게 만드는 방법",
    description: "마우스를 움직이면 캐릭터가 바라봅니다.",
  },
};

export default function CanvasDemoPage({ variant }) {
  const page = pages[variant];

  useEffect(() => {
    document.title = page.documentTitle;
  }, [page.documentTitle]);

  return (
    <div className={`canvas-demo-page canvas-demo-page--${variant}`}>
      <header>
        <h1>{page.title}</h1>
        <p>{page.description}</p>
      </header>
      <main>
        <CanvasPlayer variant={variant} controls />
      </main>
      <footer>
        <p>원본 PNG 시퀀스 + Canvas 눈동자 합성</p>
        <a href={publicAssetUrl("")}>한미그룹 채용 페이지로 돌아가기</a>
      </footer>
    </div>
  );
}

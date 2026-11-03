import { publicAssetUrl } from "../../utils/publicAssetUrl.js";
import CanvasPlayer from "../CanvasPlayer.jsx";

export default function FutureSection() {
  return (
    <section className="mirae" id="mirae" aria-labelledby="mirae-title">
            <div className="mirae-inner">
              <h2 className="mirae-title" id="mirae-title">
                <span className="mirae-title-red">새로운 미래</span
                ><span className="mirae-title-black">를 향해 나아갑니다</span>
              </h2>
              <img
                className="mirae-cloud mirae-cloud-left"
                src={publicAssetUrl("images/mirae_cloud3.png")}
                alt="왼쪽 아래에 떠 있는 하얀 입체 구름"
              />
              <img
                className="mirae-cloud mirae-cloud-right"
                src={publicAssetUrl("images/mirae_cloud4.png")}
                alt="오른쪽에 떠 있는 커다란 하얀 입체 구름"
              />
              <img
                className="mirae-cloud mirae-cloud-blur-left"
                src={publicAssetUrl("images/mirae_cloud1.png")}
                alt="왼쪽 멀리 흐릿하게 떠 있는 구름"
              />
              <img
                className="mirae-cloud mirae-cloud-blur-right"
                src={publicAssetUrl("images/mirae_cloud2.png")}
                alt="오른쪽 아래 멀리 흐릿하게 떠 있는 작은 구름"
              />
              <div className="mirae-character-stage">
                <CanvasPlayer className="mirae-walking" variant="walker" />
                <img
                  className="mirae-star mirae-star-top"
                  src={publicAssetUrl("images/mirae_star1.png")}
                  alt="캐릭터 머리 오른쪽 위에 반짝이는 노란 별"
                />
                <img
                  className="mirae-star mirae-star-bottom"
                  src={publicAssetUrl("images/mirae_star2.png")}
                  alt="캐릭터 몸통 왼쪽 아래에 반짝이는 노란 별"
                />
              </div>
            </div>
          </section>
  );
}

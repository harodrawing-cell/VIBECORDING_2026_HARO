import { publicAssetUrl } from "../../utils/publicAssetUrl.js";
export default function WelfareSection() {
  return (
    <section className="welfare" id="welfare" aria-labelledby="welfare-title">
            <div className="welfare-inner">
              <header className="welfare-header">
                <h2 className="welfare-title" id="welfare-title">
                  한미 생활을<br className="welfare-title-break" />더 즐겁게 만드는 방법
                </h2>
                <p className="welfare-subtitle">
                  건강부터 성장, 휴식까지 알차게 준비한 복지를 소개할게요.
                </p>
                <img
                  className="welfare-character updown"
                  src={publicAssetUrl("images/imgi_76_con5_char.png")}
                  alt="거울을 보며 건강을 챙기는 한미 캐릭터"
                />
              </header>
    
              <div
                className="welfare-scroll"
                id="welfare-content"
                aria-busy="true"
              ></div>
    
              <img
                className="welfare-character-bottom"
                src={publicAssetUrl("images/con5_cloud.png")}
                alt="한미그룹 복지 섹션의 구름 장식"
              />
            </div>
          </section>
  );
}

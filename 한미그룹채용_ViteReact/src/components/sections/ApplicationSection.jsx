import { publicAssetUrl } from "../../utils/publicAssetUrl.js";
export default function ApplicationSection() {
  return (
    <section
            className="con9"
            id="con9"
            aria-labelledby="con9-title"
            data-deadline="2026-10-18T23:59:00+09:00"
          >
            <img
              className="con9-cloud con9-cloud--left"
              src={publicAssetUrl("images/con9_cloud_l.png")}
              alt=""
              aria-hidden="true"
            />
            <img
              className="con9-cloud con9-cloud--right"
              src={publicAssetUrl("images/con9_cloud_r.png")}
              alt=""
              aria-hidden="true"
            />
            <img
              className="con9-glow"
              src={publicAssetUrl("images/con9_Background+Blur.png")}
              alt=""
              aria-hidden="true"
            />
            <h2 className="con9-title" id="con9-title">
              당신에게 딱 맞는 자리를 찾으러 출발!
            </h2>
            <div
              className="con9-countdown"
              role="timer"
              aria-label="지원 마감까지 남은 시간"
            >
              <span className="con9-countdown-part"
                ><strong className="con9-countdown-number" data-countdown-days
                  >00</strong
                >
                일</span
              >
              <span className="con9-countdown-part"
                ><strong className="con9-countdown-number" data-countdown-hours
                  >00</strong
                >
                시간</span
              >
              <span className="con9-countdown-part"
                ><strong className="con9-countdown-number" data-countdown-minutes
                  >00</strong
                >
                분</span
              >
              <span className="con9-countdown-part"
                ><strong className="con9-countdown-number" data-countdown-seconds
                  >00</strong
                >
                초 남았어요</span
              >
            </div>
            <div className="con9-visual">
              <img
                className="con9-globe"
                src={publicAssetUrl("images/con9_apply.png")}
                alt="지구본과 종이비행기 오브제"
              />
              <a
                className="con9-apply"
                href="#qualification"
                aria-label="지원하기 — 지원 일정 확인하기"
              >
                <span className="con9-apply-text">지원하기</span>
                <span className="con9-apply-arrow" aria-hidden="true">→</span>
              </a>
            </div>
            <p className="con9-status" id="con9-status">
              아이콘을 클릭해서 지원해주세요!
            </p>
          </section>
  );
}

export default function MainVisual() {
  return (
    <section className="main-visual" id="main-visual" aria-label="메인 비주얼">
            <div className="mv-inner">
              <div className="mv-text">
                <div className="mv-copy">
                  <p className="mv-sub">2026년 하반기</p>
                  <h1 className="mv-title">
                    <strong>한미그룹</strong>
                    <span>공개채용</span>
                  </h1>
                  <p className="mv-period">
                    모집기간 : 2026.9.28(월) ~ 2026.10.18(일) 23:59까지
                  </p>
                </div>
                <div>
                  <a className="btn btn-lg" href="#tasks">모집직무 바로가기!</a>
                </div>
              </div>
    
              <div className="mv-stage" aria-hidden="true">
                <div className="ring-glow"></div>
                <div className="ring-line"></div>
                <img className="mv-micro updown" src="/images/mv_micro.png" alt="" />
                <img className="mv-char1 updown" src="/images/mv_char1.png" alt="" />
                <img className="mv-char2 updown" src="/images/mv_char2.png" alt="" />
                <img className="mv-char3 updown" src="/images/mv_char3.png" alt="" />
                <img className="mv-char4 updown" src="/images/mv_char4.png" alt="" />
                <img className="mv-star1" src="/images/mv_star1.svg" alt="" />
                <img className="mv-star2" src="/images/mv_star2.svg" alt="" />
                <img className="mv-star3" src="/images/mv_star3.svg" alt="" />
                <img className="mv-star4" src="/images/mv_star4.svg" alt="" />
                <img className="mv-star5" src="/images/mv_star3.svg" alt="" />
              </div>
            </div>
    
            <div className="scroll-wrap">
              <button
                className="btn-scroll"
                type="button"
                id="scrollDown"
                aria-label="아래로 스크롤"
              >
                <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
                  <path
                    d="M11 16l9 9 9-9"
                    stroke="#fff"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </section>
  );
}

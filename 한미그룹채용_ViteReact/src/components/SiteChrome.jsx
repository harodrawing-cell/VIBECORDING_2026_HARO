import { publicAssetUrl } from "../utils/publicAssetUrl.js";
export function SmoothScrollToggle() {
  return (
    <label
          className="smooth-scroll-toggle"
          title="체크하면 부드러운 스크롤이 꺼집니다"
        >
          <input
            id="smoothScrollToggle"
            type="checkbox"
            aria-label="부드러운 스크롤 끄기"
          />
        </label>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header">
          <div className="header-inner">
            <a className="brand" href="#main-visual" aria-label="한미그룹 홈">
              <img src={publicAssetUrl("images/logo.svg")} alt="Hanmi 한미그룹" />
            </a>
            <nav className="gnb" id="gnb" aria-label="주요 메뉴">
              <ul className="gnb-list">
                <li><a href="#jobs">직무소개</a></li>
                <li><a href="#qualification">지원자격 및 접수방법</a></li>
                <li><a href="#exposition">채용설명회 일정</a></li>
              </ul>
              <div className="gnb-cta">
                <a className="btn btn-sm" href="#con9">
                  <span>지원하기</span>
                  <svg
                    className="ico-chevron"
                    width="7"
                    height="12"
                    viewBox="0 0 7 12"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M1.2 1.2L5.8 6l-4.6 4.8"
                      stroke="#fff"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </nav>
            
            <div className="header-m">
              <a className="btn btn-sm" href="#con9"><span>지원하기</span></a>
              <button
                className="btn-menu"
                type="button"
                id="menuToggle"
                aria-label="전체 메뉴 열기"
                aria-expanded="false"
                aria-controls="gnb"
              >
                <span></span><span></span><span></span>
              </button>
            </div>
          </div>
        </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
          <div className="footer-inner">
            <img className="footer-logo" src={publicAssetUrl("images/logo.svg")} alt="Hanmi 한미그룹" />
          </div>
        </footer>
  );
}

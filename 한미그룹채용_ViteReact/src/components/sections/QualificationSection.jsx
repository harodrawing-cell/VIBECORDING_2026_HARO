import { publicAssetUrl } from "../../utils/publicAssetUrl.js";
export default function QualificationSection() {
  return (
    <section
            className="requirement"
            id="qualification"
            aria-labelledby="requirement-title"
          >
            <div className="requirement-inner">
              <header className="requirement-header">
                <h2 className="requirement-title" id="requirement-title">
                  한미그룹과 함께하는 문은<br />활짝 열려 있습니다
                </h2>
                <img
                  className="requirement-bulb updown"
                  src={publicAssetUrl("images/require_bulb.png")}
                  alt=""
                  aria-hidden="true"
                />
              </header>
    
              <div className="requirement-tabs" role="tablist" aria-label="채용 안내">
                <button
                  className="requirement-tab"
                  type="button"
                  role="tab"
                  id="requirement-tab-eligibility"
                  aria-selected="true"
                  aria-controls="eligibility-panel"
                  tabIndex="0"
                >
                  지원자격
                </button>
                <button
                  className="requirement-tab"
                  type="button"
                  role="tab"
                  id="requirement-tab-process"
                  aria-selected="false"
                  aria-controls="process-panel"
                  tabIndex="-1"
                >
                  전형절차 및 접수방법
                </button>
              </div>
    
              <div
                className="requirement-panel"
                id="eligibility-panel"
                role="tabpanel"
                aria-labelledby="requirement-tab-eligibility"
                tabIndex="0"
              >
                <div className="eligibility-grid">
                  <article className="eligibility-item">
                    <img
                      src={publicAssetUrl("images/require_calendar_3d.png")}
                      alt=""
                      aria-hidden="true"
                    />
                    <h3>27년 1월 입사가 가능한 자</h3>
                  </article>
                  <article className="eligibility-item">
                    <img
                      src={publicAssetUrl("images/require_gradcap_3d.png")}
                      alt=""
                      aria-hidden="true"
                    />
                    <h3>기졸업자 또는 27년 2월 졸업 예정자</h3>
                  </article>
                </div>
                <div className="requirement-notes-divider">
                  <ul className="requirement-notes">
                    <li>남성의 경우 병역을 마쳤거나 면제인 분</li>
                    <li>해외여행 (또는 해외 출장)에 결격사유가 없는 분</li>
                    <li>취업보호대상자는 관련 법령에 의거하여 우대</li>
                  </ul>
                </div>
                <p className="requirement-notice">
                  모집 직무별로 지원자격이 상이하오니 반드시
                  <strong>&nbsp;채용 공고</strong>를 확인해 주시기 바랍니다.
                </p>
              </div>
    
              <div
                className="requirement-panel"
                id="process-panel"
                role="tabpanel"
                aria-labelledby="requirement-tab-process"
                tabIndex="0"
                hidden
              >
                <section
                  className="process-group"
                  aria-labelledby="process-sales-title"
                >
                  <h3 id="process-sales-title">영업직군</h3>
                  <div className="process-steps">
                    <div className="process-step">
                      <span className="process-step-icon" aria-hidden="true">🗓️</span
                      ><strong>지원접수</strong><span>9.28~10.18</span>
                    </div>
                    <div className="process-step">
                      <span className="process-step-icon" aria-hidden="true">📑</span
                      ><strong>서류전형</strong><span>10.19~10.20</span>
                    </div>
                    <div className="process-step">
                      <span className="process-step-icon" aria-hidden="true">🔎</span
                      ><strong>AI역량검사</strong><span>10.21~10.25</span>
                    </div>
                    <div className="process-step">
                      <span className="process-step-icon" aria-hidden="true">🪪</span
                      ><strong>1차면접</strong><span>11월 중</span>
                    </div>
                    <div className="process-step">
                      <span className="process-step-icon" aria-hidden="true">📍</span
                      ><strong>현장체험</strong><span>12월 초</span>
                    </div>
                    <div className="process-step">
                      <span className="process-step-icon" aria-hidden="true">💬</span
                      ><strong>2차면접</strong><span>12월 중</span>
                    </div>
                    <div className="process-step">
                      <span className="process-step-icon" aria-hidden="true">📚</span
                      ><strong>교육전형</strong><span>27.1.4~</span>
                    </div>
                  </div>
                </section>
    
                <section
                  className="process-group"
                  aria-labelledby="process-other-title"
                >
                  <h3 id="process-other-title">영업 외 전직군</h3>
                  <div className="process-steps process-steps--six">
                    <div className="process-step">
                      <span className="process-step-icon" aria-hidden="true">🗓️</span
                      ><strong>지원접수</strong><span>9.28~10.18</span>
                    </div>
                    <div className="process-step">
                      <span className="process-step-icon" aria-hidden="true">📑</span
                      ><strong>서류전형</strong><span>10.19~10.20</span>
                    </div>
                    <div className="process-step">
                      <span className="process-step-icon" aria-hidden="true">🔎</span
                      ><strong>AI역량검사</strong><span>10.21~10.25</span>
                    </div>
                    <div className="process-step">
                      <span className="process-step-icon" aria-hidden="true">🪪</span
                      ><strong>1차면접</strong><span>11월 중</span>
                    </div>
                    <div className="process-step">
                      <span className="process-step-icon" aria-hidden="true">💬</span
                      ><strong>2차면접</strong><span>12월 중</span>
                    </div>
                    <div className="process-step">
                      <span className="process-step-icon" aria-hidden="true">🏢</span
                      ><strong>입사</strong
                      ><span>27.1.4~<br />(경력직 협의 가능)</span>
                    </div>
                  </div>
                </section>
    
                <ul
                  className="requirement-notes process-notes"
                  aria-label="전형절차 안내사항"
                >
                  <li>
                    상기 일정은 상황에 따라 변경될 수 있으며 각 전형별 상세 일정은
                    대상자에 한해 개별 안내 예정입니다.
                  </li>
                  <li>
                    입사지원서에 허위 기재가 있거나 제출서류가 허위로 판명되는 경우,
                    또는 입사 이후 자격 미달이나 중대한 결격사유가 있는 경우는
                    입사가 취소될 수 있습니다.
                  </li>
                  <li>
                    지원서 제출 후에는 수정이 절대 불가하오니, 주의하시기 바랍니다.
                  </li>
                  <li className="requirement-notes-secondary">
                    전형단계별 결과는 E-Mail 및 SMS를 통하여 안내하오니 E-Mail 주소
                    및 휴대전화 번호를 정확히 기재해주시기 바랍니다.
                  </li>
                </ul>
              </div>
            </div>
          </section>
  );
}

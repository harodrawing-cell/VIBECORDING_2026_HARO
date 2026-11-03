import CanvasPlayer from "../CanvasPlayer.jsx";

export default function TasksSection() {
  return (
    <section className="tasks" id="tasks" aria-labelledby="tasks-title">
            <div className="tasks-hero" aria-hidden="true">
              <img
                className="tasks-hero-title-art"
                src="/images/tasks_bg_title.png"
                alt=""
              />
              <CanvasPlayer className="tasks-character-frame" variant="reading" />
            </div>
            <div className="tasks-content">
              <header className="tasks-heading">
                <h2 id="tasks-title">
                  알약이를 따라<br />나에게 맞는 직무를 찾아봐요!
                </h2>
                <p>
                  연구부터 생산, 영업, 경영지원까지 당신의 가능성이 빛날 자리를
                  안내해 드릴게요.
                </p>
              </header>
    
              <div className="tasks-tabs" role="tablist" aria-label="직무 분야">
                <button
                  className="tasks-tab"
                  type="button"
                  role="tab"
                  id="tasks-tab-rnd"
                  aria-selected="true"
                  aria-controls="tasks-panel"
                  data-category="R&D"
                >
                  R&amp;D
                </button>
                <button
                  className="tasks-tab"
                  type="button"
                  role="tab"
                  id="tasks-tab-production"
                  aria-selected="false"
                  aria-controls="tasks-panel"
                  data-category="생산/품질"
                >
                  생산/품질
                </button>
                <button
                  className="tasks-tab"
                  type="button"
                  role="tab"
                  id="tasks-tab-sales"
                  aria-selected="false"
                  aria-controls="tasks-panel"
                  data-category="영업"
                >
                  영업
                </button>
                <button
                  className="tasks-tab"
                  type="button"
                  role="tab"
                  id="tasks-tab-management"
                  aria-selected="false"
                  aria-controls="tasks-panel"
                  data-category="경영관리"
                >
                  경영관리
                </button>
                <button
                  className="tasks-tab"
                  type="button"
                  role="tab"
                  id="tasks-tab-clinical"
                  aria-selected="false"
                  aria-controls="tasks-panel"
                  data-category="임상"
                >
                  임상
                </button>
                <button
                  className="tasks-tab"
                  type="button"
                  role="tab"
                  id="tasks-tab-global"
                  aria-selected="false"
                  aria-controls="tasks-panel"
                  data-category="글로벌"
                >
                  글로벌
                </button>
                <button
                  className="tasks-tab"
                  type="button"
                  role="tab"
                  id="tasks-tab-healthcare"
                  aria-selected="false"
                  aria-controls="tasks-panel"
                  data-category="헬스케어"
                >
                  헬스케어
                </button>
              </div>
    
              <div
                className="tasks-accordion"
                id="tasks-panel"
                role="tabpanel"
                aria-labelledby="tasks-tab-rnd"
              >
                <section className="tasks-group is-open">
                  <h3>
                    <button
                      className="tasks-accordion-trigger"
                      type="button"
                      aria-expanded="true"
                      aria-controls="tasks-rnd-center"
                    >
                      <span>연구센터 (경기도 동탄)</span>
                      <span className="tasks-count">6</span>
                    </button>
                  </h3>
                  <div className="tasks-group-panel" id="tasks-rnd-center">
                    <div className="tasks-job-grid">
                      <button className="tasks-job" type="button" data-job="nce">
                        <span>NCE (New Chemical Entity)</span>
                        <span className="tasks-job-arrow" aria-hidden="true">→</span>
                      </button>
                      <button className="tasks-job" type="button" data-job="qsf">
                        <span>QS&amp;F (Quality Science &amp; Formulation)</span>
                        <span className="tasks-job-arrow" aria-hidden="true">→</span>
                      </button>
                      <button className="tasks-job" type="button" data-job="mst">
                        <span>MST (Manufacturing Science Technology)</span>
                        <span className="tasks-job-arrow" aria-hidden="true">→</span>
                      </button>
                      <button className="tasks-job" type="button" data-job="te">
                        <span>TE (Toxicology Evaluation)</span>
                        <span className="tasks-job-arrow" aria-hidden="true">→</span>
                      </button>
                      <button className="tasks-job" type="button" data-job="dst">
                        <span>DST (Drug Science &amp; Technology)</span>
                        <span className="tasks-job-arrow" aria-hidden="true">→</span>
                      </button>
                      <button className="tasks-job" type="button" data-job="bss">
                        <span
                          >BSS (Biological &amp; Structural Evaluation
                          Science)</span
                        >
                        <span className="tasks-job-arrow" aria-hidden="true">→</span>
                      </button>
                    </div>
                  </div>
                </section>
                <section className="tasks-group">
                  <h3>
                    <button
                      className="tasks-accordion-trigger"
                      type="button"
                      aria-expanded="false"
                      aria-controls="tasks-rnd-formulation"
                    >
                      <span>제제연구소 [의약혁신센터] (경기도 광교)</span>
                      <span className="tasks-count">1</span>
                    </button>
                  </h3>
                  <div className="tasks-group-panel" id="tasks-rnd-formulation" hidden>
                    <div className="tasks-job-grid">
                      <button
                        className="tasks-job"
                        type="button"
                        data-job="formulation"
                      >
                        <span>제제연구 직무 상세</span>
                        <span className="tasks-job-arrow" aria-hidden="true">→</span>
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            </div>
    
            <div className="tasks-modal" id="tasks-modal" hidden>
              <div
                className="tasks-modal-dialog"
                role="dialog"
                aria-modal="true"
                aria-labelledby="tasks-modal-title"
                tabIndex="-1"
              >
                <img
                  className="tasks-modal-banner"
                  src="/images/tasks_rnd_bg.jpg"
                  alt=""
                />
                <button
                  className="tasks-modal-close"
                  type="button"
                  aria-label="상세 정보 닫기"
                >
                  ×
                </button>
                <div className="tasks-modal-content">
                  <p className="tasks-modal-error" role="alert" hidden></p>
                  <div className="tasks-modal-data">
                    <div className="tasks-modal-header">
                      <div className="tasks-modal-title-row">
                        <h3 className="tasks-modal-title" id="tasks-modal-title"></h3>
                        <span
                          className="tasks-modal-category"
                          id="tasks-modal-category"
                        ></span>
                        <span
                          className="tasks-modal-location"
                          id="tasks-modal-location"
                        ></span>
                      </div>
                      <p className="tasks-modal-career" id="tasks-modal-career"></p>
                    </div>
                    <div className="tasks-modal-body">
                      <section className="tasks-modal-section">
                        <h4>직무 내용</h4>
                        <ul id="tasks-modal-duties"></ul>
                      </section>
                      <section className="tasks-modal-section">
                        <h4>자격요건</h4>
                        <ul id="tasks-modal-qualifications"></ul>
                      </section>
                      <section
                        className="tasks-modal-section"
                        id="tasks-modal-preferred-section"
                      >
                        <h4>우대사항</h4>
                        <ul id="tasks-modal-preferred"></ul>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
  );
}

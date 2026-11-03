export default function JobsSection() {
  return (
    <section className="jobs" id="jobs" aria-labelledby="jobs-title">
            <div className="jobs-inner">
              <header className="jobs-header">
                <img
                  className="jobs-logo"
                  src="/images/con3_logo.png"
                  alt="Hanmi 로고"
                />
                <h2 className="jobs-title" id="jobs-title">
                  한미에서는 어떤 일을 할까요?
                </h2>
                <p className="jobs-subtitle">
                  일의 보람부터 성장의 순간까지, 먼저 경험한 현직자들이 솔직하게
                  들려드립니다.
                </p>
              </header>
              <img
                className="jobs-character leftright"
                src="/images/con3_char.png"
                alt=""
                aria-hidden="true"
              />
              <ul className="jobs-list">
                <li>
                  <article className="jobs-card">
                    <img
                      className="jobs-photo"
                      src="/images/con3_int1.jpg"
                      alt="실험실에서 의약품 품질관리 업무를 소개하는 이건호 사원"
                    />
                    <p className="jobs-description">
                      정밀한 시험과 분석으로 의약품의 품질을 확인해<br />안전하고
                      신뢰할 수 있는 의약품을 만들어갑니다.
                    </p>
                    <div className="jobs-card-bottom">
                      <p className="jobs-meta">
                        한미약품 품질관리
                        <span className="jobs-meta-divider">|</span> 이건호 사원
                      </p>
                      <a
                        className="jobs-arrow"
                        href="#jobs"
                        aria-label="이건호 사원 직무소개 상세 보기"
                        ><svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path
                            d="M4 12h15m-6-6 6 6-6 6"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          /></svg
                      ></a>
                    </div>
                  </article>
                </li>
                <li>
                  <article className="jobs-card">
                    <img
                      className="jobs-photo"
                      src="/images/con3_int2.jpg"
                      alt="사무실 소파에 앉아 있는 신약 연구원 박진하 연구원"
                    />
                    <p className="jobs-description">
                      신약 후보물질의 가능성을 과학적으로 검증해<br />새로운
                      치료제가 환자에게 향하는 첫걸음을 만듭니다.
                    </p>
                    <div className="jobs-card-bottom">
                      <p className="jobs-meta">
                        한미약품 전임상연구
                        <span className="jobs-meta-divider">|</span> 박진하 연구원
                      </p>
                      <a
                        className="jobs-arrow"
                        href="#jobs"
                        aria-label="박진하 연구원 직무소개 상세 보기"
                        ><svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path
                            d="M4 12h15m-6-6 6 6-6 6"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          /></svg
                      ></a>
                    </div>
                  </article>
                </li>
              </ul>
              <img
                className="jobs-bottle updown"
                src="/images/con3_bottle.png"
                alt=""
                aria-hidden="true"
              />
              <div className="jobs-cta-wrap">
                <a className="jobs-cta" href="#jobs">모든 현직자 알아가기!</a>
              </div>
            </div>
          </section>
  );
}

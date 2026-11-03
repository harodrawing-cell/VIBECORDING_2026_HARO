export default function ExpositionSection() {
  return (
    <section
            className="exposition"
            id="exposition"
            aria-labelledby="exposition-title"
          >
            <div className="exposition-inner">
              <header className="exposition-header">
                <img
                  className="exposition-character updown"
                  src="/images/expo_char.png"
                  alt="박람회와 캠퍼스를 찾아가는 한미 캐릭터"
                />
                <div className="exposition-copy">
                  <h2 className="exposition-title" id="exposition-title">
                    Hanmi 박람회/캠퍼스로 출발!
                  </h2>
                  <p className="exposition-intro">
                    한미그룹이 여러분을 만나러 박람회와 캠퍼스로 찾아갑니다.<br />
                    우리가 어디서 만날지 궁금하다면 아래 지역에서 찾아보세요!
                  </p>
                  <p className="exposition-hint">
                    학교명/장소를 클릭하거나 터치하면 세부장소를 확인하실 수
                    있습니다.
                  </p>
                </div>
              </header>
    
              <div
                className="exposition-tabs"
                role="tablist"
                aria-label="방문 일정 종류"
              >
                <button
                  className="exposition-tab"
                  type="button"
                  role="tab"
                  id="exposition-tab-fair"
                  aria-selected="true"
                  aria-controls="expo-fair-panel"
                  tabIndex="0"
                >
                  박람회
                </button>
                <button
                  className="exposition-tab"
                  type="button"
                  role="tab"
                  id="exposition-tab-campus"
                  aria-selected="false"
                  aria-controls="expo-campus-panel"
                  tabIndex="-1"
                >
                  캠퍼스
                </button>
              </div>
    
              <div
                className="exposition-panel"
                id="expo-fair-panel"
                role="tabpanel"
                aria-labelledby="exposition-tab-fair"
                tabIndex="0"
              >
                <div
                  className="expo-schedule"
                  id="expo-fair-schedule"
                  aria-live="polite"
                  aria-busy="true"
                ></div>
              </div>
    
              <div
                className="exposition-panel"
                id="expo-campus-panel"
                role="tabpanel"
                aria-labelledby="exposition-tab-campus"
                tabIndex="0"
                hidden
              >
                <div
                  className="expo-region-tabs"
                  id="expo-region-tabs"
                  role="tablist"
                  aria-label="캠퍼스 방문 지역"
                ></div>
                <div
                  className="expo-schedule"
                  id="expo-campus-schedule"
                  aria-live="polite"
                  aria-busy="true"
                ></div>
              </div>
            </div>
          </section>
  );
}

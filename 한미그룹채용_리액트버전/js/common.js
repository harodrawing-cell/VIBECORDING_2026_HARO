/* smooth-scroll.js */
// 전체 페이지 휠 스크롤에 보간 애니메이션을 적용하고 체크 시 기본 스크롤로 전환
      (function () {
        var root = document.documentElement;
        var toggle = document.getElementById("smoothScrollToggle");
        if (!toggle) return;

        var reducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        );
        var frame = 0;
        var targetY = window.scrollY;
        var easing = 0.01;

        function setDisabled(disabled) {
          root.classList.toggle("smooth-scroll-disabled", disabled);
          if (disabled && frame) {
            window.cancelAnimationFrame(frame);
            frame = 0;
            targetY = window.scrollY;
          }
        }

        function hasScrollableAncestor(target, deltaY) {
          var element =
            target instanceof Element ? target : target.parentElement;
          while (element && element !== document.body) {
            var style = window.getComputedStyle(element);
            var overflowY = style.overflowY;
            if (
              (overflowY === "auto" ||
                overflowY === "scroll" ||
                overflowY === "overlay") &&
              element.scrollHeight > element.clientHeight
            ) {
              var maxScroll = element.scrollHeight - element.clientHeight;
              if (
                (deltaY < 0 && element.scrollTop > 0) ||
                (deltaY > 0 && element.scrollTop < maxScroll)
              ) {
                return true;
              }
            }
            element = element.parentElement;
          }
          return false;
        }

        function animateScroll() {
          var currentY = window.scrollY;
          var distance = targetY - currentY;
          if (Math.abs(distance) < 0.5) {
            window.scrollTo({ top: targetY, behavior: "instant" });
            frame = 0;
            return;
          }
          window.scrollTo({
            top: currentY + distance * easing,
            behavior: "instant",
          });
          frame = window.requestAnimationFrame(animateScroll);
        }

        toggle.checked = reducedMotion.matches;
        setDisabled(toggle.checked);
        toggle.addEventListener("change", function () {
          setDisabled(toggle.checked);
        });

        window.addEventListener(
          "wheel",
          function (event) {
            if (
              toggle.checked ||
              event.defaultPrevented ||
              event.ctrlKey ||
              event.metaKey ||
              event.shiftKey ||
              event.deltaY === 0
            ) {
              return;
            }

            var deltaY = event.deltaY;
            if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) {
              deltaY *= 16;
            } else if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
              deltaY *= window.innerHeight;
            }
            if (hasScrollableAncestor(event.target, deltaY)) return;

            var maxScroll =
              document.documentElement.scrollHeight - window.innerHeight;
            var nextY = Math.max(0, Math.min(maxScroll, targetY + deltaY));
            if (nextY === targetY && !frame) return;

            event.preventDefault();
            targetY = nextY;
            if (!frame) frame = window.requestAnimationFrame(animateScroll);
          },
          { passive: false },
        );

        window.addEventListener(
          "scroll",
          function () {
            if (!frame) targetY = window.scrollY;
          },
          { passive: true },
        );
      })();

/* navigation.js */
(function () {
        var root = document.documentElement;
        var inner = document.querySelector(".mv-inner");
        var gnb = document.getElementById("gnb");
        var menuBtn = document.getElementById("menuToggle");

        // 모바일 전체 메뉴 열기/닫기 (슬라이드는 CSS transform/transition, 스크롤 잠금은 html.is-menu-open)
        function setMenu(open) {
          gnb.classList.toggle("is-open", open);
          root.classList.toggle("is-menu-open", open);
          menuBtn.setAttribute("aria-expanded", String(open));
          menuBtn.setAttribute(
            "aria-label",
            open ? "전체 메뉴 닫기" : "전체 메뉴 열기",
          );
        }
        menuBtn.addEventListener("click", function () {
          setMenu(!gnb.classList.contains("is-open"));
        });
        gnb.addEventListener("click", function (e) {
          if (e.target.closest("a")) setMenu(false);
        });
        document.addEventListener("keydown", function (e) {
          if (e.key === "Escape") setMenu(false);
        });

        // 1025~1439px: 1440px 원본 레이아웃 전체를 화면 너비에 맞춰 축소. 1024px 이하는 CSS 반응형 처리
        function fit() {
          var w = window.innerWidth;
          if (w > 1024 && w < 1440) {
            inner.style.width = "1440px";
            inner.style.maxWidth = "none";
            inner.style.zoom = w / 1440;
          } else {
            inner.style.width = "";
            inner.style.maxWidth = "";
            inner.style.zoom = "";
          }

          if (w > 600) setMenu(false); // 햄버거 메뉴 브레이크포인트(600px)를 벗어나면 초기화
        }
        fit();
        window.addEventListener("resize", fit);

        // 스크롤 버튼: 메인 비주얼 높이만큼 부드럽게 이동
        document
          .getElementById("scrollDown")
          .addEventListener("click", function () {
            var hero = document.getElementById("main-visual");
            window.scrollTo({ top: hero.offsetHeight, behavior: "smooth" });
          });
      })();

/* header-scroll.js */
// Header 스크롤 인터랙션: 기존 .site-header에 클래스만 추가/제거
      (function () {
        var header = document.querySelector(".site-header");
        if (!header) return;
        var menuButton = document.getElementById("menuToggle");
        var lastY = Math.max(0, window.scrollY);
        var ticking = false;
        var threshold = 10; // 미세 스크롤도 누적해 방향 전환 감지
        var movement = 0;
        var navigationUntil = 0;

        function showHeader() {
          header.classList.remove("is-hidden");
          header.classList.add("is-visible");
        }
        function hideHeader() {
          header.classList.remove("is-visible");
          header.classList.add("is-hidden");
        }
        function updateHeader() {
          ticking = false;
          var y = Math.max(0, window.scrollY);
          header.classList.toggle("is-scrolled", y > 8);
          var delta = y - lastY;
          if (delta !== 0) {
            movement = delta > 0 === movement > 0 ? movement + delta : delta;
          }

          if (
            document.documentElement.classList.contains("is-menu-open") ||
            y <= header.offsetHeight + 12 ||
            Date.now() < navigationUntil
          ) {
            showHeader();
          } else if (movement >= threshold) {
            hideHeader();
          } else if (movement <= -threshold) {
            showHeader();
          }
          lastY = y;
        }

        function onScroll() {
          if (!ticking) {
            ticking = true;
            window.requestAnimationFrame(updateHeader);
          }
        }

        // 동일한 문서 내 섹션 링크는 기존 부드러운 스크롤 동작을 사용
        // 링크 전환 중 헤더가 바로 숨겨지는 현상을 방지
        header.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
          anchor.addEventListener("click", function () {
            navigationUntil = Date.now() + 1200;
            showHeader();
          });
        });
        if (menuButton) {
          menuButton.addEventListener("click", function () {
            showHeader();
          });
        }
        document.addEventListener("keydown", function (event) {
          if (event.key === "Escape") showHeader();
        });

        header.classList.add("is-visible");
        updateHeader();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll, { passive: true });
      })();

/* scroll-reveal.js */
/* ============================================================
         하위 박스별 반복 Scroll Reveal
         - 화면 중앙(55%) 근처에서 등장; 화면 밖으로 완전히 나가면 리셋
         - 스크롤 위/아래 양방향 재진입 지원
         - 탭/아코디언/JSON으로 생성된 항목도 MutationObserver로 감지
         - fixed 헤더, 메인 비주얼, site-footer 및 모달은 제외
         ============================================================ */
      (function () {
        var main = document.querySelector("main");
        if (!main) return;

        // 애니메이션을 개별로 적용할 시각적인 단위만 지정한다.
        // 카드 전체와 자식을 동시에 움직여 중첩 애니메이션이 생기지 않게 구성.
        var targets = [
          ".mirae-title",
          ".mirae-character-stage",
          ".history-title",
          ".history-head > .history-count",
          ".history-period",
          ".history-lead",
          ".history-list > li",
          ".history-figure",
          ".history-end > .history-count",
          ".history-end-sub",
          ".history-end-main",
          ".history-toggle",
          ".jobs-logo",
          ".jobs-title",
          ".jobs-subtitle",
          ".jobs-photo",
          ".jobs-description",
          ".jobs-card-bottom",
          ".jobs-cta",
          ".innovation-header > h2",
          ".innovation-header > p",
          ".innovation-bubble",
          ".innovation-hint",
          ".welfare-title",
          ".welfare-subtitle",
          ".welfare-lead",
          ".welfare-card",
          ".tasks-heading > h2",
          ".tasks-heading > p",
          ".tasks-tab",
          ".tasks-accordion-trigger",
          ".tasks-job",
          ".requirement-title",
          ".requirement-tab",
          ".eligibility-item",
          ".requirement-notes > li",
          ".requirement-notice",
          ".process-group > h3",
          ".process-step",
          ".exposition-title",
          ".exposition-intro",
          ".exposition-hint",
          ".exposition-tab",
          ".expo-region-tab",
          ".expo-date",
          ".expo-venue-item",
          ".expo-empty",
          ".con8-card",
          ".con9-title",
          ".con9-countdown-part",
          ".con9-visual",
          ".con9-status",
        ].join(", ");

        var reducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        );
        if (reducedMotion.matches || !("IntersectionObserver" in window))
          return;

        var registered = new WeakSet();
        var revealObserver;
        var resetObserver;
        var pendingScan = false;
        var started = false;
        var initialFrame = null;

        // 등장 지점: 뷰포트의 대략 55% 높이. 진입하면 visible.
        // 모바일은 화면 아래에서 20% 안쪽으로 들어오면 등장시킨다.
        // 기존 55% 절단선에서는 페이지 마지막 con9가 최대 스크롤 시에도
        // 해당 선에 도달하지 못해 영구히 투명한 문제가 있었다.
        var mobileReveal = window.matchMedia("(max-width: 568px)");
        revealObserver = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              if (!entry.isIntersecting || !entry.target.isConnected) return;
              if (entry.target.closest("[hidden]")) return;
              entry.target.classList.add("is-inview");
            });
          },
          {
            root: null,
            rootMargin: mobileReveal.matches
              ? "0px 0px -20% 0px"
              : "0px 0px -45% 0px",
            threshold: 0,
          },
        );

        // 완전히 화면을 벗어났을 때만 리셋해 가시 영역 중간에서 깜빡이지 않도록 함.
        resetObserver = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting || !entry.target.isConnected) return;
              // 포커스 중인 버튼/링크는 숨기지 않음 (키보드 접근성).
              if (entry.target.contains(document.activeElement)) return;
              entry.target.classList.remove("is-inview");
            });
          },
          { root: null, threshold: 0 },
        );

        function register(element, index) {
          if (registered.has(element)) return;
          if (element.closest(".main-visual, .site-footer, .tasks-modal"))
            return;
          // 이미 숨겨진 탭도 등록: 탭 전환 후 실제 표시 시 관찰자가 등장시킴.
          registered.add(element);
          element.classList.add("scroll-reveal");
          element.style.setProperty(
            "--scroll-reveal-delay",
            (index % 3) * 55 + "ms",
          );
          revealObserver.observe(element);
          resetObserver.observe(element);
        }

        // 스크롤 최대 하단에서는 마지막 콘텐츠를 반드시 표시:
        // 짧은 마지막 섹션/긴 모바일 뷰포트에서도 보이지 않는 오류 방지.
        var endCheckPending = false;
        function checkPageEnd() {
          endCheckPending = false;
          var endGap =
            document.documentElement.scrollHeight -
            (window.scrollY + window.innerHeight);
          if (endGap > 36) return;
          main
            .querySelectorAll(".scroll-reveal:not(.is-inview)")
            .forEach(function (el) {
              if (el.closest("[hidden]")) return;
              var box = el.getBoundingClientRect();
              if (box.bottom > 0 && box.top < window.innerHeight - 10) {
                el.classList.add("is-inview");
              }
            });
        }
        function scheduleEndCheck() {
          if (endCheckPending) return;
          endCheckPending = true;
          window.requestAnimationFrame(checkPageEnd);
        }

        function scan() {
          pendingScan = false;
          var newCount = 0;
          main.querySelectorAll(targets).forEach(function (element) {
            if (!registered.has(element)) {
              register(element, newCount);
              newCount++;
            }
          });
        }

        // 동적으로 생기는 복지 카드/직무 버튼/캠퍼스 일정 등 자동 등록.
        function scheduleScan() {
          if (pendingScan) return;
          pendingScan = true;
          window.requestAnimationFrame(scan);
        }

        function start() {
          if (started) return;
          started = true;
          // 초기 FOUC 방지를 위해 동일한 프레임에서 대상과 루트 클래스 준비.
          scan();
          document.documentElement.classList.add("has-scroll-reveal");
          var changes = new MutationObserver(function (records) {
            for (var i = 0; i < records.length; i++) {
              if (records[i].addedNodes.length) {
                scheduleScan();
                break;
              }
            }
          });
          changes.observe(main, { subtree: true, childList: true });
          window.addEventListener("scroll", scheduleEndCheck, {
            passive: true,
          });
          window.addEventListener("resize", scheduleEndCheck, {
            passive: true,
          });
          // 복구된 스크롤 위치로 페이지가 열릴 때도 마지막 섹션 보이기.
          scheduleEndCheck();
        }

        start();
      })();

/* history.js */
// 히스토리: 전체 높이 비율이 아닌 실제 요소 위치를 기준으로 접힘 높이를 계산
      (function () {
        var section = document.getElementById("history");
        if (!section) return;
        var body = document.getElementById("history-body");
        var flow = section.querySelector(".history-flow");
        var blocks = section.querySelectorAll(".history-block");
        var button = section.querySelector(".history-toggle");
        var label = button.querySelector(".history-toggle-label");
        var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
        var collapsed = true;
        var resizeFrame = 0;
        function topInFlow(el) {
          return (
            el.getBoundingClientRect().top - flow.getBoundingClientRect().top
          );
        }
        function fullHeight() {
          return Math.ceil(flow.offsetHeight);
        }
        function collapsedHeight() {
          var mobile = window.matchMedia("(max-width:568px)").matches;
          var first = blocks[0];
          var second = blocks[1];
          var point;
          if (mobile) {
            var figure = first.querySelector(".history-figure");
            // 첫 제품 이미지 하단을 살짝 흐리게 가리는 위치
            point =
              topInFlow(figure) + figure.getBoundingClientRect().height * 0.88;
          } else {
            // 데스크탑/태블릿: 첫 연혁의 하단을 흐리게 처리 (피그마 접힘 화면)
            var firstFigure = first.querySelector(".history-figure");
            point =
              topInFlow(firstFigure) +
              firstFigure.getBoundingClientRect().height * 0.94;
          }
          return Math.max(1, Math.min(fullHeight(), Math.round(point)));
        }
        function syncState() {
          section.classList.toggle("is-collapsed", collapsed);
          section.classList.toggle("is-expanded", !collapsed);
          button.setAttribute("aria-expanded", String(!collapsed));
          label.textContent = collapsed ? "펼치기" : "접기";
        }
        function resize() {
          if (collapsed) body.style.maxHeight = collapsedHeight() + "px";
          else if (body.style.maxHeight !== "none")
            body.style.maxHeight = fullHeight() + "px";
        }
        function onResize() {
          if (resizeFrame) cancelAnimationFrame(resizeFrame);
          resizeFrame = requestAnimationFrame(function () {
            resizeFrame = 0;
            body.style.transition = "none";
            resize();
            void body.offsetHeight;
            body.style.transition = "";
          });
        }
        button.addEventListener("click", function () {
          if (collapsed) {
            collapsed = false;
            body.style.maxHeight = fullHeight() + "px";
          } else {
            collapsed = true;
            body.style.maxHeight = fullHeight() + "px";
            void body.offsetHeight;
            body.style.maxHeight = collapsedHeight() + "px";
          }
          syncState();
          if (collapsed && section.getBoundingClientRect().top < 0) {
            section.scrollIntoView({
              behavior: reduce.matches ? "auto" : "smooth",
              block: "start",
            });
          }
        });
        body.addEventListener("transitionend", function (e) {
          if (
            e.target === body &&
            e.propertyName === "max-height" &&
            !collapsed
          ) {
            body.style.maxHeight = "none";
          }
        });
        body.style.transition = "none";
        syncState();
        resize();
        void body.offsetHeight;
        body.style.transition = "";
        if (window.ResizeObserver) new ResizeObserver(onResize).observe(flow);
        window.addEventListener("resize", onResize);
        window.addEventListener("load", onResize);
        if (document.fonts && document.fonts.ready)
          document.fonts.ready.then(onResize);
      })();

/* welfare.js */
(function () {
        var container = document.getElementById("welfare-content");
        if (!container) return;
        container.replaceChildren();

        function createCard(item) {
          var listItem = document.createElement("li");
          var card = document.createElement("article");
          var copy = document.createElement("div");
          var title = document.createElement("h3");
          var description = document.createElement("p");
          var icon = document.createElement("img");

          card.className = "welfare-card";
          copy.className = "welfare-card-copy";
          title.textContent = item.title;
          description.textContent = item.description;
          icon.className = "welfare-icon";
          icon.src = item.icon;
          icon.alt = "";
          copy.append(title, description);
          card.append(copy, icon);
          listItem.append(card);
          return listItem;
        }

        fetch("./data/benefits.json")
          .then(function (response) {
            if (!response.ok)
              throw new Error("복지 데이터를 불러오지 못했습니다.");
            return response.json();
          })
          .then(function (data) {
            if (!Array.isArray(data.benefits))
              throw new Error("복지 데이터 형식이 올바르지 않습니다.");

            var fragment = document.createDocumentFragment();
            data.benefits.forEach(function (group, groupIndex) {
              if (
                !group.group_title ||
                !group.group_description ||
                !group.title_icon ||
                !Array.isArray(group.items)
              )
                throw new Error("복지 그룹 데이터가 올바르지 않습니다.");

              var heading = document.createElement("div");
              var strong = document.createElement("strong");
              var titleIcon = document.createElement("img");
              var groupTitle = document.createElement("span");
              var groupDescription = document.createElement("p");
              var list = document.createElement("ul");

              heading.className = "welfare-lead";
              if (groupIndex > 0) heading.classList.add("welfare-group-title");
              strong.append(titleIcon, groupTitle);
              titleIcon.className = "welfare-heart";
              titleIcon.src = group.title_icon;
              titleIcon.alt = "";
              groupTitle.textContent = group.group_title;
              groupDescription.textContent = group.group_description;
              list.className = "welfare-list";
              list.setAttribute("aria-label", group.group_title + " 복지 제도");

              group.items.forEach(function (item) {
                if (!item.title || !item.description)
                  throw new Error("복지 항목 데이터가 올바르지 않습니다.");
                list.append(createCard(item));
              });

              heading.append(strong, groupDescription);
              fragment.append(heading, list);
            });

            container.replaceChildren(fragment);
            container.setAttribute("aria-busy", "false");
          })
          .catch(function () {
            container.textContent = "복지 정보를 불러오지 못했습니다.";
            container.setAttribute("aria-busy", "false");
          });
      })();

/* tasks.js */
(function () {
        var section = document.querySelector(".tasks");
        var tabs = Array.prototype.slice.call(
          section.querySelectorAll(".tasks-tab"),
        );
        var tabList = section.querySelector(".tasks-tabs");
        var panel = section.querySelector(".tasks-accordion");
        var rndMarkup = panel.innerHTML;
        var modal = section.querySelector(".tasks-modal");
        var modalDialog = section.querySelector(".tasks-modal-dialog");
        var modalBanner = section.querySelector(".tasks-modal-banner");
        var modalClose = section.querySelector(".tasks-modal-close");
        var previousFocus = null;
        var previousOverflow = "";
        var activeCategory = "R&D";
        var popupJobs = new Map();
        var fallbackJobs = new Map();
        var categoryGroups = new Map();
        var jobDataError = null;
        var jobDataReady = Promise.all([
          fetch("./data/pop_data.json"),
          fetch("./data/tasks_data.json"),
          fetch("./data/tasks_data_01.json"),
        ])
          .then(function (responses) {
            responses.forEach(function (response) {
              if (!response.ok)
                throw new Error("직무 데이터를 불러오지 못했습니다.");
            });
            return Promise.all([
              responses[0].json(),
              responses[1].json(),
              responses[2].json(),
            ]);
          })
          .then(function (datasets) {
            var popupData = datasets[0];
            var fallbackData = datasets[1];
            var groupedData = datasets[2];
            if (
              !Array.isArray(popupData) ||
              !Array.isArray(fallbackData.jobs) ||
              !Array.isArray(groupedData)
            )
              throw new Error("직무 상세 JSON 형식이 올바르지 않습니다.");

            popupData.forEach(function (job) {
              if (
                !job.title ||
                !job.image ||
                !Array.isArray(job.job_description) ||
                !Array.isArray(job.qualifications) ||
                !Array.isArray(job.preferred)
              )
                throw new Error(
                  "팝업 직무 데이터의 필수 항목이 누락되었습니다.",
                );
              popupJobs.set(job.title.trim(), job);
            });
            fallbackData.jobs.forEach(function (job) {
              if (
                !job.title ||
                !job.imgSrc ||
                !job.details ||
                !Array.isArray(job.details["직무 내용"]) ||
                !Array.isArray(job.details["자격요건"]) ||
                (job.details["우대사항"] != null &&
                  !Array.isArray(job.details["우대사항"]))
              )
                throw new Error(
                  "기존 직무 데이터의 필수 항목이 누락되었습니다.",
                );
              fallbackJobs.set(job.title.trim(), job);
            });
            var groupedTitles = new Set();
            groupedData.forEach(function (categoryData) {
              if (
                !categoryData.category ||
                !Array.isArray(categoryData.centers)
              )
                throw new Error(
                  "직무 분야 그룹 데이터 형식이 올바르지 않습니다.",
                );
              categoryData.centers.forEach(function (center) {
                if (
                  !center.center ||
                  !Array.isArray(center.jobs) ||
                  center.count !== center.jobs.length
                )
                  throw new Error(
                    "직무 센터 그룹 데이터 형식이 올바르지 않습니다.",
                  );
                center.jobs.forEach(function (title) {
                  var job = fallbackJobs.get(title.trim());
                  if (
                    !job ||
                    job.category !== categoryData.category ||
                    groupedTitles.has(title.trim())
                  )
                    throw new Error(
                      "직무 카드와 상세 데이터가 일치하지 않습니다.",
                    );
                  groupedTitles.add(title.trim());
                });
              });
              categoryGroups.set(categoryData.category, categoryData.centers);
            });
            if (
              groupedTitles.size !== fallbackJobs.size ||
              tabs.some(function (tab) {
                return !categoryGroups.has(tab.dataset.category);
              })
            )
              throw new Error("직무 분야별 카드 데이터가 완전하지 않습니다.");
          })
          .catch(function (error) {
            jobDataError = error;
            console.error("직무 데이터를 불러오지 못했습니다.", error);
          });

        function renderCategory(category) {
          panel.replaceChildren();
          if (jobDataError) {
            var error = document.createElement("p");
            error.className = "tasks-empty";
            error.textContent =
              "직무 정보를 불러오지 못했습니다. 페이지를 새로고침해 주세요.";
            panel.appendChild(error);
            return;
          }
          var groups = categoryGroups.get(category);
          if (!groups) {
            var loading = document.createElement("p");
            loading.className = "tasks-empty";
            loading.textContent = "직무 정보를 불러오는 중입니다.";
            panel.appendChild(loading);
            return;
          }

          var categoryIndex = tabs.findIndex(function (tab) {
            return tab.dataset.category === category;
          });
          groups.forEach(function (group, groupIndex) {
            var groupId = "tasks-group-" + categoryIndex + "-" + groupIndex;
            var groupElement = document.createElement("section");
            groupElement.className = "tasks-group";
            var heading = document.createElement("h3");
            var trigger = document.createElement("button");
            trigger.className = "tasks-accordion-trigger";
            trigger.type = "button";
            trigger.setAttribute("aria-expanded", "false");
            trigger.setAttribute("aria-controls", groupId);
            var label = document.createElement("span");
            label.textContent = group.center;
            var count = document.createElement("span");
            count.className = "tasks-count";
            count.textContent = String(group.jobs.length);
            trigger.append(label, count);
            heading.appendChild(trigger);
            var groupPanel = document.createElement("div");
            groupPanel.className = "tasks-group-panel";
            groupPanel.id = groupId;
            groupPanel.hidden = true;
            var jobGrid = document.createElement("div");
            jobGrid.className = "tasks-job-grid";
            group.jobs.forEach(function (title) {
              var jobButton = document.createElement("button");
              jobButton.className = "tasks-job";
              jobButton.type = "button";
              jobButton.dataset.job = title;
              var jobTitle = document.createElement("span");
              jobTitle.textContent = title;
              var arrow = document.createElement("span");
              arrow.className = "tasks-job-arrow";
              arrow.setAttribute("aria-hidden", "true");
              arrow.textContent = "→";
              jobButton.append(jobTitle, arrow);
              jobGrid.appendChild(jobButton);
            });
            groupPanel.appendChild(jobGrid);
            groupElement.append(heading, groupPanel);
            panel.appendChild(groupElement);
          });
        }

        function setActiveTab(tab, moveFocus) {
          tabs.forEach(function (item) {
            var selected = item === tab;
            item.setAttribute("aria-selected", String(selected));
            item.tabIndex = selected ? 0 : -1;
          });
          activeCategory = tab.dataset.category;
          panel.setAttribute("aria-labelledby", tab.id);
          if (activeCategory === "R&D") {
            panel.innerHTML = rndMarkup;
          } else {
            renderCategory(activeCategory);
          }
          if (moveFocus) tab.focus();
          var tabOffset =
            tab.offsetLeft -
            tabList.offsetLeft -
            (tabList.clientWidth - tab.offsetWidth) / 2;
          if (tabOffset > 0 || tabList.scrollLeft > 0) {
            tabList.scrollTo({
              left: Math.max(0, tabOffset),
              behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                .matches
                ? "auto"
                : "smooth",
            });
          }
        }

        jobDataReady.then(function () {
          if (activeCategory !== "R&D") renderCategory(activeCategory);
        });

        function fillList(list, entries) {
          list.replaceChildren();
          entries.forEach(function (entry) {
            var item = document.createElement("li");
            item.textContent = entry;
            list.appendChild(item);
          });
        }

        function showModalError(message) {
          section.querySelector(".tasks-modal-data").hidden = true;
          var errorMessage = section.querySelector(".tasks-modal-error");
          errorMessage.textContent = message;
          errorMessage.hidden = false;
        }

        function openModal(jobId, trigger) {
          previousFocus = trigger;
          previousOverflow = document.body.style.overflow;
          document.body.style.overflow = "hidden";
          modal.hidden = false;
          modalClose.focus();
          modalBanner.hidden = false;

          jobDataReady.then(function () {
            if (modal.hidden) return;
            if (jobDataError) {
              showModalError(
                "직무 상세 정보를 불러오지 못했습니다. 페이지를 새로고침해 주세요.",
              );
              return;
            }
            var title = trigger.querySelector("span").textContent.trim();
            if (jobId === "formulation") title = "신제형연구 (전문연구요원)";
            var details = popupJobs.get(title);
            var fromPopupData = Boolean(details);
            if (!details) {
              details = fallbackJobs.get(title);
              if (details)
                console.warn(
                  "팝업 JSON에 공고가 없어 전체 직무 데이터로 표시합니다:",
                  title,
                );
            }
            if (!details) {
              showModalError("해당 직무의 상세 데이터를 찾을 수 없습니다.");
              console.error("직무 상세 데이터가 없습니다.", title);
              return;
            }
            var imagePath = popupJobs.get(title).image;
            if (!imagePath || !imagePath.startsWith("./images/")) {
              modalBanner.hidden = true;
              console.error(
                "직무 팝업 로컬 이미지 경로가 올바르지 않습니다.",
                title,
              );
            } else {
              modalBanner.src = imagePath;
            }

            section.querySelector(".tasks-modal-error").hidden = true;
            section.querySelector(".tasks-modal-data").hidden = false;
            section.querySelector(".tasks-modal-title").textContent =
              details.title;
            section.querySelector("#tasks-modal-category").textContent =
              fromPopupData ? details.department : details.category;
            section.querySelector(".tasks-modal-location").textContent =
              fromPopupData ? details.location : details.department;
            section.querySelector("#tasks-modal-career").textContent =
              fromPopupData ? details.category : details.target;
            var duties = fromPopupData
              ? details.job_description
              : details.details["직무 내용"];
            var qualifications = fromPopupData
              ? details.qualifications
              : details.details["자격요건"];
            var preferred = fromPopupData
              ? details.preferred
              : details.details["우대사항"] || [];
            fillList(section.querySelector("#tasks-modal-duties"), duties);
            fillList(
              section.querySelector("#tasks-modal-qualifications"),
              qualifications,
            );
            fillList(
              section.querySelector("#tasks-modal-preferred"),
              preferred,
            );
            section.querySelector("#tasks-modal-preferred-section").hidden =
              preferred.length === 0;
          });
        }

        modalBanner.addEventListener("error", function () {
          modalBanner.hidden = true;
          console.error(
            "직무 팝업 배너 이미지를 불러오지 못했습니다.",
            modalBanner.src,
          );
        });

        function closeModal() {
          if (modal.hidden) return;
          modal.hidden = true;
          document.body.style.overflow = previousOverflow;
          if (previousFocus) previousFocus.focus();
        }

        tabs.forEach(function (tab, index) {
          tab.tabIndex = index === 0 ? 0 : -1;
          tab.addEventListener("click", function () {
            setActiveTab(tab, false);
          });
          tab.addEventListener("keydown", function (event) {
            var nextIndex = index;
            if (event.key === "ArrowRight")
              nextIndex = (index + 1) % tabs.length;
            else if (event.key === "ArrowLeft")
              nextIndex = (index - 1 + tabs.length) % tabs.length;
            else if (event.key === "Home") nextIndex = 0;
            else if (event.key === "End") nextIndex = tabs.length - 1;
            else return;
            event.preventDefault();
            setActiveTab(tabs[nextIndex], true);
          });
        });

        panel.addEventListener("click", function (event) {
          var trigger = event.target.closest(".tasks-accordion-trigger");
          if (trigger) {
            var group = trigger.closest(".tasks-group");
            var groupPanel = section.querySelector(
              "#" + trigger.getAttribute("aria-controls"),
            );
            var willOpen = trigger.getAttribute("aria-expanded") !== "true";
            panel
              .querySelectorAll(".tasks-accordion-trigger")
              .forEach(function (otherTrigger) {
                var otherPanel = section.querySelector(
                  "#" + otherTrigger.getAttribute("aria-controls"),
                );
                otherTrigger.setAttribute("aria-expanded", "false");
                otherTrigger
                  .closest(".tasks-group")
                  .classList.remove("is-open");
                otherPanel.hidden = true;
              });
            trigger.setAttribute("aria-expanded", String(willOpen));
            group.classList.toggle("is-open", willOpen);
            groupPanel.hidden = !willOpen;
            return;
          }
          var jobButton = event.target.closest(".tasks-job");
          if (jobButton) openModal(jobButton.dataset.job, jobButton);
        });

        modalClose.addEventListener("click", closeModal);
        modal.addEventListener("click", function (event) {
          if (event.target === modal) closeModal();
        });
        modalDialog.addEventListener("keydown", function (event) {
          if (event.key === "Tab") {
            event.preventDefault();
            modalClose.focus();
          }
        });
        document.addEventListener("keydown", function (event) {
          if (event.key === "Escape") closeModal();
        });
      })();

/* requirements.js */
(function () {
        var tabs = Array.prototype.slice.call(
          document.querySelectorAll(".requirement-tab"),
        );

        function activateTab(tab, moveFocus) {
          tabs.forEach(function (item) {
            var active = item === tab;
            item.setAttribute("aria-selected", String(active));
            item.tabIndex = active ? 0 : -1;
            document.getElementById(item.getAttribute("aria-controls")).hidden =
              !active;
          });
          if (moveFocus) tab.focus();
        }

        tabs.forEach(function (tab, index) {
          tab.addEventListener("click", function () {
            activateTab(tab, false);
          });
          tab.addEventListener("keydown", function (event) {
            var nextIndex = index;
            if (event.key === "ArrowRight")
              nextIndex = (index + 1) % tabs.length;
            else if (event.key === "ArrowLeft")
              nextIndex = (index - 1 + tabs.length) % tabs.length;
            else if (event.key === "Home") nextIndex = 0;
            else if (event.key === "End") nextIndex = tabs.length - 1;
            else return;
            event.preventDefault();
            activateTab(tabs[nextIndex], true);
          });
        });
      })();

/* exposition.js */
(function () {
        var root = document.getElementById("exposition");
        if (!root) return;

        var tabs = Array.prototype.slice.call(
          root.querySelectorAll(".exposition-tab"),
        );
        var fairSchedule = root.querySelector("#expo-fair-schedule");
        var campusSchedule = root.querySelector("#expo-campus-schedule");
        var regionTabs = root.querySelector("#expo-region-tabs");
        var regions = [];
        var activeCampusDetail = null;
        var campusDetailCounter = 0;

        function closeCampusDetail(restoreFocus) {
          if (!activeCampusDetail) return;
          var previous = activeCampusDetail;
          activeCampusDetail = null;
          previous.detail.hidden = true;
          previous.venue.hidden = false;
          previous.venue.setAttribute("aria-expanded", "false");
          previous.item.classList.remove("is-detail-open");
          previous.item
            .closest(".expo-venues")
            .classList.remove("has-open-detail");
          if (restoreFocus) previous.venue.focus({ preventScroll: true });
        }

        function toggleCampusDetail(venue, detail, item) {
          // 동일한 상세 카드를 재클릭하면 닫고, 다른 학교는 하나만 열리게 한다.
          if (activeCampusDetail && activeCampusDetail.detail === detail) {
            closeCampusDetail(true);
            return;
          }
          closeCampusDetail(false);
          activeCampusDetail = { venue: venue, detail: detail, item: item };
          venue.setAttribute("aria-expanded", "true");
          venue.hidden = true;
          detail.hidden = false;
          item.classList.add("is-detail-open");
          item.closest(".expo-venues").classList.add("has-open-detail");
          detail.focus({ preventScroll: true });
        }

        // 상세 카드 외부 클릭 또는 다른 요소로 포커스 이동 시 닫는다.
        document.addEventListener("click", function (event) {
          if (
            activeCampusDetail &&
            !activeCampusDetail.item.contains(event.target)
          ) {
            closeCampusDetail(false);
          }
        });
        document.addEventListener("focusin", function (event) {
          if (
            activeCampusDetail &&
            !activeCampusDetail.item.contains(event.target)
          ) {
            closeCampusDetail(false);
          }
        });
        document.addEventListener("keydown", function (event) {
          if (event.key === "Escape" && activeCampusDetail) {
            event.preventDefault();
            closeCampusDetail(true);
          }
        });

        function createDetail(eventData) {
          var detail = document.createElement("button");
          detail.type = "button";
          detail.className = "expo-detail";
          detail.id = "expo-campus-detail-" + ++campusDetailCounter;
          detail.title = "세부일정을 닫으려면 다시 클릭하세요";
          detail.hidden = true;

          function createDetailLabel(iconText, labelText) {
            var label = document.createElement("span");
            label.className = "expo-detail-label";
            var icon = document.createElement("span");
            icon.className = "expo-detail-label-icon";
            icon.setAttribute("aria-hidden", "true");
            icon.textContent = iconText;
            var text = document.createElement("span");
            text.textContent = labelText;
            label.append(icon, text);
            return label;
          }

          var place = document.createElement("strong");
          place.className = "expo-detail-value";
          place.textContent =
            eventData.place || "세부 장소는 별도 안내 예정입니다.";
          detail.append(createDetailLabel("⚑", "장소"), place);

          if (eventData.time) {
            var time = document.createElement("strong");
            time.className = "expo-detail-value";
            time.textContent = eventData.time;
            detail.append(createDetailLabel("◷", "시간"), time);
          }

          detail.setAttribute(
            "aria-label",
            eventData.name +
              " 세부일정: " +
              (eventData.place || "세부 장소 별도 안내") +
              (eventData.time ? ", " + eventData.time : "") +
              ". 다시 클릭하면 닫힙니다.",
          );
          return detail;
        }

        function buildCampusRegions(scheduleData) {
          var regionNames = [];
          scheduleData.forEach(function (item) {
            if (!item.region || !item.date || !item.school)
              throw new Error("캠퍼스 일정의 필수 데이터가 누락되었습니다.");
            if (regionNames.indexOf(item.region) === -1)
              regionNames.push(item.region);
          });

          function getDateKey(date) {
            return date.getUTCMonth() + 1 + "/" + date.getUTCDate();
          }

          function formatDate(date) {
            var weekdays = ["일", "월", "화", "수", "목", "금", "토"];
            return (
              date.getUTCMonth() +
              1 +
              "월 " +
              date.getUTCDate() +
              "일 (" +
              weekdays[date.getUTCDay()] +
              ")"
            );
          }

          return regionNames.map(function (regionName) {
            var weeks = new Map();
            scheduleData
              .filter(function (item) {
                return item.region === regionName;
              })
              .forEach(function (item) {
                var match = /^(\d{1,2})월\s*(\d{1,2})일/.exec(item.date);
                if (!match)
                  throw new Error("캠퍼스 일정 날짜 형식이 올바르지 않습니다.");

                var date = new Date(
                  Date.UTC(2026, Number(match[1]) - 1, Number(match[2])),
                );
                var mondayOffset = (date.getUTCDay() + 6) % 7;
                var monday = new Date(date);
                monday.setUTCDate(monday.getUTCDate() - mondayOffset);
                var weekKey = getDateKey(monday);
                var week = weeks.get(weekKey);

                if (!week) {
                  week = { monday: monday, lastDate: date, events: {} };
                  weeks.set(weekKey, week);
                }
                if (date > week.lastDate) week.lastDate = date;

                var dateKey = getDateKey(date);
                if (!week.events[dateKey]) week.events[dateKey] = [];
                week.events[dateKey].push({
                  name: item.school,
                  place: item.location,
                  time: item.time,
                });
              });

            var orderedWeeks = Array.from(weeks.values()).sort(function (a, b) {
              return a.monday - b.monday;
            });

            var periods = orderedWeeks.map(function (week, weekIndex) {
              var isLastWeek = weekIndex === orderedWeeks.length - 1;
              var lastDay = isLastWeek
                ? Math.floor((week.lastDate - week.monday) / 86400000)
                : 4;
              var dates = [];
              var events = [];

              for (var dayOffset = 0; dayOffset <= lastDay; dayOffset += 1) {
                var date = new Date(week.monday);
                date.setUTCDate(date.getUTCDate() + dayOffset);
                dates.push(formatDate(date));
                events.push(week.events[getDateKey(date)] || []);
              }

              return { dates: dates, events: events };
            });

            return { region: regionName, periods: periods };
          });
        }

        function renderPeriods(container, periods, allowDetails) {
          closeCampusDetail(false);
          container.replaceChildren();
          if (!periods.length) {
            var empty = document.createElement("p");
            empty.className = "expo-empty";
            empty.textContent = "현재 등록된 캠퍼스 방문 일정이 없습니다.";
            container.append(empty);
            container.setAttribute("aria-busy", "false");
            return;
          }

          var fragment = document.createDocumentFragment();
          periods.forEach(function (period) {
            var section = document.createElement("section");
            section.className = "expo-period";

            period.dates.forEach(function (date, index) {
              var day = document.createElement("div");
              day.className = "expo-day";
              var dateLabel = document.createElement("h3");
              dateLabel.className = "expo-date";
              dateLabel.textContent = date;
              var venues = document.createElement("div");
              venues.className = "expo-venues";

              (period.events[index] || []).forEach(function (eventData) {
                var venueItem = document.createElement("div");
                venueItem.className = "expo-venue-item";
                var venue = document.createElement(
                  allowDetails ? "button" : "span",
                );
                venue.className = allowDetails
                  ? "expo-venue"
                  : "expo-venue expo-venue--plain";
                venue.textContent = eventData.name;

                if (allowDetails) {
                  venue.type = "button";
                  venue.setAttribute("aria-expanded", "false");
                  var detail = createDetail(eventData);
                  venue.setAttribute("aria-controls", detail.id);
                  venue.addEventListener("click", function () {
                    toggleCampusDetail(venue, detail, venueItem);
                  });
                  detail.addEventListener("click", function () {
                    closeCampusDetail(true);
                  });
                  venueItem.append(venue, detail);
                } else {
                  venueItem.append(venue);
                }
                venues.append(venueItem);
              });

              day.append(dateLabel, venues);
              section.append(day);
            });

            fragment.append(section);
          });

          container.replaceChildren(fragment);
          container.setAttribute("aria-busy", "false");
        }

        function setActiveExpositionTab(tab, moveFocus) {
          closeCampusDetail(false);
          tabs.forEach(function (item) {
            var active = item === tab;
            item.setAttribute("aria-selected", String(active));
            item.tabIndex = active ? 0 : -1;
            root.querySelector(
              "#" + item.getAttribute("aria-controls"),
            ).hidden = !active;
          });
          if (moveFocus) tab.focus();
        }

        function setActiveRegion(tab, moveFocus) {
          Array.prototype.forEach.call(
            regionTabs.querySelectorAll(".expo-region-tab"),
            function (item) {
              var active = item === tab;
              item.setAttribute("aria-selected", String(active));
              item.tabIndex = active ? 0 : -1;
            },
          );
          var region = regions.find(function (item) {
            return item.region === tab.dataset.region;
          });
          renderPeriods(campusSchedule, region ? region.periods : [], true);
          if (moveFocus) tab.focus();
        }

        function addTabKeyboardSupport(tabList, selector, activate) {
          tabList.addEventListener("keydown", function (event) {
            var tab = event.target.closest(selector);
            if (!tab) return;
            var tabItems = Array.prototype.slice.call(
              tabList.querySelectorAll(selector),
            );
            var index = tabItems.indexOf(tab);
            var nextIndex = index;
            if (event.key === "ArrowRight")
              nextIndex = (index + 1) % tabItems.length;
            else if (event.key === "ArrowLeft")
              nextIndex = (index - 1 + tabItems.length) % tabItems.length;
            else if (event.key === "Home") nextIndex = 0;
            else if (event.key === "End") nextIndex = tabItems.length - 1;
            else return;
            event.preventDefault();
            activate(tabItems[nextIndex], true);
          });
        }

        tabs.forEach(function (tab) {
          tab.addEventListener("click", function () {
            setActiveExpositionTab(tab, false);
          });
        });
        addTabKeyboardSupport(
          root.querySelector(".exposition-tabs"),
          ".exposition-tab",
          setActiveExpositionTab,
        );

        Promise.all([
          fetch("./data/exposition.json"),
          fetch("./data/campus_recruiting_schedule.json"),
        ])
          .then(function (responses) {
            responses.forEach(function (response) {
              if (!response.ok)
                throw new Error("방문 일정을 불러오지 못했습니다.");
            });
            return Promise.all(
              responses.map(function (response) {
                return response.json();
              }),
            );
          })
          .then(function (datasets) {
            var fairData = datasets[0];
            var campusData = datasets[1];
            if (!Array.isArray(fairData.fair) || !Array.isArray(campusData))
              throw new Error("방문 일정 데이터 형식이 올바르지 않습니다.");

            regions = buildCampusRegions(campusData);
            renderPeriods(fairSchedule, fairData.fair, false);
            regionTabs.style.setProperty(
              "--expo-region-columns",
              String(Math.max(1, regions.length)),
            );
            regionTabs.replaceChildren();

            regions.forEach(function (region, index) {
              var tab = document.createElement("button");
              tab.className = "expo-region-tab";
              tab.type = "button";
              tab.role = "tab";
              tab.id = "expo-region-tab-" + index;
              tab.dataset.region = region.region;
              tab.setAttribute("aria-selected", String(index === 0));
              tab.setAttribute("aria-controls", "expo-campus-schedule");
              tab.tabIndex = index === 0 ? 0 : -1;
              tab.textContent = region.region;
              tab.addEventListener("click", function () {
                setActiveRegion(tab, false);
              });
              regionTabs.append(tab);
            });

            regionTabs.setAttribute("aria-busy", "false");
            if (regions.length)
              renderPeriods(campusSchedule, regions[0].periods, true);
            addTabKeyboardSupport(
              regionTabs,
              ".expo-region-tab",
              setActiveRegion,
            );
          })
          .catch(function () {
            [fairSchedule, campusSchedule].forEach(function (container) {
              container.textContent = "방문 일정을 불러오지 못했습니다.";
              container.setAttribute("aria-busy", "false");
            });
          });
      })();

/* application.js */
(function () {
        var section = document.getElementById("con9");
        if (!section) return;

        var deadline = new Date(section.dataset.deadline).getTime();
        var daysNode = section.querySelector("[data-countdown-days]");
        var hoursNode = section.querySelector("[data-countdown-hours]");
        var minutesNode = section.querySelector("[data-countdown-minutes]");
        var secondsNode = section.querySelector("[data-countdown-seconds]");
        var status = section.querySelector(".con9-status");
        var timer;

        function updateCountdown() {
          var remaining = deadline - Date.now();
          if (remaining <= 0) {
            daysNode.textContent = "00";
            hoursNode.textContent = "00";
            minutesNode.textContent = "00";
            secondsNode.textContent = "00";
            status.textContent = "이번 채용 지원 기간이 종료되었습니다.";
            if (timer) window.clearInterval(timer);
            return;
          }

          var totalSeconds = Math.floor(remaining / 1000);
          daysNode.textContent = String(
            Math.floor(totalSeconds / 86400),
          ).padStart(2, "0");
          hoursNode.textContent = String(
            Math.floor((totalSeconds % 86400) / 3600),
          ).padStart(2, "0");
          minutesNode.textContent = String(
            Math.floor((totalSeconds % 3600) / 60),
          ).padStart(2, "0");
          secondsNode.textContent = String(totalSeconds % 60).padStart(2, "0");
        }

        updateCountdown();
        timer = window.setInterval(updateCountdown, 1000);
      })();

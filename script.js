/* --- 기존 배너 슬라이더 로직 유지 --- */
const wrapper = document.querySelector('.slider-wrapper');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentIdx = 0;
const slideCount = slides.length;
let autoPlayInterval;
let resumeTimeout;
let startX = 0;
let isDragging = false;

function moveSlide(idx) {
    currentIdx = idx;
    wrapper.style.transform = `translateX(-${currentIdx * (100 / slideCount)}%)`;
    slides.forEach((s, i) => {
        s.classList.toggle('active', i === currentIdx);
        dots[i].classList.toggle('active', i === currentIdx);
    });
}

function startAutoPlay() {
    stopAutoPlay();
    autoPlayInterval = setInterval(() => {
        currentIdx = (currentIdx + 1) % slideCount;
        moveSlide(currentIdx);
    }, 3000);
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
    clearTimeout(resumeTimeout);
}

function reserveAutoPlay() {
    stopAutoPlay();
    resumeTimeout = setTimeout(startAutoPlay, 5000);
}

// 스와이프 기능
wrapper.addEventListener('mousedown', (e) => { startX = e.pageX; isDragging = true; stopAutoPlay(); });
wrapper.addEventListener('touchstart', (e) => { startX = e.touches[0].pageX; isDragging = true; stopAutoPlay(); });

function handleEnd(endX) {
    if (!isDragging) return;
    const diff = startX - endX;
    if (Math.abs(diff) > 50) {
        if (diff > 0) currentIdx = Math.min(currentIdx + 1, slideCount - 1);
        else currentIdx = Math.max(currentIdx - 1, 0);
        moveSlide(currentIdx);
    }
    isDragging = false;
    reserveAutoPlay();
}

window.addEventListener('mouseup', (e) => handleEnd(e.pageX));
window.addEventListener('touchend', (e) => handleEnd(e.changedTouches[0].pageX));

dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { moveSlide(i); reserveAutoPlay(); });
});

startAutoPlay();

/* --- [추가] 테마 시스템 로직 --- */
const themeToggle = document.getElementById('theme-toggle');
const htmlEl = document.documentElement;

// 1. 초기 테마 결정 (LocalStorage -> System Preference)
const savedTheme = localStorage.getItem('theme');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
const initialTheme = savedTheme || systemTheme;

htmlEl.setAttribute('data-theme', initialTheme);

// 2. 토글 이벤트 핸들러
themeToggle.addEventListener('click', () => {
    const currentTheme = htmlEl.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlEl.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// 3. 시스템 설정 변경 감지 실시간 반영 (사용자가 수동 설정을 하지 않았을 때만)
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
        const newSystemTheme = e.matches ? 'dark' : 'light';
        htmlEl.setAttribute('data-theme', newSystemTheme);
    }
});
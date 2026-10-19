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

/* --- 메가 메뉴 및 모바일 내비게이션 --- */
const siteHeader = document.querySelector('.site-header');
const primaryNav = document.querySelector('.primary-nav');
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelectorAll('.nav-menu a');
const desktopLayout = window.matchMedia('(min-width: 769px)');

function setMegaMenuOpen(isOpen) {
    siteHeader.classList.toggle('is-mega-menu-open', isOpen);
    navLinks.forEach(link => link.setAttribute('aria-expanded', String(isOpen)));
}

function setMobileMenuOpen(isOpen) {
    siteHeader.classList.toggle('mobile-nav-open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
}

primaryNav.querySelector('.nav-menu').addEventListener('pointerenter', () => {
    if (desktopLayout.matches) setMegaMenuOpen(true);
});

siteHeader.addEventListener('focusin', event => {
    if (desktopLayout.matches && event.target.closest('.nav-menu a, .mega-menu a')) {
        setMegaMenuOpen(true);
    }
});

siteHeader.addEventListener('pointerleave', () => {
    if (!siteHeader.contains(document.activeElement)) setMegaMenuOpen(false);
    setMobileMenuOpen(false);
});

siteHeader.addEventListener('focusout', event => {
    if (!siteHeader.contains(event.relatedTarget)) {
        setMegaMenuOpen(false);
        setMobileMenuOpen(false);
    }
});

menuToggle.addEventListener('click', () => {
    setMobileMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
});

primaryNav.querySelector('.nav-menu').addEventListener('click', event => {
    if (event.target.closest('a') && !desktopLayout.matches) setMobileMenuOpen(false);
});

document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;

    setMegaMenuOpen(false);
    if (siteHeader.classList.contains('mobile-nav-open')) {
        setMobileMenuOpen(false);
        menuToggle.focus();
    }
});

desktopLayout.addEventListener('change', () => {
    setMegaMenuOpen(false);
    setMobileMenuOpen(false);
});

/* --- 세계의 패션쇼 Swiper --- */
const fashionWeeksSlider = document.querySelector('.fashion-weeks-slider');

if (fashionWeeksSlider) {
    new Swiper(fashionWeeksSlider, {
        loop: true,
        loopAdditionalSlides: 7,
        slidesPerView: 1.2,
        spaceBetween: 20,
        grabCursor: true,
        speed: 600,
        autoplay: {
            delay: 3000,
            disableOnInteraction: true,
            pauseOnMouseEnter: true
        },
        navigation: {
            nextEl: '.fashion-weeks-next',
            prevEl: '.fashion-weeks-prev'
        },
        pagination: {
            el: '.fashion-weeks-pagination',
            clickable: true
        },
        breakpoints: {
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1200: { slidesPerView: 4 }
        }
    });
}
# [문서 02] 프론트엔드 개발용 PRD

## 1. 기술 스택 명세
- **Core**: HTML5, Vanilla JavaScript (또는 React / Vite 환경)
- **Styling**: CSS3 (Custom Properties / Flexbox / Grid / Media Queries)
- **Version Control**: Git / GitHub Desktop

## 2. 컴포넌트 아키텍처
- **Semantic Layout**: `<header>`, `<main>`, `<section>`, `<footer>` 표준 시멘틱 태그 준수
- **Reusable Components**:
  - Navigation Bar (`header.nav-bar`)
  - Hero Banner Section (`section.hero-visual`)
  - Content Cards Grid (`section.content-grid`)
  - Footer Area (`footer.site-footer`)

## 3. 반응형 및 레이아웃 제약 사항
- **단일 DOM 전략**: 화면 크기 전환 시 불필요한 DOM 복제 없이 CSS Flex/Grid 및 미디어 쿼리를 통한 유동적 재배치
- **단위 시스템**: 상대 단위(`vw`, `vh`, `%`, `rem`) 적극 활용
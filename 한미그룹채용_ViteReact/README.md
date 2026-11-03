# 한미그룹 채용 사이트 (Vite + React)

기존 한미그룹 채용 사이트를 React 컴포넌트와 Vite 빌드로 구성한 독립 프로젝트입니다. 사이트의 화면은 JSX 컴포넌트로 나뉘며, 기존 내비게이션·직무·복지·채용 일정 동작은 `src/legacy/`에서 React 렌더링 이후 ES 모듈로 불러와 유지합니다. 이미지, JSON 데이터, Canvas 프레임은 `public/`에 원본 경로를 유지해 보관합니다.

## 개발 환경

- Node.js 20.19 이상 (LTS 권장)
- npm

```powershell
npm install
npm run dev
```

Vite 개발 서버 주소: `http://localhost:5173`

## Canvas 데모

- `/hanmi-eye-tracking/` — 걷는 캐릭터
- `/hanmi-reading-eye-tracking/` — 돋보기를 든 캐릭터

두 페이지와 메인 페이지 모두 React의 `CanvasPlayer` 컴포넌트를 사용합니다.

## 배포 빌드

```powershell
npm run build
npm run preview
```

정적 배포 산출물은 `dist/`에 생성되며 HTML, CSS, JS, 이미지, JSON, Canvas 에셋 경로를 상대 경로로 사용합니다. 이미지·데이터·Canvas 프레임도 함께 포함되므로 `dist/` 전체를 웹 서버에 배포해야 합니다. 배포 서버는 Canvas 데모 경로를 `index.html`로 되돌리는 SPA fallback을 지원해야 합니다.

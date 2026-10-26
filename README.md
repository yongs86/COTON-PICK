# 꼬똥픽 COTON PICK

**꼬똥을 위한 모든 선택** — Astro 정적 콘텐츠 MVP. 딥틸·민트·아이보리, 모바일 우선 UI.

## 현재 상태

- 홈, 앙두 스토리/꼬똥 가이드/꼬똥 플레이스 목록·상세, 카테고리 필터, 통합 검색, 404 구현
- Markdown 예시 6편. 모두 예시 배지 및 안내문 표시. 예시 상세는 noindex, sitemap에서 제외
- Instagram은 `https://www.instagram.com/andu.coton/` 외부 링크. 로그인·API·피드 자동 수집 없음
- **사용자가 첨부한 실제 앙두 사진 3장 반영.** 홈 대표·소개·콘텐츠 카드·상세에 배치. 확정 A-2 로고 원본은 미확보 상태로 심볼은 임시 벡터 유지
- GitHub 소스 게시 완료: [yongs86/COTON-PICK](https://github.com/yongs86/COTON-PICK). Cloudflare 연결·배포는 진행 중
- 초기 배포 기본값은 `SITE_STAGE=preview`: 미리보기 안내, 전체 noindex, robots 제외, 빈 sitemap. 정식 공개 시 production으로 변경 후 재빌드

## 실행

권장 Node.js 24 LTS, pnpm 11.25.0. Windows에서도 같은 명령을 사용합니다. pnpm이 없으면 Node 설치 후 `npm install -g pnpm@11.25.0`으로 준비합니다.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

개발 화면: `http://127.0.0.1:4321` (사용 중이면 터미널에 출력되는 포트 확인). HTML 파일을 직접 더블클릭하면 검색이 작동하지 않으므로 개발 서버나 미리보기 서버를 이용합니다.

```sh
pnpm check
pnpm build
pnpm verify
pnpm preview
```

`dist/`가 배포 결과입니다. 콘텐츠/사진 변경 후 반드시 재빌드합니다.

## 파일 위치

| 위치 | 역할 |
|---|---|
| `src/content/posts/*.md` | 콘텐츠 원본, 파일명이 상세 URL |
| `src/content.config.ts` | 필수 컬럼·타입 검증 |
| `src/pages/` | 홈·목록·상세·검색·SEO 파일 |
| `src/components/` | 카드, 사진, 임시 심볼 |
| `src/styles/global.css` | 브랜드 색상·레이아웃·반응형 |
| `src/assets/andu-*.png` | 사용자 제공 앙두 사진 원본, 빌드 시 WebP 최적화 |
| `docs/OPERATIONS.md` | 작성·검수·운영 기준 |
| `docs/DEPLOYMENT.md` | GitHub·Cloudflare Pages 배포 |
| `docs/STATUS.md` | 인수인계·공개 전 미완료 사항 |

## 비용과 범위

사용자 선택안인 GitHub + Cloudflare Pages Free의 무료 한도 내 운영을 전제로 합니다. 커스텀 도메인을 구매하지 않고 `pages.dev` 주소를 사용합니다. 유료 API, 폰트, 분석 도구, 외부 이미지 CDN을 호출하지 않습니다. 계정의 요금제·한도·기존 사용량은 사용자가 확인해야 하며 서비스 정책 변경이나 초과 사용에 대한 영구 무료를 보장하지 않습니다.

백엔드, 회원가입, 예약, 결제, 광고, 댓글, 정보 수집 폼, 지도 API 없음. 원본 파일·사진은 공개 저장소에 올리면 누구나 볼 수 있습니다. 비밀키·개인정보를 저장하지 마세요.

## SEO·접근성

한국어 언어 설정, 페이지별 제목·설명·canonical, Open Graph·JSON-LD, robots·sitemap, 시맨틱 요소, 본문 이동 링크, 키보드 초점, 검색 상태 안내, 버튼의 선택 상태, reduced-motion 반영. 사진은 Astro 빌드에서 WebP로 최적화하고 SVG 표시 영역으로 첨부 이미지의 검은 상하 여백을 제외합니다. 원본 PNG는 그대로 보존하며 외부 폰트를 호출하지 않습니다.

기본 배포 주소는 **설정 예시** `https://coton-pick.pages.dev`이며 소유·사용 가능 여부는 확인하지 않았습니다. 실제 주소를 `SITE_URL` 환경변수에 넣어 빌드해야 합니다. 공유용 OG 이미지는 `public/og.png`(1200×630)이며 원본은 `public/og.svg`입니다. 확정 BI 반영 시 두 파일을 함께 갱신하세요.

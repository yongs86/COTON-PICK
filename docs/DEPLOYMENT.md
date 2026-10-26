# GitHub + Cloudflare Pages Free 배포

확인 기준: 2026-10-26. 이 프로젝트는 정적 HTML을 생성하므로 Cloudflare 어댑터, Workers, Functions, API 키가 필요하지 않습니다. [yongs86/COTON-PICK](https://github.com/yongs86/COTON-PICK) main과 Cloudflare Pages가 연결됐으며 [coton-pick.pages.dev](https://coton-pick.pages.dev/)에 배포했습니다. 현재는 SITE_STAGE=preview입니다.

## 1. GitHub에 소스 올리기

GitHub에서 새 저장소를 만들고 `coton-pick` 폴더의 **내용을 저장소 최상위**에 올립니다. GitHub Desktop을 쓰면 이 폴더를 로컬 저장소로 추가하고 Publish repository를 실행하면 됩니다. 공개/비공개는 운영자가 선택합니다. 무료 한도와 계정 정책을 확인하세요.

포함: src, public, scripts, docs, package.json, pnpm-lock.yaml, pnpm-workspace.yaml, astro.config.mjs, tsconfig.json, .nvmrc, .gitignore, .github.
제외: node_modules, dist, .astro, qa, .env, 계정키·원본 개인정보.

터미널을 쓰는 경우 아래 명령에서 저장소 주소를 **본인 주소로 교체**합니다.

```sh
git init
git add .
git commit -m "Build COTON PICK static MVP"
git branch -M main
git remote add origin https://github.com/YOUR-ACCOUNT/coton-pick.git
git push -u origin main
```

## 2. Cloudflare Pages 연결

Cloudflare 대시보드의 Workers & Pages에서 Pages 프로젝트를 만들고 GitHub 저장소를 연결합니다. UI 명칭은 변경될 수 있습니다. Workers 앱 생성 대신 **Pages Git 연동** 경로를 선택합니다.

| 설정 | 값 |
|---|---|
| Framework preset | Astro |
| Production branch | main |
| Root directory | 소스가 저장소 최상위면 공란 |
| Build command | pnpm build |
| Build output directory | dist |
| 환경변수 NODE_VERSION | 24 |
| 환경변수 PNPM_VERSION | 11.25.0 |
| 환경변수 SITE_URL | 실제 `https://프로젝트명.pages.dev` |
| 환경변수 SITE_STAGE | 초기에는 preview, 정식 공개 때 production |

원본 상위 폴더 전체를 저장소로 올렸다면 Root directory를 `coton-pick`으로 지정합니다. pnpm-lock.yaml이 있어야 버전이 고정됩니다. 패키지 설치는 플랫폼이 수행합니다.

프로젝트명을 정한 뒤 SITE_URL을 입력합니다. 초기 배포 뒤 URL이 확정되었다면 환경변수를 변경하고 재배포합니다. 설정 파일의 기본 주소는 예시이며 실제 소유 주소가 아닙니다. SITE_URL은 빌드 환경변수이고 방문자 입력값이 아닙니다.

기본값은 `SITE_STAGE=preview`입니다. 미리보기는 안내 문구, 모든 페이지 noindex, robots 접근 제외, 빈 sitemap을 생성합니다. 이것은 접근 제한이나 비공개 호스팅을 뜻하지 않으므로 URL을 아는 사람은 볼 수 있습니다. 정식 콘텐츠와 BI 검수 후 `SITE_STAGE=production`으로 변경하고 재배포하면 일반 페이지의 색인이 허용됩니다. 예시 상세는 정식 운영에서도 noindex를 유지합니다.

## 3. 공개 전 확인

- 사진 3장 표시 확인, 확정 로고·실제 콘텐츠 교체
- 예시를 유지한다면 예시 안내 표시를 지우지 않기. 정식 운영에서 제외하려면 draft: true
- `pnpm release-check` 확인. 수동 BI 확인은 자동검사로 보장하지 않음
- SITE_URL 반영 후 빌드. canonical·robots.txt·sitemap.xml 주소 확인
- OG PNG 이미지가 실제 배포 주소에서 열리는지 확인
- 홈 → 세 목록 → 상세 → 태그 검색 → 검색 결과 없는 경우 → 404 확인
- 모바일 360px와 데스크톱에서 줄바꿈·사진 크롭·키보드 초점 확인
- Instagram 새 창 링크 확인

미리보기 배포도 공개 접근 가능할 수 있으므로 비밀 글이나 사진을 넣지 않습니다. 다른 도메인의 미리보기는 운영 도메인으로 canonical이 설정됩니다. 운영 도메인만 검색 등록합니다.

## 4. 무료 운영 유지

커스텀 도메인 구매 없이 Pages가 제공하는 pages.dev 주소를 사용합니다. Functions·유료 API·유료 분석·유료 플랜을 추가하지 않습니다. 매 수정마다 불필요하게 반복 빌드하지 말고 변경을 모아서 게시합니다. 현재 공식 안내의 Free 한도에는 월 500 builds, 사이트당 20,000 files, 파일당 최대 25MiB 등이 있으며 정책은 바뀔 수 있습니다. 계정 대시보드와 아래 공식 문서를 우선합니다.

## 5. 업데이트·복구

Markdown/사진 변경 → 검증 → main push → 자동 재배포. URL을 바꾸지 않으면 검색엔진·공유 링크 유지에 도움이 됩니다. 삭제 또는 URL 변경이 필요하면 public/_redirects 파일에 Cloudflare Pages 리다이렉트 규칙을 별도로 추가합니다. SPA 전체 경로를 홈으로 보내는 규칙은 사용하지 않습니다(정적 상세 및 404 유지).

잘못 게시했다면 GitHub에서 문제 커밋을 되돌리거나 Cloudflare의 이전 정상 배포로 롤백합니다. 소스와 배포 버전이 일치하는지 기록하세요.

공식 근거:
- Astro Cloudflare 배포: https://docs.astro.build/en/guides/deploy/cloudflare/
- Cloudflare Pages Astro 설정: https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/
- Cloudflare Pages 한도: https://developers.cloudflare.com/pages/platform/limits/

# 인수인계

## 목적·확정 범위
초기 유료 서비스 없이 꼬똥픽 콘텐츠 MVP 운영. Astro 정적 사이트, GitHub, Cloudflare Pages Free. 브랜드 방향 A-2 꼬똥 감성형 / 딥틸 #123f3b · 민트 #d7eae1 · 아이보리 #faf8f1. 슬로건: 꼬똥을 위한 모든 선택.

홈, 스토리·가이드·플레이스 목록/상세, 검색, Instagram 외부 링크. 백엔드·회원가입·예약·결제·광고 제외.

## 사진 반영 및 미확보 자료
사용자가 이 채팅에 첨부한 실제 앙두 사진 3장을 src/assets에 보존하고 홈·카드·상세에 반영했습니다. 원본 이미지 내용은 변경하지 않고 빌드 시 WebP 최적화 및 SVG 표시 영역으로 검은 여백을 제외합니다.

이전 선형 심볼은 사용자가 반려했습니다. 새 이미지 시안 A/B/C를 보여준 뒤 사용자가 "B안으로 진행"으로 승인했습니다. 승인된 딥틸 사각 B안 원본은 src/assets/andu-logo-approved-b.png이며 그대로 사용합니다. 이후 디자인 변경은 AGENTS.md의 이미지 선확인·승인 절차를 지킵니다.

## 다음 작업
1. B안 승인 완료. 이후 수정 요청이 있으면 새 이미지를 먼저 확인받기
2. 승인 전 사이트 연결 파일 수정·커밋·푸시·배포 금지
3. 예시 글을 실제 콘텐츠로 교체하거나 draft 처리. sample false는 사실 확인 후 적용
4. 배포 완료: https://coton-pick.pages.dev/ (GitHub main 자동 배포). SITE_URL 설정 및 SITE_STAGE=preview 적용
5. 실제 콘텐츠와 확정 BI 검수 후 정식 공개가 필요하면 SITE_STAGE=production으로 변경해 재배포

## 새 세션 실행 지시문
이 폴더 AGENTS.md, README.md와 docs/OPERATIONS.md를 읽고 기존 MVP를 이어서 수정하세요. 로고는 사용자가 승인한 B안 원본 PNG를 그대로 사용합니다. 디자인 변경은 이미지 선확인·승인을 받은 뒤에만 반영하세요. 예시 글을 실제 경험으로 임의 변경하지 마세요. 변경 후 pnpm check, pnpm build, pnpm verify를 실행하고 필요할 때 pnpm release-check로 공개 준비 상태를 보고하세요. GitHub main push 시 https://coton-pick.pages.dev/에 자동 배포됩니다.

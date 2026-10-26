# 인수인계

## 목적·확정 범위
초기 유료 서비스 없이 꼬똥픽 콘텐츠 MVP 운영. Astro 정적 사이트, GitHub, Cloudflare Pages Free. 브랜드 방향 A-2 꼬똥 감성형 / 딥틸 #123f3b · 민트 #d7eae1 · 아이보리 #faf8f1. 슬로건: 꼬똥을 위한 모든 선택.

홈, 스토리·가이드·플레이스 목록/상세, 검색, Instagram 외부 링크. 백엔드·회원가입·예약·결제·광고 제외.

## 사진 반영 및 미확보 자료
사용자가 이 채팅에 첨부한 실제 앙두 사진 3장을 src/assets에 보존하고 홈·카드·상세에 반영했습니다. 원본 이미지 내용은 변경하지 않고 빌드 시 WebP 최적화 및 SVG 표시 영역으로 검은 여백을 제외합니다.

사용자가 기존 작은 얼굴 심볼의 변경을 요청해, 긴 귀와 머리 묶음을 살린 선형 디자인으로 교체했습니다. 원본은 src/assets/andu-symbol.svg이고 상단 로고와 파비콘에 함께 반영합니다. 기존 대화의 A-2 원본을 복원한 것이 아니라 이번 요청에 따른 새 교체안입니다.

## 다음 작업
1. 새 긴 귀 선형 심볼의 사용자 최종 검토
2. 필요하면 심볼 원본 한 곳에서 비례·선 두께 조정
3. 예시 글을 실제 콘텐츠로 교체하거나 draft 처리. sample false는 사실 확인 후 적용
4. 배포 완료: https://coton-pick.pages.dev/ (GitHub main 자동 배포). SITE_URL 설정 및 SITE_STAGE=preview 적용
5. 실제 콘텐츠와 확정 BI 검수 후 정식 공개가 필요하면 SITE_STAGE=production으로 변경해 재배포

## 새 세션 실행 지시문
이 폴더 README.md와 docs/OPERATIONS.md를 읽고 기존 MVP를 이어서 수정하세요. 실제 사진 3장과 새 긴 귀 선형 심볼이 반영되어 있습니다. 심볼 수정은 src/assets/andu-symbol.svg에서 처리하세요. 예시 글을 실제 경험으로 임의 변경하지 마세요. 변경 후 pnpm check, pnpm build, pnpm verify를 실행하고 필요할 때 pnpm release-check로 공개 준비 상태를 보고하세요. GitHub main push 시 https://coton-pick.pages.dev/에 자동 배포됩니다.

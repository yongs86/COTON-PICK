// 명시적으로 production을 선택하기 전에는 검색 색인을 허용하지 않습니다.
export const isPreview = process.env.SITE_STAGE !== 'production';

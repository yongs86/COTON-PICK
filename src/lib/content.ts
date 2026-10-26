import { getCollection, type CollectionEntry } from 'astro:content';
export type Post = CollectionEntry<'posts'>;
export const sections = {
  stories: { title: '앙두 스토리', en: 'ANDU’S JOURNAL', description: '작은 순간이 모여, 우리의 하루가 됩니다.', intro: '산책길의 발견부터 집에서 보내는 느긋한 오후까지. 앙두와 함께 써 내려갈 일상의 기록입니다.' },
  guides: { title: '꼬똥 가이드', en: 'LIFE WITH COTON', description: '함께하는 매일에, 조금 더 좋은 선택.', intro: '처음 준비하는 물건, 매일의 루틴, 함께 떠나는 외출. 꼬똥과의 생활에 필요한 체크리스트를 모읍니다.' },
  places: { title: '꼬똥 플레이스', en: 'PLACES TOGETHER', description: '다음 산책은, 조금 더 새로운 곳으로.', intro: '함께 쉬고, 걷고, 머무를 곳을 찾는 공간. 방문 조건을 꼼꼼히 확인하고 우리의 장소를 기록합니다.' },
} as const;
export type Section = keyof typeof sections;
export async function allPosts() {
  return (await getCollection('posts', ({ data }) => !data.draft)).sort((a,b) => b.data.date.localeCompare(a.data.date) || a.id.localeCompare(b.id));
}
export const postUrl = (post: Post) => `/${post.data.section}/${post.id}/`;
export const displayDate = (date: string) => date.replaceAll('-', '.');

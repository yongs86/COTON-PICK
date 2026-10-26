import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
const pending=[];
for(const name of ['andu-01.png','andu-02.png','andu-03.png']){
  try{await access(`src/assets/${name}`);}catch{pending.push(`앙두 원본 사진 추가: src/assets/${name}`);}
}
const files=await readdir('src/content/posts');
for(const name of files.filter(file=>file.endsWith('.md'))){
  const text=await readFile(path.join('src/content/posts',name),'utf8');
  if(!/^draft:\s*true\s*$/m.test(text) && /^sample:\s*true\s*$/m.test(text))pending.push(`정식 글로 교체하거나 draft: true 설정: ${name}`);
}
if(!process.env.SITE_URL || new URL(process.env.SITE_URL).hostname === 'coton-pick.pages.dev')pending.push('실제 배포 주소 확인 후 SITE_URL 설정 (예시 기본 주소 사용 중)');
console.log('수동 확인: 확정 A-2 로고, 실제 사진 대체 텍스트, 장소 이용 조건, 모바일 크롭, OG PNG 확인');
if(pending.length){console.error('공개 준비 미완료:\n- '+pending.join('\n- '));process.exitCode=1;}else console.log('자동 공개 준비 검사 통과. 위 수동 확인 후 공개하세요.');

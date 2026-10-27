import { readdir, readFile, access } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const root = path.resolve('dist');
const walk = async dir => (await Promise.all((await readdir(dir,{withFileTypes:true})).map(entry=>entry.isDirectory()?walk(path.join(dir,entry.name)):path.join(dir,entry.name)))).flat();
const files=await walk(root);
const htmlFiles=files.filter(file=>file.endsWith('.html'));
const errors=[];
for(const file of htmlFiles){
  const html=await readFile(file,'utf8');
  for(const [test,message] of [[/<html lang="ko">/,'한국어 설정'],[/<title>[^<]+<\/title>/,'페이지 제목'],[/name="description"/,'설명'],[/rel="canonical"/,'canonical'],[/id="main"/,'본문 이동'],[/<h1[ >]/,'주 제목']]){
    if(!test.test(html))errors.push(`${path.relative(root,file)}: ${message} 누락`);
  }
  const h1s=html.match(/<h1[ >]/g)||[];if(h1s.length!==1)errors.push(`${file}: h1 개수 ${h1s.length}`);
  for(const match of html.matchAll(/(?:href|src)="(\/[^"?#]*)[^"\s]*"/g)){
    const pathname=decodeURIComponent(match[1]);
    const target=path.join(root,pathname.endsWith('/')?`${pathname}index.html`:pathname);
    try{await access(target);}catch{errors.push(`${path.relative(root,file)}: 끊어진 경로 ${pathname}`);}
  }
  for(const match of html.matchAll(/<img\b[^>]*>/g)){
    const decorative = /aria-hidden="true"/.test(match[0]);
    if(!/alt="[^"]*"/.test(match[0]) || (!decorative && /alt=""/.test(match[0])))errors.push(`${file}: 이미지 대체 텍스트 누락`);
  }
}
const index=JSON.parse(await readFile(path.join(root,'search-index.json'),'utf8'));
const home = await readFile(path.join(root,'index.html'),'utf8');
if(process.env.SITE_STAGE !== 'production'){
  assert(home.includes('noindex,follow'),'미리보기 홈 noindex 누락');
  assert((await readFile(path.join(root,'robots.txt'),'utf8')).includes('Disallow: /'),'미리보기 robots 제외 누락');
}
assert(!home.includes('앙두 사진 준비 중'),'사진 자리 표시가 남아 있습니다.');
for(const name of ['andu-01','andu-02','andu-03'])assert(home.includes(`data-photo="${name}"`),`홈 사진 미반영: ${name}`);
assert(files.filter(file=>file.endsWith('.webp')).length>=3,'최적화 사진 3장 누락');
assert(index.length>0,'검색 콘텐츠가 없습니다.');
for(const item of index){assert(item.url.startsWith('/'));assert(item.title && item.body);await access(path.join(root,item.url,'index.html'));}
const sample=index.find(item=>item.sample);
if(sample){const html=await readFile(path.join(root,sample.url,'index.html'),'utf8');assert(html.includes('noindex,follow'),'예시 상세 noindex 누락');}
const sitemap=await readFile(path.join(root,'sitemap.xml'),'utf8');
for(const item of index.filter(item=>item.sample))assert(!sitemap.includes(item.url),'예시 콘텐츠 sitemap 포함');
if(errors.length){console.error(errors.join('\n'));process.exit(1);}
console.log(`검증 통과: HTML ${htmlFiles.length}개, 검색 문서 ${index.length}개, 내부 링크·메타정보·예시 색인 제외 확인.`);

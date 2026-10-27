import { readFile, writeFile, mkdir } from 'node:fs/promises';
import sharp from 'sharp';

const original = await readFile(new URL('../src/assets/andu-logo-approved-b.png', import.meta.url));
const brandDir = new URL('../public/brand/', import.meta.url);
await mkdir(brandDir, { recursive:true });
// 승인된 형태를 다시 그리지 않습니다. 바깥 여백 제외 및 비율 유지 축소만 수행합니다.
const png = await sharp(original)
  .trim({ background:'#faf8f1', threshold:35 })
  .resize(512,512,{ fit:'contain', background:'#faf8f1' })
  .png().toBuffer();
await writeFile(new URL('andu-approved-b.png',brandDir),png);
await writeFile(new URL('andu-approved-b.webp',brandDir),await sharp(png).webp({quality:92}).toBuffer());
await writeFile(new URL('../public/favicon-b.png',import.meta.url),await sharp(png).resize(64,64).png().toBuffer());
// 旧 SVG 주소를 사용하던 곳도 승인된 B안으로 표시합니다. 벡터 재해석이 아닌 이미지 래퍼입니다.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><image width="512" height="512" href="data:image/png;base64,${png.toString('base64')}"/></svg>\n`;
await writeFile(new URL('andu-symbol.svg',brandDir),svg);
await writeFile(new URL('../public/favicon.svg',import.meta.url),svg);

import { readFile, writeFile, mkdir } from 'node:fs/promises';
const symbol = await readFile(new URL('../src/assets/andu-symbol.svg', import.meta.url),'utf8');
const artwork = symbol.trim().replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
await mkdir(new URL('../public/brand/', import.meta.url), { recursive:true });
await writeFile(new URL('../public/brand/andu-symbol.svg', import.meta.url),symbol);
await writeFile(new URL('../public/favicon.svg', import.meta.url),`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="23" fill="#faf8f1"/>${artwork}</svg>\n`);

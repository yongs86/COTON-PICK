import type { APIRoute } from 'astro';
import { allPosts, postUrl } from '../lib/content';
import { isPreview } from '../lib/site';
export const GET:APIRoute=async({site})=>{
  const paths=isPreview ? [] : ['/','/stories/','/guides/','/places/',...(await allPosts()).filter(p=>!p.data.sample).map(postUrl)];
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(path=>`<url><loc>${new URL(path,site)}</loc></url>`).join('')}</urlset>`,{headers:{'Content-Type':'application/xml; charset=utf-8'}});
};

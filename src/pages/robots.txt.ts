import type { APIRoute } from 'astro';
import { isPreview } from '../lib/site';
export const GET:APIRoute=({site})=>new Response(isPreview ? 'User-agent: *\nDisallow: /\n' : `User-agent: *\nAllow: /\nSitemap: ${new URL('/sitemap.xml',site)}\n`,{headers:{'Content-Type':'text/plain; charset=utf-8'}});

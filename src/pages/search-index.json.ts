import type { APIRoute } from 'astro';
import { allPosts, postUrl, sections } from '../lib/content';
export const GET: APIRoute = async () => new Response(JSON.stringify((await allPosts()).map(post=>({title:post.data.title, description:post.data.description, section:post.data.section, sectionTitle:sections[post.data.section].title, category:post.data.category, tags:post.data.tags, body:post.body, url:postUrl(post), sample:post.data.sample}))),{headers:{'Content-Type':'application/json; charset=utf-8'}});

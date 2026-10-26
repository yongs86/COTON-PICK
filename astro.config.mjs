import { defineConfig } from 'astro/config';

export default defineConfig({
  site: process.env.SITE_URL || 'https://coton-pick.pages.dev',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  vite: { server: { allowedHosts: ['localhost'] } },
});

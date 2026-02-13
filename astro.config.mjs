// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import expressiveCode from 'astro-expressive-code';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    expressiveCode({
      themes: ['github-dark'],
      styleOverrides: {
        borderRadius: '0.5rem',
        codeFontFamily: 'Agave, ui-monospace, SFMono-Regular, monospace',
        codeFontSize: 'clamp(0.78rem, calc(0.67rem + 0.31vw), 0.92rem)',
        frames: {
          shadowColor: 'rgba(0,0,0,0.3)',
        },
      },
    }),
    mdx(),
  ],
  markdown: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
  },
  vite: {
    plugins: [tailwindcss()],
  },
  redirects: {
    '/blog': '/tags/블로그 포트폴리오',
    '/me': '/tags/일기',
  },
});

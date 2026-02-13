// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import expressiveCode from 'astro-expressive-code';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { readFileSync, writeFileSync } from 'node:fs';
import { glob } from 'node:fs/promises';

/** @type {import('astro').AstroIntegration} */
const ecCssToHead = {
  name: 'ec-css-to-head',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      const linkRe = /<link rel="stylesheet" href="\/_astro\/ec\.[^"]+\.css"\/>/g;
      let htmlCount = 0;
      let movedCount = 0;
      let ecDivCount = 0;
      for await (const file of glob('**/*.html', { cwd: dir.pathname })) {
        htmlCount++;
        const path = dir.pathname + file;
        const html = readFileSync(path, 'utf-8');
        if (html.includes('expressive-code')) ecDivCount++;
        const links = html.match(linkRe);
        if (!links) continue;
        movedCount++;
        const uniqueLink = [...new Set(links)].join('');
        const result = html.replace(linkRe, '').replace('</head>', `${uniqueLink}</head>`);
        writeFileSync(path, result);
      }
      console.log(`[ec-css-to-head] ${htmlCount} HTML files | ${ecDivCount} with EC divs | ${movedCount} EC CSS moved`);
    },
  },
};

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    ecCssToHead,
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

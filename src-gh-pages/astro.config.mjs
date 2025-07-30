import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://iamrichardd.github.io',
  base: import.meta.env.MODE === 'production' ? '/claude-code-agents/' : '/',
  outDir: '../docs',
});

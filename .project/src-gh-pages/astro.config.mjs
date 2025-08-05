import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://iamrichardd.github.io/dotagents',
  base: import.meta.env.NODE_ENV === 'development' ? '/' : '/dotagents/',
  outDir: '../../docs',
});

import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://iamrichardd.github.io/dotagents',
  base: import.meta.env.MODE === 'production' ? '/dotagents/' : '/',
  outDir: '../../docs',
});

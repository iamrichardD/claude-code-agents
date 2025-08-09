import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://iamrichardd.github.io/dotagents',
  base: '/dotagents/',
  outDir: process.env.NODE_ENV === 'production' ? './dist' : '../../docs',
  image: {
    // Enable image optimization with Sharp (installed as dependency)
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  },
  vite: {
    // Improve build performance and enable path aliases
    resolve: {
      alias: {
        '@': new URL('./src', import.meta.url).pathname
      }
    }
  }
});

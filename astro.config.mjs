import { defineConfig } from 'astro/config';
// import vercel from '@astrojs/vercel/serverless';
import alpinejs from "@astrojs/alpinejs";

// https://astro.build/config
export default defineConfig({
  integrations: [alpinejs()],
  // output: 'server',
  // adapter: vercel(),
});
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import alpinejs from "@astrojs/alpinejs";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [alpinejs(), tailwind()],
  output: 'server',
  adapter: vercel()
});
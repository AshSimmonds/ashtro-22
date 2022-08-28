import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import alpinejs from "@astrojs/alpinejs";
import preact from "@astrojs/preact";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [alpinejs(), preact(), tailwind()],
  output: 'server',
  adapter: vercel()
});
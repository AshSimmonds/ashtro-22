import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import alpinejs from "@astrojs/alpinejs";
import preact from "@astrojs/preact";
import tailwind from "@astrojs/tailwind";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  integrations: [alpinejs(), preact(), tailwind(), svelte()],
  output: 'server',
  adapter: vercel()
});
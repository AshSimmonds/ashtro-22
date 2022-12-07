import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import alpinejs from "@astrojs/alpinejs";
import preact from "@astrojs/preact";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import vue from "@astrojs/vue";

// https://astro.build/config
import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  integrations: [alpinejs(), preact(), tailwind(), svelte(), vue(), solidJs()],
  output: 'server',
  adapter: vercel()
});
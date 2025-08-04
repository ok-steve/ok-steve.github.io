// @ts-check
import { defineConfig } from 'astro/config';
import pkg from './package.json' with { type: 'json' };

// https://astro.build/config
export default defineConfig({
  site: pkg.author.url,
});

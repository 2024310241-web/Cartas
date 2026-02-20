import { defineConfig } from 'vite'

export default defineConfig({
  base: '/Cartas/', // 👈 nombre EXACTO del repo
  build: {
    outDir: 'docs'
  }
})
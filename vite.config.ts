import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // Mirrors the "@/*" path in tsconfig.app.json. TypeScript resolves types
    // through tsconfig; Vite needs its own copy to resolve at bundle time.
    alias: { '@': path.resolve(import.meta.dirname, './src') },
  },
})

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // Relative asset paths in production, so the same build works from a project URL
  // (https://<user>.github.io/oneoverzero/) and from a custom domain root. Served from / in dev.
  base: command === 'build' ? './' : '/',
}))

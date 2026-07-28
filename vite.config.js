import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves project sites from /<repo>/, so assets need that prefix.
// Override with BASE_PATH=/ when deploying to a custom domain or a user/org site.
export default defineConfig({
  base: process.env.BASE_PATH ?? '/third-plane-site/',
  plugins: [react()],
})

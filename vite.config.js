import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Production lives at the root of www.thirdplane.com, so assets are root-relative.
// Hosts that serve the site from a subpath (GitHub Pages project sites) must build
// with BASE_PATH set to that subpath. See .github/workflows/deploy.yml.
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  plugins: [react()],
})

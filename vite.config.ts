import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Production is www.thirdplane.com on Vercel, served from the root. After the
// client build, `npm run build` renders every page to HTML
// (scripts/prerender.mjs). The single-page bundle (scripts/package.mjs)
// overrides the base with --base ./.
export default defineConfig({
  plugins: [react()],
});

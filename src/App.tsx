import {
  BrowserRouter,
  HashRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { Layout } from "./components/Layout";
import { NotFound } from "./pages/NotFound";
import { Post } from "./pages/Post";
import { pages } from "./routes";

// Served normally, routes are real paths and every page in routes.tsx is prerendered
// to its own HTML file at build time (scripts/prerender.mjs). When the bundle
// runs as a single hosted page (window.__ARTIFACT__, set by scripts/package.mjs)
// there is no server to answer a second path, so routes move into the hash.
//
// Adding a page: add it to `pages` in routes.tsx. Posts are prerendered from
// src/data/posts.ts.
declare global {
  interface Window {
    __ARTIFACT__?: boolean;
  }
}

// On Vercel these are permanent redirects in vercel.json; the routes here
// cover the dev server and the single-page bundle.
export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {pages.map((page) => (
          <Route key={page.path} path={page.path} element={page.element} />
        ))}
        <Route path="resources/:slug" element={<Post />} />
        <Route path="underwriting-desk" element={<Navigate to={{ pathname: "/company", hash: "next" }} replace />} />
        <Route path="alpine" element={<Navigate to="/platform" replace />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

const isBundle = typeof window !== "undefined" && Boolean(window.__ARTIFACT__);

export default function App() {
  if (isBundle) return <HashRouter><AppRoutes /></HashRouter>;
  return <BrowserRouter><AppRoutes /></BrowserRouter>;
}

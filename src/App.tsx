import {
  BrowserRouter,
  HashRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { Layout } from "./components/Layout";
import { Alpine } from "./pages/Alpine";
import { Careers } from "./pages/Careers";
import { Company } from "./pages/Company";
import { Home } from "./pages/Home";
import { PlacementDesk } from "./pages/PlacementDesk";
import { Post } from "./pages/Post";
import { Resources } from "./pages/Resources";
import { Security } from "./pages/Security";
import { UnderwritingDesk } from "./pages/UnderwritingDesk";

// Served normally, routes are real paths under the configured base (root on
// Vercel, /third-plane-site/ on the GitHub Pages mirror). When the bundle
// runs as a single hosted page (window.__ARTIFACT__, set by scripts/package.mjs)
// there is no server to answer a second path, so routes move into the hash.
//
// Adding a page: add the route here and to ROUTES in vite.config.ts, so
// static hosts get an index.html for it.
declare global {
  interface Window {
    __ARTIFACT__?: boolean;
  }
}

const isBundle = typeof window !== "undefined" && Boolean(window.__ARTIFACT__);

export default function App() {
  const routes = (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="placement-desk" element={<PlacementDesk />} />
        <Route path="underwriting-desk" element={<UnderwritingDesk />} />
        <Route path="alpine" element={<Alpine />} />
        <Route path="security" element={<Security />} />
        <Route path="company" element={<Company />} />
        <Route path="careers" element={<Careers />} />
        <Route path="resources" element={<Resources />} />
        <Route path="resources/:slug" element={<Post />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );

  if (isBundle) return <HashRouter>{routes}</HashRouter>;
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>{routes}</BrowserRouter>
  );
}

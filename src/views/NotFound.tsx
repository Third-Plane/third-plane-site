import { PageHero } from "../components/PageHero";
import { Button } from "../components/Ui";

// Built to 404.html, which Vercel serves with a 404 status for any path that
// has no page. All of it is the hero: pages/404.astro puts it in Base's `hero`
// slot, outside <main>.
export function NotFoundHero() {
  return (
    <PageHero
      title={["Page not found."]}
      lead="The page you were looking for has moved or no longer exists."
    >
      <Button href="/" variant="dark">
        Back to the homepage
      </Button>
    </PageHero>
  );
}

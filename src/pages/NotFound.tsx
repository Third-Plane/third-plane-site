import { PageHero } from "../components/PageHero";
import { Button } from "../components/Ui";
import { useTitle } from "../hooks/useTitle";

// Prerendered to 404.html, which Vercel serves with a 404 status for any
// path that has no page.
export function NotFound() {
  useTitle("Page not found", "The page you were looking for has moved or no longer exists.");
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

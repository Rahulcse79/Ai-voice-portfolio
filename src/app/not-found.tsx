import Link from "next/link";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center">
      <Container className="text-center">
        <p className="mb-2 text-sm font-medium text-blue-600 dark:text-blue-400">
          404
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Page not found
        </h1>

        <p className="mx-auto mt-4 max-w-md text-gray-600 dark:text-gray-400">
          Sorry, the page you’re looking for doesn’t exist or may have been
          moved.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Button as={Link} href="/">
            Go home
          </Button>

          <Button as={Link} href="/#projects" variant="outline">
            View projects
          </Button>
        </div>
      </Container>
    </section>
  );
}

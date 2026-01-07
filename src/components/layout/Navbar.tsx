import Container from "@/components/layout/Container";
import ThemeToggle from "@/components/theme/ThemeToggle";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-gray-200 bg-white/80 backdrop-blur dark:border-gray-700 dark:bg-gray-900/80">
      <Container>
        <nav
          className="flex h-16 items-center justify-between"
          aria-label="Primary navigation"
        >
          {/* Brand */}
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            Rahul Singh
          </Link>

          {/* Centered navigation */}
          <div className="flex-1 flex justify-center">
            <div className="flex gap-8">
              <Link
                href="/"
                className="font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/articles"
                className="font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Articles
              </Link>
              <Link
                href="/photos"
                className="font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Photos
              </Link>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Navbar;

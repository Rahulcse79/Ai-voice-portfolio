"use client";

import Container from "@/components/layout/Container";
import ThemeToggle from "@/components/theme/ThemeToggle";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { profile } from "@/data/profile";

const navItems = [
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#opensource", label: "Open Source" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
];

const Navbar = () => {
  const pathname = usePathname();
  const github = profile.socialLinks.find((s) => s.label === "GitHub")?.url;
  const linkedin = profile.socialLinks.find((s) => s.label === "LinkedIn")?.url;

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-white/5 bg-[color:var(--background)]/75 backdrop-blur-xl">
      <Container>
        <nav
          className="flex h-16 items-center justify-between"
          aria-label="Primary navigation"
        >
          {/* Brand monogram */}
          <Link href="/" className="group inline-flex flex-col leading-none">
            <span className="font-serif text-2xl font-bold tracking-tight text-brand-500">
              RS
            </span>
            <span className="mt-0.5 h-[2px] w-6 bg-brand-500 transition-all group-hover:w-full" />
          </Link>

          {/* Center serif-italic navigation */}
          <div className="hidden flex-1 justify-center md:flex">
            <div className="flex items-center gap-9">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="nav-link"
                  data-active={pathname === item.href || undefined}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-4 text-[color:var(--muted)]">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="transition-colors hover:text-brand-500"
              >
                <FaGithub className="h-5 w-5" />
              </a>
            )}
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="transition-colors hover:text-brand-500"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
            )}
            <ThemeToggle />
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Navbar;

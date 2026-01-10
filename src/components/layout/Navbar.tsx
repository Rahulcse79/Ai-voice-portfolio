"use client";

import Container from "@/components/layout/Container";
import ThemeToggle from "@/components/theme/ThemeToggle";
import Link from "next/link";
import { useState } from "react";
import WhatsAppDrawer from "@/components/whatsapp/WhatsAppDrawer";

const Navbar = () => {
  const [waOpen, setWaOpen] = useState(false);

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
            SmartHome Appliances
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
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setWaOpen(true)}
              className="hidden md:inline-flex rounded-md bg-green-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-600"
            >
              WhatsApp
            </button>
            <ThemeToggle />
          </div>
        </nav>
      </Container>

      {/* Render inside header, but drawer itself uses fixed viewport positioning */}
      <WhatsAppDrawer open={waOpen} onClose={() => setWaOpen(false)} />
    </header>
  );
};

export default Navbar;

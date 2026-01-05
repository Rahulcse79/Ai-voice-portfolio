"use client";

import { useTheme } from "@/hooks/useTheme";
import { useMounted } from "@/hooks/useMounted";

const ThemeToggle = () => {
  const mounted = useMounted();
  const { theme, toggleTheme } = useTheme();

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title="Toggle theme"
      className="
        inline-flex h-9 w-9 items-center justify-center
        rounded-lg border border-gray-300
        text-lg transition-colors
        hover:bg-gray-100
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        dark:border-gray-700 dark:hover:bg-gray-800
      "
    >
      <span aria-hidden="true">{isDark ? "🌞" : "🌙"}</span>
    </button>
  );
};

export default ThemeToggle;

"use client";

import { useEffect, useState } from "react";
import { articles } from "@/data/articles";

const ArticlesSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!articles || articles.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % articles.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center py-20">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
        Articles
      </h1>

      <div className="w-full max-w-2xl flex flex-col items-center">
        <article
          key={articles[current].id}
          className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 p-8 shadow-sm hover:shadow-lg transition-shadow duration-500"
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {articles[current].title}
            </h2>

            <span className="text-xs text-gray-500 dark:text-gray-400">
              {new Date(articles[current].date).toLocaleDateString()}
            </span>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {articles[current].summary}
          </p>

          <div className="flex flex-wrap gap-2">
            {articles[current].tags.map((tag) => (
              <span
                key={tag}
                className="inline-block rounded bg-blue-100 dark:bg-blue-900/40 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </article>

        {/* Pagination dots */}
        <div className="flex gap-2 mt-6">
          {articles.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to article ${idx + 1}`}
              className={`h-2 w-6 rounded-full transition-all duration-300 ${
                idx === current ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-700"
              }`}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default ArticlesSection;

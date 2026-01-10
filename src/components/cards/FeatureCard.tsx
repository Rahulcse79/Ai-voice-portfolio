import type { StoreFeature } from "@/types/storeFeature";

interface FeatureCardProps {
  feature: StoreFeature;
}

const FeatureCard = ({ feature }: FeatureCardProps) => {
  return (
    <article
      className="
        rounded-2xl border border-gray-200 bg-white p-6
        transition-all hover:shadow-md
        dark:border-gray-700 dark:bg-gray-900
      "
      aria-label={`Feature: ${feature.title}`}
    >
      <header className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {feature.title}
        </h3>

        <span className="shrink-0 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-200">
          {feature.highlight}
        </span>
      </header>

      <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
        {feature.description}
      </p>
    </article>
  );
};

export default FeatureCard;

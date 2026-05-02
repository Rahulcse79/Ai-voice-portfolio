import type { Metric } from "@/data/profile";

interface MetricsStripProps {
  metrics: Metric[];
  className?: string;
}

const MetricsStrip = ({ metrics, className }: MetricsStripProps) => {
  return (
    <dl
      className={
        "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 " +
        (className ?? "")
      }
      aria-label="Engineering impact metrics"
    >
      {metrics.map((m) => (
        <div
          key={m.label}
          className="
            group rounded-xl border border-gray-200/70 bg-white/60 p-3
            backdrop-blur transition-colors
            hover:border-blue-400/50
            dark:border-gray-700/70 dark:bg-gray-900/40
            dark:hover:border-blue-400/40
          "
        >
          <dt className="font-mono text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {m.value}
          </dt>
          <dd className="mt-1 text-xs text-gray-600 dark:text-gray-400">
            {m.label}
          </dd>
        </div>
      ))}
    </dl>
  );
};

export default MetricsStrip;

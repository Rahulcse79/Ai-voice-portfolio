import type { Achievement } from "@/data/achievements";

interface AchievementCardProps {
  achievement: Achievement;
}

const AchievementCard = ({ achievement }: AchievementCardProps) => {
  const metaParts = [achievement.type, achievement.year ? String(achievement.year) : null]
    .filter(Boolean)
    .join(" • ");

  return (
    <article
      className="
        flex items-start gap-4
        rounded-xl border border-gray-200 bg-white p-4
        transition-all hover:shadow-md
        dark:border-gray-700 dark:bg-gray-900
      "
      aria-label={`Achievement: ${achievement.title}`}
    >
      <span className="text-xl" aria-hidden="true">
        🏆
      </span>

      <div className="space-y-1">
        <h3 className="font-medium text-gray-900 dark:text-white">
          {achievement.title}
        </h3>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          {achievement.issuer}
          {metaParts ? <span className="ml-2">• {metaParts}</span> : null}
        </p>

        {achievement.link ? (
          <a
            href={achievement.link}
            target="_blank"
            rel="noreferrer"
            className="inline-block text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
            aria-label={`Open link for ${achievement.title}`}
          >
            View
          </a>
        ) : null}
      </div>
    </article>
  );
};

export default AchievementCard;

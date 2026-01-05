import type { Achievement } from "@/data/achievements";

interface AchievementCardProps {
  achievement: Achievement;
}

const AchievementCard = ({ achievement }: AchievementCardProps) => {
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
          {achievement.platform}
        </p>
      </div>
    </article>
  );
};

export default AchievementCard;

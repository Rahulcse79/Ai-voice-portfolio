import type { Education } from "@/data/education";

interface EducationCardProps {
  education: Education;
}

const EducationCard = ({ education }: EducationCardProps) => {
  return (
    <article
      className="
        rounded-2xl border border-gray-200 bg-white p-6
        transition-all hover:shadow-md
        dark:border-gray-700 dark:bg-gray-900
      "
      aria-label={`Education: ${education.qualification} at ${education.institution}`}
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {education.qualification}
      </h3>

      <p className="mt-1 text-gray-600 dark:text-gray-300">
        {education.institution}
      </p>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm text-gray-500 dark:text-gray-400">
        <span>{education.score}</span>
        <span>{education.duration}</span>
      </div>
    </article>
  );
};

export default EducationCard;

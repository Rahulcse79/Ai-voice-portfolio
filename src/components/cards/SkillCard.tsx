interface SkillCardProps {
  title: string;
  skills: string[];
}

const SkillCard = ({ title, skills }: SkillCardProps) => {
  return (
    <article
      className="
        rounded-2xl border border-gray-200 bg-white p-6
        transition-all hover:shadow-md
        dark:border-gray-700 dark:bg-gray-900
      "
      aria-label={`Skills: ${title}`}
    >
      <h4 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h4>

      <ul className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <li
            key={skill}
            className="
              rounded-lg bg-blue-50 px-3 py-1 text-sm text-blue-700
              dark:bg-blue-900/30 dark:text-blue-300
            "
          >
            {skill}
          </li>
        ))}
      </ul>
    </article>
  );
};

export default SkillCard;

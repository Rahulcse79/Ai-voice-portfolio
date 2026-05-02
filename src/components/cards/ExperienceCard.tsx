import type { Experience } from "@/data/experience";

interface ExperienceCardProps {
  experience: Experience;
  isLast?: boolean;
}

const ExperienceCard = ({ experience, isLast }: ExperienceCardProps) => {
  return (
    <li className="relative pl-8 sm:pl-10">
      {/* timeline line */}
      {!isLast && (
        <span
          aria-hidden="true"
          className="absolute left-[5px] top-3 h-full w-px bg-gradient-to-b from-brand-500/60 via-brand-500/20 to-transparent"
        />
      )}
      {/* dot */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-2 h-3 w-3 rounded-full bg-brand-500 shadow-[0_0_0_4px_rgba(236,72,153,0.15)]"
      />

      <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-500">
        {experience.duration}
      </p>
      <h3 className="mt-2 font-serif text-2xl font-bold tracking-tight text-foreground">
        {experience.role}
      </h3>
      <p className="mt-1 text-sm text-[color:var(--muted)]">
        <span className="font-medium text-foreground">{experience.company}</span>
        {experience.location && (
          <>
            <span className="mx-1.5 text-[color:var(--muted)]">·</span>
            <span>{experience.location}</span>
          </>
        )}
      </p>

      {experience.techStack && experience.techStack.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {experience.techStack.map((tech) => (
            <li key={tech} className="pill text-[11px]">
              {tech}
            </li>
          ))}
        </ul>
      )}

      <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-[color:var(--muted)]">
        {experience.responsibilities.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className="mt-2 inline-block h-1.5 w-1.5 flex-none rounded-full bg-brand-500"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {!isLast && <div className="h-10" />}
    </li>
  );
};

export default ExperienceCard;

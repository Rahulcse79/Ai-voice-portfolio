interface SectionTitleProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  align?: "left" | "center";
  className?: string;
}

const SectionTitle = ({
  title,
  subtitle,
  eyebrow,
  align = "left",
  className,
}: SectionTitleProps) => {
  const alignment =
    align === "center" ? "text-center items-center" : "text-left";

  return (
    <header className={`mb-12 ${alignment} ${className ?? ""}`}>
      {eyebrow && (
        <p className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-500">
          {eyebrow}
        </p>
      )}
      <h2 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-4 max-w-2xl text-base text-[color:var(--muted)] sm:text-lg">
          {subtitle}
        </p>
      )}
    </header>
  );
};

export default SectionTitle;

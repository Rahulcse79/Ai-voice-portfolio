interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

const SectionTitle = ({
  title,
  subtitle,
  align = "left",
  className,
}: SectionTitleProps) => {
  const alignment =
    align === "center" ? "text-center items-center" : "text-left";

  return (
    <header
      className={`mb-10 ${alignment} text-black dark:text-white ${className ?? ""}`}
    >
      <h2 className="text-3xl font-bold tracking-tight">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-2 max-w-2xl">{subtitle}</p>
      )}
    </header>
  );
};

export default SectionTitle;

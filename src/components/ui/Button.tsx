import * as React from "react";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "outline";
type Size = "sm" | "md" | "lg";

type ButtonOwnProps = {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  className?: string;
};

type PolymorphicButtonProps<C extends React.ElementType> = ButtonOwnProps & {
  as?: C;
} & Omit<React.ComponentPropsWithoutRef<C>, keyof ButtonOwnProps | "as">;

const Button = <C extends React.ElementType = "button">({
  as,
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  className,
  children,
  ...props
}: PolymorphicButtonProps<C>) => {
  const Component = as || "button";

  const baseStyles =
    "inline-flex items-center justify-center gap-1.5 rounded-full font-medium transition-all " +
    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:pointer-events-none";

  const sizes: Record<Size, string> = {
    sm: "px-4 py-1.5 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3 text-base",
  };

  const variants: Record<Variant, string> = {
    primary:
      "bg-brand-500 text-white hover:bg-brand-600 focus:ring-brand-400 shadow-brand-soft hover:shadow-brand-glow",
    secondary:
      "bg-ink-800 text-white hover:bg-ink-700 focus:ring-ink-600 border border-white/10 dark:bg-ink-800",
    outline:
      "border border-white/15 text-foreground hover:border-brand-400 hover:text-brand-400 focus:ring-brand-400 bg-transparent",
  };

  return (
    <Component
      className={clsx(baseStyles, sizes[size], variants[variant], className)}
      disabled={Component === "button" ? disabled || loading : undefined}
      aria-busy={loading}
      {...props}
    >
      {loading ? "Loading..." : children}
    </Component>
  );
};

export default Button;

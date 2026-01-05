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
    "inline-flex items-center justify-center rounded-lg font-medium transition-colors " +
    "focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const sizes: Record<Size, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const variants: Record<Variant, string> = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary:
      "bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-700 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200",
    outline:
      "border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-400 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800",
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

import * as React from "react";
import clsx from "clsx";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

const Container: React.FC<ContainerProps> = ({
  children,
  className,
  as: Component = "div",
}) => {
  return (
    <Component
      className={clsx(
        "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8",
        className
      )}
    >
      {children}
    </Component>
  );
};

export default Container;

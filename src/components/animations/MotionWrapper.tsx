"use client";

import * as React from "react";
import { motion, type MotionProps } from "framer-motion";
import clsx from "clsx";

type MotionTag = "div" | "section" | "article" | "ul" | "li";

interface MotionWrapperProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  as?: MotionTag;
}

const MotionWrapper = ({
  children,
  className,
  as = "div",
  initial = { opacity: 0, y: 16 },
  whileInView = { opacity: 1, y: 0 },
  transition = { duration: 0.5, ease: "easeOut" },
  viewport = { once: true, margin: "-80px" },
  ...motionProps
}: MotionWrapperProps) => {
  const Component =
    as === "section"
      ? motion.section
      : as === "article"
      ? motion.article
      : as === "ul"
      ? motion.ul
      : as === "li"
      ? motion.li
      : motion.div;

  return (
    <Component
      initial={initial}
      whileInView={whileInView}
      transition={transition}
      viewport={viewport}
      className={clsx(className)}
      {...motionProps}
    >
      {children}
    </Component>
  );
};

export default MotionWrapper;

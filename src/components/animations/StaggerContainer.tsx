"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";
import clsx from "clsx";

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
}

const StaggerContainer = ({
  children,
  className,
  stagger = 0.12,
  delayChildren = 0,
}: StaggerContainerProps) => {
  const variants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: stagger,
        delayChildren,
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className={clsx(className)}
    >
      {children}
    </motion.div>
  );
};

export default StaggerContainer;

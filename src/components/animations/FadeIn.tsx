"use client";

import { motion, type MotionProps } from "framer-motion";
import clsx from "clsx";

interface FadeInProps extends MotionProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
}

const FadeIn = ({
  children,
  delay = 0,
  duration = 0.4,
  y = 12,
  className,
  ...motionProps
}: FadeInProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      className={clsx(className)}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;

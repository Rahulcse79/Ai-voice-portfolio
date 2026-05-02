"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface RoleRotatorProps {
  roles: string[];
  intervalMs?: number;
  className?: string;
}

const RoleRotator = ({
  roles,
  intervalMs = 2600,
  className,
}: RoleRotatorProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (roles.length <= 1) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % roles.length),
      intervalMs
    );
    return () => window.clearInterval(id);
  }, [roles.length, intervalMs]);

  return (
    <span
      className={className}
      aria-live="polite"
      aria-atomic="true"
      style={{ display: "inline-flex", minHeight: "1.5em" }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[index]}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

export default RoleRotator;

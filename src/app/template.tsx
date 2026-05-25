"use client";

import { motion } from "framer-motion";

// App Router template: re-mounts on every navigation, so this gives every
// route change a smooth fade-up enter. Subtle on purpose — heavier
// transitions fight the hero's own word-by-word reveal.

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

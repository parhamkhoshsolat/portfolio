"use client";

import { MotionConfig } from "framer-motion";

// Honour the visitor's "reduce motion" system setting for every framer-motion animation.
export function MotionPreference({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

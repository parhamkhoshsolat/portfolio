"use client";

import { motion, type MotionProps } from "framer-motion";
import { type ReactNode } from "react";

type FadeInProps = MotionProps & {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article" | "li";
};

export function FadeIn({
  children,
  delay = 0,
  className,
  as = "div",
  ...rest
}: FadeInProps) {
  const MotionComp = motion[as];
  return (
    <MotionComp
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className={className}
      {...rest}
    >
      {children}
    </MotionComp>
  );
}

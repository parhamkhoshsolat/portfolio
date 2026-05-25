import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "outline" | "accent";
};

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const styles = {
    default: "bg-card text-muted border border-border",
    outline: "border border-border text-text",
    accent: "bg-accent-soft text-accent border border-accent/30",
  }[variant];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium",
        styles,
        className
      )}
      {...props}
    />
  );
}

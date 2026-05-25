"use client";

import { useEffect, useRef } from "react";

// A radial gradient that follows the cursor. CSS variable trick keeps
// React out of the per-frame path so it stays buttery on a 4-year-old laptop.
// Disabled on coarse pointers (touch devices) where it does nothing useful.

export function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef<number | null>(null);
  const last = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const apply = () => {
      raf.current = null;
      const el = ref.current;
      const pt = last.current;
      if (!el || !pt) return;
      el.style.setProperty("--mx", `${pt.x}px`);
      el.style.setProperty("--my", `${pt.y}px`);
    };

    const onMove = (e: MouseEvent) => {
      last.current = { x: e.clientX, y: e.clientY };
      if (raf.current == null) {
        raf.current = window.requestAnimationFrame(apply);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf.current != null) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 opacity-70 mix-blend-screen"
      style={{
        background:
          "radial-gradient(540px circle at var(--mx, 50%) var(--my, 50%), rgba(56, 189, 248, 0.08), transparent 45%)",
      }}
    />
  );
}

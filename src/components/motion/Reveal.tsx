"use client";

import { m, type Variants } from "framer-motion";
import type { ReactNode } from "react";

// Expensive, not flashy: short travel, long ease-out. Reduced motion is handled by MotionConfig.
const ease = [0.22, 1, 0.36, 1] as const;
const viewport = { once: true, margin: "-80px" } as const;

type BaseProps = { children: ReactNode; className?: string };

/** Fade-up on entering the viewport. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
}: BaseProps & { delay?: number; y?: number }) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </m.div>
  );
}

/** Image reveal: the frame opens top to bottom as it enters the viewport. */
export function RevealImage({
  children,
  className,
  delay = 0,
}: BaseProps & { delay?: number }) {
  // The observed wrapper is never clipped (a fully clipped element can fail to register as in view);
  // the clip is animated on an inner element via variant propagation.
  return (
    <m.div className={className} initial="hidden" whileInView="show" viewport={viewport}>
      <m.div
        variants={{
          hidden: { clipPath: "inset(0 0 100% 0)" },
          show: { clipPath: "inset(0 0 0% 0)", transition: { duration: 1.1, ease, delay } },
        }}
      >
        {children}
      </m.div>
    </m.div>
  );
}

const container = (stagger: number, delay: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

/** Staggered entrance for a group of <StaggerItem>s. */
export function Stagger({
  children,
  className,
  stagger = 0.09,
  delay = 0,
}: BaseProps & { stagger?: number; delay?: number }) {
  return (
    <m.div
      className={className}
      variants={container(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
    >
      {children}
    </m.div>
  );
}

export function StaggerItem({ children, className }: BaseProps) {
  return (
    <m.div className={className} variants={item}>
      {children}
    </m.div>
  );
}

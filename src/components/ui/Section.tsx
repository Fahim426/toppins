import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const tones = {
  cream: "",
  warm: "bg-warm-white",
  sand: "bg-sand",
  dark: "dark-surface bg-espresso text-cream",
} as const;

type Props = {
  id?: string;
  /** id of the heading that names this section */
  labelledBy?: string;
  tone?: keyof typeof tones;
  className?: string;
  children: ReactNode;
};

export function Section({ id, labelledBy, tone = "cream", className, children }: Props) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("relative py-20 sm:py-24 lg:py-36", tones[tone], className)}
    >
      {children}
    </section>
  );
}

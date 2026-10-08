import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  id?: string;
  title: string;
  /** Compact uppercase label above the title, e.g. "The menu" */
  eyebrow?: string;
  /** Optional editorial index, e.g. "02" */
  number?: string;
  description?: ReactNode;
  as?: "h1" | "h2" | "h3";
  align?: "left" | "center";
  /** "dark" for espresso / photo backgrounds, "sand" for sand backgrounds (caramel text fails contrast there) */
  tone?: "light" | "dark" | "sand";
  className?: string;
};

export function SectionHeading({
  id,
  title,
  eyebrow,
  number,
  description,
  as: Tag = "h2",
  align = "left",
  tone = "light",
  className,
}: Props) {
  const dark = tone === "dark";
  const centered = align === "center";

  return (
    <div className={cn("max-w-3xl", centered && "mx-auto text-center", className)}>
      {(eyebrow || number) && (
        <p
          className={cn(
            "type-label mb-5 flex items-center gap-3",
            centered && "justify-center",
            dark ? "text-butter" : tone === "sand" ? "text-espresso/80" : "text-caramel-text",
          )}
        >
          {number && <span>{number}</span>}
          {number && eyebrow && (
            <span aria-hidden="true" className="h-px w-8 bg-current opacity-60" />
          )}
          {eyebrow && <span>{eyebrow}</span>}
        </p>
      )}
      <Tag id={id} className={cn("type-display-l", dark ? "text-cream" : "text-espresso")}>{title}</Tag>
      {description && (
        <p
          className={cn(
            "type-body-l mt-5 max-w-[56ch]",
            centered && "mx-auto",
            dark ? "text-cream/80" : "text-espresso/75",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

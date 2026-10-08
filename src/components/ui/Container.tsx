import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/cn";

type Props<T extends ElementType> = {
  as?: T;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

/** Controlled max-width with responsive gutters. Large desktop whitespace is intentional. */
export function Container<T extends ElementType = "div">({
  as,
  className,
  ...rest
}: Props<T>) {
  const Tag: ElementType = as ?? "div";
  return (
    <Tag
      className={cn("mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-12", className)}
      {...rest}
    />
  );
}

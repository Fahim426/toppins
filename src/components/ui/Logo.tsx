import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Text wordmark used until the real logo arrives.
 * TODO(owner): supply logo files (see ASSETS_NEEDED.md), then swap this for next/image.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("inline-flex flex-col leading-none", className)}
    >
      <span className="font-display text-[1.65rem] tracking-[-0.01em]">Toppins</span>
      <span className="type-label mt-1 text-[0.625rem] tracking-[0.22em]">
        Bake &amp; Cafe
      </span>
      <span className="sr-only">, home</span>
    </Link>
  );
}

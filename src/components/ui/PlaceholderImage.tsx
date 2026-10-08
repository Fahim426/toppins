import Image from "next/image";
import { images, productImageSpec, type ImageId } from "@/data/images";
import { cn } from "@/lib/cn";

const isDev = process.env.NODE_ENV !== "production";

type SlotProps = { slot: ImageId };
type FileProps = {
  /** Path under /public, or null while the photo is missing */
  src: string | null;
  width?: number;
  height?: number;
  alt: string;
};

type Common = {
  /** Responsive `sizes` attribute: required for real images to load the right file */
  sizes?: string;
  priority?: boolean;
  /** "dark" placeholder is used where text sits on top (hero) */
  tone?: "light" | "dark";
  className?: string;
  imgClassName?: string;
  /** Override the registry alt text */
  alt?: string;
};

export type PlaceholderImageProps = Common & (SlotProps | FileProps);

/**
 * Renders the real photo when it exists, otherwise a warm tinted block at the
 * correct aspect ratio. In development the block is labelled with the path to replace.
 */
export function PlaceholderImage(props: PlaceholderImageProps) {
  const { sizes = "100vw", priority, tone = "light", className, imgClassName } = props;

  let path: string | null;
  let ratio: [number, number];
  let width: number;
  let height: number;
  let alt: string;
  let decorative = false;
  let available: boolean;

  if ("slot" in props) {
    const s = images[props.slot];
    path = s.path;
    ratio = s.ratio;
    width = s.width;
    height = s.height;
    alt = props.alt ?? s.alt;
    decorative = s.decorative ?? false;
    available = s.available;
  } else {
    path = props.src;
    width = props.width ?? productImageSpec.width;
    height = props.height ?? productImageSpec.height;
    ratio = [width, height];
    alt = props.alt;
    available = props.src !== null;
  }

  const frame = cn("relative overflow-hidden rounded-lg", className);
  const style = { aspectRatio: `${ratio[0]} / ${ratio[1]}` };

  if (available && path) {
    return (
      <div className={frame} style={style}>
        <Image
          src={path}
          width={width}
          height={height}
          sizes={sizes}
          priority={priority}
          alt={decorative ? "" : alt}
          className={cn("h-full w-full object-cover", imgClassName)}
        />
      </div>
    );
  }

  const dark = tone === "dark";
  return (
    <div
      className={cn(
        frame,
        "border",
        dark ? "border-cream/15 bg-[#3b2e28]" : "border-caramel/25 bg-sand",
      )}
      style={style}
      aria-hidden="true"
    >
      {isDev && (
        <div
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-center gap-1 p-3 text-center font-mono text-[0.6875rem] leading-snug",
            dark ? "text-cream/70" : "text-espresso/70",
          )}
        >
          <span className="font-bold">{path ?? "no image path"}</span>
          <span>
            {ratio[0]}:{ratio[1]} · {width}×{height}px
          </span>
        </div>
      )}
    </div>
  );
}

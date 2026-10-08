import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "@/components/ui/Icon";

export type ButtonVariant =
  | "primary" // espresso fill (on light surfaces)
  | "secondary" // espresso outline (on light surfaces)
  | "inverse" // cream fill (on dark surfaces / over photos)
  | "outline-inverse" // cream outline (on dark surfaces / over photos)
  | "link";
export type ButtonSize = "sm" | "md" | "lg";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-espresso text-cream border border-espresso hover:bg-charcoal hover:border-charcoal",
  secondary:
    "bg-transparent text-espresso border border-espresso hover:bg-espresso hover:text-cream",
  inverse:
    "bg-cream text-espresso border border-cream hover:bg-sand hover:border-sand",
  "outline-inverse":
    "bg-transparent text-cream border border-cream/70 hover:bg-cream hover:text-espresso hover:border-cream",
  link: "text-caramel-text underline decoration-caramel-text/40 underline-offset-4 hover:decoration-caramel-text min-h-0 px-0",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-10 px-4 text-[0.8125rem]",
  md: "min-h-12 px-6 text-sm",
  lg: "min-h-14 px-8 text-base",
};

type Common = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconName;
  /** Trailing arrow that nudges on hover */
  arrow?: boolean;
  className?: string;
  children: ReactNode;
};

type AsLink = Common & { href: string } & Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "href" | "className" | "children"
  >;
type AsButton = Common & { href?: undefined } & Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "className" | "children"
  >;

export type ButtonProps = AsLink | AsButton;

export function buttonClasses(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string,
) {
  return cn(
    "group inline-flex items-center justify-center gap-2 rounded-md font-bold tracking-[0.02em] whitespace-nowrap transition-colors duration-200",
    variants[variant],
    variant !== "link" && sizes[size],
    className,
  );
}

export function Button(props: ButtonProps) {
  const { variant, size, icon, arrow, className, children } = props;
  const classes = buttonClasses(variant, size, className);

  const inner = (
    <>
      {icon && <Icon name={icon} size={size === "sm" ? 16 : 18} />}
      {children}
      {arrow && (
        <Icon
          name="arrow"
          size={16}
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        />
      )}
    </>
  );

  if (props.href !== undefined) {
    const {
      href,
      variant: _v,
      size: _s,
      icon: _i,
      arrow: _a,
      className: _c,
      children: _ch,
      ...rest
    } = props;
    void [_v, _s, _i, _a, _c, _ch];

    // Internal route: next/link
    if (href.startsWith("/")) {
      return (
        <Link href={href} className={classes} {...rest}>
          {inner}
        </Link>
      );
    }

    const isWeb = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        className={classes}
        {...(isWeb ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {inner}
        {isWeb && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    );
  }

  const {
    variant: _v,
    size: _s,
    icon: _i,
    arrow: _a,
    className: _c,
    children: _ch,
    type,
    ...rest
  } = props;
  void [_v, _s, _i, _a, _c, _ch];
  return (
    <button type={type ?? "button"} className={classes} {...rest}>
      {inner}
    </button>
  );
}

import type { SVGProps } from "react";

export type IconName =
  | "whatsapp"
  | "phone"
  | "pin"
  | "arrow"
  | "check"
  | "menu"
  | "close"
  | "list"
  | "instagram"
  | "facebook";

type Props = Omit<SVGProps<SVGSVGElement>, "name"> & { name: IconName; size?: number };

const WHATSAPP_PATH =
  "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z";

const FACEBOOK_PATH =
  "M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1z";

/** Decorative inline icons. Always aria-hidden: label the parent control instead. */
export function Icon({ name, size = 20, ...rest }: Props) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    "aria-hidden": true,
    focusable: false,
    ...rest,
  } as const;

  const stroke = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  } as const;

  switch (name) {
    case "whatsapp":
      return (
        <svg {...common} fill="currentColor">
          <path d={WHATSAPP_PATH} />
        </svg>
      );
    case "facebook":
      return (
        <svg {...common} fill="currentColor">
          <path d={FACEBOOK_PATH} />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common} {...stroke}>
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.2" cy="6.8" r=".6" fill="currentColor" />
        </svg>
      );
    case "phone":
      return (
        <svg {...common} {...stroke}>
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      );
    case "pin":
      return (
        <svg {...common} {...stroke}>
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...common} {...stroke}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );
    case "check":
      return (
        <svg {...common} {...stroke}>
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
      );
    case "menu":
      return (
        <svg {...common} {...stroke}>
          <path d="M4 8h16M4 16h16" />
        </svg>
      );
    case "close":
      return (
        <svg {...common} {...stroke}>
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      );
    case "list":
      return (
        <svg {...common} {...stroke}>
          <path d="M9 6h11M9 12h11M9 18h11" />
          <circle cx="4.5" cy="6" r=".8" fill="currentColor" />
          <circle cx="4.5" cy="12" r=".8" fill="currentColor" />
          <circle cx="4.5" cy="18" r=".8" fill="currentColor" />
        </svg>
      );
  }
}

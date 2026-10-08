import Link from "next/link";
import { Icon, type IconName } from "@/components/ui/Icon";
import { site } from "@/data/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

type Action = {
  label: string;
  href: string;
  icon: IconName;
  external?: boolean;
  highlight?: boolean;
};

const actions: Action[] = [
  { label: "Menu", href: "/menu", icon: "list" },
  {
    label: "WhatsApp",
    href: buildWhatsAppUrl({ intent: "order" }),
    icon: "whatsapp",
    external: true,
    highlight: true,
  },
  { label: "Call", href: site.phone.tel, icon: "phone" },
  { label: "Directions", href: site.googleMapsUrl, icon: "pin", external: true },
];

/** Sticky bottom action bar, mobile only. Layout reserves space for it (see Footer). */
export function MobileActionBar() {
  return (
    <nav
      aria-label="Quick actions"
      data-menu-inert
      className="dark-surface fixed inset-x-0 bottom-0 z-40 border-t border-cream/15 bg-espresso pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <ul className="grid grid-cols-4">
        {actions.map((a) => {
          const classes = cn(
            "type-label flex h-16 flex-col items-center justify-center gap-1.5 text-[0.6875rem] text-cream",
            a.highlight ? "bg-caramel-text" : "hover:bg-charcoal",
          );
          const content = (
            <>
              <Icon name={a.icon} size={20} />
              <span>{a.label}</span>
            </>
          );
          return (
            <li key={a.label}>
              {a.href.startsWith("/") ? (
                <Link href={a.href} className={classes}>
                  {content}
                </Link>
              ) : (
                <a
                  href={a.href}
                  className={classes}
                  {...(a.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {content}
                  {a.external && <span className="sr-only"> (opens in a new tab)</span>}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

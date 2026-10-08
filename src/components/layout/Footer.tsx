import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { navLinks } from "@/data/nav";
import { site } from "@/data/site";
import { getHoursLabel } from "@/lib/hours";

const social = [
  { label: "Toppins on Instagram", href: site.instagram, icon: "instagram" },
  { label: "Toppins on Facebook", href: site.facebook, icon: "facebook" },
] as const;

const linkClass = "underline-offset-4 hover:text-butter hover:underline";

export function Footer() {
  return (
    // bottom padding leaves room for the sticky mobile action bar
    <footer className="dark-surface bg-espresso pt-16 pb-24 text-cream md:pb-10 lg:pt-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Logo />
            <p className="type-display-m mt-6 max-w-[16ch] text-cream">
              {site.tagline}.
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2">
            <h2 className="type-label mb-5 text-butter">Explore</h2>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-5">
            <h2 className="type-label mb-5 text-butter">Visit</h2>
            <address className="space-y-3 not-italic">
              <p>
                {site.name}
                <br />
                {site.address.full}
              </p>
              <p>
                <a href={site.phone.tel} className={linkClass}>
                  {site.phone.display}
                </a>
              </p>
              <p>{getHoursLabel()}</p>
            </address>

            <ul className="mt-6 flex gap-3">
              {social.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.label} (opens in a new tab)`}
                    className="inline-flex size-11 items-center justify-center rounded-md border border-cream/25 transition-colors hover:border-butter hover:text-butter"
                  >
                    <Icon name={s.icon} size={20} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="type-small mt-14 border-t border-cream/15 pt-6 text-cream/70">
          © {new Date().getFullYear()} {site.name}
        </p>
      </Container>
    </footer>
  );
}

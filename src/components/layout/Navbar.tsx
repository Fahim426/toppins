"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { navLinks } from "@/data/nav";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function subscribeScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}
const getScrolled = () => window.scrollY > 24;
const getServerScrolled = () => false;

/**
 * Transparent over the hero on Home, solid cream once scrolled (and always on other pages).
 * The Home hero must therefore provide a dark scrim behind the header.
 */
export function Navbar() {
  const pathname = usePathname();
  const scrolled = useSyncExternalStore(subscribeScroll, getScrolled, getServerScrolled);
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const overHero = pathname === "/" && !scrolled && !open;
  const dark = overHero || open;

  useEffect(() => {
    if (!open) return;

    const closeAndRestoreFocus = () => {
      setOpen(false);
      toggleRef.current?.focus();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeAndRestoreFocus();
        return;
      }
      if (event.key !== "Tab" || !headerRef.current) return;

      // Focus trap across the header controls and the open panel
      const focusable = Array.from(
        headerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => el.getClientRects().length > 0);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const desktop = window.matchMedia("(min-width: 1024px)");
    const onBreakpoint = () => {
      if (desktop.matches) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Take the page behind the open menu out of the tab order and the accessibility tree
    const background = document.querySelectorAll<HTMLElement>("[data-menu-inert]");
    background.forEach((el) => {
      el.inert = true;
    });
    panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
      document.body.style.overflow = previousOverflow;
      background.forEach((el) => {
        el.inert = false;
      });
    };
  }, [open]);

  const isActive = (href: string) => !href.includes("#") && pathname === href;

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        dark
          ? "dark-surface text-cream"
          : "border-sand bg-cream text-espresso",
        open ? "border-cream/10 bg-espresso" : dark && "border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-[var(--header-h)] items-center justify-between gap-3">
        {/* Mobile: hamburger */}
        <button
          ref={toggleRef}
          type="button"
          className="-ml-2 inline-flex size-11 items-center justify-center rounded-md lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? "close" : "menu"} size={26} />
        </button>

        <Logo />

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={cn(
                    "py-2 text-sm font-semibold tracking-[0.02em] underline-offset-[10px] hover:underline",
                    isActive(link.href) && "underline",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden lg:block">
            <Button
              href={site.googleMapsUrl}
              variant={dark ? "outline-inverse" : "secondary"}
              size="sm"
              icon="pin"
            >
              Get Directions
            </Button>
          </div>
          <WhatsAppButton
            request={{ intent: "order" }}
            variant={dark ? "inverse" : "primary"}
            size="sm"
            shortLabel="Order"
          />
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <m.div
            ref={panelRef}
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed inset-x-0 top-[var(--header-h)] bottom-0 overflow-y-auto bg-espresso lg:hidden"
          >
            <Container className="flex min-h-full flex-col justify-between gap-10 pt-8 pb-10">
              <nav aria-label="Mobile">
                <ul className="divide-y divide-cream/15 border-y border-cream/15">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        aria-current={isActive(link.href) ? "page" : undefined}
                        className="flex items-center justify-between py-5 font-display text-4xl"
                      >
                        {link.label}
                        <Icon name="arrow" size={22} className="text-butter" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="flex flex-col gap-3">
                <Button
                  href={site.googleMapsUrl}
                  variant="outline-inverse"
                  icon="pin"
                  onClick={() => setOpen(false)}
                >
                  Get Directions
                </Button>
                <Button href={site.phone.tel} variant="outline-inverse" icon="phone">
                  Call {site.phone.display}
                </Button>
              </div>
            </Container>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}

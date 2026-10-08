import type { Metadata, Viewport } from "next";
import { DM_Serif_Display, Manrope, Noto_Sans_Malayalam } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { Navbar } from "@/components/layout/Navbar";
import { MotionProvider } from "@/components/MotionProvider";
import "./globals.css";

const display = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

// Fallback for Malayalam glyphs only; not preloaded so it never blocks English pages.
const malayalam = Noto_Sans_Malayalam({
  subsets: ["malayalam"],
  variable: "--font-malayalam",
  display: "swap",
  preload: false,
});

// Full SEO / Open Graph / JSON-LD lands in Phase 4.
export const metadata: Metadata = {
  title: "Toppins Bake & Cafe | Bakery, Cakes & Cafe in Perumbadappu",
  description:
    "Discover Toppins Bake & Cafe in Perumbadappu, Kerala — cakes, bakery favourites, cafe bites, desserts and more. Explore the menu, visit us or order on WhatsApp.",
};

export const viewport: Viewport = {
  themeColor: "#F7F2EA",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${malayalam.variable}`}
    >
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only rounded-md bg-espresso px-4 py-3 text-sm font-bold text-cream focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100]"
        >
          Skip to content
        </a>
        <MotionProvider>
          <Navbar />
          <main id="main" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <Footer />
          <MobileActionBar />
        </MotionProvider>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { DM_Serif_Display, Manrope, Noto_Sans_Malayalam } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { Navbar } from "@/components/layout/Navbar";
import { MotionProvider } from "@/components/MotionProvider";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/data/site";
import { buildBakeryJsonLd } from "@/lib/jsonld";
import { defaultDescription, defaultTitle, siteUrl } from "@/lib/seo";
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

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: defaultTitle, template: `%s | ${site.name}` },
  description: defaultDescription,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
    title: defaultTitle,
    description: defaultDescription,
    url: "/",
  },
  twitter: { card: "summary_large_image", title: defaultTitle, description: defaultDescription },
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
          data-menu-inert
          className="sr-only rounded-md bg-espresso px-4 py-3 text-sm font-bold text-cream focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100]"
        >
          Skip to content
        </a>
        <JsonLd data={buildBakeryJsonLd()} />
        <MotionProvider>
          <Navbar />
          <main id="main" data-menu-inert tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <Footer />
          <MobileActionBar />
        </MotionProvider>
      </body>
    </html>
  );
}

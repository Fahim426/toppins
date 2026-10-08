import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { LocationSection } from "@/components/sections/LocationSection";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Find Toppins Bake & Cafe in Perumbadappu, Kerala. Get directions, call or message us on WhatsApp.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="pt-header">
      <LocationSection page />
    </div>
  );
}

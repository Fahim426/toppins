import type { Metadata } from "next";
import { LocationSection } from "@/components/sections/LocationSection";

export const metadata: Metadata = {
  title: "Contact | Toppins Bake & Cafe",
  description:
    "Find Toppins Bake & Cafe in Perumbadappu, Kerala. Get directions, call or message us on WhatsApp.",
};

export default function ContactPage() {
  return (
    <div className="pt-header">
      <LocationSection page />
    </div>
  );
}

import type { Metadata } from "next";
import { BrandIntro } from "@/components/sections/BrandIntro";
import { CakeSection } from "@/components/sections/CakeSection";
import { Experience } from "@/components/sections/Experience";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { Hero } from "@/components/sections/Hero";
import { LocationSection } from "@/components/sections/LocationSection";
import { MenuPreview } from "@/components/sections/MenuPreview";
import { Reviews } from "@/components/sections/Reviews";
import { Signature } from "@/components/sections/Signature";
import { defaultDescription, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  description: defaultDescription,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandIntro />
      <Signature />
      <MenuPreview />
      <CakeSection />
      <Experience />
      <Reviews />
      <GalleryGrid />
      <LocationSection />
    </>
  );
}

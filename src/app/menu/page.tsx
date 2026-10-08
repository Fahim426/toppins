import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { MenuEmpty } from "@/components/ui/MenuEmpty";
import { MenuFilter } from "@/components/ui/MenuFilter";
import { PageHeader } from "@/components/ui/PageHeader";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { pageMetadata } from "@/lib/seo";
import { getVisibleCategories, getVisibleItems } from "@/lib/menu";

export const metadata: Metadata = pageMetadata({
  title: "Menu",
  description: "Browse the Toppins Bake & Cafe menu by category and order any item on WhatsApp.",
  path: "/menu",
});

export default function MenuPage() {
  const items = getVisibleItems();
  const categories = getVisibleCategories();

  return (
    <>
      <PageHeader
        eyebrow="Toppins Bake & Cafe"
        title="The menu."
        description={items.length > 0 ? "Pick a category. Order any item on WhatsApp." : "Order on WhatsApp."}
      />
      <Container className="pb-24 lg:pb-36">
        {items.length > 0 ? (
          <MenuFilter items={items} categories={categories} syncUrl headingAs="h2" />
        ) : (
          <MenuEmpty />
        )}

        {items.length > 0 && (
          <div className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-espresso/20 pt-10 sm:flex-row sm:items-center">
            <p className="type-display-m max-w-[22ch]">Ask for today&apos;s availability and prices.</p>
            <WhatsAppButton request={{ intent: "order" }} size="lg" />
          </div>
        )}
      </Container>
    </>
  );
}

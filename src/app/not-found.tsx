import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <div className="pt-header">
      <Container className="py-24 lg:py-40">
        <SectionHeading
          as="h1"
          eyebrow="Error 404"
          title="That page isn't here."
          description="Head back to the start, browse the menu, or message us on WhatsApp."
        />
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href="/" size="lg" arrow>
            Back to home
          </Button>
          <Button href="/menu" variant="secondary" size="lg">
            View Menu
          </Button>
          <WhatsAppButton request={{ intent: "order" }} variant="secondary" size="lg" />
        </div>
      </Container>
    </div>
  );
}

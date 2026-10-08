import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Props = {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  children?: ReactNode;
};

/** Top of an inner page. Clears the fixed header and carries the page's only H1. */
export function PageHeader({ eyebrow, title, description, children }: Props) {
  return (
    <header className="pt-header">
      <Container className="pt-14 pb-12 lg:pt-24 lg:pb-16">
        <SectionHeading as="h1" eyebrow={eyebrow} title={title} description={description} />
        {children}
      </Container>
    </header>
  );
}

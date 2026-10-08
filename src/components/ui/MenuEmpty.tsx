import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

/** Shown when no menu items are confirmed yet (production, placeholders off). */
export function MenuEmpty() {
  return (
    <div className="border-y border-espresso/20 py-14 text-center">
      <p className="type-display-m">The full menu is coming soon.</p>
      <p className="type-body-l mx-auto mt-3 max-w-[40ch] text-espresso/75">
        Ask us what is available today on WhatsApp.
      </p>
      <div className="mt-8 flex justify-center">
        <WhatsAppButton request={{ intent: "order" }} />
      </div>
    </div>
  );
}

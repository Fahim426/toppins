import { site } from "@/data/site";

export type WhatsAppIntent =
  | { intent: "order" }
  | { intent: "cake" }
  | { intent: "item"; item: string };

export function whatsAppMessage(input: WhatsAppIntent): string {
  switch (input.intent) {
    case "order":
      return "Hi Toppins, I'd like to place an order.";
    case "cake":
      return "Hi Toppins, I'd like to enquire about a cake.";
    case "item":
      return `Hi Toppins, I'd like to order: ${input.item}.`;
  }
}

/** wa.me link with a URL-encoded prefilled message. */
export function buildWhatsAppUrl(input: WhatsAppIntent): string {
  const text = encodeURIComponent(whatsAppMessage(input));
  return `https://wa.me/${site.whatsapp.number}?text=${text}`;
}

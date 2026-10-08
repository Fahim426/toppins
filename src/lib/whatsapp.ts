import { site } from "@/data/site";

/** Optional details a visitor fills in on /cakes. Empty values are left out of the message. */
export type CakeDetails = {
  occasion?: string;
  size?: string;
  flavour?: string;
  date?: string;
};

export type WhatsAppIntent =
  | { intent: "order" }
  | { intent: "cake"; details?: CakeDetails }
  | { intent: "item"; item: string };

const cakeDetailLabels: [keyof CakeDetails, string][] = [
  ["occasion", "Occasion"],
  ["size", "Size"],
  ["flavour", "Flavour"],
  ["date", "Date needed"],
];

export function whatsAppMessage(input: WhatsAppIntent): string {
  switch (input.intent) {
    case "order":
      return "Hi Toppins, I'd like to place an order.";
    case "cake": {
      const base = "Hi Toppins, I'd like to enquire about a cake.";
      const lines = cakeDetailLabels
        .map(([key, label]) => {
          const value = input.details?.[key]?.trim();
          return value ? `${label}: ${value}` : null;
        })
        .filter(Boolean);
      return lines.length ? [base, ...lines].join("\n") : base;
    }
    case "item":
      return `Hi Toppins, I'd like to order: ${input.item}.`;
  }
}

/** wa.me link with a URL-encoded prefilled message. */
export function buildWhatsAppUrl(input: WhatsAppIntent): string {
  const text = encodeURIComponent(whatsAppMessage(input));
  return `https://wa.me/${site.whatsapp.number}?text=${text}`;
}

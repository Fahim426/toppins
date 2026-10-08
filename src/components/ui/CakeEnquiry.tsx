"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { cn } from "@/lib/cn";
import { whatsAppMessage, type CakeDetails } from "@/lib/whatsapp";

const fields: {
  key: keyof CakeDetails;
  label: string;
  hint: string;
  type: "text" | "date";
  placeholder?: string;
}[] = [
  { key: "occasion", label: "Occasion", hint: "What are you celebrating?", type: "text" },
  { key: "size", label: "Size", hint: "How many people, or how big?", type: "text" },
  { key: "flavour", label: "Flavour", hint: "Anything you have in mind.", type: "text" },
  { key: "date", label: "Date needed", hint: "When do you need it?", type: "date" },
];

function formatDate(value: string): string {
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

/**
 * "Tell us" checklist. Builds a WhatsApp message in the browser; nothing is sent to or stored on a server.
 * Every field is optional; empty ones are left out of the message.
 */
export function CakeEnquiry() {
  const [details, setDetails] = useState<CakeDetails>({});

  const update = (key: keyof CakeDetails, value: string) =>
    setDetails((d) => ({ ...d, [key]: value }));

  // Show the date the way it will be written in the message
  const request = {
    intent: "cake" as const,
    details: { ...details, date: details.date ? formatDate(details.date) : undefined },
  };
  const message = whatsAppMessage(request);

  return (
    <form
      aria-label="Cake enquiry details"
      onSubmit={(e) => e.preventDefault()}
      className="grid gap-10 lg:grid-cols-2 lg:gap-14"
    >
      <ul className="divide-y divide-espresso/15 border-y border-espresso/15">
        {fields.map((f) => {
          const filled = Boolean(details[f.key]?.trim());
          const id = `cake-${f.key}`;
          return (
            <li key={f.key} className="grid gap-3 py-5">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className={cn(
                    "inline-flex size-6 shrink-0 items-center justify-center rounded-sm border transition-colors duration-200",
                    filled
                      ? "border-espresso bg-espresso text-cream"
                      : "border-espresso/30 text-transparent",
                  )}
                >
                  <Icon name="check" size={14} />
                </span>
                <div>
                  <label htmlFor={id} className="block font-semibold">
                    {f.label}
                  </label>
                  <p id={`${id}-hint`} className="type-small text-espresso/70">
                    {f.hint}
                  </p>
                </div>
              </div>
              <input
                id={id}
                type={f.type}
                value={details[f.key] ?? ""}
                onChange={(e) => update(f.key, e.target.value)}
                aria-describedby={`${id}-hint`}
                autoComplete="off"
                className="min-h-12 w-full rounded-md border border-espresso/30 bg-warm-white px-4 text-base text-espresso transition-colors hover:border-espresso/60 focus:border-espresso"
              />
            </li>
          );
        })}
      </ul>

      <div className="flex flex-col">
        <p className="type-label text-espresso/80">Your message</p>
        <pre
          aria-label="Message preview"
          className="mt-3 flex-1 rounded-lg border border-espresso/15 bg-sand/60 p-5 font-sans text-[0.9375rem] leading-relaxed whitespace-pre-wrap text-espresso"
        >
          {message}
        </pre>
        <WhatsAppButton request={request} size="lg" className="mt-6 self-start">
          Enquire About a Cake
        </WhatsAppButton>
        <p className="type-small mt-4 text-espresso/70">
          This opens WhatsApp with the message above. Nothing is stored on this site.
        </p>
      </div>
    </form>
  );
}

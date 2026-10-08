import { Button, type ButtonSize, type ButtonVariant } from "@/components/ui/Button";
import { buildWhatsAppUrl, type WhatsAppIntent } from "@/lib/whatsapp";

type Props = {
  request: WhatsAppIntent;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Overrides the default label */
  children?: string;
  /** Compact visible label for narrow screens; the full label stays as the accessible name. */
  shortLabel?: string;
  /** Accessible name when the visible label is ambiguous, e.g. "Order Pizza on WhatsApp" */
  ariaLabel?: string;
  className?: string;
};

const defaultLabel: Record<WhatsAppIntent["intent"], string> = {
  order: "Order on WhatsApp",
  cake: "Enquire About a Cake",
  item: "Order on WhatsApp",
};

/** The conversion path: always opens WhatsApp with a prefilled, encoded message. */
export function WhatsAppButton({
  request,
  variant = "primary",
  size = "md",
  children,
  shortLabel,
  ariaLabel,
  className,
}: Props) {
  const label = children ?? defaultLabel[request.intent];
  return (
    <Button
      href={buildWhatsAppUrl(request)}
      variant={variant}
      size={size}
      icon="whatsapp"
      className={className}
      aria-label={ariaLabel ?? (shortLabel ? label : undefined)}
    >
      {shortLabel ? (
        <>
          <span className="sm:hidden" aria-hidden="true">
            {shortLabel}
          </span>
          <span className="hidden sm:inline" aria-hidden="true">
            {label}
          </span>
        </>
      ) : (
        label
      )}
    </Button>
  );
}

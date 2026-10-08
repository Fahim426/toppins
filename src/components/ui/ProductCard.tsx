import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { menuCategories, type MenuItem } from "@/data/menu";
import { formatPrice } from "@/lib/menu";

const isDev = process.env.NODE_ENV !== "production";

type Props = {
  item: MenuItem;
  /** Image frame size; sets the crop ratio */
  width?: number;
  height?: number;
  sizes?: string;
};

export function ProductCard({
  item,
  width = 1000,
  height = 1250,
  sizes = "(min-width: 1024px) 22vw, 45vw",
}: Props) {
  const category = menuCategories.find((c) => c.id === item.category)?.label;
  const showSample = isDev && item.placeholder;

  return (
    <article className="group flex h-full flex-col">
      <div className="relative">
        <PlaceholderImage
          src={item.image}
          width={width}
          height={height}
          alt={item.name}
          sizes={sizes}
          imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        {item.bestseller && (
          <span className="type-label absolute top-3 left-3 rounded-sm bg-butter px-2 py-1 text-[0.625rem] text-espresso">
            Bestseller
          </span>
        )}
        {showSample && (
          <span className="type-label absolute right-3 bottom-3 rounded-sm bg-espresso/85 px-2 py-1 text-[0.625rem] text-cream">
            Sample item
          </span>
        )}
      </div>

      <div className="mt-4 flex flex-1 flex-col border-t border-espresso/20 pt-3">
        {category && <p className="type-label text-espresso/70">{category}</p>}
        <h3 className="type-display-m mt-1.5 text-[1.375rem] lg:text-[1.5rem]">{item.name}</h3>
        {item.description && (
          <p className="type-small mt-2 text-espresso/75">{item.description}</p>
        )}
        <p className="type-small mt-auto pt-3 font-semibold text-caramel-text">
          {formatPrice(item.price)}
        </p>
        <WhatsAppButton
          request={{ intent: "item", item: item.name }}
          variant="link"
          ariaLabel={`Order ${item.name} on WhatsApp`}
          className="mt-1 self-start py-2 text-sm"
        >
          Order
        </WhatsAppButton>
      </div>
    </article>
  );
}

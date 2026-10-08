import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import type { ImageId } from "@/data/images";

type Props = {
  title: string;
  href: string;
  slot: ImageId;
  index: string;
};

export function CategoryCard({ title, href, slot, index }: Props) {
  return (
    <Link href={href} className="group block">
      <PlaceholderImage
        slot={slot}
        sizes="(min-width: 1024px) 28vw, 45vw"
        imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
      <div className="mt-4 flex items-baseline justify-between gap-3 border-t border-espresso/20 pt-3">
        <span className="type-label hidden text-espresso/70 sm:inline">{index}</span>
        <span className="type-display-m min-w-0 flex-1 break-words max-sm:text-[1.25rem] transition-transform duration-300 group-hover:translate-x-1">
          {title}
        </span>
        <Icon
          name="arrow"
          size={18}
          className="hidden shrink-0 self-center text-caramel-text transition-transform sm:block duration-300 group-hover:translate-x-1"
        />
      </div>
    </Link>
  );
}

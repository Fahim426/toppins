import type { ImageId } from "@/data/images";

export type CakeType = {
  id: string;
  label: string;
  image: ImageId;
  /** Only confirmed types render in production. */
  confirmed: boolean;
};

// TODO(owner): confirm which cake types are offered. Candidates from CLAUDE.md:
// Birthday, Celebration, Custom, Photo. Set `confirmed: true` for the real ones.
export const cakeTypes: CakeType[] = [
  { id: "birthday", image: "cake-birthday", label: "Birthday", confirmed: false },
  { id: "celebration", image: "cake-celebration", label: "Celebration", confirmed: false },
  { id: "custom", image: "cake-custom", label: "Custom", confirmed: false },
  { id: "photo", image: "cake-photo", label: "Photo", confirmed: false },
];

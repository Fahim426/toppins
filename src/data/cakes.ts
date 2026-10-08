export type CakeType = {
  id: string;
  label: string;
  /** Only confirmed types render in production. */
  confirmed: boolean;
};

// TODO(owner): confirm which cake types are offered. Candidates from CLAUDE.md:
// Birthday, Celebration, Custom, Photo. Set `confirmed: true` for the real ones.
export const cakeTypes: CakeType[] = [
  { id: "birthday", label: "Birthday", confirmed: false },
  { id: "celebration", label: "Celebration", confirmed: false },
  { id: "custom", label: "Custom", confirmed: false },
  { id: "photo", label: "Photo", confirmed: false },
];

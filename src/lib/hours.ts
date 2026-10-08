import { site } from "@/data/site";

/** "Opens 9:00 AM" until the closing time is verified, then "9:00 AM – 9:30 PM". */
export function getHoursLabel(): string {
  const { opens, closes } = site.hours;
  return closes.verified ? `${opens} – ${closes.value}` : `Opens ${opens}`;
}

/** Full line with days, only when days are verified. */
export function getHoursWithDays(): string {
  const { days } = site.hours;
  return days.verified ? `${days.value}, ${getHoursLabel()}` : getHoursLabel();
}

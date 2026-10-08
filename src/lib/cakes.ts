import { cakeTypes, type CakeType } from "@/data/cakes";
import { showPlaceholders } from "@/lib/menu";

/** Confirmed cake types; unconfirmed ones appear only where placeholders are enabled. */
export function getVisibleCakeTypes(): (CakeType & { sample: boolean })[] {
  return cakeTypes
    .filter((c) => c.confirmed || showPlaceholders)
    .map((c) => ({ ...c, sample: !c.confirmed }));
}

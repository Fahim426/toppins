import { useSyncExternalStore } from "react";

// Tiny external store over location.hash so selected state survives reloads and can be shared.
// history.replaceState does not fire `hashchange`, so setUrlHash notifies listeners itself.
const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener("hashchange", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("hashchange", onChange);
  };
}

const getSnapshot = () => decodeURIComponent(window.location.hash.slice(1));
const getServerSnapshot = () => "";

/** Current URL hash without the "#". Empty on the server and on first hydration. */
export function useUrlHash(): string {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Set (or clear, with null) the hash without adding a history entry or scrolling. */
export function setUrlHash(hash: string | null) {
  const { pathname, search } = window.location;
  window.history.replaceState(null, "", hash ? `${pathname}${search}#${hash}` : `${pathname}${search}`);
  listeners.forEach((l) => l());
}

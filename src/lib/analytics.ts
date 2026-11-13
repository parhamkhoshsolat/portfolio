// Privacy-friendly visit tracking through Umami (no cookies, no personal data).
// Everything here is a no-op until NEXT_PUBLIC_UMAMI_WEBSITE_ID is set.

type Props = Record<string, string | number | boolean>;

declare global {
  interface Window {
    umami?: {
      track: (event: string, data?: Props) => void;
      identify?: (data: Props) => void;
    };
  }
}

const REF_KEY = "pks_ref";

/** Clean a ?ref= value down to a short slug such as "bosch" or "tum-phd". */
export function cleanRef(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const slug = raw.toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 40);
  return slug || null;
}

export function getRef(): string | null {
  try {
    return sessionStorage.getItem(REF_KEY);
  } catch {
    return null;
  }
}

export function rememberRef(ref: string) {
  try {
    sessionStorage.setItem(REF_KEY, ref);
  } catch {
    /* storage blocked: the ref still goes out with the first event */
  }
}

/** Send one named event; adds the visitor's ref link when they came through one. */
export function trackEvent(event: string, data: Props = {}) {
  if (typeof window === "undefined" || !window.umami) return;
  const ref = getRef();
  window.umami.track(event, ref ? { ...data, ref } : data);
}

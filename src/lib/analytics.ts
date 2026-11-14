// Privacy-friendly visit tracking through Umami (no cookies, no personal data).
// Events are sent only on the live domain (see data-domains in Analytics.tsx).

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

const ACTIONS_KEY = "pks_actions";

/** Actions a ref visitor took that have not been reported to Telegram yet. */
export function takePendingActions(): [string, string][] {
  try {
    const list = JSON.parse(sessionStorage.getItem(ACTIONS_KEY) || "[]");
    sessionStorage.removeItem(ACTIONS_KEY);
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

function rememberAction(event: string, data: Props) {
  try {
    const list = JSON.parse(sessionStorage.getItem(ACTIONS_KEY) || "[]");
    const target = String(data.project ?? data.target ?? data.page ?? "");
    list.push([event, target]);
    sessionStorage.setItem(ACTIONS_KEY, JSON.stringify(list.slice(-15)));
  } catch {
    /* storage blocked: skip the summary */
  }
}

/** Send one named event; adds the visitor's ref link when they came through one. */
export function trackEvent(event: string, data: Props = {}) {
  if (typeof window === "undefined") return;
  const ref = getRef();
  if (ref && event !== "ref_visit") rememberAction(event, data);
  window.umami?.track(event, ref ? { ...data, ref } : data);
}

"use client";

import Script from "next/script";
import { useEffect } from "react";
import { cleanRef, rememberRef, trackEvent } from "@/lib/analytics";

// Public site ID from Umami Cloud (it appears in the page source anyway).
const WEBSITE_ID =
  process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID ?? "2ab6c6b0-69d7-4300-8061-48eb0dbbeb06";

// Which outbound link was clicked, in a few readable groups.
function classify(href: string): { event: string; target: string } | null {
  try {
    const url = new URL(href, window.location.href);
    if (url.origin === window.location.origin) {
      if (url.pathname.endsWith(".pdf")) return { event: "certificate_open", target: url.pathname };
      return null;
    }
    const host = url.hostname;
    if (host.endsWith(".hf.space") || url.pathname.includes("/spaces/")) return { event: "demo_open", target: url.href };
    if (host === "github.com") {
      const parts = url.pathname.split("/").filter(Boolean);
      return parts.length >= 2 ? { event: "repo_open", target: parts[1] } : { event: "contact_click", target: "github" };
    }
    if (host.endsWith("linkedin.com")) return { event: "contact_click", target: "linkedin" };
    if (host.endsWith("huggingface.co")) return { event: "contact_click", target: "huggingface" };
    return { event: "outbound_click", target: host };
  } catch {
    return null;
  }
}

function Tracking() {
  useEffect(() => {
    // Personal links: /?ref=bosch (or /r/bosch, which redirects here).
    const ref = cleanRef(new URLSearchParams(window.location.search).get("ref"));
    if (ref) {
      rememberRef(ref);
      const send = () => {
        window.umami?.identify?.({ ref });
        trackEvent("ref_visit", { ref, page: window.location.pathname });
      };
      if (window.umami) send();
      else window.addEventListener("umami:ready", send, { once: true });
    }

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const hit = classify(a.getAttribute("href") || "");
      if (hit) trackEvent(hit.event, { target: hit.target, page: window.location.pathname });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}

export function Analytics() {
  if (!WEBSITE_ID) return null;
  return (
    <>
      <Script
        src="https://cloud.umami.is/script.js"
        data-website-id={WEBSITE_ID}
        data-domains="www.parhamkhoshsolat.com,parhamkhoshsolat.com"
        strategy="afterInteractive"
        onLoad={() => window.dispatchEvent(new Event("umami:ready"))}
      />
      <Tracking />
    </>
  );
}

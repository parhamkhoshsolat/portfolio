import { NextResponse } from "next/server";
import { cleanRef } from "@/lib/analytics";

// Telegram alert when someone opens the site: named for personal /r/<name> links,
// "Someone" for everyone else. Needs TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in the
// Vercel project settings; without them this route does nothing.

// Best effort, counted per server instance: personal links and other visits have
// separate caps, so a busy day of other visits never hides a personal-link alert.
const DAILY_CAP = { ref: 20, other: 40 };
let day = "";
const sentToday = { ref: 0, other: 0 };

function underCap(kind: "ref" | "other"): boolean {
  const today = new Date().toISOString().slice(0, 10);
  if (today !== day) {
    day = today;
    sentToday.ref = 0;
    sentToday.other = 0;
  }
  if (sentToday[kind] >= DAILY_CAP[kind]) return false;
  sentToday[kind] += 1;
  return true;
}

const BOT_UA = /bot|crawl|spider|slurp|preview|headless|lighthouse|pingdom|uptime|monitor|python|curl|wget|httpclient/i;

function device(ua: string): string {
  const browser = /Edg\//.test(ua)
    ? "Edge"
    : /Chrome\//.test(ua)
      ? "Chrome"
      : /Firefox\//.test(ua)
        ? "Firefox"
        : /Safari\//.test(ua)
          ? "Safari"
          : "a browser";
  const os = /iPhone|iPad/.test(ua)
    ? "iPhone/iPad"
    : /Android/.test(ua)
      ? "Android"
      : /Mac OS X/.test(ua)
        ? "Mac"
        : /Windows/.test(ua)
          ? "Windows"
          : /Linux/.test(ua)
            ? "Linux"
            : "unknown device";
  return `${browser} on ${os}`;
}

function place(h: Headers): string {
  const city = h.get("x-vercel-ip-city");
  const country = h.get("x-vercel-ip-country");
  const parts = [city ? decodeURIComponent(city) : null, country].filter(Boolean);
  return parts.length ? parts.join(", ") : "unknown location";
}

const LABELS: Record<string, string> = {
  project_open: "opened",
  demo_open: "tried demo",
  repo_open: "opened repo",
  contact_click: "clicked",
  chat_open: "opened the chat",
  chat_question: "asked the chat a question",
  certificate_open: "opened certificate",
};

function clean(s: unknown, max = 60): string {
  return String(s ?? "").replace(/[^\w ./:#-]/g, "").slice(0, max);
}

export async function POST(request: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return new NextResponse(null, { status: 204 });

  const ua = request.headers.get("user-agent") || "";
  if (!ua || BOT_UA.test(ua)) return new NextResponse(null, { status: 204 });

  let body: { type?: string; ref?: string | null; page?: string; from?: string | null; actions?: unknown };
  try {
    body = JSON.parse(await request.text());
  } catch {
    return new NextResponse(null, { status: 400 });
  }
  const ref = cleanRef(body.ref);
  const where = place(request.headers);

  let text: string;
  if (body.type === "arrive") {
    const from = body.from ? clean(body.from, 60) : "";
    const page = clean(body.page);
    const lines = [
      ref ? `👀 ${ref} just opened your portfolio` : "👀 Someone opened your portfolio",
      `${where} · ${device(ua)}`,
      from ? `came from ${from}` : "direct visit (typed, bookmark, app or PDF link such as the CV)",
    ];
    if (page && page !== "/") lines.push(`landed on ${page}`);
    text = lines.join("\n");
  } else if (body.type === "summary" && Array.isArray(body.actions) && body.actions.length) {
    const lines = body.actions.slice(0, 15).map((a) => {
      const [event, target] = Array.isArray(a) ? a : [];
      const label = LABELS[clean(event, 30)];
      return label ? `• ${label} ${clean(target)}`.trim() : null;
    });
    const shown = lines.filter(Boolean);
    if (!shown.length) return new NextResponse(null, { status: 204 });
    text = `📄 ${ref ?? `Visitor from ${where}`} so far:\n${shown.join("\n")}`;
  } else {
    return new NextResponse(null, { status: 400 });
  }

  if (!underCap(ref ? "ref" : "other")) return new NextResponse(null, { status: 429 });

  const res = await fetch(`${process.env.TELEGRAM_API_BASE ?? "https://api.telegram.org"}/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
  });
  return new NextResponse(null, { status: res.ok ? 204 : 502 });
}

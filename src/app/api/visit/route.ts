import { NextResponse } from "next/server";
import { cleanRef } from "@/lib/analytics";

// Telegram alert when someone opens the site through a personal /r/<name> link.
// Needs TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in the Vercel project settings;
// without them this route does nothing.

const DAILY_CAP = 20; // best effort: counted per server instance
let day = "";
let sentToday = 0;

function underCap(): boolean {
  const today = new Date().toISOString().slice(0, 10);
  if (today !== day) {
    day = today;
    sentToday = 0;
  }
  if (sentToday >= DAILY_CAP) return false;
  sentToday += 1;
  return true;
}

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

  let body: { type?: string; ref?: string; page?: string; actions?: unknown };
  try {
    body = JSON.parse(await request.text());
  } catch {
    return new NextResponse(null, { status: 400 });
  }
  const ref = cleanRef(body.ref);
  if (!ref) return new NextResponse(null, { status: 400 });

  let text: string;
  if (body.type === "arrive") {
    text = `👀 ${ref} just opened your portfolio\n${place(request.headers)} · ${device(request.headers.get("user-agent") || "")}`;
  } else if (body.type === "summary" && Array.isArray(body.actions) && body.actions.length) {
    const lines = body.actions.slice(0, 15).map((a) => {
      const [event, target] = Array.isArray(a) ? a : [];
      const label = LABELS[clean(event, 30)];
      return label ? `• ${label} ${clean(target)}`.trim() : null;
    });
    const shown = lines.filter(Boolean);
    if (!shown.length) return new NextResponse(null, { status: 204 });
    text = `📄 ${ref} so far:\n${shown.join("\n")}`;
  } else {
    return new NextResponse(null, { status: 400 });
  }

  if (!underCap()) return new NextResponse(null, { status: 429 });

  const res = await fetch(`${process.env.TELEGRAM_API_BASE ?? "https://api.telegram.org"}/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
  });
  return new NextResponse(null, { status: res.ok ? 204 : 502 });
}

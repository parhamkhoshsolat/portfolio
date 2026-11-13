import { NextResponse } from "next/server";
import { cleanRef } from "@/lib/analytics";

// Short personal links for applications: /r/bosch -> /?ref=bosch
export function GET(request: Request, { params }: { params: { ref: string } }) {
  const ref = cleanRef(params.ref);
  const url = new URL("/", request.url);
  if (ref) url.searchParams.set("ref", ref);
  return NextResponse.redirect(url, 307);
}

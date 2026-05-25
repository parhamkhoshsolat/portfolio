import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border/60">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-text">{siteConfig.name}</p>
            <p className="mt-2 max-w-md text-sm text-muted">
              {siteConfig.oneLiner}
            </p>
            <p className="mt-3 text-xs text-muted">
              Based in {siteConfig.location}.
            </p>
          </div>
          <div className="text-sm">
            <p className="mb-3 font-semibold text-text">Find me elsewhere</p>
            <ul className="grid grid-cols-3 gap-3 text-muted">
              <li>
                <Link
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-md border border-border bg-card px-3 py-2 hover:border-accent/60 hover:text-accent"
                >
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-md border border-border bg-card px-3 py-2 hover:border-accent/60 hover:text-accent"
                >
                  GitHub
                </Link>
              </li>
              <li>
                <Link
                  href={siteConfig.links.huggingface}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-md border border-border bg-card px-3 py-2 hover:border-accent/60 hover:text-accent"
                >
                  HuggingFace
                </Link>
              </li>
            </ul>
            <p className="mt-4 text-xs text-muted">
              For direct contact, message me on LinkedIn. The agent in the
              bottom-right will answer any question about the work, and you
              can download the conversation when you&apos;re done.
            </p>
          </div>
        </div>
        <p className="mt-10 text-xs text-muted">
          © {new Date().getFullYear()} {siteConfig.name}. Built with
          Next.js, deployed on Vercel.
        </p>
      </div>
    </footer>
  );
}

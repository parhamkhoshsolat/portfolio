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
          </div>
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <p className="mb-3 font-semibold text-text">Contact</p>
              <ul className="space-y-2 text-muted">
                <li>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="hover:text-accent"
                  >
                    {siteConfig.contact.email}
                  </a>
                </li>
                <li>{siteConfig.contact.phone}</li>
                <li>{siteConfig.location}</li>
              </ul>
            </div>
            <div>
              <p className="mb-3 font-semibold text-text">Elsewhere</p>
              <ul className="space-y-2 text-muted">
                <li>
                  <Link
                    href={siteConfig.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent"
                  >
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent"
                  >
                    GitHub
                  </Link>
                </li>
                <li>
                  <Link
                    href={siteConfig.links.huggingface}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent"
                  >
                    HuggingFace
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p className="mt-10 text-xs text-muted">
          © {new Date().getFullYear()} {siteConfig.name}. Built with Next.js,
          deployed on Vercel.
        </p>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-bg/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-text hover:text-accent transition-colors"
        >
          parham.
        </Link>
        <nav className="flex items-center gap-5 text-sm">
          <Link
            href="/#projects"
            className="hidden text-muted hover:text-text transition-colors sm:inline"
          >
            Projects
          </Link>
          <Link
            href="/#about"
            className="hidden text-muted hover:text-text transition-colors sm:inline"
          >
            About
          </Link>
          <Link
            href="/cv"
            className="text-muted hover:text-text transition-colors"
          >
            CV
          </Link>
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden text-muted hover:text-text transition-colors md:inline"
          >
            GitHub
          </Link>
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="inline-flex items-center rounded-md border border-border bg-card px-3 py-1.5 text-text hover:border-accent/60 hover:text-accent transition-all"
          >
            Get in touch
          </a>
        </nav>
      </div>
    </header>
  );
}

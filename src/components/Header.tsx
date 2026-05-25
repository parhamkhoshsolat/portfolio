import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-bg/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          aria-label="Home — Parham Khosh Solat"
          className="group flex items-center gap-3 transition-transform active:scale-95"
        >
          <Image
            src="/brand/mark.svg"
            alt=""
            width={36}
            height={36}
            priority
            className="h-9 w-9 transition-opacity group-hover:opacity-80"
          />
          <span className="hidden text-sm font-semibold tracking-tight text-text transition-colors group-hover:text-accent sm:inline">
            Parham Khosh Solat
          </span>
        </Link>
        <nav className="flex items-center gap-5 text-sm">
          <Link
            href="/#projects"
            className="text-muted hover:text-text transition-colors"
          >
            Projects
          </Link>
          <Link
            href="/#in-progress"
            className="hidden text-muted hover:text-text transition-colors sm:inline"
          >
            In progress
          </Link>
          <Link
            href="/#about"
            className="text-muted hover:text-text transition-colors"
          >
            About
          </Link>
          <Link
            href="/#contact"
            className="rounded-md border border-border bg-card px-3 py-1.5 text-text hover:border-accent/60 hover:text-accent transition-all"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}

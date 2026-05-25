import Link from "next/link";

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
        <nav className="flex items-center gap-6 text-sm">
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
        </nav>
      </div>
    </header>
  );
}

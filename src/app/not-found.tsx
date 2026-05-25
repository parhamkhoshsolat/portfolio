import Link from "next/link";
import { Compass, MessageSquare, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/projects";
import { siteConfig } from "@/lib/site-config";

export default function NotFound() {
  return (
    <article className="container max-w-3xl py-24 md:py-32">
      <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted">
        <Compass className="h-3 w-3" />
        404
      </div>

      <h1 className="mt-5 text-4xl font-semibold leading-tight md:text-5xl">
        Wrong turn somewhere.
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        The page you tried doesn&apos;t exist. The site has six shipped
        projects and three more in flight, all linked below. Or use the
        agent in the bottom-right corner to ask for what you need.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/">Back to the home page</Link>
        </Button>
        <Button asChild variant="secondary">
          <a href={`mailto:${siteConfig.contact.email}`}>
            <Mail className="h-4 w-4" /> Email me directly
          </a>
        </Button>
        <Button asChild variant="ghost">
          <Link href="/cv">View CV</Link>
        </Button>
      </div>

      <section className="mt-14 border-t border-border/40 pt-10">
        <p className="text-xs uppercase tracking-[0.2em] text-accent">
          Maybe you were looking for
        </p>
        <ul className="mt-5 grid gap-2 md:grid-cols-2">
          {projects.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/projects/${p.slug}`}
                className="block rounded-lg border border-border bg-card px-4 py-3 text-sm hover:border-accent/60 hover:text-accent transition-colors"
              >
                {p.shortTitle}
                <span className="ml-2 text-xs text-muted">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 rounded-2xl border border-border bg-card p-5">
        <div className="flex items-start gap-3">
          <MessageSquare className="mt-0.5 h-4 w-4 text-accent" />
          <p className="text-sm text-muted">
            Or try the agent in the bottom-right. It knows every project on
            the site and can email a message to me if you want to start a
            conversation.
          </p>
        </div>
      </section>
    </article>
  );
}

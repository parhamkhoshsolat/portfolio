import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Wrench,
  Brain,
  AppWindow,
  ShieldCheck,
  Server,
  LayoutDashboard,
  FlaskConical,
  Layers,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/FadeIn";
import { inProgressProjects } from "@/lib/in-progress-projects";

const project = inProgressProjects.find(
  (p) => p.slug === "preference-shielding-hri"
)!;

export const metadata: Metadata = {
  title: project.shortTitle,
  description: project.tagline,
};

const SHOT = "/projects/preference-shielding-hri/screenshots";

// High-level tiles only. Exact instrument, analysis plan and results are held
// back until the paper is out.
const stats = [
  { value: "3", label: "Shield designs" },
  { value: "8x8", label: "Gridworld" },
  { value: "42", label: "Target completers" },
  { value: "~30 min", label: "Per session" },
];

const conditions = [
  {
    name: "Preference Shielding",
    tag: "baseline, from the literature",
    body: "The mechanism this work starts from. The shield applies the same way for the whole run and never changes as the robot gains experience. It is the control the two new ideas are measured against.",
  },
  {
    name: "Adaptive Shielding",
    tag: "new idea",
    body: "The shield loosens as the robot gets to know a place. It follows a person's rule closely while a square is still unfamiliar, then leans on its own judgement once it has spent enough time there to know what happens. Autonomy is earned rather than granted from the start.",
  },
  {
    name: "Hard/Soft Shielding",
    tag: "new idea",
    body: "The person marks each rule firm or flexible as they draw it. Firm rules are always kept. Flexible ones are treated as suggestions the robot can set aside. A guarantee becomes something a person places deliberately, on the things they care about most.",
  },
];

export default function PreferenceShieldingPage() {
  return (
    <article className="container max-w-5xl py-16 md:py-24">
      {/* Hero */}
      <FadeIn>
        <Link
          href="/#in-progress"
          className="inline-flex items-center gap-2 text-xs text-muted hover:text-accent"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to in-progress
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <Badge
            variant="outline"
            className="border-amber-400/40 bg-amber-400/10 text-amber-200"
          >
            <Wrench className="mr-1 h-3 w-3" /> In progress
          </Badge>
          <Badge variant="outline">MSc thesis</Badge>
        </div>

        <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
          Preference Shielding for Human-Robot Interaction (MSc thesis)
        </h1>

        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">
          A browser based study in human robot interaction. People teach a
          learning robot where it should and should not go, then watch it learn
          the same task under three different safety shield designs and say how
          each one felt. It runs on tabular Q learning in a small gridworld,
          wrapped in a full participant facing web app that computes each session
          on the server and replays it in the browser.
        </p>

        <p className="mt-5 max-w-3xl rounded-lg border border-border bg-card/60 p-4 text-sm leading-relaxed text-muted">
          A paper is being written from this study, so the exact conditions,
          measures and analysis are kept off this page for now. What follows is
          the shape of the work and how it was built.
        </p>

        <p className="mt-4 inline-block rounded-lg border border-border bg-card px-4 py-2 text-sm text-muted">
          Build complete and deployed. Recruitment opens once data collection is
          approved.
        </p>
      </FadeIn>

      {/* The question */}
      <FadeIn delay={0.05}>
        <section className="mt-14">
          <SectionHead icon={<Brain className="h-4 w-4" />} kicker="The question" />
          <div className="mt-4 max-w-3xl space-y-4 text-muted">
            <p>
              A preference shield sits between what a learning robot wants to do
              and what it is allowed to do. In the mechanism this thesis starts
              from, the shield behaves the same way for the whole run, from the
              first confused step to the last confident one.
            </p>
            <p>
              The thesis asks whether two changes to that make the robot easier
              for a person to read and trust. The first lets the robot earn its
              autonomy. It follows a person&apos;s rule closely while a square is
              still unfamiliar, and leans on its own judgement once it has seen
              that square enough to know what happens there.
            </p>
            <p>
              The second hands the choice to the person. Every rule is marked
              firm or flexible when it is drawn. A firm rule is always kept. A
              flexible one is a suggestion the robot can set aside. People get a
              guarantee where they want one without freezing the robot everywhere
              else.
            </p>
          </div>
        </section>
      </FadeIn>

      {/* Stat tiles */}
      <FadeIn delay={0.05}>
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-border bg-card p-4"
            >
              <p className="text-2xl font-semibold tabular-nums text-accent">
                {s.value}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wider text-muted">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </FadeIn>

      <FadeIn>
        {/* What participants compare */}
        <section className="mt-16 border-t border-border/40 pt-12">
          <SectionHead
            icon={<Brain className="h-4 w-4" />}
            kicker="What participants compare"
          />
          <p className="mt-4 max-w-3xl text-muted">
            Every participant does all three conditions, in a counterbalanced
            order, with the same rules kept fixed across all three. Only the
            shielding logic changes between sessions. Two of the three are the
            new idea being tested. The first is the baseline they are measured
            against.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {conditions.map((c) => (
              <div
                key={c.name}
                className="flex flex-col rounded-2xl border border-border bg-card p-5"
              >
                <p className="text-sm font-semibold text-text">{c.name}</p>
                <p className="mt-1 text-[11px] uppercase tracking-wider text-accent">
                  {c.tag}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {c.body}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-border bg-card/60 p-4 text-sm leading-relaxed text-muted">
            An unshielded agent appears only once, in a short onboarding demo, so
            everyone starts from the same picture of what no shield looks like. It
            is not one of the study conditions.
          </div>
        </section>

        {/* How a session works */}
        <section className="mt-16 border-t border-border/40 pt-12">
          <SectionHead
            icon={<AppWindow className="h-4 w-4" />}
            kicker="How a session works"
          />
          <p className="mt-4 max-w-3xl text-muted">
            A run takes 25 to 40 minutes in a browser. Teach the rules once, then
            three sessions, then a short debrief that puts the three learned
            routes side by side.
          </p>

          <h3 className="mt-10 text-xl font-semibold md:text-2xl">
            Teaching the rules
          </h3>
          <div className="mt-3 max-w-3xl space-y-4 text-muted">
            <p>
              One object at a time. The person taps a square next to an object,
              then taps the direction the robot should head from there, so the
              arrow sits on the square it governs rather than in a separate panel.
              Firm or flexible is a required choice before the step will advance.
              A review screen shows every rule drawn on the room before the first
              session starts.
            </p>
            <p>
              Rules use one visual language everywhere they appear. A hatched fill
              means firm, a dashed outline means flexible, in the wizard, during
              the session, and under the finished route.
            </p>
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Shot
              src={`${SHOT}/01-rule-wizard.png`}
              w={1440}
              h={1000}
              title="Teaching one object's rule"
              caption="One object at a time. Tap a square next to it, then tap the way the robot should head from there. Firm or flexible is required before the step will advance."
            />
            <Shot
              src={`${SHOT}/02-rules-review.png`}
              w={1440}
              h={1000}
              title="All the rules before session 1"
              caption="The full rule set the robot carries into every session. A hatched fill means firm, a dashed outline means flexible."
            />
          </div>

          <h3 className="mt-12 text-xl font-semibold md:text-2xl">Watching</h3>
          <p className="mt-3 max-w-3xl text-muted">
            Training runs to completion on the server first, then the app replays
            a curated set of episodes rather than the thousands of aimless early
            attempts. Speed controls run from 1x to 32x, with a pause and a skip
            that unlocks after a few minutes. Under the room, a running count
            shows how many rules the robot followed, with a line from the robot
            saying what it just did.
          </p>
          <div className="mt-6">
            <Shot
              src={`${SHOT}/03-watching-a-session.png`}
              w={1440}
              h={1000}
              title="Mid session, replay running"
              caption="The room during a session, with the participant's marked squares, the robot's trail, a running count of rules followed, and a line from the robot about what it just did."
            />
          </div>

          <h3 className="mt-12 text-xl font-semibold md:text-2xl">
            Check ins during a session
          </h3>
          <p className="mt-3 max-w-3xl text-muted">
            Now and then a session pauses for a short check in about what just
            happened, with the moment replayed on a loop inside the dialog and the
            person&apos;s rules drawn on the squares. It is built so the question
            is always anchored to something the person can see on screen.
          </p>
          <div className="mt-6">
            <Shot
              src={`${SHOT}/04-mid-session-question.png`}
              w={1440}
              h={1000}
              title="A mid session check in"
              caption="The session pauses and the moment replays inside the dialog, with the rules drawn on the squares and one arrow for the move the robot made."
            />
          </div>

          <h3 className="mt-12 text-xl font-semibold md:text-2xl">
            After the session
          </h3>
          <p className="mt-3 max-w-3xl text-muted">
            The route the robot settled on, with the person&apos;s own rules drawn
            underneath and a plain sentence counting how many of their squares it
            crossed and how many it obeyed. Then a short questionnaire about how
            that session felt.
          </p>
        </section>

        {/* How it was checked before launch */}
        <section className="mt-16 border-t border-border/40 pt-12">
          <SectionHead
            icon={<ShieldCheck className="h-4 w-4" />}
            kicker="How it was checked before launch"
          />
          <div className="mt-4 max-w-3xl space-y-4 text-muted">
            <p>
              Before any participant was recruited, the training code was put
              through a large batch of convergence runs across every condition and
              a range of realistic rule sets, then an adversarial pass that threw
              unusual and deliberately hostile rule shapes at it to see what broke.
              A suite of around 200 backend tests covers the parts a person never
              sees.
            </p>
            <p>
              Two bugs that would have quietly biased the data were caught by
              scripting a full participant walkthrough end to end, rather than
              clicking through by hand, and both were fixed before launch. Every
              check runs the same training code a real session runs.
            </p>
          </div>
        </section>

        {/* How it is built */}
        <section className="mt-16 border-t border-border/40 pt-12">
          <SectionHead
            icon={<Server className="h-4 w-4" />}
            kicker="How it is built"
          />
          <p className="mt-4 max-w-3xl text-muted">
            The study runs entirely in a browser. A FastAPI backend trains the
            agent, then streams a curated replay over a WebSocket while a React
            frontend draws the room, the trail, the rules and the robot&apos;s
            commentary. Everything a session needs is computed server side, so a
            slow laptop changes nothing about what the data records.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="text-xs uppercase tracking-wider text-accent">
                Backend
              </p>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                <li>FastAPI with an async WebSocket replay loop</li>
                <li>Tabular Q learning in NumPy, silent compute then narrative replay</li>
                <li>aiosqlite for participants, sessions, steps and answers</li>
                <li>Admin REST API for analysis, exclusions, recruitment balance and live monitoring</li>
                <li>Startup migrations so a deployed database follows the code</li>
                <li>Docker on Fly.io, London region, SQLite on an encrypted volume, scheduled online backups</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="text-xs uppercase tracking-wider text-accent">
                Frontend
              </p>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                <li>React 18 with Vite</li>
                <li>Hand drawn SVG room, props, robot and trail</li>
                <li>Five step rule wizard with a required firm or flexible choice per object</li>
                <li>Mid session check ins with the moment replayed inside the dialog</li>
                <li>Consent gate, onboarding, per session check in, debrief with all three routes</li>
                <li>Recharts in the researcher panel</li>
              </ul>
            </div>
          </div>
        </section>

        {/* The researcher panel */}
        <section className="mt-16 border-t border-border/40 pt-12">
          <SectionHead
            icon={<LayoutDashboard className="h-4 w-4" />}
            kicker="The researcher panel"
          />
          <p className="mt-4 max-w-3xl text-muted">
            A password protected panel at /admin, built to run a data collection
            wave rather than to look at results afterwards. It shows who is mid
            session right now, how each session ended, the exact rules every
            participant taught, data quality and exclusion checks computed rather
            than eyeballed, counterbalancing across condition orders, a one click
            export that opens in R or SPSS with no reshaping, an environment
            editor, and a warning if the room ever drifts from the layout the
            agent was validated on.
          </p>
          <div className="mt-6">
            <Shot
              src={`${SHOT}/08-admin-ops.png`}
              w={1500}
              h={1000}
              title="Researcher panel, Ops tab"
              caption="Wave day. Who is mid session, how sessions ended, the exact rules each participant taught, and a banner if the room layout drifts from the validated default. Local test records only."
            />
          </div>
        </section>

        {/* Where it stands */}
        <section className="mt-16 border-t border-border/40 pt-12">
          <SectionHead
            icon={<FlaskConical className="h-4 w-4" />}
            kicker="Where it stands"
          />
          <div className="mt-4 max-w-3xl space-y-4 text-muted">
            <p>
              The algorithms, the study app and the researcher panel are built,
              deployed and checked. What is left is people.
            </p>
            <p>
              Once participants come through, the planned analysis compares the
              three shield designs on how readable and trustworthy each one felt.
              The findings are being written up for a paper, and a short summary
              will be added here once that is out.
            </p>
          </div>
        </section>

        {/* Tech stack */}
        <section className="mt-16 border-t border-border/40 pt-12">
          <SectionHead icon={<Layers className="h-4 w-4" />} kicker="Tech stack" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="text-xs uppercase tracking-wider text-accent">
                In the deployed app
              </p>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                <li>Python, NumPy: tabular Q learning on a small grid, four cardinal actions</li>
                <li>FastAPI, uvicorn: async backend with a WebSocket replay loop</li>
                <li>aiosqlite, SQLite: participants, sessions, steps, answers</li>
                <li>Pydantic: request and event schemas</li>
                <li>React 18, Vite: frontend</li>
                <li>Recharts: researcher panel charts</li>
                <li>Docker, Fly.io: deployment in the London region on an encrypted volume</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="text-xs uppercase tracking-wider text-accent">
                For analysis and verification
              </p>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                <li>SciPy: statistical tests, effect sizes, power analysis</li>
                <li>pandas: long format export handling</li>
                <li>Playwright: scripted end to end participant walkthroughs</li>
                <li>pytest: backend test suite</li>
                <li>Matplotlib, Plotly: figures</li>
                <li>reportlab, pypdf: generated reports</li>
              </ul>
            </div>
          </div>
        </section>
      </FadeIn>
    </article>
  );
}

function SectionHead({
  icon,
  kicker,
}: {
  icon: React.ReactNode;
  kicker: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
        {icon}
      </span>
      <h2 className="text-2xl font-semibold md:text-3xl">{kicker}</h2>
    </div>
  );
}

function Shot({
  src,
  title,
  caption,
  w = 1440,
  h = 1000,
}: {
  src: string;
  title: string;
  caption: string;
  w?: number;
  h?: number;
}) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="border-b border-border/60 bg-bg/40 px-4 py-2 text-[10px] uppercase tracking-wider text-muted">
        {title}
      </div>
      <div className="bg-white">
        <Image
          src={src}
          alt={caption}
          width={w}
          height={h}
          className="h-auto w-full"
          sizes="(min-width: 1024px) 50vw, 100vw"
          unoptimized
        />
      </div>
      <figcaption className="border-t border-border/60 px-5 py-4 text-sm leading-relaxed text-muted">
        {caption}
      </figcaption>
    </figure>
  );
}

// In-flight research projects. Separate from shipped projects (lib/projects.ts)
// because the card treatment, status framing, and audience are different.
// Currently just the MSc thesis (Preference Shielding for HRI). The warehouse
// RL and object-localization projects graduated to the shipped section
// (shielded-lgv-routing and rl-restore respectively).

export type InProgressProject = {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  statusLabel: string;
  statusDetail: string;
  progressStat: { label: string; value: string };
  techStack: string[];
  techStackFull?: string[];
  heroImage?: { src: string; alt: string; caption: string };
  links?: { label: string; url: string }[];
  hypothesis?: string;
};

export const inProgressProjects: InProgressProject[] = [
  {
    slug: "preference-shielding-hri",
    title: "Preference Shielding for Human-Robot Interaction (MSc thesis)",
    shortTitle: "Preference Shielding for HRI",
    tagline:
      "A browser based study in human robot interaction. People teach a learning robot where it should and should not go, then watch it learn the same task under three different safety shield designs and say how each one felt. Built on tabular Q learning in a small gridworld, deployed as a full participant facing web app.",
    hypothesis:
      "Does letting a robot earn autonomy as it gains experience, or letting people mark each rule as firm or flexible, make a learning robot easier to read and trust?",
    statusLabel: "Build complete, deployed",
    statusDetail:
      "A within-subjects study that runs in the browser. Each participant teaches a set of movement rules once, then watches a tabular Q-learning robot learn the same task under three shield designs in a randomised order: the plain shield from the original paper, an adaptive shield that loosens as the robot gains experience, and a firm-or-flexible shield the person sets per rule. The app computes each session on the server, then replays it with the robot narrating what it did. A paper is being written from the study, so the exact conditions, measures and analysis are held back for now. Heavily validated before launch, and deployed.",
    progressStat: { label: "Shield designs", value: "3" },
    techStack: [
      "Python + tabular Q-learning",
      "FastAPI + aiosqlite (async WebSocket replay)",
      "React 18 + Vite",
      "Recharts",
      "Playwright",
      "Docker + Fly.io",
    ],
    techStackFull: [
      "Python and NumPy for tabular Q-learning",
      "A small gridworld with four cardinal actions and a handful of objects",
      "FastAPI backend with an async WebSocket replay loop",
      "aiosqlite for participant data",
      "React 18 with Vite, hand-drawn SVG room and props",
      "Three shield designs: the plain shield from the original paper, an adaptive shield that loosens with experience, and a firm-or-flexible shield set per rule",
      "Recharts in the researcher panel",
      "Playwright for scripted participant walkthroughs",
      "Docker on Fly.io (London region), SQLite on an encrypted volume with scheduled backup",
    ],
    links: [],
  },
];

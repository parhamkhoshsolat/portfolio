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
      "MSc thesis. A web-based HRI study comparing four shielding conditions for a Q-learning agent on a 7x7 grid: no shielding, standard preference shielding, Adaptive Shielding (confidence gate), and Hard/Soft per-object Shielding. Participants will watch the agent navigate, express directional preferences, and answer questionnaires.",
    hypothesis:
      "Does adding a confidence gate (Adaptive Shielding) or a Hard/Soft per-object enforcement split to the existing Preference Shielding mechanism improve how transparent and trustworthy a learning robot looks to a human observer, without slowing down how quickly it learns the task?",
    statusLabel: "Algorithms validated, web app live; awaiting permission to collect participant data",
    statusDetail:
      "Two original contributions: Adaptive Shielding (the shield defers to the agent once Q-value confidence crosses a threshold) and Hard/Soft Shielding (participants tag each object Strict or Flexible; Strict objects get unconditional override, Flexible objects let the agent learn freely). A 2-cubed factorial algorithmic pre-study (8 conditions across 30 seeds = 240 runs) confirmed both extensions behave as designed: in particular, Hard/Soft Shielding's all-Strict configuration reproduces the safety-performance tradeoff (perfect alignment, lost task success), which is exactly the failure mode the Strict/Flexible split is designed to escape from. Web app stack: FastAPI backend with async WebSocket training loop and aiosqlite, React 18 + Vite + Tailwind frontend, Docker-deployable on Fly.io. Participant experiment opens once data-collection permission lands.",
    progressStat: { label: "Pre-study runs", value: "240 across 30 seeds" },
    techStack: [
      "Python + tabular Q-learning",
      "FastAPI + aiosqlite (async WebSocket training loop)",
      "React 18 + Vite + Tailwind v4",
      "Plotly + Matplotlib",
      "SciPy stats",
      "Docker + Fly.io",
    ],
    techStackFull: [
      "Python",
      "Tabular Q-learning (NumPy) on a 7x7 grid environment",
      "FastAPI backend with async WebSocket training loop",
      "aiosqlite for participant data and questionnaires",
      "React 18 + Vite + Tailwind CSS v4 frontend",
      "Live animated grid (GridCanvas, AnimatedPath)",
      "Adaptive Shielding (confidence-gated override)",
      "Hard/Soft Shielding (per-object Strict vs Flexible enforcement)",
      "SciPy stats (Mann-Whitney U, Welch's t-test, Bonferroni correction)",
      "Plotly (interactive) + Matplotlib (paper figures)",
      "reportlab (PDF report generation)",
      "Docker on Fly.io for participant access",
    ],
    heroImage: {
      src: "/projects/preference-shielding-hri/figures/learning_curves_reward.png",
      alt: "Learning curves across the 8 factorial pre-study conditions, showing two clear convergence regimes",
      caption:
        "Algorithmic pre-study (NOT the participant data). Eight factorial conditions cluster into two regimes by Episode 200: those that find a viable policy and those that get stuck near minimum reward. The participant study uses four distilled conditions: Baseline, Standard PS, Adaptive Shielding, Hard/Soft Shielding.",
    },
    links: [],
  },
];

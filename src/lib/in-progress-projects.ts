// In-flight research projects. Separate from shipped projects (lib/projects.ts)
// because the card treatment, status framing, and audience are different.
// Content reconciled against the actual local repos:
//   - /Users/parham/Desktop/computer vision project/v10 (Active Object Localization, currently v10)
//   - /Users/parham/Desktop/Advance_Statistics_ModeA_project (Six-Robot Warehouse RL, one project; folder name is the course code)
//   - /Users/parham/Desktop/internship project/experiment (Preference Shielding for HRI, MSc thesis)

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
    slug: "six-robot-warehouse-rl",
    title: "Six-Robot Warehouse RL",
    shortTitle: "Six-Robot Warehouse RL",
    tagline:
      "A simulated warehouse where six autonomous forklifts learn to pick pallets and avoid each other. Three RL methods benchmarked against three classical path-planning baselines under rigorous statistical analysis.",
    statusLabel: "Pilot training executing",
    statusDetail:
      "Environment, three RL algorithms (DQN, Bootstrapped DQN, PPO), three classical baselines (A*, Cooperative A*, Conflict-Based Search), and the full statistical-analysis pipeline are complete and tested (190+ unit tests). The current pilot is training the full algorithm sweep at N=6 robots; headline metric will be per-algorithm delivery success rate over 50 evaluation episodes (best-checkpoint and final-state pair), with rliable IQM + 95 percent bootstrap CIs and Mann-Whitney + Bayesian BEST posterior probability against each classical baseline. No paper yet, no final results yet, by design.",
    progressStat: { label: "Agents in simulation", value: "6" },
    techStack: [
      "PyTorch (MARL DQN + Bootstrapped DQN)",
      "Stable-Baselines3 (PPO)",
      "Cooperative A* + CBS",
      "Gymnasium custom env",
      "rliable + Bayesian BEST",
      "Optuna",
    ],
    techStackFull: [
      "Python 3.11",
      "PyTorch (custom MARL DQN and Bootstrapped-DQN with parameter sharing + agent-ID embeddings)",
      "Stable-Baselines3 (PPO)",
      "Optuna for hyperparameter tuning",
      "Gymnasium-style custom env with vectorised LIDAR (16 rays per agent per step)",
      "Differential-drive physics with sub-step collision resolution",
      "Cooperative A* with space-time reservation",
      "Conflict-Based Search (CBS)",
      "Hungarian task assignment",
      "rliable (IQM + bootstrap CIs)",
      "Bayesian BEST test, Mann-Whitney U, Wilcoxon, Benjamini-Hochberg FDR",
      "TensorBoard live diagnostics + per-run JSONL summaries",
      "pytest (190+ tests)",
    ],
  },
  {
    slug: "active-object-localization-rl",
    title: "Active Object Localization with Deep RL",
    shortTitle: "Active Object Localization",
    tagline:
      "An RL agent that learns to find objects in natural images by iteratively refining a bounding box through geometric actions, built on frozen CLIP features. A reimplementation-with-modern-components of Caicedo and Lazebnik (ICCV 2015) on Pascal VOC 2007, not a strict reproduction.",
    statusLabel: "v10 training; v7 currently holds best mAP 0.287",
    statusDetail:
      "Iteration history (each version is a separate Drive root for clean A/B): v6 (Double DQN added) cured Q-overestimation, mAP 0.257. v7 (n-step Bellman + persistent DQfD margin) propagated trigger reward 3x faster, mAP 0.287. v9.2 (aux IoU head with gradient flow) lifted Pearson rho between trunk features and true IoU in the critical [0.5, 0.85] band from 0.18 to 0.48, but did NOT translate to mAP, which exposed the binding constraint as the trigger reward not the representation. v10 (current) tests whether closing that policy-vs-representation gap recovers mAP. Realistic target band for CLIP-backbone work is 0.28 to 0.35, against the paper's VGG-feature 0.46 (not apples-to-apples).",
    progressStat: { label: "Best mAP @ 0.5 so far", value: "0.287" },
    techStack: [
      "PyTorch",
      "Stable-Baselines3 (custom Double DQN + n-step + DQfD)",
      "OpenAI CLIP ViT-L/14 (frozen)",
      "SCLIP class-conditional saliency",
      "Gymnasium",
      "Google Colab + TensorBoard",
    ],
    techStackFull: [
      "Python",
      "PyTorch",
      "Stable-Baselines3 with custom DoubleDQN(DQN) subclass",
      "n-step Bellman target propagation",
      "Persistent DQfD margin loss",
      "OpenAI CLIP ViT-L/14 (frozen vision and text encoder, 768-d region embeddings)",
      "SCLIP for class-conditional saliency (16x16 map concatenated into the observation)",
      "Gymnasium environment API",
      "Behaviour-cloning warmup from a greedy IoU oracle",
      "Auxiliary IoU-prediction head with pairwise ranking loss",
      "Importance-sampled replay buffer",
      "10 discrete actions (paper's 9 + a fine-grained scale-smaller for endgame refinement)",
      "Continuous monotone trigger reward (replaces paper's binary +5 / -1)",
      "Google Colab with chunked checkpoints persisted to Google Drive",
      "TensorBoard live diagnostics",
    ],
  },
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

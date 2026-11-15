// Home page card copy (audited 15 Nov 2026; see side-session notes copy-final.md).
// The banner on each card (number, comparison, visual) lives in banners.ts. Keep both in sync
// with projects.ts and project-glance.ts.

export type CardCopy = {
  title: string;
  context: string; // team and setting
  hook?: string; // featured and research cards only
  limit: string;
};

export const FEATURED = ["shielded-lgv-routing", "rl-restore", "5g-noc-root-cause"];

export const MORE = [
  "pest-forecasting",
  "florence2-vqa",
  "retail-geospatial",
  "oulad-timeseries",
  "stock-clustering",
  "talentsonar",
];

export const cardCopy: Record<string, CardCopy> = {
  "shielded-lgv-routing": {
    title: "Warehouse robots: classical planners vs reinforcement learning",
    context: "Solo · course project",
    hook: "Six self-driving forklifts share one warehouse. I built the simulator and made nine routing methods compete under one safety layer that rules out collisions, so they compete on deliveries alone.",
    limit: "One simulated warehouse layout; walking workers appear in the demo only, not in the scored runs.",
  },
  "rl-restore": {
    title: "An RL agent that repairs damaged photos",
    context: "Solo · course project",
    hook: "Blur, noise and JPEG damage arrive at unknown strengths. I reimplemented a CVPR 2018 method in which an agent chains up to 3 of 12 small repair networks, then added the fine-tuning step the paper never released.",
    limit: "A single CNN of the same size repairs more (+4.03 dB); scores are on small 63×63 test patches.",
  },
  "5g-noc-root-cause": {
    title: "Finding the root cause when a 5G network fails",
    context: "Team of 8 · 5G Academy, Federico II",
    hook: "One fault sets off alarms across a whole network, and a wrong confident answer is worse than an honest “not sure”. I owned the stage that names the failed element, or answers “investigate” when the evidence is weak.",
    limit: "Simulated networks only; the earlier ranker is a weak baseline on this test set.",
  },
  "pest-forecasting": {
    title: "Forecasting insect catches from weather and trap counts",
    context: "Team of 3 · course project",
    limit: "The only data available was 49 days from 5 traps; once a leaking feature was removed, no model beat simple baselines.",
  },
  "florence2-vqa": {
    title: "A vision-language model that answers questions about images",
    context: "Team of 3 · course project",
    limit: "Only loss was measured; no accuracy score exists.",
  },
  "retail-geospatial": {
    title: "Store potential per resident, by district",
    context: "Team of 4 · Fater S.p.A. challenge",
    limit: "The public map uses synthetic data; the real analysis is not public.",
  },
  "stock-clustering": {
    title: "Stock prices through Kafka, clustered in PySpark",
    context: "Team of 2 · course project",
    limit: "A one-off batch load, and K-means on one stock's 125 days of prices.",
  },
  "oulad-timeseries": {
    title: "Forecasting daily student activity on a learning platform",
    context: "Team of 3 · course project",
    limit: "Only the CNN was scored on the held-out days, and no simple baseline was run.",
  },
  talentsonar: {
    title: "TalentSonar: from a job ad to GitHub candidates",
    context: "24-hour hackathon · team of 2",
    limit: "The candidate ranking was never validated, and years of experience are random placeholders.",
  },
};

export type ResearchItem = {
  key: string; // banners.ts key
  href?: string;
  title: string;
  context: string;
  hook: string;
  limit: string;
};

export const research: ResearchItem[] = [
  {
    key: "preference-shielding-hri",
    href: "/projects/preference-shielding-hri",
    title: "Making a learning robot readable to the person teaching it",
    context: "MSc thesis · PRISCA Lab · supervised by Prof. Silvia Rossi",
    hook: "People teach a learning robot a few movement rules, then watch it learn the same task four times under four setups and say which felt easiest to read and trust.",
    limit: "No results yet; a paper is being written from the study.",
  },
  {
    key: "verilog-paper",
    title: "Code LLMs and the facts a hardware spec leaves out",
    context: "Paper in preparation · with colleagues at the University of Bremen",
    hook: "When a spec does not say whether reset is active-high or active-low, a model writing Verilog has to guess. We measure which missing facts change the hardware it writes.",
    limit: "Results are not public yet.",
  },
  {
    key: "5g-paper",
    title: "Multi-agent reinforcement learning for 5G troubleshooting",
    context: "Just starting · extends the 5G Academy root-cause work",
    hook: "Alarm timestamps mislead root-cause analysis: devices trip at different thresholds and faults spread asynchronously. The idea is to train distributed agents that isolate the root cause from network KPIs, coordinating with their neighbours and an orchestrator.",
    limit: "A research plan: nothing is built or measured yet.",
  },
];

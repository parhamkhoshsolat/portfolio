// One banner recipe for every card: a real visual on the left, the result on the right.
// Every number here comes from the code audit of 15 Nov 2026 (side-session notes, facts-*.md,
// copy-final.md, pest-rerun-20261115.md). Change them together with projects.ts and project-glance.ts.

export type Tone = "live" | "muted" | "amber";
export type BarTone = "ours" | "ref" | "limit";

export type BannerVisual =
  | { kind: "image"; src: string; position?: string }
  | { kind: "tiles"; tiles: { src: string; label: string }[] }
  | { kind: "flow"; steps: { text: string; tone?: "acc" | "amb" }[]; outs: { text: string; tone?: "acc" | "amb" }[] }
  | { kind: "catches"; rows: { label: string; days: string }[]; testFrom: number }
  | { kind: "silhouette"; points: [number, number][]; chosen: number }
  | { kind: "conditions"; items: { name: string; note: string; isNew?: boolean }[] }
  | { kind: "spec" };

export type Banner = {
  visual: BannerVisual;
  source: string; // what the visual is, shown on it
  chip: { tone: Tone; text: string };
  value: string;
  label: string;
  bars?: { label: string; value: number; display: string; tone: BarTone }[];
  barsNote?: string;
  facts?: { text: string; amber?: boolean }[];
  dim?: boolean;
};

const LIVE = { tone: "live" as const, text: "Live demo" };

const FLOW_5G = {
  steps: [{ text: "Alarms · KPIs · network map" }, { text: "Model ranks every candidate cause", tone: "acc" as const }],
  outs: [
    { text: "Rule check confirms", tone: "acc" as const },
    { text: "or: investigate", tone: "amb" as const },
  ],
};

export const banners: Record<string, Banner> = {
  "shielded-lgv-routing": {
    visual: { kind: "image", src: "/banners/lgv.jpg" },
    source: "Live demo screenshot",
    chip: LIVE,
    value: "3.03×",
    label: "greedy throughput for prioritized planning, 15 held-out task streams",
    bars: [
      { label: "Planner", value: 3.03, display: "3.03×", tone: "ours" },
      { label: "Best RL", value: 2.53, display: "2.53×", tone: "ref" },
      { label: "Greedy", value: 1, display: "1×", tone: "ref" },
    ],
  },
  "rl-restore": {
    visual: {
      kind: "tiles",
      tiles: [
        { src: "/banners/rl0.jpg", label: "Damaged 16.1 dB" },
        { src: "/banners/rl1.jpg", label: "Step 2 · 19.3 dB" },
        { src: "/banners/rl2.jpg", label: "Step 3 · 20.1 dB" },
        { src: "/banners/rl3.jpg", label: "Original" },
      ],
    },
    source: "Real agent output, one held-out patch",
    chip: LIVE,
    value: "+2.93 dB",
    label: "mean repair gain, 1,500 held-out test patches",
    bars: [
      { label: "Best tool", value: 2.34, display: "2.34", tone: "ref" },
      { label: "Agent", value: 2.93, display: "2.93", tone: "ours" },
      { label: "One CNN", value: 4.03, display: "4.03", tone: "limit" },
    ],
  },
  "5g-noc-root-cause": {
    visual: { kind: "flow", ...FLOW_5G },
    source: "System outline",
    chip: { tone: "muted", text: "Private code" },
    value: "0 of 710",
    label: "wrong causes sent as act-now, sealed simulated test",
    bars: [
      { label: "Right first", value: 497, display: "497", tone: "ours" },
      { label: "Old ranker", value: 137, display: "137", tone: "ref" },
      { label: "No claim", value: 213, display: "213", tone: "limit" },
    ],
    barsNote: "of 710 single faults",
  },
  "pest-forecasting": {
    visual: {
      kind: "catches",
      rows: [
        { label: "Cicalino 1", days: "0000000010110001100100100000000100000000000000000" },
        { label: "Cicalino 2", days: "0000000000000110001100000000000000000000000000001" },
        { label: "Imola 1", days: "0000000000000000000000000000000000000000001001011" },
        { label: "Imola 2", days: "0000000000000000000000000000000000000000000100000" },
        { label: "Imola 3", days: "0000000000000000000000000000000000000000000001011" },
      ],
      testFrom: 39,
    },
    source: "Catch days by trap, 6 Jul to 23 Aug 2024",
    chip: { tone: "amber", text: "Negative result" },
    value: "0.49",
    label: "AUC once a leaking feature is removed (0.5 = guessing)",
    bars: [
      { label: "Leak", value: 0.92, display: "0.92", tone: "limit" },
      { label: "Fixed", value: 0.49, display: "0.49", tone: "ours" },
      { label: "Chance", value: 0.5, display: "0.50", tone: "ref" },
    ],
  },
  "florence2-vqa": {
    visual: { kind: "image", src: "/banners/florence.jpg", position: "30% center" },
    source: "Training questions, word cloud",
    chip: LIVE,
    value: "0.202",
    label: "validation loss after 3 epochs, 30,000 held-out questions",
    bars: [
      { label: "Epoch 1", value: 0.24, display: "0.240", tone: "ref" },
      { label: "Epoch 2", value: 0.206, display: "0.206", tone: "ref" },
      { label: "Epoch 3", value: 0.202, display: "0.202", tone: "ours" },
    ],
  },
  "retail-geospatial": {
    visual: { kind: "image", src: "/banners/retail.jpg" },
    source: "Choropleth by district",
    chip: { tone: "amber", text: "Synthetic data" },
    value: "Per resident",
    label: "store potential, so large and small districts compare fairly",
    facts: [{ text: "Stores joined to districts by location" }, { text: "Public version runs on synthetic data", amber: true }],
  },
  "stock-clustering": {
    visual: {
      kind: "silhouette",
      points: [[2, 0.69], [3, 0.76], [4, 0.74], [5, 0.69], [6, 0.7], [7, 0.66], [8, 0.63], [9, 0.63], [10, 0.58]],
      chosen: 4,
    },
    source: "Silhouette by K, read off the notebook's plot",
    chip: { tone: "muted", text: "Case study" },
    value: "6,875",
    label: "daily price messages into 55 Kafka topics",
    facts: [{ text: "K = 4 from silhouette and elbow plots" }, { text: "Clustering on one stock; nothing reads the topics", amber: true }],
  },
  "oulad-timeseries": {
    visual: { kind: "image", src: "/banners/oulad.jpg" },
    source: "Daily clicks (log), unusual days in red",
    chip: { tone: "muted", text: "Case study" },
    value: "0.20",
    label: "mean error on log daily clicks, last 20% of days held out",
    facts: [{ text: "1D CNN on 30-day windows" }, { text: "No simple baseline; only the CNN was scored", amber: true }],
  },
  talentsonar: {
    visual: {
      kind: "flow",
      steps: [{ text: "Job ad (PDF, Word)" }, { text: "Gemini extracts skills", tone: "acc" }, { text: "GitHub GraphQL search", tone: "acc" }],
      outs: [{ text: "Real profiles", tone: "acc" }, { text: "Ranking unvalidated", tone: "amb" }],
    },
    source: "System outline",
    chip: { tone: "muted", text: "Hackathon" },
    value: "24 h",
    label: "prototype from job ad to ranked GitHub profiles",
    facts: [{ text: "Parsing and search work" }, { text: "Ranking never checked; some inputs are placeholders", amber: true }],
  },
  // Research cards
  "preference-shielding-hri": {
    visual: {
      kind: "conditions",
      items: [
        { name: "No shield", note: "reference" },
        { name: "Standard shield", note: "from the original paper" },
        { name: "Adaptive shield", note: "new design", isNew: true },
        { name: "Firm or flexible", note: "new design", isNew: true },
      ],
    },
    source: "Study design",
    chip: { tone: "amber", text: "Study running" },
    value: "4",
    label: "setups; every participant sees all four",
    facts: [{ text: "Runs in the browser; the robot narrates each replay" }, { text: "No results yet; paper in preparation", amber: true }],
  },
  "verilog-paper": {
    visual: { kind: "spec" },
    source: "The question, by example",
    chip: { tone: "muted", text: "Paper in prep." },
    value: "Code LLMs",
    label: "what a model writing Verilog guesses when the spec is silent",
    facts: [{ text: "With colleagues at the University of Bremen" }, { text: "Results not public yet", amber: true }],
  },
  "5g-paper": {
    visual: {
      kind: "flow",
      steps: [
        { text: "5G simulator as a PettingZoo environment, KPI states" },
        { text: "Agents per network element + an orchestrator", tone: "acc" },
      ],
      outs: [
        { text: "Reward: fast, correct isolation", tone: "acc" },
        { text: "Penalty: false alarms, extra actions", tone: "amb" },
      ],
    },
    source: "Research plan",
    chip: { tone: "muted", text: "Just starting" },
    value: "MARL",
    label: "multi-agent RL that isolates root causes from network KPIs",
    facts: [
      { text: "Compared with rule-based and LLM approaches" },
      { text: "A plan: nothing built or measured yet", amber: true },
    ],
  },
};

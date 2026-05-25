import { projects } from "@/lib/projects";

const TECH = [
  "PyTorch",
  "HuggingFace Transformers",
  "Florence-2 VLM",
  "Apache Kafka",
  "PySpark MLlib",
  "Random Forest · XGBoost · LightGBM",
  "TensorFlow / Keras (1D CNN)",
  "SARIMA · ARIMAX · Prophet",
  "GeoPandas · Folium",
  "MySQL · PostgreSQL · CTEs · Window functions",
  "Power BI · Tableau",
  "Streamlit · HuggingFace Spaces",
  "Stable-Baselines3 · Bootstrapped DQN",
  "OpenAI CLIP ViT-L/14",
  "FastAPI · React · Docker",
];

function Row({
  items,
  reverse = false,
  speedSeconds = 60,
}: {
  items: string[];
  reverse?: boolean;
  speedSeconds?: number;
}) {
  // Render twice for seamless loop.
  const doubled = [...items, ...items];
  return (
    <div
      className="flex w-max items-center gap-10 whitespace-nowrap text-sm text-muted"
      style={{
        animation: `marquee ${speedSeconds}s linear infinite`,
        animationDirection: reverse ? "reverse" : "normal",
      }}
    >
      {doubled.map((s, i) => (
        <span key={`${s}-${i}`} className="inline-flex items-center gap-3">
          <span className="h-1 w-1 rounded-full bg-accent/60" aria-hidden />
          <span>{s}</span>
        </span>
      ))}
    </div>
  );
}

export function HeroMarquee() {
  const projectTitles = projects.map((p) => p.shortTitle);
  return (
    <div className="relative mt-16 overflow-hidden border-y border-border/30 bg-bg/40 py-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <Row items={projectTitles} speedSeconds={55} />
      <div className="mt-3">
        <Row items={TECH} reverse speedSeconds={70} />
      </div>
    </div>
  );
}

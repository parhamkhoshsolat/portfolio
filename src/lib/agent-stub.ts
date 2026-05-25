import { projects } from "@/lib/projects";
import { siteConfig } from "@/lib/site-config";

// Stub responder that ships with the site until ANTHROPIC_API_KEY is wired.
// Pattern-matches on the question, with hard refusal for personal /
// off-topic / origin questions per the project's content rules.

const BANNED_TOPICS = [
  /\biran\w*/i,
  /\bpersia\w*/i,
  /\btehran\b/i,
  /\bwhere.*from\b/i,
  /\bcountry of origin\b/i,
  /\bage\b/i,
  /\breligion\b/i,
  /\bmarried\b/i,
  /\bmarital\b/i,
  /\bethnic\w*/i,
];

const ITALIAN_LANGUAGE_PATTERNS = [/italian.{0,15}(speak|language|fluent)/i, /speak.*italian/i];

const OFFTOPIC_PATTERNS = [
  /\bpizza\b/i,
  /\bjoke\b/i,
  /weather/i,
  /\bcapital of\b/i,
  /\bwrite.*poem\b/i,
];

function refusal(reason: "personal" | "offtopic" | "italian"): string {
  if (reason === "personal") {
    return "I keep this conversation to Parham's professional work. Happy to talk through any of his projects, his target roles, or how to get in touch.";
  }
  if (reason === "italian") {
    return "Parham communicates professionally in English; further language details are best discussed in interview. Anything else about his work I can help with?";
  }
  return "I'm here to talk about Parham's work, not that. Want a quick summary of his strongest project, or his availability?";
}

export function generateStubAnswer(raw: string): string {
  const q = raw.toLowerCase().trim();

  // Hard guardrails first.
  if (BANNED_TOPICS.some((rx) => rx.test(raw))) return refusal("personal");
  if (ITALIAN_LANGUAGE_PATTERNS.some((rx) => rx.test(raw))) return refusal("italian");
  if (OFFTOPIC_PATTERNS.some((rx) => rx.test(raw))) return refusal("offtopic");

  // Project lookups.
  if (/florence|vqa|vision.?language|vlm/.test(q)) {
    const p = projects.find((x) => x.slug === "florence2-vqa")!;
    return `${p.tagline} Training cross-entropy fell from 0.307 to 0.111 over 3 epochs on a Colab T4. Live demo on the Florence-2 project page.`;
  }
  if (/kafka|stream|spark|cluster|stock/.test(q)) {
    const p = projects.find((x) => x.slug === "stock-clustering")!;
    return `${p.tagline} Kafka streamed daily OHLCV data across 55 per-ticker topics; PySpark MLlib pipeline picked K=4 by combining Silhouette, Elbow, and 2D PCA.`;
  }
  if (/talent|github|gemini|llm api|recruit/.test(q)) {
    const p = projects.find((x) => x.slug === "talentsonar")!;
    return `${p.tagline} Test scoring is currently mock; LLM-evaluated scoring is the next iteration.`;
  }
  if (/pest|forecast|random forest|imbalance/.test(q)) {
    const p = projects.find((x) => x.slug === "pest-forecasting")!;
    return `${p.tagline} 11-model tournament under TimeSeriesSplit CV. Random Forest hit recall 1.00 on the 9-sample minority class against a 10.67:1 imbalance.`;
  }
  if (/oulad|cnn|time.?series|sarima|prophet/.test(q)) {
    const p = projects.find((x) => x.slug === "oulad-timeseries")!;
    return `${p.tagline} CNN won by a thin margin on MAE; SARIMA kept as the interpretable baseline.`;
  }
  if (/fater|geospatial|map|sql|choropleth|p&g|procter/.test(q)) {
    const p = projects.find((x) => x.slug === "retail-geospatial")!;
    return `${p.tagline} Presented solo to Fater leadership; jury picked the work for individual recognition.`;
  }

  // Profile-level questions.
  if (/strong|best|favourite|favorite|showpiece|impressive/.test(q)) {
    return "Florence-2 is the AI showpiece (fine-tuned a 771M-parameter VLM end to end and shipped it live), and the Fater geospatial project is the BI showpiece (SQL + GeoPandas + a solo executive presentation that won jury recognition). Pick by audience.";
  }
  if (/hire|fit|why.*him|reason/.test(q)) {
    return "Parham ships end to end: he fine-tuned a 771M-parameter VLM, built a Kafka + PySpark pipeline, ran an 11-model ML tournament, and presented a geospatial analysis solo to a P&G joint-venture's leadership. Strong in SQL, Python, PyTorch, and dashboards, and clearly available with no relocation needed in Italy.";
  }
  if (/naples|locat|relocat|based|onsite|on-site/.test(q)) {
    return "Yes, Parham is based in Naples, Italy. No relocation needed for Italian roles; open to remote across the EU.";
  }
  if (/avail|start|notice|graduat|when can/.test(q)) {
    return `${siteConfig.availability}`;
  }
  if (/rag|agent|llm|claude|haiku/.test(q)) {
    return "Parham has shipped LLM work in TalentSonar (Gemini API + GitHub GraphQL) and the Florence-2 VLM fine-tune. This very agent (grounded in his project memory) is a third example you can play with right now.";
  }
  if (/contact|email|reach|call|book/.test(q)) {
    return `Reach Parham on LinkedIn: ${siteConfig.links.linkedin}. Or download this conversation via the icon at the top of the chat and follow up later.`;
  }
  if (/cv|resume|pdf/.test(q)) {
    return "His latest CV is available on request, or he can send a role-tailored version. Drop a note to " + siteConfig.contact.email + ".";
  }
  if (/skill|stack|tech|tool/.test(q)) {
    return "Strongest in Python, SQL (CTEs, window functions, query optimisation), PyTorch, HuggingFace Transformers, Scikit-learn, Apache Kafka, PySpark, GeoPandas, and Power BI / Tableau. Comfortable shipping with Streamlit and HuggingFace Spaces.";
  }
  if (/thesis|research/.test(q)) {
    return "Master's thesis (in progress): human-robot interaction with reinforcement learning, at Federico II.";
  }
  if (/education|degree|university|federico|gpa|grade/.test(q)) {
    return "MSc Data Science at the University of Naples Federico II (Sept 2023 to Oct 2026 expected). GPA 28.3/30 with three 30/30 e lode results. BSc in Information Technology Engineering before that.";
  }

  // Catch-all.
  return "I can answer questions about Parham's six shipped projects, his target roles, his availability, or how to get in touch. Try asking about Florence-2, the Kafka pipeline, or his strongest project.";
}

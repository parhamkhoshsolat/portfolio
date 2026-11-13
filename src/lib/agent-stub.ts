import { projects } from "@/lib/projects";
import { siteConfig } from "@/lib/site-config";

// Stub responder that ships with the site until ANTHROPIC_API_KEY is wired.
// Pattern-matches on the question, with a polite refusal for personal and
// off-topic questions.

const BANNED_TOPICS = [
  /\bnationalit\w*/i,
  /\bcitizen\w*/i,
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
    return `${p.tagline} Final validation loss 0.202 after 3 epochs; no accuracy metric was computed. Live demo on the Florence-2 project page.`;
  }
  if (/kafka|stream|spark|cluster|stock/.test(q)) {
    const p = projects.find((x) => x.slug === "stock-clustering")!;
    return `${p.tagline} Kafka ingestion is a batch backfill that nothing consumes, and the K-means stage ran separately on one ticker's prices.`;
  }
  if (/talent|github|gemini|llm api|recruit/.test(q)) {
    const p = projects.find((x) => x.slug === "talentsonar")!;
    return `${p.tagline} Candidate scoring is mock, and the Gemini-powered interview panel was not finished.`;
  }
  if (/pest|forecast|random forest|imbalance/.test(q)) {
    const p = projects.find((x) => x.slug === "pest-forecasting")!;
    return `${p.tagline} Eight model families under TimeSeriesSplit CV. Random Forest reached AUC about 0.92 and recall 1.00 on 9 catch days in a 49-day hold-out (10.67:1 imbalance overall).`;
  }
  if (/oulad|cnn|time.?series|sarima|prophet/.test(q)) {
    const p = projects.find((x) => x.slug === "oulad-timeseries")!;
    return `${p.tagline} The statistical models were not scored on the same hold-out, so no winner is claimed.`;
  }
  if (/fater|geospatial|map|sql|choropleth|p&g|procter/.test(q)) {
    const p = projects.find((x) => x.slug === "retail-geospatial")!;
    return `${p.tagline} Four-person university team; the public repo reruns the method on synthetic data.`;
  }

  // Profile-level questions.
  if (/strong|best|favourite|favorite|showpiece|impressive/.test(q)) {
    return "The two strongest are solo reinforcement-learning projects: Shielded LGV Routing (nine routing methods under one collision shield, evaluated over 5 seeds and 15 held-out layouts) and RL-Restore (a CVPR 2018 reimplementation extended with the paper's unreleased joint fine-tuning).";
  }
  if (/hire|fit|why.*him|reason/.test(q)) {
    return "Parham builds end to end: three years on the scoring and recommendation engine of a live influencer platform, two solo reinforcement-learning projects with careful multi-seed evaluation, and a full fine-tune of a 230M-parameter vision-language model deployed as a live demo.";
  }
  if (/naples|locat|relocat|based|onsite|on-site/.test(q)) {
    return "Parham is based in Naples, Italy. He is open to roles and PhD positions; for location details, message him on LinkedIn.";
  }
  if (/avail|start|notice|graduat|when can/.test(q)) {
    return `${siteConfig.availability}`;
  }
  if (/rag|agent|llm|claude|haiku/.test(q)) {
    return "Parham's LLM-related work: the Florence-2 vision-language fine-tune, and TalentSonar, a hackathon prototype that uses the Gemini API to parse job descriptions. This chat agent is a third example.";
  }
  if (/contact|email|reach|call|book/.test(q)) {
    return `Reach Parham on LinkedIn: ${siteConfig.links.linkedin}. Or download this conversation via the icon at the top of the chat and follow up later.`;
  }
  if (/cv|resume|pdf/.test(q)) {
    return "His latest CV is available on request, or he can send a role-tailored version. Drop a note to " + siteConfig.contact.email + ".";
  }
  if (/skill|stack|tech|tool/.test(q)) {
    return "Strongest in Python, PyTorch, reinforcement learning, HuggingFace Transformers, Scikit-learn, SQL, Apache Kafka, PySpark, and GeoPandas. Comfortable shipping with FastAPI, React, Docker, Streamlit, and HuggingFace Spaces.";
  }
  if (/thesis|research/.test(q)) {
    return "Master's thesis (in progress): human-robot interaction with reinforcement learning, at Federico II.";
  }
  if (/education|degree|university|federico|gpa|grade/.test(q)) {
    return "MSc Data Science at the University of Naples Federico II (September 2023 to December 2026). Weighted average 28.67/30, with four exams at 30 e lode. BSc in Information Technology Engineering before that.";
  }

  // Catch-all.
  return "I can answer questions about Parham's nine projects, his target roles, his availability, or how to get in touch. Try asking about Florence-2, the Kafka pipeline, or his strongest project.";
}

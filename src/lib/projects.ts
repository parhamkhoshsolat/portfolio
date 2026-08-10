export type ProjectStatus = "live-demo" | "case-study";

export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  summary: string;
  year: string;
  team: string;
  grade?: string;
  techStack: string[];
  skillKeywords: string[];
  repoUrl: string;
  liveUrl?: string;
  heroStat: { label: string; value: string };
  status: ProjectStatus;
};

export const projects: Project[] = [
  {
    slug: "retail-geospatial",
    title: "Retail Geospatial Analytics: Fater S.p.A. Industry Challenge",
    shortTitle: "Fater Geospatial",
    tagline:
      "I joined Fater proprietary sales with ISTAT census in MySQL and ranked districts by per-capita store potential. I presented the work solo to Fater leadership.",
    summary:
      "Industry challenge with Fater S.p.A. (Procter & Gamble joint venture). We combined proprietary sales records with ISTAT sociodemographic census data across 20 administrative microcode districts using SQL CTEs, joins, and window functions. A GeoPandas spatial-join pipeline (point-in-polygon, EPSG:4326) attached each store to its district. I presented the Folium choropleth dashboards solo to Fater leadership, and the jury picked the work for individual recognition.",
    year: "2024",
    team: "4-person team; presented solo",
    techStack: [
      "MySQL",
      "SQL (CTEs, window functions)",
      "Python",
      "GeoPandas",
      "Folium",
      "Scikit-learn",
    ],
    skillKeywords: [
      "SQL",
      "MySQL",
      "geospatial",
      "GeoPandas",
      "choropleth",
      "stakeholder presentation",
      "FMCG",
      "retail",
    ],
    repoUrl: "https://github.com/parhamkhoshsolat/retail-geospatial-analytics",
    heroStat: { label: "Recognition", value: "Jury pick" },
    status: "case-study",
  },
  {
    slug: "shielded-lgv-routing",
    title: "Shielded LGV Routing: Multi-Method Path Planning for Six Laser-Guided Vehicles",
    shortTitle: "Shielded LGV Routing",
    tagline:
      "I shipped a live 3D demo where six laser-guided vehicles navigate a warehouse via six methods (classical + RL) under a PIBT collision shield that makes crashes structurally impossible.",
    summary:
      "Six LGVs are routed by three classical planners (greedy, prioritized, CBS) and three learned policies (RL, Bayes-DQN, hybrid). All six share the same PIBT collision shield, so safety is decoupled from the planner choice and the comparison is apples-to-apples. Workers walk the aisles; every method navigates around them without retraining. Python simulation server, WebSocket streaming to a live web client, switchable methods, reconfigurable warehouse layouts. Team of 2.",
    year: "2026",
    team: "2-person team",
    techStack: [
      "Python",
      "PyTorch",
      "Bayes-DQN",
      "Conflict-Based Search (CBS)",
      "PIBT collision shield",
      "WebSocket streaming",
      "Docker",
      "rliable + Bayesian BEST",
    ],
    skillKeywords: [
      "multi-agent RL",
      "path planning",
      "safety shielding",
      "PIBT",
      "CBS",
      "Bayesian DQN",
      "warehouse robotics",
      "live demo",
    ],
    repoUrl: "https://huggingface.co/spaces/parhamkhoshsolat/shielded-lgv-routing/tree/main",
    liveUrl: "https://parhamkhoshsolat-shielded-lgv-routing.hf.space",
    heroStat: { label: "Methods compared", value: "6" },
    status: "live-demo",
  },
  {
    slug: "florence2-vqa",
    title: "Florence-2 Fine-Tuning for Visual Question Answering",
    shortTitle: "Florence-2 VQA",
    tagline:
      "I fine-tuned a 230M-parameter vision-language model on 60,000 image-question pairs and shipped it live on HuggingFace Spaces.",
    summary:
      "I benchmarked three VLM architectures (PaliGemma 3B, BLIP, Florence-2) and picked Florence-2 for stable training on a Colab T4. Cross-entropy fell 0.307 to 0.111 over 3 epochs. The Streamlit serving layer ships with beam-search controls and per-answer confidence scores. Team of 3 at Federico II.",
    year: "2025",
    team: "3-person team at Federico II",
    grade: "Top mark · Honours",
    techStack: [
      "PyTorch",
      "HuggingFace Transformers",
      "Florence-2",
      "AdamW",
      "Streamlit",
      "HuggingFace Spaces",
      "Google Colab T4",
    ],
    skillKeywords: [
      "fine-tuning",
      "vision-language",
      "VQA",
      "deep learning",
      "transfer learning",
      "computer vision",
      "model serving",
    ],
    repoUrl: "https://github.com/parhamkhoshsolat/florence2-vqa",
    liveUrl: "https://parhamkhoshsolat-florence-2-vqa.hf.space",
    heroStat: { label: "Full fine-tune", value: "230M VLM" },
    status: "live-demo",
  },
  {
    slug: "rl-restore",
    title: "RL-Restore: A Reinforcement-Learning Toolchain for Image Restoration",
    shortTitle: "RL-Restore",
    tagline:
      "I reimplemented a CVPR 2018 paper where a deep-RL agent repairs photos by chaining small specialist CNNs, then extended it with baselines, the paper's unreleased fine-tuning, a generative finisher, and a live web app that shows every step.",
    summary:
      "Real photos arrive with a mix of blur, noise, and JPEG artifacts at unknown strengths, and no single filter fixes all three. The system trains 12 small specialist CNNs and a DQN+LSTM agent that reads a 63x63 crop, picks a chain of up to 3 tools, applies them in order to the full image, and stops when the photo is good enough. On held-out DIV2K the agent reaches about 90% of the greedy-oracle ceiling and nearly doubles the best single tool (+2.93 dB vs +2.34). The honest finding: a single end-to-end CNN of the same size scores higher on raw PSNR (+4.03), so the toolchain's value is interpretability, modularity, and per-image adaptivity, not peak fidelity. I added the joint fine-tuning the paper never released (which lifts the agent to +3.67), a generative Real-ESRGAN finisher, and a FastAPI + React demo. Solo course project, about 200 tests.",
    year: "2026",
    team: "Solo project",
    techStack: [
      "Python",
      "PyTorch",
      "DQN + LSTM",
      "CNN",
      "Real-ESRGAN",
      "FastAPI",
      "React + TypeScript",
      "Docker",
    ],
    skillKeywords: [
      "deep RL",
      "image restoration",
      "DQN",
      "LSTM",
      "paper reimplementation",
      "computer vision",
      "Real-ESRGAN",
      "web app",
    ],
    repoUrl: "https://github.com/parhamkhoshsolat/rl-restore",
    liveUrl: "https://parhamkhoshsolat-rl-restore.hf.space",
    heroStat: { label: "Specialist CNN tools", value: "12" },
    status: "live-demo",
  },
  {
    slug: "stock-clustering",
    title: "Real-Time Equity Streaming and Clustering Pipeline",
    shortTitle: "Stock Clustering Pipeline",
    tagline:
      "I built an Apache Kafka + PySpark MLlib pipeline streaming daily OHLCV across 55 per-ticker topics, then clustered with KMeans and PCA.",
    summary:
      "I bootstrapped a single-broker Kafka 3.3.1 + Zookeeper cluster from a notebook. A KafkaProducer streamed daily OHLCV data (April to September 2023, yfinance) into 55 per-ticker topics for the US large-cap universe. The PySpark MLlib pipeline went VectorAssembler → KMeans (seed=1) → PCA (k=2) → ClusteringEvaluator, and I picked K=4 by combining Silhouette, Elbow, and 2D PCA across K in [2, 10]. Team of 2.",
    year: "2024",
    team: "2-person team",
    grade: "Top mark · Honours",
    techStack: [
      "Apache Kafka 3.3.1",
      "Zookeeper",
      "PySpark MLlib",
      "Scikit-learn",
      "KMeans",
      "PCA",
      "yfinance",
    ],
    skillKeywords: [
      "kafka",
      "pyspark",
      "streaming",
      "clustering",
      "kmeans",
      "pca",
      "data engineering",
      "real-time",
    ],
    repoUrl: "https://github.com/parhamkhoshsolat/stock-clustering-pipeline",
    heroStat: { label: "Streaming topics", value: "55" },
    status: "case-study",
  },
  {
    slug: "talentsonar",
    title: "TalentSonar: Developer-Skill Inference from GitHub",
    shortTitle: "TalentSonar",
    tagline:
      "I built a GitHub GraphQL extractor feeding a Gemini LLM that infers technical skills, project archetypes, and seniority signal for any handle.",
    summary:
      "TalentSonar pulls public-repo metadata, commit history, and language breakdowns via the GitHub GraphQL API, then passes structured features to Google Gemini for skill inference. I shipped a Streamlit candidate-scoring view with a CSS-only anti-cheat layer and downloadable PDF report. Test scoring is currently mock; LLM-evaluated scoring is the next iteration. Team of 2.",
    year: "2025",
    team: "2-person team",
    techStack: [
      "Python",
      "GitHub GraphQL API",
      "Google Gemini API",
      "Streamlit",
      "NLP",
      "PDF reporting",
    ],
    skillKeywords: [
      "LLM",
      "Gemini",
      "GraphQL",
      "API integration",
      "NLP",
      "prompt engineering",
    ],
    repoUrl: "https://github.com/parhamkhoshsolat/TalentSonar",
    liveUrl: "https://parhamkhoshsolat-talentsonar.hf.space",
    heroStat: { label: "Data source", value: "GitHub GraphQL" },
    status: "live-demo",
  },
  {
    slug: "pest-forecasting",
    title: "Multi-Source Sensor ML Pipeline: Pest Population Forecasting",
    shortTitle: "Pest Forecasting",
    tagline:
      "I ran a tournament of eight model families across regression and classification; Random Forest reached F1 0.667 and recall 1.00 on a heavily imbalanced minority class.",
    summary:
      "I cleaned and merged 245 daily samples across 5 monitoring sites (meteorological + entomological), then engineered lag, 3-day rolling-mean, recency, and calendar features. The tournament covered 6 regressors (ARIMAX, SARIMAX, Prophet, RandomForest, XGBoost, LightGBM) and 5 classifiers (RF, XGB, LGB, LSTM, GRU) under TimeSeriesSplit CV. Random Forest won both: regression test MAE 0.34 vs ARIMAX baseline 2.00; classification F1 0.667 / AUC 0.919, recall 1.00 on the 9-sample minority class against a 10.67:1 imbalance. Team of 3.",
    year: "2025",
    team: "3-person team",
    grade: "Top mark · Honours",
    techStack: [
      "Python",
      "Scikit-learn",
      "XGBoost",
      "LightGBM",
      "Statsmodels",
      "Prophet",
      "TensorFlow/Keras",
      "Streamlit",
    ],
    skillKeywords: [
      "random forest",
      "time series",
      "forecasting",
      "classification",
      "imbalanced",
      "feature engineering",
      "deployment",
    ],
    repoUrl: "https://github.com/parhamkhoshsolat/pest-population-forecasting",
    liveUrl: "https://parhamkhoshsolat-pest-prediction-dashboard.hf.space",
    heroStat: { label: "Minority-class recall", value: "1.00" },
    status: "live-demo",
  },
  {
    slug: "oulad-timeseries",
    title: "Educational Analytics: OULAD Click-Stream Forecasting",
    shortTitle: "OULAD Time Series",
    tagline:
      "I trained a custom 1D CNN that edged out SARIMA, ARIMAX, and Prophet on the Open University click-stream forecast (MAE 0.199, MAPE 1.9%).",
    summary:
      "I aggregated the 420 MB OULAD dataset to 808 daily observations, then engineered 7 lag features for the statistical models and a 30-lag input window for the CNN. The CNN narrowly beat Prophet on MAE (0.199 vs 0.203) and MAPE (1.9%). I kept SARIMA in the comparison as an interpretable seasonal baseline for academic staff without an ML background.",
    year: "2025",
    team: "Solo project",
    grade: "Top mark · Honours",
    techStack: [
      "Python",
      "TensorFlow/Keras",
      "SARIMA",
      "ARIMAX",
      "Prophet",
      "Pandas",
      "Streamlit",
    ],
    skillKeywords: [
      "time series",
      "forecasting",
      "SARIMA",
      "Prophet",
      "1D CNN",
      "TensorFlow",
      "Keras",
    ],
    repoUrl: "https://github.com/parhamkhoshsolat/time-series-OULAD",
    heroStat: { label: "CNN test MAPE", value: "1.9%" },
    status: "case-study",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

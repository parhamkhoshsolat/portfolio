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
  repoUrl?: string;
  liveUrl?: string;
  heroStat: { label: string; value: string };
  status: ProjectStatus;
};

export const projects: Project[] = [
  {
    slug: "5g-noc-root-cause",
    title: "Root-Cause Analysis for a 5G Network Operations Centre",
    shortTitle: "5G NOC Root-Cause Analysis",
    tagline:
      "I owned root-cause analysis in an 8-person 5G Academy proof of concept: a ranker proposes the likely faulty element from alarms, KPIs and topology, and a rule-based verifier checks it before it is shown.",
    summary:
      "Final project of the 5G Academy postgraduate programme at Federico II: an AI-assisted network operations centre built by an 8-person team, where I owned the root-cause analysis component. Given correlated alarms, KPI time series and the network topology, a ranker proposes the likely faulty element, and a rule-based verifier checks the proposal against the evidence before it is shown, so a weak guess is flagged instead of claimed. Tested on held-out fault scenarios on simulated networks of 12 to 180 nodes. The code lives in the team's private repository, so there is no public source or demo.",
    year: "2026",
    team: "Team project (8 people); I owned the RCA component",
    techStack: ["Python", "LightGBM", "NetworkX", "pandas"],
    skillKeywords: [
      "root-cause analysis",
      "5G",
      "network operations",
      "alarm correlation",
      "LightGBM",
      "graph",
      "verification",
    ],
    heroStat: { label: "Nodes per simulated network", value: "12‑180" },
    status: "case-study",
  },
  {
    slug: "retail-geospatial",
    title: "Retail Geospatial Analytics: Fater S.p.A. Industry Challenge",
    shortTitle: "Fater Geospatial",
    tagline:
      "A four-person university team on a Fater S.p.A. challenge: we mapped stores to census districts and compared districts by store potential per resident. I did the statistics and analysis part.",
    summary:
      "Course-linked industry challenge with Fater S.p.A. (Procter & Gamble and Angelini joint venture), in the Statistical Learning and Data Analysis course at Federico II. A GeoPandas spatial join (point-in-polygon, EPSG:4326) attached each store to its census district; we aggregated store counts and Fater's per-store potential score by district and divided by population to compare districts of different sizes. Output: a choropleth of potential per resident plus Folium maps of stores and districts. The public repo reruns the method on synthetic data. Team of 4: Shayan Ekramnia, Farshad Farahtaj, Sara Aboudarda and me.",
    year: "2024",
    team: "4-person university team; I did the statistics and analysis",
    techStack: [
      "Python",
      "Pandas",
      "GeoPandas",
      "Folium",
      "Matplotlib",
      "MySQL",
    ],
    skillKeywords: [
      "SQL",
      "MySQL",
      "geospatial",
      "GeoPandas",
      "choropleth",
      "FMCG",
      "retail",
    ],
    repoUrl: "https://github.com/parhamkhoshsolat/retail-geospatial-analytics",
    heroStat: { label: "Store-potential metric", value: "Per capita" },
    status: "case-study",
  },
  {
    slug: "shielded-lgv-routing",
    title: "Shielded LGV Routing: Classical Planning vs Reinforcement Learning for Warehouse Vehicles",
    shortTitle: "Shielded LGV Routing",
    tagline:
      "I built a warehouse simulator where six laser-guided vehicles are routed by nine methods, classical planners and reinforcement learning, all under the same PIBT-inspired collision shield. Collisions stay at zero, so the methods compete on throughput alone. The classical planners won.",
    summary:
      "Nine methods share one simulator and one safety layer: greedy, prioritized planning (WHCA*), Conflict-Based Search, a hybrid where a small network trained with REINFORCE picks the planning order, a randomized-prior bootstrapped DQN with a demonstration warm start, PPO, MAPPO, A2C and behaviour cloning. A priority-ordered shield inspired by PIBT checks every joint move, and a runtime assertion confirms zero collisions at every step. Evaluated over 5 seeds on 15 held-out layouts with IQM and bootstrap confidence intervals: prioritized planning reached 3.03x greedy throughput, CBS 3.01x, the hybrid 3.00x, and the bootstrapped DQN 2.53x, the best end-to-end learned policy. Live 3D demo with a Python server streaming to a web client. Solo course project (Advanced Statistical Learning and Modeling).",
    year: "2026",
    team: "Solo project",
    techStack: [
      "Python",
      "PyTorch",
      "Bootstrapped DQN",
      "Conflict-Based Search (CBS)",
      "PIBT-inspired collision shield",
      "WebSocket streaming",
      "Docker",
      "IQM + bootstrap CIs",
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
    heroStat: { label: "Methods compared", value: "9" },
    status: "live-demo",
  },
  {
    slug: "florence2-vqa",
    title: "Florence-2 Fine-Tuning for Visual Question Answering",
    shortTitle: "Florence-2 VQA",
    tagline:
      "I fine-tuned a 230M-parameter vision-language model on 60,000 image-question pairs and shipped it live on HuggingFace Spaces.",
    summary:
      "Full fine-tune of Florence-2-base-ft (about 230M parameters, no frozen layers) on 60,000 open-ended question-answer pairs from VQA v2.0 Abstract Scenes: 3 epochs, AdamW at lr 1e-5, batch 8, on Colab. PaliGemma 3B ran out of GPU memory and BLIP did not train stably, so Florence-2 was kept. Final validation loss 0.202; no accuracy metric was computed, answers were checked by hand. Served as a Streamlit app on HuggingFace Spaces with beam search and per-answer confidence. University team project (Data Mining and Machine Learning, Federico II) with Zahra Jafarinejad and Farshad Farahtaj; I built the full pipeline.",
    year: "2025",
    team: "University team project (3 people); I built the full pipeline",
    techStack: [
      "PyTorch",
      "HuggingFace Transformers",
      "Florence-2",
      "AdamW",
      "Streamlit",
      "HuggingFace Spaces",
      "Google Colab",
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
    title: "Kafka Ingestion and PySpark Clustering of Stock Prices",
    shortTitle: "Stock Clustering Pipeline",
    tagline:
      "Kafka ingestion of six months of daily prices into 55 per-ticker topics, plus a separate PySpark MLlib K-means stage on one ticker's price series.",
    summary:
      "A single-broker Kafka 3.3.1 + Zookeeper setup, started from a notebook. Producers sent daily OHLCV data (April to September 2023, yfinance) for 55 US tickers into one topic per ticker: 6,875 messages (55 tickers x 125 trading days). This is a batch backfill: nothing consumes the topics, and Spark does not read from Kafka. Separately, PySpark MLlib (local mode) ran K-means on one ticker's daily prices, with K=4 chosen from silhouette and elbow plots; PCA was used only to plot the clusters. University team project (Hardware and Software for Big Data, Federico II) with Farshad Farahtaj; I built the full pipeline.",
    year: "2024",
    team: "University team project (2 people); I built the full pipeline",
    techStack: [
      "Apache Kafka 3.3.1",
      "Zookeeper",
      "PySpark MLlib",
      "KMeans",
      "PCA",
      "yfinance",
    ],
    skillKeywords: [
      "kafka",
      "pyspark",
      "clustering",
      "kmeans",
      "pca",
      "data engineering",
    ],
    repoUrl: "https://github.com/parhamkhoshsolat/stock-clustering-pipeline",
    heroStat: { label: "Kafka topics", value: "55" },
    status: "case-study",
  },
  {
    slug: "talentsonar",
    title: "TalentSonar: From Job Descriptions to GitHub Candidates",
    shortTitle: "TalentSonar",
    tagline:
      "A 24-hour hackathon prototype: Gemini parses a job description into structured requirements, and the GitHub GraphQL API finds real candidates who match.",
    summary:
      "An HR user uploads a job description (PDF, Word, or markdown); Gemini extracts the required skills and experience; the skills drive a GitHub GraphQL search that returns real public profiles, shown in a Streamlit HR dashboard with optional candidate questionnaires. Candidate match scores are mock and years of experience are random placeholders, so there is no real scoring, and the Gemini-powered HR interview panel was not finished. Hackathon project with Amirhosein Shahdadian.",
    year: "2025",
    team: "2-person hackathon team",
    techStack: [
      "Python",
      "Google Gemini API",
      "GitHub GraphQL API",
      "Streamlit",
      "PyPDF2 + python-docx",
      "Pydantic",
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
    heroStat: { label: "Candidate source", value: "GitHub GraphQL" },
    status: "case-study",
  },
  {
    slug: "pest-forecasting",
    title: "Multi-Source Sensor ML Pipeline: Pest Population Forecasting",
    shortTitle: "Pest Forecasting",
    tagline:
      "I ran a tournament of eight model families across regression and classification; Random Forest reached F1 0.667 and recall 1.00 on a heavily imbalanced minority class.",
    summary:
      "245 daily samples across 5 monitoring sites over 7 weeks (weather plus insect catches), with lag, 3-day rolling-mean, recency, and calendar features. 6 regressors (ARIMAX, SARIMAX, Prophet, RandomForest, XGBoost, LightGBM) and 5 classifiers (RF, XGB, LGB, LSTM, GRU) under TimeSeriesSplit CV, with a chronological hold-out. Best classifier: Random Forest, AUC about 0.92 and recall 1.00 at precision 0.5 on a 49-day hold-out with 9 catch days (target imbalance 10.67:1). Out-of-sample regression is weak (test R² 0.35), and the deep models were close to chance. University team project (Information Systems and Business Intelligence, Federico II) with Giovanni Montanile and Farshad Farahtaj; I built the full pipeline.",
    year: "2025",
    team: "University team project (3 people); I built the full pipeline",
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
      "Forecasting daily student activity on the Open University learning platform with SARIMA, ARIMAX, Prophet and a custom 1D CNN. The CNN reached MAE 0.20 on log-scale clicks on a chronological hold-out.",
    summary:
      "The 420 MB OULAD click-stream was aggregated to 808 daily totals and log-transformed, with 7 lag features for the statistical models and a 30-day input window for the CNN. The CNN scored MAE 0.20 on log clicks on a chronological hold-out. The statistical models were not scored on the same hold-out, so this is not a like-for-like ranking. University team project (Hardware and Software for Big Data, Federico II, July 2024) with Farshad Farahtaj and Zahra Jafarinejad; I built the full pipeline.",
    year: "2024",
    team: "University team project (3 people); I built the full pipeline",
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
    heroStat: { label: "CNN hold-out MAE (log clicks)", value: "0.20" },
    status: "case-study",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

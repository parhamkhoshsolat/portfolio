# Portfolio website project brief — Parham Khosh Solat
## For Claude Code handoff — paste this as the FIRST message in a new Claude Code session.

This document is self-contained. By the end of reading it you should have everything you need to build the site. Don't ask "who is Parham" or "what projects" — it's all here.

---

## 0. The bottom line

Build a personal portfolio site for Parham Khosh Solat (Italian-resident MSc Data Science student graduating Oct 2026), targeting recruiters at Italian and EU tech / data / AI companies. The site has six interactive project demos and a working AI agent that answers recruiter questions about Parham's work. Deploy to Vercel under `parhamkhoshsolat.com` (or `.dev`).

The bar: a recruiter spending 90 seconds on the site should think "this person ships things, knows AI engineering, and the agent demo is itself a piece of work I want to ask about in the interview."

---

## 1. Who Parham is — bio facts (use as ground truth)

- **Legal name:** Seyyedalireza Khosh Solat. **Preferred name everywhere:** Parham Khosh Solat.
- **Education:** MSc Data Science, University of Naples Federico II (Sept 2023 – Oct 2026 expected). GPA 28.3/30 with three 30/30 e lode. Thesis in progress: human-robot interaction + reinforcement learning.
- **Previous degree:** BSc Information Technology Engineering, Amol University.
- **Location:** Naples, Italy. Available on-site, hybrid, or remote across the EU.
- **Languages:** English C1 full professional. (Do NOT mention Italian language gap anywhere on the site — see §6 standing rules.)
- **Contact:**
  - Email: `parhamkhoshsolat@gmail.com`
  - Phone: `+39 351 333 8398`
  - LinkedIn: `linkedin.com/in/parham-khoshsolat`
  - GitHub: `github.com/parhamkhoshsolat`
  - HuggingFace: `huggingface.co/parhamkhoshsolat`
- **Target roles (priority order):** Data Analyst (55–65% of applications), Data Scientist (20–30%), ML Engineer (10–15%). Also open to: BI Developer, Data Engineer, AI Engineer, AI/Business Analyst Internship.
- **Why now:** graduating soon, actively applying. Visa context: he's on an Italian student permit; family permit deadline Aug-Sep 2026 means signed contract by Oct 2026 is preferred.

---

## 2. Tech stack — locked. Do not deviate without asking.

```
Framework:    Next.js 14 (App Router) + TypeScript + Tailwind CSS
UI library:   shadcn/ui (install components via `npx shadcn@latest add <name>`)
Animation:    Framer Motion (subtle — see §7 design rules)
Charts:       Recharts (interactive React-native charts)
Maps:         Leaflet via react-leaflet (for Fater geospatial demo)
3D (opt):     Three.js + @react-three/fiber if you want a hero element
AI agent:     Anthropic Claude Haiku via @anthropic-ai/sdk
Chat UI:      Vercel AI SDK (@ai-sdk/anthropic + ai/react)
RAG storage:  Vercel Postgres + pgvector OR in-memory (start in-memory, migrate if needed)
Deployment:   Vercel free tier + custom domain (parhamkhoshsolat.com or .dev)
Analytics:    Vercel Analytics (free tier)
```

**Why these choices:**
- Next.js: industry default for portfolios + Vercel deploys in one click + supports the API route Parham needs for the agent.
- shadcn/ui: not a dependency, components are copied into the repo — full ownership, easy to customize.
- Framer Motion: subtle scroll-triggered fades and page transitions. Not "spinning logos."
- Claude Haiku: best quality-to-cost for the agent. About $0.001 per question.
- Vercel: free SSL, free domain integration, automatic deploys on git push, generous free tier.

**Files to create at project root:**
- `.env.local` with `ANTHROPIC_API_KEY=sk-ant-...` (Parham gets this from console.anthropic.com, $5 free credit on signup)
- `vercel.json` for any custom routing if needed

---

## 3. Page structure

```
/                  Home — hero + projects grid + AI agent at bottom (sticky chat)
/projects/[slug]   Per-project deep page with interactive demo
/cv                Embedded CV PDF + download button
/about             Short bio, what he's looking for, contact links
```

The AI agent chat should be **persistent across pages** — sticky chat bubble in bottom-right that opens to a panel.

---

## 4. The six projects — ground truth + presentation strategy

### Project order on the home page (most JD-relevant first):
1. **Florence-2 VQA** (AI showpiece — proves LLM/VLM fine-tuning skill)
2. **Stock Clustering** (data engineering showpiece — Kafka + PySpark)
3. **TalentSonar** (LLM API integration + RAG-adjacent)
4. **Pest Forecasting** (ML pipeline + classification + imbalance handling)
5. **OULAD time series** (forecasting + dashboards)
6. **Fater geospatial** (BI + stakeholder presentation + SQL)

### Per-project ground truth (each fact below was verified 2026-05-03; do not invent additional facts):

**Florence-2 Fine-Tuning for VQA (2025, team of 3, 30/30 con lode):**
- Fine-tuned Microsoft's Florence-2-base-ft (771M params, vision-language Transformer)
- 150K image-question pairs from VQA v2.0 Abstract Scenes (open-ended subset)
- Benchmarked 3 architectures: PaliGemma 3B (exceeded GPU memory), BLIP (unstable gradients), Florence-2 (trained stably on Colab T4)
- AdamW optimizer, lr=1e-5, batch=8, 3 epochs (22,500 steps), linear LR schedule
- Training cross-entropy 0.307 → 0.111 (64% reduction)
- Validation loss: 0.202
- Deployed as Streamlit app on HuggingFace Spaces with beam-search controls + confidence scores + session-history export
- **Repo:** github.com/parhamkhoshsolat/florence2-vqa
- **Live demo on this site:** Embed the HF Space iframe + add a "wake" pre-call. If HF is sleeping, show a pre-recorded GIF of the demo + a "wake it up" button.

**Stock Clustering Pipeline (2024, 30/30 con lode):**
- Apache Kafka 3.3.1 + Zookeeper, single-broker bootstrapped from a notebook
- KafkaProducer streamed daily OHLCV data (April–September 2023, yfinance) into 55 per-ticker topics
- 55-ticker US large-cap universe (stock_AAPL, stock_AMZN, ...)
- PySpark MLlib pipeline: VectorAssembler → KMeans(seed=1) → PCA(k=2) → ClusteringEvaluator
- Selected K=4 by Silhouette + Elbow + 2D PCA across K in [2, 10]
- Honest scope note: streaming layer carries all 55 tickers; KMeans demoed on single-ticker price series. Don't oversell.
- **Repo:** github.com/parhamkhoshsolat/stock-clustering-pipeline
- **Live demo:** Interactive D3 or Recharts scatter of the PCA projection with cluster colors. Click a stock to highlight. All data static, no backend.

**TalentSonar — Developer-Skill Inference from GitHub (2025, 2-person team):**
- GitHub GraphQL API: pulls public-repo metadata, commit history, language breakdowns for any handle
- Structured features passed to Google Gemini API
- Infers technical skills, project archetypes, seniority signal
- Streamlit candidate-scoring view with CSS-only anti-cheat layer + downloadable PDF report
- Mock test scoring (LLM-evaluated scoring is the next iteration — be honest about this)
- **Repo:** github.com/parhamkhoshsolat/TalentSonar
- **Live demo:** React form that accepts a GitHub handle. Three precomputed sample handles available immediately. For new handles, call the GraphQL + Gemini live (use Vercel env vars for keys; rate-limit per IP).

**Pest Forecasting (2025, team of 3, 30/30 con lode):**
- Multi-source dataset: 245 samples, 5 monitoring locations, daily meteorology + entomological catches
- Harmonized inconsistent field names + mixed date formats; engineered lag, 3-day rolling-mean, recency, calendar features
- Benchmarked 6 regression models (ARIMAX, SARIMAX, Prophet, RandomForest, XGBoost, LightGBM) + 5 classification models (RF, XGB, LGB, LSTM, GRU) with TimeSeriesSplit CV
- 10.67:1 class imbalance handled via class_weight balancing
- Random Forest won both: regression test MAE 0.34 vs ARIMAX baseline 2.00; classification F1 0.667 / AUC 0.919 / **recall 1.00 on minority pest-detection class (9-sample support)**
- Champion artifacts serialized (joblib for ML, .h5 for Keras); 3-tab Streamlit dashboard
- **Repo:** github.com/parhamkhoshsolat/pest-population-forecasting
- **Live demo:** Recharts time-series with toggle between models. User picks a date → predicted catch count + actual. Pre-computed forecasts shipped as JSON.

**OULAD Educational Analytics (2025, 30/30 con lode):**
- Open University Learning Analytics dataset (420 MB → 808 daily observations)
- Engineered 7 lag features (1, 2, 3, 7, 14, 21, 28 days) for statistical models + 30-lag window for CNN
- Benchmarked 4 forecasters: SARIMA, ARIMAX, Prophet, custom 1D CNN (TensorFlow/Keras, 50 epochs, batch 32)
- CNN won: MAE 0.199 / MAPE 1.9% (Prophet runner-up at MAE 0.203)
- SARIMA kept as interpretable seasonal baseline for academic staff without ML background
- Streamlit dashboard for scenario analyses
- **Repo:** github.com/parhamkhoshsolat/time-series-OULAD
- **Live demo:** Interactive forecast viewer. User slides a date range → see CNN vs SARIMA predictions side by side.

**Fater S.p.A. Industry Challenge — Geospatial Analytics (2024, team of 4, presented solo, jury individual recognition):**
- Industry challenge with Fater S.p.A. (Procter & Gamble joint venture, FMCG)
- Joined Fater's proprietary sales records with ISTAT sociodemographic census data across 20 administrative microcode districts in MySQL
- SQL CTEs + JOINs + window functions to combine two sources with no prior link
- GeoPandas spatial-join pipeline (point-in-polygon, EPSG:4326)
- Computed per-district store counts + per-capita store-potential metric for district ranking
- Folium choropleth dashboards presented to Fater leadership
- Picked by jury for individual recognition
- **Repo:** github.com/parhamkhoshsolat/retail-geospatial-analytics
- **Live demo:** Leaflet map embedded directly. Choropleth colored by per-capita store potential. Click a district for the KPI breakdown.

---

## 5. The AI agent — design spec

### Personality
- Speaks in Parham's voice: direct, technical when needed, no fluff. Not chatty, not effusive.
- Refers to him in third person ("Parham worked on...", "His Stock Clustering project uses...")
- Does NOT roleplay AS Parham. It's an agent that knows Parham, not Parham himself.

### What it answers
- "What does Parham work on?" → list of project categories
- "Tell me about the Florence-2 project" → ground-truth summary (use facts from §4)
- "What technologies does he know?" → pull from the master CV bank skills
- "Why should I hire him?" → strengths grounded in projects, not generic
- "Is he Naples-based?" → yes, no relocation needed
- "Available immediately?" → graduating Oct 2026, can start working-student / part-time during studies (20h/wk visa cap), full-time on graduation
- "Has he worked on RAG / LLMs / agents?" → yes, the TalentSonar project + Florence-2 + this very agent (meta-skill)
- "Can he speak with me?" → "Yes, I can pass your message to him" → call a `send_message_to_parham()` tool (Tier 3) or just provide his email

### What it REFUSES
- Personal questions (age, religion, marital status, sexual orientation, ethnicity, **nationality**) → polite refusal, redirect to professional content
- Off-topic chat (pizza recipes, jokes, general LLM questions) → "I'm here to talk about Parham's work, not [topic]"
- Anything outside what Parham would say in a job interview
- **NEVER mentions Iran, Iranian, Tehran, Persian** — this is a HARD RULE
- **NEVER mentions Italian language proficiency** — the agent should respond in English. If asked "does Parham speak Italian", deflect to "Parham communicates professionally in English; further language questions can be discussed in interview."

### Architecture (start simple, upgrade if needed)
**v1 (prompt-stuffing, ship this first):**
- System prompt = personality + guardrails + full contents of `master_cv_bank.json` + summaries of each project from §4
- All future questions go through `@anthropic-ai/sdk` with `claude-haiku-4-5` model
- Stateless: each question is independent (use session storage for conversational continuity if needed)

**v2 (RAG, upgrade after v1 ships):**
- Embed each project memory file as separate chunks via OpenAI text-embedding-3-small or Voyage AI
- Store in Vercel Postgres + pgvector (free tier)
- On each question: embed query → cosine search top-3 chunks → pass to Claude with system prompt
- Reduces token cost and improves answer specificity

**v3 (tool-calling, future):**
- Claude tool-calling with: `search_projects(query)`, `get_github_stats(repo)`, `book_call_with_parham(date)`, `send_email_to_parham(message)`
- Cal.com integration for actual booking
- Add only if you have time after v1+v2 are clean.

### UI
- Floating chat bubble bottom-right (z-index high)
- Click to expand to a panel (350px wide, full height)
- Streaming response (use Vercel AI SDK's `useChat` hook)
- "Suggested questions" chips on first open: "What's Parham's strongest project?", "Has he worked on LLMs?", "Is he Naples-based?", "What's he looking for?"
- Show "AI agent — answers about Parham's work" label so visitors know it's not Parham himself
- After 3+ turns, gently suggest "Want to email Parham directly?" with a `mailto:` link

---

## 6. Standing rules (DO NOT VIOLATE — these are non-negotiable)

These rules apply to ALL content on the site: page copy, project descriptions, AI agent responses, meta tags, alt text, anywhere.

- **NEVER mention Iran, Iranian, Tehran, Persian, or country of origin.**
- **NEVER mention Italian language gap.** Don't pre-empt it. The site is English-only; that speaks for itself.
- **NO em-dashes (—) or en-dashes (–) anywhere.** Use commas, periods, parentheses, or restructure.
- **NO Tier-1 AI words:** delve, leverage, utilize, robust, foster, harness, ecosystem, cutting-edge, paradigm, navigate, empower, embrace, innovative, transformative, spearheaded, orchestrated, catalyze, "passionate about", "results-driven", "detail-oriented", "team player", "in today's fast-paced world".
- **Naples is a positive signal** — mention it where relevant (Italian companies, anything implying location preference). Don't shoehorn it.
- **Lead with strength.** No gap acknowledgments as openers anywhere.
- **NO "Gentile" or Italian opener phrases.** English throughout.

---

## 7. Design rules — visual taste

- **Font:** Inter for body, Inter Display or IBM Plex Sans for headings. NOT Times New Roman, NOT Arial, NOT Comic Sans.
- **Color palette:** dark mode primary (the site looks better at night and recruiters often browse late). Accent color: muted teal or cyan (`#38bdf8` works well). Background `#0f172a`. Card `#1e293b`. Border `#334155`. Text `#e2e8f0`. Muted text `#94a3b8`.
- **Animation:** subtle. Scroll-triggered fade-up on project cards, smooth page transitions (Framer Motion `AnimatePresence`), hover states that grow slightly (1.02x scale). NO spinning logos, NO parallax that interferes with reading, NO unsolicited autoplay.
- **Spacing:** generous. Don't cram. Project cards 600px-700px wide on desktop, single-column on mobile.
- **Typography hierarchy:** clear. Hero title 56-72px. Section h1 32-40px. Body 16-18px. Don't squeeze text under 14px.
- **Loading states:** every interactive element has a skeleton or shimmer. No blank screens.
- **404 page:** custom, friendly, with a search box for the agent.

---

## 8. Acceptance criteria for v1 (definition of "shippable")

Before deploying to production:
- [ ] Home page renders with all 6 project cards
- [ ] Clicking a project goes to `/projects/[slug]` and the interactive demo loads
- [ ] All 4 static demos (Fater map, Pest forecast, OULAD time series, Stock Clustering scatter) work without backend
- [ ] Florence-2 demo embeds the HF Space (sleep-tolerant; show a "wake it up" CTA if cold)
- [ ] TalentSonar demo has 3 precomputed handle results that load instantly
- [ ] AI agent is available site-wide, answers basic project questions correctly
- [ ] AI agent refuses off-topic and personal questions (test: "where is Parham from?" should NOT answer Iran)
- [ ] No em-dashes anywhere (grep the codebase for `—` and `–`)
- [ ] No Tier-1 AI words anywhere in copy
- [ ] Mobile responsive (test on iPhone-sized viewport)
- [ ] Lighthouse score: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95
- [ ] CV PDF embedded and downloadable at `/cv`
- [ ] All external links open in new tabs with `rel="noopener noreferrer"`
- [ ] Custom domain configured + HTTPS
- [ ] Vercel Analytics enabled
- [ ] Open Graph tags set so LinkedIn previews look professional

---

## 9. Files Claude Code should pull from (Parham's existing artifacts)

Parham has working content already. Copy or reference these:

- **Project ground truth:** `~/Desktop/cv making progress/finding job/05-reference/project_memory/*.md` — verified facts for each project
- **Master CV bank:** `~/Desktop/cv making progress/finding job/01-cvs/master/master_cv_bank.json` — all approved bullets, summaries, skills
- **Latest CV PDF:** `~/Desktop/cv making progress/finding job/01-cvs/master-cv/Parham_KhoshSolat_CV.pdf`
- **GitHub repos** (clone or link):
  - `github.com/parhamkhoshsolat/florence2-vqa`
  - `github.com/parhamkhoshsolat/stock-clustering-pipeline`
  - `github.com/parhamkhoshsolat/TalentSonar`
  - `github.com/parhamkhoshsolat/pest-population-forecasting`
  - `github.com/parhamkhoshsolat/time-series-OULAD`
  - `github.com/parhamkhoshsolat/retail-geospatial-analytics`

---

## 10. Workflow suggestion for Parham + Claude Code

1. Open Claude Code in a new folder: `cd ~/Desktop && mkdir parham-portfolio && cd parham-portfolio && claude`
2. Paste THIS WHOLE FILE as the first message.
3. Ask Claude Code: "Scaffold the Next.js app per the brief. Start with home page + project list + one project deep page (Florence-2). Get me to a `npm run dev` working state, then I'll iterate."
4. After scaffold: review, push to GitHub.
5. Connect GitHub repo to Vercel (one click on vercel.com).
6. Buy the custom domain on Cloudflare or Namecheap (~€10/year), point it at Vercel (Vercel auto-issues SSL).
7. Iterate on Claude Code: each project page, then the AI agent, then polish.
8. Pre-launch test: open in incognito on phone, ask the agent 10 questions, check Lighthouse.
9. Ship. Add the URL to the LinkedIn profile, CV header, and the cold email signatures.

---

## 11. What to do if Claude gets stuck

If Claude asks something this brief doesn't cover:
- Decisions on color shades, exact wording, micro-copy: defer to Claude's taste. Tell it "you decide, match the modern engineer aesthetic."
- Decisions on what to put on the site that isn't in this brief (e.g., a blog): tell Claude "not in scope for v1."
- Technical errors during build: paste them back in, ask Claude to debug.
- If Claude wants to add a feature outside this brief: say "park it for v2, document in TODO.md."

---

## End of brief

This brief is versioned. If Parham updates it (new project, new role target, new rule), the version stamp + change log goes at the top. Last updated 2026-05-22.

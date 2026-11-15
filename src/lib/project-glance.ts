// The 10-second summary and honest limits shown near the top of every project page.
// Facts come from the audited copy (copy-final.md, 15 Nov 2026); keep them in sync when a page changes.

export type ProjectGlance = {
  problem: string;
  role: string;
  result: string;
  limits: string[];
};

export const projectGlance: Record<string, ProjectGlance> = {
  "shielded-lgv-routing": {
    problem:
      "A warehouse fleet has to deliver pallets quickly without two vehicles ever colliding. When a learned policy must learn safety and speed at the same time it tends to freeze, and comparisons between methods stop being fair.",
    role: "Solo course project (Advanced Statistical Learning and Modeling): simulator, shield, nine methods, evaluation and live demo.",
    result:
      "Classical planners won: prioritized planning reached 3.03× greedy throughput against 2.53× for the best learned policy, a bootstrapped DQN, with zero collisions in every evaluated run. A hybrid that learns only the planning order reached 3.00×.",
    limits: [
      "Results come from one simulated warehouse layout (15 held-out task streams), not a real fleet.",
      "Walking workers exist only in the live demo; they were never part of the evaluation.",
      "The planners are deterministic, so they have 15 runs each against 75 for each learned method; a stratified bootstrap widens the DQN interval to 2.33 to 2.66.",
    ],
  },
  "rl-restore": {
    problem:
      "Real photos carry a mix of blur, noise and JPEG damage at unknown strengths, and no single fixed filter handles all of them. The original paper never released its joint fine-tuning step and never compared against a single network of the same size.",
    role: "Solo course project: reimplemented Yu et al. (CVPR 2018) end to end and extended it.",
    result:
      "The agent repairs test patches by +2.93 dB, 0.59 dB (25%) more than the best single tool and 90% of the oracle-with-stop ceiling; the paper's unreleased joint fine-tuning lifts it to +3.67 dB.",
    limits: [
      "A single CNN of the same size repairs more (+4.03 dB); the toolchain's appeal is that each step is visible (not measured), not peak fidelity.",
      "PSNR is measured on 63×63 test patches drawn from 50 held-out images, from one training seed.",
      "The agent's dispatcher was trained on moderate damage only but is scored on all three strengths, while the single CNN trained on all three, which favours the CNN.",
    ],
  },
  "5g-noc-root-cause": {
    problem:
      "One fault in a mobile network sets off alarms on many elements at once, and operators need the element that actually failed. A wrong confident answer is worse than an honest \"not sure\", because operators may act on it.",
    role: "Team of 8, 5G Academy (Federico II, with Nokia, TIM and PagoPA). I owned the root-cause analysis stage; the simulator, network model, alarm stage, backend and security module are the team's.",
    result:
      "On a sealed simulated hold-out (read once on 20 Oct 2026, networks of 17 to 185 nodes), it named the true root cause first on 497 of 710 single-fault runs (70.0%), against 137 (19.3%) for the team's earlier ranker, and sent zero wrong causes with a recommended action.",
    limits: [
      "Simulated runs only; the earlier ranker cannot name 3 fault classes and is read strictly, so \"70% vs 19%\" overstates the gain over a fair baseline.",
      "213 of the 710 single faults got no claimed cause, and with several faults at once only 499 of 933 events were found.",
      "Faults that only the proposed simulator extension can inject were found 22 to 29% of the time. The code is in the team's private repository.",
    ],
  },
  "florence2-vqa": {
    problem:
      "General vision-language models caption and detect objects well, but are not tuned to give short, direct answers to open questions. We wanted one that does, trained on one Colab GPU and served on free CPU hardware.",
    role: "Team of 3 (Data Mining and Machine Learning, Federico II) with Zahra Jafarinejad and Farshad Farahtaj. I built the pipeline: data preparation, the fine-tune, loss tracking and the deployed app.",
    result:
      "A full fine-tune of an about 230M-parameter model: validation loss fell from 0.240 after epoch 1 to 0.202 after epoch 3 on 30,000 held-out questions, live on Hugging Face.",
    limits: [
      "No accuracy, BLEU or CIDEr was computed; only loss was tracked.",
      "The loss counts padding tokens, so its absolute value is not comparable to other fine-tunes; the downward trend is real.",
      "About 40% of training answers are yes or no, and the answer score in the demo is not a calibrated probability.",
    ],
  },
  "pest-forecasting": {
    problem:
      "Growers check insect traps to decide when to treat crops, and a missed catch costs more than a false alarm. Can a few weeks of trap counts plus local weather warn of new catches when catch days are rare (21 of 245 trap-days)?",
    role: "Team of 3 (Information Systems and Business Intelligence, Federico II). I designed the model comparison and evaluation and did the re-analysis; Farshad Farahtaj led preprocessing, exploratory analysis and feature engineering; Giovanni Montanile built the Power BI reports.",
    result:
      "A negative result. With a leaking input removed, the Random Forest classifier scores AUC 0.49 and F1 0.36 on 49 test trap-days (9 with a catch), against the original 0.92 and 0.667; the regression's mean error rises from 0.355 to 0.496, worse than predicting yesterday's count (0.34).",
    limits: [
      "This was the only data available: 5 traps over 49 days (6 July to 23 August 2024), with 21 catch days in two bursts.",
      "The original input \"recent activity\" was 1 on every catch day including the day itself, so it leaked the answer; the original scores cannot be used.",
      "Synthetic catch days (SMOTE) made the classifier worse, not better.",
    ],
  },
  "retail-geospatial": {
    problem:
      "Fater S.p.A. asked teams to estimate the sales potential of points of sale by neighbourhood. Raw totals favour big districts, so districts of very different populations need a per-resident measure before they can be ranked.",
    role: "Team of 4 (Statistical Learning and Data Analysis, Federico II) with Shayan Ekramnia, Farshad Farahtaj and Sara Aboudarda; supervised by Prof. Roberta Siciliano. I did the statistics and analysis.",
    result:
      "A per-resident ranking of districts, built by joining store points to district polygons and dividing summed potential by population, shown as a choropleth and two interactive maps.",
    limits: [
      "Fater's data was for course use only, so the public repo and map run the same method on synthetic data; its numbers mean nothing.",
      "The code has no guard against a store counted in two overlapping districts.",
    ],
  },
  "stock-clustering": {
    problem:
      "A course exercise in standing up a message-ingestion layer and a distributed machine-learning library, with K in K-means chosen from evidence rather than by default.",
    role: "Team of 2 (Hardware and Software for Big Data, Federico II) with Farshad Farahtaj; I built the pipeline.",
    result: "6,875 daily price records into 55 per-stock Kafka topics; K = 4 chosen from silhouette and elbow plots.",
    limits: [
      "Nothing reads the topics back: the clustering uses the last stock downloaded, from memory, and Spark ran in local mode on one machine.",
      "The four price features correlate at 0.97 to 0.99, so the clusters are price-level bands over time, not a market finding.",
    ],
  },
  "oulad-timeseries": {
    problem:
      "Use of an online learning platform swings sharply around term starts, deadlines and holidays. Forecasting daily activity helps plan server capacity and spot unusual days.",
    role: "Team of 3 (Hardware and Software for Big Data, Module B, Federico II) with Farshad Farahtaj and Zahra Jafarinejad; I built the pipeline.",
    result: "A 1D CNN on 30-day windows reached a mean absolute error of 0.20 on log daily clicks over the last 20% of the series.",
    limits: [
      "Only the CNN has a real hold-out score; the other models were fitted or scored on their own training data, so they are not ranked.",
      "No simple baseline (for example \"same as 7 days ago\") was run, so 0.20 cannot be called good or bad on its own.",
      "Calendar dates are assumed (February and October course starts), and errors are on the log scale.",
    ],
  },
  talentsonar: {
    problem:
      "Turning a free-text job ad into a search for people is slow manual work for recruiters. The prototype tests whether an LLM plus the GitHub API can produce a first candidate list straight from the ad.",
    role: "24-hour hackathon, team of 2 with Amirhosein Shahdadian. I built the job-ad parsing, the GitHub discovery and the Streamlit pages.",
    result:
      "Gemini turns a job ad into a typed requirement list, and async GitHub GraphQL searches return a ranked list of real public developers with stated reasons.",
    limits: [
      "Candidates are ranked by a simple rule-based score that was never validated, and years of experience are random placeholders, so the ranking is not a real assessment.",
      "LLM scoring of candidate answers was not built; text answers are scored by length.",
    ],
  },
  "preference-shielding-hri": {
    problem:
      "A robot that learns by trial and error makes choices a person cannot easily predict or trust. The open questions are whether a preference shield makes the robot easier to read, and whether two new designs do better than the standard one.",
    role: "MSc thesis at Federico II, supervised by Prof. Silvia Rossi at the PRISCA Lab: study design, learning code, web app and deployment.",
    result:
      "Engineering only: the study app is deployed, every scripted learning session converged before launch, and the backend has 236 test functions. No study results exist yet.",
    limits: [
      "No participant results yet; nothing about outcomes can be said until the paper is out.",
      "Conditions, measures and analysis are described only at a high level for the same reason.",
    ],
  },
};

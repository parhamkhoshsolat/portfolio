// The 10-second summary and honest limits shown near the top of every project page.
// Facts come from the project pages themselves; keep them in sync when a page changes.

export type ProjectGlance = {
  problem: string;
  role: string;
  result: string;
  limits: string[];
};

export const projectGlance: Record<string, ProjectGlance> = {
  "shielded-lgv-routing": {
    problem: "Route six warehouse vehicles quickly and safely, with workers walking the same aisles.",
    role: "Solo course project (Advanced Statistical Learning and Modeling): simulator, nine methods, shield, evaluation and live demo.",
    result: "Classical planners won: prioritized planning reached 3.03× greedy throughput against 2.53× for the best learned policy, with zero collisions.",
    limits: [
      "A2C's confidence interval includes 1.0, so it is not clearly better than greedy.",
      "Results come from 15 held-out simulated layouts, not a real fleet.",
    ],
  },
  "rl-restore": {
    problem: "Photos carry blur, noise and JPEG damage at unknown strengths, and no single filter fixes all three.",
    role: "Solo course project: reimplemented Yu et al. (CVPR 2018) end to end and extended it.",
    result: "The agent gains +2.93 dB, about 90% of the oracle ceiling; the paper's unreleased joint fine-tuning lifts it to +3.67 dB.",
    limits: [
      "A single CNN of the same size scores higher on raw PSNR (+4.03 dB); the toolchain's value is interpretability, not peak fidelity.",
      "The Real-ESRGAN finisher invents detail, so it is shown without a PSNR number.",
    ],
  },
  "5g-noc-root-cause": {
    problem: "When a network fails, alarms flood in, and operators need the element that actually caused it.",
    role: "Owned the root-cause analysis component in an 8-person 5G Academy team.",
    result: "A ranker proposes the faulty element and a rule-based verifier checks it; tested on held-out fault scenarios on simulated networks of 12 to 180 nodes.",
    limits: [
      "Simulated networks, not operator data, and no accuracy figure is published here.",
      "The code is in the team's private repository.",
    ],
  },
  "florence2-vqa": {
    problem: "Answer open questions about images, training on a single Colab GPU.",
    role: "Team of 3 (Data Mining and Machine Learning) with Zahra Jafarinejad and Farshad Farahtaj; I built the full pipeline.",
    result: "A stable full fine-tune of a 230M-parameter model (validation loss 0.202), live on Hugging Face.",
    limits: [
      "No test accuracy, BLEU or CIDEr was computed; answers were checked by hand.",
      "About 40% of training questions are yes or no, so loss alone says little about the harder questions.",
    ],
  },
  "pest-forecasting": {
    problem: "Flag pest catch days from weather and trap data, where a missed outbreak costs more than a false alarm.",
    role: "Team of 3 (Information Systems and Business Intelligence) with Giovanni Montanile and Farshad Farahtaj; I built the full pipeline.",
    result: "Random Forest caught all 9 catch days in a 49-day hold-out (recall 1.00, F1 0.667), at the cost of 9 false alarms.",
    limits: [
      "Small data: 245 samples and 9 catch days in the test set; the threshold sits at the lowest value searched.",
      "Regression stays weak out of sample (test R² 0.35), and the deep models were close to chance.",
    ],
  },
  "retail-geospatial": {
    problem: "Compare districts of very different sizes by store potential per resident.",
    role: "Team of 4 (Statistical Learning and Data Analysis) with Shayan Ekramnia, Farshad Farahtaj and Sara Aboudarda; I did the statistics and analysis.",
    result: "A per-resident potential metric built from a point-in-polygon join, shown as a choropleth and interactive maps.",
    limits: [
      "Fater's data was for educational use only, so the public map and repo use synthetic data; the numbers shown are not real.",
    ],
  },
  "stock-clustering": {
    problem: "Load six months of prices for 55 tickers through Kafka, and practise choosing K for K-means.",
    role: "Team of 2 (Hardware and Software for Big Data) with Farshad Farahtaj; I built the full pipeline.",
    result: "6,875 messages into 55 per-ticker topics; K = 4 chosen from silhouette, elbow and PCA plots.",
    limits: [
      "A one-off batch load: nothing consumes the topics, and Spark does not read from Kafka.",
      "Clustering ran on one ticker's 125 days of unscaled prices, so it is an exercise in choosing K, not a market finding.",
    ],
  },
  "oulad-timeseries": {
    problem: "Forecast daily student activity on the Open University's learning platform.",
    role: "Team of 3 (Hardware and Software for Big Data) with Farshad Farahtaj and Zahra Jafarinejad; I built the full pipeline.",
    result: "A 1D CNN reached MAE 0.20 on log clicks on a chronological hold-out.",
    limits: [
      "Only the CNN was scored on the hold-out, so the models are not ranked against each other.",
      "Errors are on the log scale, not percentages of raw clicks.",
    ],
  },
  talentsonar: {
    problem: "Turning a free-text job ad into a candidate search takes recruiters time.",
    role: "24-hour hackathon, team of 2 with Amirhosein Shahdadian.",
    result: "Gemini parsing of job descriptions and a GitHub GraphQL search that returns real profiles both work.",
    limits: [
      "Match scores are mock and years of experience are random placeholders.",
      "The Gemini interview panel was not finished.",
    ],
  },
  "preference-shielding-hri": {
    problem: "A learning robot's choices can be hard for the person teaching it to read and trust.",
    role: "MSc thesis at Federico II: study design, learning code, web app and deployment.",
    result: "The study app is deployed and the study is running with participants.",
    limits: ["No results yet; a paper is being written."],
  },
};

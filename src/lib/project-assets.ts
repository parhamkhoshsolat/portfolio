// Curated visual assets per project. File paths are relative to /public.
// Charts were extracted from notebook outputs (see public/projects/{slug}/charts/_captions.json
// for the raw extraction log) and hand-picked here for the deep pages.

export type ChartAsset = {
  src: string;
  alt: string;
  caption: string;
  interpretation?: string;
  fromCell?: string;
};

export type ProjectAssets = {
  charts: ChartAsset[];
  techReport?: { src: string; title: string };
  externalEmbed?: { src: string; title: string; height: number };
  extraImages?: ChartAsset[];
};

export const projectAssets: Record<string, ProjectAssets> = {
  "florence2-vqa": {
    techReport: {
      src: "/projects/florence2-vqa/tech-report.pdf",
      title: "Data Mining and Machine Learning project report (9 pages, Federico II)",
    },
    charts: [
      {
        src: "/projects/florence2-vqa/charts/chart-03.png",
        alt: "Word cloud of the most common training question tokens",
        caption: "Training-set question vocabulary across 60,000 open-ended prompts.",
        interpretation:
          "What it tells us: the questions cluster around color, counts, and object identification (color, many, dog, man, woman). The model needs strong colour recognition and basic counting more than abstract reasoning. That insight directly drove the inference-time resize to 768x768, which preserves colour fidelity over raw token count.",
      },
      {
        src: "/projects/florence2-vqa/charts/chart-06.png",
        alt: "Histogram of validation question length in word count",
        caption: "Validation question length distribution. Bin width is one word.",
        interpretation:
          "How to read it: the mode sits at 5 to 7 words and the tail extends past 15. So the model can rarely lean on template matching, even short prompts are linguistically varied. This is why we used the full Florence-2 tokenizer rather than truncating to a fixed prefix.",
      },
    ],
  },

  "stock-clustering": {
    techReport: {
      src: "/projects/stock-clustering/tech-report.pdf",
      title: "Stock Clustering Analysis project documentation",
    },
    charts: [
      {
        src: "/projects/stock-clustering/charts/chart-04.png",
        alt: "K-means visualisation grid across K = 2 to 6 in PCA space",
        caption: "K-means projected into 2D PCA for K = 2, 3, 4, 5, 6.",
        interpretation:
          "How to read it: each panel is the same data, coloured by the K-means assignment at a different K. At K = 4 the four price regimes separate cleanly. At K = 5 and K = 6 one of the bands splits into two noisy sub-clusters with no clear meaning, which is the visual signature of over-fragmenting.",
      },
      {
        src: "/projects/stock-clustering/charts/chart-06.png",
        alt: "3D scatter plot of the chosen K=4 clusters in Open/High/Low space",
        caption: "Final K = 4 clusters in raw Open / High / Low price space.",
        interpretation:
          "How to read it: each point is one trading day, positioned by its Open, High, and Low prices, coloured by its cluster. The four bands are visible price regimes. This view is what a portfolio manager would actually read: not abstract PCA components, but bands tied to real price levels.",
      },
    ],
  },

  "oulad-timeseries": {
    techReport: {
      src: "/projects/oulad-timeseries/tech-report.pdf",
      title: "Hardware and Software Mod B final project report",
    },
    charts: [
      {
        src: "/projects/oulad-timeseries/charts/chart-24.png",
        alt: "Log clicks over time with anomalies highlighted",
        caption: "Daily VLE log clicks across 2.5 academic years. Red dots are statistical anomalies.",
        interpretation:
          "How to read it: blue is daily clicks on log scale, red dots are points that fall outside the statistical band. The recurring summer dip (July-August) and winter dip (late December) are academic breaks. The visible spikes are exam weeks. This shape is what drove the lag-feature window choice: weekly, monthly, and quarterly lags all matter.",
      },
      {
        src: "/projects/oulad-timeseries/charts/chart-31.png",
        alt: "Prophet forecast on original scale showing observed vs forecast",
        caption: "Prophet forecast versus observed clicks in the original scale.",
        interpretation:
          "How to read it: blue is the observed clicks, orange is Prophet's forecast. Prophet captures the weekly cycle and the multi-year trend cleanly but tends to under-shoot the sharp exam-week spikes. Test MAE 0.203, MAPE 1.9 percent. Prophet is the right pick if the audience needs an interpretable model with no ML background.",
      },
      {
        src: "/projects/oulad-timeseries/charts/chart-32.png",
        alt: "Custom 1D CNN forecast vs observed clicks",
        caption: "Custom 1D CNN prediction versus training data.",
        interpretation:
          "How to read it: blue is training data, orange is the CNN's out-of-sample forecast. The CNN learned the shape (including the exam spikes Prophet missed) without explicit seasonality terms. It edged Prophet by 0.004 MAE, which is statistically thin: the right call in production is to pick by interpretability, not headline accuracy.",
      },
    ],
  },

  "retail-geospatial": {
    externalEmbed: {
      src: "/projects/retail-geospatial/districts_map.html",
      title: "Interactive Folium choropleth of per-capita store potential",
      height: 560,
    },
    charts: [
      {
        src: "/projects/retail-geospatial/potential_per_capita.png",
        alt: "Choropleth of store potential per capita by district",
        caption: "Per-capita store-potential metric across the 20 administrative microcode districts.",
        interpretation:
          "How to read it: each polygon is one district; the colour scale runs from cream (low potential) to dark red (high potential). Darker means Fater is underserved there relative to population. The dark central districts are where new stores would close the gap between footprint and demand the most, and the ranking from this map was the single slide that drove the recommendation to leadership.",
      },
    ],
  },

  "pest-forecasting": {
    // No notebook charts to extract; this project's visuals are
    // generated client-side by PestModelComparison from project_memory metrics.
    charts: [],
  },

  talentsonar: {
    // No local notebook artifacts; visuals come from the live HF Space
    // screenshot once added in a follow-up pass.
    charts: [],
  },
};

export function getProjectAssets(slug: string): ProjectAssets {
  return projectAssets[slug] ?? { charts: [] };
}

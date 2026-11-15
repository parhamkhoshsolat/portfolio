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
    charts: [
      {
        src: "/projects/florence2-vqa/charts/chart-03.png",
        alt: "Word cloud of the most common training question tokens",
        caption: "Training-set question vocabulary across 60,000 open-ended prompts.",
        interpretation:
          "What it tells us: the questions cluster around color, counts, and object identification (color, many, dog, man, woman). The model needs strong colour recognition and basic counting more than abstract reasoning.",
      },
      {
        src: "/projects/florence2-vqa/charts/chart-06.png",
        alt: "Histogram of validation question length in word count",
        caption: "Validation question length distribution. Bin width is one word.",
        interpretation:
          "How to read it: the mode sits at 5 to 7 words and the tail extends past 15. So the model can rarely lean on template matching, even short prompts are linguistically varied.",
      },
    ],
  },

  "stock-clustering": {
    charts: [
      {
        src: "/projects/stock-clustering/charts/chart-04.png",
        alt: "K-means visualisation grid across K = 2 to 6 in PCA space",
        caption: "K-means on one ticker's daily prices, projected into 2D PCA for K = 2, 3, 4, 5, 6.",
        interpretation:
          "How to read it: each panel is the same data (one ticker's 125 trading days), coloured by the K-means assignment at a different K. PCA is used only to draw the plot. At K = 5 and K = 6 one band splits into smaller sub-clusters; K = 4 itself was chosen from the silhouette and elbow plots. The features are raw price levels of a single stock, so the clusters are an exercise in choosing K, not a finding about the market.",
      },
      {
        src: "/projects/stock-clustering/charts/chart-06.png",
        alt: "3D scatter plot of the chosen K=4 clusters in Open/High/Low space",
        caption: "Final K = 4 clusters in raw Open / High / Low price space.",
        interpretation:
          "How to read it: each point is one trading day of a single ticker, positioned by its Open, High, and Low prices, coloured by its cluster. Because the input is unscaled price levels, the clusters mostly separate periods with different price levels.",
      },
    ],
  },

  "oulad-timeseries": {
    charts: [
      {
        src: "/projects/oulad-timeseries/charts/chart-24.png",
        alt: "Log clicks over time with anomalies highlighted",
        caption: "Daily VLE log clicks across about 2.3 years. Red dots are statistical anomalies.",
        interpretation:
          "How to read it: blue is daily clicks on log scale, red dots are points that fall outside the statistical band. Spikes line up with the assumed course starts (February and October); dips in summer and at Christmas. Lags up to 28 days matter.",
      },
      {
        src: "/projects/oulad-timeseries/charts/chart-31.png",
        alt: "Prophet forecast on original scale showing observed vs forecast",
        caption: "Prophet forecast versus observed clicks in the original scale.",
        interpretation:
          "How to read it: blue is the observed clicks, orange is Prophet's forecast. Prophet captures the weekly cycle and the multi-year trend but under-shoots the sharp peaks.",
      },
      {
        src: "/projects/oulad-timeseries/charts/chart-32.png",
        alt: "Custom 1D CNN forecast vs observed clicks",
        caption: "Custom 1D CNN prediction versus training data.",
        interpretation:
          "How to read it: blue is training data, orange is the CNN's forecast on the chronological hold-out (MAE 0.20 on log clicks); dates are shifted by the 30-day window and actual values are not plotted. The CNN follows the shape without explicit seasonality terms. The other models were not scored on the same hold-out, so the CNN is not ranked against them.",
      },
    ],
  },

  "retail-geospatial": {
    externalEmbed: {
      src: "/projects/retail-geospatial/districts_map.html",
      title: "Interactive Folium map of stores and districts (synthetic data)",
      height: 560,
    },
    charts: [
      {
        src: "/projects/retail-geospatial/potential_per_capita.png",
        alt: "Choropleth of store potential per capita by district",
        caption: "Per-capita store-potential metric by district (synthetic data).",
        interpretation:
          "How to read it: each polygon is one district; the colour runs from cream (low) to dark red (high) store potential per resident. The data here is synthetic, so the map shows the method, not real results.",
      },
    ],
  },

  "pest-forecasting": {
    // No notebook charts to extract; this project's visuals are
    // generated by PestModelComparison from the 15 Nov 2026 re-analysis.
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

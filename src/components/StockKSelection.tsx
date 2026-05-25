"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceDot,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Read off the notebook chart outputs (chart-02 silhouette, chart-03 elbow).
// Approximate to 2 decimal places; exact values live in the notebook.

const SILHOUETTE = [
  { k: 2, score: 0.69 },
  { k: 3, score: 0.76 },
  { k: 4, score: 0.74 },
  { k: 5, score: 0.69 },
  { k: 6, score: 0.70 },
  { k: 7, score: 0.66 },
  { k: 8, score: 0.63 },
  { k: 9, score: 0.63 },
  { k: 10, score: 0.58 },
];

const ELBOW = [
  { k: 2, wcss: 7400 },
  { k: 3, wcss: 2900 },
  { k: 4, wcss: 1600 },
  { k: 5, wcss: 1100 },
  { k: 6, wcss: 800 },
  { k: 7, wcss: 700 },
  { k: 8, wcss: 600 },
  { k: 9, wcss: 500 },
  { k: 10, wcss: 450 },
];

const tooltipStyle = {
  backgroundColor: "#1e293b",
  border: "1px solid #334155",
  borderRadius: "8px",
  color: "#e2e8f0",
  fontSize: "12px",
} as const;

export function SilhouetteChart() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card p-5">
      <p className="text-xs uppercase tracking-wider text-muted">
        K selection (1 of 2)
      </p>
      <h3 className="mt-1 text-base font-semibold">
        Silhouette score across K
      </h3>
      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={SILHOUETTE}
            margin={{ top: 8, right: 12, bottom: 0, left: -8 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis
              dataKey="k"
              stroke="#94a3b8"
              tick={{ fontSize: 11 }}
              label={{ value: "K", position: "insideBottom", offset: -2, fill: "#94a3b8", fontSize: 11 }}
            />
            <YAxis
              stroke="#94a3b8"
              tick={{ fontSize: 11 }}
              domain={[0.5, 0.8]}
              tickFormatter={(v) => v.toFixed(2)}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              cursor={{ stroke: "#38bdf8", strokeWidth: 1 }}
              formatter={(v) => (typeof v === "number" ? v.toFixed(3) : v)}
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#38bdf8"
              strokeWidth={2.5}
              dot={{ fill: "#38bdf8", r: 4 }}
              activeDot={{ r: 6 }}
            />
            <ReferenceDot x={4} y={0.74} r={8} fill="transparent" stroke="#fbbf24" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-text">
        Higher is better.
      </p>
      <p className="mt-2 border-l-2 border-accent/40 pl-3 text-xs text-muted">
        How to read it: silhouette measures cluster cohesion plus separation.
        The global peak is at K = 3 (0.76) and K = 4 sits close behind (0.74,
        amber marker). Either is defensible from this metric alone, which is
        why we cross-checked against Elbow and the PCA grid before
        committing.
      </p>
    </div>
  );
}

export function ElbowChart() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card p-5">
      <p className="text-xs uppercase tracking-wider text-muted">
        K selection (2 of 2)
      </p>
      <h3 className="mt-1 text-base font-semibold">
        Within-cluster sum of squares (Elbow)
      </h3>
      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={ELBOW}
            margin={{ top: 8, right: 12, bottom: 0, left: -8 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis
              dataKey="k"
              stroke="#94a3b8"
              tick={{ fontSize: 11 }}
              label={{ value: "K", position: "insideBottom", offset: -2, fill: "#94a3b8", fontSize: 11 }}
            />
            <YAxis
              stroke="#94a3b8"
              tick={{ fontSize: 11 }}
              tickFormatter={(v) => v.toLocaleString()}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              cursor={{ stroke: "#38bdf8", strokeWidth: 1 }}
              formatter={(v) => (typeof v === "number" ? v.toLocaleString() : v)}
            />
            <Line
              type="monotone"
              dataKey="wcss"
              stroke="#38bdf8"
              strokeWidth={2.5}
              dot={{ fill: "#38bdf8", r: 4 }}
              activeDot={{ r: 6 }}
            />
            <ReferenceDot x={4} y={1600} r={8} fill="transparent" stroke="#fbbf24" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-text">
        Lower is tighter clusters; the bend is the natural K.
      </p>
      <p className="mt-2 border-l-2 border-accent/40 pl-3 text-xs text-muted">
        How to read it: WCSS always falls as K grows; what matters is where
        the curve bends. The drop from K = 2 to K = 3 is the biggest single
        step, then K = 4 (amber marker) flattens. After K = 4 each new
        cluster buys very little, the signature of over-fragmenting.
      </p>
    </div>
  );
}

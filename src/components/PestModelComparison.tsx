"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// All numbers come straight from the verified project memory file
// (05-reference/project_memory/pest_population_forecasting.md), which is
// itself sourced from notebook cell outputs.

const REGRESSION_RESULTS = [
  { model: "Prophet", mae: 2.4 },
  { model: "ARIMAX", mae: 2.0 },
  { model: "SARIMAX", mae: 2.0 },
  { model: "XGBoost", mae: 0.46 },
  { model: "LightGBM", mae: 0.42 },
  { model: "Random Forest", mae: 0.34 },
];

const CLASSIFICATION_RESULTS = [
  { model: "GRU", f1: 0.37, auc: 0.5 },
  { model: "LSTM", f1: 0.45, auc: 0.68 },
  { model: "XGBoost", f1: 0.47, auc: 0.93 },
  { model: "LightGBM", f1: 0.56, auc: 0.93 },
  { model: "Random Forest", f1: 0.67, auc: 0.92 },
];

const CHAMPION_COLOUR = "#38bdf8";
const OTHER_COLOUR = "#475569";

function tooltipStyle() {
  return {
    backgroundColor: "#1e293b",
    border: "1px solid #334155",
    borderRadius: "8px",
    color: "#e2e8f0",
    fontSize: "12px",
  } as const;
}

export function RegressionMaeChart() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card p-5">
      <p className="text-xs uppercase tracking-wider text-muted">
        Regression tournament
      </p>
      <h3 className="mt-1 text-base font-semibold">
        Test MAE across the 6 regressors (lower is better)
      </h3>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={REGRESSION_RESULTS}
            margin={{ top: 8, right: 12, bottom: 0, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="model" stroke="#94a3b8" tick={{ fontSize: 11 }} />
            <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} />
            <Tooltip
              contentStyle={tooltipStyle()}
              cursor={{ fill: "rgba(56,189,248,0.08)" }}
              formatter={(v) => (typeof v === "number" ? v.toFixed(2) : v)}
            />
            <Bar dataKey="mae" name="Test MAE" radius={[6, 6, 0, 0]}>
              {REGRESSION_RESULTS.map((row) => (
                <Cell
                  key={row.model}
                  fill={row.model === "Random Forest" ? CHAMPION_COLOUR : OTHER_COLOUR}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-3 text-xs text-muted">
        Random Forest hit Test MAE 0.34 against ARIMAX&apos;s baseline 2.00,
        about an 83% reduction.
      </p>
    </div>
  );
}

export function ClassificationChart() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card p-5">
      <p className="text-xs uppercase tracking-wider text-muted">
        Classification tournament
      </p>
      <h3 className="mt-1 text-base font-semibold">
        F1 and AUC across the 5 classifiers (higher is better)
      </h3>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={CLASSIFICATION_RESULTS}
            margin={{ top: 8, right: 12, bottom: 0, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="model" stroke="#94a3b8" tick={{ fontSize: 11 }} />
            <YAxis
              stroke="#94a3b8"
              tick={{ fontSize: 11 }}
              domain={[0, 1]}
              tickFormatter={(v) => v.toFixed(1)}
            />
            <Tooltip
              contentStyle={tooltipStyle()}
              cursor={{ fill: "rgba(56,189,248,0.08)" }}
              formatter={(v) => (typeof v === "number" ? v.toFixed(2) : v)}
            />
            <Legend wrapperStyle={{ fontSize: 12, color: "#94a3b8" }} />
            <Bar dataKey="f1" name="F1" fill={CHAMPION_COLOUR} radius={[6, 6, 0, 0]} />
            <Bar dataKey="auc" name="AUC" fill="#475569" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-3 text-xs text-muted">
        Random Forest wins overall on F1 (0.67) and posts a strong AUC 0.92.
        XGBoost narrowly leads on AUC (0.93) but accuracy drops sharply.
      </p>
    </div>
  );
}

export function ChampionConfusionMatrix() {
  // RF on the 49-row test set:
  //   TN = 31, FP = 9, FN = 0, TP = 9
  // Derived from accuracy 0.8163, recall 1.00 on Catch, support 9 minority.
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card p-5">
      <p className="text-xs uppercase tracking-wider text-muted">
        Champion confusion matrix
      </p>
      <h3 className="mt-1 text-base font-semibold">
        Random Forest on the 49-row test set
      </h3>

      <div className="mt-5 grid grid-cols-[auto_1fr_1fr] gap-1 text-center text-xs">
        <div className="px-2 py-2" />
        <div className="rounded-md bg-bg/60 px-2 py-2 text-muted">
          Predicted&nbsp;No-Catch
        </div>
        <div className="rounded-md bg-bg/60 px-2 py-2 text-muted">
          Predicted&nbsp;Catch
        </div>

        <div className="flex items-center justify-end pr-2 text-muted">
          Actual&nbsp;No-Catch
        </div>
        <div className="rounded-md bg-emerald-500/15 px-3 py-4 text-emerald-300">
          <span className="block text-xl font-semibold tabular-nums">31</span>
          <span className="text-[10px] uppercase tracking-wider">TN</span>
        </div>
        <div className="rounded-md bg-amber-500/15 px-3 py-4 text-amber-300">
          <span className="block text-xl font-semibold tabular-nums">9</span>
          <span className="text-[10px] uppercase tracking-wider">FP</span>
        </div>

        <div className="flex items-center justify-end pr-2 text-muted">
          Actual&nbsp;Catch
        </div>
        <div className="rounded-md bg-red-500/15 px-3 py-4 text-red-300">
          <span className="block text-xl font-semibold tabular-nums">0</span>
          <span className="text-[10px] uppercase tracking-wider">FN</span>
        </div>
        <div className="rounded-md bg-accent-soft px-3 py-4 text-accent">
          <span className="block text-xl font-semibold tabular-nums">9</span>
          <span className="text-[10px] uppercase tracking-wider">TP</span>
        </div>
      </div>

      <p className="mt-5 text-xs text-muted">
        Caught every one of the 9 minority Catch events (recall 1.00) at the
        cost of 9 false positives. For a field tool that triggers pest checks,
        false negatives cost much more than false positives, so the precision
        / recall trade is the right side.
      </p>
    </div>
  );
}

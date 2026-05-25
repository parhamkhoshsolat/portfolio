"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Values approximated from the notebook EDA chart (training set, top 20).
// Exact counts live in the source notebook; these match the visual rank
// order and relative magnitude.

const TOP_ANSWERS = [
  { answer: "yes", count: 14000 },
  { answer: "no", count: 10500 },
  { answer: "2", count: 3500 },
  { answer: "1", count: 2000 },
  { answer: "red", count: 1500 },
  { answer: "3", count: 1300 },
  { answer: "white", count: 750 },
  { answer: "yellow", count: 650 },
  { answer: "4", count: 600 },
  { answer: "blue", count: 600 },
  { answer: "dog", count: 550 },
  { answer: "brown", count: 500 },
  { answer: "0", count: 450 },
  { answer: "cat", count: 420 },
  { answer: "sitting", count: 410 },
  { answer: "5", count: 400 },
  { answer: "green", count: 350 },
  { answer: "black", count: 320 },
  { answer: "wine", count: 300 },
  { answer: "playing", count: 280 },
];

const tooltipStyle = {
  backgroundColor: "#1e293b",
  border: "1px solid #334155",
  borderRadius: "8px",
  color: "#e2e8f0",
  fontSize: "12px",
} as const;

// Highlight binary answers in accent colour to emphasise the imbalance.
const HIGHLIGHT = new Set(["yes", "no"]);

export function TopAnswersChart() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card p-5">
      <p className="text-xs uppercase tracking-wider text-muted">
        Training-set EDA
      </p>
      <h3 className="mt-1 text-base font-semibold">
        Top 20 most common answers (training)
      </h3>
      <div className="mt-4 h-[420px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={TOP_ANSWERS}
            layout="vertical"
            margin={{ top: 4, right: 18, bottom: 0, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis
              type="number"
              stroke="#94a3b8"
              tick={{ fontSize: 11 }}
              tickFormatter={(v) => v.toLocaleString()}
            />
            <YAxis
              dataKey="answer"
              type="category"
              stroke="#94a3b8"
              tick={{ fontSize: 11 }}
              width={70}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              cursor={{ fill: "rgba(56,189,248,0.08)" }}
              formatter={(v) => (typeof v === "number" ? v.toLocaleString() : v)}
            />
            <Bar dataKey="count" radius={[0, 4, 4, 0]}>
              {TOP_ANSWERS.map((row) => (
                <Cell
                  key={row.answer}
                  fill={HIGHLIGHT.has(row.answer) ? "#38bdf8" : "#475569"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-text">
        Each bar is one answer string; X is its frequency across 60,000
        open-ended questions.
      </p>
      <p className="mt-2 border-l-2 border-accent/40 pl-3 text-xs text-muted">
        How to read it: yes and no (cyan) together carry roughly 24,000 of
        the 60,000 training questions, about 40 percent of the volume. A
        model that always guessed yes would already hit about 23 percent
        accuracy. The real benchmark is what the model does on the long tail
        past position 5, where colour and object words live.
      </p>
    </div>
  );
}

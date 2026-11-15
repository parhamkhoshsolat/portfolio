// Corrected comparison for the pest project.
// Numbers come from the re-analysis of 15 Nov 2026 (re-run of Notebook 2 and
// Notebook 3 on cleaned_engineered_data.csv, same splits, same grids), with the
// input "Recent_Activity" removed because it is 1 on every catch day,
// including the day itself. The "original" rows are shown only as the number
// the leak produced, never as a result.

type Row = {
  name: string;
  values: string[];
  kind: "leak" | "fixed" | "baseline";
};

const CLASSIFIER_ROWS: Row[] = [
  { name: "Original Random Forest (with the leaking input)", values: ["0.92", "0.667"], kind: "leak" },
  { name: "Random Forest, leaking input removed", values: ["0.49", "0.36"], kind: "fixed" },
  { name: "Baseline: predict a catch every day", values: ["0.5", "0.31"], kind: "baseline" },
];

const REGRESSION_ROWS: Row[] = [
  { name: "Original Random Forest (with the leaking input)", values: ["0.355"], kind: "leak" },
  { name: "Random Forest, leaking input removed", values: ["0.496"], kind: "fixed" },
  { name: "Baseline: yesterday's count at the same trap", values: ["0.34"], kind: "baseline" },
  { name: "Baseline: predict 0", values: ["0.52"], kind: "baseline" },
];

const KIND_LABEL: Record<Row["kind"], string> = {
  leak: "Leaked, not a result",
  fixed: "Honest score",
  baseline: "Simple baseline",
};

const KIND_CLASS: Record<Row["kind"], string> = {
  leak: "text-amber-300",
  fixed: "text-accent",
  baseline: "text-muted",
};

function ComparisonTable({
  eyebrow,
  title,
  columns,
  rows,
  note,
}: {
  eyebrow: string;
  title: string;
  columns: string[];
  rows: Row[];
  note: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card p-5">
      <p className="text-xs uppercase tracking-wider text-muted">{eyebrow}</p>
      <h3 className="mt-1 text-base font-semibold text-text">{title}</h3>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[18rem] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wider text-muted">
              <th className="py-2 pr-3 font-normal">Model</th>
              {columns.map((c) => (
                <th key={c} className="py-2 pl-3 text-right font-normal">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name} className="border-b border-border/50 last:border-b-0">
                <td className="py-2.5 pr-3 align-top">
                  <span className="block text-text">{r.name}</span>
                  <span className={`text-[11px] uppercase tracking-wider ${KIND_CLASS[r.kind]}`}>
                    {KIND_LABEL[r.kind]}
                  </span>
                </td>
                {r.values.map((v, i) => (
                  <td
                    key={columns[i]}
                    className={`py-2.5 pl-3 text-right align-top tabular-nums ${
                      r.kind === "leak" ? "text-muted line-through" : "text-text"
                    }`}
                  >
                    {v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-muted">{note}</p>
    </div>
  );
}

export function PestClassifierComparison() {
  return (
    <ComparisonTable
      eyebrow="Catch-day classifier"
      title="49 test trap-days, 9 with a catch (higher is better)"
      columns={["AUC", "F1"]}
      rows={CLASSIFIER_ROWS}
      note="An AUC near 0.5 means the model cannot tell catch days from other days. With the leak removed, the Random Forest ranks catch days no better than chance."
    />
  );
}

export function PestRegressionComparison() {
  return (
    <ComparisonTable
      eyebrow="Daily count regression"
      title="Mean error in insects per trap-day, 50 test trap-days (lower is better)"
      columns={["Mean error"]}
      rows={REGRESSION_ROWS}
      note="With the leak removed, the Random Forest's error is worse than simply repeating yesterday's count."
    />
  );
}

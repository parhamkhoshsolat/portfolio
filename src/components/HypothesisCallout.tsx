// Cyan callout box used to frame a project as a research question.
// The pattern originated on the Preference Shielding HRI thesis card
// and ports cleanly to every shipped project's deep page.

export function HypothesisCallout({
  label = "Hypothesis",
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-8 rounded-2xl border border-accent/30 bg-accent-soft/40 p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-accent">{label}</p>
      <p className="mt-2 text-base leading-relaxed text-text">{children}</p>
    </div>
  );
}

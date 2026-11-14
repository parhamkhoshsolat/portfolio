// Proof strip under the hero: the same three facts for every visitor.
const items = [
  { value: "3 years", label: "data scientist at Sakoudar, 2022 to 2025" },
  { value: "28.67/30", label: "MSc Data Science weighted average, Federico II" },
  { value: "4", label: "live demos you can try on this site" },
];

export function HeroMarquee() {
  return (
    <div className="border-y border-border/30 bg-bg/40">
      <dl className="container grid gap-px py-5 sm:grid-cols-3">
        {items.map((it) => (
          <div key={it.label} className="px-1 py-2 sm:px-4 sm:first:pl-0">
            <dt className="sr-only">{it.label}</dt>
            <dd className="text-2xl font-semibold tabular-nums text-accent">{it.value}</dd>
            <dd className="mt-0.5 text-xs leading-snug text-muted">{it.label}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

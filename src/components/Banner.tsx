import Image from "next/image";
import type { Banner as BannerSpec, BannerVisual } from "@/lib/banners";

// 16:9 card banner: real visual (left 56%), result (right 44%). All text is real HTML.
// Styles live in globals.css under ".bn" (container-query sized, so one recipe fits every card width).

function Visual({ v }: { v: BannerVisual }) {
  switch (v.kind) {
    case "image":
      return (
        <Image
          src={v.src}
          alt=""
          fill
          sizes="(min-width: 1024px) 220px, (min-width: 640px) 30vw, 56vw"
          className="object-cover"
          style={{ objectPosition: v.position ?? "center" }}
        />
      );
    case "tiles":
      return (
        <div className="bn-tiles">
          {v.tiles.map((t) => (
            <figure key={t.src}>
              <Image src={t.src} alt="" fill sizes="120px" className="object-cover" />
              <figcaption>{t.label}</figcaption>
            </figure>
          ))}
        </div>
      );
    case "flow":
      return (
        <div className="bn-flow">
          {v.steps.map((s) => (
            <div key={s.text} className="bn-flow-step">
              <div className={`bn-fbox ${s.tone ?? ""}`}>{s.text}</div>
              <div className="bn-farr" aria-hidden>
                ↓
              </div>
            </div>
          ))}
          <div className="bn-frow">
            {v.outs.map((o) => (
              <div key={o.text} className={`bn-fbox ${o.tone ?? ""}`}>
                {o.text}
              </div>
            ))}
          </div>
        </div>
      );
    case "catches":
      return (
        <div className="bn-catch">
          {v.rows.map((r) => (
            <div key={r.label} className="bn-catch-row">
              <span className="bn-catch-lab">{r.label}</span>
              <span className="bn-catch-days">
                {r.days.split("").map((d, i) => (
                  <i key={i} className={`${d === "1" ? "on" : ""} ${i >= v.testFrom ? "test" : ""}`} />
                ))}
              </span>
            </div>
          ))}
          <div className="bn-catch-key">
            <span>train</span>
            <span className="test">test</span>
          </div>
        </div>
      );
    case "silhouette": {
      const ks = v.points.map((p) => p[0]);
      const kMin = Math.min(...ks);
      const kMax = Math.max(...ks);
      const x = (k: number) => 10 + ((k - kMin) / (kMax - kMin)) * 84;
      const y = (s: number) => 82 - ((s - 0.55) / 0.23) * 64;
      const pts = v.points.map(([k, s]) => `${x(k).toFixed(1)},${y(s).toFixed(1)}`).join(" ");
      const chosen = v.points.find((p) => p[0] === v.chosen)!;
      return (
        <div className="bn-plot">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
            <line x1="8" y1="88" x2="98" y2="88" stroke="#334155" strokeWidth="0.6" />
            <polyline points={pts} fill="none" stroke="#64748b" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
            <circle cx={x(chosen[0])} cy={y(chosen[1])} r="3" fill="#38bdf8" />
          </svg>
          <span className="bn-plab" style={{ left: "6%", top: "5%" }}>
            silhouette
          </span>
          <span className="bn-plab acc" style={{ left: `${x(chosen[0]) + 4}%`, top: `${y(chosen[1]) - 15}%` }}>
            K = {v.chosen} chosen
          </span>
          <span className="bn-plab" style={{ right: "5%", top: "5%" }}>
            K = {kMin} to {kMax}
          </span>
        </div>
      );
    }
    case "conditions":
      return (
        <div className="bn-conds">
          {v.items.map((c) => (
            <div key={c.name} className={`bn-cond ${c.isNew ? "new" : ""}`}>
              <b>{c.name}</b>
              <em>{c.note}</em>
            </div>
          ))}
        </div>
      );
    case "spec":
      return (
        <div className="bn-spec">
          <em>spec says</em>
          <div className="q">&ldquo;Reset clears the counter.&rdquo;</div>
          <em>it does not say</em>
          <div className="code">
            rst <span>active-high?</span>
          </div>
          <div className="code">
            rst <span>active-low?</span>
          </div>
          <em>so the model guesses</em>
        </div>
      );
  }
}

const PADDED = new Set(["flow", "catches", "silhouette", "conditions", "spec"]);

export function Banner({ spec, className = "" }: { spec: BannerSpec; className?: string }) {
  const max = spec.bars ? Math.max(...spec.bars.map((b) => b.value)) : 1;
  return (
    <div className={`bn ${className}`}>
      <div className={`bn-viz ${PADDED.has(spec.visual.kind) ? "pad" : ""} ${spec.dim ? "dim" : ""}`}>
        <Visual v={spec.visual} />
        <span className="bn-src">{spec.source}</span>
      </div>
      <div className="bn-res">
        <span className={`bn-chip ${spec.chip.tone}`}>{spec.chip.text}</span>
        <div>
          <div className="bn-val">{spec.value}</div>
          <div className="bn-lab">{spec.label}</div>
        </div>
        {spec.bars ? (
          <div className="bn-bars">
            {spec.bars.map((b) => (
              <div key={b.label} className={`bn-bar ${b.tone}`}>
                <span>{b.label}</span>
                <span className="bn-track">
                  <i style={{ width: `${(b.value / max) * 100}%` }} />
                </span>
                <span className="bn-num">{b.display}</span>
              </div>
            ))}
            {spec.barsNote ? <span className="bn-note">{spec.barsNote}</span> : null}
          </div>
        ) : spec.facts ? (
          <ul className="bn-facts">
            {spec.facts.map((f) => (
              <li key={f.text} className={f.amber ? "amb" : ""}>
                {f.text}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

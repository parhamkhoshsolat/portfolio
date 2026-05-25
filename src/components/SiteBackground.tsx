// Fixed full-viewport texture that lives behind every page. Pairs with
// CursorSpotlight (which sits above it on desktop) and the per-section
// bg-card/30 tints (which dim it locally in About + Credentials).
//
// Opacity is tuned low (1.5%) so the grid reads as texture, not pattern.
// The radial gradient up top echoes the hero treatment site-wide.

export function SiteBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px),
          radial-gradient(ellipse 1400px 700px at 50% -5%, rgba(56, 189, 248, 0.06), transparent 60%)
        `,
        backgroundSize: "56px 56px, 56px 56px, auto",
        backgroundAttachment: "fixed",
      }}
    />
  );
}

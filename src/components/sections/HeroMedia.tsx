/**
 * Swap point for hero background.
 * v1: ambient gradient + grid; replace with <video> loop or <Image> when assets land.
 */
export function HeroMedia() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(255,122,51,0.18),transparent_70%)]" />
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(var(--color-text)) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--color-text)) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 75%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-bg" />
    </div>
  );
}

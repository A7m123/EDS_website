import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CountUp } from "@/components/motion/CountUp";
import type { StatItem } from "@/lib/sanity/types";

const defaultStats: StatItem[] = [
  { value: 12, suffix: "+", label: "Years engineering in the region" },
  { value: 40, suffix: "+", label: "Projects delivered" },
  { value: 25, suffix: "", label: "Engineers across disciplines" },
  { value: 6, suffix: "", label: "Sectors served" },
];

type Props = { stats?: StatItem[] };

export function Stats({ stats }: Props) {
  const items = stats && stats.length > 0 ? stats : defaultStats;
  return (
    <Section tone="alt" size="sm" bordered>
      <Container>
        <ul className="grid grid-cols-2 gap-y-10 md:grid-cols-4">
          {items.map((s, i) => (
            <li key={`${s.label ?? i}`} className="flex flex-col gap-2">
              <span className="font-display text-display-md text-text">
                <CountUp to={s.value ?? 0} suffix={s.suffix ?? ""} />
              </span>
              <span className="font-mono text-eyebrow uppercase text-text-muted">
                {s.label}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

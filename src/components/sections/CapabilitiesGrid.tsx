import Link from "next/link";
import {
  Cpu,
  Ship,
  Zap,
  Wrench,
  Code2,
  Radar,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";

type Item = {
  title: string;
  desc: string;
  icon: LucideIcon;
  href?: string;
};

// v1 fallback content. When the CMS is populated, swap to <CapabilitiesGrid items={...} />.
const defaults: Item[] = [
  {
    title: "Research & Development",
    desc: "Concept-to-prototype engineering across mechanical, electrical, and software domains.",
    icon: Radar,
  },
  {
    title: "Electromechanical Systems",
    desc: "Custom actuators, control systems, and ruggedised hardware for the field.",
    icon: Wrench,
  },
  {
    title: "Marine Systems",
    desc: "Surface and subsurface platforms, payloads, and integration for harsh environments.",
    icon: Ship,
  },
  {
    title: "Software & Embedded",
    desc: "Real-time firmware, control software, and operator interfaces.",
    icon: Cpu,
  },
  {
    title: "Power & Energy",
    desc: "Energy storage, power electronics, and distribution for autonomous platforms.",
    icon: Zap,
  },
  {
    title: "Integration & Delivery",
    desc: "Systems integration, field testing, and handover with documentation.",
    icon: Code2,
  },
];

type Props = {
  items?: Item[];
};

export function CapabilitiesGrid({ items = defaults }: Props) {
  return (
    <Section tone="default" size="md">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>Capabilities</Eyebrow>
            <Heading as={2} size="lg" className="mt-6">
              Multidisciplinary engineering, delivered as one team.
            </Heading>
          </div>
          <Link
            href="/capabilities"
            className="font-mono text-eyebrow uppercase text-text-muted transition-colors hover:text-text"
          >
            All capabilities →
          </Link>
        </div>

        <Reveal
          as="ul"
          className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3"
          stagger={50}
        >
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <li
                key={item.title}
                className="group relative bg-bg p-8 transition-colors hover:bg-surface"
              >
                <Icon
                  aria-hidden
                  className="h-6 w-6 text-accent transition-transform duration-300 ease-out group-hover:-translate-y-0.5"
                />
                <h3 className="mt-6 font-display text-xl tracking-tight text-text">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-text-muted">{item.desc}</p>
              </li>
            );
          })}
        </Reveal>
      </Container>
    </Section>
  );
}

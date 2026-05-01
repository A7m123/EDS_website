import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import type { Cta } from "@/lib/sanity/types";

type Props = {
  title?: string;
  primary?: Cta;
  secondary?: Cta;
};

const defaults = {
  title: "Have a hard problem? Let's talk.",
  primary: { label: "Work with us", href: "/contact" },
  secondary: {
    label: "hello@energydriven.me",
    href: "mailto:hello@energydriven.me",
  },
};

export function CtaBand({ title, primary, secondary }: Props) {
  const t = title || defaults.title;
  const p = {
    label: primary?.label || defaults.primary.label,
    href: primary?.href || defaults.primary.href,
  };
  const s = {
    label: secondary?.label || defaults.secondary.label,
    href: secondary?.href || defaults.secondary.href,
  };
  const secondaryExternal = s.href.startsWith("mailto:") || s.href.startsWith("http");

  return (
    <Section tone="default" size="md">
      <Container>
        <div className="relative overflow-hidden rounded-2xl border border-border bg-surface p-10 md:p-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_85%_0%,rgba(255,122,51,0.18),transparent_70%)]"
          />
          <div className="relative grid gap-8 md:grid-cols-[1.5fr_1fr] md:items-center">
            <Heading as={2} size="lg">
              {t}
            </Heading>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Button href={p.href} size="lg" withArrow>
                {p.label}
              </Button>
              <Button
                href={s.href}
                size="lg"
                variant="secondary"
                external={secondaryExternal}
              >
                {s.label}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

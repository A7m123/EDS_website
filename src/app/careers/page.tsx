import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "Careers",
  description:
    "Join Energy Driven Solutions. We hire mechanical, electrical, embedded, and systems engineers to build hardware that ships.",
  path: "/careers",
});

const disciplines = [
  "Mechanical engineering",
  "Electrical & power electronics",
  "Embedded firmware",
  "Software (control systems, tooling, UI)",
  "Marine & naval architecture",
  "Systems integration & test",
];

export default function CareersPage() {
  return (
    <>
      <Section tone="default" size="sm" className="pt-32">
        <Container>
          <Eyebrow>Careers</Eyebrow>
          <Heading as={1} size="xl" className="mt-6 max-w-4xl">
            Engineers who&apos;d rather see it in the field than on a slide.
          </Heading>
          <p className="mt-6 max-w-prose text-text-muted">
            We&apos;re a small team. If you join, you&apos;ll touch hardware,
            firmware, and customers — sometimes in the same week. Most of our
            work is for defense, energy, marine, and government clients across
            the region.
          </p>
        </Container>
      </Section>

      <Section tone="surface" size="md" bordered>
        <Container className="grid gap-12 md:grid-cols-2">
          <div>
            <Eyebrow>Disciplines</Eyebrow>
            <Heading as={2} size="md" className="mt-6">
              We hire across these disciplines.
            </Heading>
          </div>
          <ul className="space-y-3 text-text">
            {disciplines.map((d) => (
              <li
                key={d}
                className="flex items-baseline gap-3 border-b border-border pb-3"
              >
                <span className="font-mono text-eyebrow text-accent">·</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="default" size="md">
        <Container className="text-center">
          <Heading as={2} size="md">
            No active opening that fits? Send a note anyway.
          </Heading>
          <p className="mx-auto mt-4 max-w-prose text-text-muted">
            We keep a short list of strong engineers we&apos;d like to work with
            when the right project lands.
          </p>
          <div className="mt-8 flex justify-center">
            <Button
              href="mailto:careers@energydriven.me?subject=Careers%20at%20EDS"
              size="lg"
              external
              withArrow
            >
              careers@energydriven.me
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}

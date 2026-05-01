import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { getCareersPage } from "@/lib/sanity/queries";
import { pageMetadata } from "@/lib/seo/metadata";

export const revalidate = 60;

export const metadata = pageMetadata({
  title: "Careers",
  description:
    "Join Energy Driven Systems. We hire mechanical, electrical, embedded, and systems engineers to build hardware that ships.",
  path: "/careers",
});

const fallback = {
  heroEyebrow: "Careers",
  heroHeadline:
    "Engineers who'd rather see it in the field than on a slide.",
  heroIntro:
    "We're a small team. If you join, you'll touch hardware, firmware, and customers — sometimes in the same week. Most of our work is for defense, energy, marine, and government clients across the region.",
  disciplinesEyebrow: "Disciplines",
  disciplinesTitle: "We hire across these disciplines.",
  disciplines: [
    "Mechanical engineering",
    "Electrical & power electronics",
    "Embedded firmware",
    "Software (control systems, tooling, UI)",
    "Marine & naval architecture",
    "Systems integration & test",
  ],
  ctaTitle: "No active opening that fits? Send a note anyway.",
  ctaBody:
    "We keep a short list of strong engineers we'd like to work with when the right project lands.",
  ctaEmail: "careers@energydriven.me",
};

export default async function CareersPage() {
  const careers = await getCareersPage();
  const disciplines =
    careers?.disciplines && careers.disciplines.length > 0
      ? careers.disciplines
      : fallback.disciplines;
  const email = careers?.ctaEmail || fallback.ctaEmail;
  const ctaLabel = careers?.ctaLabel || email;

  return (
    <>
      <Section tone="default" size="sm" className="pt-32">
        <Container>
          <Eyebrow>{careers?.heroEyebrow || fallback.heroEyebrow}</Eyebrow>
          <Heading as={1} size="xl" className="mt-6 max-w-4xl">
            {careers?.heroHeadline || fallback.heroHeadline}
          </Heading>
          <p className="mt-6 max-w-prose text-text-muted">
            {careers?.heroIntro || fallback.heroIntro}
          </p>
        </Container>
      </Section>

      <Section tone="surface" size="md" bordered>
        <Container className="grid gap-12 md:grid-cols-2">
          <div>
            <Eyebrow>
              {careers?.disciplinesEyebrow || fallback.disciplinesEyebrow}
            </Eyebrow>
            <Heading as={2} size="md" className="mt-6">
              {careers?.disciplinesTitle || fallback.disciplinesTitle}
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
            {careers?.ctaTitle || fallback.ctaTitle}
          </Heading>
          <p className="mx-auto mt-4 max-w-prose text-text-muted">
            {careers?.ctaBody || fallback.ctaBody}
          </p>
          <div className="mt-8 flex justify-center">
            <Button
              href={`mailto:${email}?subject=Careers%20at%20EDS`}
              size="lg"
              external
              withArrow
            >
              {ctaLabel}
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}

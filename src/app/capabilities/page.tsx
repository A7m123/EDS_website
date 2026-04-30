import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { getCapabilities } from "@/lib/sanity/queries";
import { pageMetadata } from "@/lib/seo/metadata";
import { CapabilitiesGrid } from "@/components/sections/CapabilitiesGrid";

export const revalidate = 60;

export const metadata = pageMetadata({
  title: "Capabilities",
  description:
    "What Energy Driven Solutions does — R&D, electromechanical systems, marine systems, software & embedded, power & energy, integration & delivery.",
  path: "/capabilities",
});

export default async function CapabilitiesPage() {
  const items = await getCapabilities();

  return (
    <>
      <Section tone="default" size="sm" className="pt-32">
        <Container>
          <Eyebrow>Capabilities</Eyebrow>
          <Heading as={1} size="xl" className="mt-6 max-w-4xl">
            Multidisciplinary engineering, delivered as one team.
          </Heading>
          <p className="mt-6 max-w-prose text-text-muted">
            We work across mechanical, electrical, software, and systems
            engineering. Engagements range from feasibility studies to fully
            integrated systems delivered to the field.
          </p>
        </Container>
      </Section>

      {items.length > 0 ? (
        <Section tone="surface" size="md">
          <Container>
            <Reveal
              as="ul"
              className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2"
              stagger={50}
            >
              {items.map((c) => (
                <li key={c._id} className="bg-bg p-8">
                  <h2 className="font-display text-2xl tracking-tight">
                    {c.title}
                  </h2>
                  {c.shortDesc ? (
                    <p className="mt-3 text-text-muted">{c.shortDesc}</p>
                  ) : null}
                </li>
              ))}
            </Reveal>
          </Container>
        </Section>
      ) : (
        // Fall back to the default capabilities grid until the CMS is populated.
        <CapabilitiesGrid />
      )}
    </>
  );
}

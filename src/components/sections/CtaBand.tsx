import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";

export function CtaBand() {
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
              Have a hard problem? Let&apos;s talk.
            </Heading>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Button href="/contact" size="lg" withArrow>
                Work with us
              </Button>
              <Button
                href="mailto:hello@energydriven.me"
                size="lg"
                variant="secondary"
                external
              >
                hello@energydriven.me
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

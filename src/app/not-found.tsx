import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

export default function NotFound() {
  return (
    <Section size="lg" className="pt-32">
      <Container className="text-center">
        <Eyebrow>404</Eyebrow>
        <Heading as={1} size="xl" className="mt-6">
          That page didn&apos;t make it past field testing.
        </Heading>
        <p className="mx-auto mt-6 max-w-prose text-text-muted">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <div className="mt-10 flex justify-center gap-3">
          <Button href="/" size="lg" withArrow>
            Back home
          </Button>
          <Button href="/projects" variant="secondary" size="lg">
            See projects
          </Button>
        </div>
      </Container>
    </Section>
  );
}

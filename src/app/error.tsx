"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <Section size="lg" className="pt-32">
      <Container className="text-center">
        <Eyebrow>Error</Eyebrow>
        <Heading as={1} size="xl" className="mt-6">
          Something went wrong.
        </Heading>
        <p className="mx-auto mt-6 max-w-prose text-text-muted">
          We hit an unexpected issue rendering this page. You can try again, or
          head back home.
        </p>
        {error.digest ? (
          <p className="mt-4 font-mono text-xs text-text-muted">
            Reference: {error.digest}
          </p>
        ) : null}
        <div className="mt-10 flex justify-center gap-3">
          <Button onClick={() => reset()} size="lg">
            Try again
          </Button>
          <Button href="/" variant="secondary" size="lg">
            Back home
          </Button>
        </div>
      </Container>
    </Section>
  );
}

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ContactForm } from "@/components/sections/ContactForm";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Get in touch with Energy Driven Solutions. Engineering R&D, electromechanical and marine systems, software, integration.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Section tone="default" size="sm" className="pt-32">
        <Container>
          <Eyebrow>Contact</Eyebrow>
          <Heading as={1} size="xl" className="mt-6 max-w-4xl">
            Tell us about the problem.
          </Heading>
          <p className="mt-6 max-w-prose text-text-muted">
            We&apos;ll come back within two business days. For urgent or sensitive
            inquiries, email{" "}
            <a
              href="mailto:hello@energydriven.me"
              className="text-accent underline-offset-4 hover:underline"
            >
              hello@energydriven.me
            </a>{" "}
            directly.
          </p>
        </Container>
      </Section>

      <Section tone="default" size="md">
        <Container className="grid gap-16 md:grid-cols-[1.4fr_1fr]">
          <ContactForm />
          <aside className="space-y-10 border-t border-border pt-10 md:border-l md:border-t-0 md:pl-12 md:pt-0">
            <div>
              <p className="font-mono text-eyebrow uppercase text-text-muted">
                Office
              </p>
              <p className="mt-3 text-text">
                Dubai, United Arab Emirates
                <br />
                <span className="text-text-muted">
                  Address from brand assets
                </span>
              </p>
            </div>
            <div>
              <p className="font-mono text-eyebrow uppercase text-text-muted">
                Email
              </p>
              <a
                href="mailto:hello@energydriven.me"
                className="mt-3 block text-text hover:text-accent"
              >
                hello@energydriven.me
              </a>
            </div>
            <div>
              <p className="font-mono text-eyebrow uppercase text-text-muted">
                Hours
              </p>
              <p className="mt-3 text-text">Sun – Thu, 09:00 – 18:00 GST</p>
            </div>
          </aside>
        </Container>
      </Section>
    </>
  );
}

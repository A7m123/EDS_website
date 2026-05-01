import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ContactForm } from "@/components/sections/ContactForm";
import { getContactPage } from "@/lib/sanity/queries";
import { pageMetadata } from "@/lib/seo/metadata";

export const revalidate = 60;

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Get in touch with Energy Driven Solutions. Engineering R&D, electromechanical and marine systems, software, integration.",
  path: "/contact",
});

const fallback = {
  heroEyebrow: "Contact",
  heroHeadline: "Tell us about the problem.",
  heroIntro:
    "We'll come back within two business days. For urgent or sensitive inquiries, email hello@energydriven.me directly.",
  officeAddress: "Dubai, United Arab Emirates",
  officeEmail: "hello@energydriven.me",
  officeHours: "Sun – Thu, 09:00 – 18:00 GST",
};

export default async function ContactPage() {
  const contact = await getContactPage();
  const email = contact?.officeEmail || fallback.officeEmail;

  return (
    <>
      <Section tone="default" size="sm" className="pt-32">
        <Container>
          <Eyebrow>{contact?.heroEyebrow || fallback.heroEyebrow}</Eyebrow>
          <Heading as={1} size="xl" className="mt-6 max-w-4xl">
            {contact?.heroHeadline || fallback.heroHeadline}
          </Heading>
          <p className="mt-6 max-w-prose text-text-muted">
            {contact?.heroIntro || fallback.heroIntro}
          </p>
        </Container>
      </Section>

      <Section tone="default" size="md">
        <Container className="grid gap-16 md:grid-cols-[1.4fr_1fr]">
          <ContactForm recipient={email} />
          <aside className="space-y-10 border-t border-border pt-10 md:border-l md:border-t-0 md:pl-12 md:pt-0">
            <div>
              <p className="font-mono text-eyebrow uppercase text-text-muted">
                Office
              </p>
              <p className="mt-3 whitespace-pre-line text-text">
                {contact?.officeAddress || fallback.officeAddress}
              </p>
            </div>
            <div>
              <p className="font-mono text-eyebrow uppercase text-text-muted">
                Email
              </p>
              <a
                href={`mailto:${email}`}
                className="mt-3 block text-text hover:text-accent"
              >
                {email}
              </a>
            </div>
            <div>
              <p className="font-mono text-eyebrow uppercase text-text-muted">
                Hours
              </p>
              <p className="mt-3 text-text">
                {contact?.officeHours || fallback.officeHours}
              </p>
            </div>
          </aside>
        </Container>
      </Section>
    </>
  );
}

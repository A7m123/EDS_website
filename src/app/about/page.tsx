import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { PortableBody } from "@/components/PortableBody";
import { getAboutPage, getTeamMembers } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { pageMetadata } from "@/lib/seo/metadata";

export const revalidate = 60;

export const metadata = pageMetadata({
  title: "About",
  description:
    "Energy Driven Solutions is a Dubai-based engineering R&D company building advanced systems for defense, energy, marine, and government clients.",
  path: "/about",
});

const fallback = {
  heroEyebrow: "About",
  heroHeadline: "A small engineering team with a wide remit.",
  heroIntro:
    "Energy Driven Solutions (EDS) is an engineering and technology R&D company based in Dubai. We design, build, and field-test electromechanical, marine, and software systems for defense, energy, and government clients across the region.",
  whereEyebrow: "Where we work",
  whereTitle: "Built in Dubai. Deployed across the region.",
  whereBodyText: [
    "Our workshop and office are in Dubai, United Arab Emirates. We ship hardware and embed engineers with customers across the GCC, East Africa, and South Asia.",
    "Field-testing is part of our rhythm. Most of what we deliver is expected to operate in dust, heat, salt, and intermittent connectivity — we design for that from day one.",
  ],
  leadershipEyebrow: "Leadership",
  leadershipTitle: "The people running it.",
};

export default async function AboutPage() {
  const [about, team] = await Promise.all([getAboutPage(), getTeamMembers()]);

  return (
    <>
      <Section tone="default" size="sm" className="pt-32">
        <Container>
          <Eyebrow>{about?.heroEyebrow || fallback.heroEyebrow}</Eyebrow>
          <Heading as={1} size="xl" className="mt-6 max-w-4xl">
            {about?.heroHeadline || fallback.heroHeadline}
          </Heading>
          <p className="mt-6 max-w-prose text-text-muted">
            {about?.heroIntro || fallback.heroIntro}
          </p>
        </Container>
      </Section>

      <Section tone="surface" size="md" bordered>
        <Container className="grid gap-16 md:grid-cols-2">
          <div>
            <Eyebrow>{about?.whereEyebrow || fallback.whereEyebrow}</Eyebrow>
            <Heading as={2} size="md" className="mt-6">
              {about?.whereTitle || fallback.whereTitle}
            </Heading>
          </div>
          {about?.whereBody && about.whereBody.length > 0 ? (
            <div className="space-y-4 text-text-muted">
              <PortableBody value={about.whereBody} />
            </div>
          ) : (
            <div className="space-y-4 text-text-muted">
              {fallback.whereBodyText.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
          )}
        </Container>
      </Section>

      {team.length > 0 ? (
        <Section tone="default" size="md">
          <Container>
            <Eyebrow>
              {about?.leadershipEyebrow || fallback.leadershipEyebrow}
            </Eyebrow>
            <Heading as={2} size="lg" className="mt-6">
              {about?.leadershipTitle || fallback.leadershipTitle}
            </Heading>

            <Reveal
              as="ul"
              className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
              stagger={70}
            >
              {team.map((m) => {
                const src = m.photo
                  ? urlFor(m.photo).width(800).height(800).fit("crop").url()
                  : null;
                return (
                  <li key={m._id}>
                    <div className="relative aspect-square overflow-hidden rounded-xl border border-border bg-surface">
                      {src ? (
                        <Image
                          src={src}
                          alt={m.photo?.alt ?? m.name}
                          fill
                          sizes="(min-width: 1024px) 33vw, 50vw"
                          className="object-cover"
                        />
                      ) : null}
                    </div>
                    <h3 className="mt-5 font-display text-lg tracking-tight">
                      {m.name}
                    </h3>
                    {m.role ? (
                      <p className="mt-1 font-mono text-eyebrow uppercase text-text-muted">
                        {m.role}
                      </p>
                    ) : null}
                    {m.bio ? (
                      <p className="mt-3 text-sm text-text-muted">{m.bio}</p>
                    ) : null}
                  </li>
                );
              })}
            </Reveal>
          </Container>
        </Section>
      ) : null}
    </>
  );
}

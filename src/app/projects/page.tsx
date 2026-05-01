import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { getAllProjects } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { pageMetadata } from "@/lib/seo/metadata";

export const revalidate = 60;

export const metadata = pageMetadata({
  title: "Projects",
  description:
    "Selected engineering projects from Energy Driven Systems across defense, energy, marine, and government.",
  path: "/projects",
});

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <>
      <Section tone="default" size="sm" className="pt-32">
        <Container>
          <Eyebrow>Projects</Eyebrow>
          <Heading as={1} size="xl" className="mt-6 max-w-4xl">
            Engineering across defense, energy, marine, and government.
          </Heading>
          <p className="mt-6 max-w-2xl text-text-muted">
            A selection of projects we&apos;ve delivered. Detailed case studies
            available on request for sensitive work.
          </p>
        </Container>
      </Section>

      <Section tone="default" size="md">
        <Container>
          {projects.length === 0 ? (
            <p className="text-text-muted">
              Project listings will appear here once they are published in the CMS.
            </p>
          ) : (
            <Reveal
              as="ul"
              className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2"
              stagger={70}
            >
              {projects.map((p) => {
                const src = p.hero
                  ? urlFor(p.hero).width(1200).height(800).fit("crop").url()
                  : null;
                return (
                  <li key={p._id}>
                    <Link href={`/projects/${p.slug}`} className="group block">
                      <div className="relative aspect-[3/2] overflow-hidden rounded-xl border border-border bg-surface">
                        {src ? (
                          <Image
                            src={src}
                            alt={p.hero?.alt ?? p.title}
                            fill
                            sizes="(min-width: 768px) 50vw, 100vw"
                            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.05]"
                          />
                        ) : null}
                      </div>
                      <div className="mt-5 flex items-baseline justify-between gap-4">
                        <h2 className="font-display text-xl tracking-tight">
                          {p.title}
                        </h2>
                        {p.year ? (
                          <span className="font-mono text-xs text-text-muted">
                            {p.year}
                          </span>
                        ) : null}
                      </div>
                      <div className="mt-2 flex items-center gap-3 text-xs text-text-muted">
                        {p.client ? <span>{p.client}</span> : null}
                        {p.client && p.sector ? <span>·</span> : null}
                        {p.sector ? <span className="capitalize">{p.sector}</span> : null}
                      </div>
                      {p.summary ? (
                        <p className="mt-3 max-w-prose text-sm text-text-muted">
                          {p.summary}
                        </p>
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </Reveal>
          )}
        </Container>
      </Section>
    </>
  );
}

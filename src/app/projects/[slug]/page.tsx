import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PortableBody } from "@/components/PortableBody";
import { urlFor } from "@/lib/sanity/image";
import {
  getAllProjectSlugs,
  getProjectBySlug,
} from "@/lib/sanity/queries";
import { pageMetadata } from "@/lib/seo/metadata";
import { BreadcrumbJsonLd } from "@/lib/seo/jsonld";

type Params = { params: { slug: string } };

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) return {};
  const ogImage = project.hero
    ? urlFor(project.hero).width(1200).height(630).fit("crop").url()
    : undefined;
  return pageMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
    ogImage,
  });
}

export default async function ProjectPage({ params }: Params) {
  const project = await getProjectBySlug(params.slug);
  if (!project) notFound();

  const heroSrc = project.hero
    ? urlFor(project.hero).width(2000).height(1100).fit("crop").url()
    : null;

  return (
    <article>
      <Section tone="default" size="sm" className="pt-32">
        <Container>
          <BreadcrumbJsonLd
            items={[
              { name: "Projects", href: "/projects" },
              { name: project.title, href: `/projects/${project.slug}` },
            ]}
          />
          <Link
            href="/projects"
            className="font-mono text-eyebrow uppercase text-text-muted transition-colors hover:text-text"
          >
            ← Projects
          </Link>
          <div className="mt-8 grid gap-10 md:grid-cols-[2fr_1fr] md:items-end">
            <div>
              <Eyebrow>{project.sector ?? "Project"}</Eyebrow>
              <Heading as={1} size="xl" className="mt-6">
                {project.title}
              </Heading>
              {project.summary ? (
                <p className="mt-6 max-w-prose text-text-muted">
                  {project.summary}
                </p>
              ) : null}
            </div>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-border pt-6 text-sm md:border-l md:border-t-0 md:pl-8 md:pt-0">
              {project.client ? (
                <div className="col-span-2">
                  <dt className="font-mono text-eyebrow uppercase text-text-muted">
                    Client
                  </dt>
                  <dd className="mt-1 text-text">{project.client}</dd>
                </div>
              ) : null}
              {project.year ? (
                <div>
                  <dt className="font-mono text-eyebrow uppercase text-text-muted">
                    Year
                  </dt>
                  <dd className="mt-1 text-text">{project.year}</dd>
                </div>
              ) : null}
              {project.sector ? (
                <div>
                  <dt className="font-mono text-eyebrow uppercase text-text-muted">
                    Sector
                  </dt>
                  <dd className="mt-1 capitalize text-text">{project.sector}</dd>
                </div>
              ) : null}
              {project.tech && project.tech.length > 0 ? (
                <div className="col-span-2">
                  <dt className="font-mono text-eyebrow uppercase text-text-muted">
                    Stack
                  </dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </dd>
                </div>
              ) : null}
            </dl>
          </div>
        </Container>
      </Section>

      {heroSrc ? (
        <Container className="mb-16 md:mb-24">
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-border bg-surface">
            <Image
              src={heroSrc}
              alt={project.hero?.alt ?? project.title}
              fill
              priority
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="object-cover"
            />
          </div>
        </Container>
      ) : null}

      {project.body && project.body.length > 0 ? (
        <Section tone="default" size="md">
          <Container>
            <div className="mx-auto max-w-prose">
              <PortableBody value={project.body} />
            </div>
          </Container>
        </Section>
      ) : null}

      {project.gallery && project.gallery.length > 0 ? (
        <Section tone="surface" size="md">
          <Container>
            <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {project.gallery.map((g, i) => {
                const src = urlFor(g).width(1400).fit("max").url();
                return (
                  <li key={`${src}-${i}`}>
                    <div className="relative aspect-[3/2] overflow-hidden rounded-xl border border-border bg-bg">
                      <Image
                        src={src}
                        alt={g.alt ?? `${project.title} — image ${i + 1}`}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    {g.alt ? (
                      <p className="mt-2 font-mono text-xs text-text-muted">
                        {g.alt}
                      </p>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </Container>
        </Section>
      ) : null}
    </article>
  );
}

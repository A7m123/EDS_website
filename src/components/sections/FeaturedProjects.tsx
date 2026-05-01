import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { urlFor } from "@/lib/sanity/image";
import type { Project } from "@/lib/sanity/types";

type Props = {
  projects: Project[];
  eyebrow?: string;
  title?: string;
};

export function FeaturedProjects({ projects, eyebrow, title }: Props) {
  if (!projects || projects.length === 0) return null;
  const e = eyebrow || "Selected Work";
  const t = title || "Built in the field, for the field.";

  return (
    <Section tone="surface" size="md">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>{e}</Eyebrow>
            <Heading as={2} size="lg" className="mt-6">
              {t}
            </Heading>
          </div>
          <Link
            href="/projects"
            className="font-mono text-eyebrow uppercase text-text-muted transition-colors hover:text-text"
          >
            All projects →
          </Link>
        </div>

        <Reveal
          as="ul"
          className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-3"
          stagger={80}
        >
          {projects.map((p) => {
            const src = p.hero
              ? urlFor(p.hero).width(900).height(600).fit("crop").url()
              : null;
            return (
              <li key={p._id}>
                <Link
                  href={`/projects/${p.slug}`}
                  className="group block focus-visible:outline-none"
                >
                  <div className="relative aspect-[3/2] overflow-hidden rounded-xl border border-border bg-bg">
                    {src ? (
                      <Image
                        src={src}
                        alt={p.hero?.alt ?? p.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, 100vw"
                        className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.05]"
                      />
                    ) : (
                      <div className="absolute inset-0 grid place-items-center text-text-muted">
                        {p.title}
                      </div>
                    )}
                  </div>
                  <div className="mt-5 flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-lg tracking-tight text-text">
                      {p.title}
                    </h3>
                    {p.year ? (
                      <span className="font-mono text-xs text-text-muted">
                        {p.year}
                      </span>
                    ) : null}
                  </div>
                  {p.summary ? (
                    <p className="mt-2 line-clamp-2 text-sm text-text-muted">
                      {p.summary}
                    </p>
                  ) : null}
                </Link>
              </li>
            );
          })}
        </Reveal>
      </Container>
    </Section>
  );
}

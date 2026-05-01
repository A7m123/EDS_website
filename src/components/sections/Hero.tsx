"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HeroMedia } from "./HeroMedia";
import { prefersReducedMotion } from "@/lib/motion/reduced-motion";
import type { Cta } from "@/lib/sanity/types";

type Props = {
  eyebrow?: string;
  headline1?: string;
  headline2?: string;
  subhead?: string;
  ctaPrimary?: Cta;
  ctaSecondary?: Cta;
};

const defaults = {
  eyebrow: "Engineering & Technology R&D",
  headline1: "Hard problems,",
  headline2: "engineered into reality.",
  subhead:
    "Energy Driven Systems is a Dubai-based R&D house building electromechanical, marine, and software systems for defense, energy, and government clients across the region.",
  ctaPrimary: { label: "Explore capabilities", href: "/capabilities" },
  ctaSecondary: { label: "See our work", href: "/projects" },
};

export function Hero({
  eyebrow,
  headline1,
  headline2,
  subhead,
  ctaPrimary,
  ctaSecondary,
}: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const e = eyebrow || defaults.eyebrow;
  const h1 = headline1 || defaults.headline1;
  const h2 = headline2 || defaults.headline2;
  const sub = subhead || defaults.subhead;
  const cta1 = {
    label: ctaPrimary?.label || defaults.ctaPrimary.label,
    href: ctaPrimary?.href || defaults.ctaPrimary.href,
  };
  const cta2 = {
    label: ctaSecondary?.label || defaults.ctaSecondary.label,
    href: ctaSecondary?.href || defaults.ctaSecondary.href,
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const targets = root.querySelectorAll<HTMLElement>("[data-anim]");
    if (prefersReducedMotion()) {
      targets.forEach((t) => {
        t.style.opacity = "1";
        t.style.transform = "none";
      });
      return;
    }

    targets.forEach((t) => {
      t.style.opacity = "0";
      t.style.transform = "translateY(8px)";
    });

    anime({
      targets,
      opacity: [0, 1],
      translateY: [8, 0],
      duration: 600,
      easing: "easeOutQuart",
      delay: anime.stagger(80, { start: 80 }),
    });
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative isolate overflow-hidden border-b border-border/60 bg-bg pt-28 pb-24 md:pt-40 md:pb-36"
    >
      <HeroMedia />
      <Container className="relative">
        <div className="max-w-4xl">
          <span data-anim className="inline-block">
            <Eyebrow>{e}</Eyebrow>
          </span>

          <Heading as={1} size="xl" className="mt-8 text-text">
            <span data-anim className="block">
              {h1}
            </span>
            <span data-anim className="block text-text-muted">
              {h2}
            </span>
          </Heading>

          <p
            data-anim
            className="mt-8 max-w-2xl text-pretty text-base text-text-muted md:text-lg"
          >
            {sub}
          </p>

          <div data-anim className="mt-10 flex flex-wrap items-center gap-3">
            <Button href={cta1.href} size="lg" withArrow>
              {cta1.label}
            </Button>
            <Button href={cta2.href} size="lg" variant="secondary">
              {cta2.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

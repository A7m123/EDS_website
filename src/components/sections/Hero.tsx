"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HeroMedia } from "./HeroMedia";
import { prefersReducedMotion } from "@/lib/motion/reduced-motion";

export function Hero() {
  const rootRef = useRef<HTMLDivElement | null>(null);

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
            <Eyebrow>Engineering &amp; Technology R&amp;D</Eyebrow>
          </span>

          <Heading
            as={1}
            size="xl"
            className="mt-8 text-text"
          >
            <span data-anim className="block">
              Hard problems,
            </span>
            <span data-anim className="block text-text-muted">
              engineered into reality.
            </span>
          </Heading>

          <p
            data-anim
            className="mt-8 max-w-2xl text-pretty text-base text-text-muted md:text-lg"
          >
            Energy Driven Solutions is a Dubai-based R&amp;D house building
            electromechanical, marine, and software systems for defense, energy,
            and government clients across the region.
          </p>

          <div data-anim className="mt-10 flex flex-wrap items-center gap-3">
            <Button href="/capabilities" size="lg" withArrow>
              Explore capabilities
            </Button>
            <Button href="/projects" size="lg" variant="secondary">
              See our work
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

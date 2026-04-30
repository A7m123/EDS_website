"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { prefersReducedMotion } from "@/lib/motion/reduced-motion";

const steps = [
  {
    n: "01",
    title: "Scope & feasibility",
    body: "We start in the constraint space — mission, environment, integration, budget. Out comes a feasibility brief and a path to prototype.",
  },
  {
    n: "02",
    title: "Design & prototype",
    body: "Concurrent mechanical, electrical, and software design. Hardware-in-the-loop from week one. Iterations are short.",
  },
  {
    n: "03",
    title: "Build & integrate",
    body: "In-house fabrication and assembly. Bench tests, environmental tests, then full system integration with the operator's stack.",
  },
  {
    n: "04",
    title: "Field & handover",
    body: "Field trials with the customer's team. Documentation, training, and a sustainment plan for the long tail.",
  },
];

export function Approach() {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const items = wrap.querySelectorAll<HTMLLIElement>("[data-step]");
    if (items.length === 0) return;

    if (prefersReducedMotion()) {
      items.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }

    items.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(16px)";
    });

    const observer = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          anime({
            targets: items,
            opacity: [0, 1],
            translateY: [16, 0],
            duration: 500,
            easing: "easeOutQuart",
            delay: anime.stagger(120),
          });
          obs.disconnect();
          break;
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(wrap);
    return () => observer.disconnect();
  }, []);

  return (
    <Section tone="default" size="md">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>Approach</Eyebrow>
          <Heading as={2} size="lg" className="mt-6">
            How a project becomes a delivered system.
          </Heading>
        </div>

        <div ref={wrapRef} className="mt-16">
          <ol className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <li
                key={s.n}
                data-step
                className="bg-bg p-8 transition-colors hover:bg-surface"
              >
                <span className="font-mono text-eyebrow uppercase text-accent">
                  Step {s.n}
                </span>
                <h3 className="mt-6 font-display text-xl tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm text-text-muted">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}

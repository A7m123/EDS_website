"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { prefersReducedMotion } from "@/lib/motion/reduced-motion";
import type { ApproachStep } from "@/lib/sanity/types";

const defaultSteps: ApproachStep[] = [
  {
    number: "01",
    title: "Scope & feasibility",
    body: "We start in the constraint space — mission, environment, integration, budget. Out comes a feasibility brief and a path to prototype.",
  },
  {
    number: "02",
    title: "Design & prototype",
    body: "Concurrent mechanical, electrical, and software design. Hardware-in-the-loop from week one. Iterations are short.",
  },
  {
    number: "03",
    title: "Build & integrate",
    body: "In-house fabrication and assembly. Bench tests, environmental tests, then full system integration with the operator's stack.",
  },
  {
    number: "04",
    title: "Field & handover",
    body: "Field trials with the customer's team. Documentation, training, and a sustainment plan for the long tail.",
  },
];

type Props = {
  eyebrow?: string;
  title?: string;
  steps?: ApproachStep[];
};

export function Approach({ eyebrow, title, steps }: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const e = eyebrow || "Approach";
  const t = title || "How a project becomes a delivered system.";
  const items = steps && steps.length > 0 ? steps : defaultSteps;

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const els = wrap.querySelectorAll<HTMLLIElement>("[data-step]");
    if (els.length === 0) return;

    if (prefersReducedMotion()) {
      els.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }

    els.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(16px)";
    });

    const observer = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          anime({
            targets: els,
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
          <Eyebrow>{e}</Eyebrow>
          <Heading as={2} size="lg" className="mt-6">
            {t}
          </Heading>
        </div>

        <div ref={wrapRef} className="mt-16">
          <ol className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
            {items.map((s, i) => (
              <li
                key={`${s.number ?? i}-${s.title ?? ""}`}
                data-step
                className="bg-bg p-8 transition-colors hover:bg-surface"
              >
                <span className="font-mono text-eyebrow uppercase text-accent">
                  Step {s.number ?? String(i + 1).padStart(2, "0")}
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

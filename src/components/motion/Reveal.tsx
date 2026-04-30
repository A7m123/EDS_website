"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import anime from "animejs";
import { prefersReducedMotion } from "@/lib/motion/reduced-motion";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  /** Stagger delay between direct children, in ms. */
  stagger?: number;
  /** Initial delay before the first child animates, in ms. */
  delay?: number;
  /** Px of upward translate to start from. */
  translate?: number;
  /** Total duration in ms. */
  duration?: number;
  /** Selector for children to animate. Defaults to direct children via `> *`. */
  selector?: string;
  className?: string;
  as?: "div" | "section" | "ul" | "ol";
};

export function Reveal({
  children,
  stagger = 60,
  delay = 0,
  translate = 12,
  duration = 200,
  selector = ":scope > *",
  className,
  as: Tag = "div",
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const targets = Array.from(node.querySelectorAll<HTMLElement>(selector));
    if (targets.length === 0) return;

    if (prefersReducedMotion()) {
      targets.forEach((t) => {
        t.style.opacity = "1";
        t.style.transform = "none";
      });
      return;
    }

    targets.forEach((t) => {
      t.style.opacity = "0";
      t.style.transform = `translateY(${translate}px)`;
      t.style.willChange = "opacity, transform";
    });

    const observer = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          anime({
            targets,
            opacity: [0, 1],
            translateY: [translate, 0],
            duration,
            delay: anime.stagger(stagger, { start: delay }),
            easing: "easeOutQuart",
            complete: () => {
              targets.forEach((t) => {
                t.style.willChange = "";
              });
            },
          });
          obs.disconnect();
          break;
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [stagger, delay, translate, duration, selector]);

  return (
    <Tag ref={ref as never} className={cn(className)}>
      {children}
    </Tag>
  );
}

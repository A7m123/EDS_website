"use client";

import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import { prefersReducedMotion } from "@/lib/motion/reduced-motion";

type Props = {
  to: number;
  duration?: number;
  /** Format the displayed number. */
  format?: (n: number) => string;
  /** Optional suffix appended after the number, e.g. "+", "k". */
  suffix?: string;
  className?: string;
};

const defaultFormat = (n: number) => Math.round(n).toLocaleString();

export function CountUp({
  to,
  duration = 1200,
  format = defaultFormat,
  suffix,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (prefersReducedMotion()) {
      setValue(to);
      return;
    }

    const counter = { v: 0 };
    let started = false;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || started) continue;
          started = true;
          anime({
            targets: counter,
            v: to,
            round: 1,
            easing: "easeOutQuart",
            duration,
            update: () => setValue(counter.v),
          });
          obs.disconnect();
          break;
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [to, duration]);

  return (
    <span ref={ref} className={className} aria-label={`${to}${suffix ?? ""}`}>
      {format(value)}
      {suffix}
    </span>
  );
}

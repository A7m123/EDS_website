import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Eyebrow({ className, ...rest }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-eyebrow uppercase text-text-muted",
        "before:block before:h-px before:w-6 before:bg-text-muted/50",
        className,
      )}
      {...rest}
    />
  );
}

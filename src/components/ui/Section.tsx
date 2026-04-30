import type { HTMLAttributes, ElementType } from "react";
import { cn } from "@/lib/cn";

type Tone = "default" | "surface" | "alt";

type Props = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  tone?: Tone;
  size?: "sm" | "md" | "lg";
  bordered?: boolean;
};

const toneClass: Record<Tone, string> = {
  default: "bg-bg",
  surface: "bg-surface",
  alt: "bg-surface-alt",
};

const sizeClass = {
  sm: "py-16 md:py-20",
  md: "py-24 md:py-32",
  lg: "py-32 md:py-44",
};

export function Section({
  as: Tag = "section",
  tone = "default",
  size = "md",
  bordered = false,
  className,
  ...rest
}: Props) {
  return (
    <Tag
      className={cn(
        "relative",
        toneClass[tone],
        sizeClass[size],
        bordered && "border-y border-border",
        className,
      )}
      {...rest}
    />
  );
}

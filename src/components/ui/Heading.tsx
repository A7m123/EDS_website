import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Level = 1 | 2 | 3 | 4;
type Size = "xl" | "lg" | "md" | "sm";

type Props = HTMLAttributes<HTMLHeadingElement> & {
  as?: Level;
  size?: Size;
  balance?: boolean;
};

const sizeClass: Record<Size, string> = {
  xl: "text-display-xl",
  lg: "text-display-lg",
  md: "text-display-md",
  sm: "text-2xl md:text-3xl leading-tight tracking-tight",
};

export function Heading({
  as = 2,
  size = "lg",
  balance = true,
  className,
  ...rest
}: Props) {
  const Tag = `h${as}` as "h1" | "h2" | "h3" | "h4";
  return (
    <Tag
      className={cn(
        "font-display text-text",
        sizeClass[size],
        balance && "text-balance",
        className,
      )}
      {...rest}
    />
  );
}

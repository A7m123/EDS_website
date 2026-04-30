import { forwardRef } from "react";
import type { HTMLAttributes, ElementType } from "react";
import { cn } from "@/lib/cn";

type Props = HTMLAttributes<HTMLDivElement> & {
  as?: ElementType;
};

export const Container = forwardRef<HTMLDivElement, Props>(function Container(
  { as: Tag = "div", className, ...rest },
  ref,
) {
  return (
    <Tag
      ref={ref}
      className={cn("mx-auto w-full max-w-screen-2xl px-6 md:px-8 lg:px-12", className)}
      {...rest}
    />
  );
});

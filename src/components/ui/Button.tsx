import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-medium tracking-tight " +
  "transition-colors duration-200 ease-out-quart focus-visible:ring-2 " +
  "focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg " +
  "disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

const variantClass: Record<Variant, string> = {
  primary: "bg-accent text-bg hover:bg-accent-muted",
  secondary: "bg-surface text-text border border-border hover:bg-surface-alt",
  ghost: "bg-transparent text-text hover:bg-surface",
};

const sizeClass: Record<Size, string> = {
  sm: "h-9 px-3 text-sm rounded-md",
  md: "h-11 px-5 text-sm rounded-md",
  lg: "h-12 px-6 text-base rounded-md",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  children?: ReactNode;
  className?: string;
};

type AsLinkProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className"> & {
    href: string;
    external?: boolean;
  };

type AsButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
    href?: undefined;
  };

type Props = AsLinkProps | AsButtonProps;

export function Button(props: Props) {
  const {
    variant = "primary",
    size = "md",
    withArrow = false,
    className,
    children,
    ...rest
  } = props;

  const classes = cn(base, variantClass[variant], sizeClass[size], className);

  const inner = (
    <>
      {children}
      {withArrow ? <ArrowUpRight aria-hidden className="h-4 w-4" /> : null}
    </>
  );

  if ("href" in props && props.href !== undefined) {
    const { href, external, ...anchorRest } = rest as AsLinkProps;
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          {...anchorRest}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...anchorRest}>
        {inner}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as AsButtonProps)}>
      {inner}
    </button>
  );
}

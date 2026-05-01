import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { urlFor } from "@/lib/sanity/image";
import type { SanityImage } from "@/lib/sanity/types";

const columns = [
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/capabilities", label: "Capabilities" },
      { href: "/projects", label: "Projects" },
    ],
  },
  {
    title: "Connect",
    links: [
      { href: "/careers", label: "Careers" },
      { href: "/contact", label: "Contact" },
      { href: "mailto:hello@energydriven.me", label: "hello@energydriven.me" },
    ],
  },
];

type Props = {
  logo?: SanityImage;
  address?: string;
};

export function Footer({ logo, address }: Props) {
  const year = new Date().getFullYear();
  const logoSrc = logo ? urlFor(logo).height(96).fit("max").url() : null;

  return (
    <footer className="border-t border-border bg-bg">
      <Container className="grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:py-20">
        <div>
          <Link
            href="/"
            className="inline-flex items-center"
            aria-label="Energy Driven Systems"
          >
            {logoSrc ? (
              <Image
                src={logoSrc}
                alt="Energy Driven Systems"
                width={200}
                height={48}
                className="h-10 w-auto md:h-12"
              />
            ) : (
              <span className="font-display text-2xl tracking-tight">
                Energy Driven Systems
              </span>
            )}
          </Link>
          <p className="mt-4 max-w-prose text-sm text-text-muted">
            Engineering and technology R&amp;D for defense, energy, marine, and
            government. Based in Dubai.
          </p>
        </div>
        {columns.map((c) => (
          <div key={c.title}>
            <p className="font-mono text-eyebrow uppercase text-text-muted">
              {c.title}
            </p>
            <ul className="mt-4 space-y-3">
              {c.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-text transition-colors hover:text-accent"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
      <div className="border-t border-border">
        <Container className="flex flex-col items-start gap-2 py-6 text-xs text-text-muted md:flex-row md:items-center md:justify-between">
          <p>© {year} Energy Driven Systems. All rights reserved.</p>
          <p className="font-mono">
            {address || "Dubai, United Arab Emirates"}
          </p>
        </Container>
      </div>
    </footer>
  );
}

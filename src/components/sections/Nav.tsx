import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { urlFor } from "@/lib/sanity/image";
import type { SanityImage } from "@/lib/sanity/types";

const fallbackLinks = [
  { href: "/about", label: "About" },
  { href: "/capabilities", label: "Capabilities" },
  { href: "/projects", label: "Projects" },
  { href: "/careers", label: "Careers" },
];

type Props = {
  logo?: SanityImage;
  links?: { href: string; label: string }[];
};

export function Nav({ logo, links }: Props) {
  const items = links && links.length > 0 ? links : fallbackLinks;
  const logoSrc = logo ? urlFor(logo).height(64).fit("max").url() : null;

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-bg/80 backdrop-blur supports-[backdrop-filter]:bg-bg/60">
      <Container className="flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          className="flex items-center"
          aria-label="Energy Driven Systems — Home"
        >
          {logoSrc ? (
            <Image
              src={logoSrc}
              alt="Energy Driven Systems"
              width={140}
              height={32}
              className="h-7 w-auto md:h-8"
              priority
            />
          ) : (
            <span className="font-display text-lg tracking-tight md:text-xl">
              EDS
            </span>
          )}
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {items.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-text-muted transition-colors hover:text-text"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button href="/contact" size="sm" variant="secondary" withArrow>
            Contact
          </Button>
        </div>
      </Container>
    </header>
  );
}

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { urlFor } from "@/lib/sanity/image";
import type { ClientLogo } from "@/lib/sanity/types";

type Props = { logos: ClientLogo[] };

export function ClientLogos({ logos }: Props) {
  if (!logos || logos.length === 0) return null;

  return (
    <section
      aria-label="Trusted by"
      className="border-y border-border bg-surface/60 py-10"
    >
      <Container>
        <p className="text-center font-mono text-eyebrow uppercase text-text-muted">
          Trusted by teams across defense, energy &amp; marine
        </p>
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-80">
          {logos.map((l) => {
            const src = l.logo ? urlFor(l.logo).height(48).fit("max").url() : null;
            return (
              <li key={l._id} className="grayscale">
                {src ? (
                  <Image
                    src={src}
                    alt={l.name}
                    width={120}
                    height={32}
                    className="h-8 w-auto object-contain"
                  />
                ) : (
                  <span className="text-text-muted">{l.name}</span>
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

import Image from "next/image";
import { PortableText } from "@portabletext/react";
import type { PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "next-sanity";
import { urlFor } from "@/lib/sanity/image";
import type { SanityImage } from "@/lib/sanity/types";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-pretty text-base leading-relaxed text-text-muted">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-12 font-display text-2xl tracking-tight md:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 font-display text-xl tracking-tight">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-8 border-l-2 border-accent pl-6 italic text-text">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="ml-5 list-disc space-y-2 text-text-muted">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="ml-5 list-decimal space-y-2 text-text-muted">{children}</ol>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href = (value as { href?: string } | undefined)?.href ?? "#";
      const external = href.startsWith("http");
      return (
        <a
          href={href}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className="text-accent underline-offset-4 hover:underline"
        >
          {children}
        </a>
      );
    },
    strong: ({ children }) => (
      <strong className="font-semibold text-text">{children}</strong>
    ),
  },
  types: {
    image: ({ value }) => {
      const img = value as SanityImage;
      const src = urlFor(img).width(1600).fit("max").url();
      return (
        <figure className="my-10">
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border bg-surface">
            <Image
              src={src}
              alt={img.alt ?? ""}
              fill
              sizes="(min-width: 1024px) 800px, 100vw"
              className="object-cover"
            />
          </div>
          {img.alt ? (
            <figcaption className="mt-3 font-mono text-xs text-text-muted">
              {img.alt}
            </figcaption>
          ) : null}
        </figure>
      );
    },
  },
};

export function PortableBody({ value }: { value: PortableTextBlock[] }) {
  return (
    <div className="space-y-4">
      <PortableText value={value} components={components} />
    </div>
  );
}

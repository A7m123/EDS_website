import type { Metadata } from "next";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://energydriven.me";

export const siteName = "Energy Driven Solutions";

const defaultDescription =
  "Engineering and technology R&D for defense, energy, marine, and government — based in Dubai.";

export const defaultMetadata: Metadata = {
  title: {
    default: `${siteName} — Engineering & Technology R&D`,
    template: `%s — ${siteName}`,
  },
  description: defaultDescription,
  applicationName: siteName,
  openGraph: {
    type: "website",
    siteName,
    url: siteUrl,
    title: `${siteName} — Engineering & Technology R&D`,
    description: defaultDescription,
    images: [
      {
        url: `/api/og?title=${encodeURIComponent(siteName)}`,
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

type PageMetaInput = {
  title: string;
  description?: string;
  path?: string;
  ogImage?: string;
};

export function pageMetadata({
  title,
  description,
  path,
  ogImage,
}: PageMetaInput): Metadata {
  const desc = description ?? defaultDescription;
  const url = path ? `${siteUrl}${path}` : siteUrl;
  const image = ogImage ?? `/api/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName,
      url,
      title,
      description: desc,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: [image],
    },
  };
}

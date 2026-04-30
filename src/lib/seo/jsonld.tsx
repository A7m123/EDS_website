import { siteName, siteUrl } from "./metadata";

type JsonLdProps = {
  data: Record<string, unknown>;
};

function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: siteName,
        url: siteUrl,
        logo: `${siteUrl}/logo.svg`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Dubai",
          addressCountry: "AE",
        },
      }}
    />
  );
}

type Crumb = { name: string; href: string };

export function BreadcrumbJsonLd({ items }: { items: Crumb[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: `${siteUrl}${item.href}`,
        })),
      }}
    />
  );
}

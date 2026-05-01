import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter, JetBrains_Mono } from "next/font/google";
import { VisualEditing } from "next-sanity";
import "./globals.css";
import { SkipLink } from "@/components/ui/SkipLink";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { siteUrl, defaultMetadata } from "@/lib/seo/metadata";
import { OrganizationJsonLd } from "@/lib/seo/jsonld";
import { getSiteSettings } from "@/lib/sanity/queries";

const display = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-display",
  weight: "100 900",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  ...defaultMetadata,
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSiteSettings();
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-bg text-text antialiased">
        <SkipLink />
        <Nav logo={settings?.logo} links={settings?.nav} />
        <main id="main" className="relative">
          {children}
        </main>
        <Footer logo={settings?.logo} address={settings?.address} />
        <OrganizationJsonLd />
        <VisualEditing />
      </body>
    </html>
  );
}

import { Hero } from "@/components/sections/Hero";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { CapabilitiesGrid } from "@/components/sections/CapabilitiesGrid";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Approach } from "@/components/sections/Approach";
import { Stats } from "@/components/sections/Stats";
import { CtaBand } from "@/components/sections/CtaBand";
import {
  getClientLogos,
  getFeaturedProjects,
  getHomePage,
  getRecentProjects,
} from "@/lib/sanity/queries";
import { pageMetadata } from "@/lib/seo/metadata";

export const revalidate = 60;

export const metadata = pageMetadata({
  title: "Energy Driven Systems",
  description:
    "Engineering and technology R&D for defense, energy, marine, and government — based in Dubai.",
  path: "/",
});

export default async function HomePage() {
  const [home, logos, featured, recent] = await Promise.all([
    getHomePage(),
    getClientLogos(),
    getFeaturedProjects(),
    getRecentProjects(),
  ]);

  // Prefer featured; fall back to most recent so the home page never goes empty.
  const projects = featured.length > 0 ? featured : recent;

  return (
    <>
      <Hero
        eyebrow={home?.heroEyebrow}
        headline1={home?.heroHeadline1}
        headline2={home?.heroHeadline2}
        subhead={home?.heroSubhead}
        ctaPrimary={home?.heroCtaPrimary}
        ctaSecondary={home?.heroCtaSecondary}
      />
      <ClientLogos logos={logos} />
      <CapabilitiesGrid
        eyebrow={home?.capabilitiesEyebrow}
        title={home?.capabilitiesTitle}
      />
      <FeaturedProjects
        projects={projects}
        eyebrow={home?.featuredEyebrow}
        title={home?.featuredTitle}
      />
      <Approach
        eyebrow={home?.approachEyebrow}
        title={home?.approachTitle}
        steps={home?.approachSteps}
      />
      <Stats stats={home?.stats} />
      <CtaBand
        title={home?.ctaTitle}
        primary={home?.ctaPrimary}
        secondary={home?.ctaSecondary}
      />
    </>
  );
}

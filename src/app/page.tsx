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
  getRecentProjects,
} from "@/lib/sanity/queries";
import { pageMetadata } from "@/lib/seo/metadata";

export const revalidate = 60;

export const metadata = pageMetadata({
  title: "Energy Driven Solutions",
  description:
    "Engineering and technology R&D for defense, energy, marine, and government — based in Dubai.",
  path: "/",
});

export default async function HomePage() {
  const [logos, featured, recent] = await Promise.all([
    getClientLogos(),
    getFeaturedProjects(),
    getRecentProjects(),
  ]);

  // Prefer featured; fall back to most recent so the home page never goes empty.
  const projects = featured.length > 0 ? featured : recent;

  return (
    <>
      <Hero />
      <ClientLogos logos={logos} />
      <CapabilitiesGrid />
      <FeaturedProjects projects={projects} />
      <Approach />
      <Stats />
      <CtaBand />
    </>
  );
}

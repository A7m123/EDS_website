import { createClient } from "next-sanity";

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-10-01";

const isConfigured = projectId.length > 0;

export const sanityClient = isConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: "published",
    })
  : null;

export function isSanityConfigured(): boolean {
  return isConfigured;
}

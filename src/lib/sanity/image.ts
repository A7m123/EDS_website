import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { dataset, projectId } from "./client";

const builder = createImageUrlBuilder({ projectId, dataset });

/**
 * Returns a Sanity image URL builder.
 *
 * `.auto("format")` tells Sanity's CDN to negotiate WebP/AVIF based on
 * the viewer's `Accept` header — every browser gets the smallest format
 * it can decode, regardless of what was uploaded. No client-side
 * conversion required.
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source).auto("format").quality(85);
}

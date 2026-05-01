import { defineField, defineType } from "sanity";

export default defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "capabilities", title: "Capabilities band" },
    { name: "featured", title: "Featured projects band" },
    { name: "approach", title: "Approach" },
    { name: "stats", title: "Stats strip" },
    { name: "cta", title: "CTA band" },
  ],
  fields: [
    // Hero
    defineField({
      name: "heroEyebrow",
      title: "Hero eyebrow",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroHeadline1",
      title: "Hero headline — line 1",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroHeadline2",
      title: "Hero headline — line 2 (muted)",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroSubhead",
      title: "Hero subhead",
      type: "text",
      rows: 3,
      group: "hero",
    }),
    defineField({
      name: "heroCtaPrimary",
      title: "Primary CTA",
      type: "cta",
      group: "hero",
    }),
    defineField({
      name: "heroCtaSecondary",
      title: "Secondary CTA",
      type: "cta",
      group: "hero",
    }),

    // Capabilities band
    defineField({
      name: "capabilitiesEyebrow",
      type: "string",
      group: "capabilities",
    }),
    defineField({
      name: "capabilitiesTitle",
      type: "string",
      group: "capabilities",
    }),

    // Featured projects band
    defineField({
      name: "featuredEyebrow",
      type: "string",
      group: "featured",
    }),
    defineField({
      name: "featuredTitle",
      type: "string",
      group: "featured",
    }),

    // Approach
    defineField({
      name: "approachEyebrow",
      type: "string",
      group: "approach",
    }),
    defineField({
      name: "approachTitle",
      type: "string",
      group: "approach",
    }),
    defineField({
      name: "approachSteps",
      title: "Steps",
      type: "array",
      group: "approach",
      of: [
        {
          type: "object",
          fields: [
            { name: "number", title: "Step number (e.g. 01)", type: "string" },
            { name: "title", type: "string" },
            { name: "body", type: "text", rows: 3 },
          ],
          preview: { select: { title: "title", subtitle: "number" } },
        },
      ],
    }),

    // Stats
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      group: "stats",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "value",
              type: "number",
              validation: (r) => r.required(),
            },
            {
              name: "suffix",
              type: "string",
              description: 'Optional, e.g. "+", "k".',
            },
            { name: "label", type: "string" },
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        },
      ],
    }),

    // CTA band
    defineField({
      name: "ctaTitle",
      type: "string",
      group: "cta",
    }),
    defineField({
      name: "ctaPrimary",
      title: "Primary CTA",
      type: "cta",
      group: "cta",
    }),
    defineField({
      name: "ctaSecondary",
      title: "Secondary CTA",
      type: "cta",
      group: "cta",
    }),
  ],
  preview: { prepare: () => ({ title: "Home Page" }) },
});

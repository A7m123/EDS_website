import { defineField, defineType } from "sanity";

export default defineType({
  name: "careersPage",
  title: "Careers Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "disciplines", title: "Disciplines band" },
    { name: "cta", title: "CTA band" },
  ],
  fields: [
    defineField({ name: "heroEyebrow", type: "string", group: "hero" }),
    defineField({ name: "heroHeadline", type: "string", group: "hero" }),
    defineField({
      name: "heroIntro",
      title: "Hero intro paragraph",
      type: "text",
      rows: 4,
      group: "hero",
    }),

    defineField({
      name: "disciplinesEyebrow",
      type: "string",
      group: "disciplines",
    }),
    defineField({
      name: "disciplinesTitle",
      type: "string",
      group: "disciplines",
    }),
    defineField({
      name: "disciplines",
      title: "Disciplines list",
      type: "array",
      of: [{ type: "string" }],
      group: "disciplines",
    }),

    defineField({ name: "ctaTitle", type: "string", group: "cta" }),
    defineField({
      name: "ctaBody",
      title: "Body paragraph",
      type: "text",
      rows: 3,
      group: "cta",
    }),
    defineField({
      name: "ctaEmail",
      title: "Email address",
      type: "string",
      description: "e.g. careers@energydriven.me",
      group: "cta",
    }),
    defineField({
      name: "ctaLabel",
      title: "Button label (defaults to email)",
      type: "string",
      group: "cta",
    }),
  ],
  preview: { prepare: () => ({ title: "Careers Page" }) },
});

import { defineField, defineType } from "sanity";

const linkObject = {
  type: "object",
  fields: [
    { name: "label", type: "string" },
    { name: "href", type: "string" },
  ],
};

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  // Singleton — only one instance.
  fields: [
    defineField({
      name: "nav",
      title: "Primary Nav",
      type: "array",
      of: [linkObject],
    }),
    defineField({
      name: "footerLinks",
      title: "Footer Links",
      type: "array",
      of: [linkObject],
    }),
    defineField({ name: "contactEmail", type: "string" }),
    defineField({ name: "contactPhone", type: "string" }),
    defineField({ name: "address", type: "text", rows: 3 }),
    defineField({
      name: "social",
      title: "Social",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "platform", type: "string" },
            { name: "url", type: "url" },
          ],
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});

import { defineField, defineType } from "sanity";

export default defineType({
  name: "capability",
  title: "Capability",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "icon",
      type: "string",
      description: "Lucide icon name (e.g. 'cpu', 'ship', 'zap'). See lucide.dev.",
    }),
    defineField({
      name: "shortDesc",
      title: "Short description (1 line)",
      type: "string",
      validation: (r) => r.max(140),
    }),
    defineField({
      name: "longBody",
      title: "Long description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "order",
      type: "number",
      description: "Lower numbers come first.",
    }),
  ],
  preview: { select: { title: "title", subtitle: "shortDesc" } },
});

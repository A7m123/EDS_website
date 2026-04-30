import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
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
    defineField({ name: "client", type: "string" }),
    defineField({
      name: "sector",
      type: "string",
      options: {
        list: [
          { title: "Defense", value: "defense" },
          { title: "Energy", value: "energy" },
          { title: "Marine", value: "marine" },
          { title: "Government", value: "government" },
          { title: "Industrial", value: "industrial" },
          { title: "Other", value: "other" },
        ],
      },
    }),
    defineField({
      name: "year",
      type: "number",
      validation: (r) => r.min(1980).max(2100).integer(),
    }),
    defineField({
      name: "summary",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "hero",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt text",
          validation: (r) => r.required(),
        }),
      ],
    }),
    defineField({
      name: "gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", type: "string", title: "Alt text" }),
          ],
        },
      ],
    }),
    defineField({
      name: "body",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "tech",
      title: "Tech stack tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      type: "number",
      description: "Lower numbers come first.",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "client", media: "hero" },
  },
});

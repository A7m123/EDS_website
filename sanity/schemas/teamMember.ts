import { defineField, defineType } from "sanity";

export default defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "role", type: "string" }),
    defineField({
      name: "photo",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", title: "Alt text" })],
    }),
    defineField({
      name: "bio",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "order",
      type: "number",
      description: "Lower numbers come first.",
    }),
  ],
  preview: { select: { title: "name", subtitle: "role", media: "photo" } },
});

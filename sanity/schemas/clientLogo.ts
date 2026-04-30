import { defineField, defineType } from "sanity";

export default defineType({
  name: "clientLogo",
  title: "Client Logo",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "logo",
      type: "image",
      description: "SVG preferred.",
      options: { accept: "image/svg+xml,image/png" },
    }),
    defineField({
      name: "url",
      type: "url",
    }),
    defineField({
      name: "order",
      type: "number",
      description: "Lower numbers come first.",
    }),
  ],
  preview: { select: { title: "name", media: "logo" } },
});

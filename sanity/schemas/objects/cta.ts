import { defineField, defineType } from "sanity";

export default defineType({
  name: "cta",
  title: "Call to action",
  type: "object",
  fields: [
    defineField({
      name: "label",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "href",
      type: "string",
      description: "Internal path like /contact, or full URL.",
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "href" },
  },
});

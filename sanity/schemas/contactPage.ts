import { defineField, defineType } from "sanity";

export default defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "office", title: "Office card" },
  ],
  fields: [
    defineField({ name: "heroEyebrow", type: "string", group: "hero" }),
    defineField({ name: "heroHeadline", type: "string", group: "hero" }),
    defineField({
      name: "heroIntro",
      title: "Hero intro paragraph",
      type: "text",
      rows: 3,
      group: "hero",
    }),

    defineField({
      name: "officeAddress",
      title: "Office address (multi-line)",
      type: "text",
      rows: 4,
      group: "office",
    }),
    defineField({
      name: "officeEmail",
      type: "string",
      group: "office",
    }),
    defineField({
      name: "officeHours",
      type: "string",
      group: "office",
    }),
  ],
  preview: { prepare: () => ({ title: "Contact Page" }) },
});

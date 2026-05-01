import { defineField, defineType } from "sanity";

export default defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "where", title: "Where we work" },
    { name: "leadership", title: "Leadership band" },
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

    defineField({ name: "whereEyebrow", type: "string", group: "where" }),
    defineField({ name: "whereTitle", type: "string", group: "where" }),
    defineField({
      name: "whereBody",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
      group: "where",
    }),

    defineField({
      name: "leadershipEyebrow",
      type: "string",
      group: "leadership",
    }),
    defineField({
      name: "leadershipTitle",
      type: "string",
      group: "leadership",
    }),
  ],
  preview: { prepare: () => ({ title: "About Page" }) },
});

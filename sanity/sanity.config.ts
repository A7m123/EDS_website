import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { visionTool } from "@sanity/vision";
import { schemaTypes, SINGLETON_TYPES } from "./schemas";
import { structure } from "./structure";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? "d7cw2leu";
const dataset = process.env.SANITY_STUDIO_DATASET ?? "production";

// Where the Presentation iframe loads. Override per environment via
// SANITY_STUDIO_PREVIEW_URL (e.g. http://localhost:3000 in dev).
const previewUrl =
  process.env.SANITY_STUDIO_PREVIEW_URL ?? "https://eds-website.vercel.app";

export default defineConfig({
  name: "eds-studio",
  title: "Energy Driven Systems",
  projectId,
  dataset,
  plugins: [
    structureTool({ structure }),
    presentationTool({ previewUrl }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !SINGLETON_TYPES.has(schemaType)),
  },
  document: {
    actions: (input, context) =>
      SINGLETON_TYPES.has(context.schemaType)
        ? input.filter(
            ({ action }) =>
              action !== "duplicate" &&
              action !== "delete" &&
              action !== "unpublish",
          )
        : input,
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === "global"
        ? prev.filter(
            ({ templateId }) => !SINGLETON_TYPES.has(templateId ?? ""),
          )
        : prev,
  },
});

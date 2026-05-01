import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? "d7cw2leu",
    dataset: process.env.SANITY_STUDIO_DATASET ?? "production",
  },
  studioHost: "eds-studio",
});

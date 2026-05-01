import type { StructureResolver } from "sanity/structure";

const SINGLETONS = [
  { id: "siteSettings", title: "Site Settings", icon: "⚙️" },
  { id: "homePage", title: "Home Page", icon: "🏠" },
  { id: "aboutPage", title: "About Page", icon: "ℹ️" },
  { id: "careersPage", title: "Careers Page", icon: "💼" },
  { id: "contactPage", title: "Contact Page", icon: "✉️" },
];

const COLLECTION_TYPES = ["project", "capability", "clientLogo", "teamMember"];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // Singletons up top
      ...SINGLETONS.map((s) =>
        S.listItem()
          .title(`${s.icon}  ${s.title}`)
          .id(s.id)
          .child(S.document().schemaType(s.id).documentId(s.id)),
      ),
      S.divider(),
      // Collections below
      ...S.documentTypeListItems().filter((listItem) =>
        COLLECTION_TYPES.includes(listItem.getId() ?? ""),
      ),
    ]);

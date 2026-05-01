// Reusable object types
import cta from "./objects/cta";

// Documents
import project from "./project";
import capability from "./capability";
import clientLogo from "./clientLogo";
import teamMember from "./teamMember";
import siteSettings from "./siteSettings";
import homePage from "./homePage";
import aboutPage from "./aboutPage";
import careersPage from "./careersPage";
import contactPage from "./contactPage";

export const schemaTypes = [
  // Objects
  cta,
  // Singletons (one of each)
  siteSettings,
  homePage,
  aboutPage,
  careersPage,
  contactPage,
  // Collections
  project,
  capability,
  clientLogo,
  teamMember,
];

export const SINGLETON_TYPES = new Set([
  "siteSettings",
  "homePage",
  "aboutPage",
  "careersPage",
  "contactPage",
]);

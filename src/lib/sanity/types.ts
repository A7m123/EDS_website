import type { PortableTextBlock } from "next-sanity";

export type SanityImage = {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  alt?: string;
};

export type Cta = {
  label?: string;
  href?: string;
};

export type Project = {
  _id: string;
  title: string;
  slug: string;
  client?: string;
  sector?: string;
  year?: number;
  summary?: string;
  hero?: SanityImage;
  gallery?: SanityImage[];
  body?: PortableTextBlock[];
  tech?: string[];
  featured?: boolean;
  order?: number;
};

export type Capability = {
  _id: string;
  title: string;
  slug: string;
  icon?: string;
  shortDesc?: string;
  longBody?: PortableTextBlock[];
  order?: number;
};

export type ClientLogo = {
  _id: string;
  name: string;
  logo?: SanityImage;
  url?: string;
  order?: number;
};

export type TeamMember = {
  _id: string;
  name: string;
  role?: string;
  photo?: SanityImage;
  bio?: string;
  order?: number;
};

export type SiteSettings = {
  logo?: SanityImage;
  logoMark?: SanityImage;
  nav?: { label: string; href: string }[];
  footerLinks?: { label: string; href: string }[];
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  social?: { platform: string; url: string }[];
};

export type ApproachStep = {
  number?: string;
  title?: string;
  body?: string;
};

export type StatItem = {
  value?: number;
  suffix?: string;
  label?: string;
};

export type HomePage = {
  heroEyebrow?: string;
  heroHeadline1?: string;
  heroHeadline2?: string;
  heroSubhead?: string;
  heroCtaPrimary?: Cta;
  heroCtaSecondary?: Cta;
  capabilitiesEyebrow?: string;
  capabilitiesTitle?: string;
  featuredEyebrow?: string;
  featuredTitle?: string;
  approachEyebrow?: string;
  approachTitle?: string;
  approachSteps?: ApproachStep[];
  stats?: StatItem[];
  ctaTitle?: string;
  ctaPrimary?: Cta;
  ctaSecondary?: Cta;
};

export type AboutPage = {
  heroEyebrow?: string;
  heroHeadline?: string;
  heroIntro?: string;
  whereEyebrow?: string;
  whereTitle?: string;
  whereBody?: PortableTextBlock[];
  leadershipEyebrow?: string;
  leadershipTitle?: string;
};

export type CareersPage = {
  heroEyebrow?: string;
  heroHeadline?: string;
  heroIntro?: string;
  disciplinesEyebrow?: string;
  disciplinesTitle?: string;
  disciplines?: string[];
  ctaTitle?: string;
  ctaBody?: string;
  ctaEmail?: string;
  ctaLabel?: string;
};

export type ContactPage = {
  heroEyebrow?: string;
  heroHeadline?: string;
  heroIntro?: string;
  officeAddress?: string;
  officeEmail?: string;
  officeHours?: string;
};

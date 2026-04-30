import type { PortableTextBlock } from "next-sanity";

export type SanityImage = {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  alt?: string;
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
  nav?: { label: string; href: string }[];
  footerLinks?: { label: string; href: string }[];
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  social?: { platform: string; url: string }[];
};

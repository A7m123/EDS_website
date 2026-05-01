import { groq } from "next-sanity";
import { sanityClient, isSanityConfigured } from "./client";
import type {
  AboutPage,
  Capability,
  CareersPage,
  ClientLogo,
  ContactPage,
  HomePage,
  Project,
  SiteSettings,
  TeamMember,
} from "./types";

const projectFields = groq`
  _id,
  title,
  "slug": slug.current,
  client,
  sector,
  year,
  summary,
  hero,
  featured,
  order
`;

const projectFullFields = groq`
  ${projectFields},
  gallery,
  body,
  "tech": tech[]
`;

export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true]
    | order(coalesce(order, 9999) asc, year desc)[0...3]{ ${projectFields} }
`;

export const recentProjectsQuery = groq`
  *[_type == "project"]
    | order(coalesce(order, 9999) asc, year desc)[0...3]{ ${projectFields} }
`;

export const allProjectsQuery = groq`
  *[_type == "project"]
    | order(coalesce(order, 9999) asc, year desc){ ${projectFields} }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0]{ ${projectFullFields} }
`;

export const allProjectSlugsQuery = groq`
  *[_type == "project" && defined(slug.current)][].slug.current
`;

export const allCapabilitiesQuery = groq`
  *[_type == "capability"]
    | order(coalesce(order, 9999) asc){
      _id, title, "slug": slug.current, icon, shortDesc, order
    }
`;

export const clientLogosQuery = groq`
  *[_type == "clientLogo"]
    | order(coalesce(order, 9999) asc){
      _id, name, logo, url, order
    }
`;

export const teamMembersQuery = groq`
  *[_type == "teamMember"]
    | order(coalesce(order, 9999) asc){
      _id, name, role, photo, bio, order
    }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    nav, footerLinks, contactEmail, contactPhone, address, social
  }
`;

export const homePageQuery = groq`*[_type == "homePage"][0]`;
export const aboutPageQuery = groq`*[_type == "aboutPage"][0]`;
export const careersPageQuery = groq`*[_type == "careersPage"][0]`;
export const contactPageQuery = groq`*[_type == "contactPage"][0]`;

type FetchOpts = { revalidate?: number; tags?: string[] };

async function fetchOrEmpty<T>(
  query: string,
  params: Record<string, unknown> = {},
  opts: FetchOpts = {},
): Promise<T | null> {
  if (!isSanityConfigured() || !sanityClient) return null;
  const { revalidate = 60, tags } = opts;
  return sanityClient.fetch<T>(query, params, {
    next: { revalidate, tags },
  });
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const data = await fetchOrEmpty<Project[]>(
    featuredProjectsQuery,
    {},
    { tags: ["project"] },
  );
  return data ?? [];
}

export async function getRecentProjects(): Promise<Project[]> {
  const data = await fetchOrEmpty<Project[]>(
    recentProjectsQuery,
    {},
    { tags: ["project"] },
  );
  return data ?? [];
}

export async function getAllProjects(): Promise<Project[]> {
  const data = await fetchOrEmpty<Project[]>(
    allProjectsQuery,
    {},
    { tags: ["project"] },
  );
  return data ?? [];
}

export async function getAllProjectSlugs(): Promise<string[]> {
  const data = await fetchOrEmpty<string[]>(allProjectSlugsQuery);
  return data ?? [];
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return fetchOrEmpty<Project>(
    projectBySlugQuery,
    { slug },
    { tags: ["project", `project:${slug}`] },
  );
}

export async function getCapabilities(): Promise<Capability[]> {
  const data = await fetchOrEmpty<Capability[]>(
    allCapabilitiesQuery,
    {},
    { tags: ["capability"] },
  );
  return data ?? [];
}

export async function getClientLogos(): Promise<ClientLogo[]> {
  const data = await fetchOrEmpty<ClientLogo[]>(
    clientLogosQuery,
    {},
    { tags: ["clientLogo"] },
  );
  return data ?? [];
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  const data = await fetchOrEmpty<TeamMember[]>(
    teamMembersQuery,
    {},
    { tags: ["teamMember"] },
  );
  return data ?? [];
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return fetchOrEmpty<SiteSettings>(
    siteSettingsQuery,
    {},
    { tags: ["siteSettings"] },
  );
}

export async function getHomePage(): Promise<HomePage | null> {
  return fetchOrEmpty<HomePage>(homePageQuery, {}, { tags: ["homePage"] });
}

export async function getAboutPage(): Promise<AboutPage | null> {
  return fetchOrEmpty<AboutPage>(aboutPageQuery, {}, { tags: ["aboutPage"] });
}

export async function getCareersPage(): Promise<CareersPage | null> {
  return fetchOrEmpty<CareersPage>(
    careersPageQuery,
    {},
    { tags: ["careersPage"] },
  );
}

export async function getContactPage(): Promise<ContactPage | null> {
  return fetchOrEmpty<ContactPage>(
    contactPageQuery,
    {},
    { tags: ["contactPage"] },
  );
}

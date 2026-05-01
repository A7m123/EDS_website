import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Sanity webhook target. Configure in Sanity Manage → API → Webhooks
 * to POST { _type, slug.current } and use a shared secret in the
 * "Authorization: Bearer <secret>" header (or ?secret= query).
 *
 * Maps document type → cache tags used in queries.ts.
 */
const TYPE_TO_TAG: Record<string, string> = {
  project: "project",
  capability: "capability",
  clientLogo: "clientLogo",
  teamMember: "teamMember",
  siteSettings: "siteSettings",
  homePage: "homePage",
  aboutPage: "aboutPage",
  careersPage: "careersPage",
  contactPage: "contactPage",
};

function isAuthorized(req: NextRequest): boolean {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return false;
  const header = req.headers.get("authorization");
  if (header && header === `Bearer ${secret}`) return true;
  const url = new URL(req.url);
  return url.searchParams.get("secret") === secret;
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  let body: { _type?: string; slug?: { current?: string } | string } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid json" }, { status: 400 });
  }

  const type = body._type;
  const tag = type ? TYPE_TO_TAG[type] : undefined;
  if (!tag) {
    return NextResponse.json({ ok: false, error: "unknown type" }, { status: 400 });
  }

  revalidateTag(tag);

  // Per-document tag for detail pages (e.g. project:my-slug).
  const slug =
    typeof body.slug === "object" && body.slug !== null
      ? body.slug.current
      : typeof body.slug === "string"
        ? body.slug
        : undefined;
  if (slug) revalidateTag(`${tag}:${slug}`);

  return NextResponse.json({ ok: true, revalidated: tag, slug: slug ?? null });
}

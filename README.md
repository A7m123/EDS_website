# EDS Web

Marketing & capabilities site for Energy Driven Systems (EDS), a UAE-based
engineering and technology R&D company.

## Stack

- Next.js 14 (App Router) + TypeScript (strict)
- Tailwind CSS, custom design tokens via CSS variables
- anime.js for motion (reduced-motion respected)
- Sanity v3 as headless CMS (separate Studio in `/sanity`)
- pnpm, Vercel

## Setup

```sh
pnpm install
cp .env.example .env.local
# fill in NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_REVALIDATE_SECRET
pnpm dev
```

The site is designed to render fully without Sanity configured — empty CMS
returns fall back to hidden sections or hard-coded defaults.

## Scripts

| Script           | What it does                                |
| ---------------- | ------------------------------------------- |
| `pnpm dev`       | Next dev server on http://localhost:3000    |
| `pnpm build`     | Production build (also runs `next-sitemap`) |
| `pnpm start`     | Serve the built app                         |
| `pnpm lint`      | ESLint via `next lint`                      |
| `pnpm typecheck` | `tsc --noEmit`                              |

## Repo layout

```
src/
  app/                  # routes (App Router)
    api/og/             # programmatic Open Graph (Edge runtime)
    api/revalidate/     # Sanity webhook → revalidateTag
  components/
    sections/           # page-level sections
    ui/                 # primitives (Container, Heading, Button, ...)
    motion/             # anime.js wrappers (Reveal, CountUp)
  lib/
    sanity/             # client, image, GROQ queries, types
    motion/             # reduced-motion helpers
    seo/                # metadata + JSON-LD helpers
sanity/                 # standalone Sanity Studio v3
```

## CMS schemas

`project`, `capability`, `clientLogo`, `teamMember`, `siteSettings` —
defined in `sanity/schemas`. The Studio is deployed independently:

```sh
cd sanity
pnpm install
SANITY_STUDIO_PROJECT_ID=xxxx pnpm deploy
```

## Revalidation

Configure a Sanity webhook to `POST /api/revalidate` with the projection
`{ _type, slug }` and an `Authorization: Bearer <SANITY_REVALIDATE_SECRET>`
header. The route maps document type → cache tag.

## Performance

- LCP target < 2.0s on 4G; mobile Lighthouse perf ≥ 90.
- Images via `next/image`; Sanity CDN whitelisted in `next.config.mjs`.
- Fonts self-hosted via `next/font`.
- No analytics or chat in v1.

## Accessibility

- Skip-to-content, semantic landmarks, single `h1` per page, visible focus
  rings, `prefers-reduced-motion` respected throughout.

## Outstanding TODOs

These need input from the client team:

- Brand assets (logo SVG, color hex codes, photography) from Eelke
- Project list and copy from James (`james@energydriven.me`)
- Final domain handover plan (DNS, current host)
- Office address, phone for the footer
- Hero media decision: video loop vs static image (swap point in
  `src/components/sections/HeroMedia.tsx`)

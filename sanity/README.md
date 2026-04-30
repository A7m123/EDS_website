# EDS Sanity Studio

Standalone Sanity Studio for the Energy Driven Solutions site. Deployed
separately from the Next.js app.

## Local

```sh
cd sanity
pnpm install
SANITY_STUDIO_PROJECT_ID=xxxx SANITY_STUDIO_DATASET=production pnpm dev
```

## Deploy

```sh
SANITY_STUDIO_PROJECT_ID=xxxx pnpm deploy
```

## Schemas

- `project` — portfolio entry, supports `featured` flag and `order`.
- `capability` — service area, links to `/capabilities`.
- `clientLogo` — logo strip on home; SVG preferred.
- `teamMember` — leadership on `/about`.
- `siteSettings` — singleton with nav/footer/contact/social.

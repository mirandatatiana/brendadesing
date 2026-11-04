# Julieta — Interior styling

Bilingual (EN/NL) portfolio site for Julieta, a residential interior stylist in the Netherlands.
Built with Next.js 16 (App Router), React 19 and TypeScript. No CSS framework, no UI library.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000 → redirects to /en
npm run build && npm start
```

## Where things live

| What | File |
| --- | --- |
| Projects, rooms, styles, photos | `lib/content/projects.ts` |
| Services, prices, process steps | `lib/content/services.ts` |
| About story, approach, values | `lib/content/about.ts` |
| All interface text (EN / NL) | `lib/i18n/en.ts`, `lib/i18n/nl.ts` |
| Email, phone, KvK, region | `lib/site.ts` |
| Colours, fonts, layout | `app/globals.css` (tokens at the top) |
| Contact form → email | `app/[lang]/contact/actions.ts`, `lib/email.ts` |

### Adding a project
Add an entry to `projects` in `lib/content/projects.ts`. Every text field has `en` and `nl`.
`caseStudy` is optional, and so is each block inside it (`brief`, `materials`, `clientStory`, `beforeAfter`).
`featured: true` shows it on the home page (first four).

### Using Julieta's own photos
Placeholder photos come from Unsplash. Put real photos in `public/projects/<slug>/` and replace
`unsplash(...)` with `{ src: "/projects/<slug>/01.jpg", width: 2000, height: 1333, alt: { en, nl } }`.
Export at about 2400px on the long side; `next/image` serves resized AVIF/WebP automatically.
When no Unsplash photos remain, remove `remotePatterns` from `next.config.ts`.

## Contact form email
The form uses a Server Action that validates input (with honeypot and timing spam checks) and sends via
[Resend](https://resend.com). Copy `.env.example` to `.env.local` and set:

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`: Julieta's inbox
- `CONTACT_FROM_EMAIL`: an address on a domain verified in Resend
- `NEXT_PUBLIC_SITE_URL`: used for the sitemap and metadata

In development without these, the email is printed to the terminal instead of sent.
Replies go straight to the visitor (`reply_to`).

## Languages
English is the default. `/` redirects to `/en`, or to `/nl` if the visitor chose Dutch before
(cookie set by the switcher). The redirect lives in `proxy.ts`.

## Defaults to confirm with Julieta
- Prices: consultation from €175, mood board from €495 per room, full styling on request (incl. VAT)
- Travel: included within 30 km of Utrecht (see `services.vatNote` in the dictionaries)
- Contact details and KvK number in `lib/site.ts`
- About text and portrait are placeholders

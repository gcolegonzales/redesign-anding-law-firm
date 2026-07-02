# Anding Law Firm, L.L.C. — Website Redesign Concept

A single-page, fully static website concept for **Anding Law Firm, L.L.C.** — the practice of
**George K. Anding, Jr.**, a board-certified medical malpractice and personal injury trial lawyer in
**Baton Rouge, Louisiana** (12035 Justice Ave, Suite A).

This is an **unsolicited redesign concept** — a "this could be yours right now" presentation piece.

## Why this concept

The firm has **no website of its own**. A prospective client vetting a lawyer after a serious injury
finds only scattered third-party directory listings — no bio, no explanation of what George actually
does, and no clear way to start a conversation. For a plaintiff's injury lawyer, whose clients are
frightened, hurting, and comparing attorneys online, that's a costly gap.

This concept closes it with a credible, launch-ready web presence:

- A distinct, authoritative identity — deep navy, oxblood, and brass with an elegant Fraunces serif —
  that signals gravitas and five decades of courtroom experience.
- A **"Request a Free Case Review"** form as the primary money feature, plus click-to-call throughout.
- **Editorial, varied layouts** — an alternating practice-area breakdown, a real attorney bio with
  verified credentials, a numbered "how it works" timeline, and a recognition band — rather than a
  generic grid of icon cards.
- Mobile-first, fast, accessible, with tasteful motion and reduced-motion support.

## Accuracy note (important)

Every credential on the page is **publicly verifiable** (Super Lawyers / Martindale-Hubbell): admitted
in Louisiana in 1974, ~50 years in practice, **AV Preeminent**, **board certified in Medical Professional
Liability**, Super Lawyers 2007 & 2009–2012, U.S. Supreme Court admission (1978). The practice focus is
his **actual** one — medical/dental malpractice, serious personal injury, wrongful death, and civil
litigation on the plaintiff's side — not an invented general practice.

## What's included

- `index.html` — the full single-page site
- `styles.css` — responsive, mobile-first styling with motion and reduced-motion support
- `script.js` — sticky/shrinking header, animated mobile nav, scroll-reveal, credential count-up, and the
  (non-wired) case-review form
- `assets/photos/` — drop-folder for real photography (see `DROP-PHOTOS-HERE.md`)
- No build step, no frameworks, no npm. One Google Fonts `<link>` is the only external asset.

## How to view

Open **`index.html`** by double-clicking it, or drag it into any modern browser. Everything runs locally.

## Notes on data & assets

- Phone **(225) 408-2750** is used for click-to-call. A second firm line, (225) 766-0200, also appears in
  directories — see the `TODO` comment in `index.html`; confirm the primary before publishing.
- Address **12035 Justice Ave, Suite A, Baton Rouge, LA 70816** is the verified firm address.
- No attorney or office photo is web-accessible, so a tasteful monogram placeholder is used and the layout
  is wired to swap in real images (`<!-- IMG-NEEDED -->` comments + `assets/photos/DROP-PHOTOS-HERE.md`).
- The case-review form is a styled UI demo — it validates and confirms but is not wired to a backend.
- No testimonials or case results are shown, since none are independently verifiable and fabricating them
  would be misleading for a law firm.

## SEO

On-page SEO is built in: a unique `<title>` + meta description, an `Attorney` (LegalService) **JSON-LD**
block with the firm's real name, phone, address, hours, service areas, and practice areas, complete
**Open Graph + Twitter Card** tags, a `<link rel="canonical">`, plus `robots.txt` and `sitemap.xml` at the
repo root.

**Base-URL placeholder:** the canonical link, `og:url`, `twitter`/`og` image, JSON-LD `url`/`image`,
`robots.txt`, and `sitemap.xml` all use the literal placeholder **`https://REPLACE-WITH-DOMAIN.com/`**.
Before deploying, do a single find-and-replace of `https://REPLACE-WITH-DOMAIN.com/` with the real domain
across `index.html`, `robots.txt`, and `sitemap.xml`. (An `assets/og-image.jpg` social-share image should
also be added at deploy — the tags reference it.)

---

Redesign concept prepared as an unsolicited pitch. Not affiliated with or endorsed by the firm.

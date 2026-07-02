# Drop real photos here

The site is wired to use real photography when it is present, and falls back to
tasteful designed placeholders otherwise. No photo of the attorney or office is
web-accessible, so credible placeholders are used until real images are supplied.

## What to drop in this folder

Use these exact filenames so the site picks them up automatically (see the
`<!-- IMG-NEEDED -->` comments in `index.html`):

| Filename            | What it should be                                              |
|---------------------|----------------------------------------------------------------|
| `attorney.jpg`      | Professional headshot of George K. Anding, Jr. (portrait, 4:5) |
| `office.jpg`        | Exterior or interior of the Baton Rouge office (landscape)     |
| `courthouse.jpg`    | Optional: a Louisiana courthouse / skyline detail (landscape)  |

Recommended: JPG or WebP, sRGB, at least 1200px on the long edge, well-lit.

## How to enable a photo

In `index.html`, find the matching `<!-- IMG-NEEDED: ... -->` block. Each has a
commented `<img>` tag ready to uncomment once the file is in place; the designed
placeholder sits behind it and simply won't show once the image loads.

No Facebook/Instagram images were used — those sources are token-blocked.

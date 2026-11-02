# Sarvlekh website

Static, SEO/AEO/GEO-ready multi-page site (31 pages): home, 20 industry pages, 3 service pages, story (newspaper theme), FAQ, contact.

```bash
npm run dev      # build + serve at http://localhost:5173
npm run build    # output in dist/
```

- Content lives in `gen/industries.mjs` (one entry = one themed page) and `gen/site.mjs`.
- Templates: `gen/lib.mjs`, `gen/pages.mjs`. Styles `assets/css/main.css`, motion `assets/js/main.js`.
- Brand images are in `assets/img` (derived from the supplied logo; replace with a high-res/SVG logo when available).
- Build also emits `sitemap.xml`, `robots.txt` (AI crawlers allowed), `llms.txt`, `manifest.webmanifest`.
- Canonical domain is assumed to be `https://sarvlekh.in` (change `SITE.url` in `gen/site.mjs`).
- Contact form opens the visitor's email app (`mailto:connect@sarvlekh.in`); no backend.
- Previous starter kept in `legacy/`.

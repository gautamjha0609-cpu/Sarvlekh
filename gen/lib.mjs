import { SITE, nav } from './site.mjs';
import { industries, icons } from './industries.mjs';

export const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const jsonld = (o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`;
export const abs = (p) => SITE.url + p;

export const iconSVG = (name, cls = 'ico') =>
  `<svg class="${cls}" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${icons[name] || icons.chart}"/></svg>`;

export const glyphSVG = (d) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${d}"/></svg>`;

// The Sarvlekh mascot: the official elephant + roof-arrow shape, tinted with flat theme colours via masks.
export const eleSVG = (cls = '') => `<div class="mascot ${cls}" role="img" aria-label="Sarvlekh elephant mascot"><i class="m-chev"></i><i class="m-ele"></i></div>`;

const dockIcon = {
  home: 'M4 11 12 4l8 7M6 10v10h12V10',
  grid: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  mail: 'M3 6h18v12H3zM3 7l9 7 9-7',
  story: 'M5 4h11l3 3v13H5zM8 10h8M8 14h8M8 18h5',
  menu: 'M4 7h16M4 12h16M4 17h16',
};

export function head({ title, desc, path, schema = [], preload = '', theme = '#f7f4ec', og = '/assets/img/og.png', type = 'website' }) {
  const url = abs(path);
  return `<!doctype html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
<meta name="theme-color" content="${theme}">
<meta name="author" content="Sarvlekh">
<meta name="geo.region" content="IN"><meta name="geo.placename" content="India"><meta name="language" content="English">
<link rel="alternate" hreflang="en-IN" href="${url}"><link rel="alternate" hreflang="x-default" href="${url}">
<meta property="og:type" content="${type}"><meta property="og:site_name" content="Sarvlekh"><meta property="og:locale" content="en_IN">
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE.url}${og}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(desc)}"><meta name="twitter:image" content="${SITE.url}${og}">
<link rel="icon" type="image/png" sizes="64x64" href="/assets/img/favicon-64.png"><link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png"><link rel="manifest" href="/manifest.webmanifest">
<link rel="alternate" type="text/plain" href="/llms.txt" title="LLM-readable summary">
<link rel="preload" as="font" type="font/woff2" crossorigin href="/assets/fonts/manrope-normal-latin.woff2">
${preload}<link rel="stylesheet" href="/assets/css/main.css">
<script>document.documentElement.classList.add('js');try{if(sessionStorage.getItem('sv-seen'))document.documentElement.classList.add('seen')}catch(e){}</script>
${schema.map(jsonld).join('\n')}
</head>`;
}

const logoMark = `<span class="logo-mark mascot" aria-hidden="true"><i class="m-chev"></i><i class="m-ele"></i></span>`;

const symbols = '';

export function header(active = '') {
  const items = nav.filter(([n]) => n !== 'Industries').map(([n, h]) => `<a href="${h}"${active === h ? ' aria-current="page"' : ''}>${n}</a>`).join('');
  const mega = industries.map((i) => `<a href="/industries/${i.slug}/" style="--a:${i.theme[0]}">${iconSVG(i.icon)}<span>${esc(i.name)}</span></a>`).join('');
  return `<a class="skip" href="#main">Skip to content</a>
<header class="hdr" id="hdr"><div class="hdr-in">
<a class="brand" href="/" aria-label="Sarvlekh home" data-title="Sarvlekh">${logoMark}<span class="brand-t">Sarvlekh</span></a>
<nav class="nav" aria-label="Primary">
<div class="nav-i has-mega"><a href="/industries/"${active === '/industries/' ? ' aria-current="page"' : ''}>Industries</a>
<div class="mega" role="region" aria-label="All industries"><div class="mega-in">${mega}</div><a class="mega-all" href="/industries/">See all industries →</a></div></div>
${items}
</nav>
<div class="hdr-btns"><a class="btn btn-sm btn-line" href="/contact/">Contact</a><a class="btn btn-sm btn-dark" href="/contact/">Plan your system</a></div>
<button class="hdr-burger" type="button" data-menu aria-label="Open menu" aria-expanded="false" aria-controls="sheet"><i></i><i></i><i></i></button>
</div></header>`;
}

export function footer() {
  const ind = industries.slice(0, 9).map((i) => `<li><a href="/industries/${i.slug}/">${esc(i.name)}</a></li>`).join('');
  return `<footer class="ftr-wrap"><div class="ftr">
<div class="ftr-top"><a class="brand" href="/" data-title="Sarvlekh">${logoMark}<span class="brand-t">Sarvlekh</span></a><a class="ftr-mail" href="mailto:${SITE.email}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18v12H3zM3 7l9 7 9-7"/></svg>${SITE.email}</a></div>
<div class="ftr-cols">
<div><h3>Sarvlekh</h3><ul><li><a href="/">Home</a></li><li><a href="/industries/">Industries</a></li><li><a href="/services/">Services</a></li><li><a href="/blog/">Blog</a></li><li><a href="/contact/">Contact</a></li></ul></div>
<div><h3>Industries</h3><ul>${ind}</ul></div>
<div><h3>Services</h3><ul><li><a href="/services/business-software/">Custom Software</a></li><li><a href="/services/accounting/">Accounting &amp; Compliance</a></li><li><a href="/services/business-optimisation/">Business Optimisation</a></li></ul></div>
<div><h3>About Us</h3><ul><li><a href="/about/">Our Story</a></li><li><a href="/about/">Mission &amp; Vision</a></li><li><a href="/faq/">FAQ</a></li></ul></div>
<div><h3>Helpful Links</h3><ul><li><a href="/privacy/">Privacy</a></li><li><a href="/sitemap.xml">Sitemap</a></li><li><a href="/llms.txt">llms.txt</a></li></ul></div>
</div>
<div class="ftr-bot"><span class="ftr-loc">India · English</span><span>© ${new Date().getFullYear()} Sarvlekh. Third-party names belong to their owners and appear for comparison only. Dashboards are illustrative.</span></div>
</div></footer>`;
}

export function dock(active = '') {
  const ic = (k) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${dockIcon[k]}"/></svg>`;
  const cur = (h) => (active === h ? ' aria-current="page"' : '');
  const sheetInd = industries.map((i) => `<a href="/industries/${i.slug}/" style="--a:${i.theme[0]}">${iconSVG(i.icon)}<span>${esc(i.name)}</span></a>`).join('');
  return `
<div class="sheet" id="sheet" role="dialog" aria-modal="true" aria-label="Menu" hidden><div class="sheet-in">
<nav class="sh-nav" aria-label="Menu">
<div class="sh-acc" data-acc><div class="sh-row" style="--k:0"><a href="/industries/"><span class="n">01</span><b>Industries</b></a><button type="button" class="sh-tg" aria-expanded="false" aria-controls="sh-ind-list" aria-label="Show industries"><i></i></button></div><div class="sh-panel" id="sh-ind-list"><div class="sh-ind">${sheetInd}<a class="sh-all" href="/industries/">All industries →</a></div></div></div>
${[['Services', '/services/'], ['Blog', '/blog/'], ['Our Story', '/about/'], ['FAQ', '/faq/'], ['Contact', '/contact/']].map(([n, h], k) => `<a href="${h}" style="--k:${k + 1}"><span class="n">0${k + 2}</span><b>${n}</b><i aria-hidden="true">↗</i></a>`).join('')}</nav>
<div class="sh-foot"><a class="sh-cta" href="/contact/">Plan your system <i aria-hidden="true">→</i></a><a class="sh-mail" href="mailto:${SITE.email}">${SITE.email}</a></div></div></div>`;
}

const curtain = `<div class="curtain" id="curtain" aria-hidden="true"><span class="logo-mark mascot"><i class="m-chev"></i><i class="m-ele"></i></span></div>`;

export function shell({ title, desc, path, schema, theme, body, active, bodyStyle = '', bodyClass = '', og, type, themeColor, preload = '' }) {
  return `${head({ title, desc, path, schema, theme: themeColor, og, type, preload })}
<body class="${bodyClass}" style="${bodyStyle}" data-path="${path}">
${symbols}${curtain}${header(active || path)}
<main id="main">
${body}
</main>
${footer()}${dock(active || path)}
<script src="/assets/js/main.js" defer></script>
</body></html>`;
}

export const breadcrumbs = (trail) => ({
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: trail.map(([name, p], i) => ({ '@type': 'ListItem', position: i + 1, name, item: abs(p) })),
});

export const crumbHTML = (trail) =>
  `<nav class="crumbs" aria-label="Breadcrumb"><ol>${trail.map(([n, p], i) => (i === trail.length - 1 ? `<li aria-current="page">${esc(n)}</li>` : `<li><a href="${p}">${esc(n)}</a></li>`)).join('')}</ol></nav>`;

export const faqSchema = (faqs) => ({
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
});

export const faqHTML = (faqs, { open = true } = {}) =>
  `<div class="faq">${faqs.map(([q, a], i) => `<details class="faq-i" data-reveal${open && i === 0 ? ' open' : ''}><summary><span>${esc(q)}</span><i aria-hidden="true"></i></summary><div class="faq-a"><p>${esc(a)}</p></div></details>`).join('')}</div>`;

export const orgNode = {
  '@type': ['Organization', 'ProfessionalService'], '@id': `${SITE.url}/#org`, name: 'Sarvlekh', alternateName: ['Sarvlekh Business Systems', 'सर्वलेख'],
  url: SITE.url, logo: { '@type': 'ImageObject', url: `${SITE.url}/assets/img/logo-512.png`, width: 512, height: 512 }, image: `${SITE.url}/assets/img/og.png`,
  email: SITE.email, areaServed: { '@type': 'Country', name: 'India' },
  description: 'Sarvlekh is a premium business systems studio building connected software, accounting and operations systems for hostels, clinics, schools, plants, stores, hotels, mines and 20+ other industries in India.',
  slogan: 'Every business. One intelligent system.',
  knowsAbout: ['Business management software', 'ERP', 'Tally accounting', 'GST compliance', 'Business process automation', 'Hostel management', 'School ERP', 'Clinic software', 'Manufacturing ERP', 'RMC plant software'],
  contactPoint: [{ '@type': 'ContactPoint', contactType: 'sales', email: SITE.email, areaServed: 'IN', availableLanguage: ['English', 'Hindi'] }],
};

export const siteGraph = {
  '@context': 'https://schema.org',
  '@graph': [orgNode, { '@type': 'WebSite', '@id': `${SITE.url}/#website`, url: SITE.url, name: 'Sarvlekh', publisher: { '@id': `${SITE.url}/#org` }, inLanguage: 'en-IN' }],
};

export const ctaBlock = (h = 'A Better Way to Run Your Business, Together', p = 'Sarvlekh designs the systems that give owners their time back — calmly, beautifully and in one place.') =>
  `<section class="cta" data-reveal><div class="cta-in"><div class="stars" aria-hidden="true">${stars(26)}</div><h2>${esc(h)}</h2><p>${esc(p)}</p><div class="cta-row"><a class="btn btn-white" href="/contact/">Get Started</a><a class="btn btn-glass" href="/about/">Our Story</a></div></div></section>`;

export function stars(n, seed = 7) {
  let x = seed, out = '';
  const r = () => ((x = (x * 9301 + 49297) % 233280) / 233280);
  for (let i = 0; i < n; i++) out += `<i style="left:${(r() * 100).toFixed(1)}%;top:${(r() * 100).toFixed(1)}%;--s:${(1 + r() * 1.6).toFixed(1)}px"></i>`;
  return out;
}

export const industryCard = (i, extra = '') =>
  `<a class="icard${extra}" href="/industries/${i.slug}/" style="--a:${i.theme[0]};--tint:${i.theme[1]}" data-title="${esc(i.name)}"><span class="icard-ico">${iconSVG(i.icon)}</span><h3>${esc(i.name)}</h3><p>${esc(i.tag)}</p><span class="icard-go" aria-hidden="true">→</span></a>`;

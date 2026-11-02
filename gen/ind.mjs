import { SITE } from './site.mjs';
import { industries, glyphs } from './industries.mjs';
import { kitsA } from './kits-a.mjs';
import { kitsB } from './kits-b.mjs';
import { esc, abs, iconSVG, glyphSVG, eleSVG, shell, breadcrumbs, crumbHTML, faqSchema, faqHTML, ctaBlock, industryCard, orgNode } from './lib.mjs';

const kits = { ...kitsA, ...kitsB };
const split = (s) => s.split('|');
const bySlug = Object.fromEntries(industries.map((i) => [i.slug, i]));
const tagIco = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3"/></svg>';

// layout variants differ per industry so no two pages share the same composition
const V = {
  feat: { grid: ['hostel', 'clinic', 'school', 'retail-outlet', 'hotel'], rows: ['pg', 'tally-accounting', 'finance', 'wholesale', 'weighbridge'], bento: ['mess', 'laundry', 'restaurant', 'gym', 'showroom', 'media-house'], sticky: ['coaching', 'rmc', 'manufacturing', 'mines'] },
  ba: { cols: ['clinic', 'pg', 'finance', 'tally-accounting', 'weighbridge', 'mines', 'media-house'], cards: ['mess', 'laundry', 'coaching', 'gym', 'restaurant', 'showroom', 'wholesale', 'manufacturing'] },
  day: { notif: ['clinic', 'restaurant', 'retail-outlet', 'gym', 'showroom', 'laundry'], cols: ['school', 'coaching', 'finance', 'wholesale', 'hotel', 'pg'] },
  sigFirst: ['mess', 'gym', 'restaurant', 'hotel', 'showroom', 'mines', 'media-house', 'clinic'],
  faq2: ['clinic', 'school', 'finance', 'rmc', 'media-house', 'hotel', 'mines', 'pg'],
};
const pick = (map, slug, dflt) => Object.entries(map).find(([, a]) => a.includes(slug))?.[0] || dflt;

export function industryPage(i) {
  const p = `/industries/${i.slug}/`, kit = kits[i.slug];
  const trail = [['Home', '/'], ['Industries', '/industries/'], [i.name, p]];
  const [c1, c2] = i.theme;
  const kpi = (k) => `<div><b data-count="${k[1]}" data-dec="${String(k[1]).includes('.') ? 1 : 0}">0</b><em>${esc(k[2])}</em><span>${esc(k[0])}</span></div>`;

  /* before / after */
  const pains = i.pains.map((x) => split(x));
  const bv = pick(V.ba, i.slug, 'list');
  const baHTML = bv === 'cols'
    ? `<div class="ba-cols"><div class="bc-b" data-reveal><h3>Before</h3><ul>${pains.map(([a]) => `<li>${esc(a)}</li>`).join('')}</ul></div><div class="bc-a" data-reveal><h3>With Sarvlekh</h3><ul>${pains.map(([, b]) => `<li>${esc(b)}</li>`).join('')}</ul></div></div>`
    : bv === 'cards'
      ? `<div class="ba-cards">${pains.map(([a, b]) => `<article data-reveal><p class="was">${esc(a)}</p><span aria-hidden="true">↓</span><p class="now">${esc(b)}</p></article>`).join('')}</div>`
      : `<div class="ba-list">${pains.map(([a, b]) => `<div class="ba" data-reveal><p class="ba-before"><span>Before</span>${esc(a)}</p><span class="ba-arrow" aria-hidden="true">→</span><p class="ba-after"><span>With Sarvlekh</span>${esc(b)}</p></div>`).join('')}</div>`;

  /* features */
  const fv = pick(V.feat, i.slug, 'grid');
  const fs = i.features.map((x) => split(x));
  const featHTML = fv === 'rows'
    ? `<ol class="f-rows">${fs.map(([t, d], k) => `<li data-reveal><span>${String(k + 1).padStart(2, '0')}</span><div><h3>${esc(t)}</h3><p>${esc(d)}</p></div></li>`).join('')}</ol>`
    : fv === 'bento'
      ? `<div class="f-bento">${fs.map(([t, d], k) => `<article class="${k === 0 ? 'big' : k === 3 ? 'wide' : ''}" data-reveal><span class="feat-g">${glyphSVG(glyphs[k % glyphs.length])}</span><h3>${esc(t)}</h3><p>${esc(d)}</p></article>`).join('')}</div>`
      : fv === 'sticky'
        ? `<div class="f-sticky"><div class="fs-h" data-reveal><span class="tag">${tagIco}Features</span><h2>Built for the way a ${esc(i.name.toLowerCase())} really works.</h2><p>Modules switch on as you grow. Every feature is phone-ready.</p><a class="btn btn-dark" href="/contact/?industry=${i.slug}">Plan my system</a></div><div class="fs-l">${fs.map(([t, d], k) => `<article data-reveal><span class="feat-g">${glyphSVG(glyphs[k % glyphs.length])}</span><div><h3>${esc(t)}</h3><p>${esc(d)}</p></div></article>`).join('')}</div></div>`
        : `<div class="fgrid">${fs.map(([t, d], k) => `<article class="feat" data-reveal><span class="feat-g">${glyphSVG(glyphs[k % glyphs.length])}</span><h3>${esc(t)}</h3><p>${esc(d)}</p></article>`).join('')}</div>`;
  const featHead = fv === 'sticky' ? '' : `<div class="head-l" data-reveal><span class="tag">${tagIco}Features</span><h2>Everything a ${esc(i.name.toLowerCase())} needs, in one place.</h2><p>Modules switch on as you grow. Every feature is phone-ready.</p></div>`;

  /* a day */
  const dv = pick(V.day, i.slug, 'line');
  const days = i.day.map((x) => split(x));
  const dayHTML = dv === 'notif'
    ? `<div class="day-n">${days.map(([t, d]) => `<div class="notif" data-reveal><span class="nl">${iconSVG(i.icon)}</span><div><b>Sarvlekh <time>${esc(t)}</time></b><p>${esc(d)}</p></div></div>`).join('')}</div>`
    : dv === 'cols'
      ? `<div class="day-c">${days.map(([t, d]) => `<article data-reveal><time>${esc(t)}</time><p>${esc(d)}</p></article>`).join('')}</div>`
      : `<ol class="moments">${days.map(([t, d]) => `<li class="mom" data-reveal><time>${esc(t)}</time><p>${esc(d)}</p></li>`).join('')}</ol>`;

  const bench = i.bench.map(([n, u]) => `<li><a href="${u}" target="_blank" rel="noopener noreferrer">${esc(n)}<span aria-hidden="true">↗</span></a></li>`).join('');
  const shared = [[`Can the ${i.name.toLowerCase()} system be customised to our way of working?`, 'Yes. Every Sarvlekh system is shaped around your workflow — modules, roles, reports and approvals are configured with you, not imposed on you.'], [`Can Sarvlekh connect the ${i.name.toLowerCase()} system to Tally and GST?`, 'Yes. Sales, purchase and payment entries flow into Tally automatically and GST-ready invoices are generated from the same data.'], ['How quickly can we go live?', 'A focused first release usually goes live in weeks. We start with the modules that remove the most manual work and expand in stages.']];
  const faqs = i.faqs.concat(shared);
  const fq2 = V.faq2.includes(i.slug);
  const faqHTMLx = fq2
    ? `<div class="faq-2"><div class="fq-h" data-reveal><span class="tag">${tagIco}FAQ</span><h2>Questions about ${esc(i.name.toLowerCase())} software</h2><p>Short, direct answers.</p></div>${faqHTML(faqs)}</div>`
    : `<div class="narrow-s"><div class="head-c" data-reveal><span class="tag">${tagIco}FAQ</span><h2>Questions about ${esc(i.name.toLowerCase())} software</h2></div>${faqHTML(faqs)}</div>`;
  const rel = i.related.map((s) => industryCard(bySlug[s])).join('');

  const sigFirst = V.sigFirst.includes(i.slug);
  const secBA = `<section class="sec"><div class="wrap"><div class="head-l" data-reveal><span class="tag">${tagIco}The shift</span><h2>From the daily grind to a quiet, working system.</h2></div>${baHTML}</div></section>`;
  const sig = kit.sig();
  const body = `
<section class="ih ihv-${kit.v}"><div class="ih-in"><div class="ih-copy">${crumbHTML(trail)}<span class="tag">${iconSVG(i.icon, 'ico')}Sarvlekh for ${esc(i.plural)}</span><h1>${esc(i.tag)}</h1><p class="lede">${esc(i.lede)}</p><div class="cta-row"><a class="btn btn-go" href="/contact/?industry=${i.slug}">Plan my ${esc(i.name.toLowerCase())} system<span aria-hidden="true">→</span></a><a class="btn btn-line" href="#features">See features</a></div></div><div class="ih-art">${kit.hero()}</div></div></section>
<section class="ribbon" data-reveal>${i.kpis.map(kpi).join('')}<p>Illustrative preview</p></section>
${sigFirst ? sig + secBA : secBA + sig}
<section class="sec" id="features"><div class="wrap">${featHead}${featHTML}</div></section>
<section class="sec day-sec"><div class="wrap day-g"><div data-reveal><span class="tag">${tagIco}A day with Sarvlekh</span><h2>Your ${esc(i.name.toLowerCase())}, on quiet autopilot.</h2><p class="lede">Reminders, entries and reports happen by themselves. You step in only where judgement matters.</p></div>${dayHTML}</div></section>
<section class="sec bench"><div class="wrap"><div class="head-l" data-reveal><span class="tag">${tagIco}Built to world standards</span><h2>We study the best, then shape it to you.</h2><p>We benchmark against respected open-source projects and global leaders, then tailor the best ideas to Indian ${esc(i.plural)}.</p></div><ul class="bench-l" data-reveal>${bench}</ul><p class="tiny" style="margin-top:20px">Third-party names belong to their owners and are listed for comparison only. No partnership is implied.</p></div></section>
<section class="sec">${faqHTMLx}</section>
<section class="sec tint-sec"><div class="wrap"><div class="head-l" data-reveal><span class="tag">${tagIco}Also explore</span><h2>Related businesses</h2></div><div class="igrid">${rel}</div><p class="center" style="margin-top:28px"><a href="/services/">Our services</a> · <a href="/blog/">Blog</a> · <a href="/about/">Our story</a> · <a href="/faq/">All FAQs</a></p></div></section>
${ctaBlock(`Ready to put your ${i.name.toLowerCase()} in order?`, `Email ${SITE.email} with a few lines about your ${i.name.toLowerCase()} and we will reply with a plan.`)}`;

  const schema = [
    { '@context': 'https://schema.org', '@graph': [orgNode] }, breadcrumbs(trail), faqSchema(faqs),
    { '@context': 'https://schema.org', '@type': 'Service', '@id': abs(p) + '#service', name: `${i.name} management software & services`, serviceType: `${i.name} management system`, provider: { '@id': `${SITE.url}/#org` }, areaServed: { '@type': 'Country', name: 'India' }, description: i.desc, url: abs(p), hasOfferCatalog: { '@type': 'OfferCatalog', name: `${i.name} features`, itemListElement: i.features.map((f) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: split(f)[0], description: split(f)[1] } })) } },
    { '@context': 'https://schema.org', '@type': 'WebPage', url: abs(p), name: i.title, description: i.desc, isPartOf: { '@id': `${SITE.url}/#website` }, speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.lede', '.faq-a'] }, dateModified: SITE.updated },
  ];
  return { path: p, file: `industries/${i.slug}/index.html`, html: shell({ title: i.title, desc: i.desc, path: p, schema, body, bodyStyle: `--a:${c1};--tint:${c2}`, bodyClass: `pg-ind k-${i.slug}`, active: '/industries/' }) };
}

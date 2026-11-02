import { SITE, services, homeFaqs, faqGroups, glossary } from './site.mjs';
import { industries, glyphs } from './industries.mjs';
import { stars, esc, abs, iconSVG, glyphSVG, eleSVG, shell, breadcrumbs, crumbHTML, faqSchema, faqHTML, ctaBlock, industryCard, siteGraph, orgNode } from './lib.mjs';

const split = (s) => s.split('|');
const bySlug = Object.fromEntries(industries.map((i) => [i.slug, i]));

/* ---------------- INDUSTRY HUB ---------------- */
export function industryHub() {
  const trail = [['Home', '/'], ['Industries', '/industries/']];
  const body = `<section class="phero"><div class="hero-bg" aria-hidden="true"><i class="aur a1"></i><i class="aur a2"></i></div><div class="wrap">${crumbHTML(trail)}<p class="eyebrow">Industries</p><h1 data-split>Twenty-plus businesses. One way of thinking.</h1><p class="lede" data-reveal>Pick yours. Every page has its own theme, features, a day-in-the-life story and answers to the questions owners actually ask.</p></div></section>
<section class="sec"><div class="wrap"><div class="igrid igrid-lg">${industries.map((i) => industryCard(i)).join('')}</div>
<p class="center note" data-reveal>Don't see yours? We build for retail, services, education, healthcare, logistics and industry of every kind — <a href="/contact/">tell us about your business</a>.</p></div></section>${ctaBlock()}`;
  const schema = [siteGraph, breadcrumbs(trail), { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Industries — Sarvlekh', url: abs('/industries/'), hasPart: industries.map((i) => ({ '@type': 'WebPage', name: i.title, url: abs(`/industries/${i.slug}/`) })) }];
  return { path: '/industries/', file: 'industries/index.html', html: shell({ title: 'Industries — Software & Accounting for 20+ Businesses | Sarvlekh', desc: 'Hostel, PG, clinic, school, hotel, RMC, mines, retail, gym and 10+ more. Sarvlekh builds a connected software and accounting system for each industry.', path: '/industries/', schema, body }) };
}

/* ---------------- INDUSTRY PAGE ---------------- */
export function industryPage(i) {
  const p = `/industries/${i.slug}/`;
  const trail = [['Home', '/'], ['Industries', '/industries/'], [i.name, p]];
  const [c1, c2] = i.theme;
  const [k1, k2, k3] = i.kpis;
  const fmt = (v) => (Number.isInteger(v) ? v : v);
  const bars = [62, 80, 54, 92, 70, 88, 76].map((h, k) => `<i style="--h:${h}%;--i:${k}"></i>`).join('');
  const kpi = (k, n) => `<div class="kpi"><span class="kpi-v"><b data-count="${k[1]}" data-dec="${String(k[1]).includes('.') ? 1 : 0}">0</b>${esc(k[2])}</span><span class="kpi-l">${esc(k[0])}</span></div>`;
  const pains = i.pains.map((x, k) => { const [a, b] = split(x); return `<div class="ba" data-reveal style="--d:${k * 80}ms"><p class="ba-before"><span>Before</span>${esc(a)}</p><span class="ba-arrow" aria-hidden="true">→</span><p class="ba-after"><span>With Sarvlekh</span>${esc(b)}</p></div>`; }).join('');
  const feats = i.features.map((x, k) => { const [t, d] = split(x); return `<article class="feat" data-reveal style="--d:${(k % 4) * 70}ms"><span class="feat-g">${glyphSVG(glyphs[k % glyphs.length])}</span><h3>${esc(t)}</h3><p>${esc(d)}</p></article>`; }).join('');
  const day = i.day.map((x, k) => { const [t, d] = split(x); return `<li class="mom" data-reveal style="--d:${k * 100}ms"><time>${esc(t)}</time><p>${esc(d)}</p></li>`; }).join('');
  const bench = i.bench.map(([n, u]) => `<li><a href="${u}" target="_blank" rel="noopener noreferrer">${esc(n)}<span aria-hidden="true">↗</span></a></li>`).join('');
  const rel = i.related.map((s) => industryCard(bySlug[s])).join('');
  const shared = [[`Can the ${i.name.toLowerCase()} system be customised to our way of working?`, 'Yes. Every Sarvlekh system is shaped around your workflow — modules, roles, reports and approvals are configured with you, not imposed on you.'], [`Can Sarvlekh connect the ${i.name.toLowerCase()} system to Tally and GST?`, 'Yes. Sales, purchase and payment entries flow into Tally automatically and GST-ready invoices are generated from the same data.'], ['How quickly can we go live?', 'A focused first release usually goes live in weeks. We start with the modules that remove the most manual work and expand in stages.']];
  const faqs = i.faqs.concat(shared);
  const isLongIcon = iconSVG(i.icon, 'ico big');

  const body = `
<section class="ihero"><div class="hero-bg" aria-hidden="true"><i class="aur a1"></i><i class="aur a2"></i><i class="aur a3"></i><div class="motif m-${industries.indexOf(i) % 5}"></div></div>
<div class="wrap ihero-g">
<div class="ihero-copy">${crumbHTML(trail)}
<p class="eyebrow"><span class="dot"></span>Sarvlekh for ${esc(i.plural)}</p>
<h1 data-split>${esc(i.tag)}</h1>
<p class="lede" data-reveal>${esc(i.lede)}</p>
<div class="cta-row" data-reveal><a class="btn btn-go" href="/contact/?industry=${i.slug}">Plan my ${esc(i.name.toLowerCase())} system<span aria-hidden="true">→</span></a><a class="btn btn-ghost" href="#features">See features</a></div>
</div>
<div class="ihero-art"><div class="big-ico" aria-hidden="true">${isLongIcon}</div><div class="dash" data-tilt><div class="dash-bar"><i></i><i></i><i></i><span>${esc(i.name)} · live preview</span></div>
<div class="dash-kpis">${kpi(k1)}${kpi(k2)}${kpi(k3)}</div><div class="dash-chart" aria-hidden="true">${bars}</div><p class="dash-note">Illustrative preview</p></div>
${eleSVG('i-mascot')}</div>
</div></section>

<section class="sec"><div class="wrap"><header class="sec-h" data-reveal><p class="eyebrow">The shift</p><h2 data-split>From the daily grind to a quiet, working system.</h2></header><div class="ba-list">${pains}</div></div></section>

<section class="sec" id="features"><div class="wrap"><header class="sec-h" data-reveal><p class="eyebrow">Features</p><h2 data-split>Everything a ${esc(i.name.toLowerCase())} needs, in one place.</h2><p class="lede">Modules are switched on as you grow. Every feature is phone-ready.</p></header><div class="fgrid">${feats}</div></div></section>

<section class="sec day"><div class="wrap day-g"><div data-reveal><p class="eyebrow">A day with Sarvlekh</p><h2 data-split>Your ${esc(i.name.toLowerCase())}, on quiet autopilot.</h2><p class="lede">Reminders, entries and reports happen by themselves. You step in only where judgement matters.</p></div><ol class="moments">${day}</ol></div></section>

<section class="sec bench"><div class="wrap"><header class="sec-h" data-reveal><p class="eyebrow">Built to world standards</p><h2 data-split>We study the best, then shape it to you.</h2><p class="lede">We benchmark against respected open-source projects and global leaders, then tailor the best ideas to Indian ${esc(i.plural)}.</p></header><ul class="bench-l" data-reveal>${bench}</ul><p class="tiny center">Third-party names belong to their owners and are listed for comparison only. No partnership is implied.</p></div></section>

<section class="sec"><div class="wrap narrow"><header class="sec-h" data-reveal><p class="eyebrow">FAQ</p><h2 data-split>Questions about ${esc(i.name.toLowerCase())} software</h2></header>${faqHTML(faqs)}</div></section>

<section class="sec"><div class="wrap"><header class="sec-h" data-reveal><p class="eyebrow">Also explore</p><h2 data-split>Related businesses</h2></header><div class="igrid">${rel}</div><p class="center" data-reveal><a href="/services/">Our services</a> · <a href="/about/">Our story</a> · <a href="/faq/">All FAQs</a></p></div></section>
${ctaBlock(`Ready to put your ${i.name.toLowerCase()} in order?`, `Email ${SITE.email} with a few lines about your ${i.name.toLowerCase()} and we will reply with a plan.`)}`;

  const schema = [
    { '@context': 'https://schema.org', '@graph': [orgNode] },
    breadcrumbs(trail), faqSchema(faqs),
    { '@context': 'https://schema.org', '@type': 'Service', '@id': abs(p) + '#service', name: `${i.name} management software & services`, serviceType: `${i.name} management system`, provider: { '@id': `${SITE.url}/#org` }, areaServed: { '@type': 'Country', name: 'India' }, description: i.desc, url: abs(p), hasOfferCatalog: { '@type': 'OfferCatalog', name: `${i.name} features`, itemListElement: i.features.map((f) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: split(f)[0], description: split(f)[1] } })) } },
    { '@context': 'https://schema.org', '@type': 'WebPage', url: abs(p), name: i.title, description: i.desc, isPartOf: { '@id': `${SITE.url}/#website` }, speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.lede', '.faq-a'] }, dateModified: SITE.updated },
  ];
  return { path: p, file: `industries/${i.slug}/index.html`, html: shell({ title: i.title, desc: i.desc, path: p, schema, body, bodyStyle: `--a:${c1};--tint:${c2}`, bodyClass: `pg-ind`, active: '/industries/' }) };
}

/* ---------------- ABOUT (newspaper) ---------------- */
export function about() {
  const trail = [['Home', '/'], ['Our Story', '/about/']];
  const body = `
<div class="paper">
<div class="paper-wrap">
<div class="np-top"><span>Vol. I · The Edition of Order</span><span class="np-date" id="np-date">Est. with purpose</span><span>सर्वे भवन्तु सुखिनः</span></div>
<header class="np-mast-h"><div class="np-rule"></div><h1 class="np-title">The Sarvlekh Times</h1><div class="np-rule thin"></div><p class="np-sub">“The record of everything” — a newspaper about why a business studio exists</p></header>
<article class="np-lead"><h2 class="np-hl" data-split>Sarvlekh Vows To Return Time, Peace &amp; Dignity To Those Who Run Businesses</h2>
<p class="np-by">By the Sarvlekh Desk · Special report on <em>seva</em>, service and the stewardship of work</p>
<div class="np-cols">
<p class="dropcap">Every morning, somewhere in India, a hostel warden is counting beds in a register, a clinic receptionist is searching for a lost file, a plant supervisor is phoning a driver, and an owner is wondering — again — where the money went. None of them chose this work to become clerks. They chose to feed, heal, teach, build and serve. Sarvlekh was born from a simple, stubborn question: <em>what if the paperwork simply took care of itself?</em></p>
<p>The name is Sanskrit. <strong>Sarva</strong> means all. <strong>Lekh</strong> means the written record. Together: <em>the record of everything</em>. Not a cold ledger, but an old idea — that a life, or a business, kept in honest order is a life of lightness. In our tradition, accounts kept truthfully are an act of <em>satya</em>; work offered with care is <em>seva</em>.</p>
<blockquote class="pull"><span>“You have a right to your work, not to its restlessness.”</span><cite>— the spirit of Karmanye vadhikaraste, Bhagavad Gita 2.47</cite></blockquote>
<p>We build the systems that make systems — flexible platforms that arrange themselves around a hostel, a school, a mine or a showroom — so owners spend less time on the register and more time on the reason they began. We also keep the books: Tally, GST, payroll, and the quiet compliance that lets a family sleep.</p>
<p>Why an elephant? In India the elephant is remembered for memory, strength and patience — and as the remover of obstacles. It carries our promise: to remember everything for you, to carry the heavy load, and to clear the path. The green roof-arrow rising behind it is growth, and shelter: a business should be a home for the people in it.</p>
</div></article>

<section class="np-grid">
<div class="np-box mission" data-reveal><h3>Our Mission</h3><p>To bring ease to every business by turning scattered work into one calm, honest system — and to give back the hours, health and dignity that disorder takes from the people who serve others.</p></div>
<div class="np-box vision" data-reveal><h3>Our Vision</h3><p>A country, and one day a world, where every business — from the smallest mess to the largest plant — runs with clarity, so that human effort goes into care, craft and creativity instead of chasing paper.</p></div>
<div class="np-box name" data-reveal><h3>The Meaning of the Name</h3><p class="dev">सर्वलेख</p><p><strong>Sarva</strong> — all. <strong>Lekh</strong> — record, writing. <em>The record of everything.</em></p></div>
</section>

<section class="np-values"><h3 class="np-sec">The Four Pillars</h3><div class="pil-g">
<div data-reveal><span>सेवा</span><h4>Seva — Service</h4><p>We measure ourselves by how much lighter your day becomes.</p></div>
<div data-reveal><span>सत्य</span><h4>Satya — Truth</h4><p>Honest numbers, honest timelines, honest advice — even when it is inconvenient.</p></div>
<div data-reveal><span>श्रद्धा</span><h4>Shraddha — Care</h4><p>We learn your business as if it were our own. Craft over haste.</p></div>
<div data-reveal><span>समृद्धि</span><h4>Samriddhi — Prosperity</h4><p>Growth that includes the workers, the customers and the community.</p></div>
</div></section>

<section class="np-story"><h3 class="np-sec">The Idea Behind Sarvlekh</h3>
<ol class="np-time"><li data-reveal><b>The observation</b><p>Capable people lose their best hours to registers, repeated entries and chasing. The loss is human, not just financial.</p></li><li data-reveal><b>The promise</b><p>One system that remembers everything, and accounts that are always ready — so owners can lead, not just keep up.</p></li><li data-reveal><b>The practice</b><p>Understand first. Build in stages. Teach on the floor. Keep improving, month after month.</p></li><li data-reveal><b>The purpose</b><p>Ease for business, so that service — to patients, students, guests, workers — can be given with a free mind.</p></li></ol></section>

<aside class="np-classif"><h3>Classifieds</h3><p><b>WANTED:</b> Owners who would like their evenings back. <b>OFFERED:</b> One intelligent system, a calm team and an elephant that never forgets. <a href="mailto:${SITE.email}">${SITE.email}</a></p></aside>
<p class="np-cta"><a class="btn btn-ink" href="/contact/">Begin your story with us →</a></p>
</div></div>`;
  const schema = [siteGraph, breadcrumbs(trail), { '@context': 'https://schema.org', '@type': 'AboutPage', name: 'Our Story, Mission & Vision — Sarvlekh', url: abs('/about/'), about: { '@id': `${SITE.url}/#org` }, description: 'Sarvlekh means the record of everything. Read our mission, vision and the idea behind building calm business systems for India.' }];
  return { path: '/about/', file: 'about/index.html', html: shell({ title: 'About Sarvlekh — Our Story, Mission & Vision', desc: 'Sarvlekh means "the record of everything". Read our mission, vision and the idea of bringing ease, service and calm to every business in India.', path: '/about/', schema, body, bodyClass: 'pg-paper', themeColor: '#f7f4ec' }) };
}

/* ---------------- FAQ ---------------- */
export function faqPage() {
  const trail = [['Home', '/'], ['FAQ', '/faq/']];
  const all = faqGroups.flatMap((g) => g[1]);
  const intro = ['Who we are and why the name matters.', 'How we work, step by step.', 'Where your data lives and how it stays safe.', 'The first conversation, and what follows.'];
  const chapters = faqGroups.map(([g, qs], k) => `<section class="fq-chap" id="c${k + 1}" data-chap><div class="fq-side" data-reveal><b>${String(k + 1).padStart(2, '0')}</b><h2>${esc(g)}</h2><p>${intro[k] || ''}</p></div><div>${faqHTML(qs, { open: k === 0 })}</div></section>`).join('');
  const body = `<section class="fq-hero"><div class="stars" aria-hidden="true">${stars(36, 9)}</div><div class="fq-hero-in">${crumbHTML(trail)}${eleSVG('fq-mascot')}<div class="bubble"><b>What would you like to know?</b><p>Ask the elephant — it remembers everything.</p></div><h1>Questions, answered briefly.</h1>
<label class="fq-search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg><input id="fq-q" type="search" placeholder="Search — try “Tally”, “security” or “how long”" autocomplete="off" aria-label="Search questions"></label>
<nav class="fq-chips" aria-label="Chapters">${faqGroups.map(([g], k) => `<a href="#c${k + 1}">${String(k + 1).padStart(2, '0')} · ${esc(g)}</a>`).join('')}</nav></div></section>
<section class="sec fq-sec">${chapters}<p class="fq-none" id="fq-none" hidden>No matching question. Try another word, or write to <a href="mailto:${SITE.email}">${SITE.email}</a>.</p></section>
<section class="sec tint-sec"><div class="head-c" data-reveal><span class="tag">More answers</span><h2>Looking for something specific?</h2><p>Every industry page has its own questions and answers.</p></div><div class="chips" data-reveal style="justify-content:center">${industries.map((i) => `<a href="/industries/${i.slug}/">${esc(i.name)}</a>`).join('')}</div></section>${ctaBlock()}`;
  return { path: '/faq/', file: 'faq/index.html', html: shell({ title: 'FAQ — Sarvlekh Business Software, Accounting & Automation', desc: 'Answers about Sarvlekh: what it is, the meaning of the name, industries served, how we work, security, offline use, Tally integration and how to get started.', path: '/faq/', schema: [siteGraph, breadcrumbs(trail), faqSchema(all)], body, bodyClass: 'pg-faq' }) };
}

/* ---------------- CONTACT ---------------- */
export function contact() {
  const trail = [['Home', '/'], ['Contact', '/contact/']];
  const opts = industries.map((i) => `<option value="${esc(i.name)}">${esc(i.name)}</option>`).join('');
  const body = `<section class="phero"><div class="hero-bg" aria-hidden="true"><i class="aur a1"></i><i class="aur a2"></i></div><div class="wrap contact-g"><div>${crumbHTML(trail)}<p class="eyebrow">Contact</p><h1 data-split>Let's put your business in order.</h1><p class="lede" data-reveal>Write to us — a few lines are enough. We reply with questions, then a plan.</p>
<a class="mailbig" href="mailto:${SITE.email}" data-reveal>${SITE.email}</a>${eleSVG('i-mascot c-mascot')}</div>
<form class="form" id="contact-form" data-reveal novalidate><label>Your name<input name="name" autocomplete="name" required></label><label>Phone / WhatsApp (optional)<input name="phone" autocomplete="tel" inputmode="tel"></label><label>Business type<select name="industry"><option value="">Select…</option>${opts}<option>Other</option></select></label><label>What would you like to improve?<textarea name="msg" rows="4" required></textarea></label><button class="btn btn-go btn-block" type="submit">Send via email app →</button><p class="tiny">This opens your email app addressed to ${SITE.email}. Nothing is stored on this site.</p></form></div></section>`;
  return { path: '/contact/', file: 'contact/index.html', html: shell({ title: 'Contact Sarvlekh — connect@sarvlekh.in', desc: 'Contact Sarvlekh to plan business software, accounting and workflow automation for your business. Email connect@sarvlekh.in.', path: '/contact/', schema: [siteGraph, breadcrumbs(trail), { '@context': 'https://schema.org', '@type': 'ContactPage', url: abs('/contact/'), name: 'Contact Sarvlekh', about: { '@id': `${SITE.url}/#org` } }], body }) };
}

export function privacy() {
  const trail = [['Home', '/'], ['Privacy', '/privacy/']];
  const body = `<section class="phero"><div class="wrap narrow">${crumbHTML(trail)}<h1>Privacy</h1><p class="lede">We keep this simple.</p><div class="prose"><p>This website does not use advertising trackers and does not store form data. The contact form opens your own email app so you can write to <a href="mailto:${SITE.email}">${SITE.email}</a>.</p><p>Fonts are loaded from Google Fonts. Anything you email us is used only to reply to you and prepare a proposal.</p><p>Questions? Write to us at the address above.</p></div></div></section>`;
  return { path: '/privacy/', file: 'privacy/index.html', html: shell({ title: 'Privacy — Sarvlekh', desc: 'How Sarvlekh handles information on this website.', path: '/privacy/', schema: [breadcrumbs(trail)], body }) };
}

export function notFound() {
  const body = `<section class="phero nf"><div class="wrap center">${eleSVG('i-mascot')}<h1>This page wandered off.</h1><p class="lede">Even the elephant can't find it. Let's get you back.</p><div class="cta-row"><a class="btn btn-go" href="/">Home</a><a class="btn btn-ghost" href="/industries/">Industries</a></div></div></section>`;
  return { path: '/404.html', file: '404.html', html: shell({ title: 'Page not found — Sarvlekh', desc: 'Page not found.', path: '/404.html', schema: [], body }).replace('content="index,follow', 'content="noindex,follow') };
}

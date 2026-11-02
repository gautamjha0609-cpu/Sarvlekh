import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { SITE, services, homeFaqs } from './gen/site.mjs';
import { industries } from './gen/industries.mjs';
import * as P from './gen/pages.mjs';
import { home } from './gen/home.mjs';
import { industryPage } from './gen/ind.mjs';
import { servicesHub, servicePage, blogHub, blogPost } from './gen/services.mjs';
import { posts } from './gen/blog.mjs';
import { PurgeCSS } from 'purgecss';

const out = 'dist';
await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
const unused = ['assets/js/beam.js', 'assets/media/hero-3d.jpg', 'assets/media/hero-3d.mp4', 'assets/media/hero-beam.jpg', 'assets/media/hero-beam.mp4', 'assets/img/mark-dark.png', 'assets/img/mark-elephant-dark.png', 'assets/img/full-dark.png'];
await cp('assets', join(out, 'assets'), { recursive: true, filter: (src) => !unused.includes(src.replace(/\\/g, '/')) });
await rm(join(out, 'assets/css'), { recursive: true, force: true });
await mkdir(join(out, 'assets/css'), { recursive: true });

const pages = [home(), P.industryHub(), ...industries.map(industryPage), servicesHub(), ...services.map(servicePage), blogHub(), ...posts.map(blogPost), P.about(), P.faqPage(), P.contact(), P.privacy(), P.notFound()];
for (const pg of pages) {
  const f = join(out, pg.file);
  await mkdir(dirname(f), { recursive: true });
  await writeFile(f, pg.html);
}


/* ---- per-section stylesheets: purge unused CSS, minify whitespace ---- */
{
  const { readFileSync } = await import('node:fs');
  const layer = (n) => readFileSync(`assets/css/${n}.css`, 'utf8');
  const use = { home: ['00-fonts', '00-base', '10-video', '15-motion', '16-huly', '17-huly2'], ind: ['00-fonts', '00-base', '10-video', '15-motion', '17-huly2', '30-ind', '31-ind-b'], svc: ['00-fonts', '00-base', '10-video', '15-motion', '17-huly2', '20-svc'], blog: ['00-fonts', '00-base', '10-video', '15-motion', '17-huly2', '20-svc', '40-blog'], misc: ['00-fonts', '00-base', '10-video', '15-motion', '17-huly2', '20-svc', '31-ind-b'] };
  const group = (p) => (p === '/' ? 'home' : p.startsWith('/industries/') ? 'ind' : p.startsWith('/services/') ? 'svc' : p.startsWith('/blog/') ? 'blog' : 'misc');
  const groups = {};
  for (const pg of pages) (groups[group(pg.path)] ||= []).push(pg);
  const safe = { standard: [/^(in|on|open|ready|leaving|scrolled|seen|js|hide|w|now|done|ok|hs|hot|has-mega|sheet|fan)$/], greedy: [/^pg-/, /^k-/, /^svc-/, /^eco-/, /^rf-/, /^gz-/] };
  for (const k of Object.keys(use)) use[k].push('99-a11y');
  const min = (c) => c.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s*([{};,>~])\s*/g, '$1').replace(/;}/g, '}').replace(/\s{2,}/g, ' ').trim();
  for (const [g, list] of Object.entries(groups)) {
    const res = await new PurgeCSS().purge({ content: list.map((pg) => ({ raw: pg.html, extension: 'html' })).concat([{ raw: readFileSync('assets/js/main.js', 'utf8'), extension: 'js' }]), css: [{ raw: use[g].map(layer).join(' ') }], safelist: safe, keyframes: true, variables: true });
    const css = min(res[0].css);
    await writeFile(join(out, `assets/css/${g}.css`), css);
    for (const pg of list) await writeFile(join(out, pg.file), pg.html.replace('/assets/css/main.css', `/assets/css/${g}.css`));
    console.log(`css ${g}: ${(css.length / 1024).toFixed(0)} KB`);
  }
}

/* ---- cache busting for css/js + host config ---- */
{
  const { createHash } = await import('node:crypto');
  const { readFileSync } = await import('node:fs');
  const { readdirSync } = await import('node:fs');
  const hh = createHash('md5').update(readFileSync(join(out, 'assets/js/main.js')));
  for (const f of readdirSync(join(out, 'assets/css')).sort()) hh.update(readFileSync(join(out, 'assets/css', f)));
  const v = hh.digest('hex').slice(0, 8);
  const stamp = async (f) => { const t = readFileSync(join(out, f.file), 'utf8'); await writeFile(join(out, f.file), t.replace(/(\/assets\/(?:css|js)\/[\w.-]+\.(?:css|js))(?=["'])/g, `$1?v=${v}`)); };
  for (const pg of pages) await stamp(pg);
  await writeFile(join(out, '_headers'), `/assets/css/*\n  Cache-Control: public, max-age=31536000, immutable\n/assets/js/*\n  Cache-Control: public, max-age=31536000, immutable\n/assets/fonts/*\n  Cache-Control: public, max-age=31536000, immutable\n/assets/media/*\n  Cache-Control: public, max-age=2592000\n/assets/img/*\n  Cache-Control: public, max-age=2592000\n/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  X-Frame-Options: SAMEORIGIN\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n`);
}

const prio = (p) => (p === '/' ? '1.0' : p === '/industries/' || p === '/about/' ? '0.9' : p.startsWith('/industries/') || p.startsWith('/blog/') ? '0.8' : '0.7');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.filter((p) => p.path !== '/404.html').map((p) => `<url><loc>${SITE.url}${p.path}</loc><lastmod>${SITE.updated}</lastmod><changefreq>monthly</changefreq><priority>${prio(p.path)}</priority></url>`).join('\n')}\n</urlset>\n`;
await writeFile(join(out, 'sitemap.xml'), sitemap);

const bots = ['GPTBot', 'ChatGPT-User', 'OAI-SearchBot', 'ClaudeBot', 'Claude-Web', 'anthropic-ai', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended', 'CCBot', 'Bingbot', 'Googlebot'];
await writeFile(join(out, 'robots.txt'), `User-agent: *\nAllow: /\n\n${bots.map((b) => `User-agent: ${b}\nAllow: /\n`).join('\n')}\nSitemap: ${SITE.url}/sitemap.xml\n`);

const llms = `# Sarvlekh (सर्वलेख)\n\n> Sarvlekh is a premium business systems studio in India. We build connected software, accounting (Tally, GST, TDS, payroll) and workflow automation for hostels, PGs, clinics, messes, laundries, schools, coaching institutes, media houses, finance companies, RMC plants, manufacturing plants, retail and wholesale stores, gyms, restaurants, showrooms, hotels, weighbridges, mines and more. "Sarvlekh" is Sanskrit: sarva = all, lekh = record — "the record of everything".\n\nContact: ${SITE.email}\n\n## Key pages\n- [Home](${SITE.url}/): overview\n- [Industries](${SITE.url}/industries/): all industries served\n- [Services](${SITE.url}/services/): software, accounting, optimisation\n- [Our story, mission & vision](${SITE.url}/about/)\n- [FAQ](${SITE.url}/faq/)\n- [Contact](${SITE.url}/contact/)\n\n## Industry pages\n${industries.map((i) => `- [${i.name}](${SITE.url}/industries/${i.slug}/): ${i.desc}`).join('\n')}\n\n## Services\n${services.map((s) => `- [${s.name}](${SITE.url}/services/${s.slug}/): ${s.desc}`).join('\n')}\n\n## Quick answers\n${homeFaqs.map(([q, a]) => `**${q}** ${a}`).join('\n\n')}\n`;
await writeFile(join(out, 'llms.txt'), llms);

await writeFile(join(out, 'manifest.webmanifest'), JSON.stringify({ name: 'Sarvlekh', short_name: 'Sarvlekh', start_url: '/', display: 'standalone', background_color: '#07090a', theme_color: '#07090a', icons: [{ src: '/assets/img/logo-512.png', sizes: '512x512', type: 'image/png' }] }));
console.log(`Built ${pages.length} pages → ${out}/`);

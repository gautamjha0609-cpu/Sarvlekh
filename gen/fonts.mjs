// One-off helper: self-host Google Fonts (latin + devanagari subsets). Run: node gen/fonts.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
const css = readFileSync('_work/fonts.css', 'utf8');
mkdirSync('assets/fonts', { recursive: true });
let out = '';
const names = {};
for (const m of css.matchAll(/\/\*\s*([\w-]+)\s*\*\/\s*@font-face\s*\{([^}]*)\}/g)) {
  const [, subset, body] = m;
  if (!['latin', 'devanagari'].includes(subset)) continue;
  const fam = /font-family:\s*'([^']+)'/.exec(body)[1];
  const style = /font-style:\s*(\w+)/.exec(body)[1];
  const weight = /font-weight:\s*([^;]+);/.exec(body)[1].trim();
  const url = /url\(([^)]+)\)/.exec(body)[1];
  const ur = (/unicode-range:\s*([^;]+);/.exec(body) || [])[1];
  const file = `${fam.toLowerCase().replace(/\s+/g, '-')}-${style}-${subset}.woff2`;
  const res = await fetch(url);
  writeFileSync(`assets/fonts/${file}`, Buffer.from(await res.arrayBuffer()));
  names[file] = 1;
  out += `@font-face{font-family:'${fam}';font-style:${style};font-weight:${weight};font-display:swap;src:url(/assets/fonts/${file}) format('woff2');${ur ? `unicode-range:${ur};` : ''}}\n`;
}
writeFileSync('assets/css/00-fonts.css', out);
console.log(Object.keys(names).join('\n'));

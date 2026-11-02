import { readdirSync, statSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
let bad = 0, n = 0;
for (const f of walk('dist').filter((f) => f.endsWith('.html'))) {
  const h = readFileSync(f, 'utf8');
  for (const m of h.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
    n++; const t = join('dist', m[1]);
    if (!(existsSync(t) && (statSync(t).isFile() || existsSync(join(t, 'index.html'))))) { bad++; console.log('BROKEN', f, m[1]); }
  }
}
console.log(`${n} internal refs checked, ${bad} broken`);

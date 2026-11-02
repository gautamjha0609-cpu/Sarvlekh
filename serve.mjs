import http from 'node:http';
import zlib from 'node:zlib';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
const root = join(process.cwd(), 'dist');
const port = Number(process.argv[2] || 5173);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.svg': 'image/svg+xml', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.webmanifest': 'application/manifest+json', '.json': 'application/json', '.webp': 'image/webp' };
http.createServer(async (req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let f = normalize(join(root, p));
  if (!f.startsWith(root)) { res.writeHead(403).end(); return; }
  try { if ((await stat(f)).isDirectory()) f = join(f, 'index.html'); } catch {}
  try { const d = await readFile(f); const ct = types[extname(f)] || 'application/octet-stream'; const gz = /text|javascript|json|xml|svg/.test(ct) && /gzip/.test(req.headers['accept-encoding'] || ''); const h = { 'Content-Type': ct, 'Cache-Control': extname(f) === '.html' ? 'no-cache' : 'public, max-age=3600', ...(gz ? { 'Content-Encoding': 'gzip', Vary: 'Accept-Encoding' } : {}) }; res.writeHead(200, h); res.end(gz ? zlib.gzipSync(d) : d); }
  catch { const d = await readFile(join(root, '404.html')).catch(() => 'Not found'); res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' }); res.end(d); }
}).listen(port, () => console.log(`Sarvlekh dev server: http://localhost:${port}`));

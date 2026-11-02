// Renders the site's looping background videos + poster from the shaders in assets/js/beam.js (offline step).
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
const FF = process.env.FFMPEG || 'ffmpeg';
const src = fs.readFileSync('assets/js/beam.js', 'utf8');
const b = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const p = await b.newPage();
await p.setContent('<canvas id=c width=64 height=64></canvas>');
await p.evaluate(src);
if (!(await p.evaluate(() => { window.g = SvBeam.make(document.getElementById('c')); return !!window.g; }))) { console.log('NO WEBGL'); process.exit(1); }
const frame = async (a, w, h, mode, spread, out, type = 'image/jpeg') => {
  const d = await p.evaluate((a, w, h, mode, spread, type) => { const c = document.getElementById('c'); c.width = w; c.height = h; window.g.draw(a, mode, spread); return c.toDataURL(type, .92); }, a, w, h, mode, spread, type);
  fs.writeFileSync(out, Buffer.from(d.split(',')[1], 'base64'));
};
const only = process.argv[2];
const jobs = [
  { name: 'hero-fall', mode: 4, w: 1920, h: 960, n: 120, spread: .16, crf: 26 },
  { name: 'hero-3d', mode: 3, w: 1920, h: 1080, n: 120, spread: .1, crf: 26 },
  { name: 'hero-beam', mode: 0, w: 1920, h: 1080, n: 120, spread: .1, crf: 27 },
  { name: 'orb-ring', mode: 1, w: 720, h: 720, n: 96, spread: .1, crf: 28 },
  { name: 'aurora-light', mode: 2, w: 1280, h: 720, n: 120, spread: .22, crf: 30 },
];
fs.mkdirSync('_work/frames', { recursive: true });
for (const j of jobs.filter((x) => !only || x.name === only)) {
  for (let i = 0; i < j.n; i++) await frame((i / j.n) * Math.PI * 2, j.w, j.h, j.mode, j.spread, `_work/frames/f_${String(i).padStart(3, '0')}.jpg`);
  fs.copyFileSync('_work/frames/f_030.jpg', `assets/media/${j.name}.jpg`);
  execFileSync(FF, ['-v', 'error', '-framerate', '24', '-i', '_work/frames/f_%03d.jpg', '-c:v', 'libx264', '-crf', String(j.crf), '-preset', 'slow', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an', `assets/media/${j.name}.mp4`, '-y']);
  console.log(j.name);
}
await b.close();

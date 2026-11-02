(() => {
  'use strict';
  const d = document, root = d.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, c = d) => c.querySelector(s), $$ = (s, c = d) => [...c.querySelectorAll(s)];

  /* ---- Page transition: one quick flat panel ---- */
  const open = () => { root.classList.add('ready'); root.classList.remove('leaving'); };
  open();
  addEventListener('pageshow', (e) => { if (e.persisted) open(); });

  d.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;
    const u = new URL(a.href, location.href);
    if (u.origin !== location.origin || /\.(xml|txt|png|svg)$/.test(u.pathname)) return;
    if (u.pathname === location.pathname) return;
    e.preventDefault();
    if (reduce) { location.href = u.href; return; }
    root.classList.add('leaving');
    setTimeout(() => (location.href = u.href), 260);
  });

  /* ---- Reveal on scroll (opacity + small rise, once) ---- */
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in'); io.unobserve(e.target);
    $$('[data-count]', e.target).forEach(count);
  }), { threshold: .15, rootMargin: '0px 0px -5% 0px' });
  $$('[data-reveal],.dash,.trusted,.ws').forEach((el) => io.observe(el));

  function count(el) {
    const to = parseFloat(el.dataset.count), dec = +el.dataset.dec || 0, t0 = performance.now(), dur = 1100;
    if (reduce) { el.textContent = to.toLocaleString('en-IN'); return; }
    (function f(t) { const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3); el.textContent = (to * e).toLocaleString('en-IN', { minimumFractionDigits: dec, maximumFractionDigits: dec }); if (p < 1) requestAnimationFrame(f); })(t0);
  }

  /* ---- Hero: word-by-word headline + eased pointer parallax ---- */
  const h1 = $('.hero-panel h1');
  if (h1 && !reduce) {
    const words = h1.textContent.trim().split(/\s+/);
    h1.setAttribute('aria-label', h1.textContent.trim());
    h1.innerHTML = words.map((w, i) => `<span class="w" aria-hidden="true"><span style="--i:${i}">${w}</span></span>`).join(' ');
  }
  const hp = $('.hero-panel');
  if (hp && !reduce && matchMedia('(hover:hover)').matches) {
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
    const loop = () => {
      cx += (tx - cx) * .08; cy += (ty - cy) * .08;
      hp.style.setProperty('--mx', cx.toFixed(3)); hp.style.setProperty('--my', cy.toFixed(3));
      raf = (Math.abs(tx - cx) > .002 || Math.abs(ty - cy) > .002) ? requestAnimationFrame(loop) : 0;
    };
    const go = () => { if (!raf) raf = requestAnimationFrame(loop); };
    hp.addEventListener('pointermove', (e) => { const r = hp.getBoundingClientRect(); tx = (e.clientX - r.left) / r.width * 2 - 1; ty = (e.clientY - r.top) / r.height * 2 - 1; go(); }, { passive: true });
    hp.addEventListener('pointerleave', () => { tx = 0; ty = 0; go(); });
  }

  /* ---- Scrollytelling: the step in view swaps the pinned screen ---- */
  const story = $('[data-story]');
  if (story) {
    const sio = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { story.dataset.active = e.target.dataset.step; $$('.stp', story).forEach((x) => x.classList.toggle('on', x === e.target)); }
    }), { rootMargin: '-42% 0px -42% 0px' });
    $$('.stp', story).forEach((x) => sio.observe(x));
    $('.stp', story).classList.add('on');
  }

  /* ---- Videos: play only while visible; hero video drifts with the pointer; spotlight on cards ---- */
  const vids = $$('video');
  if (vids.length) {
    const play = (v) => { const s = $('source[data-src]', v); if (s) { s.src = (innerWidth < 760 && s.dataset.srcM) || s.dataset.src; s.removeAttribute('data-src'); v.load(); } const r = v.play(); if (r && r.catch) r.catch(() => {}); };
    if (reduce) vids.forEach((v) => v.pause());
    else {
      const vio = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) play(e.target); else e.target.pause(); }), { rootMargin: '160px' });
      const go = () => vids.forEach((v) => vio.observe(v));
      'requestIdleCallback' in window ? requestIdleCallback(go, { timeout: 1500 }) : setTimeout(go, 600);
    }
  }
  const hh = $('.hl-hero');
  if (hh && !reduce && matchMedia('(hover:hover)').matches) {
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
    const loop = () => { cx += (tx - cx) * .07; cy += (ty - cy) * .07; hh.style.setProperty('--mx', cx.toFixed(3)); hh.style.setProperty('--my', cy.toFixed(3)); raf = (Math.abs(tx - cx) > .002 || Math.abs(ty - cy) > .002) ? requestAnimationFrame(loop) : 0; };
    hh.addEventListener('pointermove', (e) => { const r = hh.getBoundingClientRect(); tx = (e.clientX - r.left) / r.width * 2 - 1; ty = (e.clientY - r.top) / Math.min(r.height, innerHeight) * 2 - 1; if (!raf) raf = requestAnimationFrame(loop); }, { passive: true });
  }
  /* ---- Hero: interactive hover reveal (spotlight follows the cursor; auto-sweeps on touch) ---- */
  if (hh && !reduce) {
    let px = 0, py = 0, tx2 = 0, ty2 = 0, on = false, vis = true, raf2 = 0, hover = matchMedia('(hover:hover)').matches;
    const r0 = () => hh.getBoundingClientRect();
    const frame2 = (t) => {
      raf2 = 0; if (!vis) return;
      if (!hover) { const r = r0(); tx2 = r.width * (.62 + .22 * Math.sin(t / 2600)); ty2 = Math.min(r.height, innerHeight) * (.42 + .22 * Math.cos(t / 3400)); }
      px += (tx2 - px) * .12; py += (ty2 - py) * .12;
      hh.style.setProperty('--px', px.toFixed(1) + 'px'); hh.style.setProperty('--py', py.toFixed(1) + 'px');
      raf2 = requestAnimationFrame(frame2);
    };
    const kick = () => { if (!raf2) raf2 = requestAnimationFrame(frame2); };
    new IntersectionObserver((e) => { vis = e[0].isIntersecting; if (vis) kick(); }).observe(hh);
    if (hover) {
      hh.addEventListener('pointerenter', (e) => { const r = r0(); px = tx2 = e.clientX - r.left; py = ty2 = e.clientY - r.top; hh.style.setProperty('--ro', 1); kick(); });
      hh.addEventListener('pointermove', (e) => { const r = r0(); tx2 = e.clientX - r.left; ty2 = e.clientY - r.top; hh.style.setProperty('--ro', 1); }, { passive: true });
      hh.addEventListener('pointerleave', () => hh.style.setProperty('--ro', 0));
    } else { hh.style.setProperty('--ro', .9); kick(); }
  }
  if (matchMedia('(hover:hover)').matches) d.addEventListener('pointermove', (e) => {
    const c = e.target.closest('.bc,.mmc,.fcard'); if (!c) return; const r = c.getBoundingClientRect();
    c.style.setProperty('--mx', (e.clientX - r.left) + 'px'); c.style.setProperty('--my', (e.clientY - r.top) + 'px');
  }, { passive: true });


  /* ---- panel cards: gentle 3D tilt toward the pointer ---- */
  if (matchMedia('(hover:hover)').matches && !reduce) {
    $$('.hs-s,.hs-n,.hs-i,.hs-c').forEach((el) => {
      el.addEventListener('pointermove', (e) => { const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; el.style.setProperty('--ry', (x * 9).toFixed(2) + 'deg'); el.style.setProperty('--rx', (-y * 9).toFixed(2) + 'deg'); }, { passive: true });
      el.addEventListener('pointerleave', () => { el.style.removeProperty('--ry'); el.style.removeProperty('--rx'); });
    });
  }


  /* ---- mobile menu accordion ---- */
  $$('[data-acc]').forEach((acc) => { const tg = $('.sh-tg', acc); const flip = () => { const o = !acc.classList.contains('open'); acc.classList.toggle('open', o); tg.setAttribute('aria-expanded', o); }; tg.addEventListener('click', flip); });

  /* ---- Industries explorer ---- */
  $$('[data-ix]').forEach((ix) => {
    const chips = $$('.ix-chip', ix), cards = $$('.ix-card', ix);
    const pick = (k) => { chips.forEach((c, n) => { c.classList.toggle('on', n === k); c.setAttribute('aria-selected', n === k); }); cards.forEach((c, n) => c.classList.toggle('on', n === k)); };
    chips.forEach((c, k) => {
      c.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') pick(k); });
      c.addEventListener('focus', () => { try { if (c.matches(':focus-visible')) pick(k); } catch (e) {} });
      c.addEventListener('click', (e) => { if (!c.classList.contains('on')) { e.preventDefault(); e.stopImmediatePropagation(); pick(k); c.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' }); } }, true);
    });
  });

  /* ---- Engagement toggle ---- */
  $$('.seg button').forEach((b) => b.addEventListener('click', () => {
    const box = b.closest('.eng'); box.dataset.mode = b.dataset.mode;
    $$('.seg button', box).forEach((x) => x.classList.toggle('on', x === b));
  }));

  /* ---- Header background once scrolled ---- */
  const hdr = $('#hdr');
  if (hdr) { const f = () => hdr.classList.toggle('scrolled', scrollY > 20); addEventListener('scroll', f, { passive: true }); f(); }

  /* ---- Mobile menu sheet ---- */
  const mbs = $$('[data-menu]'), sheet = $('#sheet');
  if (mbs.length && sheet) {
    const set = (v) => {
      sheet.hidden = false;
      requestAnimationFrame(() => sheet.classList.toggle('open', v));
      mbs.forEach((b) => b.setAttribute('aria-expanded', v));
      d.body.style.overflow = v ? 'hidden' : '';
      if (!v) setTimeout(() => { if (!sheet.classList.contains('open')) sheet.hidden = true; }, 350);
    };
    mbs.forEach((b) => b.addEventListener('click', () => set(!sheet.classList.contains('open'))));
    sheet.addEventListener('click', (e) => { if (e.target === sheet || e.target.closest('a')) set(false); });
    addEventListener('keydown', (e) => { if (e.key === 'Escape') set(false); });
  }

  /* ---- FAQ search ---- */
  const fq = $('#fq-q');
  if (fq) fq.addEventListener('input', () => {
    const q = fq.value.trim().toLowerCase(); let any = false;
    $$('[data-chap]').forEach((c) => {
      let n = 0;
      $$('.faq-i', c).forEach((d) => { const hit = !q || d.textContent.toLowerCase().includes(q); d.hidden = !hit; if (hit) n++; if (q && hit) d.open = true; });
      c.hidden = n === 0; if (n) any = true;
    });
    $('#fq-none').hidden = any;
  });

  /* ---- FAQ: one open per group ---- */
  $$('.faq').forEach((g) => g.addEventListener('toggle', (e) => { if (e.target.open) $$('details[open]', g).forEach((o) => { if (o !== e.target) o.open = false; }); }, true));

  /* ---- Hours estimator (optimisation page) ---- */
  const est = $('[data-estimator]');
  if (est) {
    const run = () => {
      const n = +est.n.value || 0, m = +est.m.value || 0, p = +est.p.value / 100;
      const h = n * (m / 60) * 26 * p;
      $('[data-pct]', est).textContent = est.p.value;
      $('[data-out="h"]', est).textContent = Math.round(h).toLocaleString('en-IN');
      $('[data-out="d"]', est).textContent = (h / 8).toFixed(1);
    };
    est.addEventListener('input', run); run();
  }

  /* ---- Contact form → mailto ---- */
  const f = $('#contact-form');
  if (f) {
    const q = new URLSearchParams(location.search).get('industry');
    if (q) {
      const key = q.replace(/[^a-z]/g, '').slice(0, 4);
      const o = [...f.industry.options].find((x) => x.value.toLowerCase().replace(/[^a-z]/g, '').startsWith(key));
      if (o) f.industry.value = o.value;
    }
    f.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!f.name.value.trim() || !f.msg.value.trim()) { (f.name.value.trim() ? f.msg : f.name).focus(); return; }
      const body = `Name: ${f.name.value}\nPhone: ${f.phone.value}\nBusiness: ${f.industry.value}\n\n${f.msg.value}`;
      location.href = `mailto:connect@sarvlekh.in?subject=${encodeURIComponent('Enquiry from ' + f.name.value)}&body=${encodeURIComponent(body)}`;
    });
  }

  const np = $('#np-date');
  if (np) np.textContent = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
})();

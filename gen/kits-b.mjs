// Bespoke hero + signature section per industry (batch B).
const li = (rows) => `<ul class="ws-list">${rows.map(([a, t, s, c]) => `<li><span class="av">${a}</span><b>${t}</b><em class="st ${c}">${s}</em></li>`).join('')}</ul>`;
const head = (tag, h) => `<div class="head-l" data-reveal><span class="tag">${tag}</span><h2>${h}</h2></div>`;
const truck = (c = '#8a4b2a') => `<svg class="truck" viewBox="0 0 220 100" aria-hidden="true"><rect x="6" y="52" width="70" height="26" rx="3" fill="${c}"/><path d="M76 52h36l14 18v8H76Z" fill="#14213d"/><path d="M118 62 150 18l44 14-8 40-60 6Z" fill="#c9ccd2" stroke="#8a93a5" stroke-width="2"/><path d="M130 66l22-32M148 70l22-34M166 66l16-24" stroke="#8a93a5" stroke-width="2"/><circle cx="34" cy="80" r="12" fill="#14213d"/><circle cx="34" cy="80" r="5" fill="#c9ccd2"/><circle cx="100" cy="80" r="12" fill="#14213d"/><circle cx="100" cy="80" r="5" fill="#c9ccd2"/><circle cx="168" cy="80" r="12" fill="#14213d"/><circle cx="168" cy="80" r="5" fill="#c9ccd2"/></svg>`;

export const kitsB = {
  /* ------------------------------------------------ RMC: road + transit mixer + batch board */
  rmc: {
    v: 'splitL',
    hero: () => `<div class="rm-scene"><div class="rm-silo"><i></i><i></i><b>Batch 2041</b></div><div class="rm-road"><div class="truck-run">${truck()}</div></div><div class="rm-board"><div><small>m³ today</small><b data-count="840">0</b></div><div><small>Slump</small><b>110 mm</b></div><div><small>Grade</small><b>M30</b></div></div></div>`,
    sig: () => `<section class="sec"><div class="wrap">${head('Dispatch board', 'Every transit mixer, in order, on one screen.')}<div class="dispatch">${[['TM-07', 'Site: Greenfield Tower', 'On route', 'bl', 62], ['TM-02', 'Site: City Mall', 'Pouring', 'wa', 88], ['TM-11', 'Plant', 'Loading', 'ok', 24], ['TM-05', 'Site: Metro Pillar 9', 'Returning', 'ok', 40]].map(([t, s, st, c, w]) => `<div><b>${t}</b><span>${s}</span><i style="--w:${w}%"></i><em class="st ${c}">${st}</em></div>`).join('')}</div></div></section>`,
  },
  /* ------------------------------------------------ MANUFACTURING: conveyor + OEE gauge */
  manufacturing: {
    v: 'split',
    hero: () => `<div class="mf-line"><div class="belt"><span class="box b1"></span><span class="box b2"></span><span class="box b3"></span><span class="box b4"></span></div><div class="mf-rollers"><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="mf-hud"><div class="gauge"><svg viewBox="0 0 120 70" aria-hidden="true"><path d="M10 62a50 50 0 0 1 100 0" fill="none" stroke="#d9dee6" stroke-width="12"/><path class="gv" d="M10 62a50 50 0 0 1 100 0" fill="none" stroke="#e0661a" stroke-width="12" pathLength="100" stroke-dasharray="78 100"/></svg><b>78%</b><small>OEE</small></div><div class="mf-stat"><small>Work order</small><b>WO-3308</b><em class="st wa">In progress</em></div></div></div>`,
    sig: () => `<section class="sec tint-sec"><div class="wrap">${head('Machine status', 'Know every machine before the shift starts.')}<div class="machines">${[['CNC-01', 'Running', 'ok'], ['CNC-02', 'Running', 'ok'], ['Press-03', 'Maintenance', 'wa'], ['Weld-04', 'Running', 'ok'], ['Paint-05', 'Idle', 'bl'], ['Pack-06', 'Running', 'ok'], ['Lathe-07', 'Breakdown', 'r'], ['QC-08', 'Running', 'ok']].map(([n, s, c]) => `<div class="mc ${c}"><i></i><b>${n}</b><span>${s}</span></div>`).join('')}</div></div></section>`,
  },
  /* ------------------------------------------------ RETAIL: POS terminal + receipt */
  'retail-outlet': {
    v: 'center',
    hero: () => `<div class="rt-pos"><div class="pos"><div class="pos-screen"><small>Counter 2</small>${li([['T', 'T-shirt · M', '₹ 799', 'bl'], ['J', 'Jeans · 32', '₹ 1,999', 'bl'], ['B', 'Belt', '₹ 499', 'bl']])}<div class="pos-total"><span>Total</span><b>₹ 3,297</b></div></div><div class="pos-pad">${Array.from({ length: 9 }, (_, k) => `<i>${k + 1}</i>`).join('')}</div></div><div class="receipt"><b>SARVLEKH STORE</b><p>Bill #8841</p><p>T-shirt ........ 799</p><p>Jeans ........ 1,999</p><p>Belt ........ 499</p><p class="tot">TOTAL 3,297</p><p>Loyalty +33 pts</p></div></div>`,
    sig: () => `<section class="sec"><div class="wrap">${head('Shelf health', 'See what is selling, slowing and about to run out.')}<div class="shelf">${['Tees', 'Denim', 'Shoes', 'Bags', 'Watches', 'Caps', 'Socks', 'Belts'].map((n, k) => `<div class="sh s${[3, 2, 1, 2, 0, 3, 1, 2][k]}"><b>${n}</b><span>${['Fast', 'Steady', 'Low', 'Steady', 'Slow', 'Fast', 'Low', 'Steady'][[3, 2, 1, 2, 0, 3, 1, 2][k] === 3 ? 0 : [3, 2, 1, 2, 0, 3, 1, 2][k] === 2 ? 1 : [3, 2, 1, 2, 0, 3, 1, 2][k] === 1 ? 2 : 3]}</span></div>`).join('')}</div></div></section>`,
  },
  /* ------------------------------------------------ WHOLESALE: godown racks + salesman phone */
  wholesale: {
    v: 'splitL',
    hero: () => `<div class="ws-godown"><div class="racks">${Array.from({ length: 12 }, (_, k) => `<i class="p${[1, 2, 1, 0, 2, 1, 1, 0, 2, 1, 2, 1][k]}"></i>`).join('')}</div><div class="phone"><div class="ph-top"></div><small>New order</small><b>Sharma Traders</b>${li([['R', 'Rice 25 kg ×40', '₹ 52k', 'bl'], ['O', 'Oil 15 L ×12', '₹ 21k', 'bl']])}<span class="ph-btn">Confirm order</span></div></div>`,
    sig: () => `<section class="sec tint-sec"><div class="wrap">${head('Party ledger', 'Credit limits that keep dues in check.')}<div class="party">${[['Sharma Traders', 74, '₹ 3.7L / 5L'], ['Lakshmi Stores', 38, '₹ 0.8L / 2L'], ['Bansal Foods', 96, '₹ 4.8L / 5L'], ['Om Mart', 51, '₹ 1.0L / 2L']].map(([n, w, v]) => `<div><b>${n}</b><i class="${w > 90 ? 'hot' : ''}" style="--w:${w}%"></i><span>${v}</span></div>`).join('')}</div></div></section>`,
  },
  /* ------------------------------------------------ GYM: turnstile + floor count dial */
  gym: {
    v: 'split',
    hero: () => `<div class="gy-scene"><div class="gate"><div class="gate-bar"></div><span class="gate-led"></span><small>Check-in</small><b>Welcome, Rohan</b><em class="st ok">Plan valid · 34 days</em></div><div class="floor"><svg viewBox="0 0 160 160" aria-hidden="true"><circle cx="80" cy="80" r="64" fill="none" stroke="#f1d7d7" stroke-width="16"/><circle class="fv" cx="80" cy="80" r="64" fill="none" stroke="#c42b2b" stroke-width="16" stroke-linecap="round" pathLength="100" stroke-dasharray="64 100" transform="rotate(-90 80 80)"/></svg><b>64</b><small>on the floor</small></div><div class="dumb"><i></i><b></b><i></i></div></div>`,
    sig: () => `<section class="sec"><div class="wrap">${head('This week’s classes', 'Book a slot. Fill every class.')}<div class="classes">${[['06:00', 'Strength', '12/16'], ['07:30', 'HIIT', '16/16'], ['18:00', 'Yoga', '9/20'], ['19:30', 'Spin', '14/18']].map(([t, n, c]) => `<div class="cls"><time>${t}</time><b>${n}</b><span>${c}</span><i style="--w:${(parseInt(c) / parseInt(c.split('/')[1])) * 100}%"></i></div>`).join('')}</div></div></section>`,
  },
  /* ------------------------------------------------ RESTAURANT: KOT ticket rail */
  restaurant: {
    v: 'center',
    hero: () => `<div class="rs-rail"><div class="rail-bar"></div>${[['T4', 'Dine-in', ['2 × Butter chicken', '4 × Naan', '1 × Lassi'], '04:12', 'wa'], ['T9', 'Dine-in', ['1 × Paneer tikka', '2 × Dal makhani'], '02:40', 'ok'], ['#2209', 'Delivery', ['3 × Veg biryani', '1 × Raita'], '07:55', 'r'], ['T2', 'Takeaway', ['2 × Masala dosa'], '01:05', 'ok']].map(([t, ty, it, tm, c], k) => `<div class="kot ${c}" style="--k:${k}"><div class="kot-h"><b>${t}</b><span>${ty}</span></div>${it.map((x) => `<p>${x}</p>`).join('')}<div class="kot-f"><time>${tm}</time></div></div>`).join('')}</div>`,
    sig: () => `<section class="sec tint-sec"><div class="wrap">${head('Floor plan', 'Tables, reservations and bills — one touch.')}<div class="floorplan">${Array.from({ length: 12 }, (_, k) => `<span class="tb t${[1, 0, 2, 1, 1, 0, 3, 1, 0, 2, 1, 0][k]} ${k % 5 === 0 ? 'rd' : ''}">T${k + 1}</span>`).join('')}<div class="fp-leg"><i class="t0"></i>Free<i class="t1"></i>Occupied<i class="t2"></i>Bill requested<i class="t3"></i>Reserved</div></div></div></section>`,
  },
  /* ------------------------------------------------ SHOWROOM: car + callouts + pipeline */
  showroom: {
    v: 'splitL',
    hero: () => `<div class="sr-stage"><svg class="car" viewBox="0 0 420 170" role="img" aria-label="Car outline"><path d="M20 120c0-18 10-28 34-32l50-34c10-8 26-12 52-12h80c24 0 40 6 54 20l30 26c26 2 40 8 40 24v20H20Z" fill="none" stroke="#0b6e99" stroke-width="3"/><path d="M118 88l40-28h108l36 28Z" fill="#e0eff6" stroke="#0b6e99" stroke-width="2"/><circle cx="110" cy="128" r="26" fill="#14213d"/><circle cx="110" cy="128" r="10" fill="#cfd6e2"/><circle cx="326" cy="128" r="26" fill="#14213d"/><circle cx="326" cy="128" r="10" fill="#cfd6e2"/></svg><span class="callout c1">Test drive · Sat 11:00</span><span class="callout c2">Finance approved</span><span class="callout c3">Delivery in 6 days</span></div>`,
    sig: () => `<section class="sec"><div class="wrap">${head('Deal pipeline', 'No lead goes cold. No delivery slips.')}<div class="pipe">${[['New', 14], ['Test drive', 9], ['Quoted', 6], ['Finance', 4], ['Delivered', 3]].map(([n, c], k) => `<div style="--h:${40 + (5 - k) * 12}px"><b>${c}</b><span>${n}</span></div>`).join('')}</div></div></section>`,
  },
  /* ------------------------------------------------ HOTEL: key card + room rack */
  hotel: {
    v: 'split',
    hero: () => `<div class="ht-scene"><div class="keycard"><small>SARVLEKH SUITES</small><b>Room 604</b><span>Check-out · 12:00</span><i></i></div><div class="rack">${Array.from({ length: 20 }, (_, k) => `<span class="rm r${[1, 1, 0, 2, 1, 3, 1, 1, 0, 1, 2, 1, 1, 0, 1, 3, 1, 1, 2, 1][k]}">${400 + k + 1}</span>`).join('')}</div><div class="folio"><b>Folio · 604</b><div><span>Room (2 nights)</span><em>₹ 9,600</em></div><div><span>Restaurant</span><em>₹ 1,240</em></div><div><span>GST</span><em>₹ 1,300</em></div></div></div>`,
    sig: () => `<section class="sec tint-sec"><div class="wrap">${head('Housekeeping board', 'Rooms ready before the guest arrives.')}<div class="hk">${[['Dirty', ['402', '417', '509']], ['Cleaning', ['318', '605']], ['Inspect', ['211']], ['Ready', ['101', '102', '309', '410']]].map(([c, r]) => `<div><b>${c}</b>${r.map((x) => `<span>${x}</span>`).join('')}</div>`).join('')}</div></div></section>`,
  },
  /* ------------------------------------------------ WEIGHBRIDGE: scale + digital display + slip */
  weighbridge: {
    v: 'splitL',
    hero: () => `<div class="wb-scene"><div class="wb-display"><small>NET WEIGHT</small><b>42,380 <em>kg</em></b><div class="wb-row"><span>Gross 58,120</span><span>Tare 15,740</span></div></div><div class="wb-deck">${truck('#475569')}<i></i></div><div class="slip"><b>WEIGHMENT SLIP</b><p>Vehicle MH 12 AB 4821</p><p>Material: Aggregate 20mm</p><p>Net: 42,380 kg</p><span>📷 photo proof saved</span></div></div>`,
    sig: () => `<section class="sec"><div class="wrap">${head('Fraud-proof records', 'Every weighment photographed, locked and logged.')}<div class="proof">${[['MH 12 AB 4821', '42,380 kg', '06:12'], ['GJ 05 CD 7710', '38,950 kg', '06:41'], ['MH 14 EF 3092', '44,100 kg', '07:03']].map(([v, w, t]) => `<div><i></i><b>${v}</b><span>${w}</span><time>${t}</time></div>`).join('')}</div></div></section>`,
  },
  /* ------------------------------------------------ MINES: terraced pit + haul route + tonnage */
  mines: {
    v: 'center',
    hero: () => `<div class="mn-pit"><svg viewBox="0 0 640 260" role="img" aria-label="Terraced open-cast pit with haul road"><path d="M0 40h140l40 36h60l40 36h80l40 36h60l40 36h180v40H0Z" fill="#b8754a"/><path d="M0 40h140l40 36h60l40 36h80l40 36h60l40 36" fill="none" stroke="#7a3d17" stroke-width="3"/><path d="M60 40l120 36M180 76l60 0M240 76l80 36M320 112l80 0M400 112l60 36M460 148l60 0M520 148l40 36" stroke="#e8c9a8" stroke-width="5" stroke-dasharray="10 8" fill="none"/><g class="dump"><rect x="150" y="56" width="34" height="14" rx="2" fill="#14213d"/><circle cx="158" cy="72" r="5" fill="#14213d"/><circle cx="178" cy="72" r="5" fill="#14213d"/></g></svg><div class="mn-tons"><small>Tonnes today</small><b data-count="5400">0</b></div></div>`,
    sig: () => `<section class="sec tint-sec"><div class="wrap">${head('Permits & royalty', 'Dispatch is matched to the permit — royalty computed for you.')}<div class="permit">${[['TP-2041', 'Limestone · 38 t', 'Royalty ₹ 3,420', 'ok'], ['TP-2042', 'Limestone · 41 t', 'Royalty ₹ 3,690', 'ok'], ['TP-2043', 'Aggregate · 36 t', 'Awaiting permit', 'wa']].map(([p, m, r, c]) => `<div><b>${p}</b><span>${m}</span><span>${r}</span><em class="st ${c}">${c === 'ok' ? 'Matched' : 'Check'}</em></div>`).join('')}</div></div></section>`,
  },
};

// Bespoke hero + signature section per industry (batch A). Each kit is its own layout and illustration.
const li = (rows) => `<ul class="ws-list">${rows.map(([a, t, s, c]) => `<li><span class="av">${a}</span><b>${t}</b><em class="st ${c}">${s}</em></li>`).join('')}</ul>`;
const cards = (items) => items.map(([h, p]) => `<article class="sg-c" data-reveal><h3>${h}</h3><p>${p}</p></article>`).join('');
const head = (tag, h) => `<div class="head-l" data-reveal><span class="tag">${tag}</span><h2>${h}</h2></div>`;
const bars = (arr) => arr.map((h, k) => `<i style="--h:${h}%;--k:${k}"></i>`).join('');

export const kitsA = {
  /* ------------------------------------------------ HOSTEL: night building + room board */
  hostel: {
    v: 'split',
    hero: () => `<div class="hs-building" role="img" aria-label="Hostel building with lit windows"><div class="hs-moon"></div>${Array.from({ length: 24 }, (_, k) => `<i class="win ${[1, 4, 6, 9, 11, 14, 15, 19, 21].includes(k) ? 'on' : ''}" style="--k:${k}"></i>`).join('')}<div class="hs-door"></div><div class="hs-pass"><small>Gate pass</small><b>Aarav · Room 214</b><em class="st ok">Entry 9:42 PM</em></div></div>`,
    sig: () => `<section class="sec"><div class="wrap">${head('Room allocation', 'Every bed, every floor — at a glance.')}<div class="roomboard">${['Floor 1', 'Floor 2', 'Floor 3'].map((f, r) => `<div class="rb-row"><b>${f}</b>${Array.from({ length: 8 }, (_, k) => { const s = [0, 1, 1, 0, 2, 1, 1, 0, 1, 1, 3, 1, 0, 1, 1, 1, 1, 2, 1, 0, 1, 1, 0, 1][r * 8 + k]; return `<span class="bed b${s}" title="${['Occupied', 'Occupied', 'Vacant', 'Maintenance'][s]}">${r + 1}0${k + 1}</span>`; }).join('')}</div>`).join('')}<div class="rb-leg"><i class="b0"></i>Occupied<i class="b2"></i>Vacant<i class="b3"></i>Maintenance</div></div></div></section>`,
  },
  /* ------------------------------------------------ PG: key tags + rent ledger */
  pg: {
    v: 'splitL',
    hero: () => `<div class="pg-keys">${['12', '14', '21'].map((r, k) => `<div class="key" style="--k:${k}"><i></i><b>${r}</b><small>${['Paid', 'Due 3d', 'Paid'][k]}</small></div>`).join('')}<div class="pg-ledger"><small>Tenant · Room 12</small><b>Rent ₹ 9,000</b>${li([['U', 'UPI received', 'Today', 'ok'], ['E', 'Electricity share', '₹ 640', 'bl'], ['D', 'Deposit held', '₹ 18,000', 'wa']])}</div></div>`,
    sig: () => `<section class="sec tint-sec"><div class="wrap">${head('Fair utility split', 'Electricity shared by days stayed, not by guesswork.')}<div class="split-bars">${[['Room 12', 84, '₹ 640'], ['Room 14', 62, '₹ 470'], ['Room 21', 91, '₹ 690'], ['Room 22', 48, '₹ 360']].map(([r, w, v]) => `<div><span>${r}</span><i style="--w:${w}%"></i><b>${v}</b></div>`).join('')}</div></div></section>`,
  },
  /* ------------------------------------------------ CLINIC: consult desk, queue token, ECG */
  clinic: {
    v: 'split',
    hero: () => `<div class="cl-desk"><div class="cl-token"><small>Now serving</small><b>14</b><em>Dr. Mehta · Room 2</em></div><div class="cl-rx"><div class="rx-h"><b>℞</b><span>Prescription</span></div><p>Amoxicillin 500 mg — 1-0-1 × 5 days</p><p>Paracetamol 650 mg — SOS</p><p>Follow-up: 7 days</p><span class="rx-sign">Sent on WhatsApp ✓</span></div><svg class="ecg" viewBox="0 0 400 70" aria-hidden="true"><path d="M0 38h70l12-26 18 52 14-42 12 16h40l10-18 14 34 12-16h70l10-8 14 12 12-4h80"/></svg><div class="cl-vitals"><span><small>BP</small><b>118/76</b></span><span><small>Pulse</small><b>72</b></span><span><small>SpO₂</small><b>98%</b></span></div></div>`,
    sig: () => `<section class="sec"><div class="wrap">${head('Patient timeline', 'One record that follows the patient, visit after visit.')}<ol class="cl-time">${[['12 Sep', 'Consultation', 'Fever, sore throat · Rx issued'], ['19 Sep', 'Follow-up', 'Improving · reports attached'], ['03 Oct', 'Lab test', 'CBC result added to record'], ['02 Nov', 'Vaccination', 'Reminder sent · next due Feb']].map(([d, t, x]) => `<li data-reveal><time>${d}</time><b>${t}</b><p>${x}</p></li>`).join('')}</ol></div></section>`,
  },
  /* ------------------------------------------------ MESS: thali plate + menu board */
  mess: {
    v: 'center',
    hero: () => `<div class="ms-wrap"><svg class="thali" viewBox="0 0 220 220" role="img" aria-label="Thali plate with compartments"><circle cx="110" cy="110" r="104" fill="#f6efe0" stroke="#c9b68a" stroke-width="3"/><circle cx="110" cy="110" r="88" fill="none" stroke="#c9b68a" stroke-dasharray="3 5"/><circle cx="72" cy="78" r="30" fill="#e7a13a"/><circle cx="148" cy="78" r="30" fill="#c8531f"/><circle cx="72" cy="146" r="30" fill="#f2d8a0"/><circle cx="148" cy="146" r="30" fill="#8a5a1c"/><circle cx="110" cy="112" r="20" fill="#fff" stroke="#c9b68a"/></svg><div class="menu-board"><b>Today’s menu</b><p>Dal tadka · Jeera rice</p><p>Paneer masala · Roti</p><p>Salad · Curd</p><em class="st ok">1,240 meals planned</em></div></div>`,
    sig: () => `<section class="sec tint-sec"><div class="wrap">${head('Weekly menu board', 'Plan the week. Cook only what will be eaten.')}<div class="week">${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d, k) => `<div class="day"><b>${d}</b><p>${['Poha', 'Upma', 'Idli', 'Paratha', 'Poha', 'Chole', 'Puri'][k]}</p><p>${['Dal rice', 'Rajma', 'Kadhi', 'Chhole', 'Sambar', 'Biryani', 'Thali'][k]}</p><small>${[610, 640, 580, 620, 600, 700, 540][k]} meals</small></div>`).join('')}</div></div></section>`,
  },
  /* ------------------------------------------------ LAUNDRY: washer + tags */
  laundry: {
    v: 'splitL',
    hero: () => `<div class="ld-wrap"><div class="washer"><div class="w-top"><i></i><i></i><b></b></div><div class="w-door"><div class="w-swirl"></div></div></div><div class="ld-tags">${['SK-2041 · Shirts ×6', 'SK-2042 · Duvet ×1', 'SK-2043 · Suit ×2'].map((t, k) => `<span class="gtag" style="--k:${k}"><i></i>${t}</span>`).join('')}</div></div>`,
    sig: () => `<section class="sec"><div class="wrap">${head('Order tracker', 'Customers see the moment their clothes move.')}<ol class="track">${['Received', 'Washing', 'Ironing', 'Ready', 'Delivered'].map((s, k) => `<li class="${k < 3 ? 'done' : k === 3 ? 'now' : ''}" data-reveal><i>${k + 1}</i><b>${s}</b></li>`).join('')}</ol></div></section>`,
  },
  /* ------------------------------------------------ SCHOOL: chalkboard + report card */
  school: {
    v: 'split',
    hero: () => `<div class="sc-board"><div class="chalk"><p>Class 8-B · Attendance</p><h4>38 / 40 present</h4><p class="sums">12 × 8 = 96</p></div><div class="sc-tray"><i></i><i></i></div><div class="sc-card"><small>Report card</small><b>Term 2</b>${li([['M', 'Mathematics', 'A1', 'ok'], ['S', 'Science', 'A2', 'ok'], ['E', 'English', 'B1', 'bl']])}</div></div>`,
    sig: () => `<section class="sec tint-sec"><div class="wrap">${head('Timetable', 'Clash-free periods, substitutions in one tap.')}<div class="ttable"><span></span>${['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((d) => `<b>${d}</b>`).join('')}${['Maths', 'English', 'Science', 'Hindi', 'Art'].map((s, r) => `<b>P${r + 1}</b>${Array.from({ length: 5 }, (_, c) => `<span class="slot s${(r + c) % 5}">${['Maths', 'English', 'Science', 'Hindi', 'Art'][(r + c) % 5]}</span>`).join('')}`).join('')}</div></div></section>`,
  },
  /* ------------------------------------------------ COACHING: leaderboard + score chart */
  coaching: {
    v: 'splitL',
    hero: () => `<div class="co-board"><div class="lb"><small>Mock test 14 · Top ranks</small>${[['1', 'Ananya S.', 642], ['2', 'Rohit K.', 631], ['3', 'Meera J.', 628], ['4', 'Kabir P.', 615]].map(([r, n, s]) => `<div class="lbrow r${r}"><i>${r}</i><b>${n}</b><span>${s}</span></div>`).join('')}</div><div class="co-chart"><small>Batch average</small><div class="ws-chart">${bars([42, 50, 48, 61, 66, 72, 78])}</div></div></div>`,
    sig: () => `<section class="sec"><div class="wrap">${head('Admission funnel', 'Every enquiry followed up until it becomes a seat.')}<div class="funnel">${[['Enquiries', 100], ['Counselled', 72], ['Demo class', 51], ['Admitted', 34]].map(([n, w]) => `<div style="--w:${w}%"><span>${n}</span></div>`).join('')}</div><p class="tiny">Illustrative funnel.</p></div></section>`,
  },
  /* ------------------------------------------------ MEDIA HOUSE: newspaper front page + TV anchor studio */
  'media-house': {
    v: 'media',
    hero: () => `<div class="mh-stage"><article class="mh-paper"><div class="mh-mast"><span>VOL. XII</span><b>THE DAILY RECORD</b><span>₹ 5</span></div><h4>City approves new metro line; work to begin next quarter</h4><div class="mh-cols"><p>Officials confirmed the plan on Monday after months of consultation with residents and traders…</p><p>The corridor will connect eleven stations and is expected to ease daily commutes for lakhs of passengers…</p><i class="mh-img"></i></div><div class="mh-tag">Filed 6:42 AM · Edited · Approved</div></article>
<div class="mh-tv"><div class="tv-screen"><span class="tv-live"><i></i>LIVE</span><svg class="anchor" viewBox="0 0 160 170" aria-hidden="true"><rect x="0" y="120" width="160" height="50" fill="#1a2744"/><circle cx="80" cy="52" r="26" fill="#e6b99a"/><path d="M52 44c4-26 52-26 56 0-10-10-46-10-56 0Z" fill="#2a1d17"/><path d="M28 170c0-34 18-54 52-54s52 20 52 54Z" fill="#c0314f"/><path d="M66 118l14 22 14-22Z" fill="#f7f0e0"/></svg><div class="lower"><b>BREAKING</b><span>Metro line approved · construction to begin</span></div></div><div class="tv-ticker"><div><span>• Markets close higher •</span><span>• Rain alert for coastal districts •</span><span>• Council passes budget •</span><span>• Markets close higher •</span><span>• Rain alert for coastal districts •</span></div></div></div></div>`,
    sig: () => `<section class="sec mh-sec"><div class="wrap">${head('The newsroom board', 'From pitch to publish — every story in its place.')}<div class="newsboard">${[['Pitched', [['Metro line explainer', 'Ravi'], ['School fees audit', 'Neha']]], ['Writing', [['Monsoon preparedness', 'Imran'], ['Budget live blog', 'Kavya']]], ['Edit & approve', [['Port expansion', 'Sana']]], ['Published', [['Market wrap', 'Dev'], ['Local polls', 'Anil']]]].map(([c, it]) => `<div class="nb-col"><b>${c}<em>${it.length}</em></b>${it.map(([t, w]) => `<div class="nb-card"><p>${t}</p><span>${w}</span></div>`).join('')}</div>`).join('')}</div></div></section><section class="sec mh-sec dark-sec"><div class="wrap"><div class="rundown"><h3>Tonight’s rundown</h3>${[['18:00', 'Headlines', 'Studio A'], ['18:04', 'Metro line — package', 'VT 02'], ['18:09', 'Budget — live crossing', 'OB van'], ['18:15', 'Weather', 'Studio A']].map(([t, a, b]) => `<div><time>${t}</time><b>${a}</b><span>${b}</span></div>`).join('')}</div></div></section>`,
  },
  /* ------------------------------------------------ FINANCE: EMI schedule + portfolio aging */
  finance: {
    v: 'center',
    hero: () => `<div class="fn-desk"><div class="fn-loan"><small>Loan #LN-2041 · ₹ 2,00,000</small><b>EMI ₹ 18,450</b><div class="emi">${Array.from({ length: 12 }, (_, k) => `<i class="${k < 5 ? 'paid' : k === 5 ? 'due' : ''}">${k + 1}</i>`).join('')}</div></div><div class="fn-aging"><small>Portfolio at risk</small>${[['Current', 82, 'ok'], ['1–30 d', 11, 'bl'], ['31–60 d', 5, 'wa'], ['60+ d', 2, 'r']].map(([n, w, c]) => `<div><span>${n}</span><i class="${c}" style="--w:${w}%"></i><b>${w}%</b></div>`).join('')}</div></div>`,
    sig: () => `<section class="sec tint-sec"><div class="wrap">${head('Field collections', 'Collectors know the route, the amount and the receipt.')}<div class="route-list">${[['09:10', 'Sharma Traders', '₹ 4,200', 'ok'], ['10:05', 'Lakshmi Stores', '₹ 2,800', 'ok'], ['11:30', 'Bansal Foods', '₹ 6,500', 'wa'], ['12:45', 'Kumar & Sons', '₹ 3,100', 'bl']].map(([t, n, a, c]) => `<div><time>${t}</time><b>${n}</b><span>${a}</span><em class="st ${c}">${{ ok: 'Collected', wa: 'Pending', bl: 'Next' }[c]}</em></div>`).join('')}</div></div></section>`,
  },
  /* ------------------------------------------------ TALLY & ACCOUNTING: voucher screen + GST match */
  'tally-accounting': {
    v: 'splitL',
    hero: () => `<div class="ta-screen"><div class="ta-bar"><b>Accounting Voucher Creation</b><span>Sales · No. 1042</span></div><table><thead><tr><th>Particulars</th><th>Dr</th><th>Cr</th></tr></thead><tbody><tr><td>Sharma Traders</td><td>21,830.00</td><td></td></tr><tr><td class="in">Sales — Goods</td><td></td><td>18,500.00</td></tr><tr><td class="in">Output CGST 9%</td><td></td><td>1,665.00</td></tr><tr><td class="in">Output SGST 9%</td><td></td><td>1,665.00</td></tr></tbody><tfoot><tr><td>Total</td><td>21,830.00</td><td>21,830.00</td></tr></tfoot></table><div class="ta-sync">✓ Synced from billing · no re-typing</div></div>`,
    sig: () => `<section class="sec"><div class="wrap">${head('GST reconciliation', 'Purchase register against the auto-generated statement.')}<div class="recon">${[['Fresh Foods Pvt', '₹ 11,420', 'Matched', 'ok'], ['Metro Hardware', '₹ 6,840', 'Matched', 'ok'], ['City Packaging', '₹ 3,150', 'Mismatch', 'r'], ['Om Stationers', '₹ 890', 'Awaiting supplier', 'wa']].map(([n, a, s, c]) => `<div><b>${n}</b><span>${a}</span><em class="st ${c === 'r' ? 'wa' : c}">${s}</em></div>`).join('')}</div></div></section>`,
  },
};

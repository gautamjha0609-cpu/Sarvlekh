export const SITE = {
  url: 'https://sarvlekh.in',
  name: 'Sarvlekh',
  email: 'connect@sarvlekh.in',
  tagline: 'Business systems studio for every kind of business',
  updated: '2026-11-02',
};

export const services = [
  {
    slug: 'business-software', name: 'Custom Business Software', icon: 'factory', theme: ['#f0c36a', '#ff8f4a', '#0d0a05'],
    tag: 'We build the system that builds your system.',
    title: 'Custom Business Software & ERP Development in India | Sarvlekh',
    desc: 'Sarvlekh designs custom ERP, mobile apps, dashboards and integrations (Tally, GST, UPI, WhatsApp, biometrics) for hostels, clinics, plants, stores and more.',
    lede: 'One connected platform with the modules your business actually needs — shaped around your workflow, not the other way round.',
    features: ['Custom ERP & workflows|Modules for operations, inventory, HR, sales and service — configured to how you work.', 'Mobile apps for teams|Phone-first apps for staff, field teams, customers and parents.', 'Integrations|Tally, GST, UPI, WhatsApp, SMS, biometrics, GPS, weighbridges and payment gateways.', 'Dashboards & analytics|Live owner views of money, stock, people and performance.', 'Roles & security|Role-based access, audit logs, encryption and backups.', 'AI assistants|Practical automation: reminders, summaries, document capture and forecasting.'],
    faqs: [['How long does custom business software take to build?', 'A focused first release usually goes live in weeks, not months. We start with the modules that save the most time, then expand in stages.'], ['Do I own the software and data?', 'Your data is always yours and exportable. Ownership and licensing terms are agreed clearly before we begin.'], ['Can you connect to the tools we already use?', 'Yes. We integrate with Tally, GST systems, UPI/payment gateways, WhatsApp, biometrics and more.']],
  },
  {
    slug: 'accounting', name: 'Accounting & Compliance', icon: 'calc', theme: ['#ffc94a', '#3ee08f', '#0e0c03'],
    tag: 'Books that are always ready, returns that are always on time.',
    title: 'Accounting, Tally, GST & Payroll Services in India | Sarvlekh',
    desc: 'Sarvlekh offers bookkeeping, Tally accounting, GST return preparation, TDS, payroll, bank reconciliation and MIS — connected to your operations software.',
    lede: 'Bookkeeping, Tally, GST, TDS and payroll handled by people who also understand your operations software.',
    features: ['Bookkeeping & Tally|Daily entries, ledgers and month-end closing done for you.', 'GST & e-invoicing|Return preparation, reconciliation and e-way bill support.', 'TDS & payroll|PF, ESI, PT, TDS and payslips with statutory reports.', 'Bank reconciliation|Statement matching with an exception-only review.', 'MIS & budgets|P&L, cash flow and budget-vs-actual by branch or project.', 'Audit support|Clean trails and schedules so audits stay calm.'],
    faqs: [['Can Sarvlekh maintain our books in Tally?', 'Yes. Our accountants maintain books in Tally Prime and keep them in sync with your operations software.'], ['Do you file GST returns?', 'We prepare and reconcile GST returns and support filing workflows; final filing follows your authorisation.'], ['Can you run payroll for small teams?', 'Yes. Payroll, statutory compliance and payslips are included for teams of any size.']],
  },
  {
    slug: 'business-optimisation', name: 'Business Optimisation', icon: 'chart', theme: ['#6bf0c8', '#6ea8ff', '#05120f'],
    tag: 'Save worker-hours. Lift margins. Keep your sanity.',
    title: 'Business Process Optimisation & Automation in India | Sarvlekh',
    desc: 'Sarvlekh maps your workflows, removes repetitive work and automates approvals, reminders and reports — saving labour hours and cutting leakage.',
    lede: 'We watch how your business really runs, remove the repetitive work and give hours back to your people.',
    features: ['Workflow mapping|We trace every handoff and find where time and money leak.', 'Labour-hour reduction|Automate entries, reports, reminders and approvals.', 'SOPs & checklists|Make the best way the default way — on every shift.', 'KPI dashboards|A few numbers that matter, refreshed live.', 'Training & rollout|Hands-on onboarding so teams adopt, not resist.', 'Continuous improvement|Monthly reviews that keep compounding gains.'],
    faqs: [['How does Sarvlekh save labour hours?', 'We map workflows, then automate repetitive entries, reminders, reports and approvals so staff spend time on work that needs judgement.'], ['Will my team resist the change?', 'We design for the least-technical user and train on the floor, so adoption is quick.'], ['Where do we start?', 'Start with a short discovery conversation. We identify the one or two workflows where automation pays back fastest.']],
  },
];

export const homeFaqs = [
  ['What is Sarvlekh?', 'Sarvlekh is a premium business systems studio. We design the software, accounting and operating systems that run hostels, clinics, schools, plants, stores, hotels and 20+ other kinds of business — all connected in one place.'],
  ['What does the name Sarvlekh mean?', 'Sarvlekh comes from Sanskrit: "sarva" means all and "lekh" means record or writing. It means the record of everything — the promise that every part of your business is written down clearly and kept in order.'],
  ['Which businesses does Sarvlekh serve?', 'We serve hostels, PGs, clinics, messes, laundries, schools, coaching institutes, media houses, finance companies, Tally and accounting firms, RMC plants, manufacturing plants, retail stores, wholesalers, gyms, restaurants, showrooms, hotels, weighbridges and mines — and many more on request.'],
  ['What does "a system that makes a system" mean?', 'We do not hand you a fixed product. We build a flexible core platform, then shape modules, workflows and reports around how your business actually works, so the system grows when your business grows.'],
  ['Does Sarvlekh also provide accounting services?', 'Yes. Along with software we offer bookkeeping, Tally, GST, TDS, payroll and MIS services, connected to your operations so entries are made once.'],
  ['How does Sarvlekh reduce labour and worker hours?', 'By replacing manual registers, repeated entries, phone-call coordination and month-end scrambles with automated workflows, reminders and live dashboards.'],
  ['Is Sarvlekh software mobile friendly?', 'Yes. Every Sarvlekh system is designed phone-first, with separate mobile layouts and apps for staff, customers, parents and field teams.'],
  ['How do I start working with Sarvlekh?', 'Email connect@sarvlekh.in with a few lines about your business. We will set up a discovery conversation, map your workflows and propose a clear first release.'],
];

export const faqGroups = [
  ['About Sarvlekh', homeFaqs.slice(0, 3).concat([['Is Sarvlekh a premium service?', 'Yes. We work with a limited number of businesses at a time and give each one close attention, tailored design and long-term support rather than a one-size-fits-all package.']])],
  ['Services & how we work', [homeFaqs[3], homeFaqs[4], homeFaqs[5], ['How long does implementation take?', 'A focused first release typically goes live in weeks. We start with the modules that remove the most manual work, then expand in stages without disrupting daily operations.'], ['Can you migrate our existing data?', 'Yes. We import data from spreadsheets, Tally and older software, validate it with you and keep a rollback copy.']]],
  ['Technology & security', [homeFaqs[6], ['Is our business data secure?', 'Data is encrypted in transit and at rest, access is role-based and every sensitive action is logged. Backups run automatically.'], ['Does the system work offline?', 'Field-facing apps such as billing, orders and weighment work offline and sync automatically when the connection returns.'], ['Which tools can Sarvlekh integrate with?', 'Tally, GST systems, UPI and payment gateways, WhatsApp, SMS, email, biometric devices, GPS, barcode scanners and weighbridge indicators, among others.']]],
  ['Getting started', [homeFaqs[7], ['What happens in the first conversation?', 'We listen first. In a short discovery call we learn how your business runs, where time is lost and what a calm version would look like — then we share a clear scope and timeline.'], ['Do you support us after launch?', 'Yes. Every engagement includes onboarding, training and ongoing support, with optional monthly improvement reviews.']]],
];

export const nav = [
  ['Industries', '/industries/'],
  ['Services', '/services/'],
  ['Blog', '/blog/'],
  ['Our Story', '/about/'],
  ['FAQ', '/faq/'],
];

export const glossary = {
  name: 'Sarvlekh (सर्वलेख)',
  meaning: 'Sanskrit: sarva = all, lekh = record / writing — "the record of everything".',
};

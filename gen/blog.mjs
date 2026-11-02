// Blog posts. Body syntax: "## Heading", "- bullet", blank-line separated paragraphs.
export const postDate = '2026-11-02';
export const posts = [
  { slug: 'why-spreadsheets-stop-working', service: 'business-software', title: 'Why spreadsheets stop working at your fifth branch', desc: 'Spreadsheets are a great start. Here is how to recognise the moment they begin costing more than they save, and what to do next.', mins: 4,
    body: `Almost every business starts on spreadsheets, and that is fine. They are fast, familiar and free. The trouble is not the tool. It is the moment the business outgrows the person who holds the spreadsheet together.

## The five warning signs
- Two people have two different "latest" versions.
- A number is typed into more than one sheet.
- Month-end takes days because everything must be reconciled by hand.
- Only one person knows how the formulas work.
- You find out about a problem after it has already cost money.

## What actually breaks
Spreadsheets have no roles, no history and no workflow. They cannot say who changed a figure, cannot stop an unapproved discount and cannot remind anyone of anything. As branches multiply, the owner becomes the integration layer: the person who carries information between sheets.

## What to do instead
You do not need to replace everything at once. Start with the single process that hurts most — rent collection, dispatch, billing or attendance — and move it into one shared system with roles and an audit trail. Keep the rest where it is until it earns its move.

## A simple test
If a new employee could not run today's work from a screen without asking anyone, the knowledge lives in people instead of the system. That is the moment to build one.` },
  { slug: 'erp-vs-custom-business-software', service: 'business-software', title: 'ERP or custom business software: how to choose', desc: 'A plain-language comparison of packaged ERP and tailored software, and the questions that decide which one fits your business.', mins: 5,
    body: `Packaged ERP and custom software are not rivals. They solve different problems, and many good systems are a mix of both.

## When packaged ERP fits
If your processes look like most businesses in your category, a packaged ERP gives you years of accumulated design for free. Open-source platforms such as ERPNext and Odoo are respected examples and are worth studying even if you never use them.

## When tailored software fits
Tailoring pays off when your workflow is the thing that makes you different: unusual billing rules, local compliance, hardware such as weighbridges or biometric devices, or a team that should not need training in a foreign vocabulary.

## Questions that decide it
- How many of your daily steps would you have to change to fit the package?
- Who will maintain the system in two years?
- Do you need devices, offline use or local-language screens?
- How quickly must the first module go live?

## The middle path
Most of our work sits here: a solid core, then modules shaped around your workflow. You get proven foundations without bending the business to the software.` },
  { slug: 'phone-first-shop-floor-software', service: 'business-software', title: 'What "phone-first" really means for shop-floor software', desc: 'Designing for the phone is not shrinking a desktop screen. It changes how work is captured, approved and trusted.', mins: 4,
    body: `Many systems are called mobile-friendly because they shrink. Phone-first means the opposite: the phone is where the work happens, and the desktop is the summary.

## Capture at the moment of work
A warden marking attendance, a driver confirming delivery or a nurse recording vitals should finish in seconds, with one thumb, in poor light and patchy signal. That means big targets, few fields and sensible defaults.

## Offline is a feature, not an edge case
Field apps should keep working without a connection and sync quietly when signal returns. Nothing should be lost because a basement had no coverage.

## Approvals in a tap
Owners rarely sit at desks. A good system sends the decision to them — with the facts on one screen — and lets them approve or reject immediately.

## Designing for the least technical user
Test every screen with the person who is least comfortable with software on your floor. If they can finish the task without help, everyone can.` },
  { slug: 'month-end-close-checklist', service: 'accounting', title: 'A practical month-end close checklist for small businesses', desc: 'Six steps that turn month-end from a scramble into a routine, so your books are ready in days instead of weeks.', mins: 4,
    body: `A fast close is not about working harder at month-end. It is about doing small things every day so that month-end is only verification.

## The six steps
- Import and match bank statements.
- Verify sales and purchase vouchers against source documents.
- Reconcile GST input credit with the auto-generated statement.
- Post payroll and statutory dues.
- Age receivables and payables and chase the oldest.
- Review the profit and loss and cash-flow summary with the owner.

## Make it daily, not monthly
Match the bank weekly. Post vouchers the day they happen. Keep a shared folder where bills are photographed on arrival. These habits remove most of the month-end work before it starts.

## Use a fixed calendar
Assign each step a day. When everyone knows that bank matching ends on the 2nd and GST reconciliation on the 5th, nothing waits for a reminder.

## What good looks like
Books ready by the third working day, exceptions listed on one page, and an owner who reads the numbers instead of chasing them.` },
  { slug: 'gst-input-credit-mismatches', service: 'accounting', title: 'GST input credit mismatches: why they happen and how to prevent them', desc: 'Most mismatches come from a handful of repeatable causes. Here is how to find them early rather than at filing time.', mins: 4,
    body: `Input tax credit problems rarely appear suddenly. They accumulate quietly over a month and surface when returns are prepared.

## Common causes
- A supplier has not filed or has filed late.
- An invoice was recorded with a wrong GSTIN, date or amount.
- A purchase bill reached accounts after the cut-off.
- The same invoice was booked twice, or not at all.

## Reconcile monthly, not at filing
Compare your purchase register with the auto-generated GST statement every month. Differences are far easier to resolve while the transaction is fresh and the supplier remembers it.

## Keep a supplier follow-up list
Maintain a short list of unmatched invoices with the supplier, amount and date raised. Review it weekly.

## Let software do the matching
When purchase entries come from the same system that handles stock and payments, many errors never occur, and matching becomes an exception report instead of a manual hunt. Always confirm current rules and due dates against official notifications.` },
  { slug: 'tally-integration-removes-double-entry', service: 'accounting', title: 'How Tally integration removes double entry', desc: 'Entering a sale twice — once in operations, once in accounts — is the most common source of errors. Integration ends it.', mins: 3,
    body: `Ask a small business where mistakes begin and the answer is often the same: a transaction recorded in one place, then re-typed into another.

## The usual pattern
Billing happens in one tool, stock in another and accounts in Tally. Someone copies totals across at the end of the day, or the week. Each copy is a chance for a typo, a missed entry or a timing difference.

## What integration changes
When a sale, purchase, receipt or payment is captured once in the operations system, a matching voucher is created in Tally automatically. Ledgers stay current, reports are always fresh and accountants review instead of retype.

## What stays under control
Integration does not remove oversight. Vouchers can be reviewed before posting, rules decide which ledger each item hits, and every posting is traceable back to its source.

## Where to start
Begin with sales and receipts, because they are frequent and simple. Add purchases and payments once the mapping is proven.` },
  { slug: 'six-places-working-hours-leak', service: 'business-optimisation', title: 'The six places working hours leak out of a business', desc: 'Re-typing, chasing, waiting, searching, reporting and reconciling quietly consume hours every day. Here is how to spot each one.', mins: 4,
    body: `Lost time rarely looks like lost time. It looks like normal work. These six leaks are where we usually find it.

## 1. Re-typing
The same figure entered into a register, a sheet and a software. Every duplicate entry is time and an opportunity for error.

## 2. Chasing
Phone calls and messages to find out whether something happened. If status requires a conversation, it is not visible.

## 3. Waiting
Approvals stuck with one person, or work paused until someone returns. Waiting rarely shows up on any report.

## 4. Searching
Hunting for a bill, a contract or a record. Anything that takes more than a minute to find is effectively missing.

## 5. Reporting
Hours spent assembling weekly numbers that a system could produce on its own.

## 6. Reconciling
Matching stock, cash or bank lines by hand, because two sources never agree.

## Where to begin
Ask each team how many minutes a day they spend on each leak. The totals are usually a surprise.` },
  { slug: 'map-a-workflow-in-one-afternoon', service: 'business-optimisation', title: 'How to map a workflow in one afternoon', desc: 'You do not need consultants to see where a process wastes effort. A pen, a wall and the people who do the work are enough.', mins: 4,
    body: `The best process maps are drawn by the people who do the work, not by those who imagine it.

## Set up
Pick one process — say, a customer order from enquiry to payment. Gather the people who touch it. Use sticky notes and a long wall or table.

## Walk it step by step
Write each step on a note, in order. Mark every handoff between people and every wait. Add where information is typed again.

## Count what hurts
For each step note roughly how long it takes and how often it goes wrong. Circle the ones that make people groan.

## Ask three questions
- Does this step need to exist?
- Could it happen at the same time as another?
- Could it happen automatically?

## Choose one change
Resist redesigning everything. Pick the single change that removes the most wait or re-typing and try it for two weeks. Measure, keep what works and repeat.` },
  { slug: 'automate-reminders-first', service: 'business-optimisation', title: 'Automate reminders first: the smallest change with the biggest payoff', desc: 'If you could automate one thing tomorrow, make it reminders. They save hours, improve cash flow and need almost no training.', mins: 3,
    body: `Many automation projects start with something ambitious. The best ones start with reminders.

## Why reminders work
Most delays are not caused by refusal but by forgetting. A gentle, timely nudge turns a late payment, a missing document or a pending approval into a completed one.

## Where to use them
- Rent, fees and invoices before and after the due date.
- Pending approvals, sent to the approver with the details attached.
- Renewals, services and compliance dates.
- Appointment and delivery confirmations.

## Keep the tone human
Short, polite and specific. Include the amount, date and a way to act with one tap.

## Measure the result
Track how many days earlier payments arrive and how many hours the team no longer spends chasing. Those two numbers usually justify the next step on their own.` },
];
export const postBySlug = Object.fromEntries(posts.map((p) => [p.slug, p]));

/* ============================================================
   VOLTIQ — mock data (team electrical contractor)
   ~14 electricians + van fleet. LEGION OS is the command centre.
   ============================================================ */

export const brand = {
  name: "VOLTIQ",
  suffix: "Electrical",
  tagline: "Command Centre",
  director: { name: "Priya Raman", initials: "PR", role: "Operations Director", region: "Bristol & Bath" },
  cert: "NICEIC · 14 engineers · 9 vans",
};

/* ---------------- Command briefing ---------------- */
export const command = {
  date: "Tuesday, 29 July",
  headline: "9 crews out, 1 emergency in play, cash flow ahead of plan.",
  weather: "17°C · rain from 14:00 (2 outdoor jobs flagged)",
};

export const kpis = {
  revenueMonth: 214800,
  revenueTarget: 240000,
  revenueSpark: [148, 162, 155, 178, 171, 189, 196, 205, 208, 215],
  jobsActive: 37,
  jobsToday: 19,
  crewsOut: 9,
  utilisation: 84,
  outstanding: 62400,
  overdue: 18900,
  quotesOpen: 22,
  quotesValue: 168500,
  winRate: 58,
  slaOnTime: 96,
};

/* ---------------- Technicians / crews ---------------- */
export type Tech = {
  id: string; name: string; initials: string; role: string; status: "On job" | "In transit" | "Idle" | "Off" | "Alert";
  job?: string; place: string; skills: string[]; util: number; jobsToday: number; van: string;
  x: number; y: number; kind: "job" | "transit" | "alert" | "idle"; eta?: string;
};
export const techs: Tech[] = [
  { id: "T1", name: "Marcus Webb", initials: "MW", role: "Senior · Team lead", status: "On job", job: "Office fit-out — 2nd fix", place: "Temple Quay", skills: ["Commercial", "3-phase", "Testing"], util: 92, jobsToday: 3, van: "VN-01", x: 50, y: 28, kind: "job" },
  { id: "T2", name: "Aisha Khan", initials: "AK", role: "Approved electrician", status: "On job", job: "EICR — retail unit", place: "Cabot Circus", skills: ["EICR", "Retail", "Fire alarm"], util: 88, jobsToday: 4, van: "VN-02", x: 71, y: 24, kind: "job" },
  { id: "T3", name: "Liam Doyle", initials: "LD", role: "Approved electrician", status: "Alert", job: "Fault — power loss, whole floor", place: "Redcliffe", skills: ["Fault find", "Commercial"], util: 95, jobsToday: 2, van: "VN-03", x: 52, y: 58, kind: "alert", eta: "on site" },
  { id: "T4", name: "Sofia Marchetti", initials: "SM", role: "Approved electrician", status: "In transit", job: "→ EV charger install", place: "A4 towards Bath", skills: ["EV", "Renewables"], util: 79, jobsToday: 5, van: "VN-04", x: 74, y: 66, kind: "transit", eta: "12 min" },
  { id: "T5", name: "Tom Fisher", initials: "TF", role: "Electrician", status: "On job", job: "Rewire — HMO", place: "Gloucester Rd", skills: ["Domestic", "Rewire"], util: 84, jobsToday: 2, van: "VN-05", x: 40, y: 20, kind: "job" },
  { id: "T6", name: "Grace Bello", initials: "GB", role: "Electrician", status: "On job", job: "Consumer units x3", place: "Knowle", skills: ["Domestic", "Landlord"], util: 81, jobsToday: 4, van: "VN-06", x: 60, y: 74, kind: "job" },
  { id: "T7", name: "Callum Reid", initials: "CR", role: "Approved electrician", status: "In transit", job: "→ Emergency assist", place: "Redcliffe approach", skills: ["Fault find", "3-phase"], util: 90, jobsToday: 3, van: "VN-07", x: 42, y: 52, kind: "transit", eta: "6 min" },
  { id: "T8", name: "Nadia Osei", initials: "NO", role: "Apprentice (Yr 3)", status: "On job", job: "Assisting — office fit-out", place: "Temple Quay", skills: ["Domestic", "Testing"], util: 76, jobsToday: 3, van: "VN-01", x: 37, y: 43, kind: "job" },
  { id: "T9", name: "Ben Sutcliffe", initials: "BS", role: "Electrician", status: "Idle", job: "Between jobs", place: "Depot — Bedminster", skills: ["Domestic", "Solar"], util: 62, jobsToday: 2, van: "VN-08", x: 34, y: 78, kind: "idle" },
];

/* ---------------- Live dispatch feed ---------------- */
export const dispatch = [
  { t: "Emergency: power loss, whole floor — Redcliffe office", meta: "Liam on site, Callum en route (6 min)", tone: "co", when: "now" },
  { t: "Sofia dispatched to EV install, Bath", meta: "Coordinator re-routed to save 18 min", tone: "c", when: "3 min ago" },
  { t: "Marcus confirmed office fit-out on schedule", meta: "2nd fix complete by 16:00", tone: "b", when: "20 min ago" },
  { t: "Ben idle at depot — 2 unassigned jobs nearby", meta: "Coordinator suggests Knowle CU swap", tone: "y", when: "25 min ago" },
];

/* ---------------- Projects (multi, 8 stages) ---------------- */
export type Project = { id: string; name: string; client: string; value: number; stage: number; stageName: string; crew: string[]; due: string; health: "g" | "y" | "r"; progress: number };
export const projects: Project[] = [
  { id: "P-118", name: "Temple Quay office fit-out", client: "Meridian Workspace", value: 84000, stage: 6, stageName: "Execution", crew: ["MW", "NO"], due: "12 Aug", health: "g", progress: 68 },
  { id: "P-116", name: "HMO rewire — 8 bed", client: "Aventine Property", value: 26500, stage: 6, stageName: "Execution", crew: ["TF"], due: "5 Aug", health: "y", progress: 54 },
  { id: "P-121", name: "Retail unit EICR + remedials", client: "Cabot Circus Mgmt", value: 12800, stage: 4, stageName: "Quotation", crew: ["AK"], due: "18 Aug", health: "g", progress: 40 },
  { id: "P-109", name: "Warehouse 3-phase upgrade", client: "Severn Logistics", value: 68000, stage: 5, stageName: "Planning", crew: ["MW", "CR"], due: "26 Aug", health: "y", progress: 32 },
  { id: "P-123", name: "EV charger rollout — 14 bays", client: "Bath Park & Ride", value: 41200, stage: 3, stageName: "Site visit", crew: ["SM"], due: "2 Sep", health: "g", progress: 22 },
  { id: "P-104", name: "Care home fire + emergency lighting", client: "Rosewood Care", value: 53400, stage: 7, stageName: "Completion", crew: ["AK", "GB"], due: "1 Aug", health: "r", progress: 88 },
];

export const stageCounts = [
  { idx: 1, name: "Contact", n: 6 }, { idx: 2, name: "Qualify", n: 4 }, { idx: 3, name: "Site visit", n: 3 },
  { idx: 4, name: "Quotation", n: 5 }, { idx: 5, name: "Planning", n: 4 }, { idx: 6, name: "Execution", n: 8 },
  { idx: 7, name: "Completion", n: 4 }, { idx: 8, name: "Payment", n: 3 },
];

/* ---------------- Planning board ---------------- */
export const days = ["Mon 28", "Tue 29", "Wed 30", "Thu 31", "Fri 1"];
export type PlanJob = { c: string; t: string; sub: string };
export const planning: { crew: string; initials: string; role: string; cells: (PlanJob | null)[] }[] = [
  { crew: "Marcus Webb", initials: "MW", role: "Team lead", cells: [
    { c: "var(--cobalt)", t: "Office fit-out", sub: "Temple Quay" }, { c: "var(--cobalt)", t: "Office fit-out", sub: "Temple Quay" },
    { c: "var(--cobalt)", t: "Office fit-out", sub: "Temple Quay" }, { c: "var(--cyan)", t: "Warehouse survey", sub: "Severn Log." }, null ]},
  { crew: "Aisha Khan", initials: "AK", role: "Approved", cells: [
    { c: "var(--warn)", t: "EICR retail", sub: "Cabot Circus" }, { c: "var(--warn)", t: "EICR retail", sub: "Cabot Circus" },
    { c: "var(--coral)", t: "Care home snag", sub: "Rosewood" }, { c: "var(--coral)", t: "Care home snag", sub: "Rosewood" }, { c: "var(--cobalt)", t: "New quote visit", sub: "Clifton" } ]},
  { crew: "Sofia Marchetti", initials: "SM", role: "EV / renewables", cells: [
    { c: "var(--cyan)", t: "EV install", sub: "Bath" }, { c: "var(--cyan)", t: "EV rollout", sub: "Park & Ride" },
    { c: "var(--cyan)", t: "EV rollout", sub: "Park & Ride" }, { c: "var(--cyan)", t: "EV rollout", sub: "Park & Ride" }, { c: "var(--cyan)", t: "EV rollout", sub: "Park & Ride" } ]},
  { crew: "Tom Fisher", initials: "TF", role: "Domestic", cells: [
    { c: "var(--cobalt)", t: "HMO rewire", sub: "Gloucester Rd" }, { c: "var(--cobalt)", t: "HMO rewire", sub: "Gloucester Rd" },
    { c: "var(--cobalt)", t: "HMO rewire", sub: "Gloucester Rd" }, null, { c: "var(--warn)", t: "CU upgrade", sub: "Bedminster" } ]},
  { crew: "Grace Bello", initials: "GB", role: "Domestic", cells: [
    { c: "var(--cobalt)", t: "CU swaps x3", sub: "Knowle" }, { c: "var(--coral)", t: "Care home", sub: "Rosewood" },
    null, { c: "var(--cobalt)", t: "Landlord EICRs", sub: "Southville" }, { c: "var(--cobalt)", t: "Landlord EICRs", sub: "Southville" } ]},
];

/* ---------------- Team roster ---------------- */
export const roster = techs.map((t) => ({
  ...t,
  certExpiry: t.id === "T2" ? "18th edition — renew in 40 days" : "Current",
  jobsWeek: t.jobsToday * 4 + (t.id.charCodeAt(1) % 5),
}));

/* ---------------- Procurement / stock ---------------- */
export type Stock = { item: string; sku: string; onHand: number; min: number; supplier: string; status: "OK" | "Low" | "Reorder"; lead: string };
export const stock: Stock[] = [
  { item: "6242Y 2.5mm T&E (100m)", sku: "TE-2.5", onHand: 14, min: 10, supplier: "CEF", status: "OK", lead: "next day" },
  { item: "Hager 10-way dual RCD board", sku: "VML910CU", onHand: 3, min: 5, supplier: "Edmundson", status: "Reorder", lead: "2 days" },
  { item: "MK double socket, white", sku: "MK-2G", onHand: 62, min: 40, supplier: "CEF", status: "OK", lead: "next day" },
  { item: "Type 2 EV charger, 7kW", sku: "EV-7K", onHand: 2, min: 4, supplier: "Rexel", status: "Low", lead: "3 days" },
  { item: "Wago 221 connectors (box)", sku: "WG-221", onHand: 7, min: 6, supplier: "CEF", status: "OK", lead: "next day" },
  { item: "SWA 4mm 3-core (per m)", sku: "SWA-4", onHand: 40, min: 80, supplier: "Edmundson", status: "Reorder", lead: "2 days" },
];
export const purchaseOrders = [
  { po: "PO-4471", supplier: "Edmundson", items: "Consumer units, SWA cable", value: 1240, status: "Suggested", forJob: "Warehouse upgrade" },
  { po: "PO-4469", supplier: "Rexel", items: "4× EV chargers 7kW", value: 2360, status: "Awaiting approval", forJob: "Park & Ride" },
  { po: "PO-4468", supplier: "CEF", items: "T&E, sockets, Wago", value: 680, status: "Ordered", forJob: "HMO rewire" },
];

/* ---------------- Quotes / invoices ---------------- */
export type Quote = { id: string; client: string; title: string; value: number; owner: string; status: "Draft" | "Sent" | "Viewed" | "Chasing" | "Accepted" | "Declined" };
export const quotes: Quote[] = [
  { id: "Q-882", client: "Severn Logistics", title: "Warehouse 3-phase upgrade", value: 68000, owner: "MW", status: "Viewed" },
  { id: "Q-879", client: "Bath Park & Ride", title: "EV charger rollout — 14 bays", value: 41200, owner: "SM", status: "Accepted" },
  { id: "Q-885", client: "Cabot Circus Mgmt", title: "Retail unit remedials", value: 12800, owner: "AK", status: "Chasing" },
  { id: "Q-877", client: "Aventine Property", title: "HMO rewire — 8 bed", value: 26500, owner: "TF", status: "Accepted" },
  { id: "Q-888", client: "Harbourside Hotel", title: "Kitchen + plant room refit", value: 39400, owner: "MW", status: "Draft" },
  { id: "Q-874", client: "Clifton Dental", title: "Surgery lighting + power", value: 9200, owner: "GB", status: "Sent" },
];
export type Invoice = { id: string; client: string; amount: number; due: string; status: "Paid" | "Sent" | "Due soon" | "Overdue"; days: number };
export const invoices: Invoice[] = [
  { id: "INV-2201", client: "Rosewood Care", amount: 12400, due: "3 Jul", status: "Overdue", days: 26 },
  { id: "INV-2214", client: "Meridian Workspace", amount: 21000, due: "20 Jul", status: "Overdue", days: 9 },
  { id: "INV-2219", client: "Aventine Property", amount: 8800, due: "1 Aug", status: "Due soon", days: -3 },
  { id: "INV-2223", client: "Severn Logistics", amount: 17000, due: "9 Aug", status: "Sent", days: -11 },
  { id: "INV-2198", client: "Cabot Circus Mgmt", amount: 6400, due: "28 Jun", status: "Paid", days: 0 },
];
export const cashflow = [172, 168, 181, 176, 190, 198, 205, 201, 209, 215];
export const cashLabels = ["Wk1", "Wk2", "Wk3", "Wk4", "Wk5", "Wk6", "Wk7", "Wk8", "Wk9", "Now"];

/* ---------------- Digital Workforce (all 10) ---------------- */
export type Agent = { key: string; name: string; role: string; on: boolean; today: string; metric: string; icon: string };
export const workforce: Agent[] = [
  { key: "receptionist", name: "The Receptionist", role: "Answers calls, WhatsApp & web enquiries", on: true, today: "23 enquiries, 1 emergency triaged", metric: "0 missed", icon: "phone" },
  { key: "coordinator", name: "The Coordinator", role: "Keeps every project and crew moving", on: true, today: "Re-routed 4 crews, chased 6 deadlines", metric: "96% on time", icon: "route" },
  { key: "estimator", name: "The Estimator", role: "Drafts quotes, monitors approvals", on: true, today: "5 quotes out, £168k in play", metric: "58% win", icon: "doc" },
  { key: "field", name: "The Field Companion", role: "On-site history, drawings & manuals", on: true, today: "Prepped 19 site packs", metric: "live", icon: "field" },
  { key: "knowledge", name: "The Knowledge Expert", role: "Regs, codes & documentation on demand", on: true, today: "41 lookups across crews", metric: "instant", icon: "vault" },
  { key: "recorder", name: "The Recorder", role: "Turns meetings & calls into records", on: true, today: "3 site meetings summarised", metric: "0 lost", icon: "mic" },
  { key: "collector", name: "The Collector", role: "Chases invoices, protects cash flow", on: true, today: "9 reminders, £14.2k collected", metric: "£62k open", icon: "cash" },
  { key: "procurement", name: "The Procurement Assistant", role: "Tracks stock, suggests purchase orders", on: true, today: "3 POs suggested, 2 shortages flagged", metric: "2 low", icon: "package" },
  { key: "analyst", name: "The Analyst", role: "Leadership briefing every morning", on: true, today: "Briefing ready at 06:30", metric: "daily", icon: "chart" },
  { key: "journey", name: "The Customer Journey", role: "Confirmations, updates & reviews", on: true, today: "48 messages, 6 review requests", metric: "4.8★", icon: "chat" },
];

export const activity = [
  { icon: "route", t: "Coordinator re-routed Callum to the Redcliffe emergency", when: "now", tone: "co" },
  { icon: "cash", t: "Meridian Workspace part-paid INV-2214 (£21k)", when: "1 h ago", tone: "g" },
  { icon: "package", t: "Procurement flagged EV chargers below minimum (2 left)", when: "2 h ago", tone: "y" },
  { icon: "doc", t: "Bath Park & Ride accepted the £41.2k EV quote", when: "3 h ago", tone: "g" },
  { icon: "chat", t: "Customer Journey sent 6 arrival notifications", when: "4 h ago", tone: "b" },
];

export const risks = [
  { t: "Rosewood Care completion at risk", d: "Due 1 Aug, 88% done, but £12.4k invoice 26 days overdue. Hold final visit until part-payment?", tone: "r" },
  { t: "EV chargers below minimum", d: "Only 2 of 4 in stock with the Park & Ride rollout starting Wednesday. PO-4469 awaiting your approval.", tone: "y" },
  { t: "Aisha's 18th edition renewal", d: "Due in 40 days. Book the course now to avoid a gap in certification.", tone: "y" },
];

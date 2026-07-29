# Voltiq — Electrical Command Centre

A fully built demonstration dashboard for a **growing electrical contractor** (14 engineers, 9 vans),
powered by the LEGION OS concept (Command · Intelligence · Vault · Connect). The premise: as the firm
grew, the office drowned in coordination. The command centre puts every crew, job, quote and invoice on
one screen, coordinated by a digital workforce.

Part of the LEGION UNITED demo family. Sibling: **Kestrel Electric** (the solo / one-person operator OS).

## Design language — "Voltage" (control-room variant)

- Dark ops-room theme by default, full light theme included (toggle top-right).
- Palette: ops navy `#070B1C`, electric cobalt `#2F5BFF`, live cyan `#25E0D0`, alert coral `#FF5C7A`.
- Signature elements: live dispatch map with pinging pins, wire connectors, current-flow, pulsing status.
- No em-dashes in product copy, no generic "AI look".

## Views

| Route | Specialist | What it shows |
|-------|-----------|----------------|
| `/` | — | Landing / pitch |
| `/command` | The Analyst | Director briefing, revenue vs target, risks, crews |
| `/dispatch` | The Dispatcher | Live map of vans & jobs, crew detail, dispatch feed |
| `/planning` | The Coordinator | Week board across the whole team |
| `/projects` | The Coordinator | Multi-project delivery, 8-stage funnel |
| `/team` | — | Engineer roster, skills, utilisation, certs |
| `/quotes` | The Estimator | Firm-wide quote pipeline |
| `/cash` | The Collector | Cash flow, overdue accounts, invoices |
| `/procurement` | The Procurement Assistant | Stock levels, purchase orders |
| `/vault` | The Knowledge Expert | Searchable company knowledge |
| `/workforce` | — | The full 10-specialist digital workforce |
| `/intelligence` | — | Private AI workspace |

## Run

```bash
npm run dev   # http://localhost:3600
```

Next.js 16 · React 19 · TypeScript · plain CSS. All data is mock data in `lib/data.ts`.

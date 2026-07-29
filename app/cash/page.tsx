"use client";
import * as React from "react";
import { PageHead, Card, Pill, Stat, AreaChart } from "@/components/ui";
import { eur } from "@/components/ui";
import { invoices, cashflow, cashLabels } from "@/lib/data";
import type { Invoice } from "@/lib/data";
import { Cash, Warn, Check, Send, Bolt, ArrowRight, Clock } from "@/components/icons";
import { useToast, Drawer, Modal, Segmented } from "@/components/interactive";

const statusTone: Record<string, "g" | "b" | "y" | "co"> = { Paid: "g", Sent: "b", "Due soon": "y", Overdue: "co" };
const FILTERS = ["All", "Overdue", "Paid"] as const;

export default function CashPage() {
  const toast = useToast();
  const overdue = invoices.filter((i) => i.status === "Overdue");
  const overdueVal = overdue.reduce((a, i) => a + i.amount, 0);
  const outstanding = invoices.filter((i) => i.status !== "Paid").reduce((a, i) => a + i.amount, 0);
  const [filter, setFilter] = React.useState<string>("All");
  const [active, setActive] = React.useState<Invoice | null>(null);
  const [creating, setCreating] = React.useState(false);

  const shown = invoices.filter((i) => (filter === "All" ? true : i.status === filter));

  return (
    <>
      <PageHead eyebrow="The Collector" title="Cash" sub="Every invoice watched across the firm, reminders sent on schedule, escalated to a person only when judgement is needed.">
        <span className="pill co"><Warn width={13} height={13} /> {eur(overdueVal)} overdue</span>
        <button className="btn primary" onClick={() => setCreating(true)}><Send /> New invoice</button>
      </PageHead>

      <div className="grid g-4" style={{ marginBottom: 16 }}>
        <Stat label="Collected this month" value={eur(148600)} delta="+11% vs last" deltaDir="up" icon={<Check />} variant="accent" />
        <Stat label="Outstanding" value={eur(outstanding)} delta={`${invoices.filter(i => i.status !== "Paid").length} open`} deltaDir="flat" icon={<Cash />} />
        <Stat label="Overdue" value={eur(overdueVal)} delta={`${overdue.length} accounts`} deltaDir="down" icon={<Warn />} variant="cyan" />
        <Stat label="Avg. days to pay" value={24} unit="days" delta="was 38" deltaDir="up" icon={<Clock />} variant="volt" />
      </div>

      <div className="grid" style={{ gridTemplateColumns: "1.5fr 1fr", alignItems: "start", marginBottom: 16 }}>
        <Card title="Revenue collected" sub="Rolling 10 weeks · £ thousands" icon={<Cash width={17} height={17} />} right={<Pill tone="g">Ahead of plan</Pill>}>
          <AreaChart data={cashflow} labels={cashLabels} h={200} color="var(--cyan)" />
        </Card>
        <Card title="Two accounts need you" sub="Everything else on schedule" icon={<Warn width={17} height={17} />}>
          <div className="stack" style={{ gap: 11 }}>
            <div className="notice clickable" style={{ background: "var(--coral-soft)", color: "var(--coral)" }} onClick={() => setActive(invoices.find(i => i.client === "Rosewood Care") || null)}><Warn /><div><b className="tiny">Rosewood Care · £12,400 · 26 days late</b><div className="tiny" style={{ marginTop: 3 }}>Final visit due 1 Aug. The Collector recommends holding it until part-payment clears.</div></div></div>
            <div className="notice y clickable" onClick={() => setActive(invoices.find(i => i.client === "Meridian Workspace") || null)}><Bolt /><div><b className="tiny">Meridian Workspace · £21,000 · 9 days late</b><div className="tiny" style={{ marginTop: 3 }}>Part-paid this morning. Second reminder scheduled for the balance.</div></div></div>
          </div>
        </Card>
      </div>

      <Card title="Invoices" icon={<Cash width={17} height={17} />} pad={false} right={
        <div className="row" style={{ gap: 8 }}>
          <Segmented options={[...FILTERS]} value={filter} onChange={setFilter} />
          <button className="btn sm ghost" onClick={() => toast("Invoices exported to CSV", "g")}>Export</button>
        </div>
      }>
        <div className="scrollx">
          <table className="table">
            <thead><tr><th>Invoice</th><th>Client</th><th className="num">Amount</th><th>Due</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {shown.map((inv) => (
                <tr key={inv.id} className="clickable" onClick={() => setActive(inv)}>
                  <td className="mono tiny muted">{inv.id}</td>
                  <td style={{ fontWeight: 620 }}>{inv.client}</td>
                  <td className="num" style={{ fontWeight: 700 }}>{eur(inv.amount)}</td>
                  <td className="tiny muted">{inv.due}{inv.status === "Overdue" ? <span style={{ color: "var(--coral)", fontWeight: 600 }}> · {inv.days}d late</span> : null}</td>
                  <td><Pill tone={statusTone[inv.status]}>{inv.status}</Pill></td>
                  <td className="num">{inv.status === "Overdue" ? <button className="btn sm" onClick={(e) => { e.stopPropagation(); toast(`Reminder chased with ${inv.client}`, "y"); }}>Chase <ArrowRight width={13} height={13} /></button> : inv.status === "Paid" ? <span className="tiny" style={{ color: "var(--ok)" }}>Settled</span> : <span className="tiny muted">Scheduled</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Drawer
        open={!!active}
        onClose={() => setActive(null)}
        title={active?.id}
        sub={active?.client}
        footer={active ? (
          <>
            <button className="btn primary sm" onClick={() => { toast(`Reminder sent to ${active.client}`, "g"); setActive(null); }}>Send reminder</button>
            <button className="btn sm" onClick={() => { toast(`${active.id} marked as paid`, "g"); setActive(null); }}>Mark paid</button>
          </>
        ) : null}
      >
        {active ? (
          <div className="stack" style={{ gap: 12 }}>
            <div className="kv"><span className="k">Client</span><span className="v">{active.client}</span></div>
            <div className="kv"><span className="k">Amount</span><span className="v">{eur(active.amount)}</span></div>
            <div className="kv"><span className="k">Due date</span><span className="v">{active.due}</span></div>
            <div className="kv"><span className="k">Status</span><span className="v"><Pill tone={statusTone[active.status]}>{active.status}</Pill></span></div>
            {active.status === "Overdue" ? <div className="kv"><span className="k">Days late</span><span className="v" style={{ color: "var(--coral)" }}>{active.days} days</span></div> : null}
            <div>
              <div className="tiny muted" style={{ marginBottom: 8, fontWeight: 640 }}>Collection timeline</div>
              <div className="stack" style={{ gap: 9 }}>
                <div className="row" style={{ gap: 9 }}><span className="dot b" /><span className="tiny">Invoice issued on {active.due}</span></div>
                <div className="row" style={{ gap: 9 }}><span className="dot c" /><span className="tiny">First reminder sent automatically</span></div>
                <div className="row" style={{ gap: 9 }}><span className={`dot ${active.status === "Paid" ? "g" : active.status === "Overdue" ? "r" : "y"}`} /><span className="tiny">{active.status === "Paid" ? "Settled in full" : active.status === "Overdue" ? "Escalated — awaiting your call" : "On schedule"}</span></div>
              </div>
            </div>
          </div>
        ) : null}
      </Drawer>

      <Modal
        open={creating}
        onClose={() => setCreating(false)}
        title="New invoice"
        sub="Raise an invoice for a client"
        wide
        footer={
          <>
            <button className="btn sm" onClick={() => setCreating(false)}>Cancel</button>
            <button className="btn primary sm" onClick={() => { toast("Invoice raised — reminders scheduled", "g"); setCreating(false); }}>Create invoice</button>
          </>
        }
      >
        <div className="stack" style={{ gap: 13 }}>
          <label className="stack" style={{ gap: 5 }}><span className="tiny muted">Client</span><input className="input" placeholder="Client or company" /></label>
          <div className="row" style={{ gap: 10 }}>
            <label className="stack grow" style={{ gap: 5 }}><span className="tiny muted">Amount</span><input className="input" placeholder="£" /></label>
            <label className="stack grow" style={{ gap: 5 }}><span className="tiny muted">Due date</span><input className="input" placeholder="e.g. 20 Aug" /></label>
          </div>
          <label className="stack" style={{ gap: 5 }}><span className="tiny muted">Linked job</span><input className="input" placeholder="Project or reference" /></label>
        </div>
      </Modal>
    </>
  );
}

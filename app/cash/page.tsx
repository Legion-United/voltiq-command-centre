"use client";
import { PageHead, Card, Pill, Stat, AreaChart } from "@/components/ui";
import { eur } from "@/components/ui";
import { invoices, cashflow, cashLabels } from "@/lib/data";
import { Cash, Warn, Check, Send, Bolt, ArrowRight, Clock } from "@/components/icons";

const statusTone: Record<string, "g" | "b" | "y" | "co"> = { Paid: "g", Sent: "b", "Due soon": "y", Overdue: "co" };

export default function CashPage() {
  const overdue = invoices.filter((i) => i.status === "Overdue");
  const overdueVal = overdue.reduce((a, i) => a + i.amount, 0);
  const outstanding = invoices.filter((i) => i.status !== "Paid").reduce((a, i) => a + i.amount, 0);
  return (
    <>
      <PageHead eyebrow="The Collector" title="Cash" sub="Every invoice watched across the firm, reminders sent on schedule, escalated to a person only when judgement is needed.">
        <span className="pill co"><Warn width={13} height={13} /> {eur(overdueVal)} overdue</span>
        <button className="btn primary"><Send /> New invoice</button>
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
            <div className="notice" style={{ background: "var(--coral-soft)", color: "var(--coral)" }}><Warn /><div><b className="tiny">Rosewood Care · £12,400 · 26 days late</b><div className="tiny" style={{ marginTop: 3 }}>Final visit due 1 Aug. The Collector recommends holding it until part-payment clears.</div></div></div>
            <div className="notice y"><Bolt /><div><b className="tiny">Meridian Workspace · £21,000 · 9 days late</b><div className="tiny" style={{ marginTop: 3 }}>Part-paid this morning. Second reminder scheduled for the balance.</div></div></div>
          </div>
        </Card>
      </div>

      <Card title="Invoices" icon={<Cash width={17} height={17} />} pad={false} right={<button className="btn sm ghost">Export</button>}>
        <div className="scrollx">
          <table className="table">
            <thead><tr><th>Invoice</th><th>Client</th><th className="num">Amount</th><th>Due</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id}>
                  <td className="mono tiny muted">{inv.id}</td>
                  <td style={{ fontWeight: 620 }}>{inv.client}</td>
                  <td className="num" style={{ fontWeight: 700 }}>{eur(inv.amount)}</td>
                  <td className="tiny muted">{inv.due}{inv.status === "Overdue" ? <span style={{ color: "var(--coral)", fontWeight: 600 }}> · {inv.days}d late</span> : null}</td>
                  <td><Pill tone={statusTone[inv.status]}>{inv.status}</Pill></td>
                  <td className="num">{inv.status === "Overdue" ? <button className="btn sm">Chase <ArrowRight width={13} height={13} /></button> : inv.status === "Paid" ? <span className="tiny" style={{ color: "var(--ok)" }}>Settled</span> : <span className="tiny muted">Scheduled</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}

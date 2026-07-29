"use client";
import { PageHead, Card, Pill, Stat, Avatar } from "@/components/ui";
import { eur } from "@/components/ui";
import { quotes } from "@/lib/data";
import { Doc, Plus, Bolt, Send, Check } from "@/components/icons";

const statusTone: Record<string, "line" | "b" | "v" | "y" | "g" | "co"> = {
  Draft: "line", Sent: "b", Viewed: "v", Chasing: "y", Accepted: "g", Declined: "co",
};

export default function QuotesPage() {
  const open = quotes.filter((q) => !["Accepted", "Declined"].includes(q.status));
  const openVal = open.reduce((a, q) => a + q.value, 0);
  const won = quotes.filter((q) => q.status === "Accepted").reduce((a, q) => a + q.value, 0);
  return (
    <>
      <PageHead eyebrow="The Estimator" title="Quotes" sub="Every proposal across the firm, drafted fast and chased automatically until the client decides.">
        <span className="pill line">{open.length} open · {eur(openVal)}</span>
        <button className="btn primary"><Plus /> New quote</button>
      </PageHead>

      <div className="grid g-4" style={{ marginBottom: 16 }}>
        <Stat label="Open pipeline" value={eur(openVal)} delta={`${open.length} quotes`} deltaDir="flat" icon={<Doc />} variant="accent" />
        <Stat label="Won this month" value={eur(won)} delta="2 accepted" deltaDir="up" icon={<Check />} variant="cyan" />
        <Stat label="Win rate" value={58} unit="%" delta="+4pts vs last" deltaDir="up" icon={<Check />} />
        <Stat label="Follow-ups sent" value={31} unit="this month" delta="0 forgotten" deltaDir="up" icon={<Send />} variant="volt" />
      </div>

      <Card title="All quotes" icon={<Doc width={17} height={17} />} pad={false} right={<button className="btn sm ghost">Export</button>}>
        <div className="scrollx">
          <table className="table">
            <thead><tr><th>Ref</th><th>Client / job</th><th>Owner</th><th>Status</th><th className="num">Value</th></tr></thead>
            <tbody>
              {quotes.map((q) => (
                <tr key={q.id}>
                  <td className="mono tiny muted">{q.id}</td>
                  <td><div style={{ fontWeight: 620 }}>{q.client}</div><div className="tiny muted">{q.title}</div></td>
                  <td><Avatar name={q.owner + " " + q.owner} size="sm" tone="var(--cobalt)" /></td>
                  <td><Pill tone={statusTone[q.status]}>{q.status}</Pill></td>
                  <td className="num" style={{ fontWeight: 700 }}>{eur(q.value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="card pad" style={{ marginTop: 16, display: "flex", gap: 12, alignItems: "center" }}>
        <span className="avatar" style={{ background: "var(--cobalt-soft)", color: "var(--cobalt-ink)", borderColor: "transparent" }}><Bolt width={18} height={18} /></span>
        <div>
          <b style={{ fontSize: 13.5 }}>The Estimator is chasing three quotes for you</b>
          <div className="tiny muted" style={{ marginTop: 2 }}>The £68k warehouse upgrade has been viewed but not answered. A follow-up with a firm mobilisation date is drafted and waiting for your approval.</div>
        </div>
        <button className="btn sm primary" style={{ marginLeft: "auto" }}>Review follow-ups</button>
      </div>
    </>
  );
}

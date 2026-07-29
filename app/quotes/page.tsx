"use client";
import * as React from "react";
import { PageHead, Card, Pill, Stat, Avatar } from "@/components/ui";
import { eur } from "@/components/ui";
import { quotes } from "@/lib/data";
import type { Quote } from "@/lib/data";
import { Doc, Plus, Bolt, Send, Check } from "@/components/icons";
import { useToast, Drawer, Modal, Segmented } from "@/components/interactive";

const statusTone: Record<string, "line" | "b" | "v" | "y" | "g" | "co"> = {
  Draft: "line", Sent: "b", Viewed: "v", Chasing: "y", Accepted: "g", Declined: "co",
};
const FILTERS = ["All", "Open", "Accepted"] as const;

export default function QuotesPage() {
  const toast = useToast();
  const open = quotes.filter((q) => !["Accepted", "Declined"].includes(q.status));
  const openVal = open.reduce((a, q) => a + q.value, 0);
  const won = quotes.filter((q) => q.status === "Accepted").reduce((a, q) => a + q.value, 0);
  const [filter, setFilter] = React.useState<string>("All");
  const [active, setActive] = React.useState<Quote | null>(null);
  const [creating, setCreating] = React.useState(false);

  const shown = quotes.filter((q) =>
    filter === "All" ? true : filter === "Accepted" ? q.status === "Accepted" : !["Accepted", "Declined"].includes(q.status)
  );

  return (
    <>
      <PageHead eyebrow="The Estimator" title="Quotes" sub="Every proposal across the firm, drafted fast and chased automatically until the client decides.">
        <span className="pill line">{open.length} open · {eur(openVal)}</span>
        <button className="btn primary" onClick={() => setCreating(true)}><Plus /> New quote</button>
      </PageHead>

      <div className="grid g-4" style={{ marginBottom: 16 }}>
        <Stat label="Open pipeline" value={eur(openVal)} delta={`${open.length} quotes`} deltaDir="flat" icon={<Doc />} variant="accent" />
        <Stat label="Won this month" value={eur(won)} delta="2 accepted" deltaDir="up" icon={<Check />} variant="cyan" />
        <Stat label="Win rate" value={58} unit="%" delta="+4pts vs last" deltaDir="up" icon={<Check />} />
        <Stat label="Follow-ups sent" value={31} unit="this month" delta="0 forgotten" deltaDir="up" icon={<Send />} variant="volt" />
      </div>

      <Card title="All quotes" icon={<Doc width={17} height={17} />} pad={false} right={
        <div className="row" style={{ gap: 8 }}>
          <Segmented options={[...FILTERS]} value={filter} onChange={setFilter} />
          <button className="btn sm ghost" onClick={() => toast("Quotes exported to CSV", "g")}>Export</button>
        </div>
      }>
        <div className="scrollx">
          <table className="table">
            <thead><tr><th>Ref</th><th>Client / job</th><th>Owner</th><th>Status</th><th className="num">Value</th></tr></thead>
            <tbody>
              {shown.map((q) => (
                <tr key={q.id} className="clickable" onClick={() => setActive(q)}>
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
        <button className="btn sm primary" style={{ marginLeft: "auto" }} onClick={() => toast("3 drafted follow-ups opened for review", "b")}>Review follow-ups</button>
      </div>

      <Drawer
        open={!!active}
        onClose={() => setActive(null)}
        title={active?.title}
        sub={active ? `${active.id} · ${active.client}` : undefined}
        footer={active ? (
          <>
            <button className="btn primary sm" onClick={() => { toast(`Follow-up sent to ${active.client}`, "g"); setActive(null); }}>Send follow-up</button>
            <button className="btn sm" onClick={() => { toast(`Editing ${active.id}`, "b"); setActive(null); }}>Edit</button>
          </>
        ) : null}
      >
        {active ? (
          <div className="stack" style={{ gap: 12 }}>
            <div className="kv"><span className="k">Client</span><span className="v">{active.client}</span></div>
            <div className="kv"><span className="k">Value</span><span className="v">{eur(active.value)}</span></div>
            <div className="kv"><span className="k">Owner</span><span className="v">{active.owner}</span></div>
            <div className="kv"><span className="k">Status</span><span className="v"><Pill tone={statusTone[active.status]}>{active.status}</Pill></span></div>
            <div>
              <div className="tiny muted" style={{ marginBottom: 8, fontWeight: 640 }}>Activity</div>
              <div className="stack" style={{ gap: 9 }}>
                <div className="row" style={{ gap: 9 }}><span className="dot b" /><span className="tiny">Drafted by the Estimator</span></div>
                <div className="row" style={{ gap: 9 }}><span className="dot c" /><span className="tiny">Sent to {active.client}</span></div>
                <div className="row" style={{ gap: 9 }}><span className={`dot ${active.status === "Accepted" ? "g" : "y"}`} /><span className="tiny">Current status: {active.status}</span></div>
              </div>
            </div>
            <div>
              <div className="tiny muted" style={{ marginBottom: 8, fontWeight: 640 }}>Notes</div>
              <div className="tiny muted">Automatic follow-ups run on day 3 and day 7 unless the client responds. Escalated to a person only when a decision is needed.</div>
            </div>
          </div>
        ) : null}
      </Drawer>

      <Modal
        open={creating}
        onClose={() => setCreating(false)}
        title="New quote"
        sub="Draft a proposal for a client"
        wide
        footer={
          <>
            <button className="btn sm" onClick={() => setCreating(false)}>Cancel</button>
            <button className="btn primary sm" onClick={() => { toast("Quote drafted — ready to send", "g"); setCreating(false); }}>Create quote</button>
          </>
        }
      >
        <div className="stack" style={{ gap: 13 }}>
          <label className="stack" style={{ gap: 5 }}><span className="tiny muted">Client</span><input className="input" placeholder="Client or company" /></label>
          <label className="stack" style={{ gap: 5 }}><span className="tiny muted">Job title</span><input className="input" placeholder="e.g. Warehouse 3-phase upgrade" /></label>
          <div className="row" style={{ gap: 10 }}>
            <label className="stack grow" style={{ gap: 5 }}><span className="tiny muted">Estimated value</span><input className="input" placeholder="£" /></label>
            <label className="stack grow" style={{ gap: 5 }}><span className="tiny muted">Owner</span><input className="input" placeholder="e.g. MW" /></label>
          </div>
          <label className="stack" style={{ gap: 5 }}><span className="tiny muted">Scope notes</span><input className="input" placeholder="Short description of the work" /></label>
        </div>
      </Modal>
    </>
  );
}

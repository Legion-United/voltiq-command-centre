"use client";
import * as React from "react";
import { PageHead, Card, Pill, Stat, Meter, Avatar } from "@/components/ui";
import { roster } from "@/lib/data";
import { User, Plus, Gauge, Shield, Bolt, Truck } from "@/components/icons";
import { useToast, Drawer, Modal, Segmented } from "@/components/interactive";

const statusTone: Record<string, "b" | "c" | "co" | "line"> = { "On job": "b", "In transit": "c", "Alert": "co", "Idle": "line", "Off": "line" };
type Member = (typeof roster)[number];
const FILTERS = ["All", "On job", "Idle"] as const;

export default function TeamPage() {
  const toast = useToast();
  const avgUtil = Math.round(roster.reduce((a, t) => a + t.util, 0) / roster.length);
  const [filter, setFilter] = React.useState<string>("All");
  const [active, setActive] = React.useState<Member | null>(null);
  const [adding, setAdding] = React.useState(false);

  const shown = roster.filter((t) => (filter === "All" ? true : t.status === filter));

  return (
    <>
      <PageHead eyebrow="People & rota" title="Team" sub="Fourteen engineers, their skills, certifications and workload. The Coordinator balances the rota, you keep an eye on the people.">
        <span className="pill line">{roster.length} engineers</span>
        <button className="btn primary" onClick={() => setAdding(true)}><Plus /> Add engineer</button>
      </PageHead>

      <div className="grid g-4" style={{ marginBottom: 16 }}>
        <Stat label="Average utilisation" value={avgUtil} unit="%" delta="healthy band" deltaDir="up" icon={<Gauge />} variant="accent" />
        <Stat label="Out on jobs" value={roster.filter(t => t.status === "On job").length} icon={<Truck />} />
        <Stat label="Idle / reassignable" value={roster.filter(t => t.status === "Idle").length} delta="capacity" deltaDir="flat" icon={<User />} variant="cyan" />
        <Stat label="Certs expiring soon" value={1} delta="Aisha · 18th ed." deltaDir="down" icon={<Shield />} />
      </div>

      <Card title="Roster" icon={<User width={17} height={17} />} pad={false} right={<Segmented options={[...FILTERS]} value={filter} onChange={setFilter} />}>
        <div className="scrollx">
          <table className="table">
            <thead><tr><th>Engineer</th><th>Status</th><th>Current job</th><th>Skills</th><th style={{ minWidth: 140 }}>Utilisation</th><th>Certification</th></tr></thead>
            <tbody>
              {shown.map((t) => (
                <tr key={t.id} className="clickable" onClick={() => setActive(t)}>
                  <td>
                    <div className="row" style={{ gap: 10 }}>
                      <Avatar name={t.name} size="sm" tone={t.kind === "alert" ? "var(--coral)" : t.kind === "transit" ? "var(--cyan)" : t.kind === "idle" ? "var(--muted)" : "var(--cobalt)"} />
                      <div><div style={{ fontWeight: 620 }}>{t.name}</div><div className="tiny muted">{t.role}</div></div>
                    </div>
                  </td>
                  <td><Pill tone={statusTone[t.status]}>{t.status}</Pill></td>
                  <td><div style={{ fontSize: 12.5 }}>{t.job}</div><div className="tiny muted">{t.place}</div></td>
                  <td><div className="row wrap" style={{ gap: 4 }}>{t.skills.slice(0, 2).map((s) => <Pill key={s} tone="line">{s}</Pill>)}{t.skills.length > 2 ? <span className="tiny muted">+{t.skills.length - 2}</span> : null}</div></td>
                  <td>
                    <div className="row" style={{ gap: 8 }}>
                      <div style={{ flex: 1 }}><Meter value={t.util} variant={t.util > 90 ? "r" : t.util < 65 ? "y" : "c"} /></div>
                      <span className="tiny tnum muted">{t.util}%</span>
                    </div>
                  </td>
                  <td>{t.certExpiry === "Current" ? <span className="tiny" style={{ color: "var(--ok)" }}>Current</span> : <span className="tiny" style={{ color: "var(--warn)" }}>{t.certExpiry}</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="card pad" style={{ marginTop: 16, display: "flex", gap: 12, alignItems: "center" }}>
        <span className="avatar" style={{ background: "var(--warn-soft)", color: "var(--warn)", borderColor: "transparent" }}><Shield width={18} height={18} /></span>
        <div>
          <b style={{ fontSize: 13.5 }}>Two people are running hot</b>
          <div className="tiny muted" style={{ marginTop: 2 }}>Liam and Callum are both above 90% utilisation this week. Ben has slack at the depot. The Coordinator can shift two domestic jobs across to protect the team from burnout.</div>
        </div>
        <button className="btn sm" style={{ marginLeft: "auto" }} onClick={() => toast("Rota rebalanced — 2 jobs moved to Ben", "g")}>Rebalance</button>
      </div>

      <Drawer
        open={!!active}
        onClose={() => setActive(null)}
        title={active?.name}
        sub={active?.role}
        footer={active ? (
          <>
            <button className="btn primary sm" onClick={() => { toast(`Message sent to ${active.name.split(" ")[0]}`, "g"); setActive(null); }}>Message</button>
            <button className="btn sm" onClick={() => { toast(`${active.name.split(" ")[0]}'s schedule opened`, "b"); setActive(null); }}>View schedule</button>
          </>
        ) : null}
      >
        {active ? (
          <div className="stack" style={{ gap: 12 }}>
            <div className="kv"><span className="k">Status</span><span className="v"><Pill tone={statusTone[active.status]}>{active.status}</Pill></span></div>
            <div className="kv"><span className="k">Van</span><span className="v">{active.van}</span></div>
            <div className="kv"><span className="k">Current job</span><span className="v" style={{ textAlign: "right", maxWidth: 220 }}>{active.job}</span></div>
            <div className="kv"><span className="k">Location</span><span className="v">{active.place}</span></div>
            <div className="kv"><span className="k">Jobs this week</span><span className="v">{active.jobsWeek}</span></div>
            <div className="kv"><span className="k">Certification</span><span className="v" style={{ color: active.certExpiry === "Current" ? "var(--ok)" : "var(--warn)" }}>{active.certExpiry}</span></div>
            <div><div className="spread" style={{ marginBottom: 6 }}><span className="tiny muted">Utilisation</span><span className="tiny muted tnum">{active.util}%</span></div><Meter value={active.util} variant={active.util > 90 ? "r" : active.util < 65 ? "y" : "volt"} /></div>
            <div className="row wrap" style={{ gap: 6, marginTop: 4 }}>
              {active.skills.map((s) => <Pill key={s} tone="line">{s}</Pill>)}
            </div>
          </div>
        ) : null}
      </Drawer>

      <Modal
        open={adding}
        onClose={() => setAdding(false)}
        title="Add engineer"
        sub="Add a new member to the roster"
        wide
        footer={
          <>
            <button className="btn sm" onClick={() => setAdding(false)}>Cancel</button>
            <button className="btn primary sm" onClick={() => { toast("Engineer added to the roster", "g"); setAdding(false); }}>Add engineer</button>
          </>
        }
      >
        <div className="stack" style={{ gap: 13 }}>
          <label className="stack" style={{ gap: 5 }}><span className="tiny muted">Full name</span><input className="input" placeholder="e.g. Jordan Price" /></label>
          <div className="row" style={{ gap: 10 }}>
            <label className="stack grow" style={{ gap: 5 }}><span className="tiny muted">Role</span><input className="input" placeholder="e.g. Approved electrician" /></label>
            <label className="stack grow" style={{ gap: 5 }}><span className="tiny muted">Assigned van</span><input className="input" placeholder="e.g. VN-09" /></label>
          </div>
          <label className="stack" style={{ gap: 5 }}><span className="tiny muted">Core skills</span><input className="input" placeholder="e.g. Domestic, EV, Testing" /></label>
          <label className="stack" style={{ gap: 5 }}><span className="tiny muted">Certification status</span><input className="input" placeholder="e.g. 18th edition — current" /></label>
        </div>
      </Modal>
    </>
  );
}

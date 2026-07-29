"use client";
import { PageHead, Card, Pill, Stat, Meter, Avatar } from "@/components/ui";
import { roster } from "@/lib/data";
import { User, Plus, Gauge, Shield, Bolt, Truck } from "@/components/icons";

const statusTone: Record<string, "b" | "c" | "co" | "line"> = { "On job": "b", "In transit": "c", "Alert": "co", "Idle": "line", "Off": "line" };

export default function TeamPage() {
  const avgUtil = Math.round(roster.reduce((a, t) => a + t.util, 0) / roster.length);
  return (
    <>
      <PageHead eyebrow="People & rota" title="Team" sub="Fourteen engineers, their skills, certifications and workload. The Coordinator balances the rota, you keep an eye on the people.">
        <span className="pill line">{roster.length} engineers</span>
        <button className="btn primary"><Plus /> Add engineer</button>
      </PageHead>

      <div className="grid g-4" style={{ marginBottom: 16 }}>
        <Stat label="Average utilisation" value={avgUtil} unit="%" delta="healthy band" deltaDir="up" icon={<Gauge />} variant="accent" />
        <Stat label="Out on jobs" value={roster.filter(t => t.status === "On job").length} icon={<Truck />} />
        <Stat label="Idle / reassignable" value={roster.filter(t => t.status === "Idle").length} delta="capacity" deltaDir="flat" icon={<User />} variant="cyan" />
        <Stat label="Certs expiring soon" value={1} delta="Aisha · 18th ed." deltaDir="down" icon={<Shield />} />
      </div>

      <Card title="Roster" icon={<User width={17} height={17} />} pad={false}>
        <div className="scrollx">
          <table className="table">
            <thead><tr><th>Engineer</th><th>Status</th><th>Current job</th><th>Skills</th><th style={{ minWidth: 140 }}>Utilisation</th><th>Certification</th></tr></thead>
            <tbody>
              {roster.map((t) => (
                <tr key={t.id}>
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
        <button className="btn sm" style={{ marginLeft: "auto" }}>Rebalance</button>
      </div>
    </>
  );
}

"use client";
import * as React from "react";
import { PageHead, Card, Pill, Avatar, Stat } from "@/components/ui";
import { planning, days } from "@/lib/data";
import type { PlanJob } from "@/lib/data";
import { Calendar, Route, Bolt, Truck, Gauge } from "@/components/icons";
import { useToast, Drawer } from "@/components/interactive";

type Sel = { job: PlanJob; crew: string; day: string };

export default function PlanningPage() {
  const toast = useToast();
  const [sel, setSel] = React.useState<Sel | null>(null);

  return (
    <>
      <PageHead eyebrow="The Coordinator" title="Planning" sub="Crews, vans and materials scheduled across the week. Planning changes constantly, and the board adapts faster than a whiteboard ever could.">
        <span className="pill line">Week of 28 July</span>
        <button className="btn primary" onClick={() => toast("Week auto-balanced — 40 min of travel saved", "g")}><Bolt /> Auto-balance</button>
      </PageHead>

      <div className="grid g-4" style={{ marginBottom: 16 }}>
        <Stat label="Scheduled jobs" value={19} unit="this week" icon={<Calendar />} variant="accent" />
        <Stat label="Crew utilisation" value={84} unit="%" delta="1 crew has slack" deltaDir="flat" icon={<Gauge />} variant="cyan" />
        <Stat label="Travel optimised" value="3.4" unit="hrs saved" delta="this week" deltaDir="up" icon={<Route />} variant="volt" />
        <Stat label="Vans in service" value={9} unit="/ 9" icon={<Truck />} />
      </div>

      <Card title="Week board" sub="Colour = job type · drag to rebalance" icon={<Calendar width={17} height={17} />} pad={false}>
        <div style={{ overflowX: "auto", padding: 14 }}>
          <div className="plan" style={{ minWidth: 720 }}>
            <div className="ph">Crew</div>
            {days.map((d) => <div key={d} className="ph">{d}</div>)}
            {planning.map((p) => (
              <React.Fragment key={p.crew}>
                <div className="crew">
                  <Avatar name={p.crew} size="sm" tone="var(--cobalt)" />
                  <div><div style={{ fontSize: 12, fontWeight: 640 }}>{p.crew.split(" ")[0]}</div><div className="tiny muted">{p.role}</div></div>
                </div>
                {p.cells.map((c, i) => (
                  <div className="cell" key={p.crew + i}>
                    {c ? <div className="plan-job clickable" style={{ background: c.c }} onClick={() => setSel({ job: c, crew: p.crew, day: days[i] })}>{c.t}<small>{c.sub}</small></div> : <span className="tiny muted" style={{ margin: "auto", opacity: .5 }}>free</span>}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </Card>

      <div className="card pad" style={{ marginTop: 16, display: "flex", gap: 12, alignItems: "center" }}>
        <span className="avatar" style={{ background: "var(--cyan-soft)", color: "var(--cyan-ink)", borderColor: "transparent" }}><Bolt width={18} height={18} /></span>
        <div>
          <b style={{ fontSize: 13.5 }}>The Coordinator spotted an imbalance</b>
          <div className="tiny muted" style={{ marginTop: 2 }}>Tom is free Thursday while Grace is double-booked at Rosewood. Moving the Bedminster CU upgrade to Grace and the landlord EICRs to Tom levels the week and saves 40 minutes of travel.</div>
        </div>
        <button className="btn sm primary" style={{ marginLeft: "auto" }} onClick={() => toast("Suggestion applied — rota rebalanced", "g")}>Apply suggestion</button>
      </div>

      <Drawer
        open={!!sel}
        onClose={() => setSel(null)}
        title={sel?.job.t}
        sub={sel ? `${sel.crew} · ${sel.day}` : undefined}
        footer={sel ? (
          <>
            <button className="btn primary sm" onClick={() => { toast(`Reassignment options opened for the ${sel.job.t} job`, "b"); setSel(null); }}>Reassign</button>
            <button className="btn sm" onClick={() => { toast(`Message sent to ${sel.crew.split(" ")[0]}`, "g"); setSel(null); }}>Message crew</button>
          </>
        ) : null}
      >
        {sel ? (
          <div className="stack" style={{ gap: 12 }}>
            <div className="kv"><span className="k">Job</span><span className="v">{sel.job.t}</span></div>
            <div className="kv"><span className="k">Site</span><span className="v">{sel.job.sub}</span></div>
            <div className="kv"><span className="k">Crew</span><span className="v">{sel.crew}</span></div>
            <div className="kv"><span className="k">Day</span><span className="v">{sel.day}</span></div>
            <div className="plan-job" style={{ background: sel.job.c, maxWidth: 200 }}>{sel.job.t}<small>{sel.job.sub}</small></div>
            <div>
              <div className="tiny muted" style={{ marginBottom: 8, fontWeight: 640 }}>Notes</div>
              <div className="tiny muted">Materials confirmed on the van. Access arranged with the site contact. The Coordinator will notify the client the morning of the visit.</div>
            </div>
          </div>
        ) : null}
      </Drawer>
    </>
  );
}

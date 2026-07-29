"use client";
import * as React from "react";
import { PageHead, Card, Pill, Avatar, Stat } from "@/components/ui";
import { planning, days } from "@/lib/data";
import { Calendar, Route, Bolt, Truck, Gauge } from "@/components/icons";

export default function PlanningPage() {
  return (
    <>
      <PageHead eyebrow="The Coordinator" title="Planning" sub="Crews, vans and materials scheduled across the week. Planning changes constantly, and the board adapts faster than a whiteboard ever could.">
        <span className="pill line">Week of 28 July</span>
        <button className="btn primary"><Bolt /> Auto-balance</button>
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
                    {c ? <div className="plan-job" style={{ background: c.c }}>{c.t}<small>{c.sub}</small></div> : <span className="tiny muted" style={{ margin: "auto", opacity: .5 }}>free</span>}
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
        <button className="btn sm primary" style={{ marginLeft: "auto" }}>Apply suggestion</button>
      </div>
    </>
  );
}

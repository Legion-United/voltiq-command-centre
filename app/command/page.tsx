"use client";
import * as React from "react";
import { PageHead, Card, Stat, Pill, Dot, AreaChart, Meter, Avatar } from "@/components/ui";
import { eur } from "@/components/ui";
import { kpis, command, techs, activity, risks, cashflow, cashLabels } from "@/lib/data";
import type { Tech } from "@/lib/data";
import { Bolt, Route, Cash, Doc, Gauge, Warn, Truck, Chart, ArrowRight, Check } from "@/components/icons";
import { useToast, Drawer } from "@/components/interactive";

const ICON: Record<string, React.ReactNode> = {
  route: <Route width={15} height={15} />, cash: <Cash width={15} height={15} />, doc: <Doc width={15} height={15} />,
  chat: <Bolt width={15} height={15} />, package: <Truck width={15} height={15} />,
};

type Risk = (typeof risks)[number];

export default function CommandPage() {
  const toast = useToast();
  const pct = Math.round((kpis.revenueMonth / kpis.revenueTarget) * 100);
  const [risk, setRisk] = React.useState<Risk | null>(null);
  const [crew, setCrew] = React.useState<Tech | null>(null);

  return (
    <>
      <PageHead eyebrow={`${command.date} · Morning briefing`} title="Good morning, Priya" sub={command.headline}>
        <span className="pill line">{command.weather}</span>
        <button className="btn primary" onClick={() => toast("Full briefing opened — 6 items ready to review", "b")}><Chart /> Full briefing</button>
      </PageHead>

      <div className="grid g-4" style={{ marginBottom: 16 }}>
        <Stat label="Revenue this month" value={eur(kpis.revenueMonth)} delta={`${pct}% of £240k target`} deltaDir="up" icon={<Cash />} spark={kpis.revenueSpark} variant="accent" />
        <Stat label="Crews out" value={kpis.crewsOut} unit={`/ 14`} delta={`${kpis.jobsToday} jobs today`} deltaDir="flat" icon={<Truck />} />
        <Stat label="Utilisation" value={kpis.utilisation} unit="%" delta="+6pts vs last wk" deltaDir="up" icon={<Gauge />} variant="cyan" />
        <Stat label="On-time delivery" value={kpis.slaOnTime} unit="%" delta="SLA target 92%" deltaDir="up" icon={<Check />} variant="volt" />
      </div>

      <div className="grid" style={{ gridTemplateColumns: "1.6fr 1fr", alignItems: "start", marginBottom: 16 }}>
        <Card title="Revenue vs target" sub="Rolling 10 weeks · £ thousands" icon={<Chart width={17} height={17} />} right={<Pill tone="g">On track</Pill>}>
          <AreaChart data={cashflow} labels={cashLabels} h={200} color="var(--cobalt)" />
        </Card>

        <Card title="Needs a decision" sub={`${risks.length} operational risks`} icon={<Warn width={17} height={17} />}>
          <div className="stack" style={{ gap: 11 }}>
            {risks.map((r, i) => (
              <div key={i} className={`notice ${r.tone === "r" ? "y" : "b"} clickable`} style={r.tone === "r" ? { background: "var(--coral-soft)", color: "var(--coral)" } : undefined} onClick={() => setRisk(r)}>
                {r.tone === "r" ? <Warn /> : <Bolt />}
                <div><b className="tiny">{r.t}</b><div className="tiny" style={{ marginTop: 3, opacity: .9 }}>{r.d}</div></div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid" style={{ gridTemplateColumns: "1.2fr 1fr", alignItems: "start" }}>
        <Card title="Crews right now" sub={`${techs.filter(t => t.status !== "Off").length} active`} icon={<Truck width={17} height={17} />} right={<a className="tiny" style={{ color: "var(--cobalt)" }} href="/dispatch">Live map →</a>}>
          <div className="stack" style={{ gap: 0 }}>
            {techs.slice(0, 6).map((t) => (
              <div key={t.id} className="row clickable" style={{ gap: 11, padding: "10px 0", borderBottom: "1px dashed var(--line)" }} onClick={() => setCrew(t)}>
                <Avatar name={t.name} size="sm" tone={t.kind === "alert" ? "var(--coral)" : t.kind === "transit" ? "var(--cyan)" : t.kind === "idle" ? "var(--muted)" : "var(--cobalt)"} />
                <div className="grow">
                  <div style={{ fontWeight: 620, fontSize: 12.5 }}>{t.name} <span className="tiny muted">· {t.van}</span></div>
                  <div className="tiny muted">{t.job} · {t.place}</div>
                </div>
                <div className="stack" style={{ alignItems: "flex-end", gap: 3 }}>
                  <Pill tone={t.status === "Alert" ? "co" : t.status === "In transit" ? "c" : t.status === "Idle" ? "line" : "b"}>{t.status}</Pill>
                  {t.eta ? <span className="tiny muted">{t.eta}</span> : <span className="tiny muted">{t.util}% util</span>}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Coordinated automatically" sub="No one had to make a call" icon={<Bolt width={17} height={17} />}>
          <div className="stack" style={{ gap: 2 }}>
            {activity.map((a, i) => (
              <div key={i} className="row" style={{ gap: 11, padding: "9px 0", borderBottom: i < activity.length - 1 ? "1px dashed var(--line)" : "none" }}>
                <span className="avatar sm" style={{ background: "var(--surface-3)", color: "var(--ink-2)", borderColor: "transparent" }}>{ICON[a.icon]}</span>
                <span style={{ fontSize: 12.5 }}>{a.t}</span>
                <span className="tiny muted" style={{ marginLeft: "auto", whiteSpace: "nowrap" }}>{a.when}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Drawer
        open={!!risk}
        onClose={() => setRisk(null)}
        title={risk?.t}
        sub={risk?.tone === "r" ? "High priority · needs a decision" : "Advisory · review recommended"}
        footer={risk ? (
          <>
            <button className="btn primary sm" onClick={() => { toast("Risk resolved — action logged", "g"); setRisk(null); }}>Resolve</button>
            <button className="btn sm" onClick={() => { toast("Snoozed until tomorrow 08:00", "y"); setRisk(null); }}>Snooze</button>
          </>
        ) : null}
      >
        {risk ? (
          <div className="stack" style={{ gap: 14 }}>
            <div className="notice" style={{ background: risk.tone === "r" ? "var(--coral-soft)" : "var(--warn-soft)", color: risk.tone === "r" ? "var(--coral)" : "#8a5a12" }}>
              {risk.tone === "r" ? <Warn /> : <Bolt />}<div className="tiny">{risk.d}</div>
            </div>
            <div>
              <div className="tiny muted" style={{ marginBottom: 8, fontWeight: 640 }}>Timeline</div>
              <div className="stack" style={{ gap: 9 }}>
                <div className="row" style={{ gap: 9 }}><Dot tone={risk.tone === "r" ? "r" : "y"} /><span className="tiny">Flagged by the Analyst at 06:30</span></div>
                <div className="row" style={{ gap: 9 }}><Dot tone="b" /><span className="tiny">Escalated to the morning briefing</span></div>
                <div className="row" style={{ gap: 9 }}><Dot tone="b" /><span className="tiny">Awaiting your decision</span></div>
              </div>
            </div>
          </div>
        ) : null}
      </Drawer>

      <Drawer
        open={!!crew}
        onClose={() => setCrew(null)}
        title={crew?.name}
        sub={crew ? `${crew.role} · ${crew.van}` : undefined}
        footer={crew ? (
          <>
            <button className="btn primary sm" onClick={() => { toast(`Message sent to ${crew.name.split(" ")[0]}`, "g"); setCrew(null); }}>Message</button>
            <button className="btn sm" onClick={() => { toast(`Reassignment options opened for ${crew.name.split(" ")[0]}`, "b"); setCrew(null); }}>Reassign</button>
          </>
        ) : null}
      >
        {crew ? (
          <div className="stack" style={{ gap: 12 }}>
            <div className="kv"><span className="k">Status</span><span className="v"><Pill tone={crew.status === "Alert" ? "co" : crew.status === "In transit" ? "c" : crew.status === "Idle" ? "line" : "b"}>{crew.status}</Pill></span></div>
            <div className="kv"><span className="k">Current job</span><span className="v" style={{ textAlign: "right", maxWidth: 220 }}>{crew.job}</span></div>
            <div className="kv"><span className="k">Location</span><span className="v">{crew.place}</span></div>
            {crew.eta ? <div className="kv"><span className="k">ETA</span><span className="v">{crew.eta}</span></div> : null}
            <div className="kv"><span className="k">Jobs today</span><span className="v">{crew.jobsToday}</span></div>
            <div className="kv"><span className="k">Utilisation</span><span className="v">{crew.util}%</span></div>
            <Meter value={crew.util} variant={crew.util > 90 ? "r" : crew.util < 65 ? "y" : "volt"} />
            <div className="row wrap" style={{ gap: 6, marginTop: 4 }}>
              {crew.skills.map((s) => <Pill key={s} tone="line">{s}</Pill>)}
            </div>
          </div>
        ) : null}
      </Drawer>
    </>
  );
}

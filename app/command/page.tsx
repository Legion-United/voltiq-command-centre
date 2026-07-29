"use client";
import { PageHead, Card, Stat, Pill, Dot, AreaChart, Meter, Avatar } from "@/components/ui";
import { eur } from "@/components/ui";
import { kpis, command, techs, activity, risks, cashflow, cashLabels } from "@/lib/data";
import { Bolt, Route, Cash, Doc, Gauge, Warn, Truck, Chart, ArrowRight, Check } from "@/components/icons";

const ICON: Record<string, React.ReactNode> = {
  route: <Route width={15} height={15} />, cash: <Cash width={15} height={15} />, doc: <Doc width={15} height={15} />,
  chat: <Bolt width={15} height={15} />, package: <Truck width={15} height={15} />,
};

export default function CommandPage() {
  const pct = Math.round((kpis.revenueMonth / kpis.revenueTarget) * 100);
  return (
    <>
      <PageHead eyebrow={`${command.date} · Morning briefing`} title="Good morning, Priya" sub={command.headline}>
        <span className="pill line">{command.weather}</span>
        <button className="btn primary"><Chart /> Full briefing</button>
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
              <div key={i} className={`notice ${r.tone === "r" ? "y" : "b"}`} style={r.tone === "r" ? { background: "var(--coral-soft)", color: "var(--coral)" } : undefined}>
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
              <div key={t.id} className="row" style={{ gap: 11, padding: "10px 0", borderBottom: "1px dashed var(--line)" }}>
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
    </>
  );
}

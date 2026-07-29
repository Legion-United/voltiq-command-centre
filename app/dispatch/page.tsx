"use client";
import * as React from "react";
import { PageHead, Card, Pill, Avatar, Stat } from "@/components/ui";
import { techs, dispatch } from "@/lib/data";
import { Map, Truck, Route, Warn, Bolt, Wrench, Pin, ArrowRight } from "@/components/icons";
import { useToast, Drawer } from "@/components/interactive";

type Feed = (typeof dispatch)[number];

const kindIcon: Record<string, React.ReactNode> = {
  job: <Wrench width={16} height={16} />, transit: <Truck width={16} height={16} />,
  alert: <Warn width={16} height={16} />, idle: <Pin width={16} height={16} />,
};
const feedTone: Record<string, React.CSSProperties> = {
  co: { background: "var(--coral-soft)", color: "var(--coral)" },
  c: { background: "var(--cyan-soft)", color: "var(--cyan-ink)" },
  b: { background: "var(--cobalt-soft)", color: "var(--cobalt-ink)" },
  y: { background: "var(--warn-soft)", color: "#8a5a12" },
};

export default function DispatchPage() {
  const toast = useToast();
  const [sel, setSel] = React.useState<string | null>("T3");
  const [feed, setFeed] = React.useState<Feed | null>(null);
  const active = techs.find((t) => t.id === sel);
  return (
    <>
      <PageHead eyebrow="The Dispatcher" title="Live dispatch" sub="Every van, every job, in real time. When the emergency comes in, the nearest qualified engineer is already on the way.">
        <span className="pill co"><span className="dot co pulse" /> 1 emergency</span>
        <button className="btn primary" onClick={() => toast("Routes optimised — 3.4 hrs of travel saved today", "g")}><Route /> Optimise routes</button>
      </PageHead>

      <div className="grid g-4" style={{ marginBottom: 16 }}>
        <Stat label="Crews on job" value={techs.filter(t => t.kind === "job").length} icon={<Wrench />} variant="accent" />
        <Stat label="In transit" value={techs.filter(t => t.kind === "transit").length} unit="vans" icon={<Truck />} variant="cyan" />
        <Stat label="Idle capacity" value={techs.filter(t => t.kind === "idle").length} delta="reassignable" deltaDir="flat" icon={<Pin />} />
        <Stat label="Live alerts" value={techs.filter(t => t.kind === "alert").length} delta="Redcliffe fault" deltaDir="down" icon={<Warn />} />
      </div>

      <div className="grid" style={{ gridTemplateColumns: "1.7fr 1fr", alignItems: "start" }}>
        <Card title="Bristol & Bath — live" sub="Tap a pin to see the crew" icon={<Map width={17} height={17} />} pad={false}>
          <div className="opsmap">
            <div className="opsmap-grid" />
            <svg className="maproute" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M49 50 L52 58" stroke="var(--coral)" strokeWidth="0.6" strokeDasharray="1.5 1.5" fill="none" opacity="0.8" />
              <path d="M74 66 L88 74" stroke="var(--cyan)" strokeWidth="0.6" strokeDasharray="1.5 1.5" fill="none" opacity="0.7" />
            </svg>
            {techs.map((t) => (
              <button key={t.id} className={`mappin ${t.kind}`} style={{ left: `${t.x}%`, top: `${t.y}%`, background: "none", border: "none", padding: 0 }} onClick={() => setSel(t.id)}>
                {sel === t.id ? <span className="lbl">{t.name.split(" ")[0]} · {t.status}</span> : null}
                <span className="glyph">{(t.kind === "alert" || t.kind === "transit") ? <span className="ping" /> : null}{kindIcon[t.kind]}</span>
              </button>
            ))}
            <div style={{ position: "absolute", left: 14, bottom: 14, display: "flex", gap: 12, flexWrap: "wrap", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 10, padding: "8px 12px", fontSize: 11 }}>
              <span className="row" style={{ gap: 6 }}><span className="dot b" /> On job</span>
              <span className="row" style={{ gap: 6 }}><span className="dot c" /> In transit</span>
              <span className="row" style={{ gap: 6 }}><span className="dot co" /> Alert</span>
              <span className="row" style={{ gap: 6 }}><span className="dot" style={{ background: "var(--muted)" }} /> Idle</span>
            </div>
          </div>
        </Card>

        <div className="stack" style={{ gap: 16 }}>
          {active ? (
            <Card title={active.name} sub={`${active.role} · ${active.van}`} icon={<Avatar name={active.name} size="sm" tone={active.kind === "alert" ? "var(--coral)" : active.kind === "transit" ? "var(--cyan)" : "var(--cobalt)"} />} right={<Pill tone={active.status === "Alert" ? "co" : active.status === "In transit" ? "c" : "b"}>{active.status}</Pill>}>
              <div className="kv"><span className="k">Current job</span><span className="v" style={{ textAlign: "right", maxWidth: 200 }}>{active.job}</span></div>
              <div className="kv"><span className="k">Location</span><span className="v">{active.place}</span></div>
              {active.eta ? <div className="kv"><span className="k">ETA</span><span className="v">{active.eta}</span></div> : null}
              <div className="kv"><span className="k">Jobs today</span><span className="v">{active.jobsToday}</span></div>
              <div className="kv"><span className="k">Utilisation</span><span className="v">{active.util}%</span></div>
              <div className="row wrap" style={{ gap: 6, marginTop: 12 }}>
                {active.skills.map((s) => <Pill key={s} tone="line">{s}</Pill>)}
              </div>
              <div className="row" style={{ gap: 8, marginTop: 14 }}>
                <button className="btn primary sm" onClick={() => toast(`Message sent to ${active.name.split(" ")[0]}`, "g")}>Message crew</button>
                <button className="btn sm" onClick={() => toast(`Reassignment options opened for ${active.name.split(" ")[0]}`, "b")}>Reassign <ArrowRight width={13} height={13} /></button>
              </div>
            </Card>
          ) : null}

          <Card title="Dispatch feed" sub="Live" icon={<Bolt width={17} height={17} />}>
            <div className="stack" style={{ gap: 10 }}>
              {dispatch.map((d, i) => (
                <div key={i} className="row clickable" style={{ gap: 10, alignItems: "flex-start" }} onClick={() => setFeed(d)}>
                  <span className="avatar sm" style={{ ...feedTone[d.tone], borderColor: "transparent" }}><Route width={14} height={14} /></span>
                  <div className="grow">
                    <div style={{ fontSize: 12.5, fontWeight: 600 }}>{d.t}</div>
                    <div className="tiny muted">{d.meta}</div>
                  </div>
                  <span className="tiny muted" style={{ whiteSpace: "nowrap" }}>{d.when}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <Drawer
        open={!!feed}
        onClose={() => setFeed(null)}
        title="Dispatch event"
        sub={feed?.when}
        footer={feed ? (
          <>
            <button className="btn primary sm" onClick={() => { toast("Acknowledged — crews notified", "g"); setFeed(null); }}>Acknowledge</button>
            <button className="btn sm" onClick={() => { toast("Event muted for 30 min", "y"); setFeed(null); }}>Mute</button>
          </>
        ) : null}
      >
        {feed ? (
          <div className="stack" style={{ gap: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 640 }}>{feed.t}</div>
            <div className="tiny muted">{feed.meta}</div>
            <div>
              <div className="tiny muted" style={{ marginBottom: 8, fontWeight: 640 }}>Timeline</div>
              <div className="stack" style={{ gap: 9 }}>
                <div className="row" style={{ gap: 9 }}><span className="dot b" /><span className="tiny">Detected by the Coordinator</span></div>
                <div className="row" style={{ gap: 9 }}><span className="dot c" /><span className="tiny">Nearest qualified crew identified</span></div>
                <div className="row" style={{ gap: 9 }}><span className="dot g" /><span className="tiny">Pushed to the live feed {feed.when}</span></div>
              </div>
            </div>
          </div>
        ) : null}
      </Drawer>
    </>
  );
}

"use client";
import { PageHead, Pill } from "@/components/ui";
import { workforce } from "@/lib/data";
import { Phone, Route, Doc, Field, Vault, Mic, Cash, Package, Chart, Chat, Bolt, Workforce as WF } from "@/components/icons";

const AI: Record<string, React.ReactNode> = {
  phone: <Phone width={20} height={20} />, route: <Route width={20} height={20} />, doc: <Doc width={20} height={20} />,
  field: <Field width={20} height={20} />, vault: <Vault width={20} height={20} />, mic: <Mic width={20} height={20} />,
  cash: <Cash width={20} height={20} />, package: <Package width={20} height={20} />, chart: <Chart width={20} height={20} />, chat: <Chat width={20} height={20} />,
};

export default function WorkforcePage() {
  const on = workforce.filter((a) => a.on).length;
  return (
    <>
      <PageHead eyebrow="The engine" title="Digital Workforce" sub="Ten specialists coordinating the operation around the clock, so fourteen engineers can spend their day on the tools instead of on the phone.">
        <span className="pill g"><span className="dot g pulse" /> {on} of {workforce.length} active</span>
        <button className="btn primary"><Bolt /> Configure</button>
      </PageHead>

      <div className="card pad" style={{ marginBottom: 16, display: "flex", gap: 18, flexWrap: "wrap", alignItems: "center" }}>
        {[
          { k: "Office hours handed back", v: "210", u: "this month" },
          { k: "Enquiries never missed", v: "100%", u: "24/7" },
          { k: "Crews re-routed live", v: "48", u: "this month" },
          { k: "Cash collected", v: "£149k", u: "this month" },
        ].map((s) => (
          <div key={s.k} style={{ flex: 1, minWidth: 160 }}>
            <div className="tiny muted">{s.k}</div>
            <div style={{ fontSize: 24, fontWeight: 720, letterSpacing: "-0.03em" }} className="tnum">{s.v} <span style={{ fontSize: 12, color: "var(--muted)", fontWeight: 600 }}>{s.u}</span></div>
          </div>
        ))}
      </div>

      <div className="grid g-2">
        {workforce.map((a) => (
          <div key={a.key} className={`agent ${a.on ? "on" : ""}`}>
            <span className="ic">{AI[a.icon]}</span>
            <div className="grow">
              <div className="spread">
                <div className="nm">{a.name}</div>
                {a.on ? <Pill tone="g"><span className="dot g" /> Active</Pill> : <Pill tone="line">Standby</Pill>}
              </div>
              <div className="rl">{a.role}</div>
              <div className="row" style={{ gap: 8, marginTop: 9 }}>
                <span className="tiny muted">{a.today}</span>
                <span className="pill c" style={{ marginLeft: "auto", fontSize: 10.5 }}>{a.metric}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card pad" style={{ marginTop: 16, display: "flex", gap: 12, alignItems: "center" }}>
        <span className="avatar" style={{ background: "var(--cyan-soft)", color: "var(--cyan-ink)", borderColor: "transparent" }}><WF width={18} height={18} /></span>
        <div>
          <b style={{ fontSize: 13.5 }}>The whole team is deployed</b>
          <div className="tiny muted" style={{ marginTop: 2 }}>All ten specialists are running. As Voltiq grows into new regions, each one scales with the operation without adding headcount to the office.</div>
        </div>
        <button className="btn sm" style={{ marginLeft: "auto" }}>Usage report</button>
      </div>
    </>
  );
}

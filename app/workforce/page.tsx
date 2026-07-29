"use client";
import * as React from "react";
import { PageHead, Pill } from "@/components/ui";
import { workforce } from "@/lib/data";
import type { Agent } from "@/lib/data";
import { Phone, Route, Doc, Field, Vault, Mic, Cash, Package, Chart, Chat, Bolt, Workforce as WF } from "@/components/icons";
import { useToast, Drawer, Modal } from "@/components/interactive";

const AI: Record<string, React.ReactNode> = {
  phone: <Phone width={20} height={20} />, route: <Route width={20} height={20} />, doc: <Doc width={20} height={20} />,
  field: <Field width={20} height={20} />, vault: <Vault width={20} height={20} />, mic: <Mic width={20} height={20} />,
  cash: <Cash width={20} height={20} />, package: <Package width={20} height={20} />, chart: <Chart width={20} height={20} />, chat: <Chat width={20} height={20} />,
};

export default function WorkforcePage() {
  const toast = useToast();
  const [agents, setAgents] = React.useState<Agent[]>(workforce);
  const [active, setActive] = React.useState<Agent | null>(null);
  const [configuring, setConfiguring] = React.useState(false);
  const on = agents.filter((a) => a.on).length;

  const toggle = (key: string) => {
    setAgents((prev) => prev.map((a) => {
      if (a.key !== key) return a;
      const next = !a.on;
      toast(`${a.name} ${next ? "activated" : "set to standby"}`, next ? "g" : "y");
      return { ...a, on: next };
    }));
  };

  return (
    <>
      <PageHead eyebrow="The engine" title="Digital Workforce" sub="Ten specialists coordinating the operation around the clock, so fourteen engineers can spend their day on the tools instead of on the phone.">
        <span className="pill g"><span className="dot g pulse" /> {on} of {agents.length} active</span>
        <button className="btn primary" onClick={() => setConfiguring(true)}><Bolt /> Configure</button>
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
        {agents.map((a) => (
          <div key={a.key} className={`agent clickable ${a.on ? "on" : ""}`} onClick={() => setActive(a)}>
            <span className="ic">{AI[a.icon]}</span>
            <div className="grow">
              <div className="spread">
                <div className="nm">{a.name}</div>
                <button
                  className={`switch ${a.on ? "on" : ""}`}
                  role="switch"
                  aria-checked={a.on}
                  aria-label={`${a.on ? "Deactivate" : "Activate"} ${a.name}`}
                  onClick={(e) => { e.stopPropagation(); toggle(a.key); }}
                />
              </div>
              <div className="rl">{a.role}</div>
              <div className="row" style={{ gap: 8, marginTop: 9 }}>
                <span className="tiny muted">{a.on ? a.today : "On standby"}</span>
                {a.on ? <span className="pill c" style={{ marginLeft: "auto", fontSize: 10.5 }}>{a.metric}</span> : <Pill tone="line">Standby</Pill>}
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
        <button className="btn sm" style={{ marginLeft: "auto" }} onClick={() => toast("Usage report generated for this month", "b")}>Usage report</button>
      </div>

      <Drawer
        open={!!active}
        onClose={() => setActive(null)}
        title={active?.name}
        sub={active?.role}
        footer={active ? (
          <>
            <button className="btn primary sm" onClick={() => { const a = active; setAgents((prev) => prev.map((x) => x.key === a.key ? { ...x, on: !x.on } : x)); toast(`${a.name} ${a.on ? "set to standby" : "activated"}`, a.on ? "y" : "g"); setActive(null); }}>{active.on ? "Set to standby" : "Activate"}</button>
            <button className="btn sm" onClick={() => { toast(`${active.name} activity log opened`, "b"); setActive(null); }}>View activity</button>
          </>
        ) : null}
      >
        {active ? (
          <div className="stack" style={{ gap: 12 }}>
            <div className="kv"><span className="k">State</span><span className="v">{active.on ? <Pill tone="g"><span className="dot g" /> Active</Pill> : <Pill tone="line">Standby</Pill>}</span></div>
            <div className="kv"><span className="k">Today</span><span className="v" style={{ textAlign: "right", maxWidth: 220 }}>{active.today}</span></div>
            <div className="kv"><span className="k">Key metric</span><span className="v">{active.metric}</span></div>
            <div>
              <div className="tiny muted" style={{ marginBottom: 8, fontWeight: 640 }}>What this specialist does</div>
              <div className="tiny muted">{active.role}. Runs around the clock, coordinating with the rest of the digital workforce and escalating to a person only when judgement is needed.</div>
            </div>
            <div>
              <div className="tiny muted" style={{ marginBottom: 8, fontWeight: 640 }}>Recent activity</div>
              <div className="stack" style={{ gap: 9 }}>
                <div className="row" style={{ gap: 9 }}><span className="dot g" /><span className="tiny">{active.today}</span></div>
                <div className="row" style={{ gap: 9 }}><span className="dot b" /><span className="tiny">Coordinating with the wider workforce</span></div>
                <div className="row" style={{ gap: 9 }}><span className="dot c" /><span className="tiny">No exceptions raised for you</span></div>
              </div>
            </div>
          </div>
        ) : null}
      </Drawer>

      <Modal
        open={configuring}
        onClose={() => setConfiguring(false)}
        title="Configure workforce"
        sub="Working hours, escalation and channels"
        wide
        footer={
          <>
            <button className="btn sm" onClick={() => setConfiguring(false)}>Cancel</button>
            <button className="btn primary sm" onClick={() => { toast("Workforce configuration saved", "g"); setConfiguring(false); }}>Save changes</button>
          </>
        }
      >
        <div className="stack" style={{ gap: 13 }}>
          <label className="stack" style={{ gap: 5 }}><span className="tiny muted">Operating hours</span><input className="input" placeholder="e.g. 24/7" /></label>
          <label className="stack" style={{ gap: 5 }}><span className="tiny muted">Escalation contact</span><input className="input" placeholder="Who gets escalations" /></label>
          <label className="stack" style={{ gap: 5 }}><span className="tiny muted">Enquiry channels</span><input className="input" placeholder="e.g. Calls, WhatsApp, Web" /></label>
        </div>
      </Modal>
    </>
  );
}

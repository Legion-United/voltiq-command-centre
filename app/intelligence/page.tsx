"use client";
import * as React from "react";
import { PageHead, Card, Pill } from "@/components/ui";
import { Brain, Route, Chart, Package, Doc, Send, Bolt, Shield, Check } from "@/components/icons";
import { useToast } from "@/components/interactive";

const PROMPTS = [
  { icon: "route", t: "Which crews have slack on Thursday?" },
  { icon: "chart", t: "Summarise this month against target" },
  { icon: "package", t: "What materials are short for next week's jobs?" },
  { icon: "doc", t: "Draft the warehouse quote follow-up" },
];
const PI: Record<string, React.ReactNode> = {
  route: <Route width={16} height={16} />, chart: <Chart width={16} height={16} />,
  package: <Package width={16} height={16} />, doc: <Doc width={16} height={16} />,
};

export default function IntelligencePage() {
  const toast = useToast();
  const [msg, setMsg] = React.useState("");

  const send = () => {
    toast(msg.trim() ? `Added to workspace: “${msg.trim()}”` : "Added to workspace", "g");
    setMsg("");
  };

  return (
    <>
      <PageHead eyebrow="Intelligence" title="Your private AI bench" sub="A secure workspace for the whole firm, grounded in your jobs, crews and documents. Nothing leaves the business.">
        <span className="pill g"><Shield width={13} height={13} /> Private & GDPR-safe</span>
      </PageHead>

      <div className="grid" style={{ gridTemplateColumns: "1.5fr 1fr", alignItems: "start" }}>
        <Card title="Workspace" sub="Ask anything about the operation" icon={<Brain width={17} height={17} />}>
          <div className="stack" style={{ gap: 12 }}>
            <div className="row" style={{ gap: 10, justifyContent: "flex-end" }}>
              <div style={{ background: "var(--cobalt)", color: "#fff", padding: "10px 13px", borderRadius: "12px 12px 3px 12px", fontSize: 13, maxWidth: "78%" }}>
                We have an emergency in Redcliffe. Who is nearest and qualified for a 3-phase fault?
              </div>
            </div>
            <div className="row" style={{ gap: 10, alignItems: "flex-start" }}>
              <span className="avatar sm" style={{ background: "linear-gradient(135deg,var(--cobalt),#25e0d0)", color: "#fff", borderColor: "transparent" }}><Bolt width={15} height={15} /></span>
              <div style={{ background: "var(--surface-2)", border: "1px solid var(--line)", padding: "12px 14px", borderRadius: "12px 12px 12px 3px", fontSize: 13, maxWidth: "82%" }}>
                <p style={{ marginBottom: 8 }}>Callum Reid is closest, 6 minutes out, and holds 3-phase and fault-finding. Liam is already on site but at 95% utilisation today. I have flagged Callum for dispatch.</p>
                <div className="row" style={{ gap: 8, marginTop: 4 }}>
                  <button className="btn primary sm" onClick={() => toast("Callum dispatched to the Redcliffe emergency", "g")}><Send width={13} height={13} /> Dispatch Callum</button>
                  <button className="btn ghost sm" onClick={() => toast("Showing both crews side by side", "b")}>See both</button>
                  <Pill tone="c">Live from Dispatch</Pill>
                </div>
              </div>
            </div>
          </div>
          <div className="row" style={{ gap: 8, marginTop: 18 }}>
            <div className="searchbox" style={{ flex: 1, minWidth: 0 }}>
              <Brain width={15} height={15} />
              <input
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") send(); }}
                placeholder="Ask about crews, jobs, cash or the regs…"
                style={{ border: "none", background: "transparent", outline: "none", width: "100%", color: "inherit", font: "inherit" }}
              />
            </div>
            <button className="btn primary" onClick={send}><Send width={15} height={15} /></button>
          </div>
        </Card>

        <div className="stack" style={{ gap: 16 }}>
          <Card title="Quick starts" icon={<Bolt width={17} height={17} />}>
            <div className="stack" style={{ gap: 9 }}>
              {PROMPTS.map((p, i) => (
                <button key={i} className="row" style={{ gap: 11, padding: "11px 12px", border: "1px solid var(--line)", borderRadius: 10, background: "var(--surface-2)", textAlign: "left", width: "100%" }} onClick={() => toast(`Added to workspace: “${p.t}”`, "g")}>
                  <span className="avatar sm" style={{ background: "var(--cyan-soft)", color: "var(--cyan-ink)", borderColor: "transparent" }}>{PI[p.icon]}</span>
                  <span style={{ fontSize: 12.5, fontWeight: 550 }}>{p.t}</span>
                </button>
              ))}
            </div>
          </Card>

          <Card title="What it can reach" sub="Grounded in your own data" icon={<Shield width={17} height={17} />}>
            <div className="stack" style={{ gap: 8 }}>
              {["Live dispatch, crews and utilisation", "Every project, quote and invoice", "The Vault: drawings, certs, RAMS", "BS 7671 and current regulations"].map((t, i) => (
                <div key={i} className="row" style={{ gap: 9, fontSize: 12.5 }}><Check width={15} height={15} color="var(--ok)" /> {t}</div>
              ))}
            </div>
            <div className="notice g" style={{ marginTop: 12 }}><Shield /><div className="tiny">Every engineer gets a private workspace. Nothing is shared with a public model, and the intelligence updates as better models arrive.</div></div>
          </Card>
        </div>
      </div>
    </>
  );
}

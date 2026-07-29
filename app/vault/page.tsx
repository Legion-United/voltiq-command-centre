"use client";
import { PageHead, Card, Stat, Pill } from "@/components/ui";
import { Vault, Search, File, Shield, Camera, Doc, Bolt, ArrowRight, Send } from "@/components/icons";

const CATS = [
  { n: "Regulations & codes", c: 118, i: <Shield width={18} height={18} /> },
  { n: "Client & site histories", c: 486, i: <Doc width={18} height={18} /> },
  { n: "Drawings & as-builts", c: 342, i: <Camera width={18} height={18} /> },
  { n: "Certificates & test results", c: 921, i: <Shield width={18} height={18} /> },
  { n: "Manuals & datasheets", c: 1240, i: <File width={18} height={18} /> },
  { n: "Method statements & RAMS", c: 176, i: <Doc width={18} height={18} /> },
];
const recent = [
  { n: "Severn Logistics — 3-phase load schedule", cat: "Drawings", when: "opened today" },
  { n: "BS 7671 — EV charging (Section 722)", cat: "Regulations", when: "opened today" },
  { n: "Rosewood Care — fire alarm zone plan", cat: "Drawings", when: "yesterday" },
  { n: "RAMS template — commercial fit-out", cat: "RAMS", when: "yesterday" },
  { n: "Hager 3-phase distribution range", cat: "Manuals", when: "2 days ago" },
];
const catIcon: Record<string, React.ReactNode> = {
  Regulations: <Shield width={16} height={16} />, Drawings: <Camera width={16} height={16} />,
  RAMS: <Doc width={16} height={16} />, Manuals: <File width={16} height={16} />,
};

export default function VaultPage() {
  return (
    <>
      <PageHead eyebrow="The Vault" title="Everything, findable" sub="Every drawing, certificate, test result and method statement the firm has produced. Any engineer, any site, one search away.">
        <span className="pill line">3,283 documents</span>
        <button className="btn primary"><File /> Upload</button>
      </PageHead>

      <div className="card pad" style={{ marginBottom: 16, background: "linear-gradient(135deg,#0a1230,#0a2e2b)", color: "#fff", border: "none" }}>
        <div className="row" style={{ gap: 10, marginBottom: 14 }}>
          <span className="pill c" style={{ fontSize: 10.5 }}><Bolt width={12} height={12} /> Ask in plain English</span>
        </div>
        <div className="row" style={{ gap: 10 }}>
          <div className="searchbox" style={{ flex: 1, minWidth: 0, background: "#ffffff12", border: "1px solid #ffffff22", color: "#c5cbf0" }}>
            <Search width={16} height={16} />
            <span>What RCD type did we use on the last care home job?</span>
          </div>
          <button className="btn volt"><Send width={15} height={15} /> Search</button>
        </div>
        <div className="row wrap" style={{ gap: 8, marginTop: 14 }}>
          {["Show all as-builts for Severn Logistics", "Which sites are due a periodic re-test?", "Find the RAMS for commercial fit-outs"].map((q, i) => (
            <span key={i} className="pill" style={{ background: "#ffffff12", color: "#cfd4f0", cursor: "pointer" }}>{q}</span>
          ))}
        </div>
      </div>

      <div className="grid g-4" style={{ marginBottom: 16 }}>
        <Stat label="Documents" value="3,283" icon={<File />} variant="accent" />
        <Stat label="Certificates" value="921" icon={<Shield />} variant="cyan" />
        <Stat label="Drawings" value="342" icon={<Camera />} />
        <Stat label="Client histories" value="486" icon={<Doc />} />
      </div>

      <div className="grid" style={{ gridTemplateColumns: "1.4fr 1fr", alignItems: "start" }}>
        <Card title="Browse the vault" icon={<Vault width={17} height={17} />}>
          <div className="grid g-3">
            {CATS.map((c) => (
              <div key={c.n} style={{ padding: 15, border: "1px solid var(--line)", borderRadius: 12, background: "var(--surface-2)" }}>
                <div className="spread">
                  <span className="avatar sm" style={{ background: "var(--cyan-soft)", color: "var(--cyan-ink)", borderColor: "transparent" }}>{c.i}</span>
                  <ArrowRight width={15} height={15} color="var(--faint)" />
                </div>
                <div style={{ fontSize: 12.5, fontWeight: 640, marginTop: 11 }}>{c.n}</div>
                <div className="tiny muted">{c.c.toLocaleString()} items</div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Recently opened" sub="Across the team" icon={<File width={17} height={17} />}>
          <div className="stack" style={{ gap: 0 }}>
            {recent.map((r, i) => (
              <div key={i} className="row" style={{ gap: 11, padding: "11px 0", borderBottom: i < recent.length - 1 ? "1px dashed var(--line)" : "none" }}>
                <span className="avatar sm" style={{ background: "var(--surface-3)", color: "var(--ink-2)", borderColor: "transparent" }}>{catIcon[r.cat]}</span>
                <div className="grow">
                  <div style={{ fontSize: 12.5, fontWeight: 600 }}>{r.n}</div>
                  <div className="tiny muted">{r.cat}</div>
                </div>
                <span className="tiny muted" style={{ whiteSpace: "nowrap" }}>{r.when}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}

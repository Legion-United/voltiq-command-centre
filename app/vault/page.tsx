"use client";
import * as React from "react";
import { PageHead, Card, Stat, Pill } from "@/components/ui";
import { Vault, Search, File, Shield, Camera, Doc, Bolt, ArrowRight, Send } from "@/components/icons";
import { useToast, Drawer, Modal } from "@/components/interactive";

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
type Recent = (typeof recent)[number];

export default function VaultPage() {
  const toast = useToast();
  const [query, setQuery] = React.useState("");
  const [doc, setDoc] = React.useState<Recent | null>(null);
  const [uploading, setUploading] = React.useState(false);

  const q = query.trim().toLowerCase();
  const cats = CATS.filter((c) => !q || c.n.toLowerCase().includes(q));
  const recents = recent.filter((r) => !q || r.n.toLowerCase().includes(q) || r.cat.toLowerCase().includes(q));

  return (
    <>
      <PageHead eyebrow="The Vault" title="Everything, findable" sub="Every drawing, certificate, test result and method statement the firm has produced. Any engineer, any site, one search away.">
        <span className="pill line">3,283 documents</span>
        <button className="btn primary" onClick={() => setUploading(true)}><File /> Upload</button>
      </PageHead>

      <div className="card pad" style={{ marginBottom: 16, background: "linear-gradient(135deg,#0a1230,#0a2e2b)", color: "#fff", border: "none" }}>
        <div className="row" style={{ gap: 10, marginBottom: 14 }}>
          <span className="pill c" style={{ fontSize: 10.5 }}><Bolt width={12} height={12} /> Ask in plain English</span>
        </div>
        <div className="row" style={{ gap: 10 }}>
          <div className="searchbox" style={{ flex: 1, minWidth: 0, background: "#ffffff12", border: "1px solid #ffffff22", color: "#c5cbf0" }}>
            <Search width={16} height={16} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What RCD type did we use on the last care home job?"
              style={{ border: "none", background: "transparent", outline: "none", width: "100%", color: "inherit", font: "inherit" }}
            />
          </div>
          <button className="btn volt" onClick={() => toast(query.trim() ? `Searching the Vault for “${query.trim()}”` : "Searching the Vault", "b")}><Send width={15} height={15} /> Search</button>
        </div>
        <div className="row wrap" style={{ gap: 8, marginTop: 14 }}>
          {["Show all as-builts for Severn Logistics", "Which sites are due a periodic re-test?", "Find the RAMS for commercial fit-outs"].map((qq, i) => (
            <span key={i} className="pill" style={{ background: "#ffffff12", color: "#cfd4f0", cursor: "pointer" }} onClick={() => toast(`Asked: “${qq}”`, "b")}>{qq}</span>
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
            {cats.map((c) => (
              <div key={c.n} className="clickable" style={{ padding: 15, border: "1px solid var(--line)", borderRadius: 12, background: "var(--surface-2)" }} onClick={() => toast(`Opening ${c.n}…`, "b")}>
                <div className="spread">
                  <span className="avatar sm" style={{ background: "var(--cyan-soft)", color: "var(--cyan-ink)", borderColor: "transparent" }}>{c.i}</span>
                  <ArrowRight width={15} height={15} color="var(--faint)" />
                </div>
                <div style={{ fontSize: 12.5, fontWeight: 640, marginTop: 11 }}>{c.n}</div>
                <div className="tiny muted">{c.c.toLocaleString()} items</div>
              </div>
            ))}
            {cats.length === 0 ? <div className="tiny muted" style={{ padding: 8 }}>No categories match “{query}”.</div> : null}
          </div>
        </Card>

        <Card title="Recently opened" sub="Across the team" icon={<File width={17} height={17} />}>
          <div className="stack" style={{ gap: 0 }}>
            {recents.map((r, i) => (
              <div key={i} className="row clickable" style={{ gap: 11, padding: "11px 0", borderBottom: i < recents.length - 1 ? "1px dashed var(--line)" : "none" }} onClick={() => setDoc(r)}>
                <span className="avatar sm" style={{ background: "var(--surface-3)", color: "var(--ink-2)", borderColor: "transparent" }}>{catIcon[r.cat]}</span>
                <div className="grow">
                  <div style={{ fontSize: 12.5, fontWeight: 600 }}>{r.n}</div>
                  <div className="tiny muted">{r.cat}</div>
                </div>
                <span className="tiny muted" style={{ whiteSpace: "nowrap" }}>{r.when}</span>
              </div>
            ))}
            {recents.length === 0 ? <div className="tiny muted" style={{ padding: 8 }}>Nothing matches “{query}”.</div> : null}
          </div>
        </Card>
      </div>

      <Drawer
        open={!!doc}
        onClose={() => setDoc(null)}
        title={doc?.n}
        sub={doc ? `${doc.cat} · ${doc.when}` : undefined}
        footer={doc ? (
          <>
            <button className="btn primary sm" onClick={() => { toast("Document opened in the viewer", "b"); setDoc(null); }}>Open</button>
            <button className="btn sm" onClick={() => { toast("Share link copied", "g"); setDoc(null); }}>Share</button>
          </>
        ) : null}
      >
        {doc ? (
          <div className="stack" style={{ gap: 14 }}>
            <div className="kv"><span className="k">Category</span><span className="v">{doc.cat}</span></div>
            <div className="kv"><span className="k">Last opened</span><span className="v">{doc.when}</span></div>
            <div style={{ border: "1px solid var(--line)", borderRadius: 12, background: "var(--surface-2)", padding: 18, minHeight: 200 }}>
              <div className="row" style={{ gap: 9, marginBottom: 12 }}><span className="avatar sm" style={{ background: "var(--surface-3)", color: "var(--ink-2)", borderColor: "transparent" }}>{catIcon[doc.cat] || <File width={16} height={16} />}</span><b style={{ fontSize: 13 }}>Preview</b></div>
              <div className="stack" style={{ gap: 8 }}>
                <div style={{ height: 10, background: "var(--surface-3)", borderRadius: 4, width: "80%" }} />
                <div style={{ height: 10, background: "var(--surface-3)", borderRadius: 4, width: "95%" }} />
                <div style={{ height: 10, background: "var(--surface-3)", borderRadius: 4, width: "70%" }} />
                <div style={{ height: 10, background: "var(--surface-3)", borderRadius: 4, width: "88%" }} />
                <div style={{ height: 10, background: "var(--surface-3)", borderRadius: 4, width: "60%" }} />
              </div>
            </div>
            <div className="tiny muted">Indexed and searchable. The Knowledge Expert can answer questions grounded in this document.</div>
          </div>
        ) : null}
      </Drawer>

      <Modal
        open={uploading}
        onClose={() => setUploading(false)}
        title="Upload to the Vault"
        sub="Add a document, drawing or certificate"
        wide
        footer={
          <>
            <button className="btn sm" onClick={() => setUploading(false)}>Cancel</button>
            <button className="btn primary sm" onClick={() => { toast("Document uploaded — indexing now", "g"); setUploading(false); }}>Upload</button>
          </>
        }
      >
        <div className="stack" style={{ gap: 13 }}>
          <label className="stack" style={{ gap: 5 }}><span className="tiny muted">Document name</span><input className="input" placeholder="e.g. Clifton Dental — as-built" /></label>
          <label className="stack" style={{ gap: 5 }}><span className="tiny muted">Category</span><input className="input" placeholder="e.g. Drawings & as-builts" /></label>
          <label className="stack" style={{ gap: 5 }}><span className="tiny muted">Linked client / site</span><input className="input" placeholder="Client or project" /></label>
          <div style={{ border: "1px dashed var(--line)", borderRadius: 12, padding: 22, textAlign: "center", color: "var(--muted)", fontSize: 12.5 }}>Drag a file here, or click to browse</div>
        </div>
      </Modal>
    </>
  );
}

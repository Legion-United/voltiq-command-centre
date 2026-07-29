"use client";
import * as React from "react";
import { PageHead, Card, Pill, Stat, Meter } from "@/components/ui";
import { eur } from "@/components/ui";
import { projects, stageCounts } from "@/lib/data";
import type { Project } from "@/lib/data";
import { Layers, Plus, Bolt, Wrench } from "@/components/icons";
import { useToast, Drawer, Modal, Segmented } from "@/components/interactive";

const healthTone: Record<string, "g" | "y" | "co"> = { g: "g", y: "y", r: "co" };
const healthText: Record<string, string> = { g: "On track", y: "Watch", r: "At risk" };
const FILTERS = ["All", "On track", "At risk"] as const;

export default function ProjectsPage() {
  const toast = useToast();
  const total = projects.reduce((a, p) => a + p.value, 0);
  const [filter, setFilter] = React.useState<string>("All");
  const [active, setActive] = React.useState<Project | null>(null);
  const [creating, setCreating] = React.useState(false);

  const shown = projects.filter((p) =>
    filter === "All" ? true : filter === "On track" ? p.health === "g" : p.health !== "g"
  );

  return (
    <>
      <PageHead eyebrow="The Coordinator" title="Projects" sub="Every live project across the firm, each on the same eight-stage journey. When one stage slows, the board shows it before it becomes a problem.">
        <span className="pill line">{projects.length} shown · {eur(total)}</span>
        <button className="btn primary" onClick={() => setCreating(true)}><Plus /> New project</button>
      </PageHead>

      <Card title="Pipeline by stage" sub="37 jobs across 8 stages" icon={<Layers width={17} height={17} />} style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 6, overflowX: "auto", alignItems: "flex-end", paddingBottom: 4 }}>
          {stageCounts.map((s, i) => (
            <div key={s.idx} className="row" style={{ gap: 6, flex: "none" }}>
              <div className="stack" style={{ alignItems: "center", gap: 8, minWidth: 84 }}>
                <div style={{ width: "100%", maxWidth: 60, height: 8 + s.n * 9, background: i === 5 ? "linear-gradient(180deg,var(--cobalt),var(--cyan))" : "var(--surface-3)", borderRadius: 8 }} />
                <span className="idx">{s.idx}</span>
                <span className="tiny" style={{ fontWeight: 620, textAlign: "center" }}>{s.name}</span>
                <span className="tiny muted">{s.n} jobs</span>
              </div>
              {i < stageCounts.length - 1 ? <span className={`wire ${i < 5 ? "live" : ""}`} style={{ minWidth: 18, alignSelf: "center" }} /> : null}
            </div>
          ))}
        </div>
      </Card>

      <div className="spread" style={{ marginBottom: 12 }}>
        <span className="tiny muted">{shown.length} of {projects.length} projects</span>
        <Segmented options={[...FILTERS]} value={filter} onChange={setFilter} />
      </div>

      <div className="grid g-2">
        {shown.map((p) => (
          <div className="card pad clickable" key={p.id} onClick={() => setActive(p)}>
            <div className="spread" style={{ alignItems: "flex-start" }}>
              <div>
                <div className="row" style={{ gap: 8 }}>
                  <span className="mono tiny muted">{p.id}</span>
                  <Pill tone={healthTone[p.health]}><span className={`dot ${p.health === "r" ? "co" : p.health}`} /> {healthText[p.health]}</Pill>
                </div>
                <h3 style={{ fontSize: 15.5, marginTop: 8 }}>{p.name}</h3>
                <div className="tiny muted" style={{ marginTop: 2 }}>{p.client}</div>
              </div>
              <div className="stack" style={{ alignItems: "flex-end" }}>
                <b style={{ fontSize: 17 }} className="tnum">{eur(p.value)}</b>
                <span className="tiny muted">due {p.due}</span>
              </div>
            </div>

            <div className="spread" style={{ marginTop: 14, marginBottom: 6 }}>
              <span className="tiny muted">Stage {p.stage}/8 · {p.stageName}</span>
              <span className="tiny muted tnum">{p.progress}%</span>
            </div>
            <Meter value={p.progress} variant={p.health === "r" ? "r" : p.health === "y" ? "y" : "volt"} />

            <div className="spread" style={{ marginTop: 13 }}>
              <div className="stackrow">
                {p.crew.map((c) => <span key={c} className="avatar sm">{c}</span>)}
              </div>
              <button className="btn sm ghost" onClick={(e) => { e.stopPropagation(); setActive(p); }}><Wrench width={13} height={13} /> Open</button>
            </div>
          </div>
        ))}
      </div>

      <Drawer
        open={!!active}
        onClose={() => setActive(null)}
        title={active?.name}
        sub={active ? `${active.id} · ${active.client}` : undefined}
        footer={active ? (
          <>
            <button className="btn primary sm" onClick={() => { toast(`${active.name} advanced to stage ${Math.min(8, active.stage + 1)}`, "g"); setActive(null); }}>Advance stage</button>
            <button className="btn sm" onClick={() => { toast("Project files opened in the Vault", "b"); setActive(null); }}>Open files</button>
          </>
        ) : null}
      >
        {active ? (
          <div className="stack" style={{ gap: 14 }}>
            <div className="kv"><span className="k">Client</span><span className="v">{active.client}</span></div>
            <div className="kv"><span className="k">Value</span><span className="v">{eur(active.value)}</span></div>
            <div className="kv"><span className="k">Stage</span><span className="v">{active.stage}/8 · {active.stageName}</span></div>
            <div className="kv"><span className="k">Crew</span><span className="v">{active.crew.join(", ")}</span></div>
            <div className="kv"><span className="k">Due</span><span className="v">{active.due}</span></div>
            <div className="kv"><span className="k">Health</span><span className="v"><Pill tone={healthTone[active.health]}>{healthText[active.health]}</Pill></span></div>
            <div><div className="spread" style={{ marginBottom: 6 }}><span className="tiny muted">Progress</span><span className="tiny muted tnum">{active.progress}%</span></div><Meter value={active.progress} variant={active.health === "r" ? "r" : active.health === "y" ? "y" : "volt"} /></div>
            <div>
              <div className="tiny muted" style={{ marginBottom: 8, fontWeight: 640 }}>Eight-stage journey</div>
              <div className="stack" style={{ gap: 8 }}>
                {stageCounts.map((s) => (
                  <div key={s.idx} className="row" style={{ gap: 9 }}>
                    <span className={`dot ${s.idx < active.stage ? "g" : s.idx === active.stage ? "b" : ""}`} style={s.idx > active.stage ? { background: "var(--surface-3)" } : undefined} />
                    <span className="tiny" style={{ fontWeight: s.idx === active.stage ? 640 : 400, opacity: s.idx > active.stage ? .55 : 1 }}>{s.idx}. {s.name}</span>
                    {s.idx < active.stage ? <span className="tiny muted" style={{ marginLeft: "auto" }}>done</span> : s.idx === active.stage ? <span className="tiny" style={{ marginLeft: "auto", color: "var(--cobalt)" }}>current</span> : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </Drawer>

      <Modal
        open={creating}
        onClose={() => setCreating(false)}
        title="New project"
        sub="Add a project to the eight-stage pipeline"
        wide
        footer={
          <>
            <button className="btn sm" onClick={() => setCreating(false)}>Cancel</button>
            <button className="btn primary sm" onClick={() => { toast("Project created — added at stage 1", "g"); setCreating(false); }}>Create project</button>
          </>
        }
      >
        <div className="stack" style={{ gap: 13 }}>
          <label className="stack" style={{ gap: 5 }}><span className="tiny muted">Project name</span><input className="input" placeholder="e.g. Clifton surgery refit" /></label>
          <label className="stack" style={{ gap: 5 }}><span className="tiny muted">Client</span><input className="input" placeholder="Client or company" /></label>
          <div className="row" style={{ gap: 10 }}>
            <label className="stack grow" style={{ gap: 5 }}><span className="tiny muted">Estimated value</span><input className="input" placeholder="£" /></label>
            <label className="stack grow" style={{ gap: 5 }}><span className="tiny muted">Target completion</span><input className="input" placeholder="e.g. 30 Aug" /></label>
          </div>
          <label className="stack" style={{ gap: 5 }}><span className="tiny muted">Lead engineer</span><input className="input" placeholder="Assign a crew lead" /></label>
        </div>
      </Modal>
    </>
  );
}

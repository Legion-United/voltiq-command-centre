"use client";
import { PageHead, Card, Pill, Stat, Meter } from "@/components/ui";
import { eur } from "@/components/ui";
import { projects, stageCounts } from "@/lib/data";
import { Layers, Plus, Bolt, Wrench } from "@/components/icons";

const healthTone: Record<string, "g" | "y" | "co"> = { g: "g", y: "y", r: "co" };
const healthText: Record<string, string> = { g: "On track", y: "Watch", r: "At risk" };

export default function ProjectsPage() {
  const total = projects.reduce((a, p) => a + p.value, 0);
  return (
    <>
      <PageHead eyebrow="The Coordinator" title="Projects" sub="Every live project across the firm, each on the same eight-stage journey. When one stage slows, the board shows it before it becomes a problem.">
        <span className="pill line">{projects.length} shown · {eur(total)}</span>
        <button className="btn primary"><Plus /> New project</button>
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

      <div className="grid g-2">
        {projects.map((p) => (
          <div className="card pad" key={p.id}>
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
              <button className="btn sm ghost"><Wrench width={13} height={13} /> Open</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

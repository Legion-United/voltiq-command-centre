import * as React from "react";
import { ArrowUp, ArrowDown } from "./icons";

/* ---------------- Page header ---------------- */
export function PageHead({ eyebrow, title, sub, children }: { eyebrow?: string; title: string; sub?: string; children?: React.ReactNode }) {
  return (
    <div className="page-head fadein">
      <div>
        {eyebrow ? <div className="eyebrow">{eyebrow}</div> : null}
        <h1>{title}</h1>
        {sub ? <p>{sub}</p> : null}
      </div>
      {children ? <div className="ph-actions">{children}</div> : null}
    </div>
  );
}

/* ---------------- Card ---------------- */
export function Card({ title, sub, right, icon, children, pad, className, style }: {
  title?: string; sub?: string; right?: React.ReactNode; icon?: React.ReactNode;
  children: React.ReactNode; pad?: boolean; className?: string; style?: React.CSSProperties;
}) {
  return (
    <section className={`card ${className || ""}`} style={style}>
      {title ? (
        <div className="card-h">
          {icon}
          <div>
            <h3>{title}</h3>
            {sub ? <div className="sub">{sub}</div> : null}
          </div>
          {right ? <div className="right">{right}</div> : null}
        </div>
      ) : null}
      <div className={pad ? "" : ""} style={{ padding: pad === false ? 0 : title ? 18 : 18 }}>{children}</div>
    </section>
  );
}

/* ---------------- Stat tile ---------------- */
export function Stat({ label, value, unit, delta, deltaDir, icon, spark, variant }: {
  label: string; value: string | number; unit?: string;
  delta?: string; deltaDir?: "up" | "down" | "flat"; icon?: React.ReactNode;
  spark?: number[]; variant?: "accent" | "volt";
}) {
  return (
    <div className={`stat ${variant || ""}`}>
      <div className="lab">{icon}{label}</div>
      <div className="val tnum">{value}{unit ? <small> {unit}</small> : null}</div>
      {delta ? (
        <div className={`delta ${deltaDir || "flat"}`}>
          {deltaDir === "up" ? <ArrowUp width={12} height={12} /> : deltaDir === "down" ? <ArrowDown width={12} height={12} /> : null}
          {delta}
        </div>
      ) : null}
      {spark ? <div className="spark"><Sparkline data={spark} w={72} h={26} color={variant ? "#ffffffcc" : "var(--cobalt)"} /></div> : null}
    </div>
  );
}

/* ---------------- Meter ---------------- */
export function Meter({ value, variant }: { value: number; variant?: "volt" | "g" | "y" | "r" }) {
  return <div className="meter"><span className={variant || ""} style={{ width: `${Math.max(0, Math.min(100, value))}%` }} /></div>;
}

/* ---------------- Ring ---------------- */
export function Ring({ pct, color, label }: { pct: number; color?: string; label?: string }) {
  return <div className="ring" style={{ ["--p" as string]: pct, ["--c" as string]: color || "var(--cobalt)" }}><b>{label ?? `${pct}%`}</b></div>;
}

/* ---------------- Sparkline ---------------- */
export function Sparkline({ data, w = 120, h = 34, color = "var(--cobalt)", fill }: { data: number[]; w?: number; h?: number; color?: string; fill?: boolean }) {
  if (!data.length) return null;
  const min = Math.min(...data), max = Math.max(...data);
  const rng = max - min || 1;
  const step = w / (data.length - 1 || 1);
  const pts = data.map((d, i) => [i * step, h - 3 - ((d - min) / rng) * (h - 6)]);
  const line = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  const area = `${line} L${w} ${h} L0 ${h} Z`;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ overflow: "visible" }}>
      {fill ? <path d={area} fill={color} opacity={0.12} /> : null}
      <path d={line} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r={2.6} fill={color} />
    </svg>
  );
}

/* ---------------- Bar chart ---------------- */
export function BarChart({ data, h = 150, color = "var(--cobalt)", accentLast }: { data: { label: string; value: number; hl?: boolean }[]; h?: number; color?: string; accentLast?: boolean }) {
  const max = Math.max(...data.map((d) => d.value)) || 1;
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: h }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 7, height: "100%", justifyContent: "flex-end" }}>
          <div className="tnum" style={{ fontSize: 10.5, color: "var(--muted)", fontWeight: 600 }}>{d.value}</div>
          <div style={{
            width: "100%", maxWidth: 34, height: `${(d.value / max) * 100}%`, minHeight: 4, borderRadius: "6px 6px 3px 3px",
            background: d.hl || (accentLast && i === data.length - 1) ? "linear-gradient(180deg,var(--cobalt),#6a8bff)" : color,
            opacity: d.hl || (accentLast && i === data.length - 1) ? 1 : 0.32,
          }} />
          <div style={{ fontSize: 10.5, color: "var(--faint)" }}>{d.label}</div>
        </div>
      ))}
    </div>
  );
}

/* ---------------- Area chart ---------------- */
export function AreaChart({ data, h = 180, color = "var(--cobalt)", labels }: { data: number[]; h?: number; color?: string; labels?: string[] }) {
  const w = 640;
  const min = Math.min(...data, 0), max = Math.max(...data);
  const rng = max - min || 1;
  const step = w / (data.length - 1 || 1);
  const pts = data.map((d, i) => [i * step, h - 22 - ((d - min) / rng) * (h - 40)]);
  const line = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  const area = `${line} L${w} ${h - 22} L0 ${h - 22} Z`;
  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ display: "block" }}>
      <defs>
        <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((g) => (<line key={g} x1="0" x2={w} y1={(h - 22) * g + 8} y2={(h - 22) * g + 8} stroke="var(--line)" strokeWidth="1" />))}
      <path d={area} fill="url(#ag)" />
      <path d={line} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="2.5" fill={color} />)}
      {labels ? labels.map((l, i) => (<text key={i} x={i * step} y={h - 4} fontSize="10" fill="var(--faint)" textAnchor={i === 0 ? "start" : i === labels.length - 1 ? "end" : "middle"}>{l}</text>)) : null}
    </svg>
  );
}

/* ---------------- Pill / Dot ---------------- */
export function Pill({ tone, children }: { tone?: "b" | "g" | "y" | "r" | "v" | "line"; children: React.ReactNode }) {
  return <span className={`pill ${tone || ""}`}>{children}</span>;
}
export function Dot({ tone, pulse }: { tone: "g" | "y" | "r" | "b"; pulse?: boolean }) {
  return <span className={`dot ${tone} ${pulse ? "pulse" : ""}`} />;
}
export function Avatar({ name, tone, size }: { name: string; tone?: string; size?: "sm" | "lg" }) {
  const initials = name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  return <div className={`avatar ${size || ""}`} style={tone ? { background: tone, color: "#fff", borderColor: "transparent" } : undefined}>{initials}</div>;
}

/* money format */
export const eur = (n: number) => "€" + n.toLocaleString("en-GB", { maximumFractionDigits: 0 });
export const eur2 = (n: number) => "€" + n.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

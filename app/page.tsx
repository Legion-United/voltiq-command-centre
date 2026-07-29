import Link from "next/link";
import { Bolt, ArrowRight, Map, Route, Package, Chart, Check } from "@/components/icons";

const PILLARS = [
  { t: "Command", d: "One control room for dispatch, planning, projects, cash and procurement. The whole operation on one screen." },
  { t: "Intelligence", d: "A private AI bench for every engineer. Regs, drawings and reports, answered on site, kept in-house." },
  { t: "Vault", d: "Every drawing, cert, manual and client history the firm has produced, searchable in seconds." },
  { t: "Connect", d: "Keeps your accounting, planning and phone systems. LEGION removes the friction between them." },
];

const SPECIALISTS = [
  { i: Route, t: "The Coordinator", d: "Re-routes crews, chases deadlines and updates clients so the office stops making phone calls." },
  { i: Map, t: "The Dispatcher", d: "Sees every van and job live, and sends the nearest qualified engineer to the emergency." },
  { i: Package, t: "The Procurement Assistant", d: "Watches stock across vans and depot, and raises the purchase order before a job stalls." },
  { i: Chart, t: "The Analyst", d: "A full operational briefing on the director's desk every morning at 06:30." },
];

export default function Landing() {
  return (
    <div className="landing">
      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "20px 26px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 34, height: 34, borderRadius: 9, display: "grid", placeItems: "center", background: "linear-gradient(135deg,var(--cobalt),#25e0d0)", color: "#fff" }}><Bolt width={18} height={18} /></div>
          <div>
            <b style={{ letterSpacing: "0.14em", fontSize: 15 }}>VOLTIQ</b>
            <span style={{ color: "var(--muted)", fontSize: 12, marginLeft: 8 }}>Electrical</span>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <Link href="/command" className="btn primary">Enter the command centre <ArrowRight /></Link>
          </div>
        </div>
      </div>

      <section style={{ position: "relative", overflow: "hidden" }}>
        <div className="hero-glow" />
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "64px 26px 40px", position: "relative", zIndex: 2 }}>
          <span className="pill c" style={{ marginBottom: 18 }}><Bolt width={13} height={13} /> Powered by LEGION OS</span>
          <h1 style={{ fontSize: 56, lineHeight: 1.02, letterSpacing: "-0.035em", maxWidth: 840, marginTop: 14 }}>
            Fourteen engineers, nine vans,<br />one control room.
          </h1>
          <p style={{ fontSize: 17, color: "var(--muted)", maxWidth: 640, marginTop: 20, lineHeight: 1.6 }}>
            Voltiq is a growing electrical contractor. As it grew, the office spent its day chasing status
            updates, re-routing vans and hunting for documents. The command centre ends that. Every crew, job,
            quote and invoice is visible in one place, coordinated by a digital workforce.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 30, flexWrap: "wrap" }}>
            <Link href="/command" className="btn primary" style={{ padding: "12px 20px", fontSize: 14 }}>Open the command centre <ArrowRight /></Link>
            <Link href="/dispatch" className="btn" style={{ padding: "12px 20px", fontSize: 14 }}>See live dispatch</Link>
          </div>
          <div style={{ display: "flex", gap: 26, marginTop: 34, flexWrap: "wrap", color: "var(--muted)", fontSize: 13 }}>
            <span className="row" style={{ gap: 7 }}><Check width={15} height={15} /> 96% jobs on time</span>
            <span className="row" style={{ gap: 7 }}><Check width={15} height={15} /> 84% crew utilisation</span>
            <span className="row" style={{ gap: 7 }}><Check width={15} height={15} /> 0 missed enquiries</span>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "20px 26px 10px" }}>
        <div className="grid g-4">
          {PILLARS.map((p) => (
            <div className="card pad" key={p.t}>
              <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--cyan)", fontWeight: 700 }}>{p.t}</div>
              <p style={{ marginTop: 9, fontSize: 13, color: "var(--muted)", lineHeight: 1.55 }}>{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "36px 26px 20px" }}>
        <h2 style={{ fontSize: 24 }}>The workforce behind the command centre</h2>
        <p style={{ color: "var(--muted)", marginTop: 8, maxWidth: 560, fontSize: 14 }}>Ten digital specialists coordinate the operation, so the people can stay on the tools.</p>
        <div className="grid g-4" style={{ marginTop: 20 }}>
          {SPECIALISTS.map((s) => {
            const Icon = s.i;
            return (
              <div className="card pad" key={s.t}>
                <div style={{ width: 42, height: 42, borderRadius: 11, display: "grid", placeItems: "center", background: "var(--cyan-soft)", color: "var(--cyan-ink)" }}><Icon width={21} height={21} /></div>
                <div style={{ fontWeight: 680, marginTop: 13, fontSize: 14.5 }}>{s.t}</div>
                <p style={{ marginTop: 6, fontSize: 12.5, color: "var(--muted)", lineHeight: 1.55 }}>{s.d}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "30px 26px 70px" }}>
        <div className="card" style={{ padding: 40, background: "linear-gradient(135deg,#0a1230,#0a2e2b)", color: "#fff", border: "none", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", right: -60, top: -60, width: 260, height: 260, borderRadius: "50%", background: "radial-gradient(circle,#25e0d044,transparent 60%)" }} />
          <h2 style={{ fontSize: 28, maxWidth: 560, position: "relative" }}>Every crew knows where to go before the day begins.</h2>
          <p style={{ color: "#c5cbf0", maxWidth: 540, marginTop: 12, position: "relative" }}>Planning done, materials checked, customers confirmed, the emergency already re-routed. The office stops firefighting and starts leading.</p>
          <Link href="/command" className="btn volt" style={{ marginTop: 22, position: "relative" }}>Enter the command centre <ArrowRight /></Link>
        </div>
        <p style={{ textAlign: "center", color: "var(--faint)", fontSize: 12, marginTop: 24 }}>A LEGION UNITED demonstration environment · Sample data · www.legion-united.com</p>
      </section>
    </div>
  );
}

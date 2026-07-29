"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { brand } from "@/lib/data";
import ThemeToggle from "./ThemeToggle";
import BootScreen from "./BootScreen";
import { ToastProvider } from "./interactive";
import {
  Bolt, Home, Map, Calendar, Layers, User, Doc, Cash, Package, Vault, Workforce, Brain,
  Search, Bell, Menu,
} from "./icons";

const NAV = [
  { group: "Command", items: [
    { href: "/command", label: "Command", icon: Home, tag: "Live", live: true },
    { href: "/dispatch", label: "Dispatch", icon: Map, tag: "9", live: true },
  ]},
  { group: "Operate", items: [
    { href: "/planning", label: "Planning", icon: Calendar },
    { href: "/projects", label: "Projects", icon: Layers, tag: "37" },
    { href: "/team", label: "Team", icon: User, tag: "14" },
  ]},
  { group: "Commercial", items: [
    { href: "/quotes", label: "Quotes", icon: Doc, tag: "22" },
    { href: "/cash", label: "Cash", icon: Cash, tag: "£62k", hot: true },
    { href: "/procurement", label: "Procurement", icon: Package, tag: "2" },
  ]},
  { group: "Knowledge", items: [
    { href: "/vault", label: "Vault", icon: Vault },
  ]},
  { group: "The engine", items: [
    { href: "/workforce", label: "Digital Workforce", icon: Workforce, tag: "10" },
    { href: "/intelligence", label: "Intelligence", icon: Brain },
  ]},
];

const CRUMBS: Record<string, string> = {
  "/command": "Command", "/dispatch": "Dispatch", "/planning": "Planning", "/projects": "Projects",
  "/team": "Team", "/quotes": "Quotes", "/cash": "Cash", "/procurement": "Procurement",
  "/vault": "Vault", "/workforce": "Digital Workforce", "/intelligence": "Intelligence",
};

function useClock() {
  const [t, setT] = React.useState("");
  React.useEffect(() => {
    const f = () => setT(new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }));
    f(); const id = setInterval(f, 30000); return () => clearInterval(id);
  }, []);
  return t;
}

const NOTIFS = [
  { t: "Emergency: power loss at Redcliffe office", w: "now", tone: "co" },
  { t: "Bath Park & Ride accepted the £41.2k EV quote", w: "3 h ago", tone: "g" },
  { t: "EV chargers below minimum — PO-4469 awaiting approval", w: "today", tone: "y" },
];

export default function DashShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [open, setOpen] = React.useState(false);
  const [notif, setNotif] = React.useState(false);
  const [q, setQ] = React.useState("");
  const clock = useClock();

  if (path === "/") return <>{children}</>;

  return (
    <ToastProvider>
    <BootScreen />
    <div className="shell">
      <div className={`scrim ${open ? "show" : ""}`} onClick={() => setOpen(false)} />
      <aside className={`rail ${open ? "open" : ""}`}>
        <div className="rail-brand">
          <div className="rail-mark"><Bolt width={19} height={19} /></div>
          <div className="rail-word">
            <b>{brand.name}</b>
            <span>{brand.tagline}</span>
          </div>
        </div>

        {NAV.map((g) => (
          <div className="nav-group" key={g.group}>
            <p>{g.group}</p>
            {g.items.map((it) => {
              const active = path.startsWith(it.href);
              const Icon = it.icon;
              return (
                <Link key={it.href} href={it.href} className={`nav-item ${active ? "active" : ""}`} onClick={() => setOpen(false)}>
                  <Icon />
                  <span>{it.label}</span>
                  {it.tag ? <span className={`tag ${(it as { live?: boolean }).live ? "live" : ""} ${(it as { hot?: boolean }).hot ? "hot" : ""}`}>{it.tag}</span> : null}
                </Link>
              );
            })}
          </div>
        ))}

        <div className="rail-foot">
          <div className="row" style={{ gap: 10 }}>
            <div className="avatar" style={{ background: "#ffffff16", color: "#fff", borderColor: "#ffffff22" }}>{brand.director.initials}</div>
            <div className="stack" style={{ gap: 1 }}>
              <b style={{ fontSize: 12.5 }}>{brand.director.name}</b>
              <span style={{ fontSize: 11, color: "var(--side-muted)" }}>{brand.director.role}</span>
            </div>
          </div>
        </div>
      </aside>

      <div className="main">
        <header className="topbar">
          <button className="iconbtn railtoggle" onClick={() => setOpen(true)} aria-label="Menu"><Menu /></button>
          <div className="crumb">
            <span>Voltiq Electrical</span>
            <span className="sep">/</span>
            <b>{CRUMBS[path] || ""}</b>
          </div>
          <form className="searchbox" onSubmit={(e) => e.preventDefault()}>
            <Search />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search crews, jobs, clients…" style={{ border: "none", background: "transparent", outline: "none", width: "100%", color: "inherit", font: "inherit" }} />
            <kbd>⌘K</kbd>
          </form>
          <div className="top-right">
            <span className="pill line tiny" style={{ gap: 6 }}><span className="dot g pulse" /> LEGION OS online</span>
            <span className="tiny muted mono" style={{ minWidth: 40 }}>{clock}</span>
            <div style={{ position: "relative" }}>
              <button className={`iconbtn ${notif ? "" : "dot-badge"}`} aria-label="Notifications" onClick={() => setNotif((v) => !v)}><Bell /></button>
              {notif ? (
                <>
                  <div style={{ position: "fixed", inset: 0, zIndex: 49 }} onClick={() => setNotif(false)} />
                  <div className="card" style={{ position: "absolute", right: 0, top: 42, width: 320, zIndex: 50, boxShadow: "var(--shadow-lg)" }}>
                    <div className="card-h" style={{ padding: "12px 15px" }}><h3 style={{ fontSize: 13 }}>Notifications</h3><span className="right tiny muted">3 new</span></div>
                    <div style={{ padding: 8 }}>
                      {NOTIFS.map((n, i) => (
                        <div key={i} className="row" style={{ gap: 10, padding: "9px 8px", borderRadius: 8, alignItems: "flex-start" }}>
                          <span className={`dot ${n.tone}`} style={{ marginTop: 5 }} />
                          <div><div style={{ fontSize: 12.5 }}>{n.t}</div><div className="tiny muted">{n.w}</div></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : null}
            </div>
            <ThemeToggle />
          </div>
        </header>
        <main className="content">{children}</main>
      </div>
    </div>
    </ToastProvider>
  );
}

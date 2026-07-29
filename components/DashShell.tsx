"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { brand } from "@/lib/data";
import ThemeToggle from "./ThemeToggle";
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

export default function DashShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [open, setOpen] = React.useState(false);
  const clock = useClock();

  if (path === "/") return <>{children}</>;

  return (
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
          <div className="searchbox">
            <Search />
            <span>Search crews, jobs, clients…</span>
            <kbd>⌘K</kbd>
          </div>
          <div className="top-right">
            <span className="pill line tiny" style={{ gap: 6 }}><span className="dot g pulse" /> LEGION OS online</span>
            <span className="tiny muted mono" style={{ minWidth: 40 }}>{clock}</span>
            <button className="iconbtn dot-badge" aria-label="Notifications"><Bell /></button>
            <ThemeToggle />
          </div>
        </header>
        <main className="content">{children}</main>
      </div>
    </div>
  );
}

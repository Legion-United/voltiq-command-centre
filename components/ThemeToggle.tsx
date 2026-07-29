"use client";
import * as React from "react";
import { Sun, Moon } from "./icons";

export default function ThemeToggle() {
  const [theme, setTheme] = React.useState<string>("light");
  React.useEffect(() => {
    const t = document.documentElement.getAttribute("data-theme") || "light";
    setTheme(t);
  }, []);
  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("voltiq-theme", next); } catch {}
  };
  return (
    <button className="iconbtn" onClick={toggle} aria-label="Toggle theme" title="Toggle theme">
      {theme === "light" ? <Moon /> : <Sun />}
    </button>
  );
}

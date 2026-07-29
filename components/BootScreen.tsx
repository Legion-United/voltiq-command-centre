"use client";
import * as React from "react";
import { Bolt } from "./icons";

export default function BootScreen() {
  const [show, setShow] = React.useState(false);
  const [go, setGo] = React.useState(false);
  const [out, setOut] = React.useState(false);

  React.useEffect(() => {
    let booted = false;
    try { booted = sessionStorage.getItem("voltiq-booted") === "1"; } catch {}
    if (booted) return;
    setShow(true);
    const r = requestAnimationFrame(() => setGo(true));
    const t1 = setTimeout(() => setOut(true), 1150);
    const t2 = setTimeout(() => {
      try { sessionStorage.setItem("voltiq-booted", "1"); } catch {}
      setShow(false);
    }, 1600);
    return () => { cancelAnimationFrame(r); clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (!show) return null;
  return (
    <div className={`boot ${out ? "out" : ""}`}>
      <div className="boot-glow" />
      <div className="boot-inner boot-quick">
        <div className="boot-mark">
          <span className="boot-halo" />
          <span className="boot-track" />
          <span className="boot-sweep" />
          <span className="boot-orbit" />
          <Bolt width={30} height={30} />
        </div>
        <div className="boot-word"><b>VOLTIQ</b><span>Command Centre</span></div>
        <div className="boot-quickbar"><span className={go ? "on" : ""} /></div>
        <div className="boot-quicknote">Starting LEGION OS</div>
      </div>
    </div>
  );
}

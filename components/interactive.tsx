"use client";
import * as React from "react";

/* ============================================================
   Shared interactive primitives: Toast, Drawer, Modal, Segmented
   ============================================================ */

type Toast = { id: number; msg: string; tone: "b" | "g" | "y" | "r" };
const ToastCtx = React.createContext<(msg: string, tone?: Toast["tone"]) => void>(() => {});
export const useToast = () => React.useContext(ToastCtx);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<Toast[]>([]);
  const idRef = React.useRef(1);
  const push = React.useCallback((msg: string, tone: Toast["tone"] = "b") => {
    const id = idRef.current++;
    setItems((s) => [...s, { id, msg, tone }]);
    setTimeout(() => setItems((s) => s.filter((t) => t.id !== id)), 3200);
  }, []);
  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div className="toast-wrap">
        {items.map((t) => (
          <div key={t.id} className={`toast ${t.tone}`}>
            <span className={`dot ${t.tone === "g" ? "g" : t.tone === "y" ? "y" : t.tone === "r" ? "r" : "b"}`} />
            <span>{t.msg}</span>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

/* ---------------- Drawer (right slide-over) ---------------- */
export function Drawer({ open, onClose, title, sub, children, footer }: {
  open: boolean; onClose: () => void; title?: string; sub?: string; children: React.ReactNode; footer?: React.ReactNode;
}) {
  React.useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open, onClose]);
  return (
    <>
      <div className={`ov ${open ? "show" : ""}`} onClick={onClose} />
      <aside className={`drawer ${open ? "open" : ""}`} role="dialog" aria-modal="true">
        {title ? (
          <div className="drawer-h">
            <div><h3>{title}</h3>{sub ? <div className="sub">{sub}</div> : null}</div>
            <button className="iconbtn" onClick={onClose} aria-label="Close">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
            </button>
          </div>
        ) : null}
        <div className="drawer-body">{children}</div>
        {footer ? <div className="drawer-foot">{footer}</div> : null}
      </aside>
    </>
  );
}

/* ---------------- Modal (centered) ---------------- */
export function Modal({ open, onClose, title, sub, children, footer, wide }: {
  open: boolean; onClose: () => void; title?: string; sub?: string; children: React.ReactNode; footer?: React.ReactNode; wide?: boolean;
}) {
  React.useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="ov show modal-ov" onClick={onClose}>
      <div className={`modal ${wide ? "wide" : ""}`} role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        {title ? (
          <div className="drawer-h">
            <div><h3>{title}</h3>{sub ? <div className="sub">{sub}</div> : null}</div>
            <button className="iconbtn" onClick={onClose} aria-label="Close">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
            </button>
          </div>
        ) : null}
        <div className="drawer-body">{children}</div>
        {footer ? <div className="drawer-foot">{footer}</div> : null}
      </div>
    </div>
  );
}

/* ---------------- Segmented control (tabs) ---------------- */
export function Segmented({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="segmented">
      {options.map((o) => (
        <button key={o} className={value === o ? "on" : ""} onClick={() => onChange(o)}>{o}</button>
      ))}
    </div>
  );
}

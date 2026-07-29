"use client";
import * as React from "react";
import { PageHead, Card, Pill, Stat, Meter } from "@/components/ui";
import { eur } from "@/components/ui";
import { stock, purchaseOrders } from "@/lib/data";
import type { Stock } from "@/lib/data";
import { Package, Plus, Bolt, Truck, Warn, Check, ArrowRight } from "@/components/icons";
import { useToast, Drawer, Modal } from "@/components/interactive";

const stockTone: Record<string, "g" | "y" | "co"> = { OK: "g", Low: "y", Reorder: "co" };
const poTone: Record<string, "b" | "y" | "g"> = { Suggested: "b", "Awaiting approval": "y", Ordered: "g" };
type PO = (typeof purchaseOrders)[number];

export default function ProcurementPage() {
  const toast = useToast();
  const shortages = stock.filter((s) => s.status !== "OK").length;
  const [item, setItem] = React.useState<Stock | null>(null);
  const [po, setPo] = React.useState<PO | null>(null);
  const [creating, setCreating] = React.useState(false);

  return (
    <>
      <PageHead eyebrow="The Procurement Assistant" title="Procurement" sub="Stock across the vans and depot, watched against every scheduled job. The purchase order is ready before an engineer runs out on site.">
        <span className="pill co"><Warn width={13} height={13} /> {shortages} shortages</span>
        <button className="btn primary" onClick={() => setCreating(true)}><Plus /> New order</button>
      </PageHead>

      <div className="grid g-4" style={{ marginBottom: 16 }}>
        <Stat label="Stock value" value={eur(28400)} icon={<Package />} variant="accent" />
        <Stat label="Below minimum" value={shortages} unit="lines" delta="2 reorder now" deltaDir="down" icon={<Warn />} />
        <Stat label="POs this month" value={17} delta={eur(21600)} deltaDir="flat" icon={<Truck />} variant="cyan" />
        <Stat label="Stockouts avoided" value={6} unit="this month" delta="no wasted trips" deltaDir="up" icon={<Check />} variant="volt" />
      </div>

      <div className="grid" style={{ gridTemplateColumns: "1.5fr 1fr", alignItems: "start" }}>
        <Card title="Stock levels" sub="Vans + depot combined" icon={<Package width={17} height={17} />} pad={false}>
          <div className="scrollx">
            <table className="table">
              <thead><tr><th>Item</th><th>Supplier</th><th style={{ minWidth: 120 }}>On hand</th><th>Status</th><th>Lead</th></tr></thead>
              <tbody>
                {stock.map((s) => (
                  <tr key={s.sku} className="clickable" onClick={() => setItem(s)}>
                    <td><div style={{ fontWeight: 620, fontSize: 12.5 }}>{s.item}</div><div className="tiny muted mono">{s.sku}</div></td>
                    <td className="tiny muted">{s.supplier}</td>
                    <td>
                      <div className="row" style={{ gap: 8 }}>
                        <div style={{ flex: 1 }}><Meter value={Math.min(100, (s.onHand / (s.min * 2)) * 100)} variant={s.status === "Reorder" ? "r" : s.status === "Low" ? "y" : "g"} /></div>
                        <span className="tiny tnum muted">{s.onHand}/{s.min}</span>
                      </div>
                    </td>
                    <td><Pill tone={stockTone[s.status]}>{s.status}</Pill></td>
                    <td className="tiny muted">{s.lead}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="stack" style={{ gap: 16 }}>
          <Card title="Purchase orders" sub="Suggested & in flight" icon={<Truck width={17} height={17} />}>
            <div className="stack" style={{ gap: 11 }}>
              {purchaseOrders.map((p) => (
                <div key={p.po} className="clickable" style={{ padding: 12, border: "1px solid var(--line)", borderRadius: 12, background: "var(--surface-2)" }} onClick={() => setPo(p)}>
                  <div className="spread">
                    <span className="mono tiny muted">{p.po}</span>
                    <Pill tone={poTone[p.status]}>{p.status}</Pill>
                  </div>
                  <div style={{ fontSize: 12.5, fontWeight: 620, marginTop: 6 }}>{p.supplier}</div>
                  <div className="tiny muted">{p.items}</div>
                  <div className="spread" style={{ marginTop: 9 }}>
                    <span className="tiny muted">for {p.forJob}</span>
                    <b className="tnum">{eur(p.value)}</b>
                  </div>
                  {p.status !== "Ordered" ? <button className="btn sm primary" style={{ marginTop: 10, width: "100%" }} onClick={(e) => { e.stopPropagation(); toast(p.status === "Suggested" ? `${p.po} raised with ${p.supplier}` : `${p.po} approved`, "g"); }}>{p.status === "Suggested" ? "Review & raise" : "Approve"} <ArrowRight width={13} height={13} /></button> : null}
                </div>
              ))}
            </div>
          </Card>

          <div className="card pad" style={{ display: "flex", gap: 12, alignItems: "center", background: "var(--cyan-soft)", border: "none" }}>
            <span className="avatar" style={{ background: "var(--surface)", color: "var(--cyan-ink)", borderColor: "transparent" }}><Bolt width={18} height={18} /></span>
            <div><b style={{ fontSize: 13, color: "var(--cyan-ink)" }}>Park & Ride starts Wednesday</b><div className="tiny" style={{ marginTop: 2, color: "var(--cyan-ink)" }}>Only 2 of 4 EV chargers in stock. Approve PO-4469 today to hit the start date.</div></div>
            <button className="btn sm" style={{ marginLeft: "auto" }} onClick={() => toast("PO-4469 approved — EV chargers on the way", "g")}>Approve</button>
          </div>
        </div>
      </div>

      <Drawer
        open={!!item}
        onClose={() => setItem(null)}
        title={item?.item}
        sub={item?.sku}
        footer={item ? (
          <>
            <button className="btn primary sm" onClick={() => { toast(`Reorder raised with ${item.supplier}`, "g"); setItem(null); }}>Reorder</button>
            <button className="btn sm" onClick={() => { toast("Supplier catalogue opened", "b"); setItem(null); }}>View supplier</button>
          </>
        ) : null}
      >
        {item ? (
          <div className="stack" style={{ gap: 12 }}>
            <div className="kv"><span className="k">SKU</span><span className="v mono">{item.sku}</span></div>
            <div className="kv"><span className="k">On hand</span><span className="v">{item.onHand}</span></div>
            <div className="kv"><span className="k">Minimum</span><span className="v">{item.min}</span></div>
            <div className="kv"><span className="k">Supplier</span><span className="v">{item.supplier}</span></div>
            <div className="kv"><span className="k">Lead time</span><span className="v">{item.lead}</span></div>
            <div className="kv"><span className="k">Status</span><span className="v"><Pill tone={stockTone[item.status]}>{item.status}</Pill></span></div>
            <div><div className="spread" style={{ marginBottom: 6 }}><span className="tiny muted">Stock level</span><span className="tiny muted tnum">{item.onHand}/{item.min}</span></div><Meter value={Math.min(100, (item.onHand / (item.min * 2)) * 100)} variant={item.status === "Reorder" ? "r" : item.status === "Low" ? "y" : "g"} /></div>
          </div>
        ) : null}
      </Drawer>

      <Drawer
        open={!!po}
        onClose={() => setPo(null)}
        title={po?.po}
        sub={po ? `${po.supplier} · ${po.status}` : undefined}
        footer={po ? (
          <>
            <button className="btn primary sm" onClick={() => { toast(po.status === "Ordered" ? `${po.po} delivery tracked` : `${po.po} ${po.status === "Suggested" ? "raised" : "approved"}`, "g"); setPo(null); }}>{po.status === "Ordered" ? "Track delivery" : po.status === "Suggested" ? "Raise order" : "Approve"}</button>
            <button className="btn sm" onClick={() => { toast("Line items opened", "b"); setPo(null); }}>View items</button>
          </>
        ) : null}
      >
        {po ? (
          <div className="stack" style={{ gap: 12 }}>
            <div className="kv"><span className="k">Supplier</span><span className="v">{po.supplier}</span></div>
            <div className="kv"><span className="k">Items</span><span className="v" style={{ textAlign: "right", maxWidth: 220 }}>{po.items}</span></div>
            <div className="kv"><span className="k">Value</span><span className="v">{eur(po.value)}</span></div>
            <div className="kv"><span className="k">For job</span><span className="v">{po.forJob}</span></div>
            <div className="kv"><span className="k">Status</span><span className="v"><Pill tone={poTone[po.status]}>{po.status}</Pill></span></div>
          </div>
        ) : null}
      </Drawer>

      <Modal
        open={creating}
        onClose={() => setCreating(false)}
        title="New purchase order"
        sub="Raise an order with a supplier"
        wide
        footer={
          <>
            <button className="btn sm" onClick={() => setCreating(false)}>Cancel</button>
            <button className="btn primary sm" onClick={() => { toast("Purchase order created", "g"); setCreating(false); }}>Create order</button>
          </>
        }
      >
        <div className="stack" style={{ gap: 13 }}>
          <label className="stack" style={{ gap: 5 }}><span className="tiny muted">Supplier</span><input className="input" placeholder="e.g. CEF, Edmundson, Rexel" /></label>
          <label className="stack" style={{ gap: 5 }}><span className="tiny muted">Items</span><input className="input" placeholder="e.g. 4× EV chargers 7kW" /></label>
          <div className="row" style={{ gap: 10 }}>
            <label className="stack grow" style={{ gap: 5 }}><span className="tiny muted">Value</span><input className="input" placeholder="£" /></label>
            <label className="stack grow" style={{ gap: 5 }}><span className="tiny muted">For job</span><input className="input" placeholder="Project or reference" /></label>
          </div>
        </div>
      </Modal>
    </>
  );
}

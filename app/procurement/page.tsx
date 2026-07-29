"use client";
import { PageHead, Card, Pill, Stat, Meter } from "@/components/ui";
import { eur } from "@/components/ui";
import { stock, purchaseOrders } from "@/lib/data";
import { Package, Plus, Bolt, Truck, Warn, Check, ArrowRight } from "@/components/icons";

const stockTone: Record<string, "g" | "y" | "co"> = { OK: "g", Low: "y", Reorder: "co" };
const poTone: Record<string, "b" | "y" | "g"> = { Suggested: "b", "Awaiting approval": "y", Ordered: "g" };

export default function ProcurementPage() {
  const shortages = stock.filter((s) => s.status !== "OK").length;
  return (
    <>
      <PageHead eyebrow="The Procurement Assistant" title="Procurement" sub="Stock across the vans and depot, watched against every scheduled job. The purchase order is ready before an engineer runs out on site.">
        <span className="pill co"><Warn width={13} height={13} /> {shortages} shortages</span>
        <button className="btn primary"><Plus /> New order</button>
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
                  <tr key={s.sku}>
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
              {purchaseOrders.map((po) => (
                <div key={po.po} style={{ padding: 12, border: "1px solid var(--line)", borderRadius: 12, background: "var(--surface-2)" }}>
                  <div className="spread">
                    <span className="mono tiny muted">{po.po}</span>
                    <Pill tone={poTone[po.status]}>{po.status}</Pill>
                  </div>
                  <div style={{ fontSize: 12.5, fontWeight: 620, marginTop: 6 }}>{po.supplier}</div>
                  <div className="tiny muted">{po.items}</div>
                  <div className="spread" style={{ marginTop: 9 }}>
                    <span className="tiny muted">for {po.forJob}</span>
                    <b className="tnum">{eur(po.value)}</b>
                  </div>
                  {po.status !== "Ordered" ? <button className="btn sm primary" style={{ marginTop: 10, width: "100%" }}>{po.status === "Suggested" ? "Review & raise" : "Approve"} <ArrowRight width={13} height={13} /></button> : null}
                </div>
              ))}
            </div>
          </Card>

          <div className="card pad" style={{ display: "flex", gap: 12, alignItems: "center", background: "var(--cyan-soft)", border: "none" }}>
            <span className="avatar" style={{ background: "var(--surface)", color: "var(--cyan-ink)", borderColor: "transparent" }}><Bolt width={18} height={18} /></span>
            <div><b style={{ fontSize: 13, color: "var(--cyan-ink)" }}>Park & Ride starts Wednesday</b><div className="tiny" style={{ marginTop: 2, color: "var(--cyan-ink)" }}>Only 2 of 4 EV chargers in stock. Approve PO-4469 today to hit the start date.</div></div>
          </div>
        </div>
      </div>
    </>
  );
}

"use client";
import { useState } from "react";
import Link from "next/link";

const stats = [
  { label: "Total Bookings", value: "1,284", icon: "📋", change: "+12%" },
  { label: "Revenue (USD)", value: "$142,800", icon: "💰", change: "+18%" },
  { label: "Active Hospitals", value: "523", icon: "🏥", change: "+8%" },
  { label: "Patients This Month", value: "284", icon: "👥", change: "+22%" },
];

const recentBookings = [
  { id: "TP-1048", patient: "Sarah M.", country: "USA", hospital: "Fortis India", procedure: "Hip Replacement", amount: "$7,400", status: "Confirmed" },
  { id: "TP-1047", patient: "James K.", country: "UK", hospital: "Bumrungrad Thailand", procedure: "Dental Implants", amount: "$1,850", status: "Pending" },
  { id: "TP-1046", patient: "Anna R.", country: "Australia", hospital: "KPJ Malaysia", procedure: "IVF", amount: "$5,200", status: "Confirmed" },
  { id: "TP-1045", patient: "Mark T.", country: "Germany", hospital: "Acibadem Turkey", procedure: "Hair Transplant", amount: "$2,800", status: "Completed" },
  { id: "TP-1044", patient: "Li W.", country: "Canada", hospital: "Gleneagles Singapore", procedure: "Cancer Treatment", amount: "$28,000", status: "Pending" },
];

export default function AdminPanel() {
  const [tab, setTab] = useState<"overview"|"bookings"|"hospitals"|"procedures">("overview");

  return (
    <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", minHeight: "100vh" }}>
      {/* Sidebar */}
      <div style={{ background: "var(--navy)", padding: "24px 0" }}>
        <div style={{ padding: "0 24px 32px", borderBottom: "1px solid #1e293b" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, background: "var(--teal)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>✚</div>
            <span style={{ fontFamily: "Sora", fontWeight: 700, fontSize: 16, color: "white" }}>Admin Panel</span>
          </div>
        </div>
        <nav style={{ padding: "24px 12px" }}>
          {([["overview","📊","Overview"], ["bookings","📋","Bookings"], ["hospitals","🏥","Hospitals"], ["procedures","💊","Procedures"]] as const).map(([key, icon, label]) => (
            <button key={key} onClick={() => setTab(key)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", borderRadius: 10, border: "none", cursor: "pointer", background: tab === key ? "rgba(13,148,136,0.2)" : "transparent", color: tab === key ? "#5eead4" : "#94a3b8", fontWeight: tab === key ? 600 : 400, fontSize: 14, fontFamily: "DM Sans", marginBottom: 4 }}>
              <span>{icon}</span>{label}
            </button>
          ))}
          <div style={{ borderTop: "1px solid #1e293b", marginTop: 24, paddingTop: 24 }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", color: "#94a3b8", textDecoration: "none", fontSize: 14 }}>🏠 View Site</Link>
          </div>
        </nav>
      </div>

      {/* Main */}
      <div style={{ background: "var(--surface)", padding: 32 }}>
        {tab === "overview" && (
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Dashboard Overview</h1>
            <p style={{ color: "var(--muted)", marginBottom: 32 }}>Welcome back! Here's what's happening today.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20, marginBottom: 32 }}>
              {stats.map(s => (
                <div key={s.label} style={{ background: "white", borderRadius: 16, padding: 24, border: "1px solid var(--border)" }}>
                  <div style={{ fontSize: 28, marginBottom: 12 }}>{s.icon}</div>
                  <div style={{ fontSize: 28, fontWeight: 700, fontFamily: "Sora" }}>{s.value}</div>
                  <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>{s.label}</div>
                  <div style={{ fontSize: 13, color: "var(--success)", fontWeight: 600, marginTop: 8 }}>{s.change} this month</div>
                </div>
              ))}
            </div>
            <div style={{ background: "white", borderRadius: 16, padding: 24, border: "1px solid var(--border)" }}>
              <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20 }}>Recent Bookings</h2>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    {["ID","Patient","From","Hospital","Procedure","Amount","Status"].map(h => (
                      <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map(b => (
                    <tr key={b.id} style={{ borderBottom: "1px solid var(--border)" }}>
                      <td style={{ padding: "14px 12px", fontSize: 13, fontFamily: "monospace" }}>{b.id}</td>
                      <td style={{ padding: "14px 12px", fontSize: 14, fontWeight: 500 }}>{b.patient}</td>
                      <td style={{ padding: "14px 12px", fontSize: 14, color: "var(--muted)" }}>{b.country}</td>
                      <td style={{ padding: "14px 12px", fontSize: 14 }}>{b.hospital}</td>
                      <td style={{ padding: "14px 12px", fontSize: 14, color: "var(--muted)" }}>{b.procedure}</td>
                      <td style={{ padding: "14px 12px", fontSize: 14, fontWeight: 600 }}>{b.amount}</td>
                      <td style={{ padding: "14px 12px" }}>
                        <span style={{ padding: "4px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: b.status === "Confirmed" ? "var(--teal-light)" : b.status === "Completed" ? "#dcfce7" : "#fef3c7", color: b.status === "Confirmed" ? "var(--teal)" : b.status === "Completed" ? "var(--success)" : "var(--accent)" }}>{b.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "hospitals" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h1 style={{ fontSize: 28, fontWeight: 700 }}>Hospitals</h1>
              <button className="btn-primary">+ Add Hospital</button>
            </div>
            <div style={{ background: "white", borderRadius: 16, padding: 24, border: "1px solid var(--border)" }}>
              <p style={{ color: "var(--muted)", textAlign: "center", padding: 40 }}>Connect Supabase to manage hospitals. All hospital data will appear here.</p>
            </div>
          </div>
        )}

        {tab === "procedures" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h1 style={{ fontSize: 28, fontWeight: 700 }}>Procedures</h1>
              <button className="btn-primary">+ Add Procedure</button>
            </div>
            <div style={{ background: "white", borderRadius: 16, padding: 24, border: "1px solid var(--border)" }}>
              <p style={{ color: "var(--muted)", textAlign: "center", padding: 40 }}>Connect Supabase to manage procedures. All procedure data will appear here.</p>
            </div>
          </div>
        )}

        {tab === "bookings" && (
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>All Bookings</h1>
            <div style={{ background: "white", borderRadius: 16, padding: 24, border: "1px solid var(--border)" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    {["ID","Patient","From","Hospital","Procedure","Amount","Status","Action"].map(h => (
                      <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map(b => (
                    <tr key={b.id} style={{ borderBottom: "1px solid var(--border)" }}>
                      <td style={{ padding: "14px 12px", fontSize: 13, fontFamily: "monospace" }}>{b.id}</td>
                      <td style={{ padding: "14px 12px", fontSize: 14, fontWeight: 500 }}>{b.patient}</td>
                      <td style={{ padding: "14px 12px", fontSize: 14, color: "var(--muted)" }}>{b.country}</td>
                      <td style={{ padding: "14px 12px", fontSize: 14 }}>{b.hospital}</td>
                      <td style={{ padding: "14px 12px", fontSize: 14, color: "var(--muted)" }}>{b.procedure}</td>
                      <td style={{ padding: "14px 12px", fontSize: 14, fontWeight: 600 }}>{b.amount}</td>
                      <td style={{ padding: "14px 12px" }}>
                        <span style={{ padding: "4px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: b.status === "Confirmed" ? "var(--teal-light)" : b.status === "Completed" ? "#dcfce7" : "#fef3c7", color: b.status === "Confirmed" ? "var(--teal)" : b.status === "Completed" ? "var(--success)" : "var(--accent)" }}>{b.status}</span>
                      </td>
                      <td style={{ padding: "14px 12px" }}>
                        <button style={{ fontSize: 12, padding: "4px 10px", border: "1px solid var(--border)", borderRadius: 6, cursor: "pointer", background: "white" }}>View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

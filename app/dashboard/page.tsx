"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";

const bookings = [
  { id: "TP-1042", hospital: "Fortis Memorial Research Institute", country: "🇮🇳 India", procedure: "Hip Replacement", date: "March 15, 2025", status: "Confirmed", total: "$7,400", step: 3 },
  { id: "TP-1041", hospital: "Bumrungrad International", country: "🇹🇭 Thailand", procedure: "Dental Implants", date: "January 8, 2025", status: "Completed", total: "$1,850", step: 5 },
];

const steps = ["Request Sent", "Consultation Done", "Booking Confirmed", "Travel Ready", "Treatment Complete"];

export default function Dashboard() {
  const [tab, setTab] = useState<"bookings"|"saved"|"profile">("bookings");

  return (
    <div>
      <Navbar />
      <div style={{ background: "var(--navy)", padding: "40px 0" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ width: 64, height: 64, background: "var(--teal)", borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>👤</div>
            <div>
              <h1 style={{ fontSize: 28, fontWeight: 700, color: "white" }}>Welcome back, John!</h1>
              <p style={{ color: "#94a3b8" }}>john.smith@email.com · Member since Jan 2025</p>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginTop: 32 }}>
            {[["2", "Total Bookings"], ["$9,250", "Total Spent"], ["$32,750", "Total Saved"], ["2", "Countries Visited"]].map(([v, l]) => (
              <div key={l} style={{ background: "rgba(255,255,255,0.07)", borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: "var(--teal)", fontFamily: "Sora" }}>{v}</div>
                <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: "32px 24px" }}>
        <div style={{ display: "flex", gap: 4, marginBottom: 32, background: "var(--surface)", borderRadius: 12, padding: 4, width: "fit-content" }}>
          {([["bookings","My Bookings"], ["saved","Saved Hospitals"], ["profile","My Profile"]] as const).map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)} style={{ padding: "10px 24px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 14, background: tab === key ? "white" : "transparent", color: tab === key ? "var(--navy)" : "var(--muted)", boxShadow: tab === key ? "0 2px 8px rgba(0,0,0,0.08)" : "none", fontFamily: "DM Sans" }}>{label}</button>
          ))}
        </div>

        {tab === "bookings" && (
          <div style={{ display: "grid", gap: 20 }}>
            {bookings.map(b => (
              <div key={b.id} className="card" style={{ padding: 28 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 20, marginBottom: 24 }}>
                  <div>
                    <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 8 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: "var(--muted)", fontFamily: "monospace" }}>{b.id}</span>
                      <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: b.status === "Confirmed" ? "var(--teal-light)" : "var(--surface)", color: b.status === "Confirmed" ? "var(--teal)" : "var(--success)" }}>{b.status}</span>
                    </div>
                    <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>{b.hospital}</h3>
                    <p style={{ color: "var(--muted)", fontSize: 14 }}>{b.country} · {b.procedure} · {b.date}</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 4 }}>Total paid</div>
                    <div style={{ fontSize: 28, fontWeight: 700, color: "var(--teal)", fontFamily: "Sora" }}>{b.total}</div>
                  </div>
                </div>
                <div>
                  <div style={{ display: "flex", gap: 4 }}>
                    {steps.map((s, i) => (
                      <div key={s} style={{ flex: 1 }}>
                        <div style={{ height: 6, borderRadius: 3, background: i < b.step ? "var(--teal)" : "var(--border)", marginBottom: 6 }} />
                        <div style={{ fontSize: 10, color: i < b.step ? "var(--teal)" : "var(--muted)", fontWeight: i < b.step ? 600 : 400 }}>{s}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
                  <button className="btn-secondary" style={{ fontSize: 13, padding: "8px 16px" }}>View Details</button>
                  <button className="btn-secondary" style={{ fontSize: 13, padding: "8px 16px" }}>Download Invoice</button>
                  {b.status === "Confirmed" && <button className="btn-primary" style={{ fontSize: 13, padding: "8px 16px" }}>Pre-Travel Checklist →</button>}
                </div>
              </div>
            ))}
            <div style={{ textAlign: "center", padding: 40 }}>
              <Link href="/search" className="btn-primary" style={{ textDecoration: "none" }}>+ Book New Treatment</Link>
            </div>
          </div>
        )}

        {tab === "saved" && (
          <div style={{ textAlign: "center", padding: 80 }}>
            <div style={{ fontSize: 64, marginBottom: 20 }}>🏥</div>
            <h3 style={{ fontSize: 24, fontWeight: 600, marginBottom: 12 }}>No saved hospitals yet</h3>
            <p style={{ color: "var(--muted)", marginBottom: 24 }}>Save hospitals while browsing to compare them later</p>
            <Link href="/search" className="btn-primary" style={{ textDecoration: "none" }}>Browse Hospitals</Link>
          </div>
        )}

        {tab === "profile" && (
          <div className="card" style={{ padding: 36, maxWidth: 600 }}>
            <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 24 }}>Profile Settings</h2>
            <div style={{ display: "grid", gap: 16 }}>
              {[["Full Name", "John Smith"], ["Email", "john@example.com"], ["Phone", "+1 234 567 8900"], ["Country", "United States"]].map(([l, v]) => (
                <div key={l}><label style={{ fontSize: 13, fontWeight: 600, color: "var(--muted)", display: "block", marginBottom: 6 }}>{l}</label><input defaultValue={v} /></div>
              ))}
              <button className="btn-primary" style={{ marginTop: 8, justifyContent: "center" }}>Save Changes</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

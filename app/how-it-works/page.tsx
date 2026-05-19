"use client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

export default function HowItWorks() {
  return (
    <div>
      <Navbar />
      <div style={{ background: "var(--navy)", padding: "80px 0", textAlign: "center" }}>
        <div className="container">
          <h1 style={{ fontSize: 52, fontWeight: 700, color: "white", marginBottom: 16 }}>How TreatPlanner Works</h1>
          <p style={{ fontSize: 18, color: "#94a3b8", maxWidth: 600, margin: "0 auto" }}>From first search to safe recovery — we guide you every step of the way</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {[
            { num: "01", icon: "🔍", title: "Search Your Procedure", desc: "Tell us what treatment you need and where you're from. Our engine instantly searches 500+ JCI-accredited hospitals across 50+ countries and calculates your real total cost including flights and hotel.", color: "var(--teal)" },
            { num: "02", icon: "📊", title: "Compare Real Total Costs", desc: "Unlike other sites that only show hospital prices, TreatPlanner shows you the complete picture — procedure cost + estimated flights + hotel during recovery + insurance. No surprises.", color: "#0284c7" },
            { num: "03", icon: "👨‍⚕️", title: "Free Video Consultation", desc: "Before you book anything, have a free 30-minute video consultation with your chosen doctor. Ask questions, share medical records, get a personalised treatment plan — from your home.", color: "#7c3aed" },
            { num: "04", icon: "✅", title: "Book with a Small Deposit", desc: "Once you're happy, secure your hospital appointment with a small deposit. We'll send you a full pre-travel checklist, visa guide, and your personal coordinator's contact.", color: "var(--accent)" },
            { num: "05", icon: "🛬", title: "Arrive & Get Treated", desc: "Your coordinator meets you at the airport, escorts you to the hospital, and stays available throughout your treatment and recovery stay. You focus on getting better.", color: "var(--success)" },
            { num: "06", icon: "🏠", title: "Return Home & Follow Up", desc: "After treatment, we connect you with a local doctor at home for any follow-up appointments. Our support team is available 24/7 for 90 days post-procedure.", color: "var(--danger)" },
          ].map((step, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: 32, marginBottom: 56, alignItems: "flex-start" }}>
              <div style={{ width: 80, height: 80, borderRadius: 20, background: step.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, flexShrink: 0 }}>{step.icon}</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: step.color, textTransform: "uppercase", letterSpacing: 2, marginBottom: 8 }}>Step {step.num}</div>
                <h3 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>{step.title}</h3>
                <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.8, maxWidth: 700 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: "var(--teal)", padding: "80px 0", textAlign: "center" }}>
        <div className="container">
          <h2 style={{ fontSize: 40, fontWeight: 700, color: "white", marginBottom: 20 }}>Ready to Start?</h2>
          <Link href="/search" style={{ background: "white", color: "var(--teal)", padding: "16px 36px", borderRadius: 12, fontWeight: 700, fontSize: 17, textDecoration: "none", display: "inline-block" }}>Search Hospitals Free →</Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}

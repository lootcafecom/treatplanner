"use client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

export default function About() {
  return (
    <div>
      <Navbar />
      <div style={{ background: "var(--navy)", padding: "80px 0", textAlign: "center" }}>
        <div className="container">
          <h1 style={{ fontSize: 52, fontWeight: 700, color: "white", marginBottom: 16 }}>About TreatPlanner</h1>
          <p style={{ fontSize: 18, color: "#94a3b8", maxWidth: 600, margin: "0 auto" }}>We're on a mission to make world-class healthcare accessible and affordable for everyone</p>
        </div>
      </div>
      <section className="section">
        <div className="container" style={{ maxWidth: 800 }}>
          <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 20 }}>Our Story</h2>
          <p style={{ fontSize: 17, color: "var(--slate)", lineHeight: 1.9, marginBottom: 24 }}>TreatPlanner was born from a simple observation: millions of people are skipping essential medical treatment because they can't afford it at home — while the same procedures are available at world-class hospitals abroad for a fraction of the cost.</p>
          <p style={{ fontSize: 17, color: "var(--slate)", lineHeight: 1.9, marginBottom: 48 }}>We built the "Skyscanner of medical tourism" — a platform that intelligently pieces together the cheapest total medical journey: the right hospital, the most affordable flights, and a comfortable recovery stay. All in one search.</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, marginBottom: 56 }}>
            {[["500+", "Accredited Hospitals"], ["50+", "Countries"], ["50,000+", "Patients Helped"], ["$2B+", "Patient Savings"]].slice(0,3).map(([v, l]) => (
              <div key={l} style={{ textAlign: "center", padding: 28, background: "var(--surface)", borderRadius: 16 }}>
                <div style={{ fontSize: 40, fontWeight: 700, color: "var(--teal)", fontFamily: "Sora" }}>{v}</div>
                <div style={{ color: "var(--muted)", marginTop: 8 }}>{l}</div>
              </div>
            ))}
          </div>

          <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 20 }}>Our Promise</h2>
          {["We only list JCI-accredited hospitals — the international gold standard for hospital safety.","We show you the real total cost, not just the procedure price. No hidden fees.","We never take payments from hospitals in exchange for better rankings.","Our patient coordinators are available 24/7 before, during, and after your treatment."].map((p, i) => (
            <div key={i} style={{ display: "flex", gap: 16, marginBottom: 20, alignItems: "flex-start" }}>
              <span style={{ fontSize: 20, color: "var(--success)", flexShrink: 0 }}>✓</span>
              <p style={{ fontSize: 16, color: "var(--slate)", lineHeight: 1.8 }}>{p}</p>
            </div>
          ))}

          <div style={{ marginTop: 48, textAlign: "center" }}>
            <Link href="/search" className="btn-primary" style={{ fontSize: 16, textDecoration: "none" }}>Start Your Search →</Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

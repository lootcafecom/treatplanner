"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const procedures = [
  "Dental Implants","Hip Replacement","Knee Replacement","Heart Bypass","IVF / Fertility","LASIK Eye Surgery",
  "Hair Transplant","Rhinoplasty","Spine Surgery","Cancer Treatment","Bariatric Surgery","Cataract Surgery",
  "Kidney Transplant","Liver Transplant","Cosmetic Surgery","Orthodontics"
];

const stats = [
  { value: "92%", label: "Average savings vs US prices" },
  { value: "500+", label: "JCI accredited hospitals" },
  { value: "50+", label: "Countries covered" },
  { value: "98%", label: "Patient satisfaction rate" },
];

const destinations = [
  { country: "🇮🇳 India", specialty: "Cardiac & Orthopedic", saving: "95%", img: "bg-gradient-to-br from-orange-400 to-orange-600" },
  { country: "🇹🇭 Thailand", specialty: "Dental & Cosmetic", saving: "88%", img: "bg-gradient-to-br from-blue-400 to-blue-600" },
  { country: "🇹🇷 Turkey", specialty: "Hair & Ophthalmology", saving: "85%", img: "bg-gradient-to-br from-red-400 to-red-600" },
  { country: "🇲🇽 Mexico", specialty: "Dental & Bariatric", saving: "82%", img: "bg-gradient-to-br from-green-400 to-green-600" },
  { country: "🇸🇬 Singapore", specialty: "Complex Surgery", saving: "70%", img: "bg-gradient-to-br from-purple-400 to-purple-600" },
  { country: "🇲🇾 Malaysia", specialty: "General Surgery", saving: "80%", img: "bg-gradient-to-br from-yellow-400 to-yellow-600" },
];

const howItWorks = [
  { step: "01", title: "Search your procedure", desc: "Enter what treatment you need. Our AI instantly searches 500+ hospitals across 50+ countries.", icon: "🔍" },
  { step: "02", title: "Compare total costs", desc: "See the real total — procedure + flights + hotel + insurance. No hidden surprises.", icon: "📊" },
  { step: "03", title: "Book with confidence", desc: "Book your verified, JCI-accredited hospital with a small deposit. We handle the rest.", icon: "✅" },
];

const testimonials = [
  { name: "Sarah M.", country: "🇺🇸 USA", procedure: "Hip Replacement in India", saved: "$32,000", text: "I saved $32,000 compared to my US quote. The hospital was world-class and my coordinator was amazing throughout." },
  { name: "James K.", country: "🇬🇧 UK", procedure: "Dental Implants in Thailand", saved: "£8,500", text: "Waited 18 months on NHS. TreatPlanner got me treated in Thailand in 3 weeks for a fraction of the cost." },
  { name: "Anna R.", country: "🇦🇺 Australia", procedure: "IVF in Malaysia", saved: "A$15,000", text: "After 3 failed cycles in Australia, we tried Malaysia. Same success rate, much lower stress on our finances." },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [from, setFrom] = useState("");

  return (
    <div>
      <Navbar />

      {/* HERO */}
      <section style={{ background: "linear-gradient(135deg, #0f172a 0%, #134e4a 50%, #0f172a 100%)", padding: "100px 0 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 30% 50%, rgba(13,148,136,0.15) 0%, transparent 60%), radial-gradient(circle at 70% 20%, rgba(14,165,233,0.1) 0%, transparent 50%)" }} />
        <div className="container" style={{ position: "relative", textAlign: "center" }}>
          <div className="badge" style={{ marginBottom: 24, background: "rgba(13,148,136,0.2)", color: "#5eead4", border: "1px solid rgba(13,148,136,0.3)" }}>
            ✚ The Skyscanner of Medical Tourism
          </div>
          <h1 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 700, color: "white", marginBottom: 20, maxWidth: 800, margin: "0 auto 20px" }}>
            Find World-Class Medical Care <span className="gradient-text">At a Fraction of the Cost</span>
          </h1>
          <p style={{ fontSize: 18, color: "#94a3b8", maxWidth: 600, margin: "0 auto 48px", lineHeight: 1.8 }}>
            Compare hospitals, doctors, and total trip costs across 50+ countries. Save up to 92% on surgery, dental, fertility and more.
          </p>

          {/* Search Box */}
          <div style={{ background: "white", borderRadius: 20, padding: 24, maxWidth: 780, margin: "0 auto", boxShadow: "0 24px 60px rgba(0,0,0,0.3)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 12 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>Procedure</label>
                <select value={search} onChange={e => setSearch(e.target.value)} style={{ border: "1.5px solid var(--border)", borderRadius: 10, padding: "12px 16px", fontSize: 15, width: "100%", color: search ? "var(--navy)" : "var(--muted)" }}>
                  <option value="">Select procedure...</option>
                  {procedures.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>Your Country</label>
                <input placeholder="e.g. United States, UK..." value={from} onChange={e => setFrom(e.target.value)} />
              </div>
              <div style={{ display: "flex", alignItems: "flex-end" }}>
                <Link href={`/search?procedure=${search}&from=${from}`} className="btn-primary" style={{ height: 50, whiteSpace: "nowrap", borderRadius: 10, textDecoration: "none" }}>
                  Search Hospitals →
                </Link>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 16 }}>
              <span style={{ fontSize: 12, color: "var(--muted)" }}>Popular:</span>
              {["Hip Replacement", "Dental Implants", "IVF", "LASIK", "Hair Transplant"].map(p => (
                <button key={p} onClick={() => setSearch(p)} style={{ fontSize: 12, padding: "4px 12px", border: "1px solid var(--border)", borderRadius: 20, background: search === p ? "var(--teal-light)" : "white", color: search === p ? "var(--teal)" : "var(--slate)", cursor: "pointer" }}>{p}</button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24, maxWidth: 700, margin: "48px auto 0" }}>
            {stats.map(s => (
              <div key={s.value} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 32, fontWeight: 700, color: "#5eead4", fontFamily: "Sora" }}>{s.value}</div>
                <div style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="badge" style={{ marginBottom: 12 }}>Simple Process</div>
            <h2 style={{ fontSize: 40, fontWeight: 700 }}>How TreatPlanner Works</h2>
            <p style={{ color: "var(--muted)", marginTop: 12, fontSize: 17 }}>From search to treatment in 3 simple steps</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 32 }}>
            {howItWorks.map((item, i) => (
              <div key={i} className="card" style={{ padding: 36, textAlign: "center", position: "relative" }}>
                <div style={{ fontSize: 48, marginBottom: 20 }}>{item.icon}</div>
                <div style={{ position: "absolute", top: 20, right: 24, fontSize: 48, fontWeight: 800, color: "var(--teal-light)", fontFamily: "Sora" }}>{item.step}</div>
                <h3 style={{ fontSize: 22, fontWeight: 600, marginBottom: 12 }}>{item.title}</h3>
                <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="badge" style={{ marginBottom: 12 }}>Top Destinations</div>
            <h2 style={{ fontSize: 40, fontWeight: 700 }}>World's Best Medical Destinations</h2>
            <p style={{ color: "var(--muted)", marginTop: 12, fontSize: 17 }}>Accredited hospitals in the most popular medical tourism countries</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {destinations.map((d, i) => (
              <Link key={i} href={`/search?country=${d.country}`} style={{ textDecoration: "none" }}>
                <div className="card" style={{ padding: 28, cursor: "pointer" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                    <h3 style={{ fontSize: 20, fontWeight: 600 }}>{d.country}</h3>
                    <div style={{ background: "var(--teal-light)", color: "var(--teal-dark)", padding: "4px 10px", borderRadius: 20, fontSize: 13, fontWeight: 600 }}>Save {d.saving}</div>
                  </div>
                  <p style={{ color: "var(--muted)", fontSize: 14 }}>Specializes in: <strong style={{ color: "var(--slate)" }}>{d.specialty}</strong></p>
                  <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--teal)", fontWeight: 500 }}>
                    <span>View hospitals →</span>
                    <span>⭐ JCI Accredited</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* COST COMPARISON */}
      <section className="section" style={{ background: "var(--navy)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="badge" style={{ marginBottom: 12, background: "rgba(13,148,136,0.2)", color: "#5eead4", border: "1px solid rgba(13,148,136,0.3)" }}>Real Savings</div>
            <h2 style={{ fontSize: 40, fontWeight: 700, color: "white" }}>See How Much You Can Save</h2>
            <p style={{ color: "#64748b", marginTop: 12, fontSize: 17 }}>Average procedure costs including flights and hotel</p>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #1e293b" }}>
                  {["Procedure", "🇺🇸 USA", "🇬🇧 UK", "🇮🇳 India", "🇹🇭 Thailand", "🇹🇷 Turkey", "You Save"].map(h => (
                    <th key={h} style={{ padding: "14px 16px", textAlign: "left", fontSize: 13, fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Hip Replacement", "$40,000", "£12,000", "$7,000", "$8,000", "$6,500", "Up to 92%"],
                  ["Dental Implant", "$4,000", "£2,500", "$600", "$800", "$700", "Up to 87%"],
                  ["Heart Bypass", "$150,000", "£35,000", "$12,000", "$15,000", "$14,000", "Up to 92%"],
                  ["IVF Treatment", "$20,000", "£8,000", "$3,500", "$4,500", "$4,000", "Up to 82%"],
                  ["LASIK (both eyes)", "$4,200", "£2,800", "$800", "$1,000", "$900", "Up to 81%"],
                  ["Hair Transplant", "$15,000", "£8,000", "$2,000", "$2,500", "$1,800", "Up to 88%"],
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #1e293b" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "#1e293b")}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                    {row.map((cell, j) => (
                      <td key={j} style={{ padding: "16px", fontSize: 14, color: j === 0 ? "white" : j === row.length - 1 ? "var(--success)" : "#94a3b8", fontWeight: j === 0 || j === row.length - 1 ? 600 : 400 }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <Link href="/calculator" className="btn-primary" style={{ fontSize: 16 }}>Calculate My Total Trip Cost →</Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="badge" style={{ marginBottom: 12 }}>Patient Stories</div>
            <h2 style={{ fontSize: 40, fontWeight: 700 }}>Real People, Real Savings</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28 }}>
            {testimonials.map((t, i) => (
              <div key={i} className="card" style={{ padding: 32 }}>
                <div style={{ fontSize: 32, marginBottom: 16 }}>⭐⭐⭐⭐⭐</div>
                <p style={{ color: "var(--slate)", lineHeight: 1.8, marginBottom: 24, fontSize: 15 }}>"{t.text}"</p>
                <div style={{ borderTop: "1px solid var(--border)", paddingTop: 20 }}>
                  <div style={{ fontWeight: 600, color: "var(--navy)" }}>{t.name} {t.country}</div>
                  <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>{t.procedure}</div>
                  <div style={{ marginTop: 8, fontSize: 15, fontWeight: 700, color: "var(--success)" }}>Saved {t.saved}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "linear-gradient(135deg, var(--teal) 0%, #0284c7 100%)", padding: "80px 0", textAlign: "center" }}>
        <div className="container">
          <h2 style={{ fontSize: 44, fontWeight: 700, color: "white", marginBottom: 16 }}>Ready to Save on Your Treatment?</h2>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.85)", marginBottom: 36, maxWidth: 500, margin: "0 auto 36px" }}>
            Join 50,000+ patients who found world-class care at a fraction of the price.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/search" style={{ background: "white", color: "var(--teal)", padding: "14px 32px", borderRadius: 10, fontWeight: 700, fontSize: 16, textDecoration: "none", transition: "all 0.2s", display: "inline-block" }}>
              Search Hospitals Free →
            </Link>
            <Link href="/how-it-works" style={{ background: "rgba(255,255,255,0.15)", color: "white", padding: "14px 32px", borderRadius: 10, fontWeight: 600, fontSize: 16, textDecoration: "none", border: "2px solid rgba(255,255,255,0.4)" }}>
              Learn How It Works
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

"use client";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";

const hospital = {
  name: "Fortis Memorial Research Institute", country: "🇮🇳 India", city: "Gurugram, New Delhi NCR",
  rating: 4.9, reviews: 2840, founded: 1996, beds: 1000, accreditation: ["JCI", "NABH", "ISO 9001"],
  specialty: "Cardiac Surgery, Orthopedics, Oncology", about: "Fortis Memorial Research Institute is one of India's most advanced multi-specialty tertiary care hospitals. It houses some of the finest specialists in the country offering an array of medical and surgical interventions in over 30 specialties.",
  procedures: [["Hip Replacement","$6,500","14 days"],["Knee Replacement","$5,800","14 days"],["Heart Bypass","$11,000","21 days"],["Cancer Treatment","$8,000","Varies"],["IVF","$3,200","7 days"],["Spine Surgery","$9,000","21 days"]],
  doctors: [
    { name: "Dr. Vivek Vij", specialty: "Orthopedics", experience: "22 years", cases: "4,200+" },
    { name: "Dr. Ashok Seth", specialty: "Cardiology", experience: "30 years", cases: "12,000+" },
    { name: "Dr. Rajeev Gupta", specialty: "Oncology", experience: "18 years", cases: "3,800+" },
  ],
  reviews_list: [
    { name: "Sarah M.", country: "🇺🇸 USA", rating: 5, text: "Absolutely incredible experience. My hip replacement was perfect and I saved $32,000.", procedure: "Hip Replacement" },
    { name: "James K.", country: "🇬🇧 UK", rating: 5, text: "World-class hospital. The doctors speak perfect English and care is excellent.", procedure: "Heart Bypass" },
    { name: "Anna R.", country: "🇦🇺 Australia", rating: 4, text: "Very professional team. The coordinator made everything seamless.", procedure: "IVF" },
  ],
};

export default function HospitalPage() {
  return (
    <div>
      <Navbar />
      <div style={{ background: "var(--navy)", padding: "60px 0" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                {hospital.accreditation.map(a => <span key={a} style={{ background: "rgba(13,148,136,0.2)", color: "#5eead4", padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600, border: "1px solid rgba(13,148,136,0.3)" }}>{a} ✓</span>)}
              </div>
              <h1 style={{ fontSize: 36, fontWeight: 700, color: "white", marginBottom: 8 }}>{hospital.name}</h1>
              <p style={{ color: "#94a3b8", fontSize: 16 }}>{hospital.country} · {hospital.city} · Est. {hospital.founded} · {hospital.beds} beds</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 16 }}>
                <span style={{ color: "#f59e0b", fontSize: 20 }}>{"★".repeat(Math.floor(hospital.rating))}</span>
                <span style={{ fontSize: 20, fontWeight: 700, color: "white" }}>{hospital.rating}</span>
                <span style={{ color: "#64748b" }}>({hospital.reviews.toLocaleString()} patient reviews)</span>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 13, color: "#94a3b8", marginBottom: 4 }}>Hip Replacement from</div>
              <div style={{ fontSize: 40, fontWeight: 700, color: "var(--teal)", fontFamily: "Sora" }}>$6,500</div>
              <Link href="/book/1" className="btn-primary" style={{ marginTop: 12, textDecoration: "none", display: "inline-flex" }}>Book Now →</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: "40px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 32 }}>
          <div>
            <div className="card" style={{ padding: 28, marginBottom: 24 }}>
              <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 16 }}>About the Hospital</h2>
              <p style={{ color: "var(--slate)", lineHeight: 1.8 }}>{hospital.about}</p>
            </div>

            <div className="card" style={{ padding: 28, marginBottom: 24 }}>
              <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 20 }}>Procedures & Prices</h2>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead><tr style={{ borderBottom: "1px solid var(--border)" }}>{["Procedure","Cost","Recovery"].map(h => <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase" }}>{h}</th>)}</tr></thead>
                <tbody>{hospital.procedures.map(([p, c, r]) => (
                  <tr key={p} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td style={{ padding: "14px 12px", fontWeight: 500 }}>{p}</td>
                    <td style={{ padding: "14px 12px", color: "var(--teal)", fontWeight: 700, fontSize: 18, fontFamily: "Sora" }}>{c}</td>
                    <td style={{ padding: "14px 12px", color: "var(--muted)", fontSize: 14 }}>{r}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>

            <div className="card" style={{ padding: 28, marginBottom: 24 }}>
              <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 20 }}>Our Doctors</h2>
              <div style={{ display: "grid", gap: 16 }}>
                {hospital.doctors.map(d => (
                  <div key={d.name} style={{ display: "flex", gap: 16, padding: 16, background: "var(--surface)", borderRadius: 12 }}>
                    <div style={{ width: 52, height: 52, background: "var(--teal-light)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>👨‍⚕️</div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 16 }}>{d.name}</div>
                      <div style={{ color: "var(--teal)", fontSize: 14, marginTop: 2 }}>{d.specialty}</div>
                      <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 4 }}>{d.experience} experience · {d.cases} cases</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card" style={{ padding: 28 }}>
              <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 20 }}>Patient Reviews</h2>
              {hospital.reviews_list.map((r, i) => (
                <div key={i} style={{ padding: 20, background: "var(--surface)", borderRadius: 12, marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                    <div><span style={{ fontWeight: 600 }}>{r.name}</span> <span style={{ color: "var(--muted)", fontSize: 14 }}>{r.country}</span></div>
                    <div><span style={{ color: "#f59e0b" }}>{"★".repeat(r.rating)}</span></div>
                  </div>
                  <p style={{ color: "var(--slate)", fontSize: 15, lineHeight: 1.7 }}>"{r.text}"</p>
                  <div style={{ fontSize: 13, color: "var(--teal)", marginTop: 8 }}>Procedure: {r.procedure}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ position: "sticky", top: 80, height: "fit-content" }}>
            <div className="card" style={{ padding: 24 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20 }}>Get Free Consultation</h3>
              <div style={{ display: "grid", gap: 12 }}>
                <input placeholder="Your name" />
                <input type="email" placeholder="Email address" />
                <select><option>Select Procedure</option>{hospital.procedures.map(([p]) => <option key={p}>{p}</option>)}</select>
                <button className="btn-primary" style={{ justifyContent: "center" }}>Request Free Consultation</button>
              </div>
              <div style={{ marginTop: 16 }}>
                {["Free 30-min video call with doctor","No commitment required","Response within 24 hours"].map(t => (
                  <div key={t} style={{ fontSize: 13, color: "var(--muted)", display: "flex", gap: 8, marginBottom: 8 }}><span style={{ color: "var(--success)" }}>✓</span>{t}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

"use client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

const categories = [
  { icon: "🦷", name: "Dental", procedures: ["Dental Implants","Veneers","Root Canal","Crowns","Orthodontics","Full Mouth Restoration"], savings: "up to 87%" },
  { icon: "🦴", name: "Orthopedic", procedures: ["Hip Replacement","Knee Replacement","Spine Surgery","Shoulder Surgery","Foot Surgery","Sports Injuries"], savings: "up to 82%" },
  { icon: "❤️", name: "Cardiac", procedures: ["Heart Bypass","Valve Replacement","Angioplasty","Pacemaker","Heart Transplant","TAVR"], savings: "up to 92%" },
  { icon: "👁️", name: "Ophthalmology", procedures: ["LASIK","Cataract Surgery","Glaucoma","Retina Surgery","Corneal Transplant","ICL Surgery"], savings: "up to 80%" },
  { icon: "🎭", name: "Cosmetic", procedures: ["Rhinoplasty","Liposuction","Breast Augmentation","Facelift","Tummy Tuck","Eyelid Surgery"], savings: "up to 75%" },
  { icon: "🧬", name: "Fertility", procedures: ["IVF","Egg Freezing","ICSI","Surrogacy Coordination","Sperm Donation","Embryo Transfer"], savings: "up to 80%" },
  { icon: "⚖️", name: "Bariatric", procedures: ["Gastric Sleeve","Gastric Bypass","Gastric Band","Mini Bypass","Gastric Balloon","Revision Surgery"], savings: "up to 72%" },
  { icon: "🎗️", name: "Oncology", procedures: ["Chemotherapy","Radiation","Immunotherapy","Targeted Therapy","Bone Marrow Transplant","CAR-T Cell Therapy"], savings: "up to 85%" },
  { icon: "💇", name: "Hair Restoration", procedures: ["FUE Hair Transplant","FUT Hair Transplant","PRP Therapy","Scalp Micropigmentation","Eyebrow Transplant","Beard Transplant"], savings: "up to 88%" },
];

export default function Procedures() {
  return (
    <div>
      <Navbar />
      <div style={{ background: "var(--navy)", padding: "80px 0", textAlign: "center" }}>
        <div className="container">
          <h1 style={{ fontSize: 52, fontWeight: 700, color: "white", marginBottom: 16 }}>All Medical Procedures</h1>
          <p style={{ fontSize: 18, color: "#94a3b8" }}>Browse by specialty and find the best hospitals worldwide</p>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {categories.map(cat => (
              <div key={cat.name} className="card" style={{ padding: 28 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <span style={{ fontSize: 32 }}>{cat.icon}</span>
                  <div>
                    <h3 style={{ fontSize: 20, fontWeight: 600 }}>{cat.name}</h3>
                    <div style={{ fontSize: 13, color: "var(--success)", fontWeight: 600 }}>Save {cat.savings}</div>
                  </div>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                  {cat.procedures.map(p => (
                    <Link key={p} href={`/search?procedure=${p}`} style={{ fontSize: 12, padding: "4px 10px", border: "1px solid var(--border)", borderRadius: 20, textDecoration: "none", color: "var(--slate)", background: "var(--surface)" }}>{p}</Link>
                  ))}
                </div>
                <Link href={`/search?category=${cat.name}`} style={{ color: "var(--teal)", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>View all {cat.name} hospitals →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

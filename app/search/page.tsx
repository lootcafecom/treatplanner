"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const currencies: Record<string, { symbol: string; rate: number }> = {
  USD: { symbol: "$", rate: 1 }, EUR: { symbol: "€", rate: 0.92 }, GBP: { symbol: "£", rate: 0.79 },
  INR: { symbol: "₹", rate: 83 }, AUD: { symbol: "A$", rate: 1.53 }, CAD: { symbol: "C$", rate: 1.36 },
  SGD: { symbol: "S$", rate: 1.34 }, JPY: { symbol: "¥", rate: 149 }, AED: { symbol: "د.إ", rate: 3.67 },
  THB: { symbol: "฿", rate: 35 }, MYR: { symbol: "RM", rate: 4.7 }, TRY: { symbol: "₺", rate: 30 },
};

const hospitals = [
  { id: 1, name: "Fortis Memorial Research Institute", country: "🇮🇳 India", city: "Gurugram", rating: 4.9, reviews: 2840, accreditation: "JCI", procedures: { "Hip Replacement": 6500, "Knee Replacement": 5800, "Heart Bypass": 11000, "Cancer Treatment": 8000, "IVF / Fertility": 3200, "Dental Implants": 500 }, flightFrom: 900, hotel: 45, recovery: 14, specialty: "Cardiac & Orthopedic", badge: "Most Popular" },
  { id: 2, name: "Bumrungrad International Hospital", country: "🇹🇭 Thailand", city: "Bangkok", rating: 4.8, reviews: 4210, accreditation: "JCI", procedures: { "Hip Replacement": 8000, "Dental Implants": 800, "Cosmetic Surgery": 3500, "IVF / Fertility": 4000, "LASIK Eye Surgery": 1000, "Bariatric Surgery": 9000 }, flightFrom: 1100, hotel: 55, recovery: 10, specialty: "Dental & Cosmetic", badge: "Top Rated" },
  { id: 3, name: "Acibadem Maslak Hospital", country: "🇹🇷 Turkey", city: "Istanbul", rating: 4.8, reviews: 1920, accreditation: "JCI", procedures: { "Hair Transplant": 1800, "LASIK Eye Surgery": 900, "Dental Implants": 700, "Rhinoplasty": 3500, "IVF / Fertility": 3800, "Bariatric Surgery": 8500 }, flightFrom: 700, hotel: 50, recovery: 7, specialty: "Hair & Ophthalmology", badge: "Best Value" },
  { id: 4, name: "Gleneagles Hospital", country: "🇸🇬 Singapore", city: "Singapore", rating: 4.9, reviews: 3100, accreditation: "JCI", procedures: { "Heart Bypass": 25000, "Cancer Treatment": 22000, "Spine Surgery": 18000, "Kidney Transplant": 35000, "Hip Replacement": 18000, "IVF / Fertility": 8000 }, flightFrom: 1400, hotel: 120, recovery: 14, specialty: "Complex Surgery", badge: "Premium" },
  { id: 5, name: "KPJ Damansara Specialist Hospital", country: "🇲🇾 Malaysia", city: "Kuala Lumpur", rating: 4.7, reviews: 1560, accreditation: "JCI", procedures: { "Hip Replacement": 7000, "Dental Implants": 900, "Bariatric Surgery": 8000, "LASIK Eye Surgery": 1100, "IVF / Fertility": 4500, "Heart Bypass": 13000 }, flightFrom: 1000, hotel: 40, recovery: 12, specialty: "General Surgery", badge: "Great Choice" },
  { id: 6, name: "Hospital Angeles Tijuana", country: "🇲🇽 Mexico", city: "Tijuana", rating: 4.6, reviews: 2200, accreditation: "JCI", procedures: { "Dental Implants": 600, "Bariatric Surgery": 7500, "Hip Replacement": 9000, "Rhinoplasty": 4000, "LASIK Eye Surgery": 1200, "IVF / Fertility": 5000 }, flightFrom: 400, hotel: 35, recovery: 10, specialty: "Dental & Bariatric", badge: "Closest to USA" },
];

function SearchContent() {
  const params = useSearchParams();
  const [procedure, setProcedure] = useState(params.get("procedure") || "");
  const [currency, setCurrency] = useState("USD");
  const [sortBy, setSortBy] = useState("total");
  const [results, setResults] = useState(hospitals);

  const fmt = (usd: number) => {
    const r = currencies[currency];
    return `${r.symbol}${Math.round(usd * r.rate).toLocaleString()}`;
  };

  const getTotal = (h: typeof hospitals[0]) => {
    const proc = procedure && h.procedures[procedure as keyof typeof h.procedures] ? h.procedures[procedure as keyof typeof h.procedures] : Object.values(h.procedures)[0];
    return proc + h.flightFrom + (h.hotel * h.recovery);
  };

  useEffect(() => {
    let filtered = [...hospitals];
    if (procedure) filtered = filtered.filter(h => h.procedures[procedure as keyof typeof h.procedures]);
    if (sortBy === "total") filtered.sort((a, b) => getTotal(a) - getTotal(b));
    if (sortBy === "rating") filtered.sort((a, b) => b.rating - a.rating);
    setResults(filtered);
  }, [procedure, sortBy]);

  return (
    <div>
      <Navbar />
      <div style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)", padding: "24px 0" }}>
        <div className="container">
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            <select value={procedure} onChange={e => setProcedure(e.target.value)} style={{ flex: 1, minWidth: 200 }}>
              <option value="">All Procedures</option>
              {["Hip Replacement","Knee Replacement","Heart Bypass","IVF / Fertility","LASIK Eye Surgery","Hair Transplant","Dental Implants","Bariatric Surgery","Cancer Treatment","Rhinoplasty","Spine Surgery","Kidney Transplant"].map(p => <option key={p}>{p}</option>)}
            </select>
            <select value={currency} onChange={e => setCurrency(e.target.value)} style={{ width: 160 }}>
              {Object.keys(currencies).map(c => <option key={c}>{c}</option>)}
            </select>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ width: 180 }}>
              <option value="total">Sort: Total Cost ↑</option>
              <option value="rating">Sort: Rating ↓</option>
            </select>
            <div style={{ fontSize: 14, color: "var(--muted)", whiteSpace: "nowrap" }}>{results.length} hospitals found</div>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: "32px 24px" }}>
        <div style={{ display: "grid", gap: 20 }}>
          {results.map((h, i) => {
            const procCost = procedure && h.procedures[procedure as keyof typeof h.procedures] ? h.procedures[procedure as keyof typeof h.procedures] : Object.values(h.procedures)[0];
            const hotelTotal = h.hotel * h.recovery;
            const total = procCost + h.flightFrom + hotelTotal;
            return (
              <div key={h.id} className="card" style={{ padding: 28 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 24 }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                      <h3 style={{ fontSize: 20, fontWeight: 600 }}>{h.name}</h3>
                      <span style={{ background: "var(--accent-light)", color: "var(--accent)", padding: "2px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{h.badge}</span>
                      <span style={{ background: "var(--teal-light)", color: "var(--teal)", padding: "2px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{h.accreditation} ✓</span>
                    </div>
                    <div style={{ fontSize: 14, color: "var(--muted)", marginBottom: 16 }}>{h.country} · {h.city} · {h.specialty}</div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 20 }}>
                      <span style={{ color: "#f59e0b", fontSize: 16 }}>{"★".repeat(Math.floor(h.rating))}</span>
                      <span style={{ fontWeight: 600, fontSize: 15 }}>{h.rating}</span>
                      <span style={{ color: "var(--muted)", fontSize: 14 }}>({h.reviews.toLocaleString()} reviews)</span>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
                      {[
                        { label: "🏥 Procedure", value: fmt(procCost) },
                        { label: "✈️ Est. Flight", value: fmt(h.flightFrom) },
                        { label: `🏨 Hotel (${h.recovery} nights)`, value: fmt(hotelTotal) },
                      ].map(item => (
                        <div key={item.label} style={{ background: "var(--surface)", padding: 14, borderRadius: 10 }}>
                          <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 4 }}>{item.label}</div>
                          <div style={{ fontWeight: 600, fontSize: 16 }}>{item.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ textAlign: "right", display: "flex", flexDirection: "column", justifyContent: "space-between", minWidth: 200 }}>
                    <div>
                      <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 4 }}>Total trip cost</div>
                      <div style={{ fontSize: 32, fontWeight: 700, color: "var(--teal)", fontFamily: "Sora" }}>{fmt(total)}</div>
                      <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>incl. procedure + flight + hotel</div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 20 }}>
                      <Link href={`/hospital/${h.id}`} className="btn-primary" style={{ textDecoration: "none", justifyContent: "center" }}>View Hospital →</Link>
                      <Link href={`/book/${h.id}`} className="btn-secondary" style={{ textDecoration: "none", justifyContent: "center" }}>Book Now</Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return <Suspense fallback={<div style={{padding:40,textAlign:"center"}}>Loading...</div>}><SearchContent /></Suspense>;
}

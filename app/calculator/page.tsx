"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

const currencies: Record<string, { symbol: string; rate: number; name: string }> = {
  USD: { symbol: "$", rate: 1, name: "US Dollar" }, EUR: { symbol: "€", rate: 0.92, name: "Euro" },
  GBP: { symbol: "£", rate: 0.79, name: "British Pound" }, INR: { symbol: "₹", rate: 83, name: "Indian Rupee" },
  AUD: { symbol: "A$", rate: 1.53, name: "Australian Dollar" }, CAD: { symbol: "C$", rate: 1.36, name: "Canadian Dollar" },
  SGD: { symbol: "S$", rate: 1.34, name: "Singapore Dollar" }, JPY: { symbol: "¥", rate: 149, name: "Japanese Yen" },
  AED: { symbol: "د.إ", rate: 3.67, name: "UAE Dirham" }, THB: { symbol: "฿", rate: 35, name: "Thai Baht" },
};

const procedurePrices: Record<string, { usa: number; uk: number; india: number; thailand: number; turkey: number; mexico: number }> = {
  "Hip Replacement": { usa: 40000, uk: 15000, india: 6500, thailand: 8000, turkey: 6500, mexico: 9000 },
  "Knee Replacement": { usa: 35000, uk: 14000, india: 5800, thailand: 7500, turkey: 6000, mexico: 8500 },
  "Heart Bypass": { usa: 150000, uk: 35000, india: 11000, thailand: 15000, turkey: 14000, mexico: 18000 },
  "Dental Implant": { usa: 4000, uk: 2500, india: 500, thailand: 800, turkey: 700, mexico: 600 },
  "IVF Treatment": { usa: 20000, uk: 8000, india: 3200, thailand: 4000, turkey: 3800, mexico: 5000 },
  "LASIK Eye Surgery": { usa: 4200, uk: 2800, india: 800, thailand: 1000, turkey: 900, mexico: 1200 },
  "Hair Transplant": { usa: 15000, uk: 8000, india: 2000, thailand: 2500, turkey: 1800, mexico: 3000 },
  "Bariatric Surgery": { usa: 25000, uk: 12000, india: 8000, thailand: 9000, turkey: 8500, mexico: 7500 },
  "Rhinoplasty": { usa: 12000, uk: 7000, india: 3000, thailand: 4000, turkey: 3500, mexico: 4000 },
};

const flightCosts: Record<string, number> = { india: 900, thailand: 1100, turkey: 700, mexico: 400, singapore: 1400, malaysia: 1000 };
const hotelCosts: Record<string, number> = { india: 45, thailand: 55, turkey: 50, mexico: 35, singapore: 120, malaysia: 40 };
const recoveryDays: Record<string, number> = { "Hip Replacement": 14, "Knee Replacement": 14, "Heart Bypass": 21, "Dental Implant": 3, "IVF Treatment": 7, "LASIK Eye Surgery": 3, "Hair Transplant": 5, "Bariatric Surgery": 14, "Rhinoplasty": 10 };

export default function Calculator() {
  const [procedure, setProcedure] = useState("Hip Replacement");
  const [fromCountry, setFromCountry] = useState("usa");
  const [toCountry, setToCountry] = useState("india");
  const [currency, setCurrency] = useState("USD");
  const [companions, setCompanions] = useState(1);

  const fmt = (usd: number) => {
    const r = currencies[currency];
    return `${r.symbol}${Math.round(usd * r.rate).toLocaleString()}`;
  };

  const prices = procedurePrices[procedure] || procedurePrices["Hip Replacement"];
  const homePrice = prices[fromCountry as keyof typeof prices] || prices.usa;
  const abroadPrice = prices[toCountry as keyof typeof prices] || prices.india;
  const flight = (flightCosts[toCountry] || 900) * companions;
  const nights = recoveryDays[procedure] || 10;
  const hotel = (hotelCosts[toCountry] || 45) * nights;
  const misc = 500;
  const totalAbroad = abroadPrice + flight + hotel + misc;
  const savings = homePrice - totalAbroad;
  const savingsPct = Math.round((savings / homePrice) * 100);

  return (
    <div>
      <Navbar />
      <div style={{ background: "var(--navy)", padding: "60px 0 40px", textAlign: "center" }}>
        <div className="container">
          <div className="badge" style={{ marginBottom: 16, background: "rgba(13,148,136,0.2)", color: "#5eead4", border: "1px solid rgba(13,148,136,0.3)" }}>Free Tool</div>
          <h1 style={{ fontSize: 44, fontWeight: 700, color: "white", marginBottom: 12 }}>Total Trip Cost Calculator</h1>
          <p style={{ color: "#94a3b8", fontSize: 17 }}>See your real total cost — procedure + flights + hotel + extras</p>
        </div>
      </div>

      <div className="container" style={{ padding: "48px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          {/* Inputs */}
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 24 }}>Your Details</h2>
            <div style={{ display: "grid", gap: 16 }}>
              {[
                { label: "Procedure", el: <select value={procedure} onChange={e => setProcedure(e.target.value)}>{Object.keys(procedurePrices).map(p => <option key={p}>{p}</option>)}</select> },
                { label: "Your Country (Home)", el: <select value={fromCountry} onChange={e => setFromCountry(e.target.value)}><option value="usa">🇺🇸 United States</option><option value="uk">🇬🇧 United Kingdom</option><option value="india">🇮🇳 India</option></select> },
                { label: "Treatment Destination", el: <select value={toCountry} onChange={e => setToCountry(e.target.value)}><option value="india">🇮🇳 India</option><option value="thailand">🇹🇭 Thailand</option><option value="turkey">🇹🇷 Turkey</option><option value="mexico">🇲🇽 Mexico</option><option value="singapore">🇸🇬 Singapore</option><option value="malaysia">🇲🇾 Malaysia</option></select> },
                { label: "Display Currency", el: <select value={currency} onChange={e => setCurrency(e.target.value)}>{Object.entries(currencies).map(([k, v]) => <option key={k} value={k}>{k} — {v.name}</option>)}</select> },
                { label: "Companions Travelling", el: <input type="number" min={1} max={5} value={companions} onChange={e => setCompanions(Number(e.target.value))} /> },
              ].map(({ label, el }) => (
                <div key={label}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "var(--muted)", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</label>
                  {el}
                </div>
              ))}
            </div>
          </div>

          {/* Results */}
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 24 }}>Cost Breakdown</h2>

            {/* Home cost */}
            <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 12, padding: 20, marginBottom: 16 }}>
              <div style={{ fontSize: 13, color: "#b91c1c", fontWeight: 600, marginBottom: 8, textTransform: "uppercase" }}>At Home Cost</div>
              <div style={{ fontSize: 36, fontWeight: 700, color: "#dc2626", fontFamily: "Sora" }}>{fmt(homePrice)}</div>
              <div style={{ fontSize: 13, color: "#b91c1c", marginTop: 4 }}>Procedure only, no travel</div>
            </div>

            {/* Abroad breakdown */}
            <div style={{ background: "var(--teal-light)", border: "1px solid #99f6e4", borderRadius: 12, padding: 20, marginBottom: 16 }}>
              <div style={{ fontSize: 13, color: "var(--teal-dark)", fontWeight: 600, marginBottom: 16, textTransform: "uppercase" }}>Abroad Total Cost</div>
              {[
                { label: `🏥 ${procedure}`, value: abroadPrice },
                { label: `✈️ Return flights (×${companions})`, value: flight },
                { label: `🏨 Hotel (${nights} nights)`, value: hotel },
                { label: "🧳 Misc (visa, transport, food)", value: misc },
              ].map(item => (
                <div key={item.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: 15 }}>
                  <span style={{ color: "var(--teal-dark)" }}>{item.label}</span>
                  <span style={{ fontWeight: 600, color: "var(--navy)" }}>{fmt(item.value)}</span>
                </div>
              ))}
              <div style={{ borderTop: "1px solid #99f6e4", paddingTop: 12, marginTop: 4, display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: 700, fontSize: 16, color: "var(--teal-dark)" }}>Total Abroad</span>
                <span style={{ fontWeight: 700, fontSize: 22, color: "var(--teal)", fontFamily: "Sora" }}>{fmt(totalAbroad)}</span>
              </div>
            </div>

            {/* Savings */}
            {savings > 0 && (
              <div style={{ background: "var(--navy)", borderRadius: 12, padding: 24, textAlign: "center" }}>
                <div style={{ fontSize: 14, color: "#94a3b8", marginBottom: 8 }}>🎉 You could save</div>
                <div style={{ fontSize: 44, fontWeight: 700, color: "var(--success)", fontFamily: "Sora" }}>{fmt(savings)}</div>
                <div style={{ fontSize: 16, color: "#94a3b8", marginTop: 4 }}>That's {savingsPct}% cheaper than at home!</div>
                <Link href="/search" className="btn-primary" style={{ marginTop: 20, textDecoration: "none", justifyContent: "center", display: "flex" }}>Find Hospitals Now →</Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

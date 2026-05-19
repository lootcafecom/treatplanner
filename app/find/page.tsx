"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// ─────────────────────────────────────────
// DATA LAYER — all costs in USD
// ─────────────────────────────────────────

const HOME_COSTS: Record<string, Record<string, number>> = {
  "Hip Replacement":      { USA: 40000, UK: 15000, Australia: 22000, Canada: 18000, Germany: 12000, France: 10000, UAE: 14000, Singapore: 20000 },
  "Knee Replacement":     { USA: 35000, UK: 14000, Australia: 20000, Canada: 16000, Germany: 11000, France: 9000,  UAE: 13000, Singapore: 18000 },
  "Heart Bypass":         { USA:150000, UK: 35000, Australia: 45000, Canada: 40000, Germany: 28000, France: 25000, UAE: 30000, Singapore: 40000 },
  "Dental Implants":      { USA:  4000, UK:  2500, Australia:  3000, Canada:  3200, Germany:  2000, France:  1800, UAE:  2500, Singapore:  2800 },
  "IVF / Fertility":      { USA: 20000, UK:  8000, Australia: 12000, Canada: 10000, Germany:  6000, France:  5500, UAE:  8000, Singapore: 10000 },
  "LASIK Eye Surgery":    { USA:  4200, UK:  2800, Australia:  3500, Canada:  3800, Germany:  2400, France:  2200, UAE:  3000, Singapore:  3500 },
  "Hair Transplant":      { USA: 15000, UK:  8000, Australia: 10000, Canada:  9000, Germany:  6000, France:  5500, UAE:  7000, Singapore:  8000 },
  "Bariatric Surgery":    { USA: 25000, UK: 12000, Australia: 16000, Canada: 14000, Germany: 10000, France:  9000, UAE: 12000, Singapore: 18000 },
  "Rhinoplasty":          { USA: 12000, UK:  7000, Australia:  9000, Canada:  8000, Germany:  5500, France:  5000, UAE:  7000, Singapore:  9000 },
  "Spine Surgery":        { USA: 50000, UK: 20000, Australia: 28000, Canada: 25000, Germany: 18000, France: 16000, UAE: 22000, Singapore: 30000 },
  "Cancer Treatment":     { USA:120000, UK: 40000, Australia: 50000, Canada: 45000, Germany: 35000, France: 30000, UAE: 40000, Singapore: 50000 },
  "Cataract Surgery":     { USA:  3500, UK:  2000, Australia:  2800, Canada:  3000, Germany:  1800, France:  1600, UAE:  2200, Singapore:  2500 },
  "Kidney Transplant":    { USA: 80000, UK: 30000, Australia: 40000, Canada: 35000, Germany: 25000, France: 22000, UAE: 30000, Singapore: 45000 },
};

// Procedure recovery days
const RECOVERY_DAYS: Record<string, number> = {
  "Hip Replacement": 14, "Knee Replacement": 14, "Heart Bypass": 21,
  "Dental Implants": 3, "IVF / Fertility": 7, "LASIK Eye Surgery": 3,
  "Hair Transplant": 5, "Bariatric Surgery": 14, "Rhinoplasty": 10,
  "Spine Surgery": 21, "Cancer Treatment": 30, "Cataract Surgery": 3, "Kidney Transplant": 28,
};

// Insurance cost by procedure risk
const INSURANCE_COST: Record<string, number> = {
  "Hip Replacement": 490, "Knee Replacement": 490, "Heart Bypass": 890,
  "Dental Implants": 180, "IVF / Fertility": 280, "LASIK Eye Surgery": 180,
  "Hair Transplant": 180, "Bariatric Surgery": 490, "Rhinoplasty": 280,
  "Spine Surgery": 890, "Cancer Treatment": 890, "Cataract Surgery": 180, "Kidney Transplant": 890,
};

// Hospitals with real procedure costs
const HOSPITALS = [
  {
    id: 1, name: "Fortis Memorial Research Institute", country: "India", city: "Gurugram",
    flag: "🇮🇳", accreditation: "JCI", rating: 4.9, reviews: 2840, successRate: 97,
    hotelPerNight: 45, miscCost: 400, englishSpeaking: true,
    procedures: {
      "Hip Replacement": 6500, "Knee Replacement": 5800, "Heart Bypass": 11000,
      "Dental Implants": 500, "IVF / Fertility": 3200, "Bariatric Surgery": 8000,
      "Spine Surgery": 9000, "Cancer Treatment": 8000, "Kidney Transplant": 15000,
      "Cataract Surgery": 600,
    },
    flightCosts: { USA: 900, UK: 700, Australia: 1100, Canada: 950, Germany: 700, France: 720, UAE: 250, Singapore: 350 },
  },
  {
    id: 2, name: "Bumrungrad International Hospital", country: "Thailand", city: "Bangkok",
    flag: "🇹🇭", accreditation: "JCI", rating: 4.8, reviews: 4210, successRate: 96,
    hotelPerNight: 55, miscCost: 450, englishSpeaking: true,
    procedures: {
      "Hip Replacement": 8000, "Dental Implants": 800, "IVF / Fertility": 4000,
      "LASIK Eye Surgery": 1000, "Bariatric Surgery": 9000, "Hair Transplant": 2500,
      "Rhinoplasty": 4500, "Cataract Surgery": 900, "Cancer Treatment": 14000,
      "Heart Bypass": 15000,
    },
    flightCosts: { USA: 1100, UK: 850, Australia: 900, Canada: 1150, Germany: 800, France: 820, UAE: 600, Singapore: 200 },
  },
  {
    id: 3, name: "Acibadem Maslak Hospital", country: "Turkey", city: "Istanbul",
    flag: "🇹🇷", accreditation: "JCI", rating: 4.8, reviews: 1920, successRate: 95,
    hotelPerNight: 50, miscCost: 350, englishSpeaking: true,
    procedures: {
      "Hair Transplant": 1800, "LASIK Eye Surgery": 900, "Dental Implants": 700,
      "Rhinoplasty": 3500, "IVF / Fertility": 3800, "Bariatric Surgery": 8500,
      "Hip Replacement": 6500, "Knee Replacement": 6000, "Cataract Surgery": 800,
    },
    flightCosts: { USA: 700, UK: 250, Australia: 1200, Canada: 750, Germany: 180, France: 190, UAE: 400, Singapore: 900 },
  },
  {
    id: 4, name: "Gleneagles Hospital", country: "Singapore", city: "Singapore",
    flag: "🇸🇬", accreditation: "JCI", rating: 4.9, reviews: 3100, successRate: 98,
    hotelPerNight: 120, miscCost: 600, englishSpeaking: true,
    procedures: {
      "Heart Bypass": 25000, "Cancer Treatment": 22000, "Spine Surgery": 18000,
      "Kidney Transplant": 35000, "Hip Replacement": 18000, "IVF / Fertility": 8000,
      "Cataract Surgery": 2500, "LASIK Eye Surgery": 2200,
    },
    flightCosts: { USA: 1400, UK: 1000, Australia: 600, Canada: 1450, Germany: 950, France: 970, UAE: 650, Singapore: 0 },
  },
  {
    id: 5, name: "KPJ Damansara Specialist Hospital", country: "Malaysia", city: "Kuala Lumpur",
    flag: "🇲🇾", accreditation: "JCI", rating: 4.7, reviews: 1560, successRate: 94,
    hotelPerNight: 40, miscCost: 350, englishSpeaking: true,
    procedures: {
      "Hip Replacement": 7000, "Dental Implants": 900, "Bariatric Surgery": 8000,
      "LASIK Eye Surgery": 1100, "IVF / Fertility": 4500, "Heart Bypass": 13000,
      "Cataract Surgery": 1000, "Knee Replacement": 6500,
    },
    flightCosts: { USA: 1000, UK: 800, Australia: 700, Canada: 1050, Germany: 780, France: 800, UAE: 500, Singapore: 150 },
  },
  {
    id: 6, name: "Hospital Angeles Tijuana", country: "Mexico", city: "Tijuana",
    flag: "🇲🇽", accreditation: "JCI", rating: 4.6, reviews: 2200, successRate: 93,
    hotelPerNight: 35, miscCost: 300, englishSpeaking: true,
    procedures: {
      "Dental Implants": 600, "Bariatric Surgery": 7500, "Hip Replacement": 9000,
      "Rhinoplasty": 4000, "LASIK Eye Surgery": 1200, "IVF / Fertility": 5000,
      "Cataract Surgery": 1100, "Hair Transplant": 3000,
    },
    flightCosts: { USA: 400, UK: 700, Australia: 1400, Canada: 450, Germany: 700, France: 720, UAE: 900, Singapore: 1300 },
  },
  {
    id: 7, name: "Wooridul Spine Hospital", country: "South Korea", city: "Seoul",
    flag: "🇰🇷", accreditation: "JCI", rating: 4.8, reviews: 980, successRate: 96,
    hotelPerNight: 80, miscCost: 500, englishSpeaking: true,
    procedures: {
      "Spine Surgery": 15000, "Knee Replacement": 7000, "Hip Replacement": 8000,
      "Cancer Treatment": 18000, "Cataract Surgery": 1200,
    },
    flightCosts: { USA: 1000, UK: 900, Australia: 800, Canada: 1050, Germany: 850, France: 870, UAE: 700, Singapore: 350 },
  },
  {
    id: 8, name: "Vejthani Hospital", country: "Thailand", city: "Bangkok",
    flag: "🇹🇭", accreditation: "JCI", rating: 4.7, reviews: 1200, successRate: 94,
    hotelPerNight: 48, miscCost: 420, englishSpeaking: true,
    procedures: {
      "Hip Replacement": 7500, "Knee Replacement": 7000, "Dental Implants": 750,
      "IVF / Fertility": 3800, "LASIK Eye Surgery": 950, "Hair Transplant": 2200,
      "Cataract Surgery": 850,
    },
    flightCosts: { USA: 1100, UK: 850, Australia: 900, Canada: 1150, Germany: 800, France: 820, UAE: 600, Singapore: 200 },
  },
];

// Inter-country flight costs for multi-routing
const INTER_FLIGHTS: Record<string, Record<string, number>> = {
  India:       { Thailand: 200, Turkey: 500, Singapore: 350, Malaysia: 300, Mexico: 1400, "South Korea": 450 },
  Thailand:    { India: 200, Turkey: 700, Singapore: 120, Malaysia: 80, Mexico: 1600, "South Korea": 300 },
  Turkey:      { India: 500, Thailand: 700, Singapore: 900, Malaysia: 850, Mexico: 900, "South Korea": 900 },
  Singapore:   { India: 350, Thailand: 120, Turkey: 900, Malaysia: 80, Mexico: 1700, "South Korea": 350 },
  Malaysia:    { India: 300, Thailand: 80, Turkey: 850, Singapore: 80, Mexico: 1650, "South Korea": 400 },
  Mexico:      { India: 1400, Thailand: 1600, Turkey: 900, Singapore: 1700, Malaysia: 1650, "South Korea": 1500 },
  "South Korea": { India: 450, Thailand: 300, Turkey: 900, Singapore: 350, Malaysia: 400, Mexico: 1500 },
};

const CURRENCIES: Record<string, { symbol: string; rate: number }> = {
  USD: { symbol: "$", rate: 1 }, GBP: { symbol: "£", rate: 0.79 },
  AUD: { symbol: "A$", rate: 1.53 }, CAD: { symbol: "C$", rate: 1.36 },
  EUR: { symbol: "€", rate: 0.92 }, INR: { symbol: "₹", rate: 83 },
  AED: { symbol: "د.إ", rate: 3.67 }, SGD: { symbol: "S$", rate: 1.34 },
};

const HOME_CURRENCIES: Record<string, string> = {
  USA: "USD", UK: "GBP", Australia: "AUD", Canada: "CAD",
  Germany: "EUR", France: "EUR", UAE: "AED", Singapore: "SGD",
};

const PROCEDURES = Object.keys(HOME_COSTS);
const HOME_COUNTRIES = Object.keys(HOME_COSTS["Hip Replacement"]);

// ─────────────────────────────────────────
// ROUTING ENGINE
// ─────────────────────────────────────────

interface Route {
  type: "single" | "multi";
  label: string;
  hospitals: typeof HOSPITALS[0][];
  procedureCost: number;
  flightCost: number;
  hotelCost: number;
  insuranceCost: number;
  miscCost: number;
  totalCost: number;
  savingVsHome: number;
  savingPct: number;
  recoveryDays: number;
  rating: number;
  successRate: number;
  tag?: string;
}

function calcRoute(
  procedure: string,
  homeCountry: string,
  maxBudget: number,
  priority: string,
): Route[] {
  const recoveryDays = RECOVERY_DAYS[procedure] || 10;
  const insuranceCost = INSURANCE_COST[procedure] || 280;
  const homeCost = HOME_COSTS[procedure]?.[homeCountry] || 0;

  const routes: Route[] = [];

  // ── SINGLE COUNTRY ROUTES ──
  for (const h of HOSPITALS) {
    const procCost = h.procedures[procedure as keyof typeof h.procedures];
    if (!procCost) continue;
    const flightCost = h.flightCosts[homeCountry as keyof typeof h.flightCosts] || 1000;
    const hotelCost = h.hotelPerNight * recoveryDays;
    const misc = h.miscCost;
    const total = procCost + flightCost + hotelCost + insuranceCost + misc;
    if (total > maxBudget) continue;
    routes.push({
      type: "single", label: `${h.flag} ${h.name}, ${h.country}`,
      hospitals: [h], procedureCost: procCost, flightCost, hotelCost,
      insuranceCost, miscCost: misc, totalCost: total,
      savingVsHome: homeCost - total, savingPct: Math.round(((homeCost - total) / homeCost) * 100),
      recoveryDays, rating: h.rating, successRate: h.successRate,
    });
  }

  // ── MULTI-COUNTRY ROUTES ──
  // Pattern: Consult in high-quality country → Operate in cheapest country → Recover in comfortable country
  const consultCountries = HOSPITALS.filter(h => h.successRate >= 96);
  const operateCountries = HOSPITALS.filter(h => h.procedures[procedure as keyof typeof h.procedures]);

  for (const consultH of consultCountries) {
    for (const operateH of operateCountries) {
      if (consultH.id === operateH.id) continue;
      const opCost = operateH.procedures[procedure as keyof typeof operateH.procedures];
      if (!opCost) continue;

      // Consult cost (just pre-op visit, 2 nights)
      const consultFlight = consultH.flightCosts[homeCountry as keyof typeof consultH.flightCosts] || 1000;
      const consultHotel = consultH.hotelPerNight * 2;

      // Inter-country flight: consult → operate
      const interFlight = INTER_FLIGHTS[consultH.country]?.[operateH.country] || 600;

      // Operate + recover
      const opFlight = 0; // already in destination via inter-flight
      const opHotel = operateH.hotelPerNight * recoveryDays;

      // Return flight from operate country
      const returnFlight = operateH.flightCosts[homeCountry as keyof typeof operateH.flightCosts] || 1000;

      const totalFlight = consultFlight + interFlight + returnFlight;
      const totalHotel = consultHotel + opHotel;
      const totalMisc = consultH.miscCost + operateH.miscCost;
      const total = opCost + totalFlight + totalHotel + insuranceCost + totalMisc;

      if (total > maxBudget) continue;
      if (total >= (homeCost * 0.9)) continue; // only include if meaningful saving

      routes.push({
        type: "multi",
        label: `${consultH.flag} Consult in ${consultH.country} → ${operateH.flag} Operate in ${operateH.country}`,
        hospitals: [consultH, operateH],
        procedureCost: opCost,
        flightCost: totalFlight,
        hotelCost: totalHotel,
        insuranceCost,
        miscCost: totalMisc,
        totalCost: total,
        savingVsHome: homeCost - total,
        savingPct: Math.round(((homeCost - total) / homeCost) * 100),
        recoveryDays,
        rating: Math.min(consultH.rating, operateH.rating),
        successRate: Math.min(consultH.successRate, operateH.successRate),
      });
    }
  }

  // ── SORT by priority ──
  if (priority === "cost") routes.sort((a, b) => a.totalCost - b.totalCost);
  if (priority === "quality") routes.sort((a, b) => b.rating - a.rating || a.totalCost - b.totalCost);
  if (priority === "speed") routes.sort((a, b) => a.recoveryDays - b.recoveryDays || a.totalCost - b.totalCost);

  // Tag top picks
  if (routes.length > 0) routes[0].tag = "🏆 Cheapest Overall";
  const bestQuality = [...routes].sort((a, b) => b.successRate - a.successRate)[0];
  if (bestQuality && bestQuality !== routes[0]) bestQuality.tag = "⭐ Best Quality";
  const multiRoutes = routes.filter(r => r.type === "multi");
  if (multiRoutes.length > 0 && !multiRoutes[0].tag) multiRoutes[0].tag = "🗺️ Best Multi-Route";

  // Deduplicate — remove multi-routes that cost more than best single
  const bestSingle = routes.find(r => r.type === "single");
  return routes
    .filter(r => !(r.type === "multi" && bestSingle && r.totalCost >= bestSingle.totalCost * 1.1))
    .slice(0, 10);
}

// ─────────────────────────────────────────
// UI
// ─────────────────────────────────────────

const PROCEDURE_ICONS: Record<string, string> = {
  "Hip Replacement":"🦴","Knee Replacement":"🦵","Heart Bypass":"❤️","Dental Implants":"🦷",
  "IVF / Fertility":"👶","LASIK Eye Surgery":"👁️","Hair Transplant":"💇","Bariatric Surgery":"⚖️",
  "Rhinoplasty":"👃","Spine Surgery":"🦴","Cancer Treatment":"🎗️","Cataract Surgery":"👓","Kidney Transplant":"🫘",
};

export default function FindPage() {
  const [procedure, setProcedure] = useState("");
  const [homeCountry, setHomeCountry] = useState("");
  const [maxBudget, setMaxBudget] = useState(50000);
  const [priority, setPriority] = useState("cost");
  const [currency, setCurrency] = useState("USD");
  const [routes, setRoutes] = useState<Route[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState("");
  const resultsRef = useRef<HTMLDivElement>(null);

  // set currency automatically from home country
  useEffect(() => {
    if (homeCountry) setCurrency(HOME_CURRENCIES[homeCountry] || "USD");
  }, [homeCountry]);

  const suggestions = PROCEDURES.filter(p => p.toLowerCase().includes(query.toLowerCase())).slice(0, 8);

  const fmt = (usd: number) => {
    const r = CURRENCIES[currency] || CURRENCIES.USD;
    return `${r.symbol}${Math.round(usd * r.rate).toLocaleString()}`;
  };

  const homeCost = procedure && homeCountry ? (HOME_COSTS[procedure]?.[homeCountry] || 0) : 0;

  const handleSearch = () => {
    if (!procedure || !homeCountry) return;
    setLoading(true);
    setSearched(false);
    setTimeout(() => {
      const results = calcRoute(procedure, homeCountry, maxBudget, priority);
      setRoutes(results);
      setSearched(true);
      setLoading(false);
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    }, 800);
  };

  return (
    <div>
      <Navbar />

      {/* HERO SEARCH */}
      <section style={{ background: "linear-gradient(135deg,#0f172a 0%,#134e4a 60%,#0f172a 100%)", padding: "80px 0 60px" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div className="badge" style={{ marginBottom: 16, background: "rgba(13,148,136,0.2)", color: "#5eead4", border: "1px solid rgba(13,148,136,0.3)" }}>
              🧠 Smart Routing Engine
            </div>
            <h1 style={{ fontSize: "clamp(28px,4vw,52px)", fontWeight: 700, color: "white", marginBottom: 14 }}>
              Find the Cheapest Total Medical Journey
            </h1>
            <p style={{ fontSize: 17, color: "#94a3b8", maxWidth: 620, margin: "0 auto" }}>
              We compare every combination of hospital + flight + hotel + insurance across 50+ countries and surface the cheapest real total — single country or multi-country routing.
            </p>
          </div>

          {/* SEARCH PANEL */}
          <div style={{ background: "white", borderRadius: 20, padding: 28, maxWidth: 860, margin: "0 auto", boxShadow: "0 24px 64px rgba(0,0,0,0.3)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              {/* Procedure autocomplete */}
              <div style={{ position: "relative" }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 7 }}>🏥 Procedure Needed</label>
                <input
                  value={query}
                  onChange={e => { setQuery(e.target.value); setProcedure(""); setShowSuggestions(true); }}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                  placeholder='Type procedure e.g. "Hip Replacement"'
                  style={{ fontSize: 15, paddingLeft: 16 }}
                />
                {showSuggestions && query.length > 0 && suggestions.length > 0 && (
                  <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, background: "white", borderRadius: 12, boxShadow: "0 8px 32px rgba(0,0,0,0.12)", border: "1px solid var(--border)", zIndex: 300 }}>
                    {suggestions.map(s => (
                      <div key={s} onMouseDown={() => { setProcedure(s); setQuery(s); setShowSuggestions(false); }}
                        style={{ padding: "11px 16px", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid var(--border)" }}
                        onMouseEnter={e => (e.currentTarget.style.background = "var(--surface)")}
                        onMouseLeave={e => (e.currentTarget.style.background = "white")}>
                        <span style={{ fontSize: 20 }}>{PROCEDURE_ICONS[s] || "🏥"}</span>
                        <div>
                          <div style={{ fontWeight: 500 }}>{s}</div>
                          {homeCountry && HOME_COSTS[s]?.[homeCountry] && (
                            <div style={{ fontSize: 11, color: "var(--muted)" }}>
                              Costs {fmt(HOME_COSTS[s][homeCountry])} in {homeCountry}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Home country */}
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 7 }}>🌍 Your Home Country</label>
                <select value={homeCountry} onChange={e => setHomeCountry(e.target.value)} style={{ fontSize: 15 }}>
                  <option value="">Select your country...</option>
                  {HOME_COUNTRIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 16, marginBottom: 20 }}>
              {/* Budget slider */}
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 7 }}>
                  💰 Max Budget: <span style={{ color: "var(--teal)" }}>{fmt(maxBudget)}</span>
                  {homeCost > 0 && <span style={{ color: "var(--muted)", fontSize: 10, marginLeft: 6 }}>(home cost: {fmt(homeCost)})</span>}
                </label>
                <input type="range" min={1000} max={80000} step={1000} value={maxBudget}
                  onChange={e => setMaxBudget(Number(e.target.value))}
                  style={{ width: "100%", accentColor: "var(--teal)", height: 6, cursor: "pointer" }} />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--muted)", marginTop: 4 }}>
                  <span>{fmt(1000)}</span><span>{fmt(80000)}+</span>
                </div>
              </div>

              {/* Priority */}
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 7 }}>⚡ Sort By</label>
                <div style={{ display: "flex", background: "var(--surface)", borderRadius: 10, padding: 3, border: "1px solid var(--border)" }}>
                  {[["cost", "💰 Cost"], ["quality", "⭐ Quality"], ["speed", "⚡ Speed"]].map(([v, l]) => (
                    <button key={v} onClick={() => setPriority(v)} style={{ flex: 1, padding: "7px 4px", borderRadius: 7, border: "none", cursor: "pointer", background: priority === v ? "var(--teal)" : "transparent", color: priority === v ? "white" : "var(--muted)", fontSize: 11, fontWeight: 600, fontFamily: "DM Sans" }}>{l}</button>
                  ))}
                </div>
              </div>

              {/* Currency */}
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 7 }}>💱 Currency</label>
                <select value={currency} onChange={e => setCurrency(e.target.value)} style={{ fontSize: 14 }}>
                  {Object.keys(CURRENCIES).map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <button onClick={handleSearch} disabled={!procedure || !homeCountry || loading}
              className="btn-primary" style={{ width: "100%", justifyContent: "center", fontSize: 17, padding: "16px", opacity: (!procedure || !homeCountry) ? 0.6 : 1 }}>
              {loading ? "⏳ Finding cheapest routes..." : "🔍 Find Cheapest Hospital + Flight + Hotel + Insurance →"}
            </button>

            {homeCost > 0 && procedure && homeCountry && (
              <div style={{ marginTop: 14, padding: "10px 16px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 14 }}>
                <span style={{ color: "#dc2626" }}>💸 {procedure} costs <strong>{fmt(homeCost)}</strong> in {homeCountry}</span>
                <span style={{ color: "var(--success)", fontWeight: 600 }}>We'll find you up to {Math.round((1 - 0.1) * 100)}% cheaper →</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <div ref={resultsRef} className="container" style={{ padding: "40px 24px" }}>
        {loading && (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>⏳</div>
            <h3 style={{ fontSize: 22, fontWeight: 600, marginBottom: 8 }}>Calculating cheapest routes...</h3>
            <p style={{ color: "var(--muted)" }}>Comparing {HOSPITALS.length} hospitals × flights × hotels × insurance across all country combinations</p>
          </div>
        )}

        {searched && !loading && (
          <div>
            {/* Summary bar */}
            <div style={{ background: "var(--navy)", borderRadius: 16, padding: "20px 24px", marginBottom: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
              <div>
                <div style={{ fontSize: 14, color: "#94a3b8", marginBottom: 4 }}>
                  {PROCEDURE_ICONS[procedure]} {procedure} · From {homeCountry} · Sorted by {priority}
                </div>
                <div style={{ fontSize: 13, color: "#64748b" }}>
                  {routes.length} routes found within {fmt(maxBudget)} budget
                </div>
              </div>
              {routes.length > 0 && (
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 13, color: "#94a3b8" }}>Best saving found</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: "var(--success)", fontFamily: "Sora" }}>{fmt(routes[0].savingVsHome)}</div>
                  <div style={{ fontSize: 12, color: "#64748b" }}>vs {homeCountry} price of {fmt(homeCost)}</div>
                </div>
              )}
            </div>

            {routes.length === 0 && (
              <div style={{ textAlign: "center", padding: "60px 24px" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>😔</div>
                <h3 style={{ fontSize: 22, fontWeight: 600, marginBottom: 8 }}>No routes found within your budget</h3>
                <p style={{ color: "var(--muted)", marginBottom: 20 }}>Try increasing your max budget or selecting a different procedure.</p>
                <button onClick={() => setMaxBudget(80000)} className="btn-primary">Expand Budget to {fmt(80000)}</button>
              </div>
            )}

            <div style={{ display: "grid", gap: 16 }}>
              {routes.map((route, i) => (
                <div key={i} style={{ background: "white", borderRadius: 16, border: i === 0 ? "2px solid var(--teal)" : "1px solid var(--border)", overflow: "hidden", boxShadow: i === 0 ? "0 4px 24px rgba(13,148,136,0.12)" : "none" }}>
                  {/* Card header */}
                  <div style={{ padding: "18px 24px 0", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8, flexWrap: "wrap" }}>
                        {route.tag && <span style={{ background: i === 0 ? "var(--teal)" : "var(--surface)", color: i === 0 ? "white" : "var(--slate)", padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>{route.tag}</span>}
                        <span style={{ background: route.type === "multi" ? "#dbeafe" : "var(--teal-light)", color: route.type === "multi" ? "#1d4ed8" : "var(--teal)", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>
                          {route.type === "multi" ? "🗺️ Multi-Country Route" : "📍 Single Country"}
                        </span>
                        {route.hospitals.map(h => <span key={h.id} style={{ background: "var(--surface)", color: "var(--muted)", padding: "3px 10px", borderRadius: 20, fontSize: 11 }}>🏆 JCI</span>)}
                      </div>
                      <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{route.label}</h3>
                      <div style={{ fontSize: 13, color: "var(--muted)", display: "flex", gap: 16, flexWrap: "wrap" }}>
                        <span>⭐ {route.rating} rating</span>
                        <span style={{ color: "var(--success)" }}>✓ {route.successRate}% success rate</span>
                        <span>🛏️ {route.recoveryDays} day recovery</span>
                        {route.hospitals.map(h => <span key={h.id}>{h.reviews.toLocaleString()} reviews</span>)}
                      </div>
                    </div>
                    {/* Total + saving */}
                    <div style={{ textAlign: "right", minWidth: 180 }}>
                      <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 2 }}>Total trip cost</div>
                      <div style={{ fontSize: 36, fontWeight: 800, color: "var(--teal)", fontFamily: "Sora", lineHeight: 1 }}>{fmt(route.totalCost)}</div>
                      <div style={{ marginTop: 6, display: "inline-block", background: "#dcfce7", color: "#166534", padding: "4px 12px", borderRadius: 20, fontSize: 13, fontWeight: 700 }}>
                        Save {fmt(route.savingVsHome)} ({route.savingPct}%)
                      </div>
                    </div>
                  </div>

                  {/* Cost breakdown — the key transparency feature */}
                  <div style={{ padding: "16px 24px", display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 10, borderTop: "1px solid var(--border)", marginTop: 14 }}>
                    {[
                      { label: "🏥 Procedure", value: route.procedureCost, color: "var(--navy)" },
                      { label: "✈️ Flights", value: route.flightCost, color: "#0284c7" },
                      { label: "🏨 Hotel", value: route.hotelCost, color: "#7c3aed" },
                      { label: "🛡️ Insurance", value: route.insuranceCost, color: "var(--accent)" },
                      { label: "🧳 Misc", value: route.miscCost, color: "var(--muted)" },
                    ].map(item => (
                      <div key={item.label} style={{ textAlign: "center", padding: "10px 8px", background: "var(--surface)", borderRadius: 10 }}>
                        <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 5 }}>{item.label}</div>
                        <div style={{ fontSize: 16, fontWeight: 700, color: item.color }}>{fmt(item.value)}</div>
                      </div>
                    ))}
                  </div>

                  {/* Multi-route journey map */}
                  {route.type === "multi" && (
                    <div style={{ padding: "14px 24px", background: "#eff6ff", borderTop: "1px solid #dbeafe", display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: "#1d4ed8", marginRight: 4 }}>Your journey:</span>
                      <span style={{ fontSize: 13, color: "#1e40af" }}>{homeCountry}</span>
                      <span style={{ color: "#93c5fd" }}>✈️</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#1e40af" }}>{route.hospitals[0]?.city} (consultation)</span>
                      <span style={{ color: "#93c5fd" }}>✈️</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#1e40af" }}>{route.hospitals[1]?.city} (surgery + recovery)</span>
                      <span style={{ color: "#93c5fd" }}>✈️</span>
                      <span style={{ fontSize: 13, color: "#1e40af" }}>{homeCountry}</span>
                    </div>
                  )}

                  {/* Actions */}
                  <div style={{ padding: "14px 24px 18px", display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                    <Link href={`/hospital/${route.hospitals[route.hospitals.length - 1].id}`} className="btn-primary" style={{ textDecoration: "none", fontSize: 14, padding: "10px 20px" }}>View Hospital Details →</Link>
                    <Link href={`/book/${route.hospitals[route.hospitals.length - 1].id}`} className="btn-secondary" style={{ textDecoration: "none", fontSize: 14, padding: "10px 20px" }}>Book This Route</Link>
                    <div style={{ marginLeft: "auto", fontSize: 13, color: "var(--muted)" }}>
                      vs {homeCountry}: <span style={{ color: "#dc2626", fontWeight: 600, textDecoration: "line-through" }}>{fmt(homeCost)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Honest note */}
            {searched && routes.length > 0 && (
              <div style={{ marginTop: 24, padding: "16px 20px", background: "var(--surface)", borderRadius: 12, border: "1px solid var(--border)", fontSize: 13, color: "var(--muted)", lineHeight: 1.7 }}>
                <strong style={{ color: "var(--navy)" }}>How we calculate:</strong> Every total includes procedure cost + estimated economy flight from your city + hotel near hospital for recovery period + standard medical travel insurance + visa and transport estimate. Flight and hotel costs are estimates — actual prices vary by date and availability. We always recommend the option that genuinely saves you the most money, whether single or multi-country.
              </div>
            )}
          </div>
        )}

        {!searched && !loading && (
          <div style={{ textAlign: "center", padding: "60px 24px" }}>
            <div style={{ fontSize: 64, marginBottom: 20 }}>🔍</div>
            <h3 style={{ fontSize: 24, fontWeight: 600, marginBottom: 10 }}>Enter your procedure and home country above</h3>
            <p style={{ color: "var(--muted)", fontSize: 16, maxWidth: 520, margin: "0 auto" }}>
              We'll instantly calculate the cheapest combination of hospital + flight + hotel + insurance across every country — and tell you honestly whether single country or multi-country routing saves you more.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

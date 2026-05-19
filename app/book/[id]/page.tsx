"use client";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";

const steps = ["Select Package", "Your Details", "Medical Info", "Confirm & Pay"];

export default function BookPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", phone: "", country: "", dob: "", notes: "" });

  return (
    <div>
      <Navbar />
      <div style={{ background: "var(--surface)", padding: "40px 0", borderBottom: "1px solid var(--border)" }}>
        <div className="container">
          <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 24 }}>Book Your Treatment</h1>
          <div style={{ display: "flex", gap: 0 }}>
            {steps.map((s, i) => (
              <div key={s} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, background: i <= step ? "var(--teal)" : "var(--border)", color: i <= step ? "white" : "var(--muted)" }}>{i < step ? "✓" : i + 1}</div>
                  <span style={{ fontSize: 14, fontWeight: i === step ? 600 : 400, color: i === step ? "var(--navy)" : "var(--muted)" }}>{s}</span>
                </div>
                {i < steps.length - 1 && <div style={{ flex: 1, height: 2, background: i < step ? "var(--teal)" : "var(--border)", margin: "0 12px" }} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: "40px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 32 }}>
          <div className="card" style={{ padding: 36 }}>
            {step === 0 && (
              <div>
                <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 24 }}>Select Package</h2>
                {[
                  { name: "Basic", price: "$7,400", includes: ["Procedure", "Hospital stay", "Pre-op tests"], recommended: false },
                  { name: "Complete", price: "$8,200", includes: ["Procedure", "Hospital stay", "Pre-op tests", "Airport pickup", "Dedicated coordinator", "Post-op follow-up"], recommended: true },
                  { name: "Premium", price: "$9,800", includes: ["Everything in Complete", "Business class upgrade option", "Private room", "24/7 personal nurse", "Family member accommodation"], recommended: false },
                ].map(pkg => (
                  <div key={pkg.name} className="card" style={{ padding: 24, marginBottom: 16, border: pkg.recommended ? "2px solid var(--teal)" : "1px solid var(--border)", position: "relative" }}>
                    {pkg.recommended && <div style={{ position: "absolute", top: -12, left: 20, background: "var(--teal)", color: "white", padding: "3px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>Recommended</div>}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                      <h3 style={{ fontSize: 20, fontWeight: 600 }}>{pkg.name} Package</h3>
                      <div style={{ fontSize: 24, fontWeight: 700, color: "var(--teal)", fontFamily: "Sora" }}>{pkg.price}</div>
                    </div>
                    {pkg.includes.map(item => <div key={item} style={{ fontSize: 14, color: "var(--slate)", marginBottom: 6, display: "flex", gap: 8 }}><span style={{ color: "var(--success)" }}>✓</span>{item}</div>)}
                  </div>
                ))}
              </div>
            )}

            {step === 1 && (
              <div>
                <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 24 }}>Your Personal Details</h2>
                <div style={{ display: "grid", gap: 16 }}>
                  {[["Full Name","name","John Smith","text"],["Email","email","john@example.com","email"],["Phone Number","phone","+1 234 567 8900","tel"],["Home Country","country","United States","text"],["Date of Birth","dob","","date"]].map(([label, key, placeholder, type]) => (
                    <div key={key}><label style={{ fontSize: 13, fontWeight: 600, color: "var(--muted)", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</label><input type={type} placeholder={placeholder} value={form[key as keyof typeof form]} onChange={e => setForm({...form, [key]: e.target.value})} /></div>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 24 }}>Medical Information</h2>
                <div style={{ background: "var(--accent-light)", border: "1px solid #fde68a", borderRadius: 12, padding: 16, marginBottom: 24, fontSize: 14, color: "#92400e" }}>
                  ⚠️ This information is kept strictly confidential and shared only with your treating doctor.
                </div>
                <div style={{ display: "grid", gap: 16 }}>
                  <div><label style={{ fontSize: 13, fontWeight: 600, color: "var(--muted)", display: "block", marginBottom: 6 }}>CURRENT MEDICATIONS</label><textarea placeholder="List any medications you currently take..." rows={3} style={{ resize: "vertical" }} /></div>
                  <div><label style={{ fontSize: 13, fontWeight: 600, color: "var(--muted)", display: "block", marginBottom: 6 }}>ALLERGIES</label><input placeholder="Any known allergies..." /></div>
                  <div><label style={{ fontSize: 13, fontWeight: 600, color: "var(--muted)", display: "block", marginBottom: 6 }}>PREVIOUS SURGERIES</label><textarea placeholder="Any previous surgeries or medical history..." rows={3} style={{ resize: "vertical" }} /></div>
                  <div><label style={{ fontSize: 13, fontWeight: 600, color: "var(--muted)", display: "block", marginBottom: 6 }}>ADDITIONAL NOTES</label><textarea placeholder="Anything else the doctor should know..." rows={3} value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} style={{ resize: "vertical" }} /></div>
                  <div style={{ padding: 20, border: "2px dashed var(--border)", borderRadius: 12, textAlign: "center", cursor: "pointer" }}>
                    <div style={{ fontSize: 24, marginBottom: 8 }}>📎</div>
                    <p style={{ fontSize: 14, color: "var(--muted)" }}>Upload medical records, scans, or reports</p>
                    <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>PDF, JPG, PNG up to 20MB</p>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 24 }}>Confirm & Pay Deposit</h2>
                <div style={{ background: "var(--teal-light)", borderRadius: 16, padding: 28, marginBottom: 24 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                    <span style={{ fontWeight: 600, fontSize: 16 }}>Complete Package — Fortis India</span>
                    <span style={{ fontWeight: 700, fontSize: 20, color: "var(--teal)" }}>$8,200</span>
                  </div>
                  {[["Deposit due now (20%)","$1,640"],["Balance due at hospital","$6,560"]].map(([l, v]) => (
                    <div key={l} style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 10 }}>
                      <span style={{ color: "var(--slate)" }}>{l}</span><span style={{ fontWeight: 600 }}>{v}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: "grid", gap: 16 }}>
                  <div><label style={{ fontSize: 13, fontWeight: 600, color: "var(--muted)", display: "block", marginBottom: 6 }}>CARD NUMBER</label><input placeholder="1234 5678 9012 3456" /></div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div><label style={{ fontSize: 13, fontWeight: 600, color: "var(--muted)", display: "block", marginBottom: 6 }}>EXPIRY</label><input placeholder="MM/YY" /></div>
                    <div><label style={{ fontSize: 13, fontWeight: 600, color: "var(--muted)", display: "block", marginBottom: 6 }}>CVV</label><input placeholder="123" /></div>
                  </div>
                </div>
                <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 16, display: "flex", gap: 8 }}>
                  <span style={{ color: "var(--success)" }}>🔒</span> Your payment is secured with 256-bit SSL encryption
                </div>
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32 }}>
              {step > 0 ? <button className="btn-secondary" onClick={() => setStep(step - 1)}>← Back</button> : <div />}
              {step < steps.length - 1
                ? <button className="btn-primary" onClick={() => setStep(step + 1)}>Continue →</button>
                : <button className="btn-primary" style={{ background: "var(--success)" }}>✓ Pay Deposit $1,640</button>}
            </div>
          </div>

          {/* Summary */}
          <div>
            <div className="card" style={{ padding: 24, position: "sticky", top: 80 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20 }}>Booking Summary</h3>
              <div style={{ background: "var(--surface)", borderRadius: 12, padding: 16, marginBottom: 16 }}>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>Fortis Memorial Research Institute</div>
                <div style={{ fontSize: 13, color: "var(--muted)" }}>🇮🇳 Gurugram, India · JCI Accredited</div>
              </div>
              {[["Procedure", "Hip Replacement"], ["Est. Travel Dates", "March 15–29, 2025"], ["Recovery Stay", "14 nights"], ["Rating", "⭐ 4.9 (2,840 reviews)"]].map(([l, v]) => (
                <div key={l} style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 12 }}>
                  <span style={{ color: "var(--muted)" }}>{l}</span><span style={{ fontWeight: 500 }}>{v}</span>
                </div>
              ))}
              <div style={{ borderTop: "1px solid var(--border)", paddingTop: 16, marginTop: 4 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 18 }}>
                  <span>Total Cost</span><span style={{ color: "var(--teal)" }}>$8,200</span>
                </div>
                <div style={{ fontSize: 13, color: "var(--success)", marginTop: 8, fontWeight: 600 }}>You save ~$31,800 vs USA price ✓</div>
              </div>
              <div style={{ marginTop: 20, padding: 16, background: "var(--teal-light)", borderRadius: 12 }}>
                {["Free cancellation up to 7 days before","Free video consultation included","24/7 coordinator support"].map(t => (
                  <div key={t} style={{ fontSize: 13, color: "var(--teal-dark)", marginBottom: 8, display: "flex", gap: 8 }}><span>✓</span>{t}</div>
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

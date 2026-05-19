"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Login() {
  const [tab, setTab] = useState<"login"|"signup">("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  return (
    <div>
      <Navbar />
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--surface)", padding: "40px 24px" }}>
        <div className="card" style={{ width: "100%", maxWidth: 440, padding: 48 }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ width: 52, height: 52, background: "var(--teal)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 24 }}>✚</div>
            <h1 style={{ fontSize: 28, fontWeight: 700 }}>{tab === "login" ? "Welcome back" : "Create account"}</h1>
            <p style={{ color: "var(--muted)", marginTop: 8 }}>{tab === "login" ? "Log in to your TreatPlanner account" : "Join 50,000+ patients saving on healthcare"}</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, background: "var(--surface)", borderRadius: 10, padding: 4, marginBottom: 28 }}>
            {(["login", "signup"] as const).map(t => (
              <button key={t} onClick={() => setTab(t)} style={{ padding: "10px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 14, background: tab === t ? "white" : "transparent", color: tab === t ? "var(--navy)" : "var(--muted)", boxShadow: tab === t ? "0 2px 8px rgba(0,0,0,0.08)" : "none", fontFamily: "DM Sans" }}>
                {t === "login" ? "Log In" : "Sign Up"}
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gap: 16 }}>
            {tab === "signup" && <div><label style={{ fontSize: 13, fontWeight: 600, color: "var(--muted)", display: "block", marginBottom: 6 }}>Full Name</label><input placeholder="John Smith" value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>}
            <div><label style={{ fontSize: 13, fontWeight: 600, color: "var(--muted)", display: "block", marginBottom: 6 }}>Email</label><input type="email" placeholder="john@example.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
            <div><label style={{ fontSize: 13, fontWeight: 600, color: "var(--muted)", display: "block", marginBottom: 6 }}>Password</label><input type="password" placeholder="••••••••" value={form.password} onChange={e => setForm({...form, password: e.target.value})} /></div>
          </div>

          <button className="btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 24, padding: "14px" }}>
            {tab === "login" ? "Log In →" : "Create Account →"}
          </button>

          <div style={{ position: "relative", margin: "24px 0", textAlign: "center" }}>
            <div style={{ borderTop: "1px solid var(--border)" }} />
            <span style={{ background: "white", padding: "0 12px", color: "var(--muted)", fontSize: 13, position: "relative", top: -11 }}>or continue with</span>
          </div>

          <button style={{ width: "100%", padding: "12px", border: "1.5px solid var(--border)", borderRadius: 10, background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, fontSize: 15, fontWeight: 500, fontFamily: "DM Sans" }}>
            <span style={{ fontSize: 18 }}>G</span> Continue with Google
          </button>

          <p style={{ textAlign: "center", marginTop: 24, fontSize: 14, color: "var(--muted)" }}>
            {tab === "login" ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => setTab(tab === "login" ? "signup" : "login")} style={{ color: "var(--teal)", fontWeight: 600, background: "none", border: "none", cursor: "pointer", fontSize: 14, fontFamily: "DM Sans" }}>
              {tab === "login" ? "Sign up free" : "Log in"}
            </button>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

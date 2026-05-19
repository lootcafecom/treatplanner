"use client";
import Link from "next/link";
export default function Footer() {
  return (
    <footer style={{ background: "var(--navy)", color: "white", padding: "60px 0 30px" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, background: "var(--teal)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "white", fontSize: 18 }}>✚</span>
              </div>
              <span style={{ fontFamily: "Sora", fontWeight: 700, fontSize: 20 }}>TreatPlanner</span>
            </div>
            <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.7, maxWidth: 280 }}>
              The world's smartest medical tourism platform. Compare hospitals, procedures, and total trip costs across 50+ countries.
            </p>
          </div>
          {[
            { title: "Platform", links: [["Search Hospitals", "/search"], ["Procedures", "/procedures"], ["Cost Calculator", "/calculator"], ["How It Works", "/how-it-works"]] },
            { title: "Company", links: [["About Us", "/about"], ["Contact", "/contact"], ["Blog", "/blog"], ["Careers", "/careers"]] },
            { title: "Legal", links: [["Privacy Policy", "/privacy"], ["Terms of Service", "/terms"], ["Cookie Policy", "/cookies"], ["Disclaimer", "/disclaimer"]] },
          ].map(col => (
            <div key={col.title}>
              <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16, color: "white" }}>{col.title}</h4>
              {col.links.map(([label, href]) => (
                <div key={href} style={{ marginBottom: 10 }}>
                  <Link href={href} style={{ color: "#94a3b8", textDecoration: "none", fontSize: 14, transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--teal)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#94a3b8")}>{label}</Link>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid #1e293b", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ color: "#475569", fontSize: 13 }}>© 2025 TreatPlanner. All rights reserved.</p>
          <div style={{ display: "flex", gap: 16 }}>
            {["JCI Accredited Partners", "HIPAA Compliant", "SSL Secured"].map(t => (
              <span key={t} style={{ fontSize: 12, color: "#475569", display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ color: "var(--success)" }}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

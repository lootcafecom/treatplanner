"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav style={{ background: "white", borderBottom: "1px solid var(--border)", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 36, height: 36, background: "var(--teal)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "white", fontSize: 18 }}>✚</span>
          </div>
          <span style={{ fontFamily: "Sora", fontWeight: 700, fontSize: 20, color: "var(--navy)" }}>Treat<span style={{ color: "var(--teal)" }}>Planner</span></span>
        </Link>

        <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="nav-links">
          {[["Search", "/search"], ["How It Works", "/how-it-works"], ["Procedures", "/procedures"], ["About", "/about"]].map(([label, href]) => (
            <Link key={href} href={href} style={{ textDecoration: "none", color: "var(--slate)", fontWeight: 500, fontSize: 15, transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--teal)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--slate)")}>{label}</Link>
          ))}
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Link href="/login" className="btn-secondary" style={{ padding: "9px 20px", fontSize: 14 }}>Login</Link>
          <Link href="/search" className="btn-primary" style={{ padding: "9px 20px", fontSize: 14 }}>Find Treatment</Link>
        </div>
      </div>
    </nav>
  );
}

"use client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
export default function Contact() {
  return (
    <div>
      <Navbar />
      <div style={{ background: "var(--navy)", padding: "80px 0", textAlign: "center" }}>
        <div className="container">
          <h1 style={{ fontSize: 52, fontWeight: 700, color: "white", marginBottom: 16 }}>Contact Us</h1>
          <p style={{ fontSize: 18, color: "#94a3b8" }}>We are here to help 24/7</p>
        </div>
      </div>
      <section className="section">
        <div className="container" style={{ maxWidth: 700 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
            <div className="card" style={{ padding: 36 }}>
              <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 20 }}>Send a Message</h2>
              <div style={{ display: "grid", gap: 14 }}>
                <input placeholder="Your name" />
                <input type="email" placeholder="your@email.com" />
                <button className="btn-primary" style={{ justifyContent: "center" }}>Send Message</button>
              </div>
            </div>
            <div>
              {[["📧","Email","support@treatplanner.com"],["📞","Phone","+1 888 123 4567"],["💬","Live Chat","Available 24/7"],["⏰","Response","Within 2 hours"]].map(([icon, label, value]) => (
                <div key={label} style={{ display: "flex", gap: 14, marginBottom: 24 }}>
                  <span style={{ fontSize: 24 }}>{icon}</span>
                  <div><div style={{ fontWeight: 600, marginBottom: 2 }}>{label}</div><div style={{ color: "var(--muted)", fontSize: 14 }}>{value}</div></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

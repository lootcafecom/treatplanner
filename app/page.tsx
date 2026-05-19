"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const allProcedures = [
  "Hip Replacement","Knee Replacement","Heart Bypass","Dental Implants","IVF / Fertility",
  "LASIK Eye Surgery","Hair Transplant","Rhinoplasty","Spine Surgery","Cancer Treatment",
  "Bariatric Surgery","Cataract Surgery","Kidney Transplant","Liver Transplant",
  "Shoulder Replacement","Cosmetic Surgery","Orthodontics","Root Canal","Veneers",
  "Gastric Sleeve","Gastric Bypass","Breast Augmentation","Facelift","Tummy Tuck",
  "Angioplasty","Valve Replacement","Chemotherapy","Immunotherapy","Bone Marrow Transplant",
];

const stats = [
  {value:"92%",label:"Average savings vs US"},
  {value:"500+",label:"JCI accredited hospitals"},
  {value:"50+",label:"Countries covered"},
  {value:"98%",label:"Patient satisfaction"},
];

const destinations = [
  {country:"🇮🇳 India",specialty:"Cardiac & Orthopedic",saving:"95%",hospitals:42},
  {country:"🇹🇭 Thailand",specialty:"Dental & Cosmetic",saving:"88%",hospitals:38},
  {country:"🇹🇷 Turkey",specialty:"Hair & Ophthalmology",saving:"85%",hospitals:29},
  {country:"🇲🇽 Mexico",specialty:"Dental & Bariatric",saving:"82%",hospitals:31},
  {country:"🇸🇬 Singapore",specialty:"Complex Surgery",saving:"70%",hospitals:18},
  {country:"🇲🇾 Malaysia",specialty:"General Surgery",saving:"80%",hospitals:24},
];

const testimonials = [
  {name:"Sarah M.",country:"🇺🇸 USA",procedure:"Hip Replacement in India",saved:"$32,000",rating:5,text:"I saved $32,000 compared to my US quote. The hospital was world-class and my coordinator was amazing throughout."},
  {name:"James K.",country:"🇬🇧 UK",procedure:"Dental Implants in Thailand",saved:"£8,500",rating:5,text:"Waited 18 months on NHS. TreatPlanner got me treated in Thailand in 3 weeks for a fraction of the cost."},
  {name:"Anna R.",country:"🇦🇺 Australia",procedure:"IVF in Malaysia",saved:"A$15,000",rating:5,text:"After 3 failed cycles in Australia, we tried Malaysia. Same success rate, much lower stress on our finances."},
];

const faqs = [
  {q:"Is it safe to have surgery abroad?",a:"Yes — we only list JCI-accredited hospitals which meet the same international safety standards as top US and UK hospitals. Over 50,000 patients have used TreatPlanner safely."},
  {q:"What if something goes wrong after I return home?",a:"All bookings include 90-day post-procedure support. We connect you with a local doctor for follow-up, and medical travel insurance covers complications up to 90 days post-procedure."},
  {q:"How do I know the doctor is qualified?",a:"Every doctor on our platform has verified credentials, board certifications, and peer-reviewed case histories. You can see their full profile, success rates, and patient reviews before booking."},
  {q:"Do I need to pay the full amount upfront?",a:"No. You only pay a 20% deposit to confirm your booking. The remaining 80% is paid directly at the hospital before your procedure."},
  {q:"What is multi-country routing?",a:"Like Skyscanner pieces together the cheapest flight combinations, TreatPlanner pieces together your cheapest total medical journey — consult in Singapore, operate in India, recover in Thailand — saving you even more."},
  {q:"Is my medical information kept private?",a:"Absolutely. We are HIPAA and GDPR compliant. Your medical data is encrypted with AES-256 and shared only with your treating doctor under strict confidentiality."},
];

export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selected, setSelected] = useState("");
  const [openFaq, setOpenFaq] = useState<number|null>(null);
  const [alertEmail, setAlertEmail] = useState("");
  const [alertProc, setAlertProc] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // AI-style autocomplete
  useEffect(() => {
    if (query.length < 1) { setSuggestions([]); setShowSuggestions(false); return; }
    const filtered = allProcedures.filter(p => p.toLowerCase().includes(query.toLowerCase())).slice(0, 7);
    setSuggestions(filtered);
    setShowSuggestions(filtered.length > 0);
  }, [query]);

  const handleSelect = (proc: string) => {
    setSelected(proc); setQuery(proc);
    setShowSuggestions(false);
  };

  const handleSearch = () => {
    if (selected || query) router.push(`/search?procedure=${encodeURIComponent(selected||query)}`);
  };

  return (
    <div>
      <Navbar />

      {/* HERO — Screen 1 */}
      <section style={{background:"linear-gradient(135deg,#0f172a 0%,#134e4a 50%,#0f172a 100%)",padding:"100px 0 80px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle at 30% 50%, rgba(13,148,136,0.15) 0%, transparent 60%), radial-gradient(circle at 70% 20%, rgba(14,165,233,0.1) 0%, transparent 50%)"}} />
        <div className="container" style={{position:"relative",textAlign:"center"}}>
          <div className="badge" style={{marginBottom:24,background:"rgba(13,148,136,0.2)",color:"#5eead4",border:"1px solid rgba(13,148,136,0.3)"}}>✚ The Skyscanner of Medical Tourism</div>
          <h1 style={{fontSize:"clamp(36px,5vw,64px)",fontWeight:700,color:"white",marginBottom:20,maxWidth:800,margin:"0 auto 20px"}}>
            Find World-Class Medical Care<br/><span className="gradient-text">At a Fraction of the Cost</span>
          </h1>
          <p style={{fontSize:18,color:"#94a3b8",maxWidth:620,margin:"0 auto 48px",lineHeight:1.8}}>
            The only platform combining medical prices + flights + hotels + insurance + doctor verification into one seamless journey planner.
          </p>

          {/* AI SEARCH BOX */}
          <div style={{background:"white",borderRadius:24,padding:28,maxWidth:720,margin:"0 auto",boxShadow:"0 24px 60px rgba(0,0,0,0.35)"}}>
            <p style={{fontSize:18,fontWeight:600,color:"var(--navy)",marginBottom:16,textAlign:"left"}}>What treatment are you looking for?</p>
            <div style={{position:"relative"}}>
              <div style={{display:"flex",gap:12}}>
                <div style={{position:"relative",flex:1}}>
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={e=>{setQuery(e.target.value);setSelected("");}}
                    onFocus={()=>query.length>0&&setShowSuggestions(true)}
                    onKeyDown={e=>e.key==="Enter"&&handleSearch()}
                    placeholder='Try "Hip Replacement", "Dental", "IVF"...'
                    style={{paddingLeft:44,fontSize:16,height:52}}
                  />
                  <span style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",fontSize:20}}>🔍</span>
                  {/* SUGGESTIONS DROPDOWN */}
                  {showSuggestions && (
                    <div style={{position:"absolute",top:"calc(100% + 6px)",left:0,right:0,background:"white",borderRadius:14,boxShadow:"0 12px 40px rgba(0,0,0,0.15)",border:"1px solid var(--border)",zIndex:200,overflow:"hidden"}}>
                      <div style={{padding:"8px 12px",fontSize:11,fontWeight:600,color:"var(--muted)",textTransform:"uppercase",letterSpacing:1,borderBottom:"1px solid var(--border)"}}>Suggestions</div>
                      {suggestions.map((s,i)=>(
                        <div key={s} onMouseDown={()=>handleSelect(s)} style={{padding:"12px 16px",cursor:"pointer",fontSize:15,display:"flex",alignItems:"center",gap:12,background:i===0&&selected===s?"var(--teal-light)":"white",borderBottom:"1px solid var(--border)"}}
                          onMouseEnter={e=>(e.currentTarget.style.background="var(--surface)")}
                          onMouseLeave={e=>(e.currentTarget.style.background="white")}>
                          <span style={{fontSize:18}}>🏥</span>
                          <div>
                            <div style={{fontWeight:500}}>{s}</div>
                            <div style={{fontSize:12,color:"var(--muted)"}}>Save up to 90% abroad</div>
                          </div>
                          <span style={{marginLeft:"auto",fontSize:12,color:"var(--teal)",fontWeight:600}}>Search →</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <button onClick={handleSearch} className="btn-primary" style={{height:52,padding:"0 28px",fontSize:16,whiteSpace:"nowrap",flexShrink:0}}>Find Hospitals →</button>
              </div>
            </div>
            {/* Quick picks */}
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:16,alignItems:"center"}}>
              <span style={{fontSize:12,color:"var(--muted)"}}>Popular:</span>
              {["Hip Replacement","Dental Implants","IVF","LASIK","Hair Transplant","Heart Bypass"].map(p=>(
                <button key={p} onMouseDown={()=>handleSelect(p)} style={{fontSize:12,padding:"5px 12px",border:"1px solid var(--border)",borderRadius:20,background:selected===p?"var(--teal-light)":"white",color:selected===p?"var(--teal)":"var(--slate)",cursor:"pointer",fontFamily:"DM Sans"}}>{p}</button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:24,maxWidth:680,margin:"48px auto 0"}}>
            {stats.map(s=>(
              <div key={s.value} style={{textAlign:"center"}}>
                <div style={{fontSize:32,fontWeight:700,color:"#5eead4",fontFamily:"Sora"}}>{s.value}</div>
                <div style={{fontSize:13,color:"#64748b",marginTop:4}}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section style={{background:"white",borderBottom:"1px solid var(--border)",padding:"18px 0"}}>
        <div className="container">
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:36,flexWrap:"wrap"}}>
            <span style={{fontSize:12,color:"var(--muted)",fontWeight:600,letterSpacing:1}}>TRUSTED & CERTIFIED:</span>
            {[["🏆","JCI Accredited"],["🌍","WHO Standards"],["🔒","HIPAA Compliant"],["📜","ISO 9001"],["🛡️","GDPR Compliant"],["⭐","50,000+ Patients"]].map(([icon,label])=>(
              <div key={label} style={{display:"flex",alignItems:"center",gap:7,fontSize:14,color:"var(--slate)",fontWeight:500}}>
                <span>{icon}</span>{label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ONE PLATFORM SECTION */}
      <section className="section" style={{background:"var(--surface)"}}>
        <div className="container">
          <div style={{textAlign:"center",marginBottom:48}}>
            <div className="badge" style={{marginBottom:12}}>The Only Platform Like This</div>
            <h2 style={{fontSize:40,fontWeight:700}}>Everything in One Seamless Platform</h2>
            <p style={{color:"var(--muted)",marginTop:12,fontSize:17,maxWidth:700,margin:"12px auto 0"}}>No other platform combines all 6 elements. Most sites just list hospitals — we plan your entire medical journey.</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
            {[
              {icon:"🏥",title:"Medical Price Comparison",desc:"Compare procedure costs across 500+ hospitals in 50+ countries. Real prices, not estimates.",color:"var(--teal)"},
              {icon:"✈️",title:"Flight Search",desc:"Search and compare flights from your city to your treatment destination. Updated in real-time.",color:"#0284c7"},
              {icon:"🏨",title:"Hotel Booking",desc:"Recovery-friendly hotels near your hospital, pre-vetted for comfort and proximity.",color:"#7c3aed"},
              {icon:"🛡️",title:"Insurance",desc:"Medical travel insurance included in your booking. Covers complications up to 90 days post-op.",color:"var(--accent)"},
              {icon:"👨‍⚕️",title:"Doctor Verification",desc:"Every doctor is board-certified, credentials verified, with success rates and real patient reviews.",color:"var(--success)"},
              {icon:"📊",title:"Outcome Tracking",desc:"Track your recovery after treatment. Log symptoms, milestones, and share with your home doctor.",color:"var(--danger)"},
            ].map(item=>(
              <div key={item.title} className="card" style={{padding:28}}>
                <div style={{width:52,height:52,borderRadius:14,background:`${item.color}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,marginBottom:16}}>{item.icon}</div>
                <h3 style={{fontSize:17,fontWeight:600,marginBottom:8}}>{item.title}</h3>
                <p style={{color:"var(--muted)",fontSize:14,lineHeight:1.7}}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MULTI-COUNTRY ROUTING */}
      <section className="section" style={{background:"linear-gradient(135deg,#f0fdfa 0%,#e0f2fe 100%)"}}>
        <div className="container">
          <div style={{textAlign:"center",marginBottom:40}}>
            <div className="badge" style={{marginBottom:12}}>Our Core Feature</div>
            <h2 style={{fontSize:40,fontWeight:700}}>Smart Multi-Country Routing</h2>
            <p style={{color:"var(--muted)",marginTop:12,fontSize:17}}>Like Skyscanner pieces together cheapest flights, we piece together your cheapest complete medical journey</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 60px 1fr",gap:0,alignItems:"center",maxWidth:880,margin:"0 auto 32px"}}>
            <div style={{background:"#fef2f2",border:"2px solid #fecaca",borderRadius:16,padding:28}}>
              <div style={{fontSize:13,fontWeight:700,color:"#dc2626",textTransform:"uppercase",marginBottom:12}}>❌ Single Country (USA)</div>
              <div style={{fontSize:14,color:"var(--slate)",lineHeight:2.1}}>
                🏥 Hip Replacement: <strong>$40,000</strong><br/>
                ✈️ No travel needed<br/>
                ⏳ 6-month waiting list<br/>
                🛡️ Insurance: extra cost<br/>
                <div style={{marginTop:12,fontSize:22,fontWeight:700,color:"#dc2626",fontFamily:"Sora"}}>Total: $40,000</div>
              </div>
            </div>
            <div style={{textAlign:"center",fontSize:24,fontWeight:700,color:"var(--muted)"}}>VS</div>
            <div style={{background:"var(--teal-light)",border:"2px solid #99f6e4",borderRadius:16,padding:28}}>
              <div style={{fontSize:13,fontWeight:700,color:"var(--teal-dark)",textTransform:"uppercase",marginBottom:12}}>✅ TreatPlanner Smart Route</div>
              <div style={{fontSize:14,color:"var(--slate)",lineHeight:2.1}}>
                🇸🇬 Consult in Singapore: <strong>$800</strong><br/>
                🇮🇳 Surgery at Fortis India: <strong>$6,500</strong><br/>
                🇹🇭 Recovery in Thailand: <strong>$1,200</strong><br/>
                ✈️ All flights + hotels: <strong>$3,500</strong><br/>
                <div style={{marginTop:12,fontSize:22,fontWeight:700,color:"var(--teal)",fontFamily:"Sora"}}>Total: $12,000 — Save $28,000 🎉</div>
              </div>
            </div>
          </div>
          <div style={{textAlign:"center"}}>
            <Link href="/find" className="btn-primary" style={{fontSize:16,textDecoration:"none"}}>Find My Cheapest Route →</Link>
          </div>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="section">
        <div className="container">
          <div style={{textAlign:"center",marginBottom:48}}>
            <div className="badge" style={{marginBottom:12}}>Top Destinations</div>
            <h2 style={{fontSize:40,fontWeight:700}}>World's Best Medical Destinations</h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
            {destinations.map((d,i)=>(
              <Link key={i} href={`/search?country=${encodeURIComponent(d.country)}`} style={{textDecoration:"none"}}>
                <div className="card" style={{padding:26,cursor:"pointer"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                    <h3 style={{fontSize:19,fontWeight:600}}>{d.country}</h3>
                    <div style={{background:"var(--teal-light)",color:"var(--teal-dark)",padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:600}}>Save {d.saving}</div>
                  </div>
                  <p style={{color:"var(--muted)",fontSize:14,marginBottom:6}}>Specializes in: <strong style={{color:"var(--slate)"}}>{d.specialty}</strong></p>
                  <p style={{color:"var(--muted)",fontSize:13}}>{d.hospitals} accredited hospitals</p>
                  <div style={{marginTop:14,fontSize:13,color:"var(--teal)",fontWeight:500}}>View hospitals →</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* COST TABLE */}
      <section className="section" style={{background:"var(--navy)"}}>
        <div className="container">
          <div style={{textAlign:"center",marginBottom:48}}>
            <div className="badge" style={{marginBottom:12,background:"rgba(13,148,136,0.2)",color:"#5eead4",border:"1px solid rgba(13,148,136,0.3)"}}>Real Savings</div>
            <h2 style={{fontSize:40,fontWeight:700,color:"white"}}>See How Much You Can Save</h2>
          </div>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",minWidth:700}}>
              <thead>
                <tr style={{borderBottom:"1px solid #1e293b"}}>
                  {["Procedure","🇺🇸 USA","🇬🇧 UK","🇮🇳 India","🇹🇭 Thailand","🇹🇷 Turkey","You Save"].map(h=>(
                    <th key={h} style={{padding:"12px 14px",textAlign:"left",fontSize:12,fontWeight:600,color:"#64748b",textTransform:"uppercase"}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Hip Replacement","$40,000","£12,000","$7,000","$8,000","$6,500","Up to 92%"],
                  ["Dental Implant","$4,000","£2,500","$600","$800","$700","Up to 87%"],
                  ["Heart Bypass","$150,000","£35,000","$12,000","$15,000","$14,000","Up to 92%"],
                  ["IVF Treatment","$20,000","£8,000","$3,500","$4,500","$4,000","Up to 82%"],
                  ["LASIK (both eyes)","$4,200","£2,800","$800","$1,000","$900","Up to 81%"],
                  ["Hair Transplant","$15,000","£8,000","$2,000","$2,500","$1,800","Up to 88%"],
                ].map((row,i)=>(
                  <tr key={i} style={{borderBottom:"1px solid #1e293b"}} onMouseEnter={e=>(e.currentTarget.style.background="#1e293b")} onMouseLeave={e=>(e.currentTarget.style.background="transparent")}>
                    {row.map((cell,j)=>(
                      <td key={j} style={{padding:"14px",fontSize:14,color:j===0?"white":j===row.length-1?"var(--success)":"#94a3b8",fontWeight:j===0||j===row.length-1?600:400}}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{textAlign:"center",marginTop:36}}>
            <Link href="/calculator" className="btn-primary" style={{fontSize:16,textDecoration:"none"}}>Calculate My Total Trip Cost →</Link>
          </div>
        </div>
      </section>

      {/* PRICE ALERTS */}
      <section className="section" style={{background:"var(--surface)"}}>
        <div className="container">
          <div style={{maxWidth:580,margin:"0 auto",textAlign:"center"}}>
            <div className="badge" style={{marginBottom:14}}>🔔 Price Alerts</div>
            <h2 style={{fontSize:34,fontWeight:700,marginBottom:10}}>Get Notified When Prices Drop</h2>
            <p style={{color:"var(--muted)",marginBottom:28,fontSize:15}}>Like flight price alerts — we email you when hospital prices drop for your procedure. Free forever.</p>
            <div style={{background:"white",borderRadius:16,padding:24,border:"1px solid var(--border)",display:"grid",gridTemplateColumns:"1fr 1fr auto",gap:10}}>
              <select value={alertProc} onChange={e=>setAlertProc(e.target.value)} style={{border:"1.5px solid var(--border)",borderRadius:10,padding:"12px 14px",fontSize:14}}>
                <option value="">Select procedure...</option>
                {allProcedures.slice(0,12).map(p=><option key={p}>{p}</option>)}
              </select>
              <input type="email" placeholder="your@email.com" value={alertEmail} onChange={e=>setAlertEmail(e.target.value)} style={{fontSize:14}}/>
              <button className="btn-primary" style={{whiteSpace:"nowrap",padding:"0 20px"}}>🔔 Alert Me</button>
            </div>
            <p style={{fontSize:12,color:"var(--muted)",marginTop:10}}>No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="container">
          <div style={{textAlign:"center",marginBottom:48}}>
            <div className="badge" style={{marginBottom:12}}>Patient Stories</div>
            <h2 style={{fontSize:40,fontWeight:700}}>Real People, Real Savings</h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:24}}>
            {testimonials.map((t,i)=>(
              <div key={i} className="card" style={{padding:28}}>
                <div style={{marginBottom:12}}>{Array(t.rating).fill("⭐").join("")}</div>
                <p style={{color:"var(--slate)",lineHeight:1.8,marginBottom:20,fontSize:15}}>"{t.text}"</p>
                <div style={{borderTop:"1px solid var(--border)",paddingTop:18}}>
                  <div style={{fontWeight:600}}>{t.name} {t.country}</div>
                  <div style={{fontSize:13,color:"var(--muted)",marginTop:4}}>{t.procedure}</div>
                  <div style={{marginTop:8,fontSize:15,fontWeight:700,color:"var(--success)"}}>Saved {t.saved}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{background:"var(--surface)"}}>
        <div className="container" style={{maxWidth:780}}>
          <div style={{textAlign:"center",marginBottom:44}}>
            <div className="badge" style={{marginBottom:12}}>Common Questions</div>
            <h2 style={{fontSize:40,fontWeight:700}}>Frequently Asked Questions</h2>
          </div>
          {faqs.map((faq,i)=>(
            <div key={i} style={{marginBottom:10}}>
              <button onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{width:"100%",textAlign:"left",padding:"18px 22px",background:"white",border:"1px solid var(--border)",borderRadius:openFaq===i?"12px 12px 0 0":"12px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",fontFamily:"DM Sans"}}>
                <span style={{fontWeight:600,fontSize:15,color:"var(--navy)"}}>{faq.q}</span>
                <span style={{color:"var(--teal)",fontSize:22,transform:openFaq===i?"rotate(45deg)":"none",transition:"transform 0.2s",flexShrink:0}}>+</span>
              </button>
              {openFaq===i&&(
                <div style={{padding:"18px 22px",background:"white",border:"1px solid var(--border)",borderTop:"none",borderRadius:"0 0 12px 12px"}}>
                  <p style={{color:"var(--slate)",lineHeight:1.8,fontSize:14}}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{background:"linear-gradient(135deg,var(--teal) 0%,#0284c7 100%)",padding:"80px 0",textAlign:"center"}}>
        <div className="container">
          <h2 style={{fontSize:44,fontWeight:700,color:"white",marginBottom:14}}>Ready to Save on Your Treatment?</h2>
          <p style={{fontSize:18,color:"rgba(255,255,255,0.85)",marginBottom:36,maxWidth:500,margin:"0 auto 36px"}}>Join 50,000+ patients who found world-class care at a fraction of the price.</p>
          <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
            <Link href="/find" style={{background:"white",color:"var(--teal)",padding:"14px 32px",borderRadius:10,fontWeight:700,fontSize:16,textDecoration:"none"}}>Search Hospitals Free →</Link>
            <Link href="/calculator" style={{background:"rgba(255,255,255,0.15)",color:"white",padding:"14px 32px",borderRadius:10,fontWeight:600,fontSize:16,textDecoration:"none",border:"2px solid rgba(255,255,255,0.4)"}}>Calculate My Savings</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

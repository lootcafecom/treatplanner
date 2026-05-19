"use client";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";

const hospital = {
  name:"Fortis Memorial Research Institute",country:"🇮🇳 India",city:"Gurugram, New Delhi NCR",
  rating:4.9,reviews:2840,founded:1996,beds:1000,successRate:97,
  accreditation:["JCI","NABH","ISO 9001"],
  specialty:"Cardiac Surgery, Orthopedics, Oncology",
  about:"Fortis Memorial Research Institute is one of India's most advanced multi-specialty tertiary care hospitals with cutting-edge robotic surgery, advanced imaging, and dedicated ICU. Recognised globally for cardiac, orthopaedic, and oncology excellence.",
  procedures:[["Hip Replacement","$6,500","14 days","97%"],["Knee Replacement","$5,800","14 days","96%"],["Heart Bypass","$11,000","21 days","98%"],["Cancer Treatment","$8,000","Varies","94%"],["IVF","$3,200","7 days","72%"],["Spine Surgery","$9,000","21 days","95%"]],
  doctors:[
    {name:"Dr. Vivek Vij",specialty:"Orthopedics",experience:"22 years",cases:"4,200+",education:"AIIMS Delhi, Fellowship UK",languages:"English, Hindi"},
    {name:"Dr. Ashok Seth",specialty:"Cardiology",experience:"30 years",cases:"12,000+",education:"AIIMS Delhi, Fellowship USA",languages:"English, Hindi"},
    {name:"Dr. Rajeev Gupta",specialty:"Oncology",experience:"18 years",cases:"3,800+",education:"Tata Memorial, Fellowship Germany",languages:"English, Hindi"},
  ],
  reviews_list:[
    {name:"Sarah M.",country:"🇺🇸 USA",rating:5,text:"Absolutely incredible experience. My hip replacement was perfect and I saved $32,000. The coordinator met me at the airport.",procedure:"Hip Replacement",date:"March 2025"},
    {name:"James K.",country:"🇬🇧 UK",rating:5,text:"World-class hospital. Doctors speak perfect English, care is excellent, facility is spotless.",procedure:"Heart Bypass",date:"January 2025"},
    {name:"Anna R.",country:"🇦🇺 Australia",rating:4,text:"Very professional team. The coordinator made everything seamless.",procedure:"IVF",date:"February 2025"},
  ],
  insuranceAccepted:["Cigna","Aetna","BUPA","AXA","Allianz","United Healthcare"],
  tourStops:["Main Reception & Lobby","Operating Theatres (12 suites)","ICU & Critical Care","Private Patient Rooms","Diagnostic Imaging Centre","Pharmacy & Recovery Lounge"],
};

export default function HospitalPage() {
  const [tab, setTab] = useState<"overview"|"procedures"|"doctors"|"gallery"|"reviews"|"tour">("overview");
  const [saved, setSaved] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMsg, setChatMsg] = useState("");
  const [chatHistory, setChatHistory] = useState([{from:"bot",text:"Hi! I'm the Fortis Hospital assistant. How can I help you today?"}]);

  const sendChat = () => {
    if(!chatMsg.trim()) return;
    setChatHistory(h=>[...h,{from:"user",text:chatMsg},{from:"bot",text:"Thank you for your question! Our patient coordinator will respond within 2 hours. You can also call us at +91 124 496 2222."}]);
    setChatMsg("");
  };

  return (
    <div>
      <Navbar/>

      {/* SCREEN 4 HEADER */}
      <div style={{background:"var(--navy)",padding:"56px 0 0"}}>
        <div className="container">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:20,paddingBottom:24}}>
            <div>
              <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"}}>
                {hospital.accreditation.map(a=><span key={a} style={{background:"rgba(13,148,136,0.2)",color:"#5eead4",padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:600,border:"1px solid rgba(13,148,136,0.3)"}}>{a} ✓</span>)}
                <span style={{background:"#dcfce7",color:"#166534",padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:600}}>✓ {hospital.successRate}% Success Rate</span>
              </div>
              <h1 style={{fontSize:32,fontWeight:700,color:"white",marginBottom:8}}>{hospital.name}</h1>
              <p style={{color:"#94a3b8",fontSize:15}}>{hospital.country} · {hospital.city} · Est. {hospital.founded} · {hospital.beds} beds</p>
              <div style={{display:"flex",alignItems:"center",gap:12,marginTop:14}}>
                <span style={{color:"#f59e0b",fontSize:18}}>{"★".repeat(Math.floor(hospital.rating))}</span>
                <span style={{fontSize:20,fontWeight:700,color:"white"}}>{hospital.rating}</span>
                <span style={{color:"#64748b"}}>({hospital.reviews.toLocaleString()} patient reviews)</span>
              </div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{fontSize:13,color:"#94a3b8",marginBottom:4}}>Hip Replacement from</div>
              <div style={{fontSize:40,fontWeight:700,color:"var(--teal)",fontFamily:"Sora"}}>$6,500</div>
              <div style={{display:"flex",gap:10,marginTop:12,justifyContent:"flex-end"}}>
                <button onClick={()=>setSaved(!saved)} style={{padding:"9px 16px",borderRadius:8,border:"1px solid #334155",background:"transparent",color:saved?"#f59e0b":"#94a3b8",cursor:"pointer",fontFamily:"DM Sans",fontSize:14}}>{saved?"❤️ Saved":"🤍 Save"}</button>
                <Link href="/book/1" className="btn-primary" style={{textDecoration:"none",display:"inline-flex"}}>Book Now →</Link>
              </div>
            </div>
          </div>

          {/* TABS */}
          <div style={{display:"flex",gap:0,borderBottom:"1px solid #1e293b",overflowX:"auto"}}>
            {([["overview","📋 Overview"],["procedures","💊 Procedures"],["doctors","👨‍⚕️ Doctors"],["gallery","📸 Before/After"],["reviews","⭐ Reviews"],["tour","🏥 Virtual Tour"]] as const).map(([key,label])=>(
              <button key={key} onClick={()=>setTab(key)} style={{padding:"12px 20px",border:"none",background:"transparent",color:tab===key?"white":"#64748b",fontWeight:tab===key?600:400,fontSize:14,cursor:"pointer",borderBottom:tab===key?"2px solid var(--teal)":"2px solid transparent",fontFamily:"DM Sans",whiteSpace:"nowrap"}}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{padding:"32px 24px"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 320px",gap:28}}>
          <div>

            {tab==="overview"&&(
              <div>
                <div className="card" style={{padding:24,marginBottom:20}}>
                  <h2 style={{fontSize:20,fontWeight:600,marginBottom:14}}>About the Hospital</h2>
                  <p style={{color:"var(--slate)",lineHeight:1.8}}>{hospital.about}</p>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginTop:20}}>
                    {[["97%","Success Rate"],["30+","Specialties"],["24/7","Emergency"],["12","OR Suites"],["1000","Beds"],["25+","Years"]].map(([v,l])=>(
                      <div key={l} style={{textAlign:"center",padding:14,background:"var(--surface)",borderRadius:10}}>
                        <div style={{fontSize:22,fontWeight:700,color:"var(--teal)",fontFamily:"Sora"}}>{v}</div>
                        <div style={{fontSize:12,color:"var(--muted)",marginTop:3}}>{l}</div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Video Testimonials */}
                <div className="card" style={{padding:24,marginBottom:20}}>
                  <h2 style={{fontSize:20,fontWeight:600,marginBottom:14}}>🎬 Patient Video Testimonials</h2>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                    {[{name:"Sarah M. — Hip Replacement",country:"🇺🇸 USA",duration:"2:34"},{name:"James K. — Heart Bypass",country:"🇬🇧 UK",duration:"3:12"}].map(v=>(
                      <div key={v.name} style={{background:"var(--navy)",borderRadius:12,padding:20,cursor:"pointer",position:"relative",aspectRatio:"16/9",display:"flex",flexDirection:"column",justifyContent:"flex-end"}}>
                        <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
                          <div style={{width:52,height:52,borderRadius:"50%",background:"rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,backdropFilter:"blur(4px)"}}>▶️</div>
                        </div>
                        <div style={{position:"relative",zIndex:1}}>
                          <div style={{color:"white",fontWeight:600,fontSize:13}}>{v.name}</div>
                          <div style={{color:"#94a3b8",fontSize:12,marginTop:2}}>{v.country} · {v.duration}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Insurance */}
                <div className="card" style={{padding:24}}>
                  <h2 style={{fontSize:20,fontWeight:600,marginBottom:14}}>Insurance Accepted</h2>
                  <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                    {hospital.insuranceAccepted.map(ins=>(
                      <span key={ins} style={{padding:"6px 14px",background:"var(--surface)",border:"1px solid var(--border)",borderRadius:20,fontSize:13,color:"var(--slate)"}}>{ins}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {tab==="procedures"&&(
              <div className="card" style={{padding:24}}>
                <h2 style={{fontSize:20,fontWeight:600,marginBottom:18}}>Procedures, Prices & Success Rates</h2>
                <table style={{width:"100%",borderCollapse:"collapse"}}>
                  <thead><tr style={{borderBottom:"1px solid var(--border)"}}>{["Procedure","Cost","Recovery","Success Rate",""].map(h=><th key={h} style={{padding:"10px 12px",textAlign:"left",fontSize:11,fontWeight:600,color:"var(--muted)",textTransform:"uppercase"}}>{h}</th>)}</tr></thead>
                  <tbody>{hospital.procedures.map(([p,c,r,s])=>(
                    <tr key={p} style={{borderBottom:"1px solid var(--border)"}} onMouseEnter={e=>e.currentTarget.style.background="var(--surface)"} onMouseLeave={e=>e.currentTarget.style.background="white"}>
                      <td style={{padding:"13px 12px",fontWeight:500}}>{p}</td>
                      <td style={{padding:"13px 12px",color:"var(--teal)",fontWeight:700,fontSize:17,fontFamily:"Sora"}}>{c}</td>
                      <td style={{padding:"13px 12px",color:"var(--muted)",fontSize:13}}>{r}</td>
                      <td style={{padding:"13px 12px"}}><span style={{background:"#dcfce7",color:"#166534",padding:"2px 9px",borderRadius:20,fontSize:12,fontWeight:600}}>{s}</span></td>
                      <td style={{padding:"13px 12px"}}><Link href="/book/1" style={{color:"var(--teal)",fontSize:13,fontWeight:600,textDecoration:"none"}}>Book →</Link></td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            )}

            {tab==="doctors"&&(
              <div style={{display:"grid",gap:16}}>
                {hospital.doctors.map(d=>(
                  <div key={d.name} className="card" style={{padding:24}}>
                    <div style={{display:"flex",gap:18,alignItems:"flex-start"}}>
                      <div style={{width:68,height:68,background:"var(--teal-light)",borderRadius:18,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,flexShrink:0}}>👨‍⚕️</div>
                      <div style={{flex:1}}>
                        <h3 style={{fontSize:19,fontWeight:600,marginBottom:4}}>{d.name}</h3>
                        <div style={{color:"var(--teal)",fontSize:14,fontWeight:500,marginBottom:12}}>{d.specialty}</div>
                        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                          {[["Experience",d.experience],["Cases",d.cases],["Education",d.education],["Languages",d.languages]].map(([l,v])=>(
                            <div key={l} style={{background:"var(--surface)",padding:10,borderRadius:8}}>
                              <div style={{fontSize:11,color:"var(--muted)",marginBottom:2}}>{l}</div>
                              <div style={{fontSize:13,fontWeight:500}}>{v}</div>
                            </div>
                          ))}
                        </div>
                        <div style={{display:"flex",gap:8,marginTop:12,alignItems:"center"}}>
                          <span style={{background:"#dcfce7",color:"#166534",padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:600}}>✓ Board Certified</span>
                          <span style={{background:"var(--teal-light)",color:"var(--teal)",padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:600}}>✓ Credentials Verified</span>
                        </div>
                        <button className="btn-secondary" style={{marginTop:12,fontSize:13,padding:"8px 16px"}}>Book Consultation with {d.name.split(" ")[1]}</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab==="gallery"&&(
              <div className="card" style={{padding:24}}>
                <h2 style={{fontSize:20,fontWeight:600,marginBottom:6}}>📸 Before & After Gallery</h2>
                <p style={{color:"var(--muted)",fontSize:14,marginBottom:20}}>Patient-consented photos showing treatment outcomes. Available for cosmetic procedures.</p>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
                  {[["Joint Replacement","Hip & Knee outcomes"],[" Hair Transplant","FUE graft results"],["Rhinoplasty","Nasal reshaping outcomes"],["Dental","Smile restoration"]].map(([title,desc],i)=>(
                    <div key={i} style={{borderRadius:12,overflow:"hidden",border:"1px solid var(--border)"}}>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",height:120}}>
                        <div style={{background:`hsl(${200+i*30},30%,85%)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,color:"var(--muted)",fontWeight:500}}>Before</div>
                        <div style={{background:`hsl(${160+i*20},60%,75%)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,color:"white",fontWeight:500}}>After</div>
                      </div>
                      <div style={{padding:10}}>
                        <div style={{fontWeight:600,fontSize:13}}>{title}</div>
                        <div style={{fontSize:12,color:"var(--muted)",marginTop:2}}>{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{padding:14,background:"var(--surface)",borderRadius:10,fontSize:13,color:"var(--muted)"}}>
                  * All photos shared with explicit patient consent. Individual results may vary. Consult your doctor for realistic outcome expectations.
                </div>
              </div>
            )}

            {tab==="reviews"&&(
              <div>
                <div style={{background:"var(--surface)",borderRadius:16,padding:22,marginBottom:20,display:"grid",gridTemplateColumns:"auto 1fr",gap:20,alignItems:"center"}}>
                  <div style={{textAlign:"center"}}>
                    <div style={{fontSize:52,fontWeight:700,color:"var(--teal)",fontFamily:"Sora"}}>{hospital.rating}</div>
                    <div style={{color:"#f59e0b",fontSize:22}}>★★★★★</div>
                    <div style={{fontSize:13,color:"var(--muted)",marginTop:4}}>{hospital.reviews.toLocaleString()} reviews</div>
                  </div>
                  <div>{[5,4,3,2,1].map(star=>(
                    <div key={star} style={{display:"flex",alignItems:"center",gap:10,marginBottom:7}}>
                      <span style={{fontSize:12,width:16}}>{star}★</span>
                      <div style={{flex:1,height:7,background:"var(--border)",borderRadius:4,overflow:"hidden"}}>
                        <div style={{width:star===5?"80%":star===4?"15%":"5%",height:"100%",background:"var(--teal)",borderRadius:4}}/>
                      </div>
                      <span style={{fontSize:11,color:"var(--muted)",width:28,textAlign:"right"}}>{star===5?"80%":star===4?"15%":"5%"}</span>
                    </div>
                  ))}</div>
                </div>
                {hospital.reviews_list.map((r,i)=>(
                  <div key={i} className="card" style={{padding:22,marginBottom:14}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                      <div><span style={{fontWeight:600}}>{r.name}</span> <span style={{color:"var(--muted)",fontSize:13}}>{r.country}</span></div>
                      <div style={{fontSize:12,color:"var(--muted)"}}>{r.date}</div>
                    </div>
                    <div style={{color:"#f59e0b",marginBottom:8,fontSize:14}}>{"★".repeat(r.rating)}</div>
                    <p style={{color:"var(--slate)",fontSize:14,lineHeight:1.7}}>"{r.text}"</p>
                    <div style={{fontSize:12,color:"var(--teal)",marginTop:8,fontWeight:500}}>Procedure: {r.procedure}</div>
                  </div>
                ))}
              </div>
            )}

            {tab==="tour"&&(
              <div className="card" style={{padding:24}}>
                <h2 style={{fontSize:20,fontWeight:600,marginBottom:8}}>🏥 Virtual Hospital Tour</h2>
                <p style={{color:"var(--muted)",marginBottom:20,fontSize:14}}>Explore the hospital before you visit. 360° interactive tour.</p>
                <div style={{background:"var(--navy)",borderRadius:14,minHeight:200,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",marginBottom:20,padding:32,textAlign:"center"}}>
                  <div style={{fontSize:48,marginBottom:12}}>🏥</div>
                  <p style={{color:"#94a3b8",fontSize:15,marginBottom:4}}>Interactive 360° Virtual Tour</p>
                  <p style={{color:"#64748b",fontSize:13,marginBottom:20}}>Connect Matterport or Google Street View for full tour</p>
                  <button className="btn-primary">▶ Start Virtual Tour</button>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                  {hospital.tourStops.map(stop=>(
                    <div key={stop} style={{padding:12,background:"var(--surface)",borderRadius:10,fontSize:13,display:"flex",gap:8,alignItems:"center"}}>
                      <span style={{color:"var(--teal)"}}>📍</span>{stop}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SIDEBAR */}
          <div style={{position:"sticky",top:80,height:"fit-content",display:"flex",flexDirection:"column",gap:16}}>
            {/* Consultation form */}
            <div className="card" style={{padding:22}}>
              <h3 style={{fontSize:17,fontWeight:600,marginBottom:16}}>Ask a Question</h3>
              <div style={{display:"grid",gap:10}}>
                <input placeholder="Your name"/>
                <input type="email" placeholder="Email address"/>
                <select style={{border:"1.5px solid var(--border)",borderRadius:10,padding:"11px 14px",fontSize:14}}>
                  <option>Select Procedure</option>
                  {hospital.procedures.map(([p])=><option key={p}>{p}</option>)}
                </select>
                <button className="btn-primary" style={{justifyContent:"center"}}>📞 Free Video Consultation</button>
              </div>
              <div style={{marginTop:12}}>
                {["Free 30-min video call","No commitment","Reply within 24h","Available in 12 languages"].map(t=>(
                  <div key={t} style={{fontSize:12,color:"var(--muted)",display:"flex",gap:7,marginBottom:7}}><span style={{color:"var(--success)"}}>✓</span>{t}</div>
                ))}
              </div>
            </div>
            {/* Quick facts */}
            <div className="card" style={{padding:22}}>
              <h3 style={{fontSize:15,fontWeight:600,marginBottom:12}}>Quick Facts</h3>
              {[["🏆","Accreditation","JCI, NABH, ISO"],["✅","Success Rate","97% overall"],["🌍","Languages","English + 8 more"],["⏱️","Wait Time","1–2 weeks"],["💳","Insurance","All major"],["🚑","Emergency","24/7"]].map(([icon,label,val])=>(
                <div key={label} style={{display:"flex",gap:10,marginBottom:10,alignItems:"flex-start"}}>
                  <span style={{fontSize:17}}>{icon}</span>
                  <div><div style={{fontSize:11,color:"var(--muted)"}}>{label}</div><div style={{fontSize:13,fontWeight:500}}>{val}</div></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* LIVE CHAT WIDGET */}
      <div style={{position:"fixed",bottom:24,right:24,zIndex:1000}}>
        {chatOpen&&(
          <div style={{width:320,background:"white",borderRadius:16,boxShadow:"0 16px 48px rgba(0,0,0,0.2)",border:"1px solid var(--border)",marginBottom:12,overflow:"hidden"}}>
            <div style={{background:"var(--teal)",padding:"14px 18px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div style={{color:"white",fontWeight:600,fontSize:15}}>💬 Ask Fortis Hospital</div>
                <div style={{color:"rgba(255,255,255,0.8)",fontSize:12}}>Usually replies within 2 hours</div>
              </div>
              <button onClick={()=>setChatOpen(false)} style={{background:"transparent",border:"none",color:"white",fontSize:20,cursor:"pointer",lineHeight:1}}>×</button>
            </div>
            <div style={{height:200,overflowY:"auto",padding:14,display:"flex",flexDirection:"column",gap:10}}>
              {chatHistory.map((msg,i)=>(
                <div key={i} style={{display:"flex",justifyContent:msg.from==="user"?"flex-end":"flex-start"}}>
                  <div style={{maxWidth:"80%",padding:"8px 12px",borderRadius:msg.from==="user"?"12px 12px 4px 12px":"12px 12px 12px 4px",background:msg.from==="user"?"var(--teal)":"var(--surface)",color:msg.from==="user"?"white":"var(--navy)",fontSize:13,lineHeight:1.5}}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div style={{padding:12,borderTop:"1px solid var(--border)",display:"flex",gap:8}}>
              <input value={chatMsg} onChange={e=>setChatMsg(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendChat()} placeholder="Type your question..." style={{flex:1,fontSize:13,padding:"8px 12px",borderRadius:8}}/>
              <button onClick={sendChat} className="btn-primary" style={{padding:"8px 14px",fontSize:13}}>Send</button>
            </div>
          </div>
        )}
        <button onClick={()=>setChatOpen(!chatOpen)} className="btn-primary" style={{borderRadius:"50%",width:56,height:56,justifyContent:"center",fontSize:22,padding:0,boxShadow:"0 8px 24px rgba(13,148,136,0.4)"}}>
          {chatOpen?"×":"💬"}
        </button>
      </div>

      <Footer/>
    </div>
  );
}

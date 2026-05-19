"use client";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";

const steps = ["Package","Medical Records","Video Consult","Travel Dates","Insurance","Visa Check","Pay Deposit"];

export default function BookPage() {
  const [step, setStep] = useState(0);
  const [pkg, setPkg] = useState("complete");
  const [insurance, setInsurance] = useState("comprehensive");
  const [concierge, setConcierge] = useState(false);
  const [consultSlot, setConsultSlot] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [visaChecks, setVisaChecks] = useState([false,false,false,false]);
  const [form, setForm] = useState({name:"",email:"",phone:"",country:"",dob:""});

  const pkgPrices:Record<string,number> = {basic:7400,complete:8200,premium:9800};
  const insPrices:Record<string,number> = {none:0,standard:280,comprehensive:490,elite:890};
  const subtotal = pkgPrices[pkg]+insPrices[insurance]+(concierge?500:0);
  const deposit = Math.round(subtotal*0.2);

  const consultSlots = ["Mon 9:00 AM","Mon 11:00 AM","Mon 2:00 PM","Tue 9:00 AM","Tue 11:00 AM","Tue 3:00 PM","Wed 10:00 AM","Wed 2:00 PM","Thu 9:00 AM","Thu 1:00 PM","Fri 10:00 AM","Fri 3:00 PM"];

  const visaItems = ["Passport valid for 6+ months beyond travel date","Travel visa for India obtained (or e-visa applied)","Travel insurance covering medical treatment","COVID/vaccination requirements checked"];

  const toggleVisa=(i:number)=>setVisaChecks(v=>v.map((c,j)=>j===i?!c:c));

  return (
    <div>
      <Navbar/>
      {/* Step bar */}
      <div style={{background:"var(--surface)",padding:"24px 0",borderBottom:"1px solid var(--border)"}}>
        <div className="container">
          <h1 style={{fontSize:26,fontWeight:700,marginBottom:18}}>Book Your Treatment</h1>
          <div style={{display:"flex",alignItems:"center",overflowX:"auto",gap:0}}>
            {steps.map((s,i)=>(
              <div key={s} style={{display:"flex",alignItems:"center",flexShrink:0}}>
                <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:5}}>
                  <div style={{width:28,height:28,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:12,background:i<step?"var(--success)":i===step?"var(--teal)":"var(--border)",color:i<=step?"white":"var(--muted)",transition:"all 0.3s"}}>{i<step?"✓":i+1}</div>
                  <span style={{fontSize:11,fontWeight:i===step?700:400,color:i===step?"var(--teal)":"var(--muted)",whiteSpace:"nowrap"}}>{s}</span>
                </div>
                {i<steps.length-1&&<div style={{width:32,height:2,background:i<step?"var(--success)":"var(--border)",margin:"0 4px",marginBottom:18,transition:"all 0.3s"}}/>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{padding:"32px 24px"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 340px",gap:24}}>
          <div className="card" style={{padding:28}}>

            {/* STEP 0 — Package */}
            {step===0&&(
              <div>
                <h2 style={{fontSize:20,fontWeight:600,marginBottom:20}}>Select Your Package</h2>
                {[{id:"basic",name:"Basic",price:7400,items:["Procedure","Hospital stay","Pre-op tests"]},
                  {id:"complete",name:"Complete",price:8200,items:["Everything in Basic","Airport pickup","Dedicated coordinator","90-day post-op follow-up"],rec:true},
                  {id:"premium",name:"Premium",price:9800,items:["Everything in Complete","Private room","24/7 nurse","Family accommodation","Business class option"]},
                ].map(p=>(
                  <div key={p.id} onClick={()=>setPkg(p.id)} style={{padding:20,borderRadius:12,border:pkg===p.id?"2px solid var(--teal)":"1px solid var(--border)",marginBottom:12,cursor:"pointer",background:pkg===p.id?"var(--teal-light)":"white",position:"relative"}}>
                    {p.rec&&<div style={{position:"absolute",top:-10,left:18,background:"var(--teal)",color:"white",padding:"2px 12px",borderRadius:20,fontSize:11,fontWeight:600}}>Recommended</div>}
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
                      <div style={{display:"flex",gap:10,alignItems:"center"}}>
                        <div style={{width:18,height:18,borderRadius:"50%",border:`2px solid ${pkg===p.id?"var(--teal)":"var(--border)"}`,background:pkg===p.id?"var(--teal)":"white",display:"flex",alignItems:"center",justifyContent:"center"}}>{pkg===p.id&&<div style={{width:7,height:7,borderRadius:"50%",background:"white"}}/>}</div>
                        <span style={{fontWeight:600,fontSize:16}}>{p.name}</span>
                      </div>
                      <span style={{fontSize:20,fontWeight:700,color:"var(--teal)",fontFamily:"Sora"}}>${p.price.toLocaleString()}</span>
                    </div>
                    {p.items.map(item=><div key={item} style={{fontSize:13,color:"var(--slate)",marginBottom:4,display:"flex",gap:7}}><span style={{color:"var(--success)"}}>✓</span>{item}</div>)}
                  </div>
                ))}
                <div style={{marginTop:14,padding:18,background:"var(--accent-light)",border:"1px solid #fde68a",borderRadius:12}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div><div style={{fontWeight:600,marginBottom:4}}>👑 Add VIP Concierge — $500</div><div style={{fontSize:13,color:"var(--muted)"}}>Dedicated 24/7 coordinator, luxury hotel upgrades, priority scheduling</div></div>
                    <button onClick={()=>setConcierge(!concierge)} style={{padding:"8px 16px",border:"none",borderRadius:8,cursor:"pointer",background:concierge?"var(--teal)":"white",color:concierge?"white":"var(--navy)",fontWeight:600,fontSize:13,fontFamily:"DM Sans",flexShrink:0}}>{concierge?"✓ Added":"Add"}</button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 1 — Medical Records */}
            {step===1&&(
              <div>
                <h2 style={{fontSize:20,fontWeight:600,marginBottom:8}}>Upload Medical Records</h2>
                <p style={{color:"var(--muted)",marginBottom:20,fontSize:14}}>Your doctor needs to review your records before the consultation. All data is encrypted and confidential.</p>
                <div style={{padding:32,border:"2px dashed var(--border)",borderRadius:14,textAlign:"center",cursor:"pointer",background:"var(--surface)",marginBottom:20}}>
                  <div style={{fontSize:40,marginBottom:10}}>📎</div>
                  <p style={{fontWeight:600,marginBottom:4}}>Drop files here or click to upload</p>
                  <p style={{fontSize:13,color:"var(--muted)"}}>PDF, JPG, PNG, DICOM · Max 50MB per file</p>
                  <button className="btn-secondary" style={{marginTop:14,fontSize:13}}>Browse Files</button>
                </div>
                <div style={{display:"grid",gap:10,marginBottom:16}}>
                  {[["Blood test results","Recommended"],["X-Ray / MRI / CT Scan","If applicable"],["Previous surgery reports","If applicable"],["List of current medications","Required"],["Doctor's referral letter","Optional"]].map(([doc,note])=>(
                    <div key={doc} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",background:"var(--surface)",borderRadius:10}}>
                      <div style={{fontSize:14}}>{doc}</div>
                      <span style={{fontSize:11,color:"var(--muted)"}}>{note}</span>
                    </div>
                  ))}
                </div>
                <div style={{display:"grid",gap:12}}>
                  <div><label style={{fontSize:12,fontWeight:600,color:"var(--muted)",display:"block",marginBottom:6,textTransform:"uppercase"}}>Known Allergies</label><input placeholder="e.g. Penicillin, latex..."/></div>
                  <div><label style={{fontSize:12,fontWeight:600,color:"var(--muted)",display:"block",marginBottom:6,textTransform:"uppercase"}}>Current Medications</label><input placeholder="e.g. Metformin 500mg, Aspirin 75mg..."/></div>
                  <div><label style={{fontSize:12,fontWeight:600,color:"var(--muted)",display:"block",marginBottom:6,textTransform:"uppercase"}}>Previous Surgeries</label><textarea rows={2} placeholder="List any previous surgeries..." style={{resize:"vertical",fontFamily:"DM Sans",border:"1.5px solid var(--border)",borderRadius:10,padding:"11px 14px",fontSize:14,width:"100%",outline:"none"}}/></div>
                </div>
              </div>
            )}

            {/* STEP 2 — Video Consultation */}
            {step===2&&(
              <div>
                <h2 style={{fontSize:20,fontWeight:600,marginBottom:8}}>Book Free Video Consultation</h2>
                <p style={{color:"var(--muted)",marginBottom:20,fontSize:14}}>30-minute free video call with your doctor to review records, ask questions, and get a treatment plan — before committing.</p>
                <div style={{background:"var(--teal-light)",border:"1px solid #99f6e4",borderRadius:12,padding:16,marginBottom:20,display:"flex",gap:12,alignItems:"flex-start"}}>
                  <span style={{fontSize:24}}>👨‍⚕️</span>
                  <div>
                    <div style={{fontWeight:600}}>Dr. Vivek Vij — Orthopedics</div>
                    <div style={{fontSize:13,color:"var(--muted)",marginTop:2}}>22 years · 4,200+ cases · Speaks English</div>
                    <div style={{fontSize:13,color:"var(--success)",fontWeight:600,marginTop:4}}>✓ Available this week</div>
                  </div>
                </div>
                <h3 style={{fontSize:16,fontWeight:600,marginBottom:14}}>Select your time slot:</h3>
                <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:20}}>
                  {consultSlots.map(slot=>(
                    <button key={slot} onClick={()=>setConsultSlot(slot)} style={{padding:"10px 8px",borderRadius:8,border:consultSlot===slot?"2px solid var(--teal)":"1px solid var(--border)",background:consultSlot===slot?"var(--teal-light)":"white",color:consultSlot===slot?"var(--teal)":"var(--slate)",fontSize:13,fontWeight:consultSlot===slot?600:400,cursor:"pointer",fontFamily:"DM Sans"}}>
                      {slot}
                    </button>
                  ))}
                </div>
                {consultSlot&&<div style={{padding:14,background:"#dcfce7",border:"1px solid #86efac",borderRadius:10,fontSize:14,color:"#166534",fontWeight:500}}>✓ Consultation booked for {consultSlot} via Zoom. Link will be sent to your email.</div>}
                <div style={{marginTop:16,padding:14,background:"var(--surface)",borderRadius:10}}>
                  <div style={{fontSize:13,fontWeight:600,color:"var(--navy)",marginBottom:8}}>What to prepare for your consultation:</div>
                  {["Have all uploaded medical records open","Write down your questions beforehand","Note any symptoms or concerns","Be in a quiet, well-lit room","Stable internet connection required"].map(t=>(
                    <div key={t} style={{fontSize:13,color:"var(--muted)",display:"flex",gap:8,marginBottom:6}}><span style={{color:"var(--teal)"}}>→</span>{t}</div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3 — Travel Dates */}
            {step===3&&(
              <div>
                <h2 style={{fontSize:20,fontWeight:600,marginBottom:8}}>Confirm Travel Dates</h2>
                <p style={{color:"var(--muted)",marginBottom:20,fontSize:14}}>Your hip replacement requires 14 nights recovery stay. We will also show estimated flight costs for your dates.</p>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:20}}>
                  <div><label style={{fontSize:12,fontWeight:600,color:"var(--muted)",display:"block",marginBottom:6,textTransform:"uppercase"}}>✈️ Departure Date</label><input type="date" value={travelDate} onChange={e=>setTravelDate(e.target.value)}/></div>
                  <div><label style={{fontSize:12,fontWeight:600,color:"var(--muted)",display:"block",marginBottom:6,textTransform:"uppercase"}}>🏠 Return Date</label><input type="date" value={returnDate} onChange={e=>setReturnDate(e.target.value)}/></div>
                </div>
                {travelDate&&(
                  <div style={{background:"var(--teal-light)",border:"1px solid #99f6e4",borderRadius:12,padding:18,marginBottom:16}}>
                    <div style={{fontWeight:600,marginBottom:12}}>📅 Your Trip Timeline</div>
                    {[["Day 1",`Arrive in Gurugram · ${travelDate}`],["Day 2","Pre-op tests & final consultation"],["Day 3","Surgery day"],["Days 4–14","Hospital recovery stay"],["Day 15",returnDate?`Return home · ${returnDate}`:"Return home"],].map(([day,event])=>(
                      <div key={day} style={{display:"flex",gap:12,marginBottom:8,fontSize:14}}>
                        <span style={{color:"var(--teal)",fontWeight:600,minWidth:50}}>{day}</span>
                        <span style={{color:"var(--slate)"}}>{event}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div style={{display:"grid",gap:12}}>
                  <div><label style={{fontSize:12,fontWeight:600,color:"var(--muted)",display:"block",marginBottom:6,textTransform:"uppercase"}}>Departure City</label><input placeholder="e.g. New York JFK, London Heathrow..."/></div>
                  <div style={{padding:14,background:"var(--surface)",borderRadius:10,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div><div style={{fontSize:13,fontWeight:500}}>Estimated flight cost</div><div style={{fontSize:12,color:"var(--muted)"}}>Economy class, round trip</div></div>
                    <div style={{fontSize:22,fontWeight:700,color:"var(--teal)",fontFamily:"Sora"}}>~$900</div>
                  </div>
                  <div><label style={{fontSize:12,fontWeight:600,color:"var(--muted)",display:"block",marginBottom:6,textTransform:"uppercase"}}>Number of Companions</label><input type="number" min={0} max={4} defaultValue={0} placeholder="0"/></div>
                </div>
              </div>
            )}

            {/* STEP 4 — Insurance */}
            {step===4&&(
              <div>
                <h2 style={{fontSize:20,fontWeight:600,marginBottom:8}}>Medical Travel Insurance</h2>
                <p style={{color:"var(--muted)",marginBottom:20,fontSize:14}}>Covers medical complications abroad, emergency evacuation, and trip cancellation. Strongly recommended.</p>
                {[
                  {id:"none",name:"No Insurance",price:0,desc:"Not recommended — you bear all risk",covers:[]},
                  {id:"standard",name:"Standard",price:280,desc:"Essential protection",covers:["Complications up to $50k","Emergency evacuation","Trip cancellation"]},
                  {id:"comprehensive",name:"Comprehensive",price:490,desc:"Most popular",covers:["Complications up to $150k","Emergency evacuation","Trip cancellation","Lost baggage","Companion travel"],rec:true},
                  {id:"elite",name:"Elite",price:890,desc:"Maximum protection",covers:["Complications up to $500k","All cancellation reasons","Pre-existing conditions","Family cover"]},
                ].map(ins=>(
                  <div key={ins.id} onClick={()=>setInsurance(ins.id)} style={{padding:18,borderRadius:12,border:insurance===ins.id?"2px solid var(--teal)":"1px solid var(--border)",marginBottom:10,cursor:"pointer",background:insurance===ins.id?"var(--teal-light)":"white",position:"relative"}}>
                    {ins.rec&&<div style={{position:"absolute",top:-10,left:18,background:"var(--teal)",color:"white",padding:"2px 10px",borderRadius:20,fontSize:11,fontWeight:600}}>Most Popular</div>}
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:ins.covers.length?8:0}}>
                      <div style={{display:"flex",gap:9,alignItems:"center"}}>
                        <div style={{width:17,height:17,borderRadius:"50%",border:`2px solid ${insurance===ins.id?"var(--teal)":"var(--border)"}`,background:insurance===ins.id?"var(--teal)":"white",display:"flex",alignItems:"center",justifyContent:"center"}}>{insurance===ins.id&&<div style={{width:6,height:6,borderRadius:"50%",background:"white"}}/>}</div>
                        <span style={{fontWeight:600,fontSize:15}}>{ins.name}</span>
                        <span style={{fontSize:12,color:"var(--muted)"}}>{ins.desc}</span>
                      </div>
                      <span style={{fontWeight:700,fontSize:16,color:ins.price===0?"var(--muted)":"var(--teal)"}}>{ins.price===0?"$0 (risky)":"+$"+ins.price}</span>
                    </div>
                    {ins.covers.map(c=><div key={c} style={{fontSize:12,color:"var(--slate)",marginBottom:3,display:"flex",gap:7}}><span style={{color:"var(--success)"}}>✓</span>{c}</div>)}
                  </div>
                ))}
                {insurance==="none"&&<div style={{padding:12,background:"#fef2f2",border:"1px solid #fecaca",borderRadius:10,fontSize:13,color:"#dc2626"}}>⚠️ Not recommended. Medical complications abroad without cover can cost $100,000+.</div>}
              </div>
            )}

            {/* STEP 5 — Visa Checklist */}
            {step===5&&(
              <div>
                <h2 style={{fontSize:20,fontWeight:600,marginBottom:8}}>Visa & Travel Checklist</h2>
                <p style={{color:"var(--muted)",marginBottom:20,fontSize:14}}>Confirm these visa and entry requirements before you travel to India.</p>
                <div style={{background:"var(--teal-light)",border:"1px solid #99f6e4",borderRadius:12,padding:16,marginBottom:20}}>
                  <div style={{fontWeight:600,marginBottom:8}}>🇮🇳 India Entry Requirements</div>
                  <div style={{fontSize:14,color:"var(--slate)"}}>Most nationalities require a visa. India offers e-Medical Visa for medical tourists, valid 60 days, allowing 3 entries. Apply at <span style={{color:"var(--teal)",fontWeight:600}}>indianvisaonline.gov.in</span></div>
                </div>
                <div style={{display:"grid",gap:10,marginBottom:20}}>
                  {visaItems.map((item,i)=>(
                    <div key={i} onClick={()=>toggleVisa(i)} style={{display:"flex",gap:12,alignItems:"center",padding:"14px 16px",background:"white",border:"1px solid var(--border)",borderRadius:10,cursor:"pointer"}}>
                      <div style={{width:22,height:22,borderRadius:6,border:`2px solid ${visaChecks[i]?"var(--teal)":"var(--border)"}`,background:visaChecks[i]?"var(--teal)":"white",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                        {visaChecks[i]&&<span style={{color:"white",fontSize:12,fontWeight:700}}>✓</span>}
                      </div>
                      <span style={{fontSize:14,color:visaChecks[i]?"var(--muted)":"var(--navy)",textDecoration:visaChecks[i]?"line-through":"none"}}>{item}</span>
                    </div>
                  ))}
                </div>
                <div style={{padding:16,background:"var(--surface)",borderRadius:12}}>
                  <div style={{fontWeight:600,marginBottom:10,fontSize:14}}>Useful Resources:</div>
                  {[["🌐 India e-Medical Visa","indianvisaonline.gov.in"],["💉 Vaccination requirements","cdc.gov/travel/india"],["📋 Embassy contacts","Available in your dashboard"]].map(([label,url])=>(
                    <div key={label} style={{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:8}}>
                      <span style={{color:"var(--slate)"}}>{label}</span>
                      <span style={{color:"var(--teal)",fontWeight:500}}>{url}</span>
                    </div>
                  ))}
                </div>
                {visaChecks.filter(Boolean).length===visaChecks.length&&<div style={{marginTop:14,padding:12,background:"#dcfce7",border:"1px solid #86efac",borderRadius:10,fontSize:14,color:"#166534",fontWeight:500}}>✓ All visa requirements confirmed! Ready to proceed.</div>}
              </div>
            )}

            {/* STEP 6 — Pay Deposit */}
            {step===6&&(
              <div>
                <h2 style={{fontSize:20,fontWeight:600,marginBottom:20}}>Pay 20% Deposit to Confirm</h2>
                <div style={{background:"var(--teal-light)",borderRadius:14,padding:22,marginBottom:20}}>
                  <div style={{fontWeight:700,fontSize:16,marginBottom:14}}>Order Summary</div>
                  {[[pkg==="basic"?"Basic":pkg==="complete"?"Complete":"Premium"+" Package",`$${pkgPrices[pkg].toLocaleString()}`],
                    ...(insurance!=="none"?[[`${insurance} Insurance`,`$${insPrices[insurance]}`]]:[]),
                    ...(concierge?[["VIP Concierge","$500"]]:[]),
                    ["20% Deposit",`$${deposit.toLocaleString()}`],
                  ].map(([l,v])=>(
                    <div key={l} style={{display:"flex",justifyContent:"space-between",marginBottom:8,fontSize:14}}>
                      <span style={{color:"var(--slate)"}}>{l}</span><span style={{fontWeight:600}}>{v}</span>
                    </div>
                  ))}
                  <div style={{borderTop:"1px solid #99f6e4",paddingTop:12,marginTop:4,display:"flex",justifyContent:"space-between"}}>
                    <span style={{fontWeight:700,fontSize:17}}>Due now</span>
                    <span style={{fontWeight:800,fontSize:26,color:"var(--teal)",fontFamily:"Sora"}}>${deposit.toLocaleString()}</span>
                  </div>
                  <div style={{fontSize:13,color:"var(--muted)",marginTop:4}}>Balance ${(subtotal-deposit).toLocaleString()} paid at hospital</div>
                </div>
                <div style={{display:"grid",gap:12}}>
                  <input placeholder="Card Number (1234 5678 9012 3456)"/>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                    <input placeholder="Expiry MM/YY"/>
                    <input placeholder="CVV"/>
                  </div>
                  <input placeholder="Name on Card"/>
                </div>
                <div style={{fontSize:12,color:"var(--muted)",marginTop:14,display:"flex",gap:8}}>
                  <span style={{color:"var(--success)"}}>🔒</span> 256-bit SSL · PCI DSS compliant · Powered by Stripe
                </div>
              </div>
            )}

            <div style={{display:"flex",justifyContent:"space-between",marginTop:24}}>
              {step>0?<button className="btn-secondary" onClick={()=>setStep(step-1)}>← Back</button>:<div/>}
              {step<steps.length-1
                ?<button className="btn-primary" onClick={()=>setStep(step+1)}>Continue →</button>
                :<button className="btn-primary" style={{background:"var(--success)"}}>✓ Pay ${deposit.toLocaleString()} Deposit</button>}
            </div>
          </div>

          {/* Summary Sidebar */}
          <div>
            <div className="card" style={{padding:22,position:"sticky",top:80}}>
              <h3 style={{fontSize:16,fontWeight:600,marginBottom:16}}>Booking Summary</h3>
              <div style={{background:"var(--surface)",borderRadius:10,padding:14,marginBottom:14}}>
                <div style={{fontWeight:600,marginBottom:4}}>Fortis Memorial Research Institute</div>
                <div style={{fontSize:13,color:"var(--muted)"}}>🇮🇳 Gurugram, India · JCI ✓</div>
              </div>
              {[["Procedure","Hip Replacement"],["Est. Dates","Mar 15–29, 2025"],["Recovery","14 nights"],["Rating","⭐ 4.9"],["Success Rate","97% ✓"],["Package",pkg.charAt(0).toUpperCase()+pkg.slice(1)],["Insurance",insurance],["Concierge",concierge?"Yes":"No"]].map(([l,v])=>(
                <div key={l} style={{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:9}}>
                  <span style={{color:"var(--muted)"}}>{l}</span><span style={{fontWeight:500}}>{v}</span>
                </div>
              ))}
              <div style={{borderTop:"1px solid var(--border)",paddingTop:12,marginTop:4}}>
                <div style={{display:"flex",justifyContent:"space-between",fontWeight:700,fontSize:17}}>
                  <span>Total</span><span style={{color:"var(--teal)"}}>${subtotal.toLocaleString()}</span>
                </div>
                <div style={{fontSize:12,color:"var(--muted)",marginTop:4}}>Deposit: ${deposit.toLocaleString()} (20%)</div>
                <div style={{fontSize:13,color:"var(--success)",marginTop:8,fontWeight:600}}>Save ~$32,000 vs USA ✓</div>
              </div>
              <div style={{marginTop:14,padding:12,background:"var(--teal-light)",borderRadius:10}}>
                {["Free cancellation up to 7 days","Free video consultation","24/7 coordinator support","90-day post-op follow-up"].map(t=>(
                  <div key={t} style={{fontSize:12,color:"var(--teal-dark)",marginBottom:6,display:"flex",gap:6}}><span>✓</span>{t}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

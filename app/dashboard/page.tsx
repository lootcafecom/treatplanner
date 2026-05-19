"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";

const bookings = [
  {id:"TP-1042",hospital:"Fortis Memorial Research Institute",country:"🇮🇳 India",procedure:"Hip Replacement",date:"March 15, 2025",status:"Confirmed",total:"$8,200",step:3},
  {id:"TP-1041",hospital:"Bumrungrad International",country:"🇹🇭 Thailand",procedure:"Dental Implants",date:"January 8, 2025",status:"Completed",total:"$1,850",step:5},
];

const bookingSteps = ["Request Sent","Consultation Done","Booking Confirmed","Travel Ready","Treatment Complete"];

const checklistData = {
  documents:[
    {label:"Passport (valid 6+ months)",done:true},{label:"Medical records uploaded",done:true},
    {label:"Doctor referral letter",done:false},{label:"Insurance policy document",done:false},
    {label:"Vaccination certificate",done:true},
  ],
  travel:[
    {label:"Flight booked",done:true},{label:"Hotel booked near hospital",done:true},
    {label:"Airport transfer arranged",done:false},{label:"Travel insurance purchased",done:false},
    {label:"Visa obtained",done:true},
  ],
  medical:[
    {label:"Pre-op blood tests done",done:false},{label:"Stopped blood thinners",done:false},
    {label:"Fasting instructions reviewed",done:true},{label:"Post-op medication list saved",done:false},
    {label:"Emergency contact list prepared",done:true},
  ],
};

const documents = [
  {name:"Passport Copy",type:"pdf",size:"1.2 MB",uploaded:"Jan 5",status:"Verified"},
  {name:"Blood Test Results",type:"pdf",size:"3.4 MB",uploaded:"Jan 10",status:"Shared with Doctor"},
  {name:"X-Ray Scan",type:"jpg",size:"8.1 MB",uploaded:"Jan 12",status:"Pending Review"},
  {name:"Insurance Policy",type:"pdf",size:"2.0 MB",uploaded:"Jan 14",status:"Verified"},
];

export default function Dashboard() {
  const [tab, setTab] = useState<"bookings"|"trip"|"checklist"|"documents"|"outcomes"|"profile">("bookings");
  const [checks, setChecks] = useState(checklistData);
  // Outcome tracking
  const [outcomes, setOutcomes] = useState([
    {date:"Mar 17",pain:6,mobility:"Low",notes:"Post surgery day 2 — some discomfort"},
    {date:"Mar 20",pain:4,mobility:"Medium",notes:"Moving with walker, feeling better"},
    {date:"Mar 24",pain:2,mobility:"Good",notes:"Walking short distances without walker"},
  ]);
  const [newOutcome, setNewOutcome] = useState({date:"",pain:5,mobility:"Medium",notes:""});

  const toggleCheck=(section:keyof typeof checks,index:number)=>{
    setChecks(prev=>({...prev,[section]:prev[section].map((item,i)=>i===index?{...item,done:!item.done}:item)}));
  };

  const totalChecks=Object.values(checks).flat().length;
  const doneChecks=Object.values(checks).flat().filter(c=>c.done).length;

  return (
    <div>
      <Navbar/>
      <div style={{background:"var(--navy)",padding:"36px 0"}}>
        <div className="container">
          <div style={{display:"flex",alignItems:"center",gap:18}}>
            <div style={{width:60,height:60,background:"var(--teal)",borderRadius:18,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26}}>👤</div>
            <div>
              <h1 style={{fontSize:26,fontWeight:700,color:"white"}}>Welcome back, John!</h1>
              <p style={{color:"#94a3b8",fontSize:14}}>john.smith@email.com · Member since Jan 2025</p>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:12,marginTop:24}}>
            {[["2","Total Bookings"],["$9,250","Total Spent"],["$32,750","Saved"],["2","Countries"],["95%","Trip Ready"]].map(([v,l])=>(
              <div key={l} style={{background:"rgba(255,255,255,0.07)",borderRadius:10,padding:16}}>
                <div style={{fontSize:22,fontWeight:700,color:"var(--teal)",fontFamily:"Sora"}}>{v}</div>
                <div style={{fontSize:12,color:"#94a3b8",marginTop:3}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{padding:"28px 24px"}}>
        <div style={{display:"flex",gap:4,marginBottom:28,background:"var(--surface)",borderRadius:12,padding:4,width:"fit-content",flexWrap:"wrap"}}>
          {([["bookings","📋 Bookings"],["trip","🗺️ Trip Manager"],["checklist","✅ Checklist"],["documents","📎 Documents"],["outcomes","📊 Outcomes"],["profile","👤 Profile"]] as const).map(([key,label])=>(
            <button key={key} onClick={()=>setTab(key)} style={{padding:"9px 18px",borderRadius:8,border:"none",cursor:"pointer",fontWeight:600,fontSize:13,background:tab===key?"white":"transparent",color:tab===key?"var(--navy)":"var(--muted)",boxShadow:tab===key?"0 2px 8px rgba(0,0,0,0.08)":"none",fontFamily:"DM Sans"}}>{label}</button>
          ))}
        </div>

        {/* BOOKINGS */}
        {tab==="bookings"&&(
          <div style={{display:"grid",gap:16}}>
            {bookings.map(b=>(
              <div key={b.id} className="card" style={{padding:24}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr auto",gap:16,marginBottom:20}}>
                  <div>
                    <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:6}}>
                      <span style={{fontSize:12,fontFamily:"monospace",color:"var(--muted)"}}>{b.id}</span>
                      <span style={{padding:"2px 9px",borderRadius:20,fontSize:11,fontWeight:600,background:b.status==="Confirmed"?"var(--teal-light)":"#dcfce7",color:b.status==="Confirmed"?"var(--teal)":"var(--success)"}}>{b.status}</span>
                    </div>
                    <h3 style={{fontSize:18,fontWeight:600,marginBottom:3}}>{b.hospital}</h3>
                    <p style={{color:"var(--muted)",fontSize:13}}>{b.country} · {b.procedure} · {b.date}</p>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontSize:11,color:"var(--muted)",marginBottom:3}}>Total paid</div>
                    <div style={{fontSize:26,fontWeight:700,color:"var(--teal)",fontFamily:"Sora"}}>{b.total}</div>
                  </div>
                </div>
                <div style={{marginBottom:16}}>
                  <div style={{display:"flex",gap:4}}>
                    {bookingSteps.map((s,i)=>(
                      <div key={s} style={{flex:1}}>
                        <div style={{height:5,borderRadius:3,background:i<b.step?"var(--teal)":"var(--border)",marginBottom:5}}/>
                        <div style={{fontSize:10,color:i<b.step?"var(--teal)":"var(--muted)",fontWeight:i<b.step?600:400}}>{s}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  <button onClick={()=>setTab("trip")} className="btn-primary" style={{fontSize:12,padding:"7px 14px"}}>🗺️ Open Trip Manager</button>
                  <button onClick={()=>setTab("checklist")} className="btn-secondary" style={{fontSize:12,padding:"7px 14px"}}>✅ Checklist</button>
                  <button className="btn-secondary" style={{fontSize:12,padding:"7px 14px"}}>📥 Invoice</button>
                </div>
              </div>
            ))}
            <div style={{textAlign:"center",padding:24}}>
              <Link href="/search" className="btn-primary" style={{textDecoration:"none"}}>+ Book New Treatment</Link>
            </div>
          </div>
        )}

        {/* SCREEN 6 — TRIP MANAGER */}
        {tab==="trip"&&(
          <div>
            <h2 style={{fontSize:22,fontWeight:700,marginBottom:6}}>Trip Manager — Fortis India</h2>
            <p style={{color:"var(--muted)",fontSize:14,marginBottom:24}}>Hip Replacement · March 15–29, 2025 · Everything in one place</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>

              {/* Flight details */}
              <div className="card" style={{padding:22}}>
                <h3 style={{fontSize:16,fontWeight:600,marginBottom:14}}>✈️ Flight Details</h3>
                <div style={{background:"var(--surface)",borderRadius:10,padding:14,marginBottom:10}}>
                  <div style={{fontSize:12,color:"var(--muted)",marginBottom:4}}>OUTBOUND</div>
                  <div style={{fontWeight:600}}>JFK → DEL</div>
                  <div style={{fontSize:13,color:"var(--muted)",marginTop:4}}>March 14 · Air India AI-101 · Depart 22:30</div>
                  <div style={{fontSize:13,color:"var(--muted)"}}>Arrive March 15 · 23:45 · 14h 15m</div>
                </div>
                <div style={{background:"var(--surface)",borderRadius:10,padding:14}}>
                  <div style={{fontSize:12,color:"var(--muted)",marginBottom:4}}>RETURN</div>
                  <div style={{fontWeight:600}}>DEL → JFK</div>
                  <div style={{fontSize:13,color:"var(--muted)",marginTop:4}}>March 29 · Air India AI-102 · Depart 02:00</div>
                  <div style={{fontSize:13,color:"var(--muted)"}}>Arrive March 29 · 08:30 · 16h 30m</div>
                </div>
                <button className="btn-secondary" style={{marginTop:12,fontSize:12,padding:"7px 14px",width:"100%"}}>View Flight Ticket</button>
              </div>

              {/* Hospital appointments */}
              <div className="card" style={{padding:22}}>
                <h3 style={{fontSize:16,fontWeight:600,marginBottom:14}}>🏥 Hospital Appointments</h3>
                {[["Mar 15","3:00 PM","Check-in & Room Allocation"],["Mar 16","9:00 AM","Pre-op Blood Tests & ECG"],["Mar 16","2:00 PM","Final Consultation — Dr. Vivek Vij"],["Mar 17","7:30 AM","Surgery — Fasting from midnight"],["Mar 18–24","Daily","Physiotherapy sessions"],["Mar 25","10:00 AM","Post-op review & discharge planning"]].map(([date,time,event])=>(
                  <div key={date+event} style={{display:"flex",gap:12,marginBottom:10,alignItems:"flex-start"}}>
                    <div style={{minWidth:50,textAlign:"center"}}>
                      <div style={{fontSize:11,fontWeight:700,color:"var(--teal)"}}>{date}</div>
                      <div style={{fontSize:11,color:"var(--muted)"}}>{time}</div>
                    </div>
                    <div style={{fontSize:13,color:"var(--slate)",paddingTop:1}}>{event}</div>
                  </div>
                ))}
              </div>

              {/* Emergency contacts */}
              <div className="card" style={{padding:22}}>
                <h3 style={{fontSize:16,fontWeight:600,marginBottom:14}}>🆘 Emergency Contacts</h3>
                {[
                  {name:"Your Coordinator",person:"Priya Sharma",phone:"+91 98765 43210",available:"24/7"},
                  {name:"Hospital Emergency",person:"Fortis Helpdesk",phone:"+91 124 496 2222",available:"24/7"},
                  {name:"Your Insurance",person:"AXA Travel",phone:"+1 888 292 5234",available:"24/7"},
                  {name:"Indian Ambulance",person:"Emergency Services",phone:"102",available:"Always"},
                ].map(c=>(
                  <div key={c.name} style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12,padding:"10px 12px",background:"var(--surface)",borderRadius:8}}>
                    <div>
                      <div style={{fontSize:12,color:"var(--muted)"}}>{c.name}</div>
                      <div style={{fontSize:14,fontWeight:500}}>{c.person}</div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontSize:14,fontWeight:600,color:"var(--teal)"}}>{c.phone}</div>
                      <div style={{fontSize:11,color:"var(--success)"}}>{c.available}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Local transport */}
              <div className="card" style={{padding:22}}>
                <h3 style={{fontSize:16,fontWeight:600,marginBottom:14}}>🚗 Local Transport</h3>
                {[
                  {type:"Airport Pickup",detail:"Mar 15 · DEL Terminal 3","driver":"Raj Kumar · +91 98100 12345",status:"Confirmed"},
                  {type:"Hospital Shuttle",detail:"Daily 8:30 AM from hotel","driver":"Fortis Hospital transport",status:"Included"},
                  {type:"Airport Drop",detail:"Mar 29 · 00:00 from hospital","driver":"Raj Kumar · +91 98100 12345",status:"Confirmed"},
                ].map(t=>(
                  <div key={t.type} style={{padding:"12px 14px",background:"var(--surface)",borderRadius:10,marginBottom:10}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                      <span style={{fontWeight:600,fontSize:14}}>{t.type}</span>
                      <span style={{background:"#dcfce7",color:"var(--success)",padding:"2px 8px",borderRadius:20,fontSize:11,fontWeight:600}}>{t.status}</span>
                    </div>
                    <div style={{fontSize:13,color:"var(--muted)"}}>{t.detail}</div>
                    <div style={{fontSize:12,color:"var(--slate)",marginTop:2}}>{t.driver}</div>
                  </div>
                ))}
              </div>

              {/* Post-op care instructions */}
              <div className="card" style={{padding:22,gridColumn:"1 / -1"}}>
                <h3 style={{fontSize:16,fontWeight:600,marginBottom:14}}>🏠 Post-Op Care Instructions</h3>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
                  {[
                    {title:"First Week at Home",items:["Rest with leg elevated","Ice pack 20 min, 4x daily","Prescribed pain medication","No driving for 6 weeks","Walker or crutches at all times"]},
                    {title:"Weeks 2–6",items:["Daily physio exercises (provided)","Short walks increasing gradually","Wound care — keep dry","Watch for infection signs","Follow-up video call with Dr. Vij"]},
                    {title:"Warning Signs — Seek Help",items:["High fever above 38.5°C","Severe swelling or redness","Chest pain or shortness of breath","Wound opening or discharge","Severe pain not relieved by medication"]},
                  ].map(col=>(
                    <div key={col.title}>
                      <div style={{fontWeight:600,fontSize:14,marginBottom:10,color:"var(--navy)"}}>{col.title}</div>
                      {col.items.map(item=>(
                        <div key={item} style={{fontSize:13,color:"var(--slate)",display:"flex",gap:7,marginBottom:6}}>
                          <span style={{color:"var(--teal)",flexShrink:0}}>→</span>{item}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CHECKLIST */}
        {tab==="checklist"&&(
          <div>
            <div style={{background:"var(--teal-light)",border:"1px solid #99f6e4",borderRadius:14,padding:22,marginBottom:24,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <h2 style={{fontSize:20,fontWeight:700,marginBottom:3}}>Pre-Travel Checklist</h2>
                <p style={{color:"var(--muted)",fontSize:13}}>Complete all items before March 15, 2025</p>
              </div>
              <div style={{textAlign:"center"}}>
                <div style={{fontSize:36,fontWeight:700,color:"var(--teal)",fontFamily:"Sora"}}>{Math.round((doneChecks/totalChecks)*100)}%</div>
                <div style={{fontSize:12,color:"var(--muted)"}}>{doneChecks}/{totalChecks} done</div>
              </div>
            </div>
            {(Object.entries(checks) as [keyof typeof checks,{label:string;done:boolean}[]][]).map(([section,items])=>(
              <div key={section} className="card" style={{padding:22,marginBottom:16}}>
                <h3 style={{fontSize:17,fontWeight:600,marginBottom:14}}>{section==="documents"?"📎 Documents":section==="travel"?"✈️ Travel":"🏥 Medical"} ({items.filter(i=>i.done).length}/{items.length})</h3>
                {items.map((item,i)=>(
                  <div key={i} onClick={()=>toggleCheck(section,i)} style={{display:"flex",gap:12,alignItems:"center",padding:"11px 0",borderBottom:"1px solid var(--border)",cursor:"pointer"}}>
                    <div style={{width:21,height:21,borderRadius:6,border:`2px solid ${item.done?"var(--teal)":"var(--border)"}`,background:item.done?"var(--teal)":"white",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      {item.done&&<span style={{color:"white",fontSize:11}}>✓</span>}
                    </div>
                    <span style={{fontSize:14,color:item.done?"var(--muted)":"var(--navy)",textDecoration:item.done?"line-through":"none"}}>{item.label}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* DOCUMENTS */}
        {tab==="documents"&&(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
              <h2 style={{fontSize:22,fontWeight:600}}>Document Vault</h2>
              <button className="btn-primary" style={{fontSize:13,padding:"8px 16px"}}>+ Upload Document</button>
            </div>
            <div style={{padding:28,border:"2px dashed var(--border)",borderRadius:14,textAlign:"center",marginBottom:20,cursor:"pointer",background:"var(--surface)"}}>
              <div style={{fontSize:36,marginBottom:8}}>📎</div>
              <p style={{fontWeight:600,marginBottom:3}}>Drop files here or click to upload</p>
              <p style={{fontSize:13,color:"var(--muted)"}}>PDF, JPG, PNG, DICOM · Max 50MB per file</p>
            </div>
            <div style={{display:"grid",gap:10}}>
              {documents.map(doc=>(
                <div key={doc.name} style={{background:"white",border:"1px solid var(--border)",borderRadius:12,padding:18,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div style={{display:"flex",gap:12,alignItems:"center"}}>
                    <div style={{width:42,height:42,background:"var(--surface)",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{doc.type==="pdf"?"📄":"🖼️"}</div>
                    <div>
                      <div style={{fontWeight:600,fontSize:14}}>{doc.name}</div>
                      <div style={{fontSize:12,color:"var(--muted)",marginTop:2}}>{doc.type.toUpperCase()} · {doc.size} · {doc.uploaded}</div>
                    </div>
                  </div>
                  <div style={{display:"flex",gap:10,alignItems:"center"}}>
                    <span style={{padding:"3px 9px",borderRadius:20,fontSize:11,fontWeight:600,background:doc.status==="Verified"?"var(--teal-light)":doc.status==="Shared with Doctor"?"#dbeafe":"#fef3c7",color:doc.status==="Verified"?"var(--teal)":doc.status==="Shared with Doctor"?"#1d4ed8":"var(--accent)"}}>{doc.status}</span>
                    <button style={{fontSize:12,padding:"5px 11px",border:"1px solid var(--border)",borderRadius:7,background:"white",cursor:"pointer"}}>Download</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* OUTCOME TRACKING */}
        {tab==="outcomes"&&(
          <div>
            <h2 style={{fontSize:22,fontWeight:700,marginBottom:6}}>📊 Recovery Outcome Tracking</h2>
            <p style={{color:"var(--muted)",fontSize:14,marginBottom:24}}>Log your daily recovery. Shared automatically with your home doctor for follow-up.</p>

            <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:16,marginBottom:24}}>
              {/* Pain chart */}
              <div className="card" style={{padding:22}}>
                <h3 style={{fontSize:16,fontWeight:600,marginBottom:16}}>Pain Level Over Time (1=None, 10=Severe)</h3>
                <div style={{display:"flex",alignItems:"flex-end",gap:12,height:120}}>
                  {outcomes.map(o=>(
                    <div key={o.date} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
                      <div style={{fontSize:12,fontWeight:600,color:"var(--teal)"}}>{o.pain}</div>
                      <div style={{width:"100%",background:o.pain>6?"#fca5a5":o.pain>3?"var(--accent-light)":"#bbf7d0",borderRadius:"6px 6px 0 0",height:`${(o.pain/10)*100}px`,transition:"height 0.4s"}}/>
                      <div style={{fontSize:11,color:"var(--muted)"}}>{o.date}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Current status */}
              <div className="card" style={{padding:22}}>
                <h3 style={{fontSize:16,fontWeight:600,marginBottom:14}}>Latest Status</h3>
                {[["Pain Level","2/10 — Mild"],["Mobility","Good"],["Last Update","Mar 24"],["Trend","⬇️ Improving"]].map(([l,v])=>(
                  <div key={l} style={{display:"flex",justifyContent:"space-between",marginBottom:12,fontSize:14}}>
                    <span style={{color:"var(--muted)"}}>{l}</span><span style={{fontWeight:600}}>{v}</span>
                  </div>
                ))}
                <div style={{marginTop:14,padding:10,background:"#dcfce7",borderRadius:8,fontSize:13,color:"#166534",fontWeight:500}}>✓ Recovery on track!</div>
              </div>
            </div>

            {/* Log entry */}
            <div className="card" style={{padding:22,marginBottom:20}}>
              <h3 style={{fontSize:16,fontWeight:600,marginBottom:14}}>Log Today's Recovery</h3>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:14}}>
                <div><label style={{fontSize:12,fontWeight:600,color:"var(--muted)",display:"block",marginBottom:6}}>DATE</label><input type="date" value={newOutcome.date} onChange={e=>setNewOutcome({...newOutcome,date:e.target.value})}/></div>
                <div>
                  <label style={{fontSize:12,fontWeight:600,color:"var(--muted)",display:"block",marginBottom:6}}>PAIN LEVEL (1–10)</label>
                  <input type="range" min={1} max={10} value={newOutcome.pain} onChange={e=>setNewOutcome({...newOutcome,pain:Number(e.target.value)})} style={{width:"100%",accentColor:"var(--teal)"}}/>
                  <div style={{textAlign:"center",fontSize:13,fontWeight:600,color:"var(--teal)"}}>{newOutcome.pain}/10</div>
                </div>
                <div><label style={{fontSize:12,fontWeight:600,color:"var(--muted)",display:"block",marginBottom:6}}>MOBILITY</label>
                  <select value={newOutcome.mobility} onChange={e=>setNewOutcome({...newOutcome,mobility:e.target.value})} style={{border:"1.5px solid var(--border)",borderRadius:10,padding:"11px 14px",fontSize:14,width:"100%"}}>
                    {["Bed rest","Very limited","Low","Medium","Good","Excellent"].map(m=><option key={m}>{m}</option>)}
                  </select>
                </div>
              </div>
              <div style={{marginBottom:14}}><label style={{fontSize:12,fontWeight:600,color:"var(--muted)",display:"block",marginBottom:6}}>NOTES</label><textarea rows={2} placeholder="Any symptoms, milestones or concerns today..." value={newOutcome.notes} onChange={e=>setNewOutcome({...newOutcome,notes:e.target.value})} style={{resize:"vertical",fontFamily:"DM Sans",border:"1.5px solid var(--border)",borderRadius:10,padding:"11px 14px",fontSize:14,width:"100%",outline:"none"}}/></div>
              <button onClick={()=>{if(newOutcome.date){setOutcomes(prev=>[...prev,{...newOutcome}]);setNewOutcome({date:"",pain:5,mobility:"Medium",notes:""});} }} className="btn-primary" style={{fontSize:14}}>Save Today's Log</button>
            </div>

            {/* History */}
            <div className="card" style={{padding:22}}>
              <h3 style={{fontSize:16,fontWeight:600,marginBottom:14}}>Recovery History</h3>
              {[...outcomes].reverse().map((o,i)=>(
                <div key={i} style={{display:"grid",gridTemplateColumns:"80px 80px 80px 1fr",gap:12,padding:"12px 0",borderBottom:"1px solid var(--border)",alignItems:"center",fontSize:14}}>
                  <span style={{color:"var(--muted)"}}>{o.date}</span>
                  <span style={{fontWeight:600,color:o.pain>6?"#dc2626":o.pain>3?"var(--accent)":"var(--success)"}}>Pain: {o.pain}/10</span>
                  <span style={{color:"var(--slate)"}}>{o.mobility}</span>
                  <span style={{color:"var(--muted)",fontSize:13}}>{o.notes}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROFILE */}
        {tab==="profile"&&(
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
            <div className="card" style={{padding:28}}>
              <h2 style={{fontSize:20,fontWeight:600,marginBottom:18}}>Personal Details</h2>
              <div style={{display:"grid",gap:12}}>
                {[["Full Name","John Smith"],["Email","john@example.com"],["Phone","+1 234 567 8900"],["Country","United States"],["Date of Birth","1980-05-15"]].map(([l,v])=>(
                  <div key={l}><label style={{fontSize:12,fontWeight:600,color:"var(--muted)",display:"block",marginBottom:5,textTransform:"uppercase"}}>{l}</label><input defaultValue={v}/></div>
                ))}
                <button className="btn-primary" style={{justifyContent:"center",marginTop:6}}>Save Changes</button>
              </div>
            </div>
            <div>
              <div className="card" style={{padding:24,marginBottom:16}}>
                <h3 style={{fontSize:17,fontWeight:600,marginBottom:14}}>Health Profile</h3>
                <div style={{display:"grid",gap:10}}>
                  {[["Blood Type","A+"],["Known Allergies","Penicillin"],["Medications","Metformin 500mg"]].map(([l,v])=>(
                    <div key={l}><label style={{fontSize:12,fontWeight:600,color:"var(--muted)",display:"block",marginBottom:5,textTransform:"uppercase"}}>{l}</label><input defaultValue={v}/></div>
                  ))}
                </div>
              </div>
              <div className="card" style={{padding:24}}>
                <h3 style={{fontSize:17,fontWeight:600,marginBottom:14}}>🔔 Price Alerts</h3>
                {[["Hip Replacement","India","Active"],["IVF Treatment","Thailand","Active"]].map(([proc,country,status])=>(
                  <div key={proc} style={{display:"flex",justifyContent:"space-between",padding:"9px 0",borderBottom:"1px solid var(--border)",fontSize:14}}>
                    <span>{proc} in {country}</span>
                    <span style={{color:"var(--success)",fontWeight:600,fontSize:12}}>{status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import Link from "next/link";

const monthlyRevenue = [
  {month:"Aug",revenue:28000,bookings:32},{month:"Sep",revenue:34000,bookings:41},{month:"Oct",revenue:42000,bookings:56},
  {month:"Nov",revenue:38000,bookings:48},{month:"Dec",revenue:51000,bookings:63},{month:"Jan",revenue:67000,bookings:81},
];
const maxRev = Math.max(...monthlyRevenue.map(m=>m.revenue));

const recentBookings = [
  {id:"TP-1048",patient:"Sarah M.",country:"USA",hospital:"Fortis India",procedure:"Hip Replacement",amount:"$7,400",status:"Confirmed"},
  {id:"TP-1047",patient:"James K.",country:"UK",hospital:"Bumrungrad Thailand",procedure:"Dental Implants",amount:"$1,850",status:"Pending"},
  {id:"TP-1046",patient:"Anna R.",country:"Australia",hospital:"KPJ Malaysia",procedure:"IVF",amount:"$5,200",status:"Confirmed"},
  {id:"TP-1045",patient:"Mark T.",country:"Germany",hospital:"Acibadem Turkey",procedure:"Hair Transplant",amount:"$2,800",status:"Completed"},
  {id:"TP-1044",patient:"Li W.",country:"Canada",hospital:"Gleneagles Singapore",procedure:"Cancer Treatment",amount:"$28,000",status:"Pending"},
];

const stats = [
  {label:"Total Bookings",value:"1,284",icon:"📋",change:"+12%",color:"var(--teal)"},
  {label:"Revenue (USD)",value:"$142,800",icon:"💰",change:"+18%",color:"var(--success)"},
  {label:"Active Hospitals",value:"523",icon:"🏥",change:"+8%",color:"#0284c7"},
  {label:"Patients This Month",value:"284",icon:"👥",change:"+22%",color:"var(--accent)"},
];

export default function AdminPanel() {
  const [tab, setTab] = useState<"overview"|"bookings"|"hospitals"|"add-hospital">("overview");
  const [newHospital, setNewHospital] = useState({name:"",country:"",city:"",accreditation:"JCI",specialty:"",beds:"",founded:"",rating:"",website:""});

  return (
    <div style={{display:"grid",gridTemplateColumns:"220px 1fr",minHeight:"100vh"}}>
      {/* Sidebar */}
      <div style={{background:"var(--navy)",padding:"24px 0"}}>
        <div style={{padding:"0 24px 28px",borderBottom:"1px solid #1e293b"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:34,height:34,background:"var(--teal)",borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center"}}>✚</div>
            <span style={{fontFamily:"Sora",fontWeight:700,fontSize:15,color:"white"}}>Admin Panel</span>
          </div>
        </div>
        <nav style={{padding:"20px 12px"}}>
          {([["overview","📊","Overview"],["bookings","📋","All Bookings"],["hospitals","🏥","Hospitals"],["add-hospital","➕","Add Hospital"]] as const).map(([key,icon,label])=>(
            <button key={key} onClick={()=>setTab(key)} style={{width:"100%",display:"flex",alignItems:"center",gap:10,padding:"11px 14px",borderRadius:9,border:"none",cursor:"pointer",background:tab===key?"rgba(13,148,136,0.2)":"transparent",color:tab===key?"#5eead4":"#94a3b8",fontWeight:tab===key?600:400,fontSize:14,fontFamily:"DM Sans",marginBottom:3}}>
              <span>{icon}</span>{label}
            </button>
          ))}
          <div style={{borderTop:"1px solid #1e293b",marginTop:20,paddingTop:20}}>
            <Link href="/" style={{display:"flex",alignItems:"center",gap:10,padding:"11px 14px",color:"#94a3b8",textDecoration:"none",fontSize:14}}>🏠 View Site</Link>
            <Link href="/dashboard" style={{display:"flex",alignItems:"center",gap:10,padding:"11px 14px",color:"#94a3b8",textDecoration:"none",fontSize:14}}>👤 User Dashboard</Link>
          </div>
        </nav>
      </div>

      {/* Main */}
      <div style={{background:"var(--surface)",padding:28,overflowY:"auto"}}>
        {tab==="overview"&&(
          <div>
            <h1 style={{fontSize:26,fontWeight:700,marginBottom:6}}>Dashboard Overview</h1>
            <p style={{color:"var(--muted)",marginBottom:24,fontSize:14}}>Welcome back! Here is what is happening with TreatPlanner today.</p>

            {/* Stats */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,marginBottom:24}}>
              {stats.map(s=>(
                <div key={s.label} style={{background:"white",borderRadius:14,padding:22,border:"1px solid var(--border)"}}>
                  <div style={{fontSize:26,marginBottom:10}}>{s.icon}</div>
                  <div style={{fontSize:26,fontWeight:700,fontFamily:"Sora",color:s.color}}>{s.value}</div>
                  <div style={{fontSize:12,color:"var(--muted)",marginTop:4}}>{s.label}</div>
                  <div style={{fontSize:12,color:"var(--success)",fontWeight:600,marginTop:8}}>{s.change} this month</div>
                </div>
              ))}
            </div>

            {/* Revenue Chart */}
            <div style={{background:"white",borderRadius:16,padding:24,border:"1px solid var(--border)",marginBottom:24}}>
              <h2 style={{fontSize:18,fontWeight:600,marginBottom:20}}>Monthly Revenue</h2>
              <div style={{display:"flex",gap:12,alignItems:"flex-end",height:160}}>
                {monthlyRevenue.map(m=>(
                  <div key={m.month} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
                    <div style={{fontSize:11,color:"var(--muted)",fontWeight:600}}>${(m.revenue/1000).toFixed(0)}k</div>
                    <div style={{width:"100%",background:"var(--teal)",borderRadius:"6px 6px 0 0",height:`${(m.revenue/maxRev)*120}px`,transition:"height 0.3s",cursor:"pointer",position:"relative"}}
                      onMouseEnter={e=>{(e.currentTarget.style.background="var(--teal-dark)");}}
                      onMouseLeave={e=>{(e.currentTarget.style.background="var(--teal)");}}>
                    </div>
                    <div style={{fontSize:12,color:"var(--muted)"}}>{m.month}</div>
                  </div>
                ))}
              </div>
              <div style={{display:"flex",gap:20,marginTop:16,padding:"12px 16px",background:"var(--surface)",borderRadius:10}}>
                <div style={{fontSize:13,color:"var(--muted)"}}>Total 6-month revenue: <strong style={{color:"var(--navy)"}}>$260,000</strong></div>
                <div style={{fontSize:13,color:"var(--muted)"}}>Avg booking value: <strong style={{color:"var(--navy)"}}>$1,870</strong></div>
                <div style={{fontSize:13,color:"var(--muted)"}}>Growth rate: <strong style={{color:"var(--success)"}}>+18% MoM</strong></div>
              </div>
            </div>

            {/* Recent Bookings */}
            <div style={{background:"white",borderRadius:16,padding:24,border:"1px solid var(--border)"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
                <h2 style={{fontSize:18,fontWeight:600}}>Recent Bookings</h2>
                <button onClick={()=>setTab("bookings")} style={{fontSize:13,color:"var(--teal)",background:"none",border:"none",cursor:"pointer",fontFamily:"DM Sans",fontWeight:600}}>View all →</button>
              </div>
              <table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead>
                  <tr style={{borderBottom:"1px solid var(--border)"}}>
                    {["ID","Patient","From","Hospital","Procedure","Amount","Status"].map(h=>(
                      <th key={h} style={{padding:"10px 12px",textAlign:"left",fontSize:11,fontWeight:600,color:"var(--muted)",textTransform:"uppercase"}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map(b=>(
                    <tr key={b.id} style={{borderBottom:"1px solid var(--border)"}} onMouseEnter={e=>e.currentTarget.style.background="var(--surface)"} onMouseLeave={e=>e.currentTarget.style.background="white"}>
                      <td style={{padding:"12px",fontSize:12,fontFamily:"monospace",color:"var(--muted)"}}>{b.id}</td>
                      <td style={{padding:"12px",fontSize:14,fontWeight:500}}>{b.patient}</td>
                      <td style={{padding:"12px",fontSize:14,color:"var(--muted)"}}>{b.country}</td>
                      <td style={{padding:"12px",fontSize:14}}>{b.hospital}</td>
                      <td style={{padding:"12px",fontSize:13,color:"var(--muted)"}}>{b.procedure}</td>
                      <td style={{padding:"12px",fontSize:14,fontWeight:600}}>{b.amount}</td>
                      <td style={{padding:"12px"}}>
                        <span style={{padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:600,background:b.status==="Confirmed"?"var(--teal-light)":b.status==="Completed"?"#dcfce7":"#fef3c7",color:b.status==="Confirmed"?"var(--teal)":b.status==="Completed"?"var(--success)":"var(--accent)"}}>{b.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab==="bookings"&&(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
              <h1 style={{fontSize:26,fontWeight:700}}>All Bookings</h1>
              <div style={{display:"flex",gap:10}}>
                <input placeholder="Search bookings..." style={{width:200,border:"1px solid var(--border)",borderRadius:8,padding:"8px 12px",fontSize:13}}/>
                <select style={{border:"1px solid var(--border)",borderRadius:8,padding:"8px 12px",fontSize:13}}>
                  <option>All Status</option><option>Confirmed</option><option>Pending</option><option>Completed</option>
                </select>
                <button className="btn-primary" style={{fontSize:13,padding:"8px 16px"}}>Export CSV</button>
              </div>
            </div>
            <div style={{background:"white",borderRadius:16,padding:24,border:"1px solid var(--border)"}}>
              <table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead>
                  <tr style={{borderBottom:"1px solid var(--border)"}}>
                    {["ID","Patient","From","Hospital","Procedure","Amount","Status","Action"].map(h=>(
                      <th key={h} style={{padding:"10px 12px",textAlign:"left",fontSize:11,fontWeight:600,color:"var(--muted)",textTransform:"uppercase"}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map(b=>(
                    <tr key={b.id} style={{borderBottom:"1px solid var(--border)"}} onMouseEnter={e=>e.currentTarget.style.background="var(--surface)"} onMouseLeave={e=>e.currentTarget.style.background="white"}>
                      <td style={{padding:"12px",fontSize:12,fontFamily:"monospace",color:"var(--muted)"}}>{b.id}</td>
                      <td style={{padding:"12px",fontSize:14,fontWeight:500}}>{b.patient}</td>
                      <td style={{padding:"12px",fontSize:14,color:"var(--muted)"}}>{b.country}</td>
                      <td style={{padding:"12px",fontSize:14}}>{b.hospital}</td>
                      <td style={{padding:"12px",fontSize:13,color:"var(--muted)"}}>{b.procedure}</td>
                      <td style={{padding:"12px",fontSize:14,fontWeight:600}}>{b.amount}</td>
                      <td style={{padding:"12px"}}>
                        <span style={{padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:600,background:b.status==="Confirmed"?"var(--teal-light)":b.status==="Completed"?"#dcfce7":"#fef3c7",color:b.status==="Confirmed"?"var(--teal)":b.status==="Completed"?"var(--success)":"var(--accent)"}}>{b.status}</span>
                      </td>
                      <td style={{padding:"12px",display:"flex",gap:6}}>
                        <button style={{fontSize:11,padding:"4px 10px",border:"1px solid var(--border)",borderRadius:6,cursor:"pointer",background:"white"}}>View</button>
                        <button style={{fontSize:11,padding:"4px 10px",border:"1px solid var(--border)",borderRadius:6,cursor:"pointer",background:"white",color:"var(--teal)"}}>Confirm</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab==="hospitals"&&(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
              <h1 style={{fontSize:26,fontWeight:700}}>Hospitals ({523})</h1>
              <button onClick={()=>setTab("add-hospital")} className="btn-primary">+ Add Hospital</button>
            </div>
            <div style={{background:"white",borderRadius:16,padding:24,border:"1px solid var(--border)"}}>
              {[{name:"Fortis Memorial Research Institute",country:"🇮🇳 India",city:"Gurugram",accreditation:"JCI",rating:4.9,bookings:284,revenue:"$187,200",status:"Active"},{name:"Bumrungrad International Hospital",country:"🇹🇭 Thailand",city:"Bangkok",accreditation:"JCI",rating:4.8,bookings:241,revenue:"$156,400",status:"Active"},{name:"Acibadem Maslak Hospital",country:"🇹🇷 Turkey",city:"Istanbul",accreditation:"JCI",rating:4.8,bookings:198,revenue:"$98,400",status:"Active"}].map(h=>(
                <div key={h.name} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 0",borderBottom:"1px solid var(--border)"}}>
                  <div>
                    <div style={{fontWeight:600,marginBottom:4}}>{h.name}</div>
                    <div style={{fontSize:13,color:"var(--muted)"}}>{h.country} · {h.city} · {h.accreditation} ✓ · ⭐ {h.rating}</div>
                  </div>
                  <div style={{display:"flex",gap:20,alignItems:"center"}}>
                    <div style={{textAlign:"center"}}><div style={{fontSize:18,fontWeight:700,color:"var(--teal)"}}>{h.bookings}</div><div style={{fontSize:11,color:"var(--muted)"}}>Bookings</div></div>
                    <div style={{textAlign:"center"}}><div style={{fontSize:16,fontWeight:700}}>{h.revenue}</div><div style={{fontSize:11,color:"var(--muted)"}}>Revenue</div></div>
                    <span style={{padding:"4px 10px",borderRadius:20,fontSize:11,fontWeight:600,background:"#dcfce7",color:"var(--success)"}}>{h.status}</span>
                    <div style={{display:"flex",gap:6}}>
                      <button style={{fontSize:12,padding:"5px 12px",border:"1px solid var(--border)",borderRadius:7,cursor:"pointer",background:"white"}}>Edit</button>
                      <button style={{fontSize:12,padding:"5px 12px",border:"1px solid #fecaca",borderRadius:7,cursor:"pointer",background:"#fef2f2",color:"#dc2626"}}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab==="add-hospital"&&(
          <div>
            <h1 style={{fontSize:26,fontWeight:700,marginBottom:6}}>Add New Hospital</h1>
            <p style={{color:"var(--muted)",marginBottom:28,fontSize:14}}>Add a new hospital to the TreatPlanner directory</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24}}>
              <div className="card" style={{padding:28}}>
                <h3 style={{fontSize:18,fontWeight:600,marginBottom:20}}>Basic Information</h3>
                <div style={{display:"grid",gap:14}}>
                  {[["Hospital Name","name","Fortis Memorial..."],["Country","country","India"],["City","city","Gurugram"],["Founded Year","founded","1996"],["Number of Beds","beds","1000"],["Website","website","https://..."]].map(([label,key,ph])=>(
                    <div key={key}><label style={{fontSize:12,fontWeight:600,color:"var(--muted)",display:"block",marginBottom:6,textTransform:"uppercase"}}>{label}</label><input placeholder={ph} value={newHospital[key as keyof typeof newHospital]} onChange={e=>setNewHospital({...newHospital,[key]:e.target.value})}/></div>
                  ))}
                </div>
              </div>
              <div>
                <div className="card" style={{padding:28,marginBottom:20}}>
                  <h3 style={{fontSize:18,fontWeight:600,marginBottom:20}}>Accreditation & Quality</h3>
                  <div style={{display:"grid",gap:14}}>
                    <div><label style={{fontSize:12,fontWeight:600,color:"var(--muted)",display:"block",marginBottom:6,textTransform:"uppercase"}}>Accreditation</label>
                      <select value={newHospital.accreditation} onChange={e=>setNewHospital({...newHospital,accreditation:e.target.value})} style={{border:"1.5px solid var(--border)",borderRadius:10,padding:"12px 16px",fontSize:15,width:"100%"}}>
                        <option value="JCI">JCI — Joint Commission International</option><option value="NABH">NABH (India)</option><option value="ISO">ISO 9001</option>
                      </select>
                    </div>
                    <div><label style={{fontSize:12,fontWeight:600,color:"var(--muted)",display:"block",marginBottom:6,textTransform:"uppercase"}}>Specialty</label><input placeholder="e.g. Cardiac, Orthopedic..." value={newHospital.specialty} onChange={e=>setNewHospital({...newHospital,specialty:e.target.value})}/></div>
                    <div><label style={{fontSize:12,fontWeight:600,color:"var(--muted)",display:"block",marginBottom:6,textTransform:"uppercase"}}>Initial Rating</label><input type="number" step="0.1" min="1" max="5" placeholder="4.8" value={newHospital.rating} onChange={e=>setNewHospital({...newHospital,rating:e.target.value})}/></div>
                  </div>
                </div>
                <div className="card" style={{padding:28}}>
                  <h3 style={{fontSize:18,fontWeight:600,marginBottom:16}}>Verification Checklist</h3>
                  {["JCI accreditation certificate uploaded","Hospital license verified","Doctor credentials checked","Insurance partnerships confirmed","Price list submitted"].map((item,i)=>(
                    <div key={i} style={{display:"flex",gap:10,alignItems:"center",marginBottom:10}}>
                      <input type="checkbox" style={{width:16,height:16,cursor:"pointer"}}/>
                      <span style={{fontSize:14,color:"var(--slate)"}}>{item}</span>
                    </div>
                  ))}
                  <button className="btn-primary" style={{width:"100%",justifyContent:"center",marginTop:16}}>Submit Hospital for Review</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

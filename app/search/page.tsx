"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const currencies: Record<string,{symbol:string;rate:number}> = {
  USD:{symbol:"$",rate:1},EUR:{symbol:"€",rate:0.92},GBP:{symbol:"£",rate:0.79},
  INR:{symbol:"₹",rate:83},AUD:{symbol:"A$",rate:1.53},CAD:{symbol:"C$",rate:1.36},
  SGD:{symbol:"S$",rate:1.34},JPY:{symbol:"¥",rate:149},AED:{symbol:"د.إ",rate:3.67},
  THB:{symbol:"฿",rate:35},MYR:{symbol:"RM",rate:4.7},TRY:{symbol:"₺",rate:30},
};

const hospitals = [
  {id:1,name:"Fortis Memorial Research Institute",country:"🇮🇳 India",city:"Gurugram",rating:4.9,reviews:2840,accreditation:"JCI",successRate:97,englishSpeaking:true,procedures:{"Hip Replacement":6500,"Knee Replacement":5800,"Heart Bypass":11000,"Cancer Treatment":8000,"IVF / Fertility":3200,"Dental Implants":500,"Spine Surgery":9000,"Bariatric Surgery":8000},flightFrom:900,hotel:45,recovery:{"Hip Replacement":14,"Knee Replacement":14,"Heart Bypass":21,"Cancer Treatment":30,"IVF / Fertility":7,"Dental Implants":3,"Spine Surgery":21,"Bariatric Surgery":14},specialty:"Cardiac & Orthopedic",badge:"Most Popular"},
  {id:2,name:"Bumrungrad International Hospital",country:"🇹🇭 Thailand",city:"Bangkok",rating:4.8,reviews:4210,accreditation:"JCI",successRate:96,englishSpeaking:true,procedures:{"Hip Replacement":8000,"Dental Implants":800,"Cosmetic Surgery":3500,"IVF / Fertility":4000,"LASIK Eye Surgery":1000,"Bariatric Surgery":9000,"Hair Transplant":2500},flightFrom:1100,hotel:55,recovery:{"Hip Replacement":14,"Dental Implants":3,"Cosmetic Surgery":10,"IVF / Fertility":7,"LASIK Eye Surgery":3,"Bariatric Surgery":14,"Hair Transplant":5},specialty:"Dental & Cosmetic",badge:"Top Rated"},
  {id:3,name:"Acibadem Maslak Hospital",country:"🇹🇷 Turkey",city:"Istanbul",rating:4.8,reviews:1920,accreditation:"JCI",successRate:95,englishSpeaking:true,procedures:{"Hair Transplant":1800,"LASIK Eye Surgery":900,"Dental Implants":700,"Rhinoplasty":3500,"IVF / Fertility":3800,"Bariatric Surgery":8500},flightFrom:700,hotel:50,recovery:{"Hair Transplant":5,"LASIK Eye Surgery":3,"Dental Implants":3,"Rhinoplasty":10,"IVF / Fertility":7,"Bariatric Surgery":14},specialty:"Hair & Ophthalmology",badge:"Best Value"},
  {id:4,name:"Gleneagles Hospital",country:"🇸🇬 Singapore",city:"Singapore",rating:4.9,reviews:3100,accreditation:"JCI",successRate:98,englishSpeaking:true,procedures:{"Heart Bypass":25000,"Cancer Treatment":22000,"Spine Surgery":18000,"Kidney Transplant":35000,"Hip Replacement":18000,"IVF / Fertility":8000},flightFrom:1400,hotel:120,recovery:{"Heart Bypass":21,"Cancer Treatment":30,"Spine Surgery":21,"Kidney Transplant":28,"Hip Replacement":14,"IVF / Fertility":7},specialty:"Complex Surgery",badge:"Premium"},
  {id:5,name:"KPJ Damansara Specialist Hospital",country:"🇲🇾 Malaysia",city:"Kuala Lumpur",rating:4.7,reviews:1560,accreditation:"JCI",successRate:94,englishSpeaking:true,procedures:{"Hip Replacement":7000,"Dental Implants":900,"Bariatric Surgery":8000,"LASIK Eye Surgery":1100,"IVF / Fertility":4500,"Heart Bypass":13000},flightFrom:1000,hotel:40,recovery:{"Hip Replacement":14,"Dental Implants":3,"Bariatric Surgery":14,"LASIK Eye Surgery":3,"IVF / Fertility":7,"Heart Bypass":21},specialty:"General Surgery",badge:"Great Choice"},
  {id:6,name:"Hospital Angeles Tijuana",country:"🇲🇽 Mexico",city:"Tijuana",rating:4.6,reviews:2200,accreditation:"JCI",successRate:93,englishSpeaking:true,procedures:{"Dental Implants":600,"Bariatric Surgery":7500,"Hip Replacement":9000,"Rhinoplasty":4000,"LASIK Eye Surgery":1200,"IVF / Fertility":5000},flightFrom:400,hotel:35,recovery:{"Dental Implants":3,"Bariatric Surgery":14,"Hip Replacement":14,"Rhinoplasty":10,"LASIK Eye Surgery":3,"IVF / Fertility":7},specialty:"Dental & Bariatric",badge:"Closest to USA"},
];

type Hospital = typeof hospitals[0];

// BudgetSlider component
function BudgetSlider({min,max,value,onChange}:{min:number;max:number;value:[number,number];onChange:(v:[number,number])=>void}) {
  const fmt=(n:number)=>n>=1000?`$${(n/1000).toFixed(0)}k`:`$${n}`;
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",fontSize:13,fontWeight:600,color:"var(--teal)",marginBottom:8}}>
        <span>{fmt(value[0])}</span><span>{fmt(value[1])}{value[1]>=max?"+":" "}</span>
      </div>
      <div style={{position:"relative",height:6,background:"var(--border)",borderRadius:3}}>
        <div style={{position:"absolute",left:`${((value[0]-min)/(max-min))*100}%`,right:`${100-((value[1]-min)/(max-min))*100}%`,height:"100%",background:"var(--teal)",borderRadius:3}}/>
        <input type="range" min={min} max={max} step={500} value={value[0]}
          onChange={e=>onChange([Math.min(Number(e.target.value),value[1]-1000),value[1]])}
          style={{position:"absolute",inset:0,width:"100%",opacity:0,cursor:"pointer",height:"100%"}}/>
        <input type="range" min={min} max={max} step={500} value={value[1]}
          onChange={e=>onChange([value[0],Math.max(Number(e.target.value),value[0]+1000)])}
          style={{position:"absolute",inset:0,width:"100%",opacity:0,cursor:"pointer",height:"100%"}}/>
      </div>
    </div>
  );
}

function SearchContent() {
  const params = useSearchParams();
  const [procedure, setProcedure] = useState(params.get("procedure")||"");
  const [currency, setCurrency] = useState("USD");
  const [priority, setPriority] = useState<"cost"|"quality"|"speed">("cost");
  const [budget, setBudget] = useState<[number,number]>([2000,50000]);
  const [travelDate, setTravelDate] = useState("");
  const [filterJCI, setFilterJCI] = useState(true);
  const [filterEnglish, setFilterEnglish] = useState(false);
  const [results, setResults] = useState<Hospital[]>(hospitals);
  const [saved, setSaved] = useState<number[]>([]);
  const [compareList, setCompareList] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<"single"|"multi">("single");
  const [location, setLocation] = useState("Detecting...");

  // Auto-detect location
  useEffect(()=>{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        ()=>setLocation("Your Location ✓"),
        ()=>setLocation("Location not detected")
      );
    } else setLocation("Enter manually");
  },[]);

  const fmt=(usd:number)=>{const r=currencies[currency];return `${r.symbol}${Math.round(usd*r.rate).toLocaleString()}`;};
  const getRecovery=(h:Hospital):number=>{const v=procedure?h.recovery[procedure as keyof typeof h.recovery]:undefined;return v??10;};
  const getProcCost=(h:Hospital):number=>{const v=procedure?h.procedures[procedure as keyof typeof h.procedures]:undefined;return v??Object.values(h.procedures)[0];};
  const getTotal=(h:Hospital):number=>getProcCost(h)+h.flightFrom+(h.hotel*getRecovery(h));

  useEffect(()=>{
    let f=[...hospitals];
    if(procedure) f=f.filter(h=>h.procedures[procedure as keyof typeof h.procedures]);
    if(filterJCI) f=f.filter(h=>h.accreditation==="JCI");
    if(filterEnglish) f=f.filter(h=>h.englishSpeaking);
    f=f.filter(h=>getTotal(h)>=budget[0]&&getTotal(h)<=budget[1]);
    if(priority==="cost") f.sort((a,b)=>getTotal(a)-getTotal(b));
    if(priority==="quality") f.sort((a,b)=>b.rating-a.rating);
    if(priority==="speed") f.sort((a,b)=>getRecovery(a)-getRecovery(b));
    setResults(f);
  },[procedure,priority,budget,filterJCI,filterEnglish]);

  const toggleSave=(id:number)=>setSaved(s=>s.includes(id)?s.filter(x=>x!==id):[...s,id]);
  const toggleCompare=(id:number)=>{if(compareList.includes(id))setCompareList(c=>c.filter(x=>x!==id));else if(compareList.length<3)setCompareList(c=>[...c,id]);};

  const multiRoutes=[
    {id:"mr1",label:"🏆 Smart Route — Consult Singapore → Operate India → Recover Thailand",steps:[{flag:"🇸🇬",city:"Singapore",role:"Consultation",cost:800},{flag:"🇮🇳",city:"India",role:"Surgery",cost:6500},{flag:"🇹🇭",city:"Thailand",role:"Recovery",cost:1200}],flights:3500,hotel:2000,total:14000,savingVsUSA:26000},
    {id:"mr2",label:"💡 Budget Route — Turkey Surgery + Fly Home",steps:[{flag:"🇹🇷",city:"Turkey",role:"Surgery + Recovery",cost:6500}],flights:700,hotel:700,total:7900,savingVsUSA:32100},
  ];

  return (
    <div>
      <Navbar/>

      {/* SCREEN 2 — FILTER PANEL */}
      <div style={{background:"var(--navy)",padding:"28px 0"}}>
        <div className="container">
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:16,marginBottom:20}}>
            {/* Procedure */}
            <div>
              <label style={{fontSize:11,fontWeight:600,color:"#94a3b8",textTransform:"uppercase",letterSpacing:1,display:"block",marginBottom:8}}>🔍 Procedure</label>
              <select value={procedure} onChange={e=>setProcedure(e.target.value)} style={{width:"100%",background:"#1e293b",border:"1px solid #334155",color:"white",borderRadius:10,padding:"11px 14px",fontSize:14,fontFamily:"DM Sans"}}>
                <option value="">All Procedures</option>
                {["Hip Replacement","Knee Replacement","Heart Bypass","IVF / Fertility","LASIK Eye Surgery","Hair Transplant","Dental Implants","Bariatric Surgery","Cancer Treatment","Rhinoplasty","Spine Surgery"].map(p=><option key={p}>{p}</option>)}
              </select>
            </div>
            {/* Location */}
            <div>
              <label style={{fontSize:11,fontWeight:600,color:"#94a3b8",textTransform:"uppercase",letterSpacing:1,display:"block",marginBottom:8}}>📍 Your Location</label>
              <div style={{background:"#1e293b",border:"1px solid #334155",borderRadius:10,padding:"11px 14px",fontSize:14,color:location.includes("✓")?"#5eead4":"#94a3b8",display:"flex",alignItems:"center",gap:8}}>
                <span>{location.includes("✓")?"✓":"⏳"}</span>{location}
              </div>
            </div>
            {/* Travel Date */}
            <div>
              <label style={{fontSize:11,fontWeight:600,color:"#94a3b8",textTransform:"uppercase",letterSpacing:1,display:"block",marginBottom:8}}>📅 Travel Date</label>
              <input type="date" value={travelDate} onChange={e=>setTravelDate(e.target.value)} style={{width:"100%",background:"#1e293b",border:"1px solid #334155",color:travelDate?"white":"#64748b",borderRadius:10,padding:"11px 14px",fontSize:14,fontFamily:"DM Sans"}}/>
            </div>
            {/* Currency */}
            <div>
              <label style={{fontSize:11,fontWeight:600,color:"#94a3b8",textTransform:"uppercase",letterSpacing:1,display:"block",marginBottom:8}}>💱 Currency</label>
              <select value={currency} onChange={e=>setCurrency(e.target.value)} style={{width:"100%",background:"#1e293b",border:"1px solid #334155",color:"white",borderRadius:10,padding:"11px 14px",fontSize:14,fontFamily:"DM Sans"}}>
                {Object.keys(currencies).map(c=><option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gap:20,alignItems:"end"}}>
            {/* Budget Slider */}
            <div>
              <label style={{fontSize:11,fontWeight:600,color:"#94a3b8",textTransform:"uppercase",letterSpacing:1,display:"block",marginBottom:12}}>💰 Budget Range (Total Trip)</label>
              <BudgetSlider min={2000} max={50000} value={budget} onChange={setBudget}/>
            </div>

            {/* Priority Toggle */}
            <div>
              <label style={{fontSize:11,fontWeight:600,color:"#94a3b8",textTransform:"uppercase",letterSpacing:1,display:"block",marginBottom:8}}>⚡ Priority</label>
              <div style={{display:"flex",background:"#1e293b",borderRadius:10,padding:3,border:"1px solid #334155"}}>
                {(["cost","quality","speed"] as const).map(p=>(
                  <button key={p} onClick={()=>setPriority(p)} style={{flex:1,padding:"8px 4px",borderRadius:8,border:"none",cursor:"pointer",background:priority===p?"var(--teal)":"transparent",color:priority===p?"white":"#94a3b8",fontSize:12,fontWeight:600,fontFamily:"DM Sans",textTransform:"capitalize",transition:"all 0.2s"}}>{p==="cost"?"💰 Cost":p==="quality"?"⭐ Quality":"⚡ Speed"}</button>
                ))}
              </div>
            </div>

            {/* Checkboxes */}
            <div>
              <label style={{fontSize:11,fontWeight:600,color:"#94a3b8",textTransform:"uppercase",letterSpacing:1,display:"block",marginBottom:10}}>Must Have</label>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {[{label:"🏆 JCI Accredited",val:filterJCI,set:setFilterJCI},{label:"🗣️ English Speaking",val:filterEnglish,set:setFilterEnglish}].map(({label,val,set})=>(
                  <label key={label} style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",fontSize:13,color:"white"}}>
                    <div onClick={()=>set(!val)} style={{width:18,height:18,borderRadius:5,border:`2px solid ${val?"var(--teal)":"#475569"}`,background:val?"var(--teal)":"transparent",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0}}>
                      {val&&<span style={{color:"white",fontSize:11,fontWeight:700}}>✓</span>}
                    </div>
                    {label}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Mode toggle */}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:16}}>
            <div style={{display:"flex",gap:4,background:"#1e293b",borderRadius:10,padding:3,border:"1px solid #334155",width:"fit-content"}}>
              <button onClick={()=>setViewMode("single")} style={{padding:"7px 18px",borderRadius:8,border:"none",cursor:"pointer",background:viewMode==="single"?"var(--teal)":"transparent",color:viewMode==="single"?"white":"#94a3b8",fontSize:13,fontWeight:600,fontFamily:"DM Sans"}}>Single Country</button>
              <button onClick={()=>setViewMode("multi")} style={{padding:"7px 18px",borderRadius:8,border:"none",cursor:"pointer",background:viewMode==="multi"?"var(--teal)":"transparent",color:viewMode==="multi"?"white":"#94a3b8",fontSize:13,fontWeight:600,fontFamily:"DM Sans"}}>🗺️ Multi-Country Route</button>
            </div>
            <span style={{color:"#94a3b8",fontSize:13}}>{results.length} hospitals match your filters</span>
          </div>
        </div>
      </div>

      {/* Compare bar */}
      {compareList.length>0&&(
        <div style={{background:"var(--teal)",padding:"10px 0",position:"sticky",top:0,zIndex:50}}>
          <div className="container" style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{color:"white",fontWeight:600}}>Comparing {compareList.length} hospital{compareList.length>1?"s":""}</span>
            <Link href={`/compare?ids=${compareList.join(",")}`} style={{background:"white",color:"var(--teal)",padding:"7px 18px",borderRadius:8,fontWeight:700,fontSize:13,textDecoration:"none"}}>Compare Now →</Link>
          </div>
        </div>
      )}

      {/* SCREEN 3 — RESULTS */}
      <div className="container" style={{padding:"28px 24px"}}>
        {viewMode==="multi"?(
          <div>
            <div style={{background:"var(--teal-light)",border:"1px solid #99f6e4",borderRadius:14,padding:20,marginBottom:20}}>
              <h2 style={{fontSize:20,fontWeight:700,marginBottom:6}}>🗺️ Smart Multi-Country Routes</h2>
              <p style={{color:"var(--muted)",fontSize:14}}>Cheapest total journey across multiple countries — like Skyscanner for medical travel</p>
            </div>
            {multiRoutes.map(route=>(
              <div key={route.id} className="card" style={{padding:24,marginBottom:16}}>
                <h3 style={{fontSize:16,fontWeight:600,marginBottom:18}}>{route.label}</h3>
                <div style={{display:"flex",alignItems:"center",gap:0,marginBottom:20,overflowX:"auto"}}>
                  {route.steps.map((step,i)=>(
                    <div key={i} style={{display:"flex",alignItems:"center"}}>
                      <div style={{textAlign:"center",padding:"12px 18px",background:"var(--surface)",borderRadius:12,minWidth:130}}>
                        <div style={{fontSize:24}}>{step.flag}</div>
                        <div style={{fontWeight:600,fontSize:13,marginTop:4}}>{step.city}</div>
                        <div style={{fontSize:11,color:"var(--teal)",fontWeight:600}}>{step.role}</div>
                        <div style={{fontSize:15,fontWeight:700,marginTop:4}}>{fmt(step.cost)}</div>
                      </div>
                      {i<route.steps.length-1&&<div style={{fontSize:18,color:"var(--muted)",padding:"0 6px"}}>→</div>}
                    </div>
                  ))}
                  <div style={{fontSize:18,color:"var(--muted)",padding:"0 6px"}}>+</div>
                  <div style={{textAlign:"center",padding:"12px 18px",background:"var(--surface)",borderRadius:12,minWidth:130}}>
                    <div style={{fontSize:24}}>✈️🏨</div>
                    <div style={{fontWeight:600,fontSize:13,marginTop:4}}>Flights + Hotels</div>
                    <div style={{fontSize:15,fontWeight:700,marginTop:4}}>{fmt(route.flights+route.hotel)}</div>
                  </div>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
                  <div>
                    <span style={{fontSize:13,color:"var(--muted)"}}>Total: </span>
                    <span style={{fontSize:28,fontWeight:700,color:"var(--teal)",fontFamily:"Sora"}}>{fmt(route.total)}</span>
                    <span style={{fontSize:14,color:"var(--success)",fontWeight:600,marginLeft:12}}>Save {fmt(route.savingVsUSA)} vs USA 🎉</span>
                  </div>
                  <Link href="/book/1" className="btn-primary" style={{textDecoration:"none"}}>Book This Route →</Link>
                </div>
              </div>
            ))}
          </div>
        ):(
          <div style={{display:"grid",gap:16}}>
            {results.length===0&&(
              <div style={{textAlign:"center",padding:"60px 24px"}}>
                <div style={{fontSize:48,marginBottom:16}}>🔍</div>
                <h3 style={{fontSize:22,fontWeight:600,marginBottom:8}}>No hospitals match your filters</h3>
                <p style={{color:"var(--muted)"}}>Try adjusting your budget range or removing some filters</p>
              </div>
            )}
            {results.map(h=>{
              const procCost=getProcCost(h);
              const nights=getRecovery(h);
              const hotelTotal=h.hotel*nights;
              const total=procCost+h.flightFrom+hotelTotal;
              const isSaved=saved.includes(h.id);
              const isCompare=compareList.includes(h.id);
              return (
                /* SCREEN 3 CARD — Skyscanner style */
                <div key={h.id} style={{background:"white",borderRadius:16,border:isCompare?"2px solid var(--teal)":"1px solid var(--border)",overflow:"hidden",transition:"all 0.25s",boxShadow:isCompare?"0 0 0 3px rgba(13,148,136,0.1)":"none"}}>
                  <div style={{padding:"20px 24px"}}>
                    <div style={{display:"grid",gridTemplateColumns:"1fr auto",gap:20}}>
                      {/* Left */}
                      <div>
                        {/* Hospital name + badges */}
                        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8,flexWrap:"wrap"}}>
                          <h3 style={{fontSize:17,fontWeight:700,margin:0}}>{h.name}</h3>
                          <span style={{background:"var(--accent-light)",color:"var(--accent)",padding:"2px 9px",borderRadius:20,fontSize:11,fontWeight:700}}>{h.badge}</span>
                          <span style={{background:"var(--teal-light)",color:"var(--teal)",padding:"2px 9px",borderRadius:20,fontSize:11,fontWeight:700}}>🏆 {h.accreditation}</span>
                        </div>
                        <div style={{fontSize:13,color:"var(--muted)",marginBottom:12}}>{h.country} · {h.city} · {h.specialty}</div>

                        {/* Rating + success rate */}
                        <div style={{display:"flex",gap:14,alignItems:"center",marginBottom:16,flexWrap:"wrap"}}>
                          <span style={{display:"flex",alignItems:"center",gap:4}}>
                            <span style={{color:"#f59e0b",fontSize:15}}>{"★".repeat(Math.floor(h.rating))}</span>
                            <strong style={{fontSize:14}}>{h.rating}</strong>
                            <span style={{color:"var(--muted)",fontSize:13}}>({h.reviews.toLocaleString()} reviews)</span>
                          </span>
                          <span style={{background:"#dcfce7",color:"#166534",padding:"2px 10px",borderRadius:20,fontSize:12,fontWeight:600}}>✓ {h.successRate}% success rate</span>
                        </div>

                        {/* Skyscanner-style cost breakdown */}
                        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
                          <div style={{background:"var(--surface)",borderRadius:10,padding:12}}>
                            <div style={{fontSize:11,color:"var(--muted)",marginBottom:3}}>🏥 Surgery</div>
                            <div style={{fontWeight:700,fontSize:16,color:"var(--navy)"}}>{fmt(procCost)}</div>
                          </div>
                          <div style={{background:"var(--surface)",borderRadius:10,padding:12}}>
                            <div style={{fontSize:11,color:"var(--muted)",marginBottom:3}}>✈️ Flight</div>
                            <div style={{fontWeight:700,fontSize:16,color:"var(--navy)"}}>{fmt(h.flightFrom)}</div>
                          </div>
                          <div style={{background:"var(--surface)",borderRadius:10,padding:12}}>
                            <div style={{fontSize:11,color:"var(--muted)",marginBottom:3}}>🏨 Hotel ({nights} nights)</div>
                            <div style={{fontWeight:700,fontSize:16,color:"var(--navy)"}}>{fmt(hotelTotal)}</div>
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div style={{display:"flex",gap:8,marginTop:14}}>
                          <button onClick={()=>toggleSave(h.id)} style={{fontSize:12,padding:"6px 12px",border:"1px solid var(--border)",borderRadius:8,background:isSaved?"#fef2f2":"white",color:isSaved?"#dc2626":"var(--muted)",cursor:"pointer",fontFamily:"DM Sans"}}>{isSaved?"❤️ Saved":"🤍 Save"}</button>
                          <button onClick={()=>toggleCompare(h.id)} style={{fontSize:12,padding:"6px 12px",border:"1px solid var(--border)",borderRadius:8,background:isCompare?"var(--teal-light)":"white",color:isCompare?"var(--teal)":"var(--muted)",cursor:"pointer",fontFamily:"DM Sans"}}>{isCompare?"✓ Comparing":"⚖️ Compare"}</button>
                        </div>
                      </div>

                      {/* Right — total + CTA */}
                      <div style={{textAlign:"right",display:"flex",flexDirection:"column",justifyContent:"space-between",minWidth:170}}>
                        <div>
                          <div style={{fontSize:11,color:"var(--muted)",marginBottom:4}}>Total Trip Cost</div>
                          <div style={{fontSize:34,fontWeight:800,color:"var(--teal)",fontFamily:"Sora",lineHeight:1}}>{fmt(total)}</div>
                          <div style={{fontSize:11,color:"var(--muted)",marginTop:6}}>procedure + flight + hotel</div>
                        </div>
                        <div style={{display:"flex",flexDirection:"column",gap:8,marginTop:16}}>
                          <Link href={`/hospital/${h.id}`} className="btn-primary" style={{textDecoration:"none",justifyContent:"center",fontSize:14,padding:"10px 14px"}}>VIEW DETAILS</Link>
                          <Link href={`/book/${h.id}`} className="btn-secondary" style={{textDecoration:"none",justifyContent:"center",fontSize:14,padding:"10px 14px"}}>BOOK</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
}

export default function SearchPage() {
  return <Suspense fallback={<div style={{padding:60,textAlign:"center",fontSize:16}}>Loading hospitals...</div>}><SearchContent/></Suspense>;
}

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({country:"",budget:"",procedure:"",timeline:"",health:""});
  const router = useRouter();
  const steps = ["Your Country","Your Budget","Procedure Needed","Timeline","Health Info"];

  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#0f172a 0%,#134e4a 100%)",display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
      <div style={{background:"white",borderRadius:24,padding:48,maxWidth:520,width:"100%",boxShadow:"0 32px 80px rgba(0,0,0,0.3)"}}>
        <div style={{textAlign:"center",marginBottom:32}}>
          <div style={{width:52,height:52,background:"var(--teal)",borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",fontSize:24}}>✚</div>
          <h1 style={{fontSize:28,fontWeight:700,marginBottom:8}}>Let's personalise your search</h1>
          <p style={{color:"var(--muted)",fontSize:15}}>Step {step+1} of {steps.length}</p>
          <div style={{display:"flex",gap:6,marginTop:16,justifyContent:"center"}}>
            {steps.map((_,i)=><div key={i} style={{height:4,width:i===step?32:16,borderRadius:2,background:i<=step?"var(--teal)":"var(--border)",transition:"all 0.3s"}}/>)}
          </div>
        </div>

        {step===0&&(<div><h2 style={{fontSize:20,fontWeight:600,marginBottom:20}}>Which country are you from?</h2><input placeholder="e.g. United States, United Kingdom, Australia..." value={data.country} onChange={e=>setData({...data,country:e.target.value})}/></div>)}
        {step===1&&(<div><h2 style={{fontSize:20,fontWeight:600,marginBottom:20}}>What is your total budget?</h2><select value={data.budget} onChange={e=>setData({...data,budget:e.target.value})} style={{border:"1.5px solid var(--border)",borderRadius:10,padding:"12px 16px",fontSize:15,width:"100%"}}><option value="">Select budget range...</option>{["Under $5,000","$5,000–$15,000","$15,000–$30,000","$30,000–$60,000","Over $60,000","No strict limit"].map(b=><option key={b}>{b}</option>)}</select></div>)}
        {step===2&&(<div><h2 style={{fontSize:20,fontWeight:600,marginBottom:20}}>What procedure do you need?</h2><select value={data.procedure} onChange={e=>setData({...data,procedure:e.target.value})} style={{border:"1.5px solid var(--border)",borderRadius:10,padding:"12px 16px",fontSize:15,width:"100%"}}><option value="">Select procedure...</option>{["Hip Replacement","Knee Replacement","Dental Implants","Heart Bypass","IVF / Fertility","LASIK Eye Surgery","Hair Transplant","Bariatric Surgery","Cancer Treatment","Rhinoplasty","Spine Surgery","Other"].map(p=><option key={p}>{p}</option>)}</select></div>)}
        {step===3&&(<div><h2 style={{fontSize:20,fontWeight:600,marginBottom:20}}>When do you want to travel?</h2><select value={data.timeline} onChange={e=>setData({...data,timeline:e.target.value})} style={{border:"1.5px solid var(--border)",borderRadius:10,padding:"12px 16px",fontSize:15,width:"100%"}}><option value="">Select timeline...</option>{["Within 1 month","1–3 months","3–6 months","6–12 months","Just exploring"].map(t=><option key={t}>{t}</option>)}</select></div>)}
        {step===4&&(<div><h2 style={{fontSize:20,fontWeight:600,marginBottom:20}}>Any health considerations?</h2><textarea rows={4} placeholder="e.g. Diabetes, hypertension, previous surgeries, allergies..." value={data.health} onChange={e=>setData({...data,health:e.target.value})} style={{resize:"vertical",fontFamily:"DM Sans",border:"1.5px solid var(--border)",borderRadius:10,padding:"12px 16px",fontSize:15,width:"100%",outline:"none"}}/></div>)}

        <div style={{display:"flex",justifyContent:"space-between",marginTop:28}}>
          {step>0?<button className="btn-secondary" onClick={()=>setStep(step-1)}>← Back</button>:<div/>}
          {step<steps.length-1
            ?<button className="btn-primary" onClick={()=>setStep(step+1)}>Continue →</button>
            :<button className="btn-primary" onClick={()=>router.push(`/search?procedure=${data.procedure}`)}>Find My Hospitals →</button>}
        </div>
      </div>
    </div>
  );
}

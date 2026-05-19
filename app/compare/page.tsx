"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

const hospitals: Record<number,any> = {
  1:{name:"Fortis India",country:"🇮🇳 India",city:"Gurugram",rating:4.9,reviews:2840,accreditation:"JCI",successRate:97,founded:1996,beds:1000,hipReplacement:6500,flight:900,hotel:45,recovery:14,specialty:"Cardiac & Orthopedic",languages:"English, Hindi",insurance:"All major",waitTime:"1-2 weeks"},
  2:{name:"Bumrungrad Thailand",country:"🇹🇭 Thailand",city:"Bangkok",rating:4.8,reviews:4210,accreditation:"JCI",successRate:96,founded:1980,beds:554,hipReplacement:8000,flight:1100,hotel:55,recovery:14,specialty:"Dental & Cosmetic",languages:"English, Thai",insurance:"All major",waitTime:"1-2 weeks"},
  3:{name:"Acibadem Turkey",country:"🇹🇷 Turkey",city:"Istanbul",rating:4.8,reviews:1920,accreditation:"JCI",successRate:95,founded:1991,beds:234,hipReplacement:6500,flight:700,hotel:50,recovery:14,specialty:"Hair & Eyes",languages:"English, Turkish",insurance:"Most major",waitTime:"Immediate"},
  4:{name:"Gleneagles Singapore",country:"🇸🇬 Singapore",city:"Singapore",rating:4.9,reviews:3100,accreditation:"JCI",successRate:98,founded:1976,beds:380,hipReplacement:18000,flight:1400,hotel:120,recovery:14,specialty:"Complex Surgery",languages:"English",insurance:"All major",waitTime:"2-3 weeks"},
};

function CompareContent() {
  const params = useSearchParams();
  const ids = (params.get("ids")||"1,2,3").split(",").map(Number).slice(0,3);
  const selected = ids.map(id=>({id,...hospitals[id]})).filter(Boolean);
  const fmt = (n:number)=>`$${n.toLocaleString()}`;

  const rows = [
    {label:"Country",key:"country"},
    {label:"City",key:"city"},
    {label:"Accreditation",key:"accreditation"},
    {label:"Success Rate",key:"successRate",render:(v:any)=><span style={{color:"var(--success)",fontWeight:600}}>{v}%</span>},
    {label:"Rating",key:"rating",render:(v:any)=><span>⭐ {v}</span>},
    {label:"Reviews",key:"reviews",render:(v:any)=>v.toLocaleString()},
    {label:"Hospital Beds",key:"beds"},
    {label:"Founded",key:"founded"},
    {label:"Specialty",key:"specialty"},
    {label:"Languages",key:"languages"},
    {label:"Insurance Accepted",key:"insurance"},
    {label:"Wait Time",key:"waitTime"},
    {label:"Hip Replacement Cost",key:"hipReplacement",render:(v:any)=>fmt(v)},
    {label:"Est. Flight From USA",key:"flight",render:(v:any)=>fmt(v)},
    {label:"Hotel/night",key:"hotel",render:(v:any)=>fmt(v)},
    {label:"Recovery Days",key:"recovery",render:(v:any)=>`${v} days`},
    {label:"Total Trip Cost",key:"total",render:(_:any,h:any)=><strong style={{color:"var(--teal)",fontSize:18}}>{fmt(h.hipReplacement+h.flight+(h.hotel*h.recovery))}</strong>},
  ];

  return (
    <div>
      <Navbar/>
      <div style={{background:"var(--navy)",padding:"60px 0",textAlign:"center"}}>
        <div className="container">
          <h1 style={{fontSize:44,fontWeight:700,color:"white",marginBottom:12}}>Side-by-Side Comparison</h1>
          <p style={{color:"#94a3b8",fontSize:17}}>Compare hospitals across every metric to make the right decision</p>
        </div>
      </div>
      <div className="container" style={{padding:"40px 24px",overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",minWidth:600}}>
          <thead>
            <tr>
              <th style={{padding:"16px",textAlign:"left",fontSize:13,fontWeight:600,color:"var(--muted)",width:200}}>Feature</th>
              {selected.map(h=>(
                <th key={h.id} style={{padding:"16px",textAlign:"center"}}>
                  <div style={{fontWeight:700,fontSize:16,marginBottom:4}}>{h.name}</div>
                  <div style={{fontSize:13,color:"var(--muted)"}}>{h.country}</div>
                  <Link href={`/book/${h.id}`} className="btn-primary" style={{fontSize:12,padding:"6px 14px",textDecoration:"none",display:"inline-flex",marginTop:10}}>Book →</Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row,i)=>(
              <tr key={row.label} style={{background:i%2===0?"var(--surface)":"white",borderBottom:"1px solid var(--border)"}}>
                <td style={{padding:"14px 16px",fontSize:13,fontWeight:600,color:"var(--muted)"}}>{row.label}</td>
                {selected.map(h=>(
                  <td key={h.id} style={{padding:"14px 16px",textAlign:"center",fontSize:14}}>
                    {row.render?row.render(h[row.key],h):h[row.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer/>
    </div>
  );
}

export default function ComparePage() {
  return <Suspense fallback={<div style={{padding:40,textAlign:"center"}}>Loading...</div>}><CompareContent/></Suspense>;
}

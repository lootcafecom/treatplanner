"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

const currencies:Record<string,{symbol:string;rate:number;name:string}> = {
  USD:{symbol:"$",rate:1,name:"US Dollar"},EUR:{symbol:"€",rate:0.92,name:"Euro"},
  GBP:{symbol:"£",rate:0.79,name:"British Pound"},INR:{symbol:"₹",rate:83,name:"Indian Rupee"},
  AUD:{symbol:"A$",rate:1.53,name:"Australian Dollar"},CAD:{symbol:"C$",rate:1.36,name:"Canadian Dollar"},
  SGD:{symbol:"S$",rate:1.34,name:"Singapore Dollar"},JPY:{symbol:"¥",rate:149,name:"Japanese Yen"},
  AED:{symbol:"د.إ",rate:3.67,name:"UAE Dirham"},THB:{symbol:"฿",rate:35,name:"Thai Baht"},
  MYR:{symbol:"RM",rate:4.7,name:"Malaysian Ringgit"},TRY:{symbol:"₺",rate:30,name:"Turkish Lira"},
  NZD:{symbol:"NZ$",rate:1.63,name:"New Zealand Dollar"},CHF:{symbol:"CHF",rate:0.89,name:"Swiss Franc"},
  ZAR:{symbol:"R",rate:18.6,name:"South African Rand"},BRL:{symbol:"R$",rate:4.97,name:"Brazilian Real"},
  KRW:{symbol:"₩",rate:1330,name:"South Korean Won"},HKD:{symbol:"HK$",rate:7.82,name:"Hong Kong Dollar"},
};

const procedurePrices:Record<string,Record<string,number>> = {
  "Hip Replacement":{usa:40000,uk:15000,australia:22000,india:6500,thailand:8000,turkey:6500,mexico:9000,singapore:18000,malaysia:7000},
  "Knee Replacement":{usa:35000,uk:14000,australia:20000,india:5800,thailand:7500,turkey:6000,mexico:8500,singapore:16000,malaysia:6500},
  "Heart Bypass":{usa:150000,uk:35000,australia:45000,india:11000,thailand:15000,turkey:14000,mexico:18000,singapore:25000,malaysia:13000},
  "Dental Implant":{usa:4000,uk:2500,australia:3000,india:500,thailand:800,turkey:700,mexico:600,singapore:2000,malaysia:900},
  "IVF Treatment":{usa:20000,uk:8000,australia:12000,india:3200,thailand:4000,turkey:3800,mexico:5000,singapore:8000,malaysia:4500},
  "LASIK Eye Surgery":{usa:4200,uk:2800,australia:3500,india:800,thailand:1000,turkey:900,mexico:1200,singapore:2200,malaysia:1100},
  "Hair Transplant":{usa:15000,uk:8000,australia:10000,india:2000,thailand:2500,turkey:1800,mexico:3000,singapore:5000,malaysia:2200},
  "Bariatric Surgery":{usa:25000,uk:12000,australia:16000,india:8000,thailand:9000,turkey:8500,mexico:7500,singapore:18000,malaysia:8000},
  "Rhinoplasty":{usa:12000,uk:7000,australia:9000,india:3000,thailand:4000,turkey:3500,mexico:4000,singapore:8000,malaysia:3500},
  "Spine Surgery":{usa:50000,uk:20000,australia:28000,india:9000,thailand:12000,turkey:11000,mexico:14000,singapore:20000,malaysia:10000},
  "Cancer Treatment":{usa:120000,uk:40000,australia:50000,india:8000,thailand:15000,turkey:14000,mexico:20000,singapore:22000,malaysia:12000},
};

const flightCosts:Record<string,number> = {india:900,thailand:1100,turkey:700,mexico:400,singapore:1400,malaysia:1000};
const hotelCosts:Record<string,number> = {india:45,thailand:55,turkey:50,mexico:35,singapore:120,malaysia:40};
const recoveryDays:Record<string,number> = {"Hip Replacement":14,"Knee Replacement":14,"Heart Bypass":21,"Dental Implant":3,"IVF Treatment":7,"LASIK Eye Surgery":3,"Hair Transplant":5,"Bariatric Surgery":14,"Rhinoplasty":10,"Spine Surgery":21,"Cancer Treatment":30};
const insuranceCost:Record<string,number> = {none:0,standard:280,comprehensive:490,elite:890};

export default function Calculator() {
  const [procedure, setProcedure] = useState("Hip Replacement");
  const [fromCountry, setFromCountry] = useState("usa");
  const [toCountry, setToCountry] = useState("india");
  const [currency, setCurrency] = useState("USD");
  const [companions, setCompanions] = useState(1);
  const [insurance, setInsurance] = useState("standard");

  const fmt=(usd:number)=>{const r=currencies[currency];return `${r.symbol}${Math.round(usd*r.rate).toLocaleString()}`;};

  const prices = procedurePrices[procedure]||procedurePrices["Hip Replacement"];
  const homePrice = prices[fromCountry]||prices.usa;
  const abroadPrice = prices[toCountry]||prices.india;
  const flight = (flightCosts[toCountry]||900)*companions;
  const nights = recoveryDays[procedure]||10;
  const hotel = (hotelCosts[toCountry]||45)*nights;
  const misc = 500;
  const ins = insuranceCost[insurance];
  const totalAbroad = abroadPrice+flight+hotel+misc+ins;
  const savings = homePrice-totalAbroad;
  const savingsPct = Math.round((savings/homePrice)*100);

  return (
    <div>
      <Navbar/>
      <div style={{background:"var(--navy)",padding:"60px 0 40px",textAlign:"center"}}>
        <div className="container">
          <div className="badge" style={{marginBottom:16,background:"rgba(13,148,136,0.2)",color:"#5eead4",border:"1px solid rgba(13,148,136,0.3)"}}>Free Tool</div>
          <h1 style={{fontSize:44,fontWeight:700,color:"white",marginBottom:12}}>Total Trip Cost Calculator</h1>
          <p style={{color:"#94a3b8",fontSize:17}}>Real total — procedure + flights + hotel + insurance. No hidden surprises.</p>
        </div>
      </div>

      <div className="container" style={{padding:"48px 24px"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:32}}>
          {/* Inputs */}
          <div>
            <h2 style={{fontSize:22,fontWeight:600,marginBottom:22}}>Your Details</h2>
            <div style={{display:"grid",gap:14}}>
              {[
                {label:"Procedure",el:<select value={procedure} onChange={e=>setProcedure(e.target.value)}>{Object.keys(procedurePrices).map(p=><option key={p}>{p}</option>)}</select>},
                {label:"Your Home Country",el:<select value={fromCountry} onChange={e=>setFromCountry(e.target.value)}><option value="usa">🇺🇸 United States</option><option value="uk">🇬🇧 United Kingdom</option><option value="australia">🇦🇺 Australia</option></select>},
                {label:"Treatment Destination",el:<select value={toCountry} onChange={e=>setToCountry(e.target.value)}><option value="india">🇮🇳 India</option><option value="thailand">🇹🇭 Thailand</option><option value="turkey">🇹🇷 Turkey</option><option value="mexico">🇲🇽 Mexico</option><option value="singapore">🇸🇬 Singapore</option><option value="malaysia">🇲🇾 Malaysia</option></select>},
                {label:"Display Currency",el:<select value={currency} onChange={e=>setCurrency(e.target.value)}>{Object.entries(currencies).map(([k,v])=><option key={k} value={k}>{k} — {v.name}</option>)}</select>},
                {label:"Companions Travelling",el:<input type="number" min={1} max={5} value={companions} onChange={e=>setCompanions(Number(e.target.value))}/>},
                {label:"Medical Travel Insurance",el:<select value={insurance} onChange={e=>setInsurance(e.target.value)}><option value="none">No insurance ($0)</option><option value="standard">Standard ($280)</option><option value="comprehensive">Comprehensive ($490)</option><option value="elite">Elite ($890)</option></select>},
              ].map(({label,el})=>(
                <div key={label}><label style={{fontSize:12,fontWeight:600,color:"var(--muted)",display:"block",marginBottom:6,textTransform:"uppercase",letterSpacing:0.5}}>{label}</label>{el}</div>
              ))}
            </div>
          </div>

          {/* Results */}
          <div>
            <h2 style={{fontSize:22,fontWeight:600,marginBottom:22}}>Cost Breakdown</h2>
            <div style={{background:"#fef2f2",border:"1px solid #fecaca",borderRadius:14,padding:20,marginBottom:14}}>
              <div style={{fontSize:12,color:"#b91c1c",fontWeight:600,marginBottom:6,textTransform:"uppercase"}}>At Home Cost</div>
              <div style={{fontSize:36,fontWeight:700,color:"#dc2626",fontFamily:"Sora"}}>{fmt(homePrice)}</div>
              <div style={{fontSize:12,color:"#b91c1c",marginTop:4}}>Procedure only — no travel costs</div>
            </div>

            <div style={{background:"var(--teal-light)",border:"1px solid #99f6e4",borderRadius:14,padding:20,marginBottom:14}}>
              <div style={{fontSize:12,color:"var(--teal-dark)",fontWeight:600,marginBottom:14,textTransform:"uppercase"}}>Abroad — Complete Cost</div>
              {[
                {label:`🏥 ${procedure}`,value:abroadPrice},
                {label:`✈️ Return flights (×${companions})`,value:flight},
                {label:`🏨 Hotel (${nights} nights)`,value:hotel},
                {label:"🧳 Misc (visa, transport, food)",value:misc},
                {label:`🛡️ Insurance (${insurance})`,value:ins,skip:insurance==="none"},
              ].filter(i=>!i.skip).map(item=>(
                <div key={item.label} style={{display:"flex",justifyContent:"space-between",marginBottom:10,fontSize:14}}>
                  <span style={{color:"var(--teal-dark)"}}>{item.label}</span>
                  <span style={{fontWeight:600,color:"var(--navy)"}}>{fmt(item.value)}</span>
                </div>
              ))}
              <div style={{borderTop:"1px solid #99f6e4",paddingTop:12,marginTop:4,display:"flex",justifyContent:"space-between"}}>
                <span style={{fontWeight:700,fontSize:16,color:"var(--teal-dark)"}}>Total Abroad</span>
                <span style={{fontWeight:700,fontSize:22,color:"var(--teal)",fontFamily:"Sora"}}>{fmt(totalAbroad)}</span>
              </div>
            </div>

            {savings>0&&(
              <div style={{background:"var(--navy)",borderRadius:14,padding:24,textAlign:"center"}}>
                <div style={{fontSize:14,color:"#94a3b8",marginBottom:6}}>🎉 You could save</div>
                <div style={{fontSize:44,fontWeight:700,color:"var(--success)",fontFamily:"Sora"}}>{fmt(savings)}</div>
                <div style={{fontSize:15,color:"#94a3b8",marginTop:4}}>That is {savingsPct}% cheaper than at home!</div>
                <Link href="/search" className="btn-primary" style={{marginTop:18,textDecoration:"none",justifyContent:"center",display:"flex"}}>Find Hospitals Now →</Link>
              </div>
            )}

            <div style={{marginTop:14,padding:14,background:"var(--surface)",borderRadius:10,fontSize:12,color:"var(--muted)"}}>
              * Prices are estimates. Actual costs may vary. Flight prices based on economy class from USA. Hotel costs based on 3-star near hospital.
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

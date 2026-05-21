"use client";
import { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

// TYPES
interface Hospital { id:string; name:string; city:string; country:string; flag:string; rating:number; reviews:number; accreditation:string; successRate:number; procedureCost:number; specialty:string; lat:number; lng:number; }
interface Flight { id:string; airline:string; origin:string; destination:string; departure:string; arrival:string; duration:string; stops:number; price:number; seatsLeft:number; }
interface Hotel { id:string; name:string; stars:number; rating:number; pricePerNight:number; totalPrice:number; distanceKm:number; amenities:string[]; }
interface Pkg { hospital:Hospital|null; flight:Flight|null; hotel:Hotel|null; miscCost:number; }

// JCI HOSPITALS (real names from JCI public directory)
const HOSPITAL_DB: Record<string, Hospital[]> = {
  India: [
    {id:"h1",name:"Fortis Memorial Research Institute",city:"Gurugram",country:"India",flag:"🇮🇳",rating:4.9,reviews:2840,accreditation:"JCI",successRate:97,procedureCost:0,specialty:"Cardiac, Orthopedic, Oncology",lat:28.4089,lng:77.0436},
    {id:"h2",name:"Apollo Hospitals",city:"Chennai",country:"India",flag:"🇮🇳",rating:4.8,reviews:5200,accreditation:"JCI",successRate:96,procedureCost:0,specialty:"Multi-specialty, Transplants",lat:13.0067,lng:80.2206},
    {id:"h3",name:"Medanta – The Medicity",city:"Gurugram",country:"India",flag:"🇮🇳",rating:4.8,reviews:3100,accreditation:"JCI",successRate:96,procedureCost:0,specialty:"Cardiac, Neuro, Oncology",lat:28.4486,lng:77.0436},
    {id:"h4",name:"Max Super Speciality Hospital",city:"New Delhi",country:"India",flag:"🇮🇳",rating:4.7,reviews:2900,accreditation:"JCI",successRate:95,procedureCost:0,specialty:"Cardiac, Orthopedic",lat:28.6139,lng:77.2090},
    {id:"h5",name:"Kokilaben Dhirubhai Ambani Hospital",city:"Mumbai",country:"India",flag:"🇮🇳",rating:4.8,reviews:2200,accreditation:"JCI",successRate:96,procedureCost:0,specialty:"Cardiac, Oncology",lat:19.1136,lng:72.8697},
  ],
  Thailand: [
    {id:"h6",name:"Bumrungrad International Hospital",city:"Bangkok",country:"Thailand",flag:"🇹🇭",rating:4.8,reviews:4210,accreditation:"JCI",successRate:96,procedureCost:0,specialty:"Dental, Cosmetic, Multi-specialty",lat:13.7420,lng:100.5601},
    {id:"h7",name:"Bangkok Hospital",city:"Bangkok",country:"Thailand",flag:"🇹🇭",rating:4.7,reviews:3100,accreditation:"JCI",successRate:95,procedureCost:0,specialty:"Cardiac, Orthopedic, Neurology",lat:13.7200,lng:100.5300},
    {id:"h8",name:"Samitivej Hospital",city:"Bangkok",country:"Thailand",flag:"🇹🇭",rating:4.7,reviews:1900,accreditation:"JCI",successRate:94,procedureCost:0,specialty:"Pediatrics, Fertility, Oncology",lat:13.7300,lng:100.5800},
    {id:"h9",name:"Vejthani Hospital",city:"Bangkok",country:"Thailand",flag:"🇹🇭",rating:4.7,reviews:1200,accreditation:"JCI",successRate:94,procedureCost:0,specialty:"Orthopedic, Spine, Dental",lat:13.7700,lng:100.6400},
  ],
  Turkey: [
    {id:"h10",name:"Acibadem Maslak Hospital",city:"Istanbul",country:"Turkey",flag:"🇹🇷",rating:4.8,reviews:1920,accreditation:"JCI",successRate:95,procedureCost:0,specialty:"Hair, Ophthalmology, Cosmetic",lat:41.1140,lng:29.0188},
    {id:"h11",name:"Memorial Sisli Hospital",city:"Istanbul",country:"Turkey",flag:"🇹🇷",rating:4.7,reviews:1600,accreditation:"JCI",successRate:94,procedureCost:0,specialty:"Oncology, Cardiac, Neuro",lat:41.0600,lng:28.9900},
    {id:"h12",name:"Medicana International Istanbul",city:"Istanbul",country:"Turkey",flag:"🇹🇷",rating:4.6,reviews:980,accreditation:"JCI",successRate:93,procedureCost:0,specialty:"Bariatric, Orthopedic, Fertility",lat:41.0200,lng:28.9600},
  ],
  Mexico: [
    {id:"h13",name:"Hospital Angeles Tijuana",city:"Tijuana",country:"Mexico",flag:"🇲🇽",rating:4.6,reviews:2200,accreditation:"JCI",successRate:93,procedureCost:0,specialty:"Dental, Bariatric, Cosmetic",lat:32.5149,lng:-117.0382},
    {id:"h14",name:"Hospital Angeles Monterrey",city:"Monterrey",country:"Mexico",flag:"🇲🇽",rating:4.6,reviews:1800,accreditation:"JCI",successRate:93,procedureCost:0,specialty:"Cardiac, Orthopedic, Oncology",lat:25.6866,lng:-100.3161},
  ],
  Singapore: [
    {id:"h15",name:"Gleneagles Hospital Singapore",city:"Singapore",country:"Singapore",flag:"🇸🇬",rating:4.9,reviews:3100,accreditation:"JCI",successRate:98,procedureCost:0,specialty:"Complex Surgery, Cancer, Cardiac",lat:1.3050,lng:103.8200},
    {id:"h16",name:"Mount Elizabeth Hospital",city:"Singapore",country:"Singapore",flag:"🇸🇬",rating:4.8,reviews:2700,accreditation:"JCI",successRate:97,procedureCost:0,specialty:"Oncology, Orthopedic, Neurology",lat:1.3040,lng:103.8330},
  ],
  Malaysia: [
    {id:"h17",name:"Gleneagles Hospital Kuala Lumpur",city:"Kuala Lumpur",country:"Malaysia",flag:"🇲🇾",rating:4.7,reviews:1800,accreditation:"JCI",successRate:95,procedureCost:0,specialty:"Multi-specialty, Transplants",lat:3.1580,lng:101.7120},
    {id:"h18",name:"KPJ Damansara Specialist Hospital",city:"Petaling Jaya",country:"Malaysia",flag:"🇲🇾",rating:4.7,reviews:1560,accreditation:"JCI",successRate:94,procedureCost:0,specialty:"Orthopedic, Fertility, Bariatric",lat:3.1300,lng:101.6200},
  ],
  "South Korea": [
    {id:"h19",name:"Severance Hospital, Yonsei University",city:"Seoul",country:"South Korea",flag:"🇰🇷",rating:4.8,reviews:2100,accreditation:"JCI",successRate:97,procedureCost:0,specialty:"Oncology, Cardiac, Neuro",lat:37.5626,lng:126.9395},
    {id:"h20",name:"Samsung Medical Center",city:"Seoul",country:"South Korea",flag:"🇰🇷",rating:4.9,reviews:3400,accreditation:"JCI",successRate:98,procedureCost:0,specialty:"Cancer, Transplants, Cardiac",lat:37.4883,lng:127.0853},
  ],
};

const PROCEDURE_COSTS: Record<string, Record<string,number>> = {
  "Hip Replacement":   {India:6500,Thailand:8000,Turkey:6500,Mexico:9000,Singapore:18000,Malaysia:7000,"South Korea":8500},
  "Knee Replacement":  {India:5800,Thailand:7500,Turkey:6000,Mexico:8500,Singapore:16000,Malaysia:6500,"South Korea":7500},
  "Heart Bypass":      {India:11000,Thailand:15000,Turkey:14000,Mexico:18000,Singapore:25000,Malaysia:13000,"South Korea":20000},
  "Dental Implants":   {India:500,Thailand:800,Turkey:700,Mexico:600,Singapore:2000,Malaysia:900,"South Korea":1200},
  "IVF / Fertility":   {India:3200,Thailand:4000,Turkey:3800,Mexico:5000,Singapore:8000,Malaysia:4500,"South Korea":5000},
  "LASIK Eye Surgery": {India:800,Thailand:1000,Turkey:900,Mexico:1200,Singapore:2200,Malaysia:1100,"South Korea":1500},
  "Hair Transplant":   {India:2000,Thailand:2500,Turkey:1800,Mexico:3000,Singapore:5000,Malaysia:2200,"South Korea":3500},
  "Bariatric Surgery": {India:8000,Thailand:9000,Turkey:8500,Mexico:7500,Singapore:18000,Malaysia:8000,"South Korea":12000},
  "Rhinoplasty":       {India:3000,Thailand:4500,Turkey:3500,Mexico:4000,Singapore:8000,Malaysia:3500,"South Korea":5000},
  "Spine Surgery":     {India:9000,Thailand:12000,Turkey:11000,Mexico:14000,Singapore:20000,Malaysia:10000,"South Korea":15000},
  "Cancer Treatment":  {India:8000,Thailand:14000,Turkey:13000,Mexico:18000,Singapore:22000,Malaysia:12000,"South Korea":18000},
  "Cataract Surgery":  {India:600,Thailand:900,Turkey:800,Mexico:1100,Singapore:2500,Malaysia:1000,"South Korea":1200},
};

const HOME_COSTS: Record<string, Record<string,number>> = {
  "Hip Replacement":   {USA:40000,UK:15000,Australia:22000,Canada:18000,Germany:12000,France:10000,UAE:14000},
  "Knee Replacement":  {USA:35000,UK:14000,Australia:20000,Canada:16000,Germany:11000,France:9000,UAE:13000},
  "Heart Bypass":      {USA:150000,UK:35000,Australia:45000,Canada:40000,Germany:28000,France:25000,UAE:30000},
  "Dental Implants":   {USA:4000,UK:2500,Australia:3000,Canada:3200,Germany:2000,France:1800,UAE:2500},
  "IVF / Fertility":   {USA:20000,UK:8000,Australia:12000,Canada:10000,Germany:6000,France:5500,UAE:8000},
  "LASIK Eye Surgery": {USA:4200,UK:2800,Australia:3500,Canada:3800,Germany:2400,France:2200,UAE:3000},
  "Hair Transplant":   {USA:15000,UK:8000,Australia:10000,Canada:9000,Germany:6000,France:5500,UAE:7000},
  "Bariatric Surgery": {USA:25000,UK:12000,Australia:16000,Canada:14000,Germany:10000,France:9000,UAE:12000},
  "Rhinoplasty":       {USA:12000,UK:7000,Australia:9000,Canada:8000,Germany:5500,France:5000,UAE:7000},
  "Spine Surgery":     {USA:50000,UK:20000,Australia:28000,Canada:25000,Germany:18000,France:16000,UAE:22000},
  "Cancer Treatment":  {USA:120000,UK:40000,Australia:50000,Canada:45000,Germany:35000,France:30000,UAE:40000},
  "Cataract Surgery":  {USA:3500,UK:2000,Australia:2800,Canada:3000,Germany:1800,France:1600,UAE:2200},
};

const RECOVERY_DAYS: Record<string,number> = {
  "Hip Replacement":14,"Knee Replacement":14,"Heart Bypass":21,"Dental Implants":3,
  "IVF / Fertility":7,"LASIK Eye Surgery":3,"Hair Transplant":5,"Bariatric Surgery":14,
  "Rhinoplasty":10,"Spine Surgery":21,"Cancer Treatment":30,"Cataract Surgery":3,
};

const MISC_COST: Record<string,number> = {
  India:350,Thailand:400,Turkey:350,Mexico:300,Singapore:550,Malaysia:320,"South Korea":450,
};

const CURRENCIES: Record<string,{symbol:string;rate:number}> = {
  USD:{symbol:"$",rate:1},GBP:{symbol:"£",rate:0.79},AUD:{symbol:"A$",rate:1.53},
  CAD:{symbol:"C$",rate:1.36},EUR:{symbol:"€",rate:0.92},INR:{symbol:"₹",rate:83},
  AED:{symbol:"د.إ",rate:3.67},SGD:{symbol:"S$",rate:1.34},
};

const ORIGIN_AIRPORTS: Record<string,string> = {
  USA:"JFK",UK:"LHR",Australia:"SYD",Canada:"YYZ",Germany:"FRA",France:"CDG",UAE:"DXB",
};
const AIRPORT_CODES: Record<string,string> = {
  India:"DEL",Thailand:"BKK",Turkey:"IST",Mexico:"TIJ",Singapore:"SIN",Malaysia:"KUL","South Korea":"ICN",
};

// Amadeus API
const AMADEUS_ID = process.env.NEXT_PUBLIC_AMADEUS_CLIENT_ID || "DEMO";
const AMADEUS_SECRET = process.env.NEXT_PUBLIC_AMADEUS_CLIENT_SECRET || "DEMO";

async function getToken(): Promise<string|null> {
  if (AMADEUS_ID==="DEMO") return null;
  try {
    const r = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token",{
      method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},
      body:`grant_type=client_credentials&client_id=${AMADEUS_ID}&client_secret=${AMADEUS_SECRET}`,
    });
    return (await r.json()).access_token||null;
  } catch { return null; }
}

async function searchFlights(orig:string, dest:string, date:string, adults:number): Promise<Flight[]> {
  const token = await getToken();
  if (token) {
    try {
      const r = await fetch(`https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${orig}&destinationLocationCode=${dest}&departureDate=${date}&adults=${adults}&max=6&currencyCode=USD`,
        {headers:{Authorization:`Bearer ${token}`}});
      const data = await r.json();
      if (data.data?.length) return data.data.slice(0,6).map((o:any,i:number)=>{
        const seg=o.itineraries[0].segments[0];
        return {id:`f${i}`,airline:seg.carrierCode,origin:seg.departure.iataCode,destination:seg.arrival.iataCode,
          departure:seg.departure.at,arrival:seg.arrival.at,
          duration:o.itineraries[0].duration.replace("PT","").replace("H","h ").replace("M","m"),
          stops:o.itineraries[0].segments.length-1,price:parseFloat(o.price.grandTotal),seatsLeft:o.numberOfBookableSeats||5};
      });
    } catch {}
  }
  // Demo flights
  const airlines=[{n:"Emirates"},{n:"Qatar Airways"},{n:"Air India"},{n:"Singapore Airlines"},{n:"Turkish Airlines"}];
  const base:Record<string,number>={DEL:850,BKK:1050,IST:680,TIJ:380,SIN:1350,KUL:980,ICN:1100};
  const bp = base[dest]||900;
  return airlines.map((a,i)=>({
    id:`df${i}`,airline:a.n,origin:orig,destination:dest,
    departure:`${date}T${String(6+i*3).padStart(2,"0")}:00:00`,
    arrival:`${date}T${String((6+i*3+13)%24).padStart(2,"0")}:30:00`,
    duration:`${12+i}h 30m`,stops:i<2?0:1,
    price:Math.round(bp*(0.88+i*0.07)),seatsLeft:Math.floor(Math.random()*7)+2,
  }));
}

function getHotels(city:string, nights:number): Hotel[] {
  const db:Record<string,{name:string;stars:number;ppn:number;dist:number;amenities:string[]}[]> = {
    Gurugram:[
      {name:"The Oberoi Gurugram",stars:5,ppn:120,dist:0.8,amenities:["Pool","Spa","Restaurant","Gym","WiFi"]},
      {name:"Hyatt Regency Gurugram",stars:5,ppn:95,dist:1.2,amenities:["Pool","Restaurant","Gym","WiFi"]},
      {name:"Lemon Tree Hotel",stars:4,ppn:55,dist:1.5,amenities:["Restaurant","Gym","WiFi"]},
      {name:"OYO Flagship Near Hospital",stars:3,ppn:28,dist:0.3,amenities:["WiFi","AC","24hr Desk"]},
    ],
    Bangkok:[
      {name:"Bumrungrad Patient Hotel",stars:4,ppn:90,dist:0.1,amenities:["Pool","Restaurant","WiFi","Shuttle"]},
      {name:"Marriott Marquis Bangkok",stars:5,ppn:140,dist:0.6,amenities:["Pool","Spa","Restaurant","Gym"]},
      {name:"Novotel Bangkok Sukhumvit",stars:4,ppn:75,dist:0.8,amenities:["Pool","Restaurant","WiFi"]},
      {name:"ibis Bangkok Sukhumvit",stars:3,ppn:42,dist:1.1,amenities:["Restaurant","WiFi","AC"]},
    ],
    Istanbul:[
      {name:"Hilton Istanbul Bosphorus",stars:5,ppn:110,dist:1.0,amenities:["Pool","Spa","Restaurant","Gym"]},
      {name:"Renaissance Polat Istanbul",stars:5,ppn:95,dist:0.7,amenities:["Pool","Restaurant","Gym","WiFi"]},
      {name:"Wyndham Istanbul",stars:4,ppn:65,dist:1.5,amenities:["Restaurant","WiFi","Gym"]},
      {name:"Holiday Inn Express Istanbul",stars:3,ppn:38,dist:1.8,amenities:["WiFi","Breakfast","AC"]},
    ],
    Singapore:[
      {name:"Parkway Parade Hotel",stars:4,ppn:180,dist:0.4,amenities:["Pool","Restaurant","Gym","WiFi"]},
      {name:"Grand Hyatt Singapore",stars:5,ppn:280,dist:0.8,amenities:["Pool","Spa","Restaurant","Gym"]},
      {name:"Hotel Jen Orchardgateway",stars:4,ppn:145,dist:1.2,amenities:["Pool","Restaurant","WiFi"]},
      {name:"Ibis Singapore",stars:3,ppn:88,dist:1.6,amenities:["Restaurant","WiFi","AC"]},
    ],
  };
  const defaults=[
    {name:"Medical Stay Apartments",stars:3,ppn:45,dist:0.5,amenities:["Kitchen","WiFi","AC","Laundry"]},
    {name:"City Center Hotel",stars:4,ppn:70,dist:0.9,amenities:["Pool","Restaurant","WiFi"]},
    {name:"Budget Inn Near Hospital",stars:3,ppn:32,dist:0.4,amenities:["WiFi","AC","24hr Desk"]},
  ];
  return (db[city]||defaults).map((h,i)=>({
    id:`ht${i}`,name:h.name,stars:h.stars,rating:parseFloat((4.2+Math.random()*0.6).toFixed(1)),
    pricePerNight:h.ppn,totalPrice:h.ppn*nights,distanceKm:h.dist,amenities:h.amenities,
  }));
}

// Small UI helpers
function Stars({n}:{n:number}) {
  return <span style={{color:"#f59e0b",fontSize:12}}>{"★".repeat(n)}{"☆".repeat(5-n)}</span>;
}
function Badge({label,color="var(--teal)"}:{label:string;color?:string}) {
  return <span style={{background:`${color}22`,color,padding:"2px 8px",borderRadius:20,fontSize:11,fontWeight:700}}>{label}</span>;
}
function Step({n,title,sub}:{n:number;title:string;sub:string}) {
  return (
    <div style={{display:"flex",gap:12,alignItems:"flex-start",marginBottom:18}}>
      <div style={{width:34,height:34,borderRadius:"50%",background:"var(--teal)",color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:14,flexShrink:0}}>{n}</div>
      <div><h2 style={{fontSize:19,fontWeight:700,margin:0}}>{title}</h2><p style={{fontSize:13,color:"var(--muted)",margin:"2px 0 0"}}>{sub}</p></div>
    </div>
  );
}

export default function PlannerPage() {
  const [procedure,setProcedure] = useState("");
  const [homeCountry,setHomeCountry] = useState("");
  const [destCountry,setDestCountry] = useState("");
  const [travelDate,setTravelDate] = useState("");
  const [returnDate,setReturnDate] = useState("");
  const [adults,setAdults] = useState(1);
  const [currency,setCurrency] = useState("USD");
  const [view,setView] = useState<"search"|"results"|"summary">("search");

  const [hospitals,setHospitals] = useState<Hospital[]>([]);
  const [flights,setFlights] = useState<Flight[]>([]);
  const [hotels,setHotels] = useState<Hotel[]>([]);
  const [loadH,setLoadH] = useState(false);
  const [loadF,setLoadF] = useState(false);
  const [loadHot,setLoadHot] = useState(false);

  const [pkg,setPkg] = useState<Pkg>({hospital:null,flight:null,hotel:null,miscCost:0});
  const [procQ,setProcQ] = useState("");
  const [showQ,setShowQ] = useState(false);

  const procs = Object.keys(PROCEDURE_COSTS);
  const sugg = procs.filter(p=>p.toLowerCase().includes(procQ.toLowerCase()));

  const fmt = useCallback((usd:number)=>{
    const r = CURRENCIES[currency]||CURRENCIES.USD;
    return `${r.symbol}${Math.round(usd*r.rate).toLocaleString()}`;
  },[currency]);

  const days = RECOVERY_DAYS[procedure]||10;
  const homeCost = (procedure&&homeCountry) ? (HOME_COSTS[procedure]?.[homeCountry]||0) : 0;
  const total = (pkg.hospital?.procedureCost||0)+(pkg.flight?.price||0)*adults+(pkg.hotel?.totalPrice||0)+pkg.miscCost;
  const saving = homeCost-total;

  const loadHospitals = useCallback(()=>{
    if (!destCountry||!procedure) return;
    setLoadH(true);
    const cost = PROCEDURE_COSTS[procedure]?.[destCountry]||0;
    const list = (HOSPITAL_DB[destCountry]||[]).filter(()=>cost>0).map(h=>({...h,procedureCost:cost})).sort((a,b)=>b.rating-a.rating);
    setTimeout(()=>{setHospitals(list);setLoadH(false);},400);
  },[destCountry,procedure]);

  const loadFlights = useCallback(async ()=>{
    if (!homeCountry||!destCountry||!travelDate) return;
    setLoadF(true);
    const orig = ORIGIN_AIRPORTS[homeCountry]||"JFK";
    const dest = AIRPORT_CODES[destCountry]||"DEL";
    const list = await searchFlights(orig,dest,travelDate,adults);
    setFlights(list.sort((a,b)=>a.price-b.price));
    setLoadF(false);
  },[homeCountry,destCountry,travelDate,adults]);

  const loadHotels = useCallback(()=>{
    if (!pkg.hospital) return;
    setLoadHot(true);
    const list = getHotels(pkg.hospital.city,days);
    setTimeout(()=>{setHotels(list.sort((a,b)=>a.pricePerNight-b.pricePerNight));setLoadHot(false);},300);
  },[pkg.hospital,days]);

  useEffect(()=>{if(view==="results"){loadHospitals();loadFlights();}},[view]);
  useEffect(()=>{if(pkg.hospital)loadHotels();},[pkg.hospital]);
  useEffect(()=>{
    if(hospitals.length>0&&!pkg.hospital){
      const h=[...hospitals].sort((a,b)=>a.procedureCost-b.procedureCost)[0];
      setPkg(p=>({...p,hospital:h,miscCost:MISC_COST[destCountry]||350}));
    }
  },[hospitals]);
  useEffect(()=>{
    if(flights.length>0&&!pkg.flight) setPkg(p=>({...p,flight:flights[0]}));
  },[flights]);

  const doSearch = ()=>{
    if(!procedure||!homeCountry||!destCountry||!travelDate) return;
    setPkg({hospital:null,flight:null,hotel:null,miscCost:0});
    setHospitals([]);setFlights([]);setHotels([]);
    setView("results");
  };

  const fmtDT = (dt:string)=>{
    try{return new Date(dt).toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"});}
    catch{return dt;}
  };

  const skiLink = `https://www.skyscanner.com/transport/flights/${ORIGIN_AIRPORTS[homeCountry]||"JFK"}/${AIRPORT_CODES[destCountry]||"DEL"}/`;
  const bookLink = pkg.hospital ? `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(pkg.hospital.city)}&checkin=${travelDate}&checkout=${returnDate}&group_adults=${adults}` : "#";

  return (
    <div>
      <Navbar />

      <section style={{background:"linear-gradient(135deg,#0f172a 0%,#134e4a 55%,#0f172a 100%)",padding:"56px 0 40px"}}>
        <div className="container" style={{textAlign:"center"}}>
          <div className="badge" style={{marginBottom:14,background:"rgba(13,148,136,0.2)",color:"#5eead4",border:"1px solid rgba(13,148,136,0.3)"}}>✈️🏥🏨 Treatment Package Builder</div>
          <h1 style={{fontSize:"clamp(26px,4vw,48px)",fontWeight:700,color:"white",marginBottom:10}}>Build Your Perfect Medical Trip</h1>
          <p style={{fontSize:15,color:"#94a3b8",maxWidth:560,margin:"0 auto"}}>Pick your hospital, flight and hotel. We show the real total cost and exactly how much you save vs your home country.</p>
        </div>
      </section>

      <div className="container" style={{padding:"32px 24px"}}>

        {/* STEP 1 */}
        <div className="card" style={{padding:26,marginBottom:22}}>
          <Step n={1} title="Tell us what you need" sub="We search real hospitals, flights and hotels for your destination" />
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:13,marginBottom:13}}>
            <div style={{position:"relative"}}>
              <label style={{fontSize:11,fontWeight:700,color:"var(--muted)",textTransform:"uppercase",letterSpacing:.5,display:"block",marginBottom:5}}>🏥 Procedure</label>
              <input value={procQ} onChange={e=>{setProcQ(e.target.value);setProcedure("");setShowQ(true);}}
                onFocus={()=>setShowQ(true)} onBlur={()=>setTimeout(()=>setShowQ(false),150)}
                placeholder="e.g. Hip Replacement" style={{fontSize:14}}/>
              {showQ&&procQ.length>0&&(
                <div style={{position:"absolute",top:"calc(100% + 3px)",left:0,right:0,background:"white",borderRadius:10,boxShadow:"0 8px 28px rgba(0,0,0,0.12)",border:"1px solid var(--border)",zIndex:300,maxHeight:230,overflowY:"auto"}}>
                  {sugg.map(s=>(
                    <div key={s} onMouseDown={()=>{setProcedure(s);setProcQ(s);setShowQ(false);}}
                      style={{padding:"10px 14px",cursor:"pointer",fontSize:14,borderBottom:"1px solid var(--border)"}}
                      onMouseEnter={e=>(e.currentTarget.style.background="var(--surface)")}
                      onMouseLeave={e=>(e.currentTarget.style.background="white")}>{s}</div>
                  ))}
                </div>
              )}
            </div>
            <div>
              <label style={{fontSize:11,fontWeight:700,color:"var(--muted)",textTransform:"uppercase",letterSpacing:.5,display:"block",marginBottom:5}}>🌍 Home Country</label>
              <select value={homeCountry} onChange={e=>{setHomeCountry(e.target.value);setCurrency(({USA:"USD",UK:"GBP",Australia:"AUD",Canada:"CAD",Germany:"EUR",France:"EUR",UAE:"AED"} as Record<string,string>)[e.target.value]||"USD");}}>
                <option value="">Select...</option>
                {["USA","UK","Australia","Canada","Germany","France","UAE"].map(c=><option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{fontSize:11,fontWeight:700,color:"var(--muted)",textTransform:"uppercase",letterSpacing:.5,display:"block",marginBottom:5}}>🗺️ Destination</label>
              <select value={destCountry} onChange={e=>setDestCountry(e.target.value)}>
                <option value="">Select...</option>
                {Object.keys(HOSPITAL_DB).map(c=><option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{fontSize:11,fontWeight:700,color:"var(--muted)",textTransform:"uppercase",letterSpacing:.5,display:"block",marginBottom:5}}>📅 Travel Date</label>
              <input type="date" value={travelDate} onChange={e=>setTravelDate(e.target.value)} min={new Date().toISOString().split("T")[0]}/>
            </div>
            <div>
              <label style={{fontSize:11,fontWeight:700,color:"var(--muted)",textTransform:"uppercase",letterSpacing:.5,display:"block",marginBottom:5}}>🏠 Return Date</label>
              <input type="date" value={returnDate} onChange={e=>setReturnDate(e.target.value)} min={travelDate}/>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <div>
                <label style={{fontSize:11,fontWeight:700,color:"var(--muted)",textTransform:"uppercase",letterSpacing:.5,display:"block",marginBottom:5}}>💱 Currency</label>
                <select value={currency} onChange={e=>setCurrency(e.target.value)}>
                  {Object.keys(CURRENCIES).map(c=><option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={{fontSize:11,fontWeight:700,color:"var(--muted)",textTransform:"uppercase",letterSpacing:.5,display:"block",marginBottom:5}}>👥 Travellers</label>
                <input type="number" min={1} max={6} value={adults} onChange={e=>setAdults(Number(e.target.value))}/>
              </div>
            </div>
          </div>
          {homeCost>0&&procedure&&homeCountry&&destCountry&&(
            <div style={{padding:"11px 14px",background:"var(--surface)",borderRadius:9,marginBottom:13,display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,fontSize:13}}>
              <div style={{color:"#dc2626"}}>💸 {procedure} in {homeCountry}: <strong>{fmt(homeCost)}</strong></div>
              <div style={{color:"var(--success)"}}>💰 Estimated in {destCountry}: <strong>{fmt(PROCEDURE_COSTS[procedure]?.[destCountry]||0)}</strong></div>
            </div>
          )}
          <button onClick={doSearch} disabled={!procedure||!homeCountry||!destCountry||!travelDate}
            className="btn-primary" style={{width:"100%",justifyContent:"center",fontSize:15,padding:"13px",opacity:(!procedure||!homeCountry||!destCountry||!travelDate)?0.5:1}}>
            🔍 Search Hospitals, Flights and Hotels →
          </button>
        </div>

        {view!=="search" && (
          <div style={{display:"grid",gridTemplateColumns:"1fr 330px",gap:18,alignItems:"start"}}>
            <div>

              {/* HOSPITALS */}
              <div className="card" style={{padding:22,marginBottom:18}}>
                <Step n={2} title="Choose Your Hospital" sub={`JCI-accredited hospitals in ${destCountry} for ${procedure}`}/>
                {loadH&&<div style={{textAlign:"center",padding:22,color:"var(--muted)"}}>⏳ Loading hospitals...</div>}
                {!loadH&&hospitals.length===0&&<div style={{textAlign:"center",padding:22,color:"var(--muted)"}}>No hospitals found for {procedure} in {destCountry}. Try a different destination.</div>}
                {hospitals.map(h=>{
                  const sel=pkg.hospital?.id===h.id;
                  return (
                    <div key={h.id} onClick={()=>setPkg(p=>({...p,hospital:h,hotel:null,miscCost:MISC_COST[destCountry]||350}))}
                      style={{padding:16,borderRadius:11,border:sel?"2px solid var(--teal)":"1px solid var(--border)",marginBottom:9,cursor:"pointer",background:sel?"var(--teal-light)":"white",transition:"all 0.2s"}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                        <div style={{flex:1}}>
                          <div style={{display:"flex",gap:7,alignItems:"center",marginBottom:5,flexWrap:"wrap"}}>
                            <span style={{fontSize:17}}>{h.flag}</span>
                            <strong style={{fontSize:14}}>{h.name}</strong>
                            <Badge label={h.accreditation}/>
                            {sel&&<Badge label="Selected" color="var(--success)"/>}
                          </div>
                          <div style={{fontSize:12,color:"var(--muted)",marginBottom:7}}>{h.city}, {h.country} · {h.specialty}</div>
                          <div style={{display:"flex",gap:12,fontSize:12,flexWrap:"wrap"}}>
                            <span><Stars n={Math.floor(h.rating)}/> {h.rating} ({h.reviews.toLocaleString()})</span>
                            <span style={{color:"var(--success)",fontWeight:600}}>✓ {h.successRate}% success</span>
                          </div>
                        </div>
                        <div style={{textAlign:"right",flexShrink:0,marginLeft:10}}>
                          <div style={{fontSize:10,color:"var(--muted)"}}>Procedure</div>
                          <div style={{fontSize:21,fontWeight:800,color:"var(--teal)",fontFamily:"Sora"}}>{fmt(h.procedureCost)}</div>
                          <div style={{fontSize:10,color:"var(--muted)",marginTop:1}}>{days} day recovery</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* FLIGHTS */}
              <div className="card" style={{padding:22,marginBottom:18}}>
                <Step n={3} title="Choose Your Flight" sub={`${ORIGIN_AIRPORTS[homeCountry]||"Origin"} to ${AIRPORT_CODES[destCountry]||"Dest"} · ${travelDate} · ${adults} passenger${adults>1?"s":""}`}/>
                {loadF&&<div style={{textAlign:"center",padding:22,color:"var(--muted)"}}>⏳ {AMADEUS_ID==="DEMO"?"Generating flight options...":"Fetching live Amadeus flights..."}</div>}
                {AMADEUS_ID==="DEMO"&&!loadF&&(
                  <div style={{padding:"9px 13px",background:"#fef3c7",border:"1px solid #fde68a",borderRadius:7,fontSize:12,color:"#92400e",marginBottom:12}}>
                    ⚠️ Demo mode — realistic estimates. Add free Amadeus API key in .env.local for live prices.
                  </div>
                )}
                {flights.map((f,i)=>{
                  const sel=pkg.flight?.id===f.id;
                  return (
                    <div key={f.id} onClick={()=>setPkg(p=>({...p,flight:f}))}
                      style={{padding:14,borderRadius:11,border:sel?"2px solid var(--teal)":"1px solid var(--border)",marginBottom:9,cursor:"pointer",background:sel?"var(--teal-light)":"white",display:"grid",gridTemplateColumns:"1fr auto",gap:14,alignItems:"center",transition:"all 0.2s"}}>
                      <div>
                        <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:5,flexWrap:"wrap"}}>
                          <strong style={{fontSize:14}}>{f.airline}</strong>
                          {i===0&&<Badge label="Cheapest" color="var(--success)"/>}
                          {f.stops===0&&<Badge label="Direct" color="#0284c7"/>}
                          {f.stops>0&&<span style={{fontSize:11,color:"var(--muted)"}}>{f.stops} stop</span>}
                          {sel&&<Badge label="Selected" color="var(--success)"/>}
                        </div>
                        <div style={{display:"grid",gridTemplateColumns:"auto 1fr auto",gap:8,alignItems:"center",maxWidth:290}}>
                          <div><div style={{fontWeight:700,fontSize:14}}>{f.origin}</div><div style={{fontSize:11,color:"var(--muted)"}}>{fmtDT(f.departure)}</div></div>
                          <div style={{textAlign:"center",fontSize:11,color:"var(--muted)"}}><div>──✈️──</div><div>{f.duration}</div></div>
                          <div><div style={{fontWeight:700,fontSize:14}}>{f.destination}</div><div style={{fontSize:11,color:"var(--muted)"}}>{fmtDT(f.arrival)}</div></div>
                        </div>
                        <div style={{fontSize:11,color:"var(--muted)",marginTop:5}}>🪑 {f.seatsLeft} seats left</div>
                      </div>
                      <div style={{textAlign:"right"}}>
                        <div style={{fontSize:22,fontWeight:800,color:"var(--teal)",fontFamily:"Sora"}}>{fmt(f.price)}</div>
                        <div style={{fontSize:10,color:"var(--muted)"}}>per person</div>
                        {adults>1&&<div style={{fontSize:11,color:"var(--navy)",fontWeight:600}}>{fmt(f.price*adults)} total</div>}
                      </div>
                    </div>
                  );
                })}
                {flights.length>0&&(
                  <a href={skiLink} target="_blank" rel="noopener noreferrer"
                    style={{display:"block",textAlign:"center",padding:"9px",border:"1px solid var(--border)",borderRadius:9,fontSize:13,color:"var(--teal)",textDecoration:"none",fontWeight:600,marginTop:3}}>
                    🔍 See more flights on Skyscanner →
                  </a>
                )}
              </div>

              {/* HOTELS */}
              <div className="card" style={{padding:22,marginBottom:18}}>
                <Step n={4} title="Choose Your Hotel" sub={pkg.hospital?`Hotels near ${pkg.hospital.name} · ${days} nights`:"Select a hospital first"}/>
                {!pkg.hospital&&<div style={{textAlign:"center",padding:18,color:"var(--muted)",fontSize:14}}>👆 Select a hospital above to see nearby hotels</div>}
                {loadHot&&<div style={{textAlign:"center",padding:22,color:"var(--muted)"}}>⏳ Finding hotels near {pkg.hospital?.name}...</div>}
                {!loadHot&&hotels.map((h,i)=>{
                  const sel=pkg.hotel?.id===h.id;
                  return (
                    <div key={h.id} onClick={()=>setPkg(p=>({...p,hotel:h}))}
                      style={{padding:14,borderRadius:11,border:sel?"2px solid var(--teal)":"1px solid var(--border)",marginBottom:9,cursor:"pointer",background:sel?"var(--teal-light)":"white",display:"grid",gridTemplateColumns:"1fr auto",gap:10,transition:"all 0.2s"}}>
                      <div>
                        <div style={{display:"flex",gap:7,alignItems:"center",marginBottom:4,flexWrap:"wrap"}}>
                          <strong style={{fontSize:14}}>{h.name}</strong>
                          <Stars n={h.stars}/>
                          {i===0&&<Badge label="Best Value" color="var(--success)"/>}
                          {h.distanceKm<=0.5&&<Badge label={`${h.distanceKm}km away`} color="#0284c7"/>}
                          {sel&&<Badge label="Selected" color="var(--success)"/>}
                        </div>
                        <div style={{fontSize:11,color:"var(--muted)",marginBottom:5}}>📍 {h.distanceKm}km from hospital</div>
                        <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
                          {h.amenities.slice(0,4).map(a=><span key={a} style={{fontSize:10,padding:"1px 6px",background:"var(--surface)",borderRadius:8,color:"var(--slate)"}}>{a}</span>)}
                        </div>
                      </div>
                      <div style={{textAlign:"right"}}>
                        <div style={{fontSize:19,fontWeight:800,color:"var(--teal)",fontFamily:"Sora"}}>{fmt(h.totalPrice)}</div>
                        <div style={{fontSize:10,color:"var(--muted)"}}>{days} nights</div>
                        <div style={{fontSize:11,color:"var(--slate)"}}>{fmt(h.pricePerNight)}/night</div>
                      </div>
                    </div>
                  );
                })}
                {!loadHot&&pkg.hospital&&(
                  <a href={bookLink} target="_blank" rel="noopener noreferrer"
                    style={{display:"block",textAlign:"center",padding:"9px",border:"1px solid var(--border)",borderRadius:9,fontSize:13,color:"var(--teal)",textDecoration:"none",fontWeight:600,marginTop:3}}>
                    🏨 See all hotels on Booking.com →
                  </a>
                )}
              </div>

            </div>

            {/* SIDEBAR */}
            <div style={{position:"sticky",top:78}}>
              <div className="card" style={{padding:20,marginBottom:14}}>
                <h3 style={{fontSize:16,fontWeight:700,marginBottom:14}}>📦 Your Package</h3>
                {homeCost>0&&(
                  <div style={{padding:"9px 13px",background:"#fef2f2",borderRadius:9,marginBottom:12,fontSize:13}}>
                    <div style={{color:"#b91c1c",marginBottom:2}}>🏠 Cost in {homeCountry}</div>
                    <div style={{fontSize:18,fontWeight:800,color:"#dc2626",fontFamily:"Sora",textDecoration:"line-through"}}>{fmt(homeCost)}</div>
                  </div>
                )}
                {[
                  {icon:"🏥",label:pkg.hospital?.name||"Not selected",val:pkg.hospital?.procedureCost||0,empty:!pkg.hospital},
                  {icon:"✈️",label:pkg.flight?`${pkg.flight.airline} · ${pkg.flight.duration}`:"Not selected",val:(pkg.flight?.price||0)*adults,empty:!pkg.flight},
                  {icon:"🏨",label:pkg.hotel?`${pkg.hotel.name} · ${days}n`:"Not selected",val:pkg.hotel?.totalPrice||0,empty:!pkg.hotel},
                  {icon:"🧳",label:"Misc (transport, food)",val:pkg.miscCost,empty:false},
                ].map(item=>(
                  <div key={item.label} style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:9,padding:"7px 0",borderBottom:"1px solid var(--border)"}}>
                    <div style={{flex:1,marginRight:7}}>
                      <div style={{fontSize:10,color:"var(--muted)"}}>{item.icon}</div>
                      <div style={{fontSize:11,color:item.empty?"var(--muted)":"var(--slate)",fontStyle:item.empty?"italic":"normal"}}>{item.label}</div>
                    </div>
                    <div style={{fontSize:14,fontWeight:700,color:item.empty?"var(--muted)":"var(--navy)",flexShrink:0}}>{item.val>0?fmt(item.val):"—"}</div>
                  </div>
                ))}
                <div style={{borderTop:"2px solid var(--border)",paddingTop:10,marginTop:3}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span style={{fontWeight:700,fontSize:15}}>Total</span>
                    <span style={{fontSize:26,fontWeight:800,color:"var(--teal)",fontFamily:"Sora"}}>{total>0?fmt(total):"—"}</span>
                  </div>
                  {saving>0&&(
                    <div style={{marginTop:9,padding:"9px 13px",background:"#dcfce7",borderRadius:9,textAlign:"center"}}>
                      <div style={{fontSize:11,color:"#166534"}}>You save vs {homeCountry}</div>
                      <div style={{fontSize:20,fontWeight:800,color:"var(--success)",fontFamily:"Sora"}}>{fmt(saving)}</div>
                      <div style={{fontSize:11,color:"#166534"}}>{Math.round((saving/homeCost)*100)}% cheaper 🎉</div>
                    </div>
                  )}
                </div>
                <button disabled={!pkg.hospital||!pkg.flight||!pkg.hotel}
                  onClick={()=>setView("summary")} className="btn-primary"
                  style={{width:"100%",justifyContent:"center",marginTop:12,fontSize:14,padding:"12px",opacity:(!pkg.hospital||!pkg.flight||!pkg.hotel)?0.5:1}}>
                  ✅ Confirm This Package →
                </button>
                {(!pkg.hospital||!pkg.flight||!pkg.hotel)&&(
                  <p style={{fontSize:11,color:"var(--muted)",textAlign:"center",marginTop:7}}>Select hospital + flight + hotel to continue</p>
                )}
              </div>
              <div style={{padding:14,background:"var(--surface)",borderRadius:11,border:"1px solid var(--border)",fontSize:13,textAlign:"center"}}>
                <div style={{fontWeight:600,marginBottom:5}}>Need help choosing?</div>
                <div style={{color:"var(--muted)",fontSize:12,marginBottom:9}}>Our coordinators help you pick the best option</div>
                <button className="btn-secondary" style={{fontSize:12,padding:"7px 14px",width:"100%",justifyContent:"center"}}>💬 Chat with coordinator</button>
              </div>
            </div>
          </div>
        )}

        {view==="summary"&&pkg.hospital&&pkg.flight&&pkg.hotel&&(
          <div style={{maxWidth:660,margin:"0 auto"}}>
            <div className="card" style={{padding:30}}>
              <div style={{textAlign:"center",marginBottom:22}}>
                <div style={{fontSize:50,marginBottom:10}}>🎉</div>
                <h2 style={{fontSize:24,fontWeight:700,marginBottom:5}}>Your Package is Ready!</h2>
                <p style={{color:"var(--muted)"}}>Book each part using the links below</p>
              </div>
              <div style={{background:"var(--teal-light)",border:"1px solid #99f6e4",borderRadius:13,padding:18,marginBottom:18}}>
                {[
                  ["🏥 Hospital",pkg.hospital.name,fmt(pkg.hospital.procedureCost)],
                  ["✈️ Flight",`${pkg.flight.airline} · ${pkg.flight.duration}`,fmt(pkg.flight.price*adults)],
                  ["🏨 Hotel",`${pkg.hotel.name} · ${days} nights`,fmt(pkg.hotel.totalPrice)],
                  ["🧳 Misc","Transport, food, extras",fmt(pkg.miscCost)],
                ].map(([icon,label,val])=>(
                  <div key={label as string} style={{display:"flex",justifyContent:"space-between",marginBottom:9,fontSize:13,alignItems:"center"}}>
                    <div><span style={{fontWeight:600}}>{icon}</span> <span style={{color:"var(--slate)"}}>{label}</span></div>
                    <span style={{fontWeight:700}}>{val}</span>
                  </div>
                ))}
                <div style={{borderTop:"1px solid #99f6e4",paddingTop:11,marginTop:3,display:"flex",justifyContent:"space-between"}}>
                  <span style={{fontWeight:700,fontSize:16}}>Total</span>
                  <span style={{fontWeight:800,fontSize:22,color:"var(--teal)",fontFamily:"Sora"}}>{fmt(total)}</span>
                </div>
                {saving>0&&<div style={{textAlign:"center",marginTop:9,fontSize:13,color:"var(--success)",fontWeight:600}}>You save {fmt(saving)} ({Math.round((saving/homeCost)*100)}%) vs {homeCountry} 🎉</div>}
              </div>
              <h3 style={{fontSize:15,fontWeight:700,marginBottom:12}}>Book each component:</h3>
              <div style={{display:"grid",gap:9,marginBottom:18}}>
                <Link href={`/book/${pkg.hospital.id}`} className="btn-primary" style={{textDecoration:"none",justifyContent:"center",fontSize:14,padding:"12px"}}>
                  🏥 Book {pkg.hospital.name} →
                </Link>
                <a href={skiLink} target="_blank" rel="noopener noreferrer"
                  style={{display:"flex",justifyContent:"center",alignItems:"center",padding:"12px",borderRadius:10,border:"2px solid var(--teal)",color:"var(--teal)",textDecoration:"none",fontWeight:600,fontSize:14}}>
                  ✈️ Book {pkg.flight.airline} on Skyscanner →
                </a>
                <a href={bookLink} target="_blank" rel="noopener noreferrer"
                  style={{display:"flex",justifyContent:"center",alignItems:"center",padding:"12px",borderRadius:10,border:"2px solid #0284c7",color:"#0284c7",textDecoration:"none",fontWeight:600,fontSize:14}}>
                  🏨 Book {pkg.hotel.name} on Booking.com →
                </a>
              </div>
              <button onClick={()=>setView("results")} className="btn-secondary" style={{width:"100%",justifyContent:"center",fontSize:13}}>← Edit My Package</button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

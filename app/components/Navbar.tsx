"use client";
import Link from "next/link";
export default function Navbar() {
  return (
    <nav style={{background:"white",borderBottom:"1px solid var(--border)",position:"sticky",top:0,zIndex:100,boxShadow:"0 2px 12px rgba(0,0,0,0.04)"}}>
      <div className="container" style={{display:"flex",alignItems:"center",justifyContent:"space-between",height:66}}>
        <Link href="/" style={{textDecoration:"none",display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:34,height:34,background:"var(--teal)",borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <span style={{color:"white",fontSize:17}}>✚</span>
          </div>
          <span style={{fontFamily:"Sora",fontWeight:700,fontSize:19,color:"var(--navy)"}}>Treat<span style={{color:"var(--teal)"}}>Planner</span></span>
        </Link>
        <div style={{display:"flex",gap:26,alignItems:"center"}}>
          {[["How It Works","/how-it-works"],["Hospitals","/procedures"],["Calculator","/calculator"],["About","/about"]].map(([label,href])=>(
            <Link key={href} href={href} style={{textDecoration:"none",color:"var(--slate)",fontWeight:500,fontSize:14}}
              onMouseEnter={e=>(e.currentTarget.style.color="var(--teal)")}
              onMouseLeave={e=>(e.currentTarget.style.color="var(--slate)")}>{label}</Link>
          ))}
        </div>
        <div style={{display:"flex",gap:10,alignItems:"center"}}>
          <Link href="/login" className="btn-secondary" style={{padding:"8px 18px",fontSize:13}}>Login</Link>
          <Link href="/planner" className="btn-primary" style={{padding:"8px 20px",fontSize:14}}>✈️🏥 Build My Package</Link>
        </div>
      </div>
    </nav>
  );
}

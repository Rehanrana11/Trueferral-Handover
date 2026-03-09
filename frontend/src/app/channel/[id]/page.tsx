"use client";
import {use,useState} from "react";
const S=`
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  body{background:#0a0a0f;color:#e8e8f0;font-family:'Syne',sans-serif;-webkit-font-smoothing:antialiased;}
  .page{min-height:100vh;display:flex;flex-direction:column;align-items:center;padding:32px 16px 80px;}
  .shell{width:100%;max-width:520px;}
  .topbar{display:flex;align-items:center;justify-content:space-between;margin-bottom:28px;}
  .wordmark{display:flex;align-items:center;gap:10px;}
  .wm{width:32px;height:32px;border-radius:8px;background:linear-gradient(135deg,#6c6cff,#9b5de5);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:white;}
  .wt{font-size:15px;font-weight:700;}
  .wt span{color:#6c6cff;}
  .badge{font-size:11px;font-family:'DM Mono',monospace;color:#6b6b80;background:#111118;border:1px solid #1e1e2e;border-radius:6px;padding:4px 10px;}
  .card{background:#16161f;border:1px solid #1e1e2e;border-radius:14px;padding:24px;margin-bottom:12px;}
  .lbl{font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:#6b6b80;margin-bottom:4px;}
  .ttl{font-size:20px;font-weight:800;letter-spacing:-0.4px;margin-bottom:8px;}
  .sub{font-size:13px;color:#6b6b80;line-height:1.6;}
  .grid{display:flex;flex-direction:column;gap:10px;margin-bottom:16px;}
  .ch{display:flex;align-items:center;gap:14px;padding:16px;background:#111118;border:2px solid #1e1e2e;border-radius:12px;cursor:pointer;transition:all 0.15s;text-align:left;width:100%;}
  .ch:hover{border-color:#6c6cff44;}
  .ch.sel{border-color:#6c6cff;background:#6c6cff33;}
  .ch.lk{border-color:#00e5a0;background:#00e5a022;cursor:default;}
  .ci{font-size:24px;flex-shrink:0;}
  .cn{font-size:14px;font-weight:700;color:#e8e8f0;}
  .cd{font-size:12px;color:#6b6b80;margin-top:2px;}
  .clb{margin-left:auto;font-size:10px;font-weight:700;letter-spacing:0.8px;text-transform:uppercase;color:#00e5a0;background:#00e5a022;border:1px solid #00e5a033;border-radius:4px;padding:3px 8px;flex-shrink:0;}
  .btn{width:100%;padding:14px;border-radius:10px;border:none;background:#6c6cff;color:white;font-family:'Syne',sans-serif;font-size:14px;font-weight:700;cursor:pointer;transition:background 0.15s;}
  .btn:hover:not(:disabled){background:#8484ff;}
  .btn:disabled{opacity:0.4;cursor:not-allowed;}
  .hr{font-size:11px;font-family:'DM Mono',monospace;color:#6b6b80;background:#111118;border:1px solid #1e1e2e;border-radius:6px;padding:8px 12px;margin-top:12px;word-break:break-all;}
  .cons{font-size:11px;color:#6b6b80;text-align:center;margin-top:10px;line-height:1.5;}
`;
const CHS=[
  {id:"email",   icon:"✉️", name:"Email",    desc:"Direct email — most permanent record"},
  {id:"calendar",icon:"📅", name:"Calendar", desc:"Google Cal / Calendly invite"},
  {id:"linkedin",icon:"💼", name:"LinkedIn", desc:"LinkedIn messages — professional context"},
  {id:"phone",   icon:"📱", name:"Phone",    desc:"Direct number — high-trust channel"},
];
interface P{params:Promise<{id:string}>}
export default function ChannelHandshakePage({params}:P){
  const {id}=use(params);
  const [sel,setSel]=useState<string|null>(null);
  const [locked,setLocked]=useState<string|null>(null);
  const [ts]=useState(()=>new Date().toISOString());
  return(<><style>{S}</style><main className="page"><div className="shell">
    <div className="topbar"><div className="wordmark"><div className="wm">TF</div><div className="wt">True<span>ferral</span></div></div><div className="badge">channel handshake</div></div>
    <div className="card"><div className="lbl">Channel handshake</div><div className="ttl">{locked?"Channel locked":"Lock in your preferred channel"}</div><div className="sub">{locked?"Both parties agreed on the communication channel. Recorded in the immutable timeline.":"One click. One channel. No ambiguity about how to reach each other."}</div></div>
    <div className="card"><div className="lbl">Select channel · intro/{id}</div>
      <div className="grid">{CHS.map(c=><button key={c.id} className={"ch"+(locked===c.id?" lk":sel===c.id&&!locked?" sel":"")} onClick={()=>!locked&&setSel(c.id)} disabled={!!locked&&locked!==c.id} style={locked&&locked!==c.id?{opacity:0.35}:{}}><div className="ci">{c.icon}</div><div><div className="cn">{c.name}</div><div className="cd">{c.desc}</div></div>{locked===c.id&&<div className="clb">Locked</div>}</button>)}</div>
      {!locked&&<><button className="btn" disabled={!sel} onClick={()=>setLocked(sel)}>Lock this channel — one click, permanent</button><div className="cons">Cannot be changed after confirmation. Sealed in the hash chain.</div></>}
      {locked&&<div className="hr">channel-locked · {ts} · intro/{id} · {CHS.find(c=>c.id===locked)?.name}</div>}
    </div>
  </div></main></>);
}

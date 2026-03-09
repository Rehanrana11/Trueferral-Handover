"use client";
import { use, useState } from "react";
const S = `
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
  .parties{display:flex;align-items:center;gap:12px;padding:16px;background:#111118;border:1px solid #1e1e2e;border-radius:10px;margin-bottom:16px;flex-wrap:wrap;}
  .pn{font-size:13px;font-weight:700;}
  .pr{font-size:11px;color:#6b6b80;font-family:'DM Mono',monospace;}
  .arr{color:#6c6cff;font-size:18px;}
  .opts{display:flex;flex-direction:column;gap:8px;margin-bottom:16px;}
  .opt{display:flex;align-items:center;gap:12px;padding:14px 16px;background:#111118;border:1px solid #1e1e2e;border-radius:10px;cursor:pointer;transition:border-color 0.15s;text-align:left;width:100%;}
  .opt:hover{border-color:#6c6cff44;}
  .opt.sel{border-color:#6c6cff;background:#6c6cff33;}
  .oi{font-size:18px;flex-shrink:0;}
  .ot{font-size:13px;font-weight:600;color:#e8e8f0;}
  .od{font-size:11px;color:#6b6b80;margin-top:2px;}
  .wb{display:flex;align-items:center;gap:10px;background:#111118;border:1px solid #1e1e2e;border-radius:10px;padding:14px;margin-bottom:12px;}
  .wd{width:8px;height:8px;border-radius:50%;background:#ffd166;animation:pulse 2s infinite;flex-shrink:0;}
  @keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.4;}}
  .wt2{font-size:12px;color:#6b6b80;line-height:1.5;}
  .wt2 strong{color:#ffd166;}
  .lb{display:flex;align-items:flex-start;gap:12px;background:#00e5a022;border:1px solid #00e5a033;border-radius:10px;padding:16px;margin-bottom:12px;}
  .li{font-size:20px;flex-shrink:0;}
  .lt{font-size:13px;color:#e8e8f0;line-height:1.6;}
  .lt strong{color:#00e5a0;}
  .hr{font-size:11px;font-family:'DM Mono',monospace;color:#6b6b80;background:#111118;border:1px solid #1e1e2e;border-radius:6px;padding:8px 12px;margin-bottom:12px;word-break:break-all;}
  .btn{width:100%;padding:14px;border-radius:10px;border:none;background:#6c6cff;color:white;font-family:'Syne',sans-serif;font-size:14px;font-weight:700;cursor:pointer;transition:background 0.15s;}
  .btn:hover:not(:disabled){background:#8484ff;}
  .btn:disabled{opacity:0.4;cursor:not-allowed;}
  .cons{font-size:11px;color:#6b6b80;text-align:center;margin-top:10px;line-height:1.5;}
  .cons strong{color:#e8e8f0;}
`;
const OPTS = [
  {id:"call",  icon:"📞",label:"Schedule a call",     desc:"Both parties agree to meet within 14 days"},
  {id:"email", icon:"✉️", label:"Async email exchange",desc:"Counterparty will reach out within 7 days"},
  {id:"meet",  icon:"🤝",label:"In-person meeting",   desc:"To be scheduled via preferred channel"},
  {id:"doc",   icon:"📄",label:"Document review",     desc:"Counterparty reviews materials first"},
];
type Stage="select"|"waiting"|"locked";
interface P{params:Promise<{id:string}>}
export default function MutualContinuationPage({params}:P){
  const {id}=use(params);
  const [sel,setSel]=useState<string|null>(null);
  const [stage,setStage]=useState<Stage>("select");
  const [ts]=useState(()=>new Date().toISOString());
  function lock(){if(!sel)return;setStage("waiting");setTimeout(()=>setStage("locked"),1500);}
  const opt=OPTS.find(o=>o.id===sel);
  return(<><style>{S}</style><main className="page"><div className="shell">
    <div className="topbar"><div className="wordmark"><div className="wm">TF</div><div className="wt">True<span>ferral</span></div></div><div className="badge">continuation</div></div>
    <div className="card"><div className="lbl">Mutual continuation</div><div className="ttl">Agree on what happens next</div><div className="sub">Both parties must confirm the same next step. Once agreed, this is added to the immutable timeline.</div></div>
    <div className="card"><div className="lbl">Introduction</div><div className="parties"><div><div className="pn">Sarah Chen</div><div className="pr">introducer</div></div><div className="arr">→</div><div><div className="pn">Jordan Lee</div><div className="pr">counterparty</div></div><div className="arr">→</div><div><div className="pn">Alex Johnson</div><div className="pr">target</div></div></div><div className="hr">intro/{id} · snp_a4f8c · seq #12</div></div>
    {stage==="select"&&<div className="card"><div className="lbl">Select next step</div><div className="opts">{OPTS.map(o=><button key={o.id} className={"opt"+(sel===o.id?" sel":"")} onClick={()=>setSel(o.id)}><div className="oi">{o.icon}</div><div><div className="ot">{o.label}</div><div className="od">{o.desc}</div></div></button>)}</div><button className="btn" disabled={!sel} onClick={lock}>Propose this next step</button><div className="cons">Sent to <strong>Jordan Lee</strong> for confirmation.</div></div>}
    {stage==="waiting"&&<div className="wb"><div className="wd"/><div className="wt2"><strong>Awaiting counterparty.</strong> Jordan Lee must confirm <strong>{opt?.label}</strong>.</div></div>}
    {stage==="locked"&&<><div className="lb"><div className="li">🔒</div><div className="lt"><strong>Next step locked.</strong> Both parties confirmed: <strong>{opt?.label}</strong>.</div></div><div className="hr">{ts} · seq #13 · both-party-confirmed</div></>}
  </div></main></>);
}

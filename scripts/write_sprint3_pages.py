import os

base = r"E:\Trueferral\frontend\src\app"

pages = {}

pages["continuation/[id]/page.tsx"] = '''\
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
'''

pages["channel/[id]/page.tsx"] = '''\
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
'''

pages["nextstep/[id]/page.tsx"] = '''\
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
  .lbl{font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:#6b6b80;margin-bottom:6px;}
  .ttl{font-size:20px;font-weight:800;letter-spacing:-0.4px;margin-bottom:8px;}
  .sub{font-size:13px;color:#6b6b80;line-height:1.6;}
  .ig{margin-bottom:14px;}
  .il{font-size:11px;font-weight:700;letter-spacing:0.8px;text-transform:uppercase;color:#6b6b80;margin-bottom:6px;display:block;}
  .inp{width:100%;padding:12px 14px;background:#111118;border:1px solid #1e1e2e;border-radius:8px;color:#e8e8f0;font-family:'Syne',sans-serif;font-size:13px;outline:none;transition:border-color 0.15s;}
  .inp:focus{border-color:#6c6cff;}
  .inp::placeholder{color:#6b6b80;}
  textarea.inp{resize:vertical;min-height:80px;}
  .cbox{background:#ffd16622;border:1px solid #ffd16633;border-radius:10px;padding:14px 16px;margin-bottom:16px;}
  .clbl{font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#ffd166;margin-bottom:6px;}
  .ctxt{font-size:12px;color:#e8e8f0;line-height:1.6;}
  .lcard{background:#00e5a022;border:1px solid #00e5a033;border-radius:14px;padding:24px;margin-bottom:12px;}
  .la{font-size:18px;font-weight:800;letter-spacing:-0.3px;margin-bottom:8px;}
  .ld{font-size:13px;color:#6b6b80;margin-bottom:12px;}
  .hr{font-size:11px;font-family:'DM Mono',monospace;color:#6b6b80;background:#111118;border:1px solid #1e1e2e;border-radius:6px;padding:8px 12px;word-break:break-all;}
  .sb{display:inline-block;font-size:10px;font-weight:700;letter-spacing:0.8px;text-transform:uppercase;color:#00e5a0;border:1px solid #00e5a033;background:#00e5a022;border-radius:4px;padding:2px 8px;margin-bottom:10px;}
  .btn{width:100%;padding:14px;border-radius:10px;border:none;background:#6c6cff;color:white;font-family:'Syne',sans-serif;font-size:14px;font-weight:700;cursor:pointer;transition:background 0.15s;margin-bottom:8px;}
  .btn:hover:not(:disabled){background:#8484ff;}
  .btn:disabled{opacity:0.4;cursor:not-allowed;}
  .micro{font-size:11px;color:#6b6b80;text-align:center;line-height:1.5;}
`;
interface P{params:Promise<{id:string}>}
export default function NextStepLockPage({params}:P){
  const {id}=use(params);
  const [action,setAction]=useState("");
  const [deadline,setDeadline]=useState("");
  const [notes,setNotes]=useState("");
  const [locked,setLocked]=useState(false);
  const [ts]=useState(()=>new Date().toISOString());
  const ok=action.trim().length>0&&deadline.length>0;
  return(<><style>{S}</style><main className="page"><div className="shell">
    <div className="topbar"><div className="wordmark"><div className="wm">TF</div><div className="wt">True<span>ferral</span></div></div><div className="badge">next-step lock</div></div>
    <div className="card"><div className="lbl">Next-step lock · intro/{id}</div><div className="ttl">{locked?"Next step is frozen":"Freeze the agreed next action"}</div><div className="sub">{locked?"This commitment is sealed in the hash chain. Cannot be edited or deleted.":"Write the exact action. Set the deadline. Once locked, this is immutable."}</div></div>
    {!locked?<div className="card">
      <div className="ig"><label className="il">Next action</label><input className="inp" placeholder="e.g. Jordan sends intro deck to Alex by Friday" value={action} onChange={e=>setAction(e.target.value)}/></div>
      <div className="ig"><label className="il">Deadline</label><input type="date" className="inp" value={deadline} onChange={e=>setDeadline(e.target.value)}/></div>
      <div className="ig"><label className="il">Notes (optional)</label><textarea className="inp" placeholder="Any context both parties should know" value={notes} onChange={e=>setNotes(e.target.value)}/></div>
      {ok&&<div className="cbox"><div className="clbl">Before you lock</div><div className="ctxt"><strong>"{action}"</strong> with deadline <strong>{deadline}</strong> will be permanently sealed.</div></div>}
      <button className="btn" disabled={!ok} onClick={()=>setLocked(true)}>Lock this next step — irreversible</button>
      <div className="micro">Both parties will receive a timestamped receipt of this lock.</div>
    </div>:<div className="lcard"><div className="sb">seq #14 · immutable</div><div className="la">{action}</div><div className="ld">Deadline: {deadline}{notes&&" · "+notes}</div><div className="hr">locked · {ts} · intro/{id} · next-step-sealed</div></div>}
  </div></main></>);
}
'''

pages["context/[id]/page.tsx"] = '''\
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
  .card{background:#16161f;border:1px solid #1e1e2e;border-radius:14px;padding:20px;margin-bottom:12px;}
  .lbl{font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:#6b6b80;margin-bottom:4px;}
  .sub{font-size:13px;color:#6b6b80;line-height:1.6;}
  .ph{display:flex;align-items:center;gap:14px;margin-bottom:16px;}
  .av{width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,#6c6cff66,#9b5de566);display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:800;flex-shrink:0;border:1px solid #6c6cff33;}
  .pn{font-size:17px;font-weight:800;}
  .pr{font-size:12px;color:#6b6b80;font-family:'DM Mono',monospace;}
  .tr{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px;}
  .tag{font-size:11px;font-family:'DM Mono',monospace;color:#6b6b80;background:#111118;border:1px solid #1e1e2e;border-radius:4px;padding:3px 8px;}
  .st{font-size:11px;font-weight:700;letter-spacing:0.8px;text-transform:uppercase;color:#6b6b80;margin-bottom:8px;}
  .nl{display:flex;flex-direction:column;gap:8px;margin-bottom:14px;}
  .ni{background:#111118;border:1px solid #1e1e2e;border-radius:8px;padding:10px 12px;}
  .ntxt{font-size:13px;line-height:1.5;margin-bottom:4px;}
  .nts{font-size:10px;font-family:'DM Mono',monospace;color:#6b6b80;}
  .empty{text-align:center;padding:24px;color:#6b6b80;font-size:13px;line-height:1.6;}
  .ar{display:flex;gap:8px;}
  .ainp{flex:1;padding:10px 12px;background:#111118;border:1px solid #1e1e2e;border-radius:8px;color:#e8e8f0;font-family:'Syne',sans-serif;font-size:13px;outline:none;transition:border-color 0.15s;}
  .ainp:focus{border-color:#6c6cff;}
  .ainp::placeholder{color:#6b6b80;}
  .btn{padding:10px 16px;border-radius:8px;border:none;background:#6c6cff;color:white;font-family:'Syne',sans-serif;font-size:13px;font-weight:700;cursor:pointer;white-space:nowrap;}
  .btn:hover:not(:disabled){background:#8484ff;}
  .btn:disabled{opacity:0.4;cursor:not-allowed;}
  .hi{display:flex;gap:12px;padding:10px 0;border-bottom:1px solid #1e1e2e;}
  .hi:last-child{border-bottom:none;}
  .hd{width:8px;height:8px;border-radius:50%;background:#6c6cff;flex-shrink:0;margin-top:5px;}
  .ht{font-size:12px;color:#6b6b80;line-height:1.5;}
  .ht strong{color:#e8e8f0;}
  .hts{font-size:10px;font-family:'DM Mono',monospace;color:#6b6b80;margin-top:2px;}
`;
interface Note{text:string;ts:string;}
const HIST=[
  {text:"Introduction created by Sarah Chen",ts:"2026-01-15T10:23:00Z"},
  {text:"Jordan confirmed participation",ts:"2026-01-16T14:05:00Z"},
  {text:"Intro room opened · meeting scheduled",ts:"2026-01-18T09:00:00Z"},
];
interface P{params:Promise<{id:string}>}
export default function ContextMemoryCardPage({params}:P){
  const {id}=use(params);
  const [notes,setNotes]=useState<Note[]>([]);
  const [draft,setDraft]=useState("");
  function add(){if(!draft.trim())return;setNotes(p=>[{text:draft.trim(),ts:new Date().toISOString()},...p]);setDraft("");}
  return(<><style>{S}</style><main className="page"><div className="shell">
    <div className="topbar"><div className="wordmark"><div className="wm">TF</div><div className="wt">True<span>ferral</span></div></div><div className="badge">context card</div></div>
    <div className="card"><div className="lbl">Relationship · intro/{id}</div><div className="ph"><div className="av">JL</div><div><div className="pn">Jordan Lee</div><div className="pr">counterparty · introduced by Sarah Chen</div></div></div><div className="tr"><span className="tag">VC</span><span className="tag">Series A</span><span className="tag">climate-tech</span><span className="tag">intro/active</span></div><div className="sub">Context and notes visible only to you. Never shared without explicit consent.</div></div>
    <div className="card"><div className="st">Your notes</div>{notes.length===0?<div className="empty">No notes yet. Add your first context note below.</div>:<div className="nl">{notes.map((n,i)=><div key={i} className="ni"><div className="ntxt">{n.text}</div><div className="nts">{n.ts}</div></div>)}</div>}<div className="ar"><input className="ainp" placeholder="Add a context note..." value={draft} onChange={e=>setDraft(e.target.value)} onKeyDown={e=>e.key==="Enter"&&add()}/><button className="btn" disabled={!draft.trim()} onClick={add}>Add</button></div></div>
    <div className="card"><div className="st">Introduction history</div>{HIST.map((h,i)=><div key={i} className="hi"><div className="hd"/><div><div className="ht"><strong>{h.text}</strong></div><div className="hts">{h.ts}</div></div></div>)}</div>
  </div></main></>);
}
'''

pages["momentum/[id]/page.tsx"] = '''\
"use client";
import {use} from "react";
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
  .card{background:#16161f;border:1px solid #1e1e2e;border-radius:14px;padding:22px;margin-bottom:12px;}
  .lbl{font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:#6b6b80;margin-bottom:4px;}
  .ttl{font-size:20px;font-weight:800;letter-spacing:-0.4px;margin-bottom:6px;}
  .sub{font-size:13px;color:#6b6b80;line-height:1.6;}
  .rw{display:flex;justify-content:center;padding:16px 0 8px;}
  .ring{position:relative;width:120px;height:120px;}
  .ring svg{transform:rotate(-90deg);}
  .ri{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;}
  .rn{font-size:32px;font-weight:800;letter-spacing:-1px;}
  .rs{font-size:10px;font-weight:700;letter-spacing:0.8px;text-transform:uppercase;color:#6b6b80;}
  .sg{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:4px;}
  .sc{background:#111118;border:1px solid #1e1e2e;border-radius:10px;padding:14px;}
  .sc.g{border-color:#00e5a033;background:#00e5a022;}
  .sc.y{border-color:#ffd16633;background:#ffd16622;}
  .st2{font-size:11px;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;color:#6b6b80;margin-bottom:4px;}
  .sv{font-size:14px;font-weight:700;}
  .sv.g{color:#00e5a0;}
  .sv.y{color:#ffd166;}
  .ss{font-size:11px;color:#6b6b80;margin-top:2px;font-family:'DM Mono',monospace;}
  .bw{margin-bottom:14px;}
  .blr{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;}
  .bl{font-size:12px;font-weight:600;}
  .bv{font-size:12px;font-family:'DM Mono',monospace;color:#6b6b80;}
  .bt{height:6px;background:#111118;border-radius:3px;overflow:hidden;}
  .bf{height:100%;border-radius:3px;}
  .bf.g{background:#00e5a0;}
  .bf.y{background:#ffd166;}
  .bf.a{background:#6c6cff;}
  .pr{display:flex;align-items:center;gap:8px;margin-top:12px;}
  .pd{width:8px;height:8px;border-radius:50%;background:#00e5a0;animation:pulse 2s infinite;}
  @keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.5;}}
  .pt{font-size:12px;color:#6b6b80;}
  .hr{font-size:11px;font-family:'DM Mono',monospace;color:#6b6b80;background:#111118;border:1px solid #1e1e2e;border-radius:6px;padding:8px 12px;margin-top:8px;word-break:break-all;}
`;
function Ring({score}:{score:number}){
  const r=52,circ=2*Math.PI*r,dash=(score/100)*circ;
  const col=score>=70?"#00e5a0":score>=40?"#ffd166":"#ff4d6a";
  return <div className="rw"><div className="ring"><svg width="120" height="120" viewBox="0 0 120 120"><circle cx="60" cy="60" r={r} fill="none" stroke="#1e1e2e" strokeWidth="8"/><circle cx="60" cy="60" r={r} fill="none" stroke={col} strokeWidth="8" strokeDasharray={dash+" "+circ} strokeLinecap="round"/></svg><div className="ri"><div className="rn" style={{color:col}}>{score}</div><div className="rs">momentum</div></div></div></div>;
}
interface P{params:Promise<{id:string}>}
export default function MomentumTrackerPage({params}:P){
  const {id}=use(params);
  const score=72;
  const sigs=[
    {l:"Last activity",v:"2 days ago",s:"channel locked",c:"g"},
    {l:"Next step",v:"On track",s:"deadline: Mar 15",c:"g"},
    {l:"Response lag",v:"18 hrs",s:"below 24hr target",c:"y"},
    {l:"Days active",v:"22 days",s:"since intro created",c:""},
  ];
  const bars=[
    {l:"Engagement",v:78,c:"g"},
    {l:"Timeline adherence",v:90,c:"g"},
    {l:"Response speed",v:55,c:"y"},
    {l:"Commitment follow-through",v:80,c:"a"},
  ];
  return(<><style>{S}</style><main className="page"><div className="shell">
    <div className="topbar"><div className="wordmark"><div className="wm">TF</div><div className="wt">True<span>ferral</span></div></div><div className="badge">momentum</div></div>
    <div className="card"><div className="lbl">Momentum tracker · intro/{id}</div><div className="ttl">Relationship health</div><div className="sub">Derived from immutable timeline events. Every signal is anchored to a real action.</div><Ring score={score}/><div className="pr"><div className="pd"/><div className="pt">Active · last event 2 days ago</div></div></div>
    <div className="card"><div className="lbl">Signals</div><div className="sg">{sigs.map((s,i)=><div key={i} className={"sc "+s.c}><div className="st2">{s.l}</div><div className={"sv "+s.c}>{s.v}</div><div className="ss">{s.s}</div></div>)}</div></div>
    <div className="card"><div className="lbl">Breakdown</div>{bars.map((b,i)=><div key={i} className="bw"><div className="blr"><span className="bl">{b.l}</span><span className="bv">{b.v}%</span></div><div className="bt"><div className={"bf "+b.c} style={{width:b.v+"%"}}/></div></div>)}<div className="hr">computed · {new Date().toISOString()} · from 6 timeline events</div></div>
  </div></main></>);
}
'''

for rel_path, content in pages.items():
    full_path = os.path.join(base, rel_path.replace("/", os.sep))
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content)
    size = os.path.getsize(full_path)
    print(f"OK  {rel_path}  ({size} bytes)")

print("\nAll 5 Sprint 3 pages written.")
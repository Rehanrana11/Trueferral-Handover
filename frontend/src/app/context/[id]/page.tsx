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

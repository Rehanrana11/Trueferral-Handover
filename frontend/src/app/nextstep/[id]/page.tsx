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

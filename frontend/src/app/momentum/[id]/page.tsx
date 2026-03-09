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

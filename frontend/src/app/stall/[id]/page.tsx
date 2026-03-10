"use client";
import { use } from "react";

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
  .badge-red{font-size:11px;font-family:'DM Mono',monospace;color:#ff4d6a;background:#ff4d6a22;border:1px solid #ff4d6a33;border-radius:6px;padding:4px 10px;}
  .stall-card{background:#16161f;border:1px solid #ff4d6a44;border-radius:16px;padding:24px;margin-bottom:16px;}
  .stall-header{display:flex;align-items:center;gap:12px;margin-bottom:16px;}
  .stall-icon{width:40px;height:40px;border-radius:10px;background:#ff4d6a22;border:1px solid #ff4d6a33;display:flex;align-items:center;justify-content:center;font-size:18px;}
  .stall-title{font-size:16px;font-weight:800;margin-bottom:2px;}
  .stall-meta{font-size:11px;font-family:'DM Mono',monospace;color:#ff4d6a;}
  .divider{height:1px;background:#1e1e2e;margin:16px 0;}
  .detail-row{display:flex;justify-content:space-between;align-items:center;padding:8px 0;}
  .detail-label{font-size:12px;color:#6b6b80;}
  .detail-value{font-size:12px;font-weight:600;font-family:'DM Mono',monospace;}
  .detail-value.red{color:#ff4d6a;}
  .detail-value.yellow{color:#ffd166;}
  .hdr{margin-bottom:20px;}
  .htl{font-size:22px;font-weight:800;letter-spacing:-0.4px;margin-bottom:6px;}
  .hsub{font-size:13px;color:#6b6b80;line-height:1.6;}
  .actions-title{font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6b6b80;font-family:'DM Mono',monospace;margin-bottom:12px;}
  .action-card{background:#16161f;border:1px solid #1e1e2e;border-radius:12px;padding:16px 18px;margin-bottom:10px;display:flex;align-items:center;justify-content:space-between;gap:12px;transition:border-color 0.15s;cursor:pointer;}
  .action-card:hover{border-color:#6c6cff44;}
  .ac-left{display:flex;align-items:center;gap:12px;}
  .ac-icon{width:32px;height:32px;border-radius:8px;background:#111118;border:1px solid #1e1e2e;display:flex;align-items:center;justify-content:center;font-size:14px;}
  .ac-title{font-size:13px;font-weight:700;margin-bottom:2px;}
  .ac-desc{font-size:12px;color:#6b6b80;}
  .ac-arrow{color:#6b6b80;font-size:16px;}
  .btn-primary{width:100%;padding:14px;border-radius:10px;border:none;background:#6c6cff;color:white;font-family:'Syne',sans-serif;font-size:14px;font-weight:700;cursor:pointer;transition:background 0.15s;margin-top:8px;}
  .btn-primary:hover{background:#8484ff;}
  .btn-ghost{width:100%;padding:12px;border-radius:10px;border:1px solid #1e1e2e;background:transparent;color:#6b6b80;font-family:'Syne',sans-serif;font-size:13px;font-weight:600;cursor:pointer;transition:all 0.15s;margin-top:8px;}
  .btn-ghost:hover{border-color:#6c6cff44;color:#e8e8f0;}
  .seq{font-size:10px;font-family:'DM Mono',monospace;color:#6b6b80;text-align:center;margin-top:16px;}
`;

interface PageProps { params: Promise<{ id: string }> }

const RECOVERY_ACTIONS = [
  { icon: "📋", title: "Re-send confirmation link", desc: "Generate a fresh token and notify counterparty." },
  { icon: "📅", title: "Propose new outcome window", desc: "Extend the outcome deadline — both parties must agree." },
  { icon: "💬", title: "Log a context note", desc: "Record why this introduction stalled. Sealed to the chain." },
  { icon: "🔒", title: "Lock a new next step", desc: "Reset momentum with a committed next action and timestamp." },
];

export default function StallRecoveryPage({ params }: PageProps) {
  const { id } = use(params);

  return (
    <>
      <style>{S}</style>
      <main className="page">
        <div className="shell">
          <div className="topbar">
            <div className="wordmark">
              <div className="wm">TF</div>
              <div className="wt">True<span>ferral</span></div>
            </div>
            <div className="badge-red">stalled</div>
          </div>

          <div className="hdr">
            <div className="htl">Stall Recovery</div>
            <div className="hsub">
              This introduction has stalled. Choose a recovery action to restore momentum.
              All actions are recorded in the hash chain.
            </div>
          </div>

          <div className="stall-card">
            <div className="stall-header">
              <div className="stall-icon">⚠️</div>
              <div>
                <div className="stall-title">Introduction stalled</div>
                <div className="stall-meta">id: {id}</div>
              </div>
            </div>
            <div className="divider" />
            <div className="detail-row">
              <span className="detail-label">Current state</span>
              <span className="detail-value yellow">INTRO_CONFIRMED</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Days since last event</span>
              <span className="detail-value red">14 days</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Outcome window</span>
              <span className="detail-value red">not opened</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Risk level</span>
              <span className="detail-value red">HIGH — timeout approaching</span>
            </div>
          </div>

          <div className="actions-title">Recovery actions</div>
          {RECOVERY_ACTIONS.map((a, i) => (
            <div key={i} className="action-card">
              <div className="ac-left">
                <div className="ac-icon">{a.icon}</div>
                <div>
                  <div className="ac-title">{a.title}</div>
                  <div className="ac-desc">{a.desc}</div>
                </div>
              </div>
              <span className="ac-arrow">›</span>
            </div>
          ))}

          <button className="btn-primary">
            Begin recovery
          </button>
          <button className="btn-ghost" onClick={() => window.history.back()}>
            Back to queue
          </button>
          <div className="seq">stall-recovery · {id} · sprint-4</div>
        </div>
      </main>
    </>
  );
}

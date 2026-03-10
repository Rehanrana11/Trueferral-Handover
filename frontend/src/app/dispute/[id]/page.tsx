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
  .badge-dispute{font-size:11px;font-family:'DM Mono',monospace;color:#ffd166;background:#ffd16622;border:1px solid #ffd16633;border-radius:6px;padding:4px 10px;}
  .hdr{margin-bottom:20px;}
  .htl{font-size:22px;font-weight:800;letter-spacing:-0.4px;margin-bottom:4px;}
  .hsub{font-size:13px;color:#6b6b80;line-height:1.6;}
  .warning-card{background:#ffd16611;border:1px solid #ffd16633;border-radius:14px;padding:20px;margin-bottom:20px;}
  .wc-header{display:flex;align-items:center;gap:12px;margin-bottom:12px;}
  .wc-icon{font-size:20px;}
  .wc-title{font-size:15px;font-weight:800;}
  .wc-body{font-size:13px;color:#6b6b80;line-height:1.65;}
  .detail-card{background:#16161f;border:1px solid #1e1e2e;border-radius:14px;padding:18px 20px;margin-bottom:16px;}
  .detail-title{font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6b6b80;font-family:'DM Mono',monospace;margin-bottom:12px;}
  .detail-row{display:flex;justify-content:space-between;align-items:flex-start;padding:8px 0;border-bottom:1px solid #1e1e2e;}
  .detail-row:last-child{border-bottom:none;}
  .detail-label{font-size:12px;color:#6b6b80;flex-shrink:0;}
  .detail-value{font-size:12px;font-weight:600;text-align:right;}
  .detail-value.mono{font-family:'DM Mono',monospace;color:#6c6cff;}
  .outcome-choice{display:flex;flex-direction:column;gap:10px;margin-bottom:16px;}
  .choice-btn{padding:16px 18px;border-radius:12px;border:1px solid #1e1e2e;background:#16161f;text-align:left;cursor:pointer;transition:all 0.15s;width:100%;}
  .choice-btn:hover{border-color:#6c6cff44;}
  .choice-btn.selected{border-color:#6c6cff;background:#6c6cff11;}
  .choice-title{font-size:14px;font-weight:700;margin-bottom:3px;font-family:'Syne',sans-serif;}
  .choice-desc{font-size:12px;color:#6b6b80;font-family:'Syne',sans-serif;}
  .textarea{width:100%;background:#111118;border:1px solid #1e1e2e;border-radius:10px;padding:14px;color:#e8e8f0;font-family:'Syne',sans-serif;font-size:13px;line-height:1.6;resize:vertical;min-height:100px;margin-bottom:16px;}
  .textarea::placeholder{color:#6b6b80;}
  .textarea:focus{outline:none;border-color:#6c6cff44;}
  .consequence{background:#ff4d6a11;border:1px solid #ff4d6a33;border-radius:10px;padding:14px 16px;margin-bottom:16px;font-size:12px;color:#ff4d6a;line-height:1.6;}
  .btn-primary{width:100%;padding:14px;border-radius:10px;border:none;background:#6c6cff;color:white;font-family:'Syne',sans-serif;font-size:14px;font-weight:700;cursor:pointer;transition:background 0.15s;}
  .btn-primary:hover{background:#8484ff;}
  .btn-ghost{width:100%;padding:12px;border-radius:10px;border:1px solid #1e1e2e;background:transparent;color:#6b6b80;font-family:'Syne',sans-serif;font-size:13px;font-weight:600;cursor:pointer;transition:all 0.15s;margin-top:8px;}
  .btn-ghost:hover{border-color:#6c6cff44;color:#e8e8f0;}
`;

interface PageProps { params: Promise<{ id: string }> }

type Choice = "success" | "failure" | null;

export default function DisputePage({ params }: PageProps) {
  const { id } = use(params);
  const [choice, setChoice] = useState<Choice>(null);
  const [reason, setReason] = useState("");

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
            <div className="badge-dispute">disputed</div>
          </div>

          <div className="hdr">
            <div className="htl">Dispute Resolution</div>
            <div className="hsub">
              A dispute has been opened on this introduction. Both parties must
              submit their position. Resolution is deterministic — the chain decides.
            </div>
          </div>

          <div className="warning-card">
            <div className="wc-header">
              <span className="wc-icon">⚖️</span>
              <span className="wc-title">Dispute opened</span>
            </div>
            <div className="wc-body">
              The outcome submissions for this introduction do not match.
              You must submit your position. This submission is irreversible
              and will be sealed to the hash chain.
            </div>
          </div>

          <div className="detail-card">
            <div className="detail-title">Introduction details</div>
            <div className="detail-row">
              <span className="detail-label">Snapshot ID</span>
              <span className="detail-value mono">{id}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">State</span>
              <span className="detail-value">DISPUTED</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Dispute opened</span>
              <span className="detail-value">2 days ago</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Your role</span>
              <span className="detail-value">Introducer</span>
            </div>
          </div>

          <div className="detail-title" style={{fontSize:"11px",fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",color:"#6b6b80",fontFamily:"'DM Mono',monospace",marginBottom:"12px"}}>
            Your position
          </div>
          <div className="outcome-choice">
            <button
              className={`choice-btn${choice === "success" ? " selected" : ""}`}
              onClick={() => setChoice("success")}
            >
              <div className="choice-title">✓ Outcome was successful</div>
              <div className="choice-desc">The introduction met its stated objective.</div>
            </button>
            <button
              className={`choice-btn${choice === "failure" ? " selected" : ""}`}
              onClick={() => setChoice("failure")}
            >
              <div className="choice-title">✗ Outcome was not successful</div>
              <div className="choice-desc">The introduction did not meet its stated objective.</div>
            </button>
          </div>

          <textarea
            className="textarea"
            placeholder="Provide evidence for your position (optional but recommended). This will be sealed to the chain."
            value={reason}
            onChange={e => setReason(e.target.value)}
          />

          <div className="consequence">
            ⚠ This submission is irreversible. Once sealed, it cannot be edited or retracted.
            Deterministic resolution applies — the chain decides based on both positions.
          </div>

          <button
            className="btn-primary"
            disabled={!choice}
            style={!choice ? { opacity: 0.5, cursor: "not-allowed" } : {}}
          >
            Submit position — seal to chain
          </button>
          <button className="btn-ghost" onClick={() => window.history.back()}>
            Back
          </button>
        </div>
      </main>
    </>
  );
}

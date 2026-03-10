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
  .badge-timeout{font-size:11px;font-family:'DM Mono',monospace;color:#ff4d6a;background:#ff4d6a22;border:1px solid #ff4d6a33;border-radius:6px;padding:4px 10px;}
  .hdr{margin-bottom:20px;}
  .htl{font-size:22px;font-weight:800;letter-spacing:-0.4px;margin-bottom:4px;}
  .hsub{font-size:13px;color:#6b6b80;line-height:1.6;}
  .timeout-card{background:#ff4d6a11;border:1px solid #ff4d6a44;border-radius:16px;padding:24px;margin-bottom:20px;text-align:center;}
  .tc-icon{font-size:36px;margin-bottom:12px;}
  .tc-title{font-size:18px;font-weight:800;margin-bottom:8px;}
  .tc-body{font-size:13px;color:#6b6b80;line-height:1.65;}
  .detail-card{background:#16161f;border:1px solid #1e1e2e;border-radius:14px;padding:18px 20px;margin-bottom:16px;}
  .detail-title{font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6b6b80;font-family:'DM Mono',monospace;margin-bottom:12px;}
  .detail-row{display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid #1e1e2e;}
  .detail-row:last-child{border-bottom:none;}
  .detail-label{font-size:12px;color:#6b6b80;}
  .detail-value{font-size:12px;font-weight:600;}
  .detail-value.mono{font-family:'DM Mono',monospace;color:#6c6cff;}
  .detail-value.red{color:#ff4d6a;}
  .impact-card{background:#16161f;border:1px solid #ff4d6a33;border-radius:14px;padding:18px 20px;margin-bottom:16px;}
  .impact-title{font-size:13px;font-weight:700;margin-bottom:10px;}
  .impact-item{display:flex;align-items:flex-start;gap:10px;padding:6px 0;font-size:12px;color:#6b6b80;line-height:1.5;}
  .impact-dot{width:4px;height:4px;border-radius:50%;background:#ff4d6a;flex-shrink:0;margin-top:6px;}
  .btn-primary{width:100%;padding:14px;border-radius:10px;border:none;background:#6c6cff;color:white;font-family:'Syne',sans-serif;font-size:14px;font-weight:700;cursor:pointer;transition:background 0.15s;margin-bottom:8px;}
  .btn-primary:hover{background:#8484ff;}
  .btn-ghost{width:100%;padding:12px;border-radius:10px;border:1px solid #1e1e2e;background:transparent;color:#6b6b80;font-family:'Syne',sans-serif;font-size:13px;font-weight:600;cursor:pointer;transition:all 0.15s;}
  .btn-ghost:hover{border-color:#6c6cff44;color:#e8e8f0;}
  .seq{font-size:10px;font-family:'DM Mono',monospace;color:#6b6b80;text-align:center;margin-top:16px;}
`;

interface PageProps { params: Promise<{ id: string }> }

export default function TimeoutPage({ params }: PageProps) {
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
            <div className="badge-timeout">timed out</div>
          </div>

          <div className="hdr">
            <div className="htl">Outcome Timeout</div>
            <div className="hsub">
              The outcome verification window for this introduction has closed
              without a submission. The state has been sealed as TIMEOUT.
            </div>
          </div>

          <div className="timeout-card">
            <div className="tc-icon">⏱</div>
            <div className="tc-title">Window closed</div>
            <div className="tc-body">
              Neither party submitted an outcome verification before the deadline.
              This record is now sealed. No further changes are possible.
            </div>
          </div>

          <div className="detail-card">
            <div className="detail-title">Sealed record</div>
            <div className="detail-row">
              <span className="detail-label">Snapshot ID</span>
              <span className="detail-value mono">{id}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Final state</span>
              <span className="detail-value red">TIMEOUT</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Window closed</span>
              <span className="detail-value">Mar 8, 2026 — 23:59 UTC</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Sealed at seq</span>
              <span className="detail-value mono">#0041</span>
            </div>
          </div>

          <div className="impact-card">
            <div className="impact-title">Reputation impact</div>
            <div className="impact-item">
              <span className="impact-dot" />
              This timeout is recorded on both parties Trust Passports.
            </div>
            <div className="impact-item">
              <span className="impact-dot" />
              A TIMEOUT counts as an unresolved introduction — not a failure.
            </div>
            <div className="impact-item">
              <span className="impact-dot" />
              The sealed record cannot be edited, removed, or disputed after timeout.
            </div>
          </div>

          <button className="btn-primary" onClick={() => window.location.href = "/queue"}>
            Return to queue
          </button>
          <button className="btn-ghost" onClick={() => window.location.href = `/passport/me`}>
            View my Trust Passport
          </button>
          <div className="seq">timeout · {id} · sealed · sprint-4</div>
        </div>
      </main>
    </>
  );
}

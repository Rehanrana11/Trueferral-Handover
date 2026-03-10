"use client";

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  body{background:#0a0a0f;color:#e8e8f0;font-family:'Syne',sans-serif;-webkit-font-smoothing:antialiased;}
  .page{min-height:100vh;display:flex;flex-direction:column;align-items:center;padding:32px 16px 80px;}
  .shell{width:100%;max-width:560px;}
  .topbar{display:flex;align-items:center;justify-content:space-between;margin-bottom:28px;}
  .wordmark{display:flex;align-items:center;gap:10px;}
  .wm{width:32px;height:32px;border-radius:8px;background:linear-gradient(135deg,#6c6cff,#9b5de5);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:white;}
  .wt{font-size:15px;font-weight:700;}
  .wt span{color:#6c6cff;}
  .badge{font-size:11px;font-family:'DM Mono',monospace;color:#6b6b80;background:#111118;border:1px solid #1e1e2e;border-radius:6px;padding:4px 10px;}
  .hdr{margin-bottom:24px;}
  .htl{font-size:22px;font-weight:800;letter-spacing:-0.4px;margin-bottom:4px;}
  .hsub{font-size:13px;color:#6b6b80;line-height:1.6;}
  .week-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;}
  .week-label{font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6b6b80;font-family:'DM Mono',monospace;}
  .week-date{font-size:11px;font-family:'DM Mono',monospace;color:#6b6b80;}
  .digest-card{background:#16161f;border:1px solid #1e1e2e;border-radius:14px;padding:20px;margin-bottom:10px;transition:border-color 0.15s;}
  .digest-card:hover{border-color:#6c6cff44;}
  .dc-top{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:10px;}
  .dc-left{display:flex;align-items:center;gap:12px;}
  .dc-avatar{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#6c6cff44,#9b5de544);border:1px solid #6c6cff33;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;flex-shrink:0;}
  .dc-name{font-size:14px;font-weight:700;margin-bottom:2px;}
  .dc-role{font-size:11px;color:#6b6b80;font-family:'DM Mono',monospace;}
  .dc-signal{font-size:11px;padding:3px 8px;border-radius:4px;font-family:'DM Mono',monospace;font-weight:600;white-space:nowrap;}
  .dc-signal.green{color:#00e5a0;background:#00e5a022;border:1px solid #00e5a033;}
  .dc-signal.yellow{color:#ffd166;background:#ffd16622;border:1px solid #ffd16633;}
  .dc-signal.red{color:#ff4d6a;background:#ff4d6a22;border:1px solid #ff4d6a33;}
  .dc-body{font-size:12px;color:#6b6b80;line-height:1.65;margin-bottom:10px;}
  .dc-footer{display:flex;align-items:center;justify-content:space-between;}
  .dc-meta{font-size:10px;font-family:'DM Mono',monospace;color:#6b6b80;}
  .dc-action{font-size:12px;font-weight:700;color:#6c6cff;cursor:pointer;background:none;border:none;font-family:'Syne',sans-serif;}
  .summary-bar{background:#16161f;border:1px solid #1e1e2e;border-radius:12px;padding:16px 20px;margin-bottom:20px;display:flex;gap:24px;}
  .sb-item{text-align:center;}
  .sb-num{font-size:20px;font-weight:800;margin-bottom:2px;}
  .sb-num.green{color:#00e5a0;}
  .sb-num.yellow{color:#ffd166;}
  .sb-num.red{color:#ff4d6a;}
  .sb-label{font-size:10px;font-family:'DM Mono',monospace;color:#6b6b80;text-transform:uppercase;letter-spacing:0.5px;}
  .notice{display:flex;align-items:flex-start;gap:12px;background:#6c6cff11;border:1px solid #6c6cff22;border-radius:10px;padding:14px 16px;margin-top:8px;}
  .notice-dot{width:6px;height:6px;border-radius:50%;background:#6c6cff;flex-shrink:0;margin-top:4px;}
  .notice-text{font-size:12px;color:#6b6b80;line-height:1.6;}
`;

const DIGEST_ITEMS = [
  {
    initials: "SC",
    name: "Sarah Chen",
    role: "introducer",
    signal: "green" as const,
    signalLabel: "momentum high",
    body: "Outcome verified successfully 3 days ago. Both parties confirmed. Your Trust Passport updated with a new verified introduction.",
    meta: "last event: 3d ago · outcome: SUCCESS",
    action: "View receipt",
  },
  {
    initials: "AJ",
    name: "Alex Johnson",
    role: "counterparty",
    signal: "yellow" as const,
    signalLabel: "check-in due",
    body: "Next step was locked 8 days ago. No update logged since. Consider checking in to maintain momentum before the outcome window opens.",
    meta: "last event: 8d ago · state: INTRO_CONFIRMED",
    action: "Log update",
  },
  {
    initials: "MR",
    name: "Marcus Reid",
    role: "introducer",
    signal: "red" as const,
    signalLabel: "stalled",
    body: "Confirmation token issued 12 days ago. No response from counterparty. Stall recovery options are available.",
    meta: "last event: 12d ago · state: TOKEN_ISSUED",
    action: "Recover",
  },
];

export default function DigestPage() {
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
            <div className="badge">weekly digest</div>
          </div>

          <div className="hdr">
            <div className="htl">Reconnection Digest</div>
            <div className="hsub">
              Weekly summary of relationship momentum signals across your active introductions.
              Derived from real events only — no inferences.
            </div>
          </div>

          <div className="summary-bar">
            <div className="sb-item">
              <div className="sb-num green">1</div>
              <div className="sb-label">on track</div>
            </div>
            <div className="sb-item">
              <div className="sb-num yellow">1</div>
              <div className="sb-label">check-in due</div>
            </div>
            <div className="sb-item">
              <div className="sb-num red">1</div>
              <div className="sb-label">stalled</div>
            </div>
            <div className="sb-item">
              <div className="sb-num" style={{color:"#e8e8f0"}}>3</div>
              <div className="sb-label">total active</div>
            </div>
          </div>

          <div className="week-header">
            <div className="week-label">This week</div>
            <div className="week-date">week of Mar 10, 2026</div>
          </div>

          {DIGEST_ITEMS.map((item, i) => (
            <div key={i} className="digest-card">
              <div className="dc-top">
                <div className="dc-left">
                  <div className="dc-avatar">{item.initials}</div>
                  <div>
                    <div className="dc-name">{item.name}</div>
                    <div className="dc-role">{item.role}</div>
                  </div>
                </div>
                <div className={`dc-signal ${item.signal}`}>{item.signalLabel}</div>
              </div>
              <div className="dc-body">{item.body}</div>
              <div className="dc-footer">
                <div className="dc-meta">{item.meta}</div>
                <button className="dc-action">{item.action} →</button>
              </div>
            </div>
          ))}

          <div className="notice">
            <div className="notice-dot" />
            <div className="notice-text">
              Digest is generated from sealed chain events only.
              No signal is inferred — every item maps to a real state transition.
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

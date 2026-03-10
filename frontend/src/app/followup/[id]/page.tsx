"use client";
import { use, useState } from "react";

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
  .badge-ai{font-size:11px;font-family:'DM Mono',monospace;color:#9b5de5;background:#9b5de522;border:1px solid #9b5de533;border-radius:6px;padding:4px 10px;}
  .hdr{margin-bottom:20px;}
  .htl{font-size:22px;font-weight:800;letter-spacing:-0.4px;margin-bottom:4px;}
  .hsub{font-size:13px;color:#6b6b80;line-height:1.6;}
  .context-card{background:#16161f;border:1px solid #1e1e2e;border-radius:14px;padding:18px 20px;margin-bottom:16px;}
  .ctx-label{font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6b6b80;font-family:'DM Mono',monospace;margin-bottom:10px;}
  .ctx-row{display:flex;justify-content:space-between;align-items:center;padding:6px 0;}
  .ctx-key{font-size:12px;color:#6b6b80;}
  .ctx-val{font-size:12px;font-weight:600;}
  .ctx-val.mono{font-family:'DM Mono',monospace;color:#6c6cff;}
  .divider{height:1px;background:#1e1e2e;margin:10px 0;}
  .draft-section{margin-bottom:16px;}
  .draft-label{font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6b6b80;font-family:'DM Mono',monospace;margin-bottom:10px;display:flex;align-items:center;gap:8px;}
  .ai-dot{width:6px;height:6px;border-radius:50%;background:#9b5de5;}
  .draft-box{background:#111118;border:1px solid #1e1e2e;border-radius:10px;padding:16px;font-size:13px;color:#e8e8f0;line-height:1.75;white-space:pre-wrap;min-height:160px;}
  .draft-box.loading{color:#6b6b80;font-style:italic;}
  .tone-row{display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap;}
  .tone-btn{padding:7px 14px;border-radius:8px;border:1px solid #1e1e2e;background:transparent;color:#6b6b80;font-family:'Syne',sans-serif;font-size:12px;font-weight:600;cursor:pointer;transition:all 0.15s;}
  .tone-btn:hover{border-color:#6c6cff44;color:#e8e8f0;}
  .tone-btn.active{background:#6c6cff22;border-color:#6c6cff44;color:#6c6cff;}
  .actions{display:flex;gap:10px;margin-top:4px;}
  .btn-primary{flex:1;padding:13px;border-radius:10px;border:none;background:#6c6cff;color:white;font-family:'Syne',sans-serif;font-size:13px;font-weight:700;cursor:pointer;transition:background 0.15s;}
  .btn-primary:hover{background:#8484ff;}
  .btn-secondary{flex:1;padding:13px;border-radius:10px;border:1px solid #1e1e2e;background:transparent;color:#6b6b80;font-family:'Syne',sans-serif;font-size:13px;font-weight:600;cursor:pointer;transition:all 0.15s;}
  .btn-secondary:hover{border-color:#6c6cff44;color:#e8e8f0;}
  .notice{display:flex;align-items:flex-start;gap:12px;background:#9b5de511;border:1px solid #9b5de522;border-radius:10px;padding:14px 16px;margin-top:12px;}
  .notice-dot{width:6px;height:6px;border-radius:50%;background:#9b5de5;flex-shrink:0;margin-top:4px;}
  .notice-text{font-size:12px;color:#6b6b80;line-height:1.6;}
`;

const TONES = ["Professional", "Warm", "Direct", "Brief"];

const DRAFTS: Record<string, string> = {
  Professional: `Hi Alex,

Following up on our introduction from last week. I wanted to check in on the next step we discussed — the product demo call.

Given the context we captured, I believe this introduction has clear mutual value. Please let me know when you are available this week.

Best regards,`,
  Warm: `Hi Alex,

Hope things are going well. Just wanted to circle back on the intro we made — wanted to make sure the conversation had a chance to move forward.

Let me know if there is anything I can do to help make the next step easier.

Best,`,
  Direct: `Alex —

Following up on the intro. Next step agreed: demo call. Please confirm availability.

Thanks,`,
  Brief: `Hi Alex — quick follow-up on the intro. Still on for the demo call? Let me know.`,
};

interface PageProps { params: Promise<{ id: string }> }

export default function FollowUpPage({ params }: PageProps) {
  const { id } = use(params);
  const [tone, setTone] = useState("Professional");
  const [copied, setCopied] = useState(false);

  function copyDraft() {
    navigator.clipboard.writeText(DRAFTS[tone]).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

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
            <div className="badge-ai">AI · first feature</div>
          </div>

          <div className="hdr">
            <div className="htl">AI Follow-Up Draft</div>
            <div className="hsub">
              Draft generated from your context card and relationship history.
              Edit before sending — this is a starting point, not a final message.
            </div>
          </div>

          <div className="context-card">
            <div className="ctx-label">Context used for draft</div>
            <div className="ctx-row">
              <span className="ctx-key">Introduction</span>
              <span className="ctx-val mono">{id}</span>
            </div>
            <div className="divider" />
            <div className="ctx-row">
              <span className="ctx-key">Parties</span>
              <span className="ctx-val">Sarah Chen → Alex Johnson</span>
            </div>
            <div className="ctx-row">
              <span className="ctx-key">Context note</span>
              <span className="ctx-val">B2B SaaS intro — product demo</span>
            </div>
            <div className="ctx-row">
              <span className="ctx-key">Next step locked</span>
              <span className="ctx-val">Demo call — 8 days ago</span>
            </div>
            <div className="ctx-row">
              <span className="ctx-key">State</span>
              <span className="ctx-val">INTRO_CONFIRMED</span>
            </div>
          </div>

          <div className="draft-section">
            <div className="draft-label">
              <span className="ai-dot" />
              AI draft — select tone
            </div>
            <div className="tone-row">
              {TONES.map(t => (
                <button
                  key={t}
                  className={`tone-btn${tone === t ? " active" : ""}`}
                  onClick={() => setTone(t)}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="draft-box">{DRAFTS[tone]}</div>
          </div>

          <div className="actions">
            <button className="btn-primary" onClick={copyDraft}>
              {copied ? "Copied ✓" : "Copy draft"}
            </button>
            <button className="btn-secondary" onClick={() => window.history.back()}>
              Back
            </button>
          </div>

          <div className="notice">
            <div className="notice-dot" />
            <div className="notice-text">
              This draft is generated from sealed context card data only.
              Sending this message is not recorded in the hash chain — it is a
              communication aid, not a commitment.
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

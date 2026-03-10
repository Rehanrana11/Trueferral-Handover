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
  .badge{font-size:11px;font-family:'DM Mono',monospace;color:#6b6b80;background:#111118;border:1px solid #1e1e2e;border-radius:6px;padding:4px 10px;}
  .hdr{margin-bottom:24px;}
  .htl{font-size:22px;font-weight:800;letter-spacing:-0.4px;margin-bottom:4px;}
  .hsub{font-size:13px;color:#6b6b80;line-height:1.6;}
  .section{margin-bottom:24px;}
  .section-title{font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6b6b80;font-family:'DM Mono',monospace;margin-bottom:12px;}
  .reminder-card{background:#16161f;border:1px solid #1e1e2e;border-radius:14px;padding:18px 20px;margin-bottom:10px;display:flex;align-items:center;justify-content:space-between;gap:16px;transition:border-color 0.15s;}
  .reminder-card:hover{border-color:#6c6cff44;}
  .rc-left{display:flex;align-items:center;gap:14px;}
  .rc-icon{width:36px;height:36px;border-radius:10px;background:#111118;border:1px solid #1e1e2e;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;}
  .rc-title{font-size:13px;font-weight:700;margin-bottom:2px;}
  .rc-desc{font-size:12px;color:#6b6b80;line-height:1.5;}
  .rc-meta{font-size:10px;font-family:'DM Mono',monospace;color:#6b6b80;margin-top:4px;}
  .toggle{width:40px;height:22px;border-radius:11px;border:none;cursor:pointer;position:relative;flex-shrink:0;transition:background 0.2s;}
  .toggle.on{background:#6c6cff;}
  .toggle.off{background:#1e1e2e;}
  .toggle::after{content:'';position:absolute;top:3px;width:16px;height:16px;border-radius:50%;background:white;transition:left 0.2s;}
  .toggle.on::after{left:21px;}
  .toggle.off::after{left:3px;}
  .add-card{background:transparent;border:1px dashed #1e1e2e;border-radius:14px;padding:16px 20px;display:flex;align-items:center;gap:12px;cursor:pointer;transition:all 0.15s;width:100%;}
  .add-card:hover{border-color:#6c6cff44;background:#16161f;}
  .add-icon{width:32px;height:32px;border-radius:8px;background:#111118;border:1px solid #1e1e2e;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;}
  .add-label{font-size:13px;color:#6b6b80;font-weight:600;}
  .notice{display:flex;align-items:flex-start;gap:12px;background:#6c6cff11;border:1px solid #6c6cff22;border-radius:10px;padding:14px 16px;margin-top:8px;}
  .notice-dot{width:6px;height:6px;border-radius:50%;background:#6c6cff;flex-shrink:0;margin-top:4px;}
  .notice-text{font-size:12px;color:#6b6b80;line-height:1.6;}
  .tag{font-size:10px;font-weight:700;letter-spacing:0.8px;text-transform:uppercase;font-family:'DM Mono',monospace;padding:2px 7px;border-radius:4px;}
  .tag.stage{color:#6c6cff;background:#6c6cff22;border:1px solid #6c6cff33;}
  .tag.time{color:#ffd166;background:#ffd16622;border:1px solid #ffd16633;}
`;

type Reminder = {
  id: string;
  icon: string;
  title: string;
  desc: string;
  trigger: string;
  tagType: "stage" | "time";
  tagLabel: string;
  enabled: boolean;
};

const DEFAULT_REMINDERS: Reminder[] = [
  {
    id: "r1",
    icon: "⏰",
    title: "Confirmation overdue",
    desc: "Counterparty has not confirmed within 48 hours of token issue.",
    trigger: "TOKEN_ISSUED → 48h",
    tagType: "stage",
    tagLabel: "stage-based",
    enabled: true,
  },
  {
    id: "r2",
    icon: "📋",
    title: "Outcome window opening",
    desc: "Outcome verification window opens in 24 hours.",
    trigger: "INTRO_CONFIRMED → 24h before",
    tagType: "time",
    tagLabel: "time-based",
    enabled: true,
  },
  {
    id: "r3",
    icon: "🔴",
    title: "Outcome window closing",
    desc: "Outcome window closes in 4 hours. Submit verification now.",
    trigger: "OUTCOME_PENDING → close − 4h",
    tagType: "time",
    tagLabel: "time-based",
    enabled: true,
  },
  {
    id: "r4",
    icon: "📎",
    title: "Next-step locked but no update",
    desc: "A next step was locked 7 days ago with no progress logged.",
    trigger: "NEXT_STEP_LOCKED → 7d",
    tagType: "stage",
    tagLabel: "stage-based",
    enabled: false,
  },
  {
    id: "r5",
    icon: "🤝",
    title: "Channel not confirmed",
    desc: "Channel handshake was proposed but not accepted within 72 hours.",
    trigger: "CHANNEL_PROPOSED → 72h",
    tagType: "stage",
    tagLabel: "stage-based",
    enabled: false,
  },
];

export default function RemindersPage() {
  const [reminders, setReminders] = useState<Reminder[]>(DEFAULT_REMINDERS);

  function toggle(id: string) {
    setReminders(prev =>
      prev.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r)
    );
  }

  const active = reminders.filter(r => r.enabled);
  const inactive = reminders.filter(r => !r.enabled);

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
            <div className="badge">smart reminders</div>
          </div>

          <div className="hdr">
            <div className="htl">Smart Reminders</div>
            <div className="hsub">
              Time-based and stage-based nudges derived from your relationship events.
              Reminders fire based on real state transitions — no manual setup required.
            </div>
          </div>

          {active.length > 0 && (
            <div className="section">
              <div className="section-title">Active — {active.length} enabled</div>
              {active.map(r => (
                <div key={r.id} className="reminder-card" data-tour="reminder-card">
                  <div className="rc-left">
                    <div className="rc-icon">{r.icon}</div>
                    <div>
                      <div className="rc-title">{r.title}</div>
                      <div className="rc-desc">{r.desc}</div>
                      <div className="rc-meta">
                        <span className={`tag ${r.tagType}`}>{r.tagLabel}</span>
                        {"  "}trigger: {r.trigger}
                      </div>
                    </div>
                  </div>
                  <button
                    className="toggle on"
                    onClick={() => toggle(r.id)}
                    aria-label="Disable reminder"
                  />
                </div>
              ))}
            </div>
          )}

          {inactive.length > 0 && (
            <div className="section">
              <div className="section-title">Available — {inactive.length} disabled</div>
              {inactive.map(r => (
                <div key={r.id} className="reminder-card" style={{ opacity: 0.6 }}>
                  <div className="rc-left">
                    <div className="rc-icon">{r.icon}</div>
                    <div>
                      <div className="rc-title">{r.title}</div>
                      <div className="rc-desc">{r.desc}</div>
                      <div className="rc-meta">
                        <span className={`tag ${r.tagType}`}>{r.tagLabel}</span>
                        {"  "}trigger: {r.trigger}
                      </div>
                    </div>
                  </div>
                  <button
                    className="toggle off"
                    onClick={() => toggle(r.id)}
                    aria-label="Enable reminder"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="notice">
            <div className="notice-dot" />
            <div className="notice-text">
              Reminders fire based on real state transitions in the hash chain.
              No reminder fires unless the underlying event is confirmed and sealed.
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

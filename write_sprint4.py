import os

base = r"E:\Trueferral\frontend\src\app"

files = {}

# ── Feature 1: Smart Reminders (/reminders) ──
files["reminders/page.tsx"] = '''\
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
'''

# ── Feature 2: Stall Recovery (/stall/[id]) ──
files["stall/[id]/page.tsx"] = '''\
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
'''

# ── Feature 3: Reconnection Digest (/digest) ──
files["digest/page.tsx"] = '''\
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
'''

# ── Feature 4: AI Follow-Up Drafting (/followup/[id]) ──
files["followup/[id]/page.tsx"] = '''\
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
'''

# ── Feature 5: Dispute/Timeout UI (/dispute/[id] and /timeout/[id]) ──
files["dispute/[id]/page.tsx"] = '''\
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
'''

files["timeout/[id]/page.tsx"] = '''\
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
'''

# Write all files
for rel_path, content in files.items():
    full_path = os.path.join(base, rel_path.replace("/", os.sep))
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content)
    size = os.path.getsize(full_path)
    print(f"OK  app/{rel_path}  ({size} bytes)")

print("\n=== Sprint 4 — All features written ===")
print("Routes created:")
print("  /reminders          — Smart Reminders (Feature 1)")
print("  /stall/[id]         — Stall Recovery (Feature 2)")
print("  /digest             — Reconnection Digest (Feature 3)")
print("  /followup/[id]      — AI Follow-Up Drafting (Feature 4)")
print("  /dispute/[id]       — Dispute Resolution UI (Feature 5a)")
print("  /timeout/[id]       — Timeout State UI (Feature 5b)")
print("\nNext steps:")
print("  1. python scripts\\doctor.py")
print("  2. pytest")
print("  3. git add .")
print('  4. git commit -m "ui: Sprint 4 all features (Smart Reminders, Stall Recovery, Digest, AI Follow-Up, Dispute/Timeout)"')
print("  5. git tag SPRINT4_COMPLETE")
print("  6. git push origin main --tags")

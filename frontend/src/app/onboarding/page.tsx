"use client";

import { useState, use } from "react";

// ── Design System (exact Trueferral tokens) ───────────────────────────────
const COLORS = {
  bg: "#0a0a0f",
  surface: "#111118",
  card: "#16161f",
  border: "#1e1e2e",
  accent: "#6c6cff",
  accentGlow: "#6c6cff33",
  accentHover: "#8484ff",
  green: "#00e5a0",
  greenGlow: "#00e5a022",
  red: "#ff4d6a",
  yellow: "#ffd166",
  yellowGlow: "#ffd16622",
  text: "#e8e8f0",
  muted: "#6b6b80",
  subtle: "#2a2a3a",
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background: ${COLORS.bg};
    color: ${COLORS.text};
    font-family: 'Syne', sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  .mc-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px 16px 80px;
    position: relative;
    overflow: hidden;
  }
  .mc-page::before {
    content: '';
    position: fixed;
    top: -20%;
    left: 50%;
    transform: translateX(-50%);
    width: 700px;
    height: 400px;
    background: radial-gradient(ellipse, ${COLORS.accentGlow} 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }
  .mc-page::after {
    content: '';
    position: fixed;
    inset: 0;
    opacity: 0.025;
    background-image: radial-gradient(${COLORS.muted} 1px, transparent 1px);
    background-size: 28px 28px;
    pointer-events: none;
    z-index: 0;
  }

  .mc-shell {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 520px;
    display: flex;
    flex-direction: column;
  }

  /* ── Topbar ── */
  .mc-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 28px;
  }
  .mc-wordmark {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .wordmark-mark {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: linear-gradient(135deg, ${COLORS.accent}, #9b5de5);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 800;
    color: white;
    flex-shrink: 0;
    box-shadow: 0 0 16px ${COLORS.accentGlow};
  }
  .wordmark-text { font-size: 15px; font-weight: 700; letter-spacing: -0.2px; }
  .wordmark-text span { color: ${COLORS.accent}; }

  /* ── Header card ── */
  .mc-header {
    background: ${COLORS.card};
    border: 1px solid ${COLORS.border};
    border-radius: 14px;
    padding: 20px 20px 18px;
    margin-bottom: 16px;
  }
  .mc-header-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: ${COLORS.muted};
    margin-bottom: 4px;
  }
  .mc-header-title {
    font-size: 20px;
    font-weight: 800;
    letter-spacing: -0.4px;
    margin-bottom: 6px;
  }
  .mc-header-title span { color: ${COLORS.accent}; }
  .mc-header-sub {
    font-size: 13px;
    color: ${COLORS.muted};
    line-height: 1.5;
  }

  /* ── Parties strip ── */
  .parties-strip {
    display: flex;
    gap: 10px;
    margin-bottom: 16px;
  }
  .party-chip {
    flex: 1;
    background: ${COLORS.card};
    border: 1px solid ${COLORS.border};
    border-radius: 10px;
    padding: 14px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .party-avatar {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 800;
    flex-shrink: 0;
  }
  .party-avatar.introducer {
    background: ${COLORS.accentGlow};
    border: 1px solid ${COLORS.accent}44;
    color: ${COLORS.accent};
  }
  .party-avatar.target {
    background: ${COLORS.greenGlow};
    border: 1px solid ${COLORS.green}44;
    color: ${COLORS.green};
  }
  .party-role {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    color: ${COLORS.muted};
  }
  .party-name {
    font-size: 13px;
    font-weight: 700;
    margin-top: 1px;
  }

  /* ── Snapshot reference ── */
  .snapshot-ref {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    background: ${COLORS.surface};
    border: 1px solid ${COLORS.border};
    border-radius: 8px;
    margin-bottom: 16px;
    font-size: 11px;
    font-family: 'DM Mono', monospace;
    color: ${COLORS.muted};
  }
  .snapshot-ref-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${COLORS.green};
    box-shadow: 0 0 6px ${COLORS.green};
    flex-shrink: 0;
  }
  .snapshot-ref-id { color: ${COLORS.accent}; }

  /* ── Next step form ── */
  .step-card {
    background: ${COLORS.card};
    border: 1px solid ${COLORS.border};
    border-radius: 14px;
    padding: 22px 20px;
    margin-bottom: 12px;
  }
  .step-section-title {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: ${COLORS.muted};
    margin-bottom: 14px;
    padding-bottom: 8px;
    border-bottom: 1px solid ${COLORS.border};
  }

  .field-group { margin-bottom: 18px; }
  .field-group:last-child { margin-bottom: 0; }
  .field-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    color: ${COLORS.muted};
    margin-bottom: 8px;
  }
  .field-required {
    font-size: 10px;
    color: ${COLORS.accent};
    letter-spacing: 0;
    text-transform: none;
    font-weight: 500;
  }
  .field-input {
    width: 100%;
    padding: 11px 14px;
    background: ${COLORS.surface};
    border: 1px solid ${COLORS.border};
    border-radius: 8px;
    color: ${COLORS.text};
    font-family: 'Syne', sans-serif;
    font-size: 14px;
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
    min-height: 44px;
  }
  .field-input:focus {
    border-color: ${COLORS.accent};
    box-shadow: 0 0 0 3px ${COLORS.accentGlow};
  }
  .field-input::placeholder { color: ${COLORS.muted}; }
  .field-textarea {
    width: 100%;
    padding: 11px 14px;
    background: ${COLORS.surface};
    border: 1px solid ${COLORS.border};
    border-radius: 8px;
    color: ${COLORS.text};
    font-family: 'Syne', sans-serif;
    font-size: 14px;
    outline: none;
    resize: vertical;
    min-height: 80px;
    line-height: 1.5;
    transition: border-color 0.15s, box-shadow 0.15s;
  }
  .field-textarea:focus {
    border-color: ${COLORS.accent};
    box-shadow: 0 0 0 3px ${COLORS.accentGlow};
  }
  .field-textarea::placeholder { color: ${COLORS.muted}; }

  /* ── Option chips (next step type) ── */
  .option-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .option-chip {
    padding: 9px 16px;
    border-radius: 8px;
    border: 1px solid ${COLORS.border};
    background: ${COLORS.surface};
    color: ${COLORS.muted};
    font-family: 'Syne', sans-serif;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s;
    min-height: 40px;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .option-chip:hover { border-color: ${COLORS.subtle}; color: ${COLORS.text}; }
  .option-chip.selected {
    background: ${COLORS.accentGlow};
    border-color: ${COLORS.accent}44;
    color: ${COLORS.accent};
  }

  /* ── Consequence block (D-014 #4) ── */
  .consequence-block {
    background: ${COLORS.surface};
    border: 1px solid ${COLORS.border};
    border-radius: 10px;
    padding: 14px 16px;
    margin-bottom: 16px;
  }
  .consequence-title {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: ${COLORS.yellow};
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .consequence-row {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 8px;
  }
  .consequence-row:last-child { margin-bottom: 0; }
  .consequence-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${COLORS.accent};
    flex-shrink: 0;
    margin-top: 5px;
  }
  .consequence-text {
    font-size: 12px;
    color: ${COLORS.muted};
    line-height: 1.5;
  }
  .consequence-text strong { color: ${COLORS.text}; font-weight: 600; }

  /* ── Primary CTA ── */
  .btn-propose {
    width: 100%;
    padding: 15px 24px;
    border-radius: 10px;
    border: none;
    background: ${COLORS.accent};
    color: white;
    font-family: 'Syne', sans-serif;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: background 0.15s, box-shadow 0.15s, transform 0.1s;
    min-height: 52px;
    box-shadow: 0 0 24px ${COLORS.accentGlow};
  }
  .btn-propose:not(:disabled):hover {
    background: ${COLORS.accentHover};
    box-shadow: 0 0 36px ${COLORS.accentGlow};
    transform: translateY(-1px);
  }
  .btn-propose:not(:disabled):active { transform: translateY(0); }
  .btn-propose:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
  .btn-hint {
    font-size: 12px;
    color: ${COLORS.muted};
    text-align: center;
    margin-top: 10px;
    line-height: 1.5;
  }

  /* ── Spinner ── */
  .spinner {
    width: 18px;
    height: 18px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    flex-shrink: 0;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* ── Success state ── */
  .success-icon-wrap {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: ${COLORS.greenGlow};
    border: 1px solid ${COLORS.green}44;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
    animation: pop-in 0.4s cubic-bezier(0.34,1.56,0.64,1) both;
  }
  @keyframes pop-in {
    from { transform: scale(0.5); opacity: 0; }
    to   { transform: scale(1);   opacity: 1; }
  }
  .success-heading {
    font-size: 20px;
    font-weight: 800;
    text-align: center;
    color: ${COLORS.green};
    margin-bottom: 8px;
    letter-spacing: -0.3px;
  }
  .success-body {
    font-size: 13px;
    color: ${COLORS.muted};
    text-align: center;
    line-height: 1.6;
    margin-bottom: 20px;
  }

  /* ── Receipt block ── */
  .receipt-block {
    background: ${COLORS.surface};
    border: 1px solid ${COLORS.border};
    border-radius: 10px;
    padding: 14px 16px;
    margin-bottom: 16px;
  }
  .receipt-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    font-size: 12px;
    padding: 6px 0;
    border-bottom: 1px solid ${COLORS.border}66;
    gap: 12px;
  }
  .receipt-row:last-child { border-bottom: none; }
  .receipt-label { color: ${COLORS.muted}; flex-shrink: 0; }
  .receipt-value {
    font-family: 'DM Mono', monospace;
    color: ${COLORS.text};
    font-weight: 500;
    text-align: right;
    word-break: break-word;
  }
  .receipt-divider { height: 1px; background: ${COLORS.border}; margin: 4px 0; }

  /* ── Timeline added note ── */
  .timeline-note {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 14px;
    font-size: 12px;
    color: ${COLORS.muted};
  }
  .timeline-note-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${COLORS.green};
    box-shadow: 0 0 6px ${COLORS.green};
  }

  @media (max-width: 480px) {
    .mc-header { padding: 16px; }
    .step-card { padding: 16px; }
    .parties-strip { flex-direction: column; }
  }
`;

// ── Icons ─────────────────────────────────────────────────────────────────
function IconCheck({ size = 28, color = "#00e5a0" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function IconArrowRight({ size = 16, color = "white" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

// ── Types ─────────────────────────────────────────────────────────────────
type UIState = "form" | "submitting" | "success";
type StepType = "follow_up_call" | "send_proposal" | "intro_meeting" | "share_materials" | "other";

interface ContinuationData {
  stepType: StepType | null;
  description: string;
  deadline: string;
  owner: "introducer" | "target" | "both";
}

// ── Mock data ─────────────────────────────────────────────────────────────
function getMockIntro(id: string) {
  return {
    snapshot_id: `snp_${id}`,
    introducer: { name: "Sarah Chen", initials: "SC" },
    target: { name: "Alex Johnson", initials: "AJ" },
    state: "INTRO_CONFIRMED",
    confirmed_at: "Mar 3, 2026",
  };
}

const STEP_TYPES: { key: StepType; label: string; icon: string }[] = [
  { key: "follow_up_call", label: "Follow-up call", icon: "☎" },
  { key: "send_proposal", label: "Send proposal", icon: "◈" },
  { key: "intro_meeting", label: "Intro meeting", icon: "◇" },
  { key: "share_materials", label: "Share materials", icon: "⊞" },
  { key: "other", label: "Other", icon: "⋯" },
];

const OWNER_OPTIONS: { key: "introducer" | "target" | "both"; label: string }[] = [
  { key: "introducer", label: "Introducer" },
  { key: "target", label: "Target" },
  { key: "both", label: "Both parties" },
];

function formatNow(): string {
  return new Date().toLocaleString("en-US", {
    month: "short", day: "numeric", year: "numeric",
    hour: "numeric", minute: "2-digit", timeZoneName: "short",
  });
}

// ── Component ─────────────────────────────────────────────────────────────
interface PageProps {
  params: Promise<{ id: string }>;
}

export default function MutualContinuationPage({ params }: PageProps) {
  const { id } = use(params);
  const intro = getMockIntro(id);

  const [uiState, setUiState] = useState<UIState>("form");
  const [form, setForm] = useState<ContinuationData>({
    stepType: null,
    description: "",
    deadline: "",
    owner: "both",
  });

  const canSubmit = form.stepType !== null && form.description.trim().length > 0;

  async function handleSubmit() {
    if (!canSubmit) return;
    setUiState("submitting");

    // Simulate API call — real endpoint TBD
    await new Promise((r) => setTimeout(r, 1200));
    setUiState("success");
  }

  return (
    <>
      <style>{styles}</style>
      <main className="mc-page">
        <div className="mc-shell">

          {/* Topbar */}
          <div className="mc-topbar">
            <div className="mc-wordmark">
              <div className="wordmark-mark">TF</div>
              <div className="wordmark-text">True<span>ferral</span></div>
            </div>
          </div>

          {/* ── FORM STATE ── */}
          {(uiState === "form" || uiState === "submitting") && (
            <>
              {/* Header */}
              <div className="mc-header">
                <div className="mc-header-label">Mutual continuation</div>
                <div className="mc-header-title">
                  Agree on the <span>next step</span>
                </div>
                <div className="mc-header-sub">
                  Both parties define what happens after the introduction. This becomes an immutable record in the timeline.
                </div>
              </div>

              {/* Parties */}
              <div className="parties-strip">
                <div className="party-chip">
                  <div className="party-avatar introducer">{intro.introducer.initials}</div>
                  <div>
                    <div className="party-role">Introducer</div>
                    <div className="party-name">{intro.introducer.name}</div>
                  </div>
                </div>
                <div className="party-chip">
                  <div className="party-avatar target">{intro.target.initials}</div>
                  <div>
                    <div className="party-role">Target</div>
                    <div className="party-name">{intro.target.name}</div>
                  </div>
                </div>
              </div>

              {/* Snapshot reference */}
              <div className="snapshot-ref">
                <div className="snapshot-ref-dot" />
                <span>Linked to <span className="snapshot-ref-id">{intro.snapshot_id}</span> · Confirmed {intro.confirmed_at}</span>
              </div>

              {/* Step type selection */}
              <div className="step-card">
                <div className="step-section-title">What is the next step?</div>
                <div className="field-group">
                  <div className="field-label">
                    Type of action
                    <span className="field-required">Required</span>
                  </div>
                  <div className="option-chips">
                    {STEP_TYPES.map((st) => (
                      <button
                        key={st.key}
                        className={`option-chip${form.stepType === st.key ? " selected" : ""}`}
                        onClick={() => setForm((p) => ({ ...p, stepType: st.key }))}
                        disabled={uiState === "submitting"}
                      >
                        <span>{st.icon}</span>
                        {st.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="step-card">
                <div className="step-section-title">Details</div>

                <div className="field-group">
                  <div className="field-label">
                    Describe the next step
                    <span className="field-required">Required</span>
                  </div>
                  <textarea
                    className="field-textarea"
                    placeholder="What specifically needs to happen next?"
                    value={form.description}
                    onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                    disabled={uiState === "submitting"}
                    maxLength={500}
                  />
                </div>

                <div className="field-group">
                  <div className="field-label">
                    Target deadline
                  </div>
                  <input
                    className="field-input"
                    type="date"
                    value={form.deadline}
                    onChange={(e) => setForm((p) => ({ ...p, deadline: e.target.value }))}
                    disabled={uiState === "submitting"}
                  />
                </div>

                <div className="field-group">
                  <div className="field-label">Who owns this action?</div>
                  <div className="option-chips">
                    {OWNER_OPTIONS.map((o) => (
                      <button
                        key={o.key}
                        className={`option-chip${form.owner === o.key ? " selected" : ""}`}
                        onClick={() => setForm((p) => ({ ...p, owner: o.key }))}
                        disabled={uiState === "submitting"}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Consequence clarity (D-014 #4) */}
              <div className="consequence-block">
                <div className="consequence-title">What happens when you propose</div>
                <div className="consequence-row">
                  <div className="consequence-dot" />
                  <div className="consequence-text"><strong>Both parties notified</strong> — the other party must agree before the step is locked</div>
                </div>
                <div className="consequence-row">
                  <div className="consequence-dot" />
                  <div className="consequence-text"><strong>Added to timeline</strong> — this becomes a permanent event in the introduction record</div>
                </div>
                <div className="consequence-row">
                  <div className="consequence-dot" />
                  <div className="consequence-text"><strong>Immutable once agreed</strong> — the agreed next step cannot be edited or deleted</div>
                </div>
              </div>

              {/* CTA */}
              <button
                className="btn-propose"
                onClick={handleSubmit}
                disabled={!canSubmit || uiState === "submitting"}
              >
                {uiState === "submitting"
                  ? <><div className="spinner" /> Proposing next step…</>
                  : <><IconArrowRight size={16} /> Propose next step</>
                }
              </button>
              <p className="btn-hint">
                The other party will be asked to agree before this is finalized.
              </p>
            </>
          )}

          {/* ── SUCCESS STATE ── */}
          {uiState === "success" && (
            <>
              <div className="step-card">
                <div className="success-icon-wrap">
                  <IconCheck size={30} color={COLORS.green} />
                </div>
                <div className="success-heading">Next step proposed</div>
                <div className="success-body">
                  Your proposed next step has been sent to {intro.target.name} for agreement. Once both parties agree, it will be locked into the timeline.
                </div>

                <div className="receipt-block">
                  <div className="receipt-row">
                    <span className="receipt-label">Snapshot</span>
                    <span className="receipt-value" style={{ color: COLORS.accent }}>{intro.snapshot_id}</span>
                  </div>
                  <div className="receipt-divider" />
                  <div className="receipt-row">
                    <span className="receipt-label">Next step</span>
                    <span className="receipt-value" style={{ fontFamily: "Syne", fontSize: 12 }}>
                      {STEP_TYPES.find((s) => s.key === form.stepType)?.label}
                    </span>
                  </div>
                  <div className="receipt-row">
                    <span className="receipt-label">Description</span>
                    <span className="receipt-value" style={{ fontFamily: "Syne", fontSize: 12 }}>
                      {form.description}
                    </span>
                  </div>
                  {form.deadline && (
                    <div className="receipt-row">
                      <span className="receipt-label">Deadline</span>
                      <span className="receipt-value">{form.deadline}</span>
                    </div>
                  )}
                  <div className="receipt-row">
                    <span className="receipt-label">Owner</span>
                    <span className="receipt-value">
                      {OWNER_OPTIONS.find((o) => o.key === form.owner)?.label}
                    </span>
                  </div>
                  <div className="receipt-divider" />
                  <div className="receipt-row">
                    <span className="receipt-label">State</span>
                    <span className="receipt-value" style={{ color: COLORS.yellow }}>AWAITING_AGREEMENT</span>
                  </div>
                  <div className="receipt-row">
                    <span className="receipt-label">Proposed at</span>
                    <span className="receipt-value">{formatNow()}</span>
                  </div>
                </div>
              </div>

              <div className="timeline-note">
                <div className="timeline-note-dot" />
                <span>This event will appear in the verified outcome timeline once agreed</span>
              </div>
            </>
          )}

        </div>
      </main>
    </>
  );
}

"""
D-011 — GET /v1/actions/pending
Returns the most important pending action per active relationship.
Sort: urgency DESC, due_date ASC. Max 20 items. Auth required.

Build instruction: Add this router to src/introflow/api/routes.py (or equivalent
FastAPI app entrypoint) with:
    from introflow.api.actions import router as actions_router
    app.include_router(actions_router)
"""

from __future__ import annotations

from datetime import date, timedelta
from enum import Enum
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel

# ---------------------------------------------------------------------------
# Adjust these imports to match your project's auth + DB session patterns.
# The shapes below mirror the mock data already in /queue/page.tsx exactly.
# ---------------------------------------------------------------------------
# from introflow.auth import get_current_user, CurrentUser
# from introflow.db import get_db
# from sqlalchemy.orm import Session

router = APIRouter(prefix="/v1", tags=["actions"])

# ---------------------------------------------------------------------------
# Enums — mirror the action types defined in the handover doc + queue mock
# ---------------------------------------------------------------------------

class ActionType(str, Enum):
    confirm = "confirm"
    outcome = "outcome"
    overdue = "overdue"
    pending = "pending"


class Urgency(int, Enum):
    critical = 3   # overdue / expiring today
    high = 2       # due within 3 days
    normal = 1     # due within 7 days
    low = 0        # informational


class DueColor(str, Enum):
    red = "red"       # overdue
    yellow = "yellow" # due soon
    green = "green"   # on track


# ---------------------------------------------------------------------------
# Response shape — must match /queue/page.tsx mock data exactly (D-011 spec)
# ---------------------------------------------------------------------------

class RelationshipSummary(BaseModel):
    id: str
    label: str       # e.g. "Sarah Chen → Alex Johnson"
    role: str        # "introducer" | "counterparty" | "target"


class PendingAction(BaseModel):
    id: str
    type: ActionType
    urgency: int                  # 0–3 — used for sort
    title: str
    description: str
    relationship: RelationshipSummary
    snapshot_id: str
    due: str                      # ISO date string e.g. "2026-03-15"
    dueColor: DueColor
    ctaLabel: str


class PendingActionsResponse(BaseModel):
    actions: list[PendingAction]
    total: int


# ---------------------------------------------------------------------------
# Helper — compute urgency + dueColor from a due date
# ---------------------------------------------------------------------------

def _urgency_for(due_date: date, action_type: ActionType) -> tuple[int, DueColor]:
    today = date.today()
    delta = (due_date - today).days

    if action_type == ActionType.overdue or delta < 0:
        return Urgency.critical, DueColor.red
    elif delta <= 3:
        return Urgency.high, DueColor.yellow
    elif delta <= 7:
        return Urgency.normal, DueColor.green
    else:
        return Urgency.low, DueColor.green


# ---------------------------------------------------------------------------
# Query helpers — replace with real DB queries against your Event Log
# ---------------------------------------------------------------------------

def _query_pending_actions(user_id: str) -> list[PendingAction]:
    """
    Replace this stub with real queries against the Event Log / snapshot tables.

    Logic to implement:
    - confirm:  snapshots in TOKEN_ISSUED state where current user is counterparty
    - outcome:  snapshots in OUTCOME_PENDING state where outcome window is open
    - overdue:  snapshots in OUTCOME_PENDING where window has closed, no submission
    - pending:  new intro requests awaiting current user's review

    Each snapshot should produce at most ONE action item (the most urgent).
    Max 20 items returned, sorted urgency DESC then due_date ASC.
    """
    # TODO: replace with real DB queries
    # Example pattern:
    #
    # from introflow.domain.models import IntroSnapshot, EventLog
    # snapshots = (
    #     db.query(IntroSnapshot)
    #     .filter(IntroSnapshot.involved_user_id == user_id)
    #     .filter(IntroSnapshot.state.in_([
    #         "TOKEN_ISSUED", "OUTCOME_PENDING", "INTRO_CONFIRMED"
    #     ]))
    #     .all()
    # )
    # actions = []
    # for snap in snapshots:
    #     action = _snap_to_action(snap, user_id)
    #     if action:
    #         actions.append(action)
    # return sorted(actions, key=lambda a: (-a.urgency, a.due))[:20]

    raise NotImplementedError(
        "D-011: Replace _query_pending_actions with real DB queries. "
        "See comments above for the query pattern."
    )


# ---------------------------------------------------------------------------
# Route
# ---------------------------------------------------------------------------

@router.get(
    "/actions/pending",
    response_model=PendingActionsResponse,
    summary="Get pending actions for authenticated user (D-011)",
    description=(
        "Returns up to 20 pending actions for the authenticated user, "
        "sorted by urgency DESC then due_date ASC. "
        "Action types: confirm, outcome, overdue, pending."
    ),
)
async def get_pending_actions(
    # Uncomment when auth is wired:
    # current_user: CurrentUser = Depends(get_current_user),
    # db: Session = Depends(get_db),
):
    """
    D-011 endpoint. Wire to the Action Queue UI by replacing the mock import
    in frontend/src/app/queue/page.tsx with a fetch to this endpoint.

    Steps to complete wiring:
    1. Implement _query_pending_actions() with real DB queries (see comments)
    2. Uncomment auth + db dependencies above
    3. Replace mock data import in /queue/page.tsx with:
           const res = await fetch('/v1/actions/pending', { credentials: 'include' });
           const { actions } = await res.json();
    4. Run doctor.py + pytest — 66 must still pass
    5. Commit: "api: GET /v1/actions/pending (D-011)"
    """
    # TODO: replace with: user_id = current_user.id
    user_id = "placeholder"

    try:
        actions = _query_pending_actions(user_id)
    except NotImplementedError as exc:
        # During development: return clear 501 so the UI can detect stub state
        raise HTTPException(
            status_code=status.HTTP_501_NOT_IMPLEMENTED,
            detail=str(exc),
        )

    return PendingActionsResponse(actions=actions, total=len(actions))
# Research: Rescue-Grid Monitoring

## Decision
The system will use a three-state health model for each device: `healthy`, `degraded`, and `unavailable`. Each device emits a heartbeat or status update, the backend evaluates the time since the last valid report, and the operator view resolves the current state against a default timeout window.

## Rationale
This model matches the operational need described in the feature spec: operators must quickly distinguish between normal operation, suspiciously stale data, and a true outage. A three-state model is both precise enough for response planning and simple enough to maintain across the Arduino, backend, and admin layers.

## Alternatives considered
- Binary online/offline only: rejected because it does not capture degraded or recovering states and would reduce the usefulness of early-warning workflows.
- Polling-only checks from the frontend: rejected because it hides the true source of truth from the backend and makes device status less reliable in intermittent connectivity conditions.
- No historical tracking: rejected because the feature explicitly requires review of recent device behavior during disruption analysis.

## Resolved unknowns
- Heartbeat window: default to a single operational threshold where a device is considered degraded after a short missed interval and unavailable after a longer miss; these thresholds can be tuned by environment without changing the general contract.
- Alerting behavior: alerts are raised when a device transitions into `degraded` or `unavailable`, and cleared when it returns to `healthy` after a valid update.
- Data retention: recent status history is retained for operational review and incident investigation, with a lightweight time-based retention policy for early deployments.

## Contract-level guidance
The device-to-backend message must include a stable device identity, timestamp, and current status category. The backend must normalize timestamps and maintain the latest state for each device while preserving event history for auditing and operator review.

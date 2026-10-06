# Data Model: Rescue-Grid Monitoring

## Core Entities

### Device
Represents a deployed field device or rescue asset.

| Field | Type | Description | Constraints |
|-------|------|-------------|------------|
| id | string | Stable unique identifier for the device | Required |
| name | string | Human-readable device label | Required |
| status | enum | `healthy`, `degraded`, `unavailable` | Required |
| lastSeenAt | datetime | Most recent valid heartbeat or status timestamp | Required |
| heartbeatIntervalSeconds | integer | Expected reporting interval | Required, > 0 |
| location | string | Human-readable or structured site label | Optional |
| updatedAt | datetime | Last state change or refresh time | Required |

### DeviceStatusEvent
Represents a state transition or status update from a device.

| Field | Type | Description | Constraints |
|-------|------|-------------|------------|
| id | string | Unique event identifier | Required |
| deviceId | string | Related device identity | Required |
| status | enum | `healthy`, `degraded`, `unavailable` | Required |
| observedAt | datetime | When the status was received | Required |
| source | string | Field device, backend validation, or operator action | Required |
| details | string | Short context for the event | Optional |

### Alert
Represents a degraded or unavailable device condition requiring operator attention.

| Field | Type | Description | Constraints |
|-------|------|-------------|------------|
| id | string | Unique alert identifier | Required |
| deviceId | string | Affected device | Required |
| severity | enum | `warning`, `critical` | Required |
| status | enum | `active`, `resolved` | Required |
| createdAt | datetime | When the alert was raised | Required |
| resolvedAt | datetime | When the alert was cleared | Optional |
| reason | string | Why the alert was raised | Required |

## Relationships
- A `Device` has many `DeviceStatusEvent` records.
- A `Device` may have zero or more `Alert` records over time.
- The latest `DeviceStatusEvent` determines the current device status for the operator view.

## Validation Rules
- A device status must be one of the supported operational states.
- A status event must include a valid timestamp and device reference.
- A device cannot be marked healthy without a fresh valid status update.
- Alert creation occurs when a device status becomes `degraded` or `unavailable` and is cleared when it returns to `healthy`.

## State transitions
- `healthy` -> `degraded` when the device misses its expected heartbeat window but still reports eventually.
- `healthy` -> `unavailable` when the device remains silent beyond the critical threshold.
- `degraded` -> `healthy` when a valid status update arrives again.
- `unavailable` -> `healthy` after recovery and validation.
- `degraded` -> `unavailable` if the device remains silent and the risk worsens.

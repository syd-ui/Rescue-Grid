# Device Status Contract

## Overview
This contract defines the minimum payload and state model for device-to-backend communication used by the Rescue-Grid monitoring feature.

## Endpoint: POST /api/devices/:deviceId/status

### Request body
```json
{
  "deviceId": "device-001",
  "status": "healthy",
  "timestamp": "2026-10-06T12:00:00Z",
  "details": "Routine heartbeat"
}
```

### Required fields
- `deviceId`: stable identifier for the field device
- `status`: one of `healthy`, `degraded`, or `unavailable`
- `timestamp`: ISO-8601 timestamp for the observation
- `details`: optional short context for operator review

### Response
```json
{
  "status": "accepted",
  "deviceId": "device-001",
  "currentStatus": "healthy",
  "lastSeenAt": "2026-10-06T12:00:00Z"
}
```

### Validation rules
- Missing or invalid identifiers are rejected.
- Invalid timestamps or unsupported status values are rejected.
- Duplicate or stale events are normalized to the latest valid state.

## Endpoint: GET /api/devices

### Response
```json
[
  {
    "id": "device-001",
    "name": "North Ridge Sensor",
    "status": "healthy",
    "lastSeenAt": "2026-10-06T12:00:00Z",
    "heartbeatIntervalSeconds": 60
  }
]
```

### Notes
The admin dashboard consumes this contract to render operational health and operator-visible alert state without coupling directly to device-specific implementation details.

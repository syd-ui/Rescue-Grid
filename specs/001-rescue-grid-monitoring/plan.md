# Implementation Plan: Rescue-Grid Monitoring

**Branch**: `001-rescue-grid-monitoring` | **Date**: 2026-10-06 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/001-rescue-grid-monitoring/spec.md`

## Summary
The monitoring feature establishes a consistent operational status flow across the Rescue-Grid ecosystem: field devices report health and heartbeat signals, the backend validates and persists those signals, and the admin interface presents live and historical device status for operators. The design emphasizes explicit contracts, clear alert thresholds, and verifiable operational states to support emergency response decisions.

## Technical Context

**Language/Version**: Node.js runtime for backend services, Angular 21 for the admin interface, Arduino C++ via PlatformIO for embedded devices

**Primary Dependencies**: Express for HTTP services, Angular router and components for the monitoring dashboard, Arduino WiFi and HTTPClient libraries for device communication

**Storage**: Lightweight state persistence for device records and status history, with a structure that can evolve to a persistent database without changing the core status model

**Testing**: API verification for heartbeat ingestion and alert evaluation, Angular component checks for monitoring views, and device simulation checks for connectivity and recovery behavior

**Target Platform**: Linux-based development environment, browser-based admin console, and connected embedded devices in the field

**Project Type**: web-service + embedded telemetry + admin dashboard

**Performance Goals**: status refresh and alert evaluation should be visible to operators within seconds of a new heartbeat or missed timeout; the system should remain responsive for a modest number of active field devices during early deployment

**Constraints**: unreliable network connectivity is expected; state transitions must be deterministic and recoverable after reconnect; sensitive status data and admin access must remain protected

**Scale/Scope**: early deployment targets a small-to-medium fleet of field devices with a manageable number of concurrent status updates and admin users

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Mission-Driven Delivery: PASS — the feature directly supports operational awareness and emergency response readiness.
- Contract Integrity Across Systems: PASS — explicit status and alert contracts are required between Arduino, backend, and admin interface.
- Verification Before Merge: PASS — heartbeat logic, timeout alerting, and UI status updates require direct validation.
- Secure, Least-Privilege Operations: PASS — the design keeps admin access and sensitive status data behind restricted access patterns and environment-based configuration.
- Simplicity and Maintainability: PASS — the design uses a simple status model and clear ownership boundaries across the three project layers.

No constitution violations require exceptions or complexity justifications.

## Project Structure

### Documentation (this feature)

```text
specs/001-rescue-grid-monitoring/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
├── spec.md              # Feature specification
└── checklists/
    └── requirements.md  # Spec validation checklist
```

### Source Code (repository root)

```text
arduino/
├── src/
│   └── main.cpp
├── include/
├── lib/
├── test/
├── platformio.ini
├── diagram.json
├── wokwi-projet.json
└── wokwi.toml

backend/
├── src/
│   ├── app.js
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── utils/
├── package.json
├── server.js
└── README

frontend/admin/
├── src/
│   ├── app/
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── angular.json
├── package.json
├── tsconfig.json
└── README.md
```

**Structure Decision**: This feature follows a hybrid architecture with a device telemetry path in the Arduino project, a service layer in the backend, and an operator-facing monitoring view in the Angular admin front end. All status, alert, and recovery logic belongs to a shared domain model even though implementation is split by system boundary.

## Complexity Tracking

No violations require justification under the current constitution.

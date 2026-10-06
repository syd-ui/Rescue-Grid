# Tasks: Rescue-Grid Monitoring

**Input**: Design documents from `/specs/001-rescue-grid-monitoring/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Shared monitoring structure and config for the device, backend, and admin layers

- [ ] T001 [P] Create the shared monitoring scaffolding and feature folders under `backend/src/`, `frontend/admin/src/app/monitoring/`, and `arduino/src/`
- [ ] T002 [P] Define the device heartbeat configuration and timeout thresholds in `backend/src/config/deviceMonitoring.js` and `backend/.env.example`
- [ ] T003 [P] Wire the monitoring module into existing app entry points in `backend/src/app.js`, `backend/server.js`, and `frontend/admin/src/app/app.routes.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core monitoring domain model and backend evaluation logic required before story-specific work

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T004 Create the `Device` and `DeviceStatusEvent` domain models with required fields and validation rules in `backend/src/models/device.js` and `backend/src/models/deviceStatusEvent.js`
- [ ] T005 [P] Create the alert model and state transitions in `backend/src/models/alert.js`
- [ ] T006 Implement the backend monitoring service that evaluates heartbeat freshness and status transitions in `backend/src/services/deviceMonitoringService.js`
- [ ] T007 [P] Implement the device ingestion route and controller for status updates in `backend/src/routes/deviceRoutes.js` and `backend/src/controllers/deviceController.js`
- [ ] T008 Add error handling, request validation, and logging around monitoring failures in `backend/src/utils/monitoringLogger.js` and `backend/src/middlewares/requestValidation.js`
- [ ] T009 [P] Create the admin monitoring shell and data contract bindings in `frontend/admin/src/app/monitoring/monitoring.ts` and `frontend/admin/src/app/monitoring/monitoring.html`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Monitor field device availability (Priority: P1) 🎯 MVP

**Goal**: Operators can view active device health and determine whether a field unit is currently healthy, degraded, or unavailable.

**Independent Test**: Verify that an operator opens the monitoring dashboard and sees the current state of each active device without manual checks.

### Implementation for User Story 1

- [ ] T010 [P] [US1] Implement the Arduino heartbeat payload and status transmission logic in `arduino/src/main.cpp`
- [ ] T011 [US1] Add backend persistence for the latest device status and last-seen timestamp in `backend/src/controllers/deviceController.js` and `backend/src/services/deviceMonitoringService.js`
- [ ] T012 [P] [US1] Render the live device list and status badges in `frontend/admin/src/app/monitoring/monitoring.html`
- [ ] T013 [US1] Connect the monitoring view to the device status API and update the UI state in `frontend/admin/src/app/monitoring/monitoring.ts`
- [ ] T014 [US1] Apply status label, color, and risk styling in `frontend/admin/src/app/monitoring/monitoring.css`
- [ ] T015 [US1] Add the device availability fallback behavior for stale or missing heartbeats in `backend/src/services/deviceMonitoringService.js`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Receive early warnings for degraded coverage (Priority: P2)

**Goal**: Operators receive clear alerting when a device has missed its expected heartbeat or shows degraded coverage.

**Independent Test**: Simulate a missed heartbeat and confirm the system raises an active alert and clears it after recovery.

### Implementation for User Story 2

- [ ] T016 [P] [US2] Implement degraded and unavailable thresholds and state transitions in `backend/src/services/deviceMonitoringService.js`
- [ ] T017 [US2] Create alert creation and resolution logic in `backend/src/services/alertService.js`
- [ ] T018 [P] [US2] Expose active alert data in `backend/src/routes/alertRoutes.js` and `backend/src/controllers/alertController.js`
- [ ] T019 [US2] Add alert rendering and recovery state handling in `frontend/admin/src/app/monitoring/monitoring.html` and `frontend/admin/src/app/monitoring/monitoring.ts`
- [ ] T020 [US2] Ensure alert severity matches `warning` and `critical` states described in the data model in `backend/src/models/alert.js`

**Checkpoint**: At this point, User Stories 1 and 2 should both work independently

---

## Phase 5: User Story 3 - Review operational history for response planning (Priority: P3)

**Goal**: Administrators can review status history and recent transitions to explain outages and assess operational recovery.

**Independent Test**: Create a device history timeline and confirm the sequence of healthy, degraded, and recovered states is visible over time.

### Implementation for User Story 3

- [ ] T021 [P] [US3] Implement history storage and retrieval for `DeviceStatusEvent` records in `backend/src/models/deviceStatusEvent.js` and `backend/src/services/historyService.js`
- [ ] T022 [US3] Expose a status history endpoint in `backend/src/routes/deviceHistoryRoutes.js` and `backend/src/controllers/historyController.js`
- [ ] T023 [P] [US3] Build the historical timeline view in `frontend/admin/src/app/monitoring/history.html` and `frontend/admin/src/app/monitoring/history.ts`
- [ ] T024 [US3] Add filtering and summary logic for recent outages and recovery windows in `frontend/admin/src/app/monitoring/history.ts`

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final validation, documentation, and quality checks across the whole feature

- [ ] T025 [P] Update the operational validation guidance in `specs/001-rescue-grid-monitoring/quickstart.md` and `README.md`
- [ ] T026 Review the full monitoring flow for security, status integrity, and recovery behavior across `arduino/src/main.cpp`, `backend/src/`, and `frontend/admin/src/app/monitoring/`
- [ ] T027 Run the end-to-end heartbeat, alerting, and recovery validation scenarios defined in `specs/001-rescue-grid-monitoring/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational completion
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational completion and is the MVP
- **User Story 2 (P2)**: Can start after Foundational completion and depends on device health logic but should remain independently testable
- **User Story 3 (P3)**: Can start after Foundational completion and uses the same device status model but should be independently testable

### Parallel Opportunities

- Setup tasks T001-T003 can run simultaneously
- Foundational tasks T005, T007, T009 can run in parallel after setup
- User Story 1 tasks T010, T012, T014 can be worked in parallel where appropriate
- User Story 2 tasks T016, T018 can run in parallel
- User Story 3 tasks T021 and T023 can run in parallel
- Final polish tasks T025 and T027 are independent once all stories are complete

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. Validate the dashboard and backend health checks independently
5. Stop and confirm operators can assess active device state before continuing to alerts or history

### Incremental Delivery

1. Setup + Foundational → shared model and backend evaluation ready
2. User Story 1 → live device monitoring available
3. User Story 2 → alerting for degraded and missing devices
4. User Story 3 → historical review and post-incident investigation
5. Final polish → quickstart verification and documentation updates

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is complete:
   - Developer A: User Story 1 (device status and dashboard)
   - Developer B: User Story 2 (alerts and recovery)
   - Developer C: User Story 3 (history and timeline)
3. Final polish is shared across all stories

---

## Notes

- [P] tasks = different files, no dependency on incomplete tasks
- [Story] label maps each task to a specific user story for traceability
- Each story remains independently completable and testable
- Use the status model from the data model and the contract in `specs/001-rescue-grid-monitoring/contracts/device-status-contract.md` as the implementation source of truth
- Validate all tasks against the structure and path requirements before implementation begins

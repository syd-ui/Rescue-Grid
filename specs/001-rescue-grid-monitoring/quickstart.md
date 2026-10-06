# Quickstart: Rescue-Grid Monitoring Validation

## Purpose
This guide describes the minimum verification scenarios that prove the monitoring feature works end-to-end for the rescue operations workflow.

## Prerequisites
- Backend service running in a local environment
- Device simulator or test client able to send heartbeat payloads
- Admin interface available in a browser

## Validation Scenarios

### 1. Healthy device registration
1. Start the backend service.
2. Send a valid heartbeat from a device with a known identifier.
3. Open the monitoring dashboard.
4. Confirm the device appears in the list and shows a healthy state with a recent timestamp.

Expected outcome: the device is visible and shows a healthy operational state.

### 2. Missed heartbeat warning
1. Send a healthy heartbeat and wait beyond the degraded threshold.
2. Refresh the monitoring view.
3. Confirm the device status changes from healthy to degraded or unavailable depending on the threshold.

Expected outcome: an operator sees the device at risk before it is considered fully offline.

### 3. Alert resolution after recovery
1. Trigger an alert by missing heartbeats beyond the timeout window.
2. Send a fresh valid heartbeat from the same device.
3. Refresh the dashboard.

Expected outcome: the alert is cleared or downgraded and the device returns to a healthy state.

### 4. Historical review
1. Trigger at least two status transitions for a device.
2. Open the device history view.
3. Confirm the timeline shows the transition sequence and timestamps.

Expected outcome: operators can understand what changed and when the disruption occurred.

## Evidence to capture
- Device status shown in monitoring view
- Alert created for missing heartbeat condition
- Status history timeline for the affected device
- Recovery state after renewed heartbeat receipt

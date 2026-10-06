const { heartbeatIntervalSeconds, degradedThresholdSeconds, unavailableThresholdSeconds } = require('../config/deviceMonitoring');
const { createDevice } = require('../models/device');
const { createDeviceStatusEvent } = require('../models/deviceStatusEvent');
const { createAlert } = require('../models/alert');

const devices = new Map();
const historyByDevice = new Map();
const alertsByDevice = new Map();

function evaluateDeviceStatus(device, now = Date.now()) {
  const lastSeenAt = Number(device.lastSeenAt || now);
  const intervalSeconds = Number(device.heartbeatIntervalSeconds || heartbeatIntervalSeconds);
  const elapsedSeconds = (now - lastSeenAt) / 1000;

  if (elapsedSeconds <= intervalSeconds * 1.5) {
    return 'healthy';
  }

  if (elapsedSeconds <= degradedThresholdSeconds || elapsedSeconds <= intervalSeconds * 3) {
    return 'degraded';
  }

  return 'unavailable';
}

function createOrUpdateDevice(deviceMap, payload = {}) {
  const id = String(payload.id || payload.deviceId || 'unknown-device');
  const existing = deviceMap.get(id) || {};
  const now = Date.now();
  const intervalSeconds = Number(payload.heartbeatIntervalSeconds || existing.heartbeatIntervalSeconds || heartbeatIntervalSeconds);
  const lastSeenAt = Number(payload.lastSeenAt || existing.lastSeenAt || now);

  const status = payload.status || evaluateDeviceStatus({
    ...existing,
    heartbeatIntervalSeconds: intervalSeconds,
    lastSeenAt
  }, now);

  const nextDevice = createDevice({
    id,
    name: payload.name || existing.name || id,
    status,
    lastSeenAt,
    heartbeatIntervalSeconds: intervalSeconds
  });

  deviceMap.set(id, nextDevice);
  return nextDevice;
}

function recordDeviceStatus(payload = {}) {
  const now = Date.now();
  const deviceId = String(payload.deviceId || payload.id || 'unknown-device');
  const timestamp = Number(payload.timestamp || payload.lastSeenAt || now);
  const intervalSeconds = Number(payload.heartbeatIntervalSeconds || heartbeatIntervalSeconds);

  const normalizedDevice = createOrUpdateDevice(devices, {
    id: deviceId,
    name: payload.name || deviceId,
    status: payload.status || 'healthy',
    lastSeenAt: timestamp,
    heartbeatIntervalSeconds: intervalSeconds
  });

  const nextStatus = evaluateDeviceStatus(normalizedDevice, now);
  const latestDevice = { ...normalizedDevice, status: nextStatus, updatedAt: now };
  devices.set(deviceId, latestDevice);

  const event = createDeviceStatusEvent({
    deviceId,
    status: nextStatus,
    observedAt: timestamp,
    source: payload.source || 'device',
    details: payload.details || 'Heartbeat received'
  });

  const history = historyByDevice.get(deviceId) || [];
  history.push(event);
  if (history.length > 50) {
    history.shift();
  }
  historyByDevice.set(deviceId, history);

  if (nextStatus === 'healthy') {
    const alert = alertsByDevice.get(deviceId);
    if (alert && alert.status === 'active') {
      const cleared = { ...alert, status: 'resolved', resolvedAt: now };
      alertsByDevice.set(deviceId, cleared);
    }
    return latestDevice;
  }

  const severity = nextStatus === 'unavailable' ? 'critical' : 'warning';
  const reason = nextStatus === 'unavailable'
    ? 'Device has not reported within the unavailable timeout window.'
    : 'Device has not reported within the degraded timeout window.';

  const alert = createAlert({
    deviceId,
    severity,
    status: 'active',
    reason,
    createdAt: now
  });

  alertsByDevice.set(deviceId, alert);
  return latestDevice;
}

function listDevices() {
  return Array.from(devices.values())
    .map((device) => ({
      ...device,
      status: evaluateDeviceStatus(device, Date.now())
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

function getDeviceHistory(deviceId) {
  const history = historyByDevice.get(String(deviceId)) || [];
  return history.slice().sort((a, b) => a.observedAt - b.observedAt);
}

function getActiveAlerts() {
  return Array.from(alertsByDevice.values())
    .filter((alert) => alert.status === 'active')
    .sort((a, b) => b.createdAt - a.createdAt);
}

module.exports = {
  evaluateDeviceStatus,
  createOrUpdateDevice,
  recordDeviceStatus,
  listDevices,
  getDeviceHistory,
  getActiveAlerts,
  devices,
  historyByDevice,
  alertsByDevice,
  config: {
    heartbeatIntervalSeconds,
    degradedThresholdSeconds,
    unavailableThresholdSeconds
  }
};

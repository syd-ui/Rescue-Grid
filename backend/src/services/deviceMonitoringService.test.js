const test = require('node:test');
const assert = require('node:assert/strict');
const { evaluateDeviceStatus, createOrUpdateDevice } = require('./deviceMonitoringService');

test('evaluateDeviceStatus marks a silent device as unavailable', () => {
  const now = Date.now();
  const status = evaluateDeviceStatus({
    id: 'device-1',
    name: 'North Ridge Sensor',
    status: 'healthy',
    lastSeenAt: now - 120000,
    heartbeatIntervalSeconds: 30,
    alertState: 'inactive'
  }, now);

  assert.equal(status, 'unavailable');
});

test('createOrUpdateDevice keeps the latest status and timestamp', () => {
  const devices = new Map();
  const device = createOrUpdateDevice(devices, {
    id: 'device-2',
    name: 'Harbor Beacon',
    status: 'healthy',
    lastSeenAt: Date.now() - 2000,
    heartbeatIntervalSeconds: 30
  });

  assert.equal(device.id, 'device-2');
  assert.equal(device.status, 'healthy');
  assert.ok(device.lastSeenAt > 0);
});

function createDeviceStatusEvent({
  deviceId,
  status,
  observedAt = Date.now(),
  source = 'device',
  details = ''
}) {
  return {
    id: `${deviceId}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    deviceId: String(deviceId),
    status,
    observedAt: Number(observedAt),
    source,
    details
  };
}

module.exports = { createDeviceStatusEvent };

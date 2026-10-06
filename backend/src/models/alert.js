function createAlert({
  deviceId,
  severity = 'warning',
  status = 'active',
  reason = 'Device is not reporting on time',
  createdAt = Date.now(),
  resolvedAt = null
}) {
  return {
    id: `${deviceId}-alert-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    deviceId: String(deviceId),
    severity,
    status,
    reason,
    createdAt: Number(createdAt),
    resolvedAt
  };
}

module.exports = { createAlert };

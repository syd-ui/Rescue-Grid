const { heartbeatIntervalSeconds } = require('../config/deviceMonitoring');

function createDevice({
  id,
  name,
  status = 'healthy',
  lastSeenAt = Date.now(),
  heartbeatIntervalSeconds: interval = heartbeatIntervalSeconds
}) {
  return {
    id: String(id),
    name: String(name || id),
    status,
    lastSeenAt: Number(lastSeenAt),
    heartbeatIntervalSeconds: Number(interval),
    updatedAt: Date.now()
  };
}

module.exports = { createDevice };

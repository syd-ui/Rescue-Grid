module.exports = Object.freeze({
  heartbeatIntervalSeconds: 30,
  degradedThresholdSeconds: 60,
  unavailableThresholdSeconds: 120,
  statuses: ['healthy', 'degraded', 'unavailable']
});

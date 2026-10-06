const { getActiveAlerts } = require('../services/deviceMonitoringService');

function getAlerts(req, res) {
  return res.json(getActiveAlerts());
}

module.exports = { getAlerts };

const { listDevices, recordDeviceStatus, getDeviceHistory } = require('../services/deviceMonitoringService');

function getDevices(req, res) {
  return res.json(listDevices());
}

function updateDeviceStatus(req, res) {
  const { deviceId } = req.params;
  const payload = {
    ...req.body,
    deviceId,
    timestamp: req.body?.timestamp || Date.now(),
    source: req.body?.source || 'device'
  };

  const device = recordDeviceStatus(payload);

  return res.status(200).json({
    status: 'accepted',
    deviceId,
    currentStatus: device.status,
    lastSeenAt: device.lastSeenAt
  });
}

function getDeviceHistoryById(req, res) {
  const history = getDeviceHistory(req.params.deviceId);
  return res.json(history);
}

module.exports = {
  getDevices,
  updateDeviceStatus,
  getDeviceHistoryById
};

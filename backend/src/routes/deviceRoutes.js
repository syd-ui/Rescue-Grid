const express = require('express');
const { getDevices, updateDeviceStatus, getDeviceHistoryById } = require('../controllers/deviceController');

const router = express.Router();

router.get('/devices', getDevices);
router.post('/devices/:deviceId/status', updateDeviceStatus);
router.get('/devices/:deviceId/history', getDeviceHistoryById);

module.exports = router;

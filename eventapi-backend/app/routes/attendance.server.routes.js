const express = require('express');
const attendanceController = require('../controllers/attendanceController');
const router = express.Router();

router.post('/event/:event_id/register', attendanceController.registerForEvent); // Register for an event
router.delete('/event/:event_id/register', attendanceController.unregisterFromEvent); // Unregister from an event

module.exports = router;
const express = require('express');
const eventController = require('../controllers/eventController');
const router = express.Router();

// Define event-related routes
router.post('/events', eventController.createEvent); // Create an event
router.get('/event/:id', eventController.getEvent);  // Get event details
router.patch('/event/:id', eventController.updateEvent); // Update an event
router.delete('/event/:id', eventController.deleteEvent); // Archive/delete an event

module.exports = router;
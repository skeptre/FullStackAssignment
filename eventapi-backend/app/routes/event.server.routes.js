const express = require('express');
const eventController = require('../controllers/eventController'); // Fixed syntax
const router = express.Router();

// Define event-related routes
router.post('/events', eventController.createEvent); // Create an event
router.get('/events/:id', eventController.getEvent);  // Get event details
router.patch('/events/:id', eventController.updateEvent); // Update an event
router.delete('/events/:id', eventController.deleteEvent); // Archive/delete an event

module.exports = router;
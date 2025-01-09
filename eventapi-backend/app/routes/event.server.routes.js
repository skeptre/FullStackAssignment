import express from 'express';
import { createEvent, getEvent, updateEvent, deleteEvent } from '../controllers/eventController.js';

const router = express.Router();

// Define event-related routes
router.post('/events', createEvent); // Create an event
router.get('/events/:id', getEvent); // Get event details
router.patch('/events/:id', updateEvent); // Update an event
router.delete('/events/:id', deleteEvent); // Archive/delete an event

export default router;
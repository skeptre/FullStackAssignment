import { createEvent as createEventModel, getEventById, updateEvent as updateEventModel, deleteEvent as deleteEventModel } from '../models/eventModel.js';
import Joi from 'joi';

// Validation schema for event
const eventSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    start_date: Joi.date().required(),
    close_registration: Joi.date().required(),
    max_attendees: Joi.number().required(),
    creator_id: Joi.number().required() // Ensure creator_id is included
});

// Create event
export const createEvent = (req, res) => {
    const { error, value } = eventSchema.validate(req.body);
    if (error) return res.status(400).json({ error_message: error.details[0].message });

    createEventModel(value, (err, eventId) => {
        if (err) return res.status(500).json({ error_message: 'Database error' });
        res.status(201).json({ event_id: eventId });
    });
};

// Get event by ID
export const getEvent = (req, res) => {
    getEventById(req.params.id, (err, event) => {
        if (err || !event) return res.status(404).json({ error_message: 'Event not found' });
        res.status(200).json(event);
    });
};

// Update event
export const updateEvent = (req, res) => {
    const { error, value } = eventSchema.validate(req.body);
    if (error) return res.status(400).json({ error_message: error.details[0].message });

    updateEventModel(req.params.id, value, (err, changes) => {
        if (err || changes === 0) return res.status(400).json({ error_message: 'Failed to update event' });
        res.status(200).json({ message: 'Event updated successfully' });
    });
};

// Delete event
export const deleteEvent = (req, res) => {
    deleteEventModel(req.params.id, (err, changes) => {
        if (err || changes === 0) return res.status(400).json({ error_message: 'Failed to delete event' });
        res.status(200).json({ message: 'Event deleted successfully' });
    });
};
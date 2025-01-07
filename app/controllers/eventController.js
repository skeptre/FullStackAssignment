const eventModel = require('../models/eventModel');
const Joi = require('joi');

// Validation schema for event
const eventSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    start_date: Joi.date().required(),
    close_registration: Joi.date().required(),
    max_attendees: Joi.number().required()
});

// Create event
exports.createEvent = (req, res) => {
    const { error, value } = eventSchema.validate(req.body);
    if (error) return res.status(400).json({ error_message: error.details[0].message });

    eventModel.createEvent(value, (err, eventId) => {
        if (err) return res.status(500).json({ error_message: 'Database error' });
        res.status(201).json({ event_id: eventId });
    });
};

// Get event by ID
exports.getEvent = (req, res) => {
    eventModel.getEventById(req.params.id, (err, event) => {
        if (err || !event) return res.status(404).json({ error_message: 'Event not found' });
        res.status(200).json(event);
    });
};

// Update event
exports.updateEvent = (req, res) => {
    const { error, value } = eventSchema.validate(req.body);
    if (error) return res.status(400).json({ error_message: error.details[0].message });

    eventModel.updateEvent(req.params.id, value, (err, changes) => {
        if (err || changes === 0) return res.status(400).json({ error_message: 'Failed to update event' });
        res.status(200).json({ message: 'Event updated successfully' });
    });
};

// Delete event
exports.deleteEvent = (req, res) => {
    eventModel.deleteEvent(req.params.id, (err, changes) => {
        if (err || changes === 0) return res.status(400).json({ error_message: 'Failed to delete event' });
        res.status(200).json({ message: 'Event deleted successfully' });
    });
};
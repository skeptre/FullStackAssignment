const db = require('../../database');
const Joi = require('joi');

// Validation schema for creating/updating events
const eventSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    start_date: Joi.number().integer().required(),
    close_registration: Joi.number().integer().required(),
    max_attendees: Joi.number().integer().required()
});

// Utility function for database error handling
const handleDbError = (err, res, message = 'Database error') => {
    if (err) {
        console.error(message, err.message);
        return res.status(500).json({ error_message: message });
    }
};

// Create a new event
exports.createEvent = async (req, res) => {
    const { error, value } = eventSchema.validate(req.body);
    if (error) return res.status(400).json({ error_message: error.details[0].message });

    const { name, description, location, start_date, close_registration, max_attendees } = value;

    if (close_registration >= start_date) {
        return res.status(400).json({ error_message: 'Registration must close before the event starts.' });
    }

    db.run(
        `INSERT INTO events (name, description, location, start_date, close_registration, max_attendees, creator_id)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [name, description, location, start_date, close_registration, max_attendees, req.user.user_id],
        function (err) {
            handleDbError(err, res, 'Error creating event');
            res.status(201).json({ event_id: this.lastID });
        }
    );
};

// Get event details
exports.getEvent = (req, res) => {
    const eventId = req.params.id;

    db.get(`SELECT * FROM events WHERE event_id = ?`, [eventId], (err, event) => {
        if (err || !event) {
            return res.status(404).json({ error_message: 'Event not found' });
        }
        res.status(200).json(event);
    });
};

// Update an event
exports.updateEvent = (req, res) => {
    const eventId = req.params.id;
    const { error, value } = eventSchema.validate(req.body);
    if (error) return res.status(400).json({ error_message: error.details[0].message });

    const { name, description, location, start_date, close_registration, max_attendees } = value;

    db.run(
        `UPDATE events
         SET name = ?, description = ?, location = ?, start_date = ?, close_registration = ?, max_attendees = ?
         WHERE event_id = ? AND creator_id = ?`,
        [name, description, location, start_date, close_registration, max_attendees, eventId, req.user.user_id],
        function (err) {
            handleDbError(err, res, 'Error updating event');
            if (this.changes === 0) {
                console.error(`Unauthorized update attempt for event ID ${eventId} by user ${req.user.user_id}`);
                return res.status(403).json({ error_message: 'You can only update your own events.' });
            }
            res.status(200).json({ message: 'Event updated successfully' });
        }
    );
};

// Delete (archive) an event
exports.deleteEvent = (req, res) => {
    const eventId = req.params.id;

    db.run(
        `DELETE FROM events WHERE event_id = ? AND creator_id = ?`,
        [eventId, req.user.user_id],
        function (err) {
            handleDbError(err, res, 'Error deleting event');
            if (this.changes === 0) {
                console.error(`Unauthorized delete attempt for event ID ${eventId} by user ${req.user.user_id}`);
                return res.status(403).json({ error_message: 'You can only delete your own events.' });
            }
            res.status(200).json({ message: 'Event deleted successfully' });
        }
    );
};
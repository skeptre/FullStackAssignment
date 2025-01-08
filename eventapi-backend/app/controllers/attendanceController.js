const db = require('../../database');

// Helper function to check if event exists and is open for registration
const validateEventForRegistration = (eventId, callback) => {
    db.get(`SELECT * FROM events WHERE event_id = ?`, [eventId], (err, event) => {
        if (err || !event) return callback({ status: 404, message: 'Event not found' });
        if (event.close_registration < Date.now()) {
            return callback({ status: 400, message: 'Registration is closed' });
        }
        callback(null, event);
    });
};

// Helper function to check if the event is full
const checkEventCapacity = (eventId, maxAttendees, callback) => {
    db.get(`SELECT COUNT(*) AS count FROM attendees WHERE event_id = ?`, [eventId], (err, row) => {
        if (row.count >= maxAttendees) {
            return callback({ status: 400, message: 'Event is full' });
        }
        callback(null);
    });
};

// Register for an event
exports.registerForEvent = (req, res) => {
    const eventId = req.params.event_id;
    const userId = req.user.user_id;

    validateEventForRegistration(eventId, (err, event) => {
        if (err) return res.status(err.status).json({ error_message: err.message });

        checkEventCapacity(eventId, event.max_attendees, (err) => {
            if (err) return res.status(err.status).json({ error_message: err.message });

            db.run(`INSERT INTO attendees (event_id, user_id) VALUES (?, ?)`, [eventId, userId], function (err) {
                if (err) return res.status(400).json({ error_message: 'Already registered for this event' });
                res.status(201).json({ message: 'Successfully registered for the event' });
            });
        });
    });
};

// Unregister from an event
exports.unregisterFromEvent = (req, res) => {
    const eventId = req.params.event_id;
    const userId = req.user.user_id;

    db.run(`DELETE FROM attendees WHERE event_id = ? AND user_id = ?`, [eventId, userId], function (err) {
        if (err) return res.status(500).json({ error_message: 'Database error' });
        if (this.changes === 0) return res.status(400).json({ error_message: 'Not registered for this event' });
        res.status(200).json({ message: 'Successfully unregistered from the event' });
    });
};
const db = require('../../database');

// Register for an event
exports.registerForEvent = (req, res) => {
    const eventId = req.params.event_id;
    const userId = req.user.user_id;

    db.get(`SELECT * FROM events WHERE event_id = ?`, [eventId], (err, event) => {
        if (err || !event) return res.status(404).json({ error_message: 'Event not found' });
        if (event.close_registration < Date.now()) return res.status(400).json({ error_message: 'Registration is closed' });

        db.get(`SELECT COUNT(*) AS count FROM attendees WHERE event_id = ?`, [eventId], (err, row) => {
            if (row.count >= event.max_attendees) {
                return res.status(400).json({ error_message: 'Event is full' });
            }

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
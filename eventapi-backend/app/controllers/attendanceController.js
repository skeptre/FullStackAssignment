import { registerForEvent as registerForEventModel, unregisterFromEvent as unregisterFromEventModel, isUserRegistered } from '../models/attendanceModel.js';

// Register for an event
export const registerForEvent = (req, res) => {
    const eventId = req.params.event_id;
    const userId = req.user.user_id;

    isUserRegistered(eventId, userId, (err, result) => {
        if (err) return res.status(500).json({ error_message: 'Database error' });
        if (result) return res.status(400).json({ error_message: 'User already registered' });

        registerForEventModel(eventId, userId, (err, registrationId) => {
            if (err) return res.status(500).json({ error_message: 'Database error during registration' });
            res.status(201).json({ registration_id: registrationId, message: 'Successfully registered for the event' });
        });
    });
};

// Unregister from an event
export const unregisterFromEvent = (req, res) => {
    const eventId = req.params.event_id;
    const userId = req.user.user_id;

    unregisterFromEventModel(eventId, userId, (err, changes) => {
        if (err) return res.status(500).json({ error_message: 'Database error' });
        if (changes === 0) return res.status(400).json({ error_message: 'Not registered for this event' });
        res.status(200).json({ message: 'Successfully unregistered from the event' });
    });
};
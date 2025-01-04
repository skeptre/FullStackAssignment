const db = require('../../database');

exports.searchEvents = (req, res) => {
    const { q, status, limit = 10, offset = 0 } = req.query;
    let query = `SELECT * FROM events`;
    const params = [];

    if (q) {
        query += ` WHERE name LIKE ?`;
        params.push(`%${q}%`);
    }

    // Add filters based on status
    if (status) {
        if (status === 'MY_EVENTS') {
            query += ` AND creator_id = ?`;
            params.push(req.user.user_id);
        } else if (status === 'ATTENDING') {
            query += ` AND event_id IN (SELECT event_id FROM attendees WHERE user_id = ?)`;
            params.push(req.user.user_id);
        } else if (status === 'OPEN') {
            query += ` AND close_registration > ?`;
            params.push(Date.now());
        } else if (status === 'ARCHIVE') {
            query += ` AND start_date < ?`;
            params.push(Date.now());
        }
    }

    query += ` LIMIT ? OFFSET ?`;
    params.push(Number(limit), Number(offset));

    db.all(query, params, (err, rows) => {
        if (err) return res.status(500).json({ error_message: 'Database error' });
        res.status(200).json(rows);
    });
};
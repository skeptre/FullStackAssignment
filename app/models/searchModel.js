const db = require('../../database');

// Search for events with filters
exports.searchEvents = (filters, callback) => {
    const { q, status, limit = 20, offset = 0 } = filters;

    let query = `SELECT * FROM events`;
    const params = [];

    // Apply search keyword filter
    if (q) {
        query += ` WHERE name LIKE ? OR description LIKE ?`;
        params.push(`%${q}%`, `%${q}%`);
    }

    // Apply status filter
    if (status) {
        query += q ? ` AND` : ` WHERE`;
        query += ` status = ?`;
        params.push(status);
    }

    // Apply limit and offset for pagination
    query += ` LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    db.all(query, params, callback);
};
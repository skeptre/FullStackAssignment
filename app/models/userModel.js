const db = require('../../database');

// Create a new user
exports.createUser = (userData, callback) => {
    const { first_name, last_name, email, password } = userData;
    db.run(
        `INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)`,
        [first_name, last_name, email, password],
        function (err) {
            callback(err, this ? this.lastID : null);
        }
    );
};

// Get a user by email
exports.getUserByEmail = (email, callback) => {
    db.get(`SELECT * FROM users WHERE email = ?`, [email], callback);
};

// Get a user by ID
exports.getUserById = (userId, callback) => {
    db.get(`SELECT * FROM users WHERE user_id = ?`, [userId], callback);
};
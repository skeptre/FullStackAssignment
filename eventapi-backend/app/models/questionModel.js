const db = require('../../database');

// Add a question to an event
exports.addQuestion = (questionData, callback) => {
    const { event_id, question, asked_by } = questionData;
    db.run(
        `INSERT INTO questions (event_id, question, asked_by) VALUES (?, ?, ?)`,
        [event_id, question, asked_by],
        function (err) {
            callback(err, this ? this.lastID : null); // Return question ID
        }
    );
};

// Delete a question
exports.deleteQuestion = (questionId, callback) => {
    db.run(`DELETE FROM questions WHERE question_id = ?`, [questionId], function (err) {
        callback(err, this.changes); // Return affected rows
    });
};

// Upvote a question
exports.upvoteQuestion = (questionId, userId, callback) => {
    db.run(
        `INSERT INTO votes (question_id, voter_id) VALUES (?, ?)`,
        [questionId, userId],
        function (err) {
            callback(err, this ? this.lastID : null);
        }
    );
};

// Downvote a question
exports.downvoteQuestion = (questionId, userId, callback) => {
    db.run(
        `DELETE FROM votes WHERE question_id = ? AND voter_id = ?`,
        [questionId, userId],
        function (err) {
            callback(err, this.changes);
        }
    );
};
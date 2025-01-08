const questionModel = require('../models/questionModel');

// Add a question
exports.addQuestion = (req, res) => {
    const { question } = req.body;
    const eventId = req.params.event_id;
    const userId = req.user.user_id;

    questionModel.addQuestion({ event_id: eventId, question, asked_by: userId }, (err, questionId) => {
        if (err) return res.status(500).json({ error_message: 'Database error while adding question' });
        res.status(201).json({ question_id: questionId, message: 'Question added successfully' });
    });
};

// Delete a question
exports.deleteQuestion = (req, res) => {
    const questionId = req.params.question_id;

    questionModel.deleteQuestion(questionId, (err, changes) => {
        if (err) return res.status(500).json({ error_message: 'Database error' });
        if (changes === 0) return res.status(404).json({ error_message: 'Question not found' });
        res.status(200).json({ message: 'Question deleted successfully' });
    });
};

// Upvote a question
exports.upvoteQuestion = (req, res) => {
    const questionId = req.params.question_id;
    const userId = req.user.user_id;

    questionModel.upvoteQuestion(questionId, userId, (err) => {
        if (err) return res.status(400).json({ error_message: 'Already voted on this question' });
        res.status(200).json({ message: 'Upvoted successfully' });
    });
};

// Downvote a question
exports.downvoteQuestion = (req, res) => {
    const questionId = req.params.question_id;
    const userId = req.user.user_id;

    questionModel.downvoteQuestion(questionId, userId, (err, changes) => {
        if (err) return res.status(500).json({ error_message: 'Database error' });
        if (changes === 0) return res.status(400).json({ error_message: 'You have not voted on this question' });
        res.status(200).json({ message: 'Downvoted successfully' });
    });
};
import { addQuestion as addQuestionModel, deleteQuestion as deleteQuestionModel, upvoteQuestion as upvoteQuestionModel, downvoteQuestion as downvoteQuestionModel } from '../models/questionModel.js';

// Add a question
export const addQuestion = (req, res) => {
    const { question } = req.body;
    const eventId = req.params.event_id;
    const userId = req.user.user_id;

    addQuestionModel({ event_id: eventId, question, asked_by: userId }, (err, questionId) => {
        if (err) return res.status(500).json({ error_message: 'Database error while adding question' });
        res.status(201).json({ question_id: questionId, message: 'Question added successfully' });
    });
};

// Delete a question
export const deleteQuestion = (req, res) => {
    const questionId = req.params.question_id;

    deleteQuestionModel(questionId, (err, changes) => {
        if (err) return res.status(500).json({ error_message: 'Database error' });
        if (changes === 0) return res.status(404).json({ error_message: 'Question not found' });
        res.status(200).json({ message: 'Question deleted successfully' });
    });
};

// Upvote a question
export const upvoteQuestion = (req, res) => {
    const questionId = req.params.question_id;
    const userId = req.user.user_id;

    upvoteQuestionModel(questionId, userId, (err) => {
        if (err) return res.status(400).json({ error_message: 'Already voted on this question' });
        res.status(200).json({ message: 'Upvoted successfully' });
    });
};

// Downvote a question
export const downvoteQuestion = (req, res) => {
    const questionId = req.params.question_id;
    const userId = req.user.user_id;

    downvoteQuestionModel(questionId, userId, (err, changes) => {
        if (err) return res.status(500).json({ error_message: 'Database error' });
        if (changes === 0) return res.status(400).json({ error_message: 'You have not voted on this question' });
        res.status(200).json({ message: 'Downvoted successfully' });
    });
};
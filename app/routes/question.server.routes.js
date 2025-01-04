const express = require('express');
const questionController = require('../controllers/questionController');
const router = express.Router();

router.post('/event/:event_id/question', questionController.askQuestion); // Ask a question
router.delete('/question/:question_id', questionController.deleteQuestion); // Delete a question
router.post('/question/:question_id/vote', questionController.upvoteQuestion); // Upvote a question
router.delete('/question/:question_id/vote', questionController.downvoteQuestion); // Downvote a question

module.exports = router;
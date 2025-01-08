const express = require('express');
const questionController = require('../controllers/questionController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware').authMiddleware;

router.post('/event/:event_id/question', authMiddleware, questionController.addQuestion);
router.delete('/question/:question_id', authMiddleware, questionController.deleteQuestion);
router.post('/question/:question_id/vote', authMiddleware, questionController.upvoteQuestion);
router.delete('/question/:question_id/vote', authMiddleware, questionController.downvoteQuestion);

module.exports = router;



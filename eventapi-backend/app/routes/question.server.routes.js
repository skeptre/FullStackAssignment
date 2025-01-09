import express from 'express';
import { addQuestion, deleteQuestion, upvoteQuestion, downvoteQuestion } from '../controllers/questionController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/event/:event_id/question', authMiddleware, addQuestion); // Add a question
router.delete('/question/:question_id', authMiddleware, deleteQuestion); // Delete a question
router.post('/question/:question_id/vote', authMiddleware, upvoteQuestion); // Upvote a question
router.delete('/question/:question_id/vote', authMiddleware, downvoteQuestion); // Downvote a question

export default router;
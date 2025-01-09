import express from 'express';
import { registerForEvent, unregisterFromEvent } from '../controllers/attendanceController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/event/:event_id/register', authMiddleware, registerForEvent); // Register for an event
router.delete('/event/:event_id/register', authMiddleware, unregisterFromEvent); // Unregister from an event

export default router;
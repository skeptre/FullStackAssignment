import express from 'express';
import { searchEvents } from '../controllers/searchController.js';

const router = express.Router();

router.get('/search', searchEvents);

export default router;
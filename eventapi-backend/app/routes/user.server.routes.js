import express from 'express';
import { createUser, loginUser } from '../controllers/userController.js'; // Destructured imports

const router = express.Router();

router.post('/users', createUser); // Register user
router.post('/login', loginUser); // Login user

export default router;
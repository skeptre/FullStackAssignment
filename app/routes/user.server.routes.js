const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/users', userController.createUser); // Register user
router.post('/login', userController.loginUser); // Login user

module.exports = router;
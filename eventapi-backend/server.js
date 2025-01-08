const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const authMiddleware = require('./app/middleware/authMiddleware').authMiddleware; // Import the correct middleware

const app = express();

// Middleware
app.use(cors());
app.use(morgan('tiny')); // Logging
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Server port
const HTTP_PORT = 3333;

// Start server
app.listen(HTTP_PORT, () => {
    console.log(`Server running at http://localhost:${HTTP_PORT}`);
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({ status: 'Alive' });
});

// Import routes
const userRoutes = require('./app/routes/user.server.routes');
const eventRoutes = require('./app/routes/event.server.routes');
const questionRoutes = require('./app/routes/question.server.routes');
const searchRoutes = require('./app/routes/search.server.routes');
const attendanceRoutes = require('./app/routes/attendance.server.routes');

// Use routes
app.use(userRoutes);
app.use(eventRoutes);
app.use(questionRoutes);
app.use(searchRoutes);
app.use(attendanceRoutes);

// Default response for any other request
app.use((req, res) => {
    res.sendStatus(404);
});
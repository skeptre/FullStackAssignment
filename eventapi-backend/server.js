import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import authMiddleware from './app/middleware/authMiddleware.js'; // Adjusted import for ESM
import userRoutes from './app/routes/user.server.routes.js';
import eventRoutes from './app/routes/event.server.routes.js';
import questionRoutes from './app/routes/question.server.routes.js';
import searchRoutes from './app/routes/search.server.routes.js';
import attendanceRoutes from './app/routes/attendance.server.routes.js';

dotenv.config(); // Load environment variables

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
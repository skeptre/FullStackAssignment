import path from 'path';
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';

// Handle __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure db.sqlite is created in the backend directory
const DBSOURCE = path.join(__dirname, 'db.sqlite');

// Initialize database connection
const db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error('Database connection error:', err.message);
        throw err;
    } else {
        console.log('Connected to the SQLite database.');

        // Enable foreign key constraints
        db.run('PRAGMA foreign_keys = ON', (err) => {
            if (err) {
                console.error('Error enabling foreign keys:', err.message);
            } else {
                console.log('Foreign key enforcement enabled.');
            }
        });

        // Create Users Table
        db.run(
            `CREATE TABLE IF NOT EXISTS users
             (
                 user_id       INTEGER PRIMARY KEY AUTOINCREMENT,
                 first_name    TEXT        NOT NULL,
                 last_name     TEXT        NOT NULL,
                 email         TEXT UNIQUE NOT NULL,
                 password      TEXT        NOT NULL,
                 salt          TEXT,
                 session_token TEXT
             )`,
            (err) => {
                if (err) {
                    console.error('Error creating users table:', err.message);
                } else {
                    console.log('Users table created');
                }
            }
        );

        // Create Events Table
        db.run(
            `CREATE TABLE IF NOT EXISTS events
             (
                 event_id           INTEGER PRIMARY KEY AUTOINCREMENT,
                 name               TEXT    NOT NULL,
                 description        TEXT    NOT NULL,
                 location           TEXT    NOT NULL,
                 start_date         INTEGER NOT NULL,
                 close_registration INTEGER NOT NULL,
                 max_attendees      INTEGER NOT NULL,
                 creator_id         INTEGER NOT NULL,
                 FOREIGN KEY (creator_id) REFERENCES users (user_id)
             )`,
            (err) => {
                if (err) {
                    console.error('Error creating events table:', err.message);
                } else {
                    console.log('Events table created');
                }
            }
        );

        // Create Attendees Table
        db.run(
            `CREATE TABLE IF NOT EXISTS attendees
             (
                 event_id INTEGER NOT NULL,
                 user_id  INTEGER NOT NULL,
                 PRIMARY KEY (event_id, user_id),
                 FOREIGN KEY (event_id) REFERENCES events (event_id),
                 FOREIGN KEY (user_id) REFERENCES users (user_id)
             )`,
            (err) => {
                if (err) {
                    console.error('Error creating attendees table:', err.message);
                } else {
                    console.log('Attendees table created');
                }
            }
        );

        // Create Questions Table
        db.run(
            `CREATE TABLE IF NOT EXISTS questions
             (
                 question_id INTEGER PRIMARY KEY AUTOINCREMENT,
                 question    TEXT    NOT NULL,
                 asked_by    INTEGER NOT NULL,
                 event_id    INTEGER NOT NULL,
                 votes       INTEGER DEFAULT 0,
                 FOREIGN KEY (asked_by) REFERENCES users (user_id),
                 FOREIGN KEY (event_id) REFERENCES events (event_id)
             )`,
            (err) => {
                if (err) {
                    console.error('Error creating questions table:', err.message);
                } else {
                    console.log('Questions table created');
                }
            }
        );

        // Create Votes Table
        db.run(
            `CREATE TABLE IF NOT EXISTS votes
             (
                 question_id INTEGER NOT NULL,
                 voter_id    INTEGER NOT NULL,
                 PRIMARY KEY (question_id, voter_id),
                 FOREIGN KEY (question_id) REFERENCES questions (question_id),
                 FOREIGN KEY (voter_id) REFERENCES users (user_id)
             )`,
            (err) => {
                if (err) {
                    console.error('Error creating votes table:', err.message);
                } else {
                    console.log('Votes table created');
                }
            }
        );
    }
});

export default db;
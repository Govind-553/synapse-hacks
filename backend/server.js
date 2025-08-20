// File: backend/server.js
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const sql = require('mssql');
const mongoose = require('mongoose');
require('dotenv').config();

const { setupDatabase } = require('./src/config/db');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(express.json());
app.use(cors());

// Import Middleware
const { authenticateToken } = require('./src/middleware/authMiddleware');
const { authorizeRole } = require('./src/middleware/roleMiddleware');
const { USER_ROLES } = require('./src/models/sql-schemas');
const { Submission, Announcement } = require('./src/models/mongo-schemas'); // Import MongoDB models

// Import Routes
const authRoutes = require('./src/routes/auth_routes');
const eventRoutes = require('./src/routes/events_routes');
const teamRoutes = require('./src/routes/teams_routes');
const submissionRoutes = require('./src/routes/submissions_routes');
const judgeRoutes = require('./src/routes/judges_routes');
const announcementRoutes = require('./src/routes/announcements_routes');
const leaderboardRoutes = require('./src/routes/leaderboard_routes');
const certificatesRoutes = require('./src/routes/certificates_routes');

// Define database configuration
const sqlConfig = {
  server: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true,
    trustServerCertificate: false,
  }
};

async function startServer() {
  try {
    const { sqlPool, mongo } = await setupDatabase(sqlConfig);

    // Now that the databases are connected, initialize routes
    app.use('/api/auth', authRoutes(sqlPool));
    app.use('/api/events', authenticateToken, eventRoutes(sqlPool));
    app.use('/api/teams', authenticateToken, teamRoutes(sqlPool));
    app.use('/api/submissions', authenticateToken, submissionRoutes(mongo.model('Submission')));
    app.use('/api/judges', authenticateToken, authorizeRole([USER_ROLES.JUDGE]), judgeRoutes(sqlPool));
    app.use('/api/announcements', authenticateToken, authorizeRole([USER_ROLES.ORGANIZER]), announcementRoutes(io, mongo.model('Announcement')));
    app.use('/api/leaderboard', authenticateToken, leaderboardRoutes(sqlPool));
    app.use('/api/certificates', authenticateToken, certificatesRoutes());

    // Socket.io for real-time updates
    io.on('connection', (socket) => {
      console.log('New client connected');
      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });

    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

    // Export for use in tests or other modules
    module.exports = { app, sqlPool, io, mongo };
  } catch (err) {
    console.error('Server failed to start:', err);
    process.exit(1);
  }
}

// Start the server
startServer();

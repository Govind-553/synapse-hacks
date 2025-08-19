const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// SQL DB connection (using a simple pool for demonstration)
const mysql = require('mysql2/promise');
const sqlPool = mysql.createPool({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE
});

// Import Routes
const authRoutes = require('./src/routes/auth_routes');
const eventRoutes = require('./src/routes/events_routes');
const teamRoutes = require('./src/routes/teams_routes');
const submissionRoutes = require('./src/routes/submissions_routes');
const judgeRoutes = require('./src/routes/judges_routes');
const announcementRoutes = require('./src/routes/announcements_routes');
const leaderboardRoutes = require('./src/routes/leaderboard_routes');
const certificatesRoutes = require('./src/routes/certificates_routes')

// Use Routes
app.use('/api/auth', authRoutes(sqlPool));
app.use('/api/events', eventRoutes(sqlPool));
app.use('/api/teams', teamRoutes(sqlPool));
app.use('/api/submissions', submissionRoutes);
app.use('/api/judges', judgeRoutes(sqlPool));
app.use('/api/announcements', announcementRoutes(io)); 
app.use('/api/leaderboard', leaderboardRoutes(sqlPool));
app.use('/api/certificates', certificatesRoutes());

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
module.exports = { app, sqlPool, io };

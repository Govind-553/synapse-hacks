const express = require('express');
const router = express.Router();
const leaderboardController = require('../controllers/leaderboard_controller');

/**
 * Initializes leaderboard routes.
 * @param {object} sqlPool - The MySQL connection pool.
 * @returns {express.Router} The Express router for the leaderboard.
 */
module.exports = (sqlPool) => {
  // GET route to fetch leaderboard data for a specific event.
  // The event ID is passed as a URL parameter.
  router.get('/:eventId', (req, res) => leaderboardController.getLeaderboard(req, res, sqlPool));
  return router;
};

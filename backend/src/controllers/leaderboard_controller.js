const leaderboardService = require('../services/leaderboard_service');

/**
 * Fetches leaderboard data for a specific event.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {object} sqlPool - The MySQL connection pool.
 */
exports.getLeaderboard = async (req, res, sqlPool) => {
  try {
    const leaderboard = await leaderboardService.getLeaderboard(req.params.eventId, sqlPool);
    res.status(200).json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leaderboard.' });
  }
};

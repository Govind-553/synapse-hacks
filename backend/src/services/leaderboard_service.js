/**
 * @fileoverview Service for generating and retrieving the event leaderboard.
 */
const { REVIEW_TABLE } = require('../models/review_model');
const { TEAM_MEMBER_TABLE } = require('../models/team_member_model');
const { TEAM_TABLE } = require('../models/team_model');
const { SubmissionModel } = require('../models/submission_model');

/**
 * Calculates and fetches the leaderboard for a specific event.
 * @param {number} eventId - The ID of the event.
 * @param {object} sqlPool - The MySQL connection pool.
 * @returns {Promise<Array<object>>} An array of leaderboard entries.
 */
exports.getLeaderboard = async (eventId, sqlPool) => {
  const query = `
    SELECT
      t.name AS team_name,
      AVG(r.innovation + r.functionality + r.design + r.scalability + r.presentation) AS average_score
    FROM ${REVIEW_TABLE} r
    JOIN Submissions s ON r.submission_id = s.id
    JOIN ${TEAM_TABLE} t ON s.team_id = t.id
    WHERE t.event_id = ?
    GROUP BY t.id
    ORDER BY average_score DESC;
  `;
  const [rows] = await sqlPool.execute(query, [eventId]);
  
  // You would need to further process this data to get project names, etc. from MongoDB.
  // This is a simplified example.
  const leaderboard = rows.map((row, index) => ({
    rank: index + 1,
    teamName: row.team_name,
    score: row.average_score,
  }));

  return leaderboard;
};

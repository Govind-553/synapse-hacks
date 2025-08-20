/**
 * @fileoverview Service for generating and retrieving the event leaderboard.
 */
const { REVIEW_TABLE } = require('../models/review_model');
const { TEAM_MEMBER_TABLE } = require('../models/team_member_model');
const { TEAM_TABLE } = require('../models/team_model');
const { SubmissionModel } = require('../models/submission_model');
const sql = require('mssql');

/**
 * Calculates and fetches the leaderboard for a specific event.
 * @param {number} eventId - The ID of the event.
 * @param {object} sqlPool - The mssql connection pool.
 * @returns {Promise<Array<object>>} An array of leaderboard entries.
 */
exports.getLeaderboard = async (eventId, sqlPool) => {
  const request = sqlPool.request();
  request.input('eventId', sql.Int, eventId);
  const query = `
    SELECT
      t.name AS team_name,
      AVG(r.innovation + r.functionality + r.design + r.scalability + r.presentation) AS average_score
    FROM ${REVIEW_TABLE} r
    JOIN Submissions s ON r.submission_id = s.id
    JOIN ${TEAM_TABLE} t ON s.team_id = t.id
    WHERE t.event_id = @eventId
    GROUP BY t.id
    ORDER BY average_score DESC;
  `;
  const result = await request.query(query);
  
  const leaderboard = result.recordset.map((row, index) => ({
    rank: index + 1,
    teamName: row.team_name,
    score: row.average_score,
  }));

  return leaderboard;
};
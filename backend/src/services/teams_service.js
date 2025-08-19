/**
 * @fileoverview Service for handling team-related business logic.
 */
const { TEAM_TABLE } = require('../models/team_model');
const { TEAM_MEMBER_TABLE } = require('../models/team_member_model');

/**
 * Fetches all teams for a specific event.
 * @param {number} eventId - The ID of the event.
 * @param {object} sqlPool - The MySQL connection pool.
 * @returns {Promise<Array<object>>} An array of team objects.
 */
exports.getTeamsByEvent = async (eventId, sqlPool) => {
  const query = `SELECT * FROM ${TEAM_TABLE} WHERE event_id = ?`;
  const [rows] = await sqlPool.execute(query, [eventId]);
  return rows;
};

/**
 * Creates a new team.
 * @param {object} teamData - The data for the new team.
 * @param {object} sqlPool - The MySQL connection pool.
 * @returns {Promise<object>} The newly created team object.
 */
exports.createTeam = async (teamData, sqlPool) => {
  const { name, event_id } = teamData;
  const query = `INSERT INTO ${TEAM_TABLE} (name, event_id) VALUES (?, ?)`;
  const [result] = await sqlPool.execute(query, [name, event_id]);
  return { id: result.insertId, ...teamData };
};

/**
 * Invites a new member to an existing team.
 * @param {number} teamId - The ID of the team.
 * @param {number} userId - The ID of the user to invite.
 * @param {object} sqlPool - The MySQL connection pool.
 * @returns {Promise<boolean>} True if the invitation was successful.
 */
exports.inviteTeamMember = async (teamId, userId, sqlPool) => {
  const query = `INSERT INTO ${TEAM_MEMBER_TABLE} (user_id, team_id) VALUES (?, ?)`;
  const [result] = await sqlPool.execute(query, [userId, teamId]);
  return result.affectedRows > 0;
};

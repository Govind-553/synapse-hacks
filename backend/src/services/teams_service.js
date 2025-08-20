/**
 * @fileoverview Service for handling team-related business logic.
 */
const { TEAM_TABLE } = require('../models/team_model');
const { TEAM_MEMBER_TABLE } = require('../models/team_member_model');
const sql = require('mssql');

/**
 * Fetches all teams for a specific event.
 * @param {number} eventId - The ID of the event.
 * @param {object} sqlPool - The mssql connection pool.
 * @returns {Promise<Array<object>>} An array of team objects.
 */
exports.getTeamsByEvent = async (eventId, sqlPool) => {
  const request = sqlPool.request();
  request.input('eventId', sql.Int, eventId);
  const query = `SELECT * FROM ${TEAM_TABLE} WHERE event_id = @eventId`;
  const result = await request.query(query);
  return result.recordset;
};

/**
 * Creates a new team.
 * @param {object} teamData - The data for the new team.
 * @param {object} sqlPool - The mssql connection pool.
 * @returns {Promise<object>} The newly created team object.
 */
exports.createTeam = async (teamData, sqlPool) => {
  const { name, event_id } = teamData;
  const request = sqlPool.request();
  request.input('name', sql.VarChar, name);
  request.input('event_id', sql.Int, event_id);
  const query = `INSERT INTO ${TEAM_TABLE} (name, event_id) VALUES (@name, @event_id)`;
  const result = await request.query(query);
  return { ...teamData, id: result.recordset[0].id };
};

/**
 * Invites a new member to an existing team.
 * @param {number} teamId - The ID of the team.
 * @param {number} userId - The ID of the user to invite.
 * @param {object} sqlPool - The mssql connection pool.
 * @returns {Promise<boolean>} True if the invitation was successful.
 */
exports.inviteTeamMember = async (teamId, userId, sqlPool) => {
  const request = sqlPool.request();
  request.input('userId', sql.Int, userId);
  request.input('teamId', sql.Int, teamId);
  const query = `INSERT INTO ${TEAM_MEMBER_TABLE} (user_id, team_id) VALUES (@userId, @teamId)`;
  const result = await request.query(query);
  return result.rowsAffected > 0;
};
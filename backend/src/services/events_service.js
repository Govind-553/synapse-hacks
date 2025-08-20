/**
 * @fileoverview Service for handling event-related business logic.
 */
const { EVENT_TABLE } = require('../models/event_model');
const { EVENT_PARTICIPANT_TABLE } = require('../models/event_participant_model');
const sql = require('mssql');

/**
 * Fetches all events from the database.
 * @param {object} sqlPool - The mssql connection pool.
 * @returns {Promise<Array<object>>} An array of event objects.
 */
exports.getAllEvents = async (sqlPool) => {
  const query = `SELECT * FROM ${EVENT_TABLE}`;
  const request = sqlPool.request();
  const result = await request.query(query);
  return result.recordset;
};

/**
 * Fetches a single event by ID.
 * @param {number} eventId - The ID of the event.
 * @param {object} sqlPool - The mssql connection pool.
 * @returns {Promise<object>} The event object.
 */
exports.getEventById = async (eventId, sqlPool) => {
  const request = sqlPool.request();
  request.input('id', sql.Int, eventId);
  const query = `SELECT * FROM ${EVENT_TABLE} WHERE id = @id`;
  const result = await request.query(query);
  return result.recordset[0];
};

/**
 * Creates a new event.
 * @param {object} eventData - The data for the new event.
 * @param {object} sqlPool - The mssql connection pool.
 * @returns {Promise<object>} The newly created event object.
 */
exports.createEvent = async (eventData, sqlPool) => {
  const { title, theme, description, start_date, end_date, type, location, prize_pool, max_participants, organizer_id } = eventData;
  const request = sqlPool.request();
  request.input('title', sql.VarChar, title);
  request.input('theme', sql.VarChar, theme);
  request.input('description', sql.Text, description);
  request.input('start_date', sql.Date, start_date);
  request.input('end_date', sql.Date, end_date);
  request.input('type', sql.VarChar, type);
  request.input('location', sql.VarChar, location);
  request.input('prize_pool', sql.VarChar, prize_pool);
  request.input('max_participants', sql.Int, max_participants);
  request.input('organizer_id', sql.Int, organizer_id);
  
  const query = `
    INSERT INTO ${EVENT_TABLE} (title, theme, description, start_date, end_date, type, location, prize_pool, max_participants, organizer_id)
    VALUES (@title, @theme, @description, @start_date, @end_date, @type, @location, @prize_pool, @max_participants, @organizer_id)
  `;
  const result = await request.query(query);
  return { ...eventData, id: result.recordset[0].id };
};

/**
 * Updates an existing event.
 * @param {number} eventId - The ID of the event to update.
 * @param {object} eventData - The new data for the event.
 * @param {object} sqlPool - The mssql connection pool.
 * @returns {Promise<object>} The updated event object.
 */
exports.updateEvent = async (eventId, eventData, sqlPool) => {
  const request = sqlPool.request();
  let updateQuery = `UPDATE ${EVENT_TABLE} SET`;
  const keys = Object.keys(eventData);
  keys.forEach((key, index) => {
    updateQuery += ` ${key} = @${key}`;
    if (index < keys.length - 1) {
      updateQuery += ',';
    }
    request.input(key, eventData[key]);
  });
  updateQuery += ` WHERE id = @id`;
  request.input('id', sql.Int, eventId);
  await request.query(updateQuery);
  return { id: eventId, ...eventData };
};

/**
 * Deletes an event.
 * @param {number} eventId - The ID of the event to delete.
 * @param {object} sqlPool - The mssql connection pool.
 * @returns {Promise<boolean>} True if the event was deleted, false otherwise.
 */
exports.deleteEvent = async (eventId, sqlPool) => {
  const request = sqlPool.request();
  request.input('id', sql.Int, eventId);
  const query = `DELETE FROM ${EVENT_TABLE} WHERE id = @id`;
  const result = await request.query(query);
  return result.rowsAffected > 0;
};

/**
 * Registers a user for an event.
 * @param {number} eventId - The ID of the event.
 * @param {number} userId - The ID of the user.
 * @param {object} sqlPool - The mssql connection pool.
 * @returns {Promise<boolean>} True if registration was successful.
 */
exports.registerForEvent = async (eventId, userId, sqlPool) => {
  const request = sqlPool.request();
  request.input('user_id', sql.Int, userId);
  request.input('event_id', sql.Int, eventId);
  const query = `INSERT INTO ${EVENT_PARTICIPANT_TABLE} (user_id, event_id) VALUES (@user_id, @event_id)`;
  const result = await request.query(query);
  return result.rowsAffected > 0;
};
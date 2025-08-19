/**
 * @fileoverview Service for handling event-related business logic.
 */
const { EVENT_TABLE } = require('../models/event_model');
const { EVENT_PARTICIPANT_TABLE } = require('../models/event_participant_model');

/**
 * Fetches all events from the database.
 * @param {object} sqlPool - The MySQL connection pool.
 * @returns {Promise<Array<object>>} An array of event objects.
 */
exports.getAllEvents = async (sqlPool) => {
  const query = `SELECT * FROM ${EVENT_TABLE}`;
  const [rows] = await sqlPool.execute(query);
  return rows;
};

/**
 * Fetches a single event by ID.
 * @param {number} eventId - The ID of the event.
 * @param {object} sqlPool - The MySQL connection pool.
 * @returns {Promise<object>} The event object.
 */
exports.getEventById = async (eventId, sqlPool) => {
  const query = `SELECT * FROM ${EVENT_TABLE} WHERE id = ?`;
  const [rows] = await sqlPool.execute(query, [eventId]);
  return rows[0];
};

/**
 * Creates a new event.
 * @param {object} eventData - The data for the new event.
 * @param {object} sqlPool - The MySQL connection pool.
 * @returns {Promise<object>} The newly created event object.
 */
exports.createEvent = async (eventData, sqlPool) => {
  const { title, theme, description, start_date, end_date, type, location, prize_pool, max_participants, organizer_id } = eventData;
  const query = `
    INSERT INTO ${EVENT_TABLE} (title, theme, description, start_date, end_date, type, location, prize_pool, max_participants, organizer_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [title, theme, description, start_date, end_date, type, location, prize_pool, max_participants, organizer_id];
  const [result] = await sqlPool.execute(query, values);
  return { id: result.insertId, ...eventData };
};

/**
 * Updates an existing event.
 * @param {number} eventId - The ID of the event to update.
 * @param {object} eventData - The new data for the event.
 * @param {object} sqlPool - The MySQL connection pool.
 * @returns {Promise<object>} The updated event object.
 */
exports.updateEvent = async (eventId, eventData, sqlPool) => {
  const query = `UPDATE ${EVENT_TABLE} SET ? WHERE id = ?`;
  await sqlPool.execute(query, [eventData, eventId]);
  return { id: eventId, ...eventData };
};

/**
 * Deletes an event.
 * @param {number} eventId - The ID of the event to delete.
 * @param {object} sqlPool - The MySQL connection pool.
 * @returns {Promise<boolean>} True if the event was deleted, false otherwise.
 */
exports.deleteEvent = async (eventId, sqlPool) => {
  const query = `DELETE FROM ${EVENT_TABLE} WHERE id = ?`;
  const [result] = await sqlPool.execute(query, [eventId]);
  return result.affectedRows > 0;
};

/**
 * Registers a user for an event.
 * @param {number} eventId - The ID of the event.
 * @param {number} userId - The ID of the user.
 * @param {object} sqlPool - The MySQL connection pool.
 * @returns {Promise<boolean>} True if registration was successful.
 */
exports.registerForEvent = async (eventId, userId, sqlPool) => {
  const query = `INSERT INTO ${EVENT_PARTICIPANT_TABLE} (user_id, event_id) VALUES (?, ?)`;
  const [result] = await sqlPool.execute(query, [userId, eventId]);
  return result.affectedRows > 0;
};

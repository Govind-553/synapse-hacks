/**
 * @fileoverview Service for handling certificate-related business logic.
 */
const { CERTIFICATE_TABLE } = require('../models/certificate_model');
const { v4: uuidv4 } = require('uuid');

/**
 * Fetches all certificates for a specific user.
 * @param {number} userId - The ID of the user.
 * @returns {Promise<Array<object>>} An array of certificate objects.
 */
exports.getUserCertificates = async (userId, sqlPool) => {
  const query = `SELECT * FROM ${CERTIFICATE_TABLE} WHERE user_id = ?`;
  const [rows] = await sqlPool.execute(query, [userId]);
  return rows;
};

/**
 * Generates a certificate for a user in an event.
 * @param {number} userId - The ID of the user.
 * @param {number} eventId - The ID of the event.
 * @param {string} achievement - The achievement (e.g., 'Winner', 'Participation').
 * @param {object} sqlPool - The MySQL connection pool.
 * @returns {Promise<object>} The newly created certificate object.
 */
exports.generateCertificate = async (userId, eventId, achievement, sqlPool) => {
  const verificationId = uuidv4(); // Generate a unique ID
  const query = `INSERT INTO ${CERTIFICATE_TABLE} (user_id, event_id, verification_id, achievement) VALUES (?, ?, ?, ?)`;
  const values = [userId, eventId, verificationId, achievement];
  const [result] = await sqlPool.execute(query, values);
  return { id: result.insertId, userId, eventId, verificationId, achievement };
};

/**
 * Finds and serves a certificate file for download.
 * @param {number} certificateId - The ID of the certificate.
 * @param {object} res - The response object.
 * @returns {Promise<void>}
 */
exports.downloadCertificate = async (certificateId, res) => {
  // Placeholder: In a real app, you would fetch the file path from the DB
  // and send it as a download.
  // For now, we'll send a mock response.
  const mockFilePath = `/path/to/certificates/${certificateId}.pdf`;
  res.download(mockFilePath, `certificate-${certificateId}.pdf`);
};

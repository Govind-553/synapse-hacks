/**
 * @fileoverview 
 */
const { CERTIFICATE_TABLE } = require('../models/certificate_model');
const { v4: uuidv4 } = require('uuid');
const sql = require('mssql');

/**
 * Fetches all certificates for a specific user.
 * @param {number} userId - The ID of the user.
 * @param {object} sqlPool - The mssql connection pool.
 * @returns {Promise<Array<object>>} An array of certificate objects.
 */
exports.getUserCertificates = async (userId, sqlPool) => {
  const request = sqlPool.request();
  request.input('userId', sql.Int, userId);
  const query = `SELECT * FROM ${CERTIFICATE_TABLE} WHERE user_id = @userId`;
  const result = await request.query(query);
  return result.recordset;
};

/**
 * Generates a certificate for a user in an event.
 * @param {number} userId - The ID of the user.
 * @param {number} eventId - The ID of the event.
 * @param {string} achievement - The achievement (e.g., 'Winner', 'Participation').
 * @param {object} sqlPool - The mssql connection pool.
 * @returns {Promise<object>} The newly created certificate object.
 */
exports.generateCertificate = async (userId, eventId, achievement, sqlPool) => {
  const verificationId = uuidv4(); // Generate a unique ID
  const request = sqlPool.request();
  request.input('userId', sql.Int, userId);
  request.input('eventId', sql.Int, eventId);
  request.input('verificationId', sql.VarChar, verificationId);
  request.input('achievement', sql.VarChar, achievement);
  const query = `INSERT INTO ${CERTIFICATE_TABLE} (user_id, event_id, verification_id, achievement) VALUES (@userId, @eventId, @verificationId, @achievement)`;
  const result = await request.query(query);
  
  // This is a placeholder for a real-world scenario where you would create the certificate file.
  // In a full implementation, this service would generate a PDF and store it.
  return { id: result.recordset[0].id, userId, eventId, verificationId, achievement };
};

/**
 * Finds and serves a certificate file for download.
 * @param {number} certificateId - The ID of the certificate.
 * @param {object} res - The response object.
 * @returns {Promise<void>}
 */
exports.downloadCertificate = async (certificateId, res) => {
  const mockFilePath = `/path/to/certificates/${certificateId}.pdf`;
  res.download(mockFilePath, `certificate-${certificateId}.pdf`);
};
const certificatesService = require('../services/certificates_service');

/**
 * Fetches all certificates for a specific user.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {object} sqlPool - The mssql connection pool.
 */
exports.getUserCertificates = async (req, res, sqlPool) => {
  try {
    const { userId } = req.params;
    const certificates = await certificatesService.getUserCertificates(userId, sqlPool);
    res.status(200).json(certificates);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching certificates.' });
  }
};

/**
 * Downloads a specific certificate.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.downloadCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    // Note: The downloadCertificate service in the provided files has a placeholder implementation.
    // In a real application, it would handle fetching the file path from the DB.
    const filePath = await certificatesService.downloadCertificate(id, res);
    // The service is responsible for calling res.download(), so we can simply
    // return here, or if the service returns a path, we call download here.
    // Given the service returns a path, we'll assume the controller does the downloading.
    res.download(filePath);
  } catch (error) {
    res.status(500).json({ message: 'Error downloading certificate.' });
  }
};

/**
 * Generates and stores a new certificate.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {object} sqlPool - The mssql connection pool.
 */
exports.generateCertificate = async (req, res, sqlPool) => {
  try {
    const { userId, achievement } = req.body;
    const { eventId } = req.params;
    const certificate = await certificatesService.generateCertificate(userId, eventId, achievement, sqlPool);
    res.status(201).json({ message: 'Certificate generation initiated', certificate });
  } catch (error) {
    res.status(500).json({ message: 'Error generating certificate.' });
  }
};
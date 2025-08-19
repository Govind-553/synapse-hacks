const certificatesService = require('../services/certificates_service');

/**
 * Fetches all certificates for a specific user.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
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
    const filePath = await certificatesService.downloadCertificate(id, res);
    res.status(200).download(filePath);
  } catch (error) {
    res.status(500).json({ message: 'Error downloading certificate.' });
  }
};

/**
 * Generates and stores a new certificate.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
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

const express = require('express');
const router = express.Router();
const certificatesController = require('../controllers/certificates_controller');

/**
 * Initializes certificate routes.
 * @returns {express.Router} The Express router for certificates.
 */
module.exports = () => {
  // Get all certificates for a specific user
  router.get('/:userId', certificatesController.getUserCertificates);

  // Download a specific certificate
  router.get('/:id/download', certificatesController.downloadCertificate);
  
  // Generate a new certificate for an event winner/participant
  router.post('/:eventId', certificatesController.generateCertificate);

  return router;
};

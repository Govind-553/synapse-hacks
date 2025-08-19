const express = require('express');
const router = express.Router();
const announcementsController = require('../controllers/announcements_controller');

/**
 * Initializes announcement routes.
 * @param {object} io - The Socket.io instance.
 * @returns {express.Router} The Express router for announcements.
 */
module.exports = (io) => {
  // Get all announcements for a specific event
  router.get('/:eventId', announcementsController.getAnnouncements);

  // Create a new announcement (for organizers)
  router.post('/', (req, res) => announcementsController.createAnnouncement(req, res, io));
  
  return router;
};

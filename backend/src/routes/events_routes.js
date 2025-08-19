const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/events_controller');

/**
 * Initializes event-related routes.
 * @param {object} sqlPool 
 * @returns {express.Router} 
 */
module.exports = (sqlPool) => {
  // Get all events
  router.get('/', (req, res) => eventsController.getEvents(req, res, sqlPool));

  // Get a specific event by ID
  router.get('/:id', (req, res) => eventsController.getEventById(req, res, sqlPool));

  // Create a new event (for organizers)
  router.post('/', (req, res) => eventsController.createEvent(req, res, sqlPool));

  // Update an existing event (for organizers)
  router.put('/:id', (req, res) => eventsController.updateEvent(req, res, sqlPool));

  // Delete an event (for organizers)
  router.delete('/:id', (req, res) => eventsController.deleteEvent(req, res, sqlPool));

  // Register a participant for an event
  router.post('/:id/register', (req, res) => eventsController.registerForEvent(req, res, sqlPool));

  return router;
};

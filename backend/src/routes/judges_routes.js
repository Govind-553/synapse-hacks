const express = require('express');
const router = express.Router();
const judgesController = require('../controllers/judges_controller');

/**
 * Initializes judge-related routes.
 * @param {object} sqlPool - The MySQL connection pool.
 * @returns {express.Router} The Express router for judges.
 */
module.exports = (sqlPool) => {
  // Get all events assigned to a specific judge
  router.get('/:judgeId/events', (req, res) => judgesController.getAssignedEvents(req, res, sqlPool));

  // Get all submissions for a specific event that need to be reviewed by a judge
  router.get('/events/:eventId/submissions', (req, res) => judgesController.getSubmissionsToReview(req, res, sqlPool));

  // Submit a review for a specific submission
  router.post('/submissions/:submissionId/review', (req, res) => judgesController.submitReview(req, res, sqlPool));

  return router;
};

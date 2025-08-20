const express = require('express');
const router = express.Router();
const submissionsController = require('../controllers/submissions_controller');

/**
 * Initializes submission routes.
 * @param {object} SubmissionModel - The Mongoose Submission model.
 * @returns {express.Router} The Express router for submissions.
 */
module.exports = (SubmissionModel) => {
  // Submit a new project
  router.post('/', submissionsController.submitProject);

  // Get a specific submission by ID
  router.get('/:id', submissionsController.getSubmission);

  // Update an existing submission
  router.put('/:id', submissionsController.updateSubmission);

  // Delete a submission
  router.delete('/:id', submissionsController.deleteSubmission);

  return router;
};
const submissionsService = require('../services/submissions_service');

/**
 * Submits a new project.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.submitProject = async (req, res) => {
  try {
    const submission = await submissionsService.submitProject(req.body);
    res.status(201).json({ message: 'Project submitted successfully', submission });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting project.' });
  }
};

/**
 * Gets a specific submission by ID.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.getSubmission = async (req, res) => {
  try {
    const submission = await submissionsService.getSubmission(req.params.id);
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found.' });
    }
    res.status(200).json(submission);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching submission.' });
  }
};

/**
 * Updates an existing submission.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.updateSubmission = async (req, res) => {
  try {
    const submission = await submissionsService.updateSubmission(req.params.id, req.body);
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found.' });
    }
    res.status(200).json({ message: 'Submission updated successfully', submission });
  } catch (error) {
    res.status(500).json({ message: 'Error updating submission.' });
  }
};

/**
 * Deletes a submission.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.deleteSubmission = async (req, res) => {
  try {
    const success = await submissionsService.deleteSubmission(req.params.id);
    if (!success) {
      return res.status(404).json({ message: 'Submission not found.' });
    }
    res.status(200).json({ message: 'Submission deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting submission.' });
  }
};

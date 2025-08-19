const judgesService = require('../services/judges_service');

/**
 * Gets all events assigned to a specific judge.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {object} sqlPool - The MySQL connection pool.
 */
exports.getAssignedEvents = async (req, res, sqlPool) => {
  try {
    const { judgeId } = req.params;
    const events = await judgesService.getAssignedEvents(judgeId, sqlPool);
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching assigned events.' });
  }
};

/**
 * Gets all submissions for a specific event that need to be reviewed by a judge.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {object} sqlPool - The MySQL connection pool.
 */
exports.getSubmissionsToReview = async (req, res, sqlPool) => {
  try {
    const { eventId } = req.params;
    const { judgeId } = req.query; // Assuming judgeId is passed as a query parameter for this endpoint
    const submissions = await judgesService.getSubmissionsToReview(eventId, judgeId, sqlPool);
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching submissions to review.' });
  }
};

/**
 * Submits a review for a specific submission.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {object} sqlPool - The MySQL connection pool.
 */
exports.submitReview = async (req, res, sqlPool) => {
  try {
    const { submissionId } = req.params;
    const { judgeId, ...reviewData } = req.body;
    const success = await judgesService.submitReview(submissionId, judgeId, reviewData, sqlPool);
    if (!success) {
      return res.status(400).json({ message: 'Failed to submit review.' });
    }
    res.status(200).json({ message: 'Review submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting review.' });
  }
};

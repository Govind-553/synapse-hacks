/**
 * @fileoverview Service for handling judge-related business logic.
 */
const { JUDGE_ASSIGNMENT_TABLE } = require('../models/judge_assignment_model');
const { REVIEW_TABLE } = require('../models/review_model');
const { SubmissionModel } = require('../models/submission_model');
const { EVENT_TABLE } = require('../models/event_model');
const sql = require('mssql');

/**
 * Gets all events assigned to a specific judge.
 * @param {number} judgeId - The ID of the judge.
 * @param {object} sqlPool - The mssql connection pool.
 * @returns {Promise<Array<object>>} An array of event objects.
 */
exports.getAssignedEvents = async (judgeId, sqlPool) => {
  const request = sqlPool.request();
  request.input('judgeId', sql.Int, judgeId);
  const query = `
    SELECT e.* FROM ${JUDGE_ASSIGNMENT_TABLE} ja
    JOIN ${EVENT_TABLE} e ON ja.event_id = e.id
    WHERE ja.judge_id = @judgeId
  `;
  const result = await request.query(query);
  return result.recordset;
};

/**
 * Gets all submissions for a specific event that a judge needs to review.
 * @param {number} eventId - The ID of the event.
 * @param {number} judgeId - The ID of the judge.
 * @param {object} sqlPool - The mssql connection pool.
 * @returns {Promise<Array<object>>} An array of submission objects.
 */
exports.getSubmissionsToReview = async (eventId, judgeId, sqlPool) => {
  const submissions = await SubmissionModel.find({ eventId: eventId });
  const request = sqlPool.request();
  request.input('judgeId', sql.Int, judgeId);
  const reviewedResult = await request.query(
    `SELECT submission_id FROM ${REVIEW_TABLE} WHERE judge_id = @judgeId`
  );
  const reviewedIds = new Set(reviewedResult.recordset.map(row => row.submission_id));

  // Filter out submissions that have already been reviewed by this judge.
  return submissions.filter(sub => !reviewedIds.has(sub.id));
};

/**
 * Submits a review for a specific submission.
 * @param {string} submissionId - The ID of the submission.
 * @param {number} judgeId - The ID of the judge.
 * @param {object} reviewData - The review data including scores and comments.
 * @param {object} sqlPool - The mssql connection pool.
 * @returns {Promise<boolean>} True if the review was submitted successfully.
 */
exports.submitReview = async (submissionId, judgeId, reviewData, sqlPool) => {
  const { innovation, functionality, design, scalability, presentation, comments } = reviewData;
  const request = sqlPool.request();
  request.input('submissionId', sql.VarChar, submissionId);
  request.input('judgeId', sql.Int, judgeId);
  request.input('innovation', sql.Int, innovation);
  request.input('functionality', sql.Int, functionality);
  request.input('design', sql.Int, design);
  request.input('scalability', sql.Int, scalability);
  request.input('presentation', sql.Int, presentation);
  request.input('comments', sql.Text, comments);
  
  const query = `
    INSERT INTO ${REVIEW_TABLE} (submission_id, judge_id, innovation, functionality, design, scalability, presentation, comments)
    VALUES (@submissionId, @judgeId, @innovation, @functionality, @design, @scalability, @presentation, @comments)
  `;
  const result = await request.query(query);

  // Update the total score on the MongoDB submission document
  const totalScore = innovation + functionality + design + scalability + presentation;
  await SubmissionModel.findByIdAndUpdate(submissionId, { total_score: totalScore });

  return result.rowsAffected > 0;
};
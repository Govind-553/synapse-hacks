/**
 * @fileoverview Service for handling project submission logic.
 */
const { SubmissionModel } = require('../models/submission_model');

/**
 * Submits a new project.
 * @param {object} submissionData - The data for the new submission.
 * @returns {Promise<object>} The newly created submission object.
 */
exports.submitProject = async (submissionData) => {
  const newSubmission = new SubmissionModel(submissionData);
  await newSubmission.save();
  return newSubmission;
};

/**
 * Fetches a single submission by ID.
 * @param {string} submissionId - The ID of the submission.
 * @returns {Promise<object>} The submission object.
 */
exports.getSubmission = async (submissionId) => {
  const submission = await SubmissionModel.findById(submissionId);
  return submission;
};

/**
 * Updates an existing submission.
 * @param {string} submissionId - The ID of the submission to update.
 * @param {object} updateData - The new data for the submission.
 * @returns {Promise<object>} The updated submission object.
 */
exports.updateSubmission = async (submissionId, updateData) => {
  const updatedSubmission = await SubmissionModel.findByIdAndUpdate(submissionId, updateData, { new: true });
  return updatedSubmission;
};

/**
 * Deletes a submission.
 * @param {string} submissionId - The ID of the submission to delete.
 * @returns {Promise<boolean>} True if the submission was deleted, false otherwise.
 */
exports.deleteSubmission = async (submissionId) => {
  const result = await SubmissionModel.findByIdAndDelete(submissionId);
  return result !== null;
};

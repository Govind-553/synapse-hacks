/**
 * @fileoverview Submission model using Mongoose for MongoDB.
 */

const mongoose = require('mongoose');
const { SubmissionSchema } = require('./mongo-schemas');

// The Mongoose model for project submissions.
const SubmissionModel = mongoose.model('Submission', SubmissionSchema);

module.exports = {
  SubmissionModel,
};

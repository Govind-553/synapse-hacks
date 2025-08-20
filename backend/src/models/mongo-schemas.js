/**
 * @fileoverview Defines Mongoose schemas for MongoDB collections.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for Submissions
const submissionSchema = new Schema({
  eventId: {
    type: Number,
    required: true,
  },
  teamId: {
    type: Number,
    required: true,
  },
  projectTitle: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  githubUrl: {
    type: String,
    trim: true,
  },
  demoUrl: {
    type: String,
    trim: true,
  },
  videoUrl: {
    type: String,
    trim: true,
  },
  documentationUrl: {
    type: String,
    trim: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// Schema for Announcements
const announcementSchema = new Schema({
  eventId: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'low',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Submission = mongoose.model('Submission', submissionSchema);
const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = {
  Submission,
  Announcement,
};

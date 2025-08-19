/**
 * @fileoverview Defines the Mongoose schemas for the MongoDB database.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for a Project Submission.
// Stores submission-specific details that can be easily updated.
const SubmissionSchema = new Schema({
  team_id: { type: Number, required: true },
  event_id: { type: Number, required: true },
  project_title: { type: String, required: true },
  description: { type: String, required: true },
  github_url: { type: String, required: true },
  demo_video_url: String,
  live_demo_url: String,
  documentation_url: String,
  status: { type: String, enum: ['pending', 'submitted', 'reviewed'], default: 'submitted' },
  total_score: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now }
});

// Schema for Announcements.
// Stores announcements that can be broadcasted in real-time.
const AnnouncementSchema = new Schema({
  event_id: { type: Number, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  priority: { type: String, enum: ['low', 'medium', 'high', 'urgent'], default: 'medium' },
  author_id: { type: Number, required: true },
  created_at: { type: Date, default: Date.now }
});

module.exports = {
  SubmissionSchema,
  AnnouncementSchema,
};

/**
 * @fileoverview Announcement model using Mongoose for MongoDB.
 */

const mongoose = require('mongoose');
const { AnnouncementSchema } = require('./mongo-schemas');

// The Mongoose model for announcements.
const AnnouncementModel = mongoose.model('Announcement', AnnouncementSchema);

module.exports = {
  AnnouncementModel,
};

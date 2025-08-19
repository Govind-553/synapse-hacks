/**
 * @fileoverview Service for handling announcement logic.
 */
const { AnnouncementModel } = require('../models/announcement_model');

/**
 * Fetches all announcements for a specific event.
 * @param {number} eventId - The ID of the event.
 * @returns {Promise<Array<object>>} An array of announcement objects.
 */
exports.getAnnouncements = async (eventId) => {
  const announcements = await AnnouncementModel.find({ event_id: eventId });
  return announcements;
};

/**
 * Creates a new announcement.
 * @param {object} announcementData - The data for the new announcement.
 * @returns {Promise<object>} The newly created announcement object.
 */
exports.createAnnouncement = async (announcementData) => {
  const newAnnouncement = new AnnouncementModel(announcementData);
  await newAnnouncement.save();
  return newAnnouncement;
};

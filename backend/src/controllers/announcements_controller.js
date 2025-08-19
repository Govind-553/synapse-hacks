const announcementsService = require('../services/announcements_service');

/**
 * Fetches announcements for a specific event from MongoDB.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.getAnnouncements = async (req, res) => {
  try {
    const announcements = await announcementsService.getAnnouncements(req.params.eventId);
    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching announcements.' });
  }
};

/**
 * Creates a new announcement and broadcasts it in real-time.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {object} io - The Socket.io instance.
 */
exports.createAnnouncement = async (req, res, io) => {
  try {
    const announcement = await announcementsService.createAnnouncement(req.body);
    // Broadcast the new announcement to all connected clients
    io.to(`event-${announcement.event_id}`).emit('newAnnouncement', announcement);
    res.status(201).json({ message: 'Announcement created successfully', announcement });
  } catch (error) {
    res.status(500).json({ message: 'Error creating announcement.' });
  }
};

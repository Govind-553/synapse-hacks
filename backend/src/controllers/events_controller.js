const eventsService = require('../services/events_service');

/**
 * Fetches all events.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {object} sqlPool - The mssql connection pool.
 */
exports.getEvents = async (req, res, sqlPool) => {
  try {
    const events = await eventsService.getAllEvents(sqlPool);
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events.' });
  }
};

/**
 * Fetches a single event by ID.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {object} sqlPool - The mssql connection pool.
 */
exports.getEventById = async (req, res, sqlPool) => {
  try {
    const event = await eventsService.getEventById(req.params.id, sqlPool);
    if (!event) {
      return res.status(404).json({ message: 'Event not found.' });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event.' });
  }
};

/**
 * Creates a new event.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {object} sqlPool - The mssql connection pool.
 */
exports.createEvent = async (req, res, sqlPool) => {
  try {
    const event = await eventsService.createEvent(req.body, sqlPool);
    res.status(201).json({ message: 'Event created successfully', event });
  } catch (error) {
    res.status(500).json({ message: 'Error creating event.' });
  }
};

/**
 * Updates an existing event.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {object} sqlPool - The mssql connection pool.
 */
exports.updateEvent = async (req, res, sqlPool) => {
  try {
    const eventId = req.params.id;
    const event = await eventsService.updateEvent(eventId, req.body, sqlPool);
    res.status(200).json({ message: 'Event updated successfully', event });
  } catch (error) {
    res.status(500).json({ message: 'Error updating event.' });
  }
};

/**
 * Deletes an event.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {object} sqlPool - The mssql connection pool.
 */
exports.deleteEvent = async (req, res, sqlPool) => {
  try {
    const success = await eventsService.deleteEvent(req.params.id, sqlPool);
    if (!success) {
      return res.status(404).json({ message: 'Event not found.' });
    }
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event.' });
  }
};

/**
 * Registers a participant for an event.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {object} sqlPool - The mssql connection pool.
 */
exports.registerForEvent = async (req, res, sqlPool) => {
  try {
    const { userId } = req.body; // Assuming userId is passed in the body
    const eventId = req.params.id;
    const success = await eventsService.registerForEvent(eventId, userId, sqlPool);
    if (!success) {
      return res.status(400).json({ message: 'Failed to register for event.' });
    }
    res.status(200).json({ message: 'Successfully registered for the event' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering for event.' });
  }
};
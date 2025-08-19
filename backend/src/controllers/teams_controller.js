const teamsService = require('../services/teams_service');

/**
 * Fetches teams for a specific event.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {object} sqlPool - The MySQL connection pool.
 */
exports.getTeamsByEvent = async (req, res, sqlPool) => {
  try {
    const teams = await teamsService.getTeamsByEvent(req.params.eventId, sqlPool);
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching teams.' });
  }
};

/**
 * Creates a new team.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {object} sqlPool - The MySQL connection pool.
 */
exports.createTeam = async (req, res, sqlPool) => {
  try {
    const team = await teamsService.createTeam(req.body, sqlPool);
    res.status(201).json({ message: 'Team created successfully', team });
  } catch (error) {
    res.status(500).json({ message: 'Error creating team.' });
  }
};

/**
 * Invites a member to a team.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {object} sqlPool - The MySQL connection pool.
 */
exports.inviteTeamMember = async (req, res, sqlPool) => {
  try {
    const { userId } = req.body;
    const teamId = req.params.teamId;
    const success = await teamsService.inviteTeamMember(teamId, userId, sqlPool);
    if (!success) {
      return res.status(400).json({ message: 'Failed to invite team member.' });
    }
    res.status(200).json({ message: 'Invitation sent' });
  } catch (error) {
    res.status(500).json({ message: 'Error inviting team member.' });
  }
};

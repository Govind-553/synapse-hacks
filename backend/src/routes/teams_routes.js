const express = require('express');
const router = express.Router();
const teamsController = require('../controllers/teams_controller');

/**
 * Initializes team-related routes.
 * @param {object} sqlPool 
 * @returns {express.Router} 
 */
module.exports = (sqlPool) => {
  // Get all teams for a specific event
  router.get('/:eventId/teams', (req, res) => teamsController.getTeamsByEvent(req, res, sqlPool));

  // Create a new team
  router.post('/', (req, res) => teamsController.createTeam(req, res, sqlPool));

  // Invite a member to an existing team
  router.post('/:teamId/members', (req, res) => teamsController.inviteTeamMember(req, res, sqlPool));

  return router;
};

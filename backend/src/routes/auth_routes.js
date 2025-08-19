const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth_controller');

/**
 * Initializes authentication routes.
 * @param {object} sqlPool
 * @returns {express.Router}
 */
module.exports = (sqlPool) => {
  // Route to register a new user
  router.post('/register', (req, res) => authController.register(req, res, sqlPool));

  // Route for user login
  router.post('/login', (req, res) => authController.login(req, res, sqlPool));

  // Route for Google OAuth login
  router.post('/google', (req, res) => authController.googleLogin(req, res, sqlPool));

  // Route for GitHub OAuth login
  router.post('/github', (req, res) => authController.githubLogin(req, res, sqlPool));

  return router;
};

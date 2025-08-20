const authService = require('../services/auth_service');
const { USER_ROLES } = require('../models/sql-schemas');

/**
 * Registers a new user.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {object} sqlPool - The MySQL connection pool.
 */
exports.register = async (req, res, sqlPool) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Check for all required fields
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    
    // --- FIX: Add validation for the user role against the schema's allowed values ---
    const allowedRoles = Object.values(USER_ROLES);
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: `Invalid user role. Must be one of: ${allowedRoles.join(', ')}` });
    }
    // --- END FIX ---

    const { user, token } = await authService.register({ name, email, password, role }, sqlPool);
    res.status(201).json({ user, token });
  } catch (error) {
    // Check for the specific duplicate email error from the service layer
    if (error.cause === 'DUPLICATE_EMAIL') {
      return res.status(409).json({ message: 'A user with this email already exists.' });
    }
    console.error('Registration Error:', error); // Log the full error for debugging
    res.status(500).json({ message: 'An unexpected error occurred during registration.' });
  }
};

/**
 * Authenticates a user and logs them in.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {object} sqlPool - The MySQL connection pool.
 */
exports.login = async (req, res, sqlPool) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }
    const result = await authService.login(email, password, sqlPool);
    if (!result) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    const { user, token } = result;
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in.' });
  }
};

/**
 * Handles Google OAuth login.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {object} sqlPool - The MySQL connection pool.
 */
exports.googleLogin = async (req, res, sqlPool) => {
  try {
    const { id_token, role } = req.body;
    if (!id_token) {
      return res.status(400).json({ message: 'Google ID token is required.' });
    }
    const googleData = { id: id_token, email: 'google@example.com', name: 'Google User', role: role || USER_ROLES.PARTICIPANT };
    const { user, token } = await authService.googleLogin(googleData, sqlPool);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: 'Error with Google login.' });
  }
};

/**
 * Handles GitHub OAuth login.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {object} sqlPool - The MySQL connection pool.
 */
exports.githubLogin = async (req, res, sqlPool) => {
  try {
    const { code, role } = req.body;
    if (!code) {
      return res.status(400).json({ message: 'GitHub authorization code is required.' });
    }
    const githubData = { id: code, email: 'github@example.com', name: 'GitHub User', role: role || USER_ROLES.PARTICIPANT };
    const { user, token } = await authService.githubLogin(githubData, sqlPool);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: 'Error with GitHub login.' });
  }
};

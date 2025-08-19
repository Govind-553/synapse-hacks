/**
 * @fileoverview Service for handling authentication logic.
 */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/**
 * Registers a new user.
 * @param {object} userData - User data for registration.
 * @param {object} sqlPool - The MySQL connection pool.
 * @returns {Promise<object>} The new user object and a JWT token.
 */
exports.register = async (userData, sqlPool) => {
  // Placeholder: Logic to hash password and insert user into Users table.
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user = { ...userData, password_hash: hashedPassword };
  // Perform database insertion here.
  const token = jwt.sign({ id: 1, role: user.role }, process.env.JWT_SECRET);
  return { user, token };
};

/**
 * Authenticates a user.
 * @param {string} email - User's email.
 * @param {string} password - User's password.
 * @param {object} sqlPool - The MySQL connection pool.
 * @returns {Promise<object>} The user object and a JWT token, or null if authentication fails.
 */
exports.login = async (email, password, sqlPool) => {
  // Placeholder: Logic to fetch user by email and compare passwords.
  const user = { id: 1, email, role: 'participant', password_hash: 'hashed_password' }; // Mock user
  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) return null;
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
  return { user, token };
};

/**
 * Handles Google OAuth login.
 * @param {object} googleData - Data from Google OAuth.
 * @param {object} sqlPool - The MySQL connection pool.
 * @returns {Promise<object>} The user object and a JWT token.
 */
exports.googleLogin = async (googleData, sqlPool) => {
  // Placeholder: Logic to find or create user via Google ID.
  const user = { id: 2, email: 'google@example.com', role: 'participant' };
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
  return { user, token };
};

/**
 * Handles GitHub OAuth login.
 * @param {object} githubData - Data from GitHub OAuth.
 * @param {object} sqlPool - The MySQL connection pool.
 * @returns {Promise<object>} The user object and a JWT token.
 */
exports.githubLogin = async (githubData, sqlPool) => {
  // Placeholder: Logic to find or create user via GitHub ID.
  const user = { id: 3, email: 'github@example.com', role: 'participant' };
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
  return { user, token };
};

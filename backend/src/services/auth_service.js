/**
 * @fileoverview Service for handling authentication logic.
 */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { USER_TABLE } = require('../models/user_model');

/**
 * Registers a new user.
 * @param {object} userData - User data for registration.
 * @param {object} sqlPool - The MySQL connection pool.
 * @returns {Promise<object>} The new user object and a JWT token.
 */
exports.register = async (userData, sqlPool) => {
  const { name, email, password, role } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);

  const query = `INSERT INTO ${USER_TABLE} (name, email, password_hash, role) VALUES (?, ?, ?, ?)`;
  const values = [name, email, hashedPassword, role];
  
  await sqlPool.execute(query, values);
  const [rows] = await sqlPool.execute(`SELECT id FROM ${USER_TABLE} WHERE email = ?`, [email]);
  const user = rows[0];

  const token = jwt.sign({ id: user.id, role: role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
  return { user: { id: user.id, name, email, role }, token };
};

/**
 * Authenticates a user.
 * @param {string} email - User's email.
 * @param {string} password - User's password.
 * @param {object} sqlPool - The MySQL connection pool.
 * @returns {Promise<object>} The user object and a JWT token, or null if authentication fails.
 */
exports.login = async (email, password, sqlPool) => {
  const [rows] = await sqlPool.execute(`SELECT id, email, password_hash, role FROM ${USER_TABLE} WHERE email = ?`, [email]);
  const user = rows[0];

  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) return null;

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
  return { user: { id: user.id, email, role: user.role }, token };
};

/**
 * Handles Google OAuth login.
 * @param {object} googleData - Data from Google OAuth.
 * @param {object} sqlPool - The MySQL connection pool.
 * @returns {Promise<object>} The user object and a JWT token.
 */
exports.googleLogin = async (googleData, sqlPool) => {
  // Placeholder: In a real app, you would verify the Google token first.
  const { id, email, name, role } = googleData;
  const [rows] = await sqlPool.execute(`SELECT id, role FROM ${USER_TABLE} WHERE google_id = ?`, [id]);
  let user = rows[0];

  if (!user) {
    // If user doesn't exist, create a new one.
    const query = `INSERT INTO ${USER_TABLE} (name, email, google_id, role) VALUES (?, ?, ?, ?)`;
    const [result] = await sqlPool.execute(query, [name, email, id, role || 'participant']);
    user = { id: result.insertId, role: role || 'participant' };
  }

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
  return { user: { id: user.id, email, role: user.role }, token };
};

/**
 * Handles GitHub OAuth login.
 * @param {object} githubData - Data from GitHub OAuth.
 * @param {object} sqlPool - The MySQL connection pool.
 * @returns {Promise<object>} The user object and a JWT token.
 */
exports.githubLogin = async (githubData, sqlPool) => {
  // Placeholder: In a real app, you would verify the GitHub token first.
  const { id, email, name, role } = githubData;
  const [rows] = await sqlPool.execute(`SELECT id, role FROM ${USER_TABLE} WHERE github_id = ?`, [id]);
  let user = rows[0];

  if (!user) {
    // If user doesn't exist, create a new one.
    const query = `INSERT INTO ${USER_TABLE} (name, email, github_id, role) VALUES (?, ?, ?, ?)`;
    const [result] = await sqlPool.execute(query, [name, email, id, role || 'participant']);
    user = { id: result.insertId, role: role || 'participant' };
  }

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
  return { user: { id: user.id, email, role: user.role }, token };
};

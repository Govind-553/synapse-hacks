/**
 * @fileoverview Service for handling authentication logic.
 */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { USER_TABLE } = require('../models/user_model');
const sql = require('mssql'); 

/**
 * Registers a new user.
 * @param {object} userData - User data for registration.
 * @param {object} sqlPool - The mssql connection pool.
 * @returns {Promise<object>} The new user object and a JWT token.
 */
exports.register = async (userData, sqlPool) => {
  const { name, email, password, role } = userData;
  
  // Create a request object from the pool
  const request = sqlPool.request();
  request.input('email', sql.VarChar, email);

  // Check for existing user first
  const existingUserResult = await request.query(`SELECT id FROM ${USER_TABLE} WHERE email = @email`);
  
  if (existingUserResult.recordset.length > 0) {
    throw new Error('Email already exists.', { cause: 'DUPLICATE_EMAIL' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // Use prepared statements for the insert query
  const insertRequest = sqlPool.request();
  insertRequest.input('name', sql.VarChar, name);
  insertRequest.input('email', sql.VarChar, email);
  insertRequest.input('password_hash', sql.VarChar, hashedPassword);
  insertRequest.input('role', sql.VarChar, role);
  
  const insertQuery = `INSERT INTO ${USER_TABLE} (name, email, password_hash, role) VALUES (@name, @email, @password_hash, @role)`;
  await insertRequest.query(insertQuery);

  // Fetch the newly created user's ID
  const selectIdRequest = sqlPool.request();
  selectIdRequest.input('email', sql.VarChar, email);
  const selectIdResult = await selectIdRequest.query(`SELECT id FROM ${USER_TABLE} WHERE email = @email`);
  const user = selectIdResult.recordset[0];

  const token = jwt.sign({ id: user.id, role: role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
  return { user: { id: user.id, name, email, role }, token };
};

/**
 * Authenticates a user.
 * @param {string} email - User's email.
 * @param {string} password - User's password.
 * @param {object} sqlPool - The mssql connection pool.
 * @returns {Promise<object>} The user object and a JWT token, or null if authentication fails.
 */
exports.login = async (email, password, sqlPool) => {
  const request = sqlPool.request();
  request.input('email', sql.VarChar, email);
  const result = await request.query(`SELECT id, email, password_hash, role FROM ${USER_TABLE} WHERE email = @email`);
  const user = result.recordset[0];

  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) return null;

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
  return { user: { id: user.id, email, role: user.role }, token };
};

/**
 * Handles Google OAuth login.
 * @param {object} googleData - Data from Google OAuth.
 * @param {object} sqlPool - The mssql connection pool.
 * @returns {Promise<object>} The user object and a JWT token.
 */
exports.googleLogin = async (googleData, sqlPool) => {
  const { id, email, name, role } = googleData;
  
  const request = sqlPool.request();
  request.input('google_id', sql.VarChar, id);
  const result = await request.query(`SELECT id, role FROM ${USER_TABLE} WHERE google_id = @google_id`);
  let user = result.recordset[0];

  if (!user) {
    const insertRequest = sqlPool.request();
    insertRequest.input('name', sql.VarChar, name);
    insertRequest.input('email', sql.VarChar, email);
    insertRequest.input('google_id', sql.VarChar, id);
    insertRequest.input('role', sql.VarChar, role || 'participant');
    
    const insertQuery = `INSERT INTO ${USER_TABLE} (name, email, google_id, role) VALUES (@name, @email, @google_id, @role)`;
    const insertResult = await insertRequest.query(insertQuery);
    user = { id: insertResult.recordset[0].id, role: role || 'participant' };
  }

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
  return { user: { id: user.id, email, role: user.role }, token };
};

/**
 * Handles GitHub OAuth login.
 * @param {object} githubData - Data from GitHub OAuth.
 * @param {object} sqlPool - The mssql connection pool.
 * @returns {Promise<object>} The user object and a JWT token.
 */
exports.githubLogin = async (githubData, sqlPool) => {
  const { id, email, name, role } = githubData;
  
  const request = sqlPool.request();
  request.input('github_id', sql.VarChar, id);
  const result = await request.query(`SELECT id, role FROM ${USER_TABLE} WHERE github_id = @github_id`);
  let user = result.recordset[0];

  if (!user) {
    const insertRequest = sqlPool.request();
    insertRequest.input('name', sql.VarChar, name);
    insertRequest.input('email', sql.VarChar, email);
    insertRequest.input('github_id', sql.VarChar, id);
    insertRequest.input('role', sql.VarChar, role || 'participant');
    
    const insertQuery = `INSERT INTO ${USER_TABLE} (name, email, github_id, role) VALUES (@name, @email, @github_id, @role)`;
    const insertResult = await insertRequest.query(insertQuery);
    user = { id: insertResult.recordset[0].id, role: role || 'participant' };
  }

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
  return { user: { id: user.id, email, role: user.role }, token };
};

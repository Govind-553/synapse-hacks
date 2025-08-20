const mongoose = require('mongoose');
const sql = require('mssql');
const {
  CREATE_USERS_TABLE,
  CREATE_EVENTS_TABLE,
  CREATE_TEAMS_TABLE,
  CREATE_TEAM_MEMBERS_TABLE,
  CREATE_EVENT_PARTICIPANTS_TABLE,
  CREATE_JUDGE_ASSIGNMENTS_TABLE,
  CREATE_REVIEWS_TABLE,
  CREATE_CERTIFICATES_TABLE,
} = require('../models/sql-schemas');

/**
 * Connects to MongoDB and sets up the SQL schema.
 * @param {object} sqlConfig - The mssql configuration object.
 * @returns {Promise<object>} An object containing the connected SQL pool and Mongoose.
 */
async function setupDatabase(sqlConfig) {
  try {
    // --- Connect to MongoDB ---
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // --- Connect to Azure SQL Server ---
    const sqlConnection = await sql.connect(sqlConfig);
    const request = sqlConnection.request();

    // Create tables if they don't exist
    await request.query(CREATE_USERS_TABLE);
    await request.query(CREATE_EVENTS_TABLE);
    await request.query(CREATE_TEAMS_TABLE);
    await request.query(CREATE_TEAM_MEMBERS_TABLE);
    await request.query(CREATE_EVENT_PARTICIPANTS_TABLE);
    await request.query(CREATE_JUDGE_ASSIGNMENTS_TABLE);
    await request.query(CREATE_REVIEWS_TABLE);
    await request.query(CREATE_CERTIFICATES_TABLE);
    
    console.log('Azure SQL schema created successfully.');
    sqlConnection.close();

    // Return an object with both database connections
    const sqlPool = await new sql.ConnectionPool(sqlConfig).connect();
    return { sqlPool, mongo: mongoose };

  } catch (error) {
    console.error('Database setup failed:', error);
    process.exit(1);
  }
}

module.exports = { setupDatabase };

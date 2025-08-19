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
  CREATE_CERTIFICATES_TABLE
} = require('../models/sql-schemas');

/**
 * Connects to MongoDB and sets up the SQL schema.
 */
async function setupDatabase() {
  try {
    const config = {
        server: process.env.SQL_HOST,
        user: process.env.SQL_USER,
        password: process.env.SQL_PASSWORD,
        database: process.env.SQL_DATABASE,
        options: {
            encrypt: true, // For Azure SQL
            trustServerCertificate: false,
        }
    };
    // Connect to SQL Server
    const sqlConnection = await sql.connect(config);

    // Create tables if they don't exist
    await sqlConnection.request().query(CREATE_USERS_TABLE);
    await sqlConnection.request().query(CREATE_EVENTS_TABLE);
    await sqlConnection.request().query(CREATE_TEAMS_TABLE);
    await sqlConnection.request().query(CREATE_TEAM_MEMBERS_TABLE);
    await sqlConnection.request().query(CREATE_EVENT_PARTICIPANTS_TABLE);
    await sqlConnection.request().query(CREATE_JUDGE_ASSIGNMENTS_TABLE);
    await sqlConnection.request().query(CREATE_REVIEWS_TABLE);
    await sqlConnection.request().query(CREATE_CERTIFICATES_TABLE);
    
    console.log('SQL schema created successfully.');
    sqlConnection.close();

  } catch (error) {
    console.error('Database setup failed:', error);
    process.exit(1);
  }
}

module.exports = { setupDatabase };
/**
 * @fileoverview Defines the SQL schemas for the MySQL database.
 * This file contains the CREATE TABLE statements for all necessary tables.
 */

// User roles enumeration for clarity.
const USER_ROLES = {
  PARTICIPANT: 'participant',
  ORGANIZER: 'organizer',
  JUDGE: 'judge',
};

// SQL statement to create the Users table.
// Stores user data including authentication details.
const CREATE_USERS_TABLE = `
  CREATE TABLE IF NOT EXISTS Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255),
    role ENUM('${USER_ROLES.PARTICIPANT}', '${USER_ROLES.ORGANIZER}', '${USER_ROLES.JUDGE}') NOT NULL,
    github_id VARCHAR(255) UNIQUE,
    google_id VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

// SQL statement to create the Events table.
// Stores information about each hackathon event.
const CREATE_EVENTS_TABLE = `
  CREATE TABLE IF NOT EXISTS Events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    theme VARCHAR(255),
    description TEXT,
    start_date DATE,
    end_date DATE,
    type VARCHAR(50),
    location VARCHAR(255),
    prize_pool VARCHAR(100),
    max_participants INT,
    organizer_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (organizer_id) REFERENCES Users(id) ON DELETE CASCADE
  );
`;

// SQL statement to create the Teams table.
// Stores information about teams participating in an event.
const CREATE_TEAMS_TABLE = `
  CREATE TABLE IF NOT EXISTS Teams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    event_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES Events(id) ON DELETE CASCADE
  );
`;

// SQL statement to create the TeamMembers table.
// Links users to their respective teams.
const CREATE_TEAM_MEMBERS_TABLE = `
  CREATE TABLE IF NOT EXISTS TeamMembers (
    user_id INT NOT NULL,
    team_id INT NOT NULL,
    role VARCHAR(255),
    PRIMARY KEY (user_id, team_id),
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (team_id) REFERENCES Teams(id) ON DELETE CASCADE
  );
`;

// SQL statement to create the JudgeAssignments table.
// Assigns judges to specific events.
const CREATE_JUDGE_ASSIGNMENTS_TABLE = `
  CREATE TABLE IF NOT EXISTS JudgeAssignments (
    judge_id INT NOT NULL,
    event_id INT NOT NULL,
    PRIMARY KEY (judge_id, event_id),
    FOREIGN KEY (judge_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES Events(id) ON DELETE CASCADE
  );
`;

// SQL statement to create the Reviews table.
// Stores judging scores and comments for each submission.
const CREATE_REVIEWS_TABLE = `
  CREATE TABLE IF NOT EXISTS Reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    submission_id INT NOT NULL,
    judge_id INT NOT NULL,
    innovation INT,
    functionality INT,
    design INT,
    scalability INT,
    presentation INT,
    comments TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (judge_id) REFERENCES Users(id) ON DELETE CASCADE
  );
`;

// SQL statement to create the Certificates table.
// Stores metadata for certificates awarded to users.
const CREATE_CERTIFICATES_TABLE = `
  CREATE TABLE IF NOT EXISTS Certificates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    verification_id VARCHAR(255) NOT NULL UNIQUE,
    achievement VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES Events(id) ON DELETE CASCADE
  );
`;

module.exports = {
  USER_ROLES,
  CREATE_USERS_TABLE,
  CREATE_EVENTS_TABLE,
  CREATE_TEAMS_TABLE,
  CREATE_TEAM_MEMBERS_TABLE,
  CREATE_JUDGE_ASSIGNMENTS_TABLE,
  CREATE_REVIEWS_TABLE,
  CREATE_CERTIFICATES_TABLE,
};

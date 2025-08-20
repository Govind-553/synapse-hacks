/**
 * @fileoverview Defines the SQL schemas for the Azure SQL database.
 * This file contains the CREATE TABLE statements for all necessary tables,
 * using T-SQL compatible syntax.
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
  IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Users]') AND type in (N'U'))
  BEGIN
    CREATE TABLE Users (
      id INT PRIMARY KEY IDENTITY(1,1),
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password_hash VARCHAR(255),
      role VARCHAR(50) NOT NULL CHECK (role IN ('${USER_ROLES.PARTICIPANT}', '${USER_ROLES.ORGANIZER}', '${USER_ROLES.JUDGE}')),
      github_id VARCHAR(255),
      google_id VARCHAR(255),
      created_at DATETIME DEFAULT GETDATE()
    );
  END;

  -- Remove old unique constraints if they exist
  IF EXISTS (SELECT * FROM sys.indexes WHERE name = 'UQ__Users__F35985012560F4D0' AND object_id = OBJECT_ID('dbo.Users'))
  BEGIN
      DROP INDEX UQ__Users__F35985012560F4D0 ON dbo.Users;
  END;
  IF EXISTS (SELECT * FROM sys.indexes WHERE name = 'UQ__Users__E7B7A5881452445E' AND object_id = OBJECT_ID('dbo.Users'))
  BEGIN
      DROP INDEX UQ__Users__E7B7A5881452445E ON dbo.Users;
  END;

  -- Create unique indexes on github_id and google_id only for non-null values
  IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'UQ_Users_github_id_not_null' AND object_id = OBJECT_ID('dbo.Users'))
  BEGIN
    CREATE UNIQUE NONCLUSTERED INDEX UQ_Users_github_id_not_null
    ON dbo.Users(github_id)
    WHERE github_id IS NOT NULL;
  END;

  IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'UQ_Users_google_id_not_null' AND object_id = OBJECT_ID('dbo.Users'))
  BEGIN
    CREATE UNIQUE NONCLUSTERED INDEX UQ_Users_google_id_not_null
    ON dbo.Users(google_id)
    WHERE google_id IS NOT NULL;
  END;
`;

// SQL statement to create the Events table.
// Stores information about each hackathon event.
const CREATE_EVENTS_TABLE = `
  IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Events]') AND type in (N'U'))
  BEGIN
    CREATE TABLE Events (
      id INT PRIMARY KEY IDENTITY(1,1),
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
      created_at DATETIME DEFAULT GETDATE(),
      FOREIGN KEY (organizer_id) REFERENCES Users(id) ON DELETE NO ACTION
    );
  END;
`;

// SQL statement to create the Teams table.
// Stores information about teams participating in an event.
const CREATE_TEAMS_TABLE = `
  IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Teams]') AND type in (N'U'))
  BEGIN
    CREATE TABLE Teams (
      id INT PRIMARY KEY IDENTITY(1,1),
      name VARCHAR(255) NOT NULL,
      event_id INT NOT NULL,
      created_at DATETIME DEFAULT GETDATE(),
      FOREIGN KEY (event_id) REFERENCES Events(id) ON DELETE NO ACTION
    );
  END;
`;

// SQL statement to create the TeamMembers table.
// Links users to their respective teams.
const CREATE_TEAM_MEMBERS_TABLE = `
  IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[TeamMembers]') AND type in (N'U'))
  BEGIN
    CREATE TABLE TeamMembers (
      user_id INT NOT NULL,
      team_id INT NOT NULL,
      role VARCHAR(255),
      PRIMARY KEY (user_id, team_id),
      FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE NO ACTION,
      FOREIGN KEY (team_id) REFERENCES Teams(id) ON DELETE NO ACTION
    );
  END;
`;

// SQL statement to create the EventParticipants table.
// Joins users to events they are participating in.
const CREATE_EVENT_PARTICIPANTS_TABLE = `
  IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[EventParticipants]') AND type in (N'U'))
  BEGIN
    CREATE TABLE EventParticipants (
      user_id INT NOT NULL,
      event_id INT NOT NULL,
      registration_date DATETIME DEFAULT GETDATE(),
      PRIMARY KEY (user_id, event_id),
      FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE NO ACTION,
      FOREIGN KEY (event_id) REFERENCES Events(id) ON DELETE NO ACTION
    );
  END;
`;

// SQL statement to create the JudgeAssignments table.
// Assigns judges to specific events.
const CREATE_JUDGE_ASSIGNMENTS_TABLE = `
  IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[JudgeAssignments]') AND type in (N'U'))
  BEGIN
    CREATE TABLE JudgeAssignments (
      judge_id INT NOT NULL,
      event_id INT NOT NULL,
      PRIMARY KEY (judge_id, event_id),
      FOREIGN KEY (judge_id) REFERENCES Users(id) ON DELETE NO ACTION,
      FOREIGN KEY (event_id) REFERENCES Events(id) ON DELETE NO ACTION
    );
  END;
`;

// SQL statement to create the Reviews table.
// Stores judging scores and comments for each submission.
const CREATE_REVIEWS_TABLE = `
  IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Reviews]') AND type in (N'U'))
  BEGIN
    CREATE TABLE Reviews (
      id INT PRIMARY KEY IDENTITY(1,1),
      -- A submission_id is needed, but since submissions are in Mongo,
      -- we will not add a foreign key constraint.
      submission_id VARCHAR(255) NOT NULL, 
      judge_id INT NOT NULL,
      innovation INT,
      functionality INT,
      design INT,
      scalability INT,
      presentation INT,
      comments TEXT,
      created_at DATETIME DEFAULT GETDATE(),
      FOREIGN KEY (judge_id) REFERENCES Users(id) ON DELETE NO ACTION
    );
  END;
`;

// SQL statement to create the Certificates table.
// Stores metadata for certificates awarded to users.
const CREATE_CERTIFICATES_TABLE = `
  IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Certificates]') AND type in (N'U'))
  BEGIN
    CREATE TABLE Certificates (
      id INT PRIMARY KEY IDENTITY(1,1),
      user_id INT NOT NULL,
      event_id INT NOT NULL,
      verification_id VARCHAR(255) NOT NULL UNIQUE,
      achievement VARCHAR(255),
      created_at DATETIME DEFAULT GETDATE(),
      FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE NO ACTION,
      FOREIGN KEY (event_id) REFERENCES Events(id) ON DELETE NO ACTION
    );
  END;
`;

module.exports = {
  USER_ROLES,
  CREATE_USERS_TABLE,
  CREATE_EVENTS_TABLE,
  CREATE_TEAMS_TABLE,
  CREATE_TEAM_MEMBERS_TABLE,
  CREATE_EVENT_PARTICIPANTS_TABLE,
  CREATE_JUDGE_ASSIGNMENTS_TABLE,
  CREATE_REVIEWS_TABLE,
  CREATE_CERTIFICATES_TABLE,
};

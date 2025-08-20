# 🚀 Welcome to SynapseHacks

SynapseHacks is a comprehensive event & hackathon hosting platform.
It provides a robust, role-based ecosystem for organizers, participants, and judges, with a focus on streamlined workflows, real-time communication, and transparency. 

--- 

## 📂 Project Structure
        synapse-hacks/
         ├── backend/
         │   ├── src/
         │   │   ├── config/
         │   │   │   └── db.js          # Database connection setup
         │   │   ├── controllers/       
         │   │   ├── middleware/        
         │   │   ├── models/
         │   │   │   ├── mongo-schemas.js  # MongoDB schemas
         │   │   │   └── sql-schemas.js    # Azure SQL schemas
         │   │   ├── routes/
         │   │   ├── services/
         │   │   └── server.js          # Main backend server
         │   ├── package.json
         │   └── ...
         └── frontend/
         ├── src/
         │   ├── components/        # Reusable React components
         │   └── pages/             # Application pages
         ├── package.json
         └── ... 

---    

## Tech Stack
- The platform is built with a modern, full-stack architecture.

- *Frontend:* React, TypeScript, Tailwind CSS, Shadcn/UI, React Router Dom

- *Backend:* Node.js, Express.js, Socket.io, JWT

- *Database:* 
   - Azure SQL (for structured data like users, events, and teams) 
   - MongoDB (for unstructured data like submissions and announcements)

--- 

## ⚙️ Getting Started 

### ✅ Prerequisites

- Node.js
 (version 18 or higher)

- npm

- A MongoDB URI

- An Azure SQL database connection string

---

## 🔧 Installation
### 1️⃣ Clone the Repository
       git clone https://github.com/your-username/synapse-hacks.git
       cd synapse-hacks

### 2️⃣ Backend Setup
       cd backend
       npm install

### Copy environment variables file
       cp .env.example .env


### Fill in the required variables inside .env:

       SQL_HOST=
       SQL_USER=
       SQL_PASSWORD=
       SQL_DATABASE=
       MONGO_URI=
       JWT_SECRET=


### Start the backend:

       npm start

### 3️⃣ Frontend Setup
       cd ../frontend
       npm install
       npm run dev


### Frontend: 
       👉 http://localhost:8080
       (or Vite default port)

### Backend API: 
       👉 http://localhost:5000 

---

## ✨ Features

- 🎉 Event Management – Create, configure, and manage hackathon events

- 👥 Role-Based Access – Separate dashboards for participants, organizers & judges

- 📊 Live Leaderboard – Real-time tracking of project rankings

- 📢 Real-Time Announcements – Instant updates using Socket.io

- 📂 Project Submissions – Teams submit projects with links & documentation

- 🏆 Automated Certificates – Generate & distribute participation & achievement certificates

--- 

## 🛣️ Roadmap

- ✅ Implement full judging workflow (multi-rounds)

- 💬 Integrate real-time chat & Q&A channels

- 📈 Enhance analytics dashboard for organizers

- 🎨 Improve UI/UX for better user experience 

---

## 👨‍💻 Team

| Name              | Role                                 |
|-------------------|--------------------------------------|
| Govind Choudhari  | Team Lead, Full-Stack Developer      |
| Abhiruchi Kunte   | UI/UX, Backend Developer             |
| Sahil Kale        | UI/UX Designer, Frontend Developer   |
| Nishank Jain      | Backend Developer & Integration      |

--- 

## A Special Note for the Judges 🏆
Thank you for taking the time to evaluate our project. We have built this platform to address the core requirements of the SynapHack 3.0 problem statement. We've focused on creating a functional and user-friendly experience for all roles. We appreciate your feedback and hope our solution meets your expectations. 🙏

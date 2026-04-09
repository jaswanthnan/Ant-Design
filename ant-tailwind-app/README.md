# Candidate Management Portal 🚀

A modern, full-stack HR Candidate Pipeline application built using **React**, **Vite**, **Tailwind CSS**, **Ant Design**, and **MongoDB**. 

This application allows HR teams or recruiters to view, add, edit, delete, and search for candidates in a seamless, fast, and beautiful interface.

## ✨ Features

- **Full-Stack Integration:** Connected to a local Express/Node.js backend utilizing MongoDB for data persistence.
- **Modern UI Options:** Designed meticulously with custom **Ant Design** components configured seamlessly with **Tailwind CSS** tokens.
- **Candidate Pipeline:** A dynamic data table equipped with avatars, formatted roles, location tags, and dynamic status tags.
- **Live Search Filtering:** Instantly filter candidates by full name, position/role, location, or status.
- **CRUD Functionality:** 
  - **Create**: Fully validated "Add Candidate" modal.
  - **Read**: Live data pulling efficiently from the database.
  - **Update**: Re-uses the candidate modal to seamlessly edit existing user data.
  - **Delete**: Protected delete operation leveraging Ant Design's `Popconfirm` feature.

## 🛠 Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS v3, Ant Design (`antd`)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)

---

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/try/download/community) (Running locally on `mongodb://127.0.0.1:27017` or configurable via atlas URI).

### 1. Clone the project and install dependencies
First, install the frontend dependencies from the root of the project:
```bash
# In the ant-tailwind-app directory
npm install
```

Then, install the backend dependencies:
```bash
cd server
npm install
```

### 2. Configure Environment Variables
Inside the `server/` directory, there is a `.env` file that handles connection parameters:
```env
MONGO_URI=mongodb://127.0.0.1:27017/HRPortal
PORT=5000
```
*Note: You can swap the `MONGO_URI` to a MongoDB Atlas cluster string if you prefer cloud hosting.*

### 3. Run the Application

You need two terminals to run the frontend and the backend simultaneously.

**Terminal 1 (Backend Server):**
```bash
cd server
node index.js
```

**Terminal 2 (Frontend Client):**
```bash
# From the ant-tailwind-app directory
npm run dev
```

### 4. Visit the App
Navigate to [http://localhost:5173/](http://localhost:5173/) to interact with your dashboard.

---

## 📂 Project Structure

```
ant-tailwind-app/
├── server/                   # Express.js REST API
│   ├── models/               
│   │   └── Candidate.js      # Mongoose schema for candidate data
│   ├── .env                  # Environment Variables
│   └── index.js              # Server entry point & CRUD API Routes
├── src/                      # React Frontend Application
│   ├── App.jsx               # Main dashboard UI, State Management, Fetch logic
│   ├── index.css             # Tailwind base imports
│   └── main.jsx              # React app injection point
├── tailwind.config.js        # Tailwind settings mapped to index.html & src
└── package.json              # Project dependencies & scripts
```

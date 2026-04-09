<div align="center">
  <h1 align="center">Candidate Management Portal</h1>
  <p align="center">
    A modern, full-stack HR Candidate Pipeline application built using the MERN stack integrated with Tailwind CSS and Ant Design.
  </p>
  <p>
    <a href="https://github.com/jaswanthnan/Ant-Design/issues">Report Bug</a>
    ·
    <a href="https://github.com/jaswanthnan/Ant-Design/issues">Request Feature</a>
  </p>
</div>

<br />

## 🔗 Repository
[Live Repository: jaswanthnan/Ant-Design](https://github.com/jaswanthnan/Ant-Design)

## 📋 About The Project

This project accelerates the recruitment process by providing HR teams and technical recruiters with a seamless, fast, and highly visual dashboard to view, add, edit, track, and remove candidates. Equipped with an instantly responsive search filter, secure CRUD operations, and beautifully crafted data tables.

### ✨ Key Features

* **Full-Stack MERN Architecture:** Scalable Node.js & Express backend natively connected to MongoDB.
* **Component-Driven UI:** Highly customizable **Ant Design** elements combined meticulously with **Tailwind CSS**.
* **Real-time Pipeline:** A responsive candidate data table embedded with status tags and dynamically generated DiceBear avatars.
* **Instant Search & Filtering:** Find candidates instantly by typing names, positions, statuses, or locations without waiting for backend calls.
* **Complete CRUD Engine:** 
  * Add completely new candidates via a sleek Modal pop-up.
  * Edit active candidate rows automatically leveraging the pre-populated forms.
  * Safely Delete candidates utilizing Ant Design's `Popconfirm` guards.

### 🛠️ Built With

* **Frontend:** [React](https://reactjs.org/), [Vite](https://vitejs.dev/), [Tailwind CSS v3](https://tailwindcss.com/), [Ant Design](https://ant.design/)
* **Backend:** [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/)
* **Database:** [MongoDB](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/)

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing.

### Prerequisites

Make sure you have installed:
* [Node.js](https://nodejs.org/en/)
* [MongoDB](https://www.mongodb.com/try/download/community) (Running locally, or have an Atlas Cluster ready)

### 1. Installation

First, clone the repository and navigate into the project directory:

```bash
git clone https://github.com/jaswanthnan/Ant-Design.git
cd Ant-Design
```

Once inside the `ant-tailwind-app` directory, install all client-side dependencies:
```bash
npm install
```

Install the backend dependencies:
```bash
cd server
npm install
```

### 2. Environment Variables

Create or edit the `.env` file located natively inside the `server/` directory and update the MongoDB connection string if necessary:

```env
# server/.env
MONGO_URI=mongodb://127.0.0.1:27017/HRPortal
PORT=5000
```
> **Note:** For cloud deployments, replace `mongodb://127.0.0.1...` with your MongoDB Atlas URL.

### 3. Start the Development Servers

You will need to open **two** separate terminal windows to run the Frontend and the Backend simultaneously.

**Start the Backend API Server:**
Navigate to the `server` folder, and start Node:
```bash
cd server
node index.js
```
*(The server will immediately connect to MongoDB and listen on `http://localhost:5000`)*

**Start the Frontend Client:**
In your second terminal, navigate back to the root `ant-tailwind-app` folder:
```bash
npm run dev
```
*(The React application will automatically open and deploy to `http://localhost:5173`)*

---

## 📡 API Endpoints (Backend)

The Express backend exposes the following RESTful routes on `http://localhost:5000`:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/candidates` | Retrieves the list of all active candidates |
| `POST` | `/api/candidates` | Submits and creates a new candidate |
| `PUT` | `/api/candidates/:id` | Modifies an existing candidate's data |
| `DELETE` | `/api/candidates/:id` | Removes a candidate irrevocably from the database |

---

## 📂 Project Tree

```text
ant-tailwind-app/
│
├── server/                   # Backend Express infrastructure
│   ├── models/               
│   │   └── Candidate.js      # MongoDB Mongoose Schema definitions
│   ├── .env                  # Database & Server environment properties
│   └── index.js              # Entry point & REST API Route Handlers
│
├── src/                      # Frontend Vite + React application
│   ├── App.jsx               # Main UI Layout, Pipeline Tables, Forms, and Logic
│   ├── index.css             # Tailwind base utility configurations
│   └── main.jsx              # Application root DOM injection
│
├── tailwind.config.js        # Global Tailwind framework configurations
└── package.json              # Client scripts and core dependencies
```

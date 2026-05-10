# 🧑‍💻 CodeSpace — Online Coding Platform

**CodeSpace** is a full-stack web platform designed for coding practice, contests, and company-driven recruitment challenges.  
It allows **candidates** to solve problems and participate in contests, **companies** to host challenges, and **admins** to manage the entire platform — all in one place.

---

## 🚀 Features

- 👨‍🎓 **Candidate Dashboard:** Practice coding problems, attend live contests, and view submissions.
- 🏢 **Company Portal:** Create and manage company profiles, host specific hiring challenges.
- 🛠️ **Admin Panel:** Comprehensive management of users, problems, contests, and overall platform monitoring.
- 💻 **Online Code Execution:** Real-time code compilation and execution for multiple languages powered by **Judge0 API**.
- 🧾 **Leaderboard System:** Displays user rankings dynamically based on contest performance.
- 🔒 **Authentication & Authorization:** Secure, role-based login and access control (Candidate, Company, Admin) using **Firebase Auth**.
- 🎨 **Responsive UI:** Modern, dynamic, and responsive interface built with **React.js**, **Tailwind CSS**, and **Lucide Icons** with built-in Dark Mode support.
- 📝 **Integrated Code Editor:** Rich code editing experience powered by **Monaco Editor**.

---

## 🧠 Tech Stack

| Layer                  | Technologies Used               |
| ---------------------- | ------------------------------- |
| **Frontend**           | React.js, Tailwind CSS, Vite, Monaco Editor, Axios |
| **Backend**            | Node.js, Express.js             |
| **Database**           | MongoDB (Mongoose ORM)          |
| **Code Execution**     | Judge0 API (via RapidAPI)       |
| **Authentication**     | Firebase Authentication & Admin SDK |

---

## 📂 Project Structure

```text
code_space/
├── backend/                  # Express.js Server
│   ├── config/               # Database and Firebase configurations
│   ├── controllers/          # Request handlers
│   ├── models/               # Mongoose schemas (User, Question, Contest, Submission, Company)
│   ├── routes/               # API endpoints
│   └── app.js                # Server entry point
├── src/                      # React Frontend
│   ├── components/           # Reusable UI components
│   ├── pages/                # Main route components (Home, Practice, Admin, etc.)
│   ├── firebase/             # Firebase client configuration
│   ├── hooks/                # Custom React hooks
│   ├── utils/                # Helper functions
│   ├── App.jsx               # Main application component & routing
│   └── main.jsx              # React DOM render entry
└── ...
```

---

## 🛠️ Installation & Setup

Follow these steps to run the project locally.

### Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB Database (Local or MongoDB Atlas)
- Firebase Project Setup
- Judge0 API key from RapidAPI

### 1. Clone the repository
```bash
git clone https://github.com/your-username/codespace.git
cd codespace
```

### 2. Frontend Setup
```bash
# Install dependencies
npm install

# Create a .env file in the root directory based on the environment variables mentioned below.

# Start the Vite development server
npm run dev
```

### 3. Backend Setup
```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Create a .env file in the backend directory based on the environment variables mentioned below.

# Start the Express server
npm start
```

---

## 🔐 Environment Variables

You need to configure the environment variables for both the frontend and backend.

### Frontend (`/.env`)
```env
VITE_RAPID_API_URL=https://judge0-ce.p.rapidapi.com
VITE_RAPID_API_HOST=judge0-ce.p.rapidapi.com
VITE_RAPID_API_KEY=your_rapid_api_key

VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

### Backend (`/backend/.env`)
```env
MONGO_URI=your_mongodb_connection_string

# Firebase Admin SDK Configuration
FIREBASE_TYPE=service_account
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY_ID=your_private_key_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_CLIENT_ID=your_client_id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_CERT_URL=your_client_cert_url
FIREBASE_UNIVERSE_DOMAIN=googleapis.com
```

---

## 📸 Screenshots

<img width="1856" height="900" alt="Image" src="https://github.com/user-attachments/assets/fc62dba2-7618-4f41-b6cb-aceffa987c82" />
<img width="1804" height="876" alt="Image" src="https://github.com/user-attachments/assets/ce1a8d40-6cbd-414f-9216-1dea57b01fb2" />
<img width="1886" height="913" alt="Image" src="https://github.com/user-attachments/assets/dfddfbf6-61a0-4727-b2b0-cb9e1eb0414d" />
<img width="1918" height="911" alt="Image" src="https://github.com/user-attachments/assets/df2b74bf-bf41-4cb8-b477-2a836e8db066" />
<img width="767" height="646" alt="Image" src="https://github.com/user-attachments/assets/b4338369-e9b4-4e6f-93f3-21d7540ba0bc" />

<img width="1893" height="892" alt="Image" src="https://github.com/user-attachments/assets/fbbc6d59-c368-433d-8b0b-ea9bcfbc8ede" />
<img width="1893" height="902" alt="Image" src="https://github.com/user-attachments/assets/196116de-b5ff-4d06-b653-33cb83cad09c" />
<img width="1913" height="904" alt="Image" src="https://github.com/user-attachments/assets/b61c1ed6-aef9-470c-baff-0197e09feca5" />
<img width="1895" height="894" alt="Image" src="https://github.com/user-attachments/assets/1372490b-b324-4498-a86a-5b774dbdf775" />
<img width="1893" height="909" alt="Image" src="https://github.com/user-attachments/assets/b399d683-2239-449d-b231-1abadceaad29" />

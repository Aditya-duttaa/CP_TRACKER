# CP Tracker

A full-stack Competitive Programming Analytics Platform built using React, Node.js, Express, and MongoDB.

CP Tracker helps Codeforces users track their progress, analyze solved problems, visualize rating growth, and compare performance with friends.

---

## Features

### Authentication

* User Signup
* User Login
* Password Hashing using bcrypt
* JWT Authentication
* Protected Routes

### Codeforces Integration

* Automatic Codeforces Sync on Login
* Fetch and Store:

  * User Profile
  * Contest History
  * Solved Problems

### Dashboard

* Current Rating
* Maximum Rating
* Current Rank
* Maximum Rank
* Total Solved Problems
* Total Contests
* Rating Growth Graph

### Analytics

* Top Problem Tags
* Problem Rating Distribution
* Interactive Charts using Recharts

### Friends System

* Add Friends
* Remove Friends
* Sync Friends
* Friends Leaderboard
* Compare Ratings and Contest Performance

### Performance Optimizations

* Dashboard Caching using Local Storage
* Analytics Caching using Local Storage
* Parallel Friend Sync using Promise.all()

---

## Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* React Router DOM
* Axios
* Recharts

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT
* bcrypt
* Axios

### External API

* Codeforces API

---

## Project Structure

### Backend

```txt
server/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── userController.js
│   ├── codeforcesController.js
│   └── friendController.js
│
├── middleware/
│   ├── auth.js
│   └── logger.js
│
├── models/
│   ├── User.js
│   ├── Codeforces.js
│   ├── ContestHistory.js
│   └── SolvedProblem.js
│
├── routes/
│   └── userRoutes.js
│
├── services/
│   └── codeforcesService.js
│
└── index.js
```

### Frontend

```txt
client/
│
├── src/
│   ├── api/
│   │   └── axios.js
│   │
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Friends.jsx
│   │   └── Analytics.jsx
│   │
│   ├── App.jsx
│   └── main.jsx
```

---

## Database Collections

### users

```js
{
  email,
  password,
  codeforcesHandle,
  friends
}
```

### codeforces

```js
{
  handle,
  rating,
  maxRating,
  rank,
  maxRank
}
```

### contesthistories

```js
{
  handle,
  totalContests,
  contests
}
```

### solvedproblems

```js
{
  handle,
  problems
}
```

---

## Sync Workflow

### Login

```txt
Login
    ↓
Verify Credentials
    ↓
Sync Codeforces Data
    ↓
Update MongoDB
    ↓
Generate JWT
    ↓
Return Token
```

### Codeforces Sync

```txt
Codeforces Profile
        ↓
Contest History
        ↓
Solved Problems
        ↓
Store in MongoDB
```

### Friend Sync

```txt
Friend Handles
        ↓
Promise.all()
        ↓
Sync Profile + Contest Data
        ↓
Update Database
```

---

## Available APIs

### Authentication

```http
POST /signup
POST /login
```

### Dashboard

```http
GET /codeforces/me/dashboard
GET /codeforces/me/rating-graph
```

### Analytics

```http
GET /codeforces/me/tag-stats
GET /codeforces/me/rating-distribution
```

### Friends

```http
GET    /friends
POST   /friends
DELETE /friends/:handle
GET    /friends/compare
POST   /friends/sync
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/Aditya-duttaa/CP_TRACKER.git
```

### Backend Setup

```bash
cd server

npm install
```

Create a `.env` file inside the server folder:

```env
PORT=3000

MONGO_URL=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

Run Backend:

```bash
npm run dev
```

or

```bash
node index.js
```

### Frontend Setup

```bash
cd client

npm install

npm run dev
```

The frontend will run on:

```txt
http://localhost:5173
```

Make sure the backend is running before starting the frontend.

---

## Future Improvements

* Contest Performance Analytics
* Friend Activity Feed
* Dark / Light Themes
* React Query Caching
* User Profile Page
* Contest Calendar
* Problem Recommendation System
* Deployment using Vercel and Render

---

## Author

Aditya Dutta
Competitive Programmer | Full Stack Developer

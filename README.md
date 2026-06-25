# Gisul Frontend

StudySync AI is an AI-powered learning platform that helps students discover conceptually similar questions using semantic search and Natural Language Processing (NLP). Instead of performing simple keyword matching, the application understands the meaning of the user's question using sentence embeddings and retrieves the most relevant questions from the dataset.

#user Authentication
The application uses JWT (JSON Web Token) Authentication to securely manage user sessions.
This ensures that only authenticated users can access their learning history and dashboard.

My login account 
kaviya123@gmail.com
Kaviya@12345

use this while login the website
or
while you are going to use the application  with your own personal account signup first and use...after you searching the questions that will store in history page and dashboard give the updates fetch from the MongoDB.

#personalised search History
One of the important features of StudySync AI is personalized data management.

Each user has their own account.

Whenever a user searches for a question:
The searched question is stored in MongoDB.
The detected topic is stored.
Timestamp of the search is stored.
The search is linked to the authenticated user's unique ID.

Because of JWT authentication, every logged-in user can access only their own search history.

For example:

User A can view only User A's searches.
User B can view only User B's searches.

This provides:

Data privacy
Better personalization
Secure user-specific learning records
Efficient retrieval of previous searches

The History page allows students to revisit previous searches.

Features include:

Search history
Topic filtering
Similarity score
Search date
Chronological ordering
Fast retrieval from MongoDB

Only the authenticated user's history is displayed.

## Tech Stack

- **React 18** + **React Router v7**
- **Vite 6** (build tool)
- **Tailwind CSS v3**
- **Framer Motion** (animations)
- **Axios** (API calls)
- **Recharts** (charts)

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
```
Edit `.env` and set `VITE_API_BASE_URL` to your backend URL.

### 3. Run development server
```bash
npm run dev
```

### 4. Build for production
```bash
npm run build
```
Output will be in the `dist/` folder.

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `VITE_API_BASE_URL` | Backend API base URL | `http://127.0.0.1:8000` |

## Project Structure

```
src/
├── api.js              # Centralised axios instance
├── App.jsx             # Routes
├── main.jsx            # Entry point
├── index.css           # Global styles
├── components/
│   ├── AppShell.jsx    # Layout wrapper
│   ├── Logo.jsx
│   ├── PublicNav.jsx
│   └── UI.jsx          # Shared UI components
└── pages/
    ├── Landing.jsx
    ├── Auth.jsx
    ├── Dashboard.jsx
    ├── AskQuestion.jsx
    ├── HistoryPage.jsx
    ├── Profile.jsx
    └── QuestionDetails.jsx
```

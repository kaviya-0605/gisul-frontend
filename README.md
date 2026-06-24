# Gisul Frontend

React + Vite frontend for the **StudySync AI** application — a semantic question similarity search tool.

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

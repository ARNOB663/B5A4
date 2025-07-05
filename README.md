# Library Management System

A full-stack Library Management System with a React + Vite frontend and a Node.js + Express + TypeScript backend. The system allows users to manage books, members, and transactions, with secure authentication and a modern UI.

---

## Table of Contents
- [Library Management System](#library-management-system)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Project Structure](#project-structure)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [1. Clone the repository](#1-clone-the-repository)
    - [2. Install dependencies](#2-install-dependencies)
      - [Backend](#backend)
      - [Frontend](#frontend)
  - [Environment Variables](#environment-variables)
    - [Frontend (`Frontend/.env` and `Frontend/.env.production`)](#frontend-frontendenv-and-frontendenvproduction)
    - [Backend (`Backend/.env`)](#backend-backendenv)
  - [Running Locally](#running-locally)
    - [1. Start the backend](#1-start-the-backend)
    - [2. Start the frontend](#2-start-the-frontend)
  - [Deployment](#deployment)
    - [Frontend (Vercel)](#frontend-vercel)
    - [Backend](#backend-1)
  - [API Overview](#api-overview)
  - [Troubleshooting](#troubleshooting)

---

## Features
- Book, member, and transaction management
- User authentication (login/register)
- Responsive, modern frontend UI
- RESTful API backend
- Environment-based configuration for local and production
- CORS and security best practices

## Tech Stack
- **Frontend:** React, Vite, TypeScript
- **Backend:** Node.js, Express, TypeScript
- **Database:** (Add your DB, e.g., MongoDB, PostgreSQL)
- **Deployment:** Vercel (Frontend), (Add backend hosting, e.g., Vercel, Heroku, Render)

## Project Structure
```
Backend/
  src/
    app.ts
    server.ts
    app/
  package.json
  tsconfig.json
Frontend/
  src/
    services/api.ts
    api/libraryApi.ts
  .env
  .env.production
  vite.config.ts
  vercel.json
README.md
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### 1. Clone the repository
```sh
git clone <your-repo-url>
cd <project-root>
```

### 2. Install dependencies
#### Backend
```sh
cd Backend
npm install
```
#### Frontend
```sh
cd ../Frontend
npm install
```

## Environment Variables

### Frontend (`Frontend/.env` and `Frontend/.env.production`)
```
VITE_API_BASE_URL=http://localhost:5000/api   # Local
VITE_API_BASE_URL=https://your-backend-domain/api   # Production
```

### Backend (`Backend/.env`)
```
PORT=5000
# Add your DB and other secrets here
```

## Running Locally

### 1. Start the backend
```sh
cd Backend
npm run dev
```

### 2. Start the frontend
```sh
cd ../Frontend
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Deployment

### Frontend (Vercel)
- Set `VITE_API_BASE_URL` in Vercel project settings to your backend's production URL (e.g., `https://your-backend-domain/api`).
- Ensure `vercel.json` is configured for SPA routing and (optionally) API proxying.
- Deploy via Vercel dashboard or CLI.

### Backend
- Deploy to your preferred Node.js hosting (Vercel, Render, Heroku, etc.).
- Ensure CORS allows requests from your frontend domain.

## API Overview
- All API endpoints are prefixed with `/api`.
- Example: `GET /api/books`, `POST /api/auth/login`
- See backend source for full API details.

## Troubleshooting
- **401 Unauthorized in production:** Ensure frontend uses the correct `VITE_API_BASE_URL` and backend CORS allows your frontend domain.
- **404s on refresh (SPA):** Ensure `vercel.json` has SPA rewrites.
- **CORS errors:** Check backend CORS config and frontend API base URL.
- **Environment variables not working:** Make sure they are set in Vercel and not hardcoded in code.


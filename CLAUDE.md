# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Booking application with a React + Vite frontend and Express.js backend.

## Tech Stack

**Frontend:**
- React 19 with Vite 7
- Tailwind CSS 4
- React Router 7
- Bun package manager

**Backend:**
- Express.js 5
- MongoDB with Mongoose 9
- JWT authentication (jsonwebtoken 9)
- bcryptjs for password hashing
- Bun package manager

## Commands

### Frontend (`frontend/`)
```bash
bun install       # Install dependencies
bun run dev       # Start Vite dev server
bun run build     # Production build
bun run lint      # Run ESLint
bun run preview   # Preview production build
```

### Backend (`backend/`)
```bash
bun install       # Install dependencies
bun run dev       # Start with nodemon (auto-reload)
bun run start     # Start production server
```

## Architecture

**Backend (`backend/`):**
- `index.js` - Express server entry point, MongoDB connection, CORS setup
- `routes/auth-router.js` - Auth endpoints: `/signup`, `/login`, `/logout`
- `models/user.js` - Mongoose User schema (username, password, token)
- `middleware/auth.js` - JWT verification middleware

**Frontend (`frontend/src/`):**
- `main.jsx` - React entry point with BrowserRouter
- `App.jsx` - React Router configuration
- `components/Main/` - Main layout, navbar, home page
- `components/Popup/` - Reusable modal component
- `components/Auth/` - Auth components (login, register, layout)

## Environment Variables

**Backend (`.env`):**
- `PORT` - Server port (default: 3000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret

**Frontend (`.env`):**
- `VITE_BACKEND_URI` - Backend API URL

## Authentication Flow

1. User signs up via `POST /auth/signup`
2. User logs in via `POST /auth/login` (returns JWT token)
3. Token stored client-side, sent in `Authorization: Bearer <token>` header
4. Protected routes use `authMiddleware` to verify token
5. Logout via `POST /auth/logout` invalidates token server-side

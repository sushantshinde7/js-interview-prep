# JS Interview Prep

A modern documentation-style JavaScript interview preparation platform focused on conceptual clarity, structured learning, reusable article architecture, and production-grade frontend engineering.

The project combines interview-focused learning with scalable React application architecture.

---

## Project Status

Currently in active frontend architecture and content system development.

The app already includes:

- nested routing architecture
- tutorials-focused navigation flow
- responsive docs-style layouts
- topic/subtopic article system
- reusable UI components
- progress tracking
- TailwindCSS v4 styling consistency

---

## Features

### Tutorials System

Structured JavaScript learning flow with:

- topic-based navigation
- nested subtopics
- interview-focused explanations
- theory blocks
- code patterns
- interview Q&A
- gotchas and quick understanding sections

---

### Documentation-Style Navigation

Layered navigation architecture:

```txt
Main Navbar
   ├── Home
   ├── Tutorials
   ├── Quiz
   ├── Cheatsheets
   └── Progress

Tutorials
   ├── Topics Navbar
   └── Subtopics Sidebar
```

---

### Nested Routing

Built using React Router DOM v7.

Example routes:

```txt
/tutorials
/tutorials/arrays
/tutorials/arrays/map
/tutorials/closures/IIFE
```

---

### Progress Tracking

Current progress states:

- learning
- confident
- unseen

Stored locally and integrated directly into topic articles.

---

### Responsive UI

Current UI direction includes:

- docs-style reading layout
- centered content flow
- sticky navigation
- responsive sidebars
- dark UI foundation
- TailwindCSS v4 consistency

---

## Current Topics

- Arrays
- Closures & Scope
- Async JS
- Event Loop
- DOM & Browser
- this & Prototypes

---

## Tech Stack

### Frontend

- React 19
- Vite
- React Router DOM v7
- TailwindCSS v4
- Context API

---

## Folder Structure

```txt
src/
├── main.jsx
├── App.jsx
├── index.css
│
├── components/
│   ├── navigation/
│   │   ├── MainNavbar.jsx
│   │   ├── TopicsNavbar.jsx
│   │   └── SubtopicsSidebar.jsx
│   │
│   ├── CodeBlock.jsx
│   ├── CopyButton.jsx
│   ├── ProgressRing.jsx
│   ├── QACard.jsx
│   └── Tag.jsx
│
├── layouts/
│   ├── TutorialsLayout.jsx
│   └── TopicLayout.jsx
│
├── pages/
│   ├── HomePage.jsx
│   ├── TutorialsOverviewPage.jsx
│   ├── TopicPage.jsx
│   ├── QuizPage.jsx
│   ├── CheatsheetPage.jsx
│   └── ProgressPage.jsx
│
├── context/
│   └── AppContext.jsx
│
├── data/
│   ├── topics.js
│   └── snippets.js
│
└── hooks/
    └── useProgress.js
```

---

## Architecture Direction

The project uses layout-based routing instead of large conditional rendering systems.

### TutorialsLayout

Responsible for:

- tutorials-level navigation
- TopicsNavbar rendering
- tutorials route flow

### TopicLayout

Responsible for:

- subtopics sidebar rendering
- article layout structure
- topic-level routing flow

This keeps the application modular and scalable as features grow.

---

## Planned Expansion

Future areas may include:

- authentication
- bookmarks
- search
- quiz engine
- markdown/article rendering
- admin dashboard
- personalized progress
- code playground
- interactive roadmaps

---

## Development Philosophy

The focus is:

> small but architecturally serious

The project prioritizes scalable systems, reusable architecture, and production-oriented frontend engineering over large amounts of unfinished content.

---

## Running Locally

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

---

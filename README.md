# Simple React Demo

A small user-management app built with React, TypeScript and Vite. It stores users in Firebase Firestore and lets you add, list, edit and delete them.

## Features

- **Add user:** a validated form (name, age, sex, email, address, zip code, city, state, country).
- **List users:** an [AG Grid](https://www.ag-grid.com/) table of all saved users.
- **Edit user:** reuses the same form, pre-filled from Firestore (`/edit/:id`).
- **Delete user:** with a confirmation prompt.

## Tech stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) for dev server and build
- [React Router](https://reactrouter.com/) for client-side routing
- [Firebase / Firestore](https://firebase.google.com/docs/firestore) for data storage
- [AG Grid](https://www.ag-grid.com/react-data-grid/) for the users table
- [Oxlint](https://oxc.rs/docs/guide/usage/linter) for linting

## Getting started

### Prerequisites

- Node.js 18 or newer
- A Firebase project with Firestore enabled

### Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the example environment file and fill in your Firebase web app config:

   ```bash
   cp .env.example .env.local
   ```

   | Variable                            | Description                  |
   | ----------------------------------- | ---------------------------- |
   | `VITE_FIREBASE_API_KEY`             | Firebase API key             |
   | `VITE_FIREBASE_AUTH_DOMAIN`         | Auth domain                  |
   | `VITE_FIREBASE_PROJECT_ID`          | Project ID                   |
   | `VITE_FIREBASE_STORAGE_BUCKET`      | Storage bucket               |
   | `VITE_FIREBASE_MESSAGING_SENDER_ID` | Messaging sender ID          |
   | `VITE_FIREBASE_APP_ID`              | App ID                       |
   | `VITE_FIREBASE_MEASUREMENT_ID`      | Analytics measurement ID     |

   You can find these under Firebase console > Project settings > Your apps. `.env.local` is git-ignored, so your keys stay out of the repository.

3. Make sure your Firestore security rules allow the app to read and write the `users` collection.

4. Start the dev server:

   ```bash
   npm run dev
   ```

   Then open the URL Vite prints, usually `http://localhost:5173`.

## Scripts

| Command           | What it does                              |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Start the Vite dev server with HMR        |
| `npm run build`   | Type-check with `tsc` and build to `dist` |
| `npm run preview` | Serve the production build locally        |
| `npm run lint`    | Lint the project with Oxlint              |

## Project structure

```
src/
├── main.tsx              # App entry, mounts React inside BrowserRouter
├── App.tsx               # Route definitions
├── components/
│   ├── NavBar.tsx        # Top navigation
│   ├── UserForm.tsx      # Add / edit form (also exports the UserInfo type)
│   └── UsersPage.tsx     # AG Grid table with edit and delete actions
├── firebase/
│   └── config.ts         # Firebase init, exports the Firestore `db`
└── css/                  # Per-component stylesheets
```

## Routes

| Path        | Page                       |
| ----------- | -------------------------- |
| `/`         | Add user form              |
| `/users`    | Users table                |
| `/edit/:id` | Edit form for a given user |

## Data model

Users are stored in the Firestore `users` collection. The document ID is used as `userId` in the UI.

```ts
interface UserInfo {
  userId: string
  firstname: string
  lastname: string
  age: number
  sex: 'male' | 'female' | 'other'
  email: string
  address: string
  zipcode: number
  city: string
  state: string
  country: string
}
```

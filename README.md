# Maritime Factbook NextJS

This project is a Next.js-based application for the Maritime Factbook. It includes support for Redux, JWT authentication, and Tailwind CSS for styling, as well as testing with Jest and React Testing Library.

## Table of Contents

- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [Folder Structure](#folder-structure)
- [Usage](#usage)

---

## Setup

### Prerequisites

Ensure that you have the following installed:

- [Node.js](https://nodejs.org/) (v18.0 or higher recommended)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/) for managing dependencies

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/maritime-factbook-next.git
   cd maritime-factbook-next
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Setup environment**

- Copy .env.example to .env and configure the necessary variables.

4. **Run the application**

```bash
npm run dev
```

### Folder Structure

```bash
my-nextjs-app/
│
├── app/                           # Next.js app router
│   ├── api/                       # API routes for session-based auth handling
│   ├── (auth)/                    # Group routes for authentication
│   │   ├── login/                 # Login page
│   │   └── register/              # Register page
│   ├── dashboard/                 # Protected route for authenticated users
│   └── layout.tsx                 # Main layout for the app
│
├── components/                    # Shared components
│   ├── AuthWrapper.tsx            # Wrapper for protected routes
│   └── Header.tsx                 # Global header with user info
│
├── redux/                         # Redux state management
│   ├── slices/                    # Redux slices
│   ├── store.ts                   # RTK store configuration
│   └── hooks.ts                   # Custom hooks for typed Redux use
│
├── middlewares/                   # Next.js middleware
│   └── requireAuth.ts             # Middleware to protect routes
│
├── utils/                         # Utility functions and helpers
│   ├── api.ts                     # Axios instance for API calls with auth
│   └── auth.ts                    # JWT handling, token refresh functions
│
├── public/                        # Static files
├── .env                           # Environment variables
└── tsconfig.json                  # TypeScript configuration with "strict" mode enabled
```

## Usage

### Running the App

```bash
npm run start         # Start the app
npm run start:dev     # Start the app in development mode with hot-reloading
npm run start:prod    # Start the app in production mode
```

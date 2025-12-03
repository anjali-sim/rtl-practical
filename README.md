# Testing React Apps

This is a starter project for learning how to effectively test React apps.

## About this Project

This is a React app built with the following technologies and libraries:

- Auth0
- Tailwind CSS
- Radix UI
- React Router
- React Query
- Redux Toolkit

## Features

- User authentication with Auth0
- Product browsing and management
- Shopping cart functionality
- Admin panel for managing products and users
- Responsive design with Tailwind CSS
- Comprehensive test suite with Vitest

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/anjali-sim/rtl-practical.git
   cd rtl-practical
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Setting up Auth0 for Authentication

1. **Sign up for an Auth0 Account:**

   If you don't already have an Auth0 account, you can sign up for one at [https://auth0.com/](https://auth0.com/). Auth0 offers a free tier that you can use for your project.

2. **Create a New Application:**

   - Log in to your Auth0 account.
   - Go to the Auth0 Dashboard.
   - Click on "Applications" in the left sidebar.
   - Click the "Create Application" button.
   - Give your application a name (e.g., "My React App").
   - Select "Single Page Web Applications" as the application type.

3. **Configure Application Settings:**

   - On the application settings page, configure the following settings:
     - Allowed Callback URLs: `http://localhost:5173`
     - Allowed Logout URLs: `http://localhost:5173`
     - Allowed Web Origins: `http://localhost:5173`
   - Save the changes.

4. **Obtain Auth0 Domain and Client ID:**

   - On the application settings page, you will find your Auth0 Domain and Client ID near the top of the page.
   - Copy the Auth0 Domain (e.g., `your-auth0-domain.auth0.com`) and Client ID (e.g., `your-client-id`).

5. **Create Environment Variables:**

   - Create a `.env.local` file in the root directory of the project.
   - Add the following environment variables:
     ```
     VITE_AUTH0_DOMAIN=your-auth0-domain.auth0.com
     VITE_AUTH0_CLIENT_ID=your-client-id
     ```

## Running the App

Now that you have set up Auth0 and configured your environment variables, you can run the React app using the following commands:

```bash
# Start both the backend (JSON Server) and frontend (Vite dev server)
npm start
```

This will start:

- The backend API server at `http://localhost:3000`
- The frontend development server at `http://localhost:5173`

If port 3000 is in use on your machine, update the port number in `json-server.json` and run `npm start` again.

## Testing

This project includes a comprehensive test suite using Vitest. To run the tests:

```bash
# Run all tests
npm test

# Run tests with UI
npm run test:ui

# Run tests in watch mode
npm test -- --watch
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Page components
├── hooks/          # Custom React hooks
├── providers/      # Context providers
├── store/          # Redux store and slices
├── data/           # Mock data for JSON Server
├── validationSchemas/  # Zod validation schemas
└── ...

tests/              # Test files
```

# Task Tracker App (Frontend)

This is the frontend repository for the full-stack Task Tracker application designed to help users manage their tasks effectively. Users can track their tasks, add new tasks, modify existing tasks, and delete tasks seamlessly. The application is built using modern web development technologies.

**Note:** This repository contains only the frontend code. If you want to see the backend code, please visit the [backend repository](https://github.com/Rogulraj/Task-Tracker-BFF).

## Technologies Used

### Frontend

- **ReactJS**: A JavaScript library for building user interfaces.
- **TypeScript**: A statically typed superset of JavaScript that compiles to plain JavaScript.
- **Redux**: A predictable state container for JavaScript apps.
- **@redux/toolkit**: An official, opinionated, batteries-included toolset for efficient Redux development.
- **Error Boundaries**: Used to catch JavaScript errors anywhere in a component tree.
- **react-loader-spinner**: A lightweight spinner component for React.
- **Sonnar**: A library for displaying toast messages.
- **Recharts**: A composable charting library built on React components.
- **react-helmet-async**: A library for dynamically managing `<head>` contents in React.

### Backend

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express.js**: A minimal and flexible Node.js web application framework.
- **TypeScript**: Used for backend development for type safety.
- **Mongoose**: A MongoDB object modeling tool designed to work in an asynchronous environment.
- **JWT (JSON Web Tokens)**: Used for authentication purposes, providing a secure way to transmit information between parties.
- **bcrypt**: A password hashing function designed to securely hash passwords.
- **MongoDB**: A NoSQL database used for storing application data.

## Architecture

The application follows the MVC (Model-View-Controller) pattern in the backend for better organization and separation of concerns. Here's a brief overview:

- **Model**: Defines the data structure and interacts with the database (using Mongoose).
- **View**: Renders the UI components using ReactJS.
- **Controller**: Handles the application logic, interacts with models, and sends responses back to the client (using Express.js).

## Features

- **Task Management**: Users can track, add, modify, and delete tasks.
- **Authentication**: JWT authentication ensures secure access to the application.
- **Password Encryption**: User passwords are securely encrypted using bcrypt.
- **Error Handling**: Error boundaries catch JavaScript errors, providing a smooth user experience.
- **Loader**: A spinner component indicates loading states during data fetching.
- **Toast Messages**: Sonnar library displays toast messages for user feedback.
- **Data Visualization**: Recharts library is used to visualize task data.

## Getting Started

To run the frontend locally, follow these steps:

1. Clone this repository.
2. Navigate to the directory.
3. Install dependencies using `npm install`.
4. Set up environment variables if necessary.
5. Run the frontend server using `npm start` or `npm run dev`.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your improvements.

## Acknowledgements

Special thanks to the creators of the technologies used in this project.

# FIFA Test Tool

## Project Overview

The FIFA Test Tool is a web application designed to help manage and view sports events, teams, and tournament stages. Built with React, TypeScript, and Vite, the application provides an interface for filtering matches by stage, exploring team details, and configuring tournament settings.

## Local Setup

### Prerequisites

- **Node.js**: Version 18.x or higher.
- **npm**: Package manager (included with Node.js).
- A local API backend server running on `http://localhost:8080`.

### Installation

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/MHSnodgrass/fifa-testtool.git
   cd fifa-testtool
   ```
2. Install the project dependencies:
   ```bash
   npm install
   ```

### Configuration

The application relies on a backend API for data. The Vite development server is pre-configured to proxy all `/api` requests to `http://localhost:8080`. Ensure your local backend is running on this port, or adjust the `proxy` settings in `vite.config.ts` if your backend uses a different address. No additional environment variables or configuration files are required by default.

### Running the App

Start the application in a local development environment by running:

```bash
npm run dev
```

This command starts the Vite development server, and the application will be accessible in your browser at `http://localhost:5173`.

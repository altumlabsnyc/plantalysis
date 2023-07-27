# Plantalysis

Plantalysis is a web application designed to analyze and manage data for different users. It provides tools and dashboards tailored for labs, producers, and regulators, allowing them to make informed decisions and streamline their processes. The application utilizes React.js (Typescript) for the frontend and integrates with Supabase for authentication and database functionalities.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Toplevel](#toplevel)

## Features

### User Roles and Authentication
Plantalysis offers role-based access control to ensure that users only have access to the features relevant to their roles. There are three main user roles in the application: lab personnel, producers, and regulators. Authentication is handled through Supabase, providing a secure and reliable authentication mechanism.

### Dashboard Views
The application has separate dashboards for each user role:
- **Lab Dashboard:**
- **Producer Dashboard:**
- **Regulator Dashboard:** 


## Installation

To set up Plantalysis locally, follow these steps:

1. Clone the repository from GitHub.
2. Navigate to the project root directory.
3. Install dependencies using the package manager of your choice:

   ```
   npm install
   ```

## Usage

Once you have installed the dependencies, you can run Plantalysis locally by executing the following command:

```
npm run dev
```

This will start the development server, and you can access the application in your web browser at `http://localhost:3000/`.

Please note that you may need to set up the required environment variables for Supabase to enable full authentication and database functionality.

## Toplevel

// TODO

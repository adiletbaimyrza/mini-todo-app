# Mini Todo App

This is a **mini Todo application** built with a **Node.js backend** and a **React frontend**.

## 📂 Project Structure

- **`backend/`**: Contains the backend code written in TypeScript and its compiled JavaScript files ready for execution.
- **`frontend/`**: Contains the frontend code written in TypeScript and React, with compiled JavaScript files located in the `/dist` directory.

## 🚀 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js**: Version `22.11.0` or higher
- **npm**: Version `9.6.6` or higher

## ⚡ Getting Started

Follow the steps below to set up and run the application:

1. **Install Dependencies**  
   Run the following command in the root directory to install all required dependencies for both the backend and frontend:
   ```bash
   npm run install-all
   ```
2. **Start the Server**  
   Launch the application by executing the following command:
   ```bash
   node server.js
   ```

## 📈 Future Improvements

Here are some ideas for future enhancements to the project:

1. **Testing**:  
   Unit and integration tests for both the backend and frontend can be added for better code quality and maintainability of the code.

2. **Database Integration**:  
   Database can be implemented using the existing the repository pattern to store todos persistently, allowing for better scalability and data management.

3. **Logging**:  
   Integrate a logging library (e.g., Winston or Morgan) for easier debugging and tracking of application errors in both the frontend and backend.

4. **Pagination and Filtering**:  
   Pagination and filtering can be added to manage large sets of todos.

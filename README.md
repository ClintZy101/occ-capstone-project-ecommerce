# Setting Up and Running Your React + Vite Application

This guide walks you through the steps to set up and run the React + Vite project on your local machine.

## Prerequisites

Ensure you have the following installed on your machine:

1. **Node.js**: Version 16 or higher is recommended. Download it from [Node.js official website](https://nodejs.org/).
2. **Git**: Ensure Git is installed for cloning the repository. You can download it from [Git official website](https://git-scm.com/).

## Steps to Run the Application

1. **Clone the Repository**
   
   Open your terminal and execute the following command:
   ```bash
   git clone https://github.com/ClintZy101/occ-capstone-project-ecommerce.git
   ```

   This command clones the repository to your local machine.

2. **Navigate to the Project Directory**

   Change to the project's directory:
   ```bash
   cd occ-capstone-project-ecommerce
   ```

3. **Install Dependencies**

   Install the required dependencies by running:
   ```bash
   npm install
   ```

   This command installs all the necessary packages specified in the `package.json` file.

4. **Run the Development Server**

   Start the development server by executing:
   ```bash
   npm run dev
   ```

   After a short initialization, you should see output similar to this:
   ```plaintext
   VITE v5.4.11  ready in 142 ms

   ➜  Local:   http://localhost:5173/
   ➜  Network: use --host to expose
   ➜  press h + enter to show help
   ```

5. **Open the Application in Your Browser**

   Click the link `http://localhost:5173/` or open it manually in your browser. The application should now be running locally on your machine.

## Troubleshooting

- **Port Conflict**: If the `5173` port is already in use, modify the `vite.config.js` file or use the `--port` flag to specify a different port:
  ```bash
  npm run dev -- --port 3000
  ```

- **Permission Errors**: Ensure you have the necessary permissions to install packages and run commands.

- **Dependencies Not Found**: If you encounter issues with missing dependencies, run:
  ```bash
  npm install
  ```

## Additional Information

- For more details on Vite, visit the [Vite Documentation](https://vitejs.dev/).
- To contribute to this project, please refer to the `CONTRIBUTING.md` file in the repository (if available).

Congratulations! You are now ready to explore and develop the application further.


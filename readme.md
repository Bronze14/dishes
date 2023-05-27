Prerequisites:
Make sure you have the following dependencies installed:
- Node version: v18.13.0
- npm version: 8.19.3
- Node.js
- npm (Node Package Manager)

Installation:
1. Open your command line interface.
2. Run the following command to create a new Vite project with the React template:
   ```bash
   npm create vite@latest app-name -- --template react
   ```
   Replace `app-name` with the desired name for your project.

3. Navigate to the project directory using the command line:
   ```bash
   cd app-name
   ```
   Replace `app-name` with the name of your project directory.

4. Run the following command to install the project dependencies:
   ```bash
   npm install
   ```

Usage:
1. Open the project in your preferred code editor.
2. Locate the `src/components/DishForm.jsx` file in the project's source code.
3. Customize the form fields, validations, and submission logic based on your specific requirements.
4. Customize the form styling by editing the SCSS styles in the `src/styles/DishForm.scss` file.
5. Save your changes.
6. Start the development server by running the following command:
   ```bash
   npm run dev
   ```
7. Open your web browser and visit `http://localhost:5173` to see the form in action.

Additional Information:
The following libraries and tools are used in this project:
- Yup: A JavaScript schema builder for value validation. It is used for defining and validating the form's field requirements.
- Formik: A library for building forms in React. It simplifies form state management, validation, and submission.
- Material-UI: A popular UI component library for React. It provides ready-to-use components for creating a visually appealing and responsive user interface.
- SCSS: A preprocessor for CSS that adds features like variables, mixins, and nesting. It is used to style the form components and customize their appearance.
- Axios: A library for making HTTP requests from the browser. It is used to send form data to an external API endpoint for processing and storage.

Please refer to the documentation and official websites of these libraries and tools for more detailed information on how to use them effectively.

Time Taken:
This project, including the implementation of the DishForm component and writing the README, took approximately 4-6 hours to complete.

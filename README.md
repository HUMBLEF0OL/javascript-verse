# JavaScript-Verse Documentation

JavaScript-Verse is a versatile web application that provides a code execution environment within the browser along with a markdown editor. It allows you to write and execute JavaScript and React code, make API calls, view documentation alongside your code, access coding cheatsheets, and export your written code. This documentation will provide an in-depth understanding of JavaScript-Verse's features, challenges, component structure, and solutions to specific problems. The application can be explored on this [Link](https://humblef0ol.github.io/javascript-verse/)

## Features

JavaScript-Verse offers several powerful features:

1. **Code Execution Environment**: JavaScript-Verse enables you to write, execute, and preview JavaScript and React code within the browser.

2. **Support for NPM Modules**: You can use any NPM module at runtime, expanding your coding capabilities with third-party libraries.

3. **React Component Creation**: JavaScript-Verse allows you to create and render React components, making it a valuable tool for React development.

4. **API Calls**: You can make API calls directly from your code, facilitating data retrieval and integration in your projects.

5. **Documentation and Code Side-by-Side**: JavaScript-Verse provides a side-by-side view of code and documentation, making it easier to understand and reference your code as you work.

6. **Coding Cheatsheet**: The application includes a coding cheatsheet for quick reference and guidance on syntax and coding practices.

7. **Export Functionality**: You can export the code you've written, making it easy to save and share your work.

## Challenges

While building JavaScript-Verse, I encountered several challenges:

### Challenge 1: Safe Code Execution

Code is provided as a string and needs to be executed safely. This includes preventing malicious activities and handling situations like infinite loops. I address this challenge by using iframes to isolate code execution securely.

### Challenge 2: Advanced JS Syntax

Some code may contain advanced JavaScript syntax, such as JSX, that modern browsers cannot execute directly. To overcome this, I implement code transpilation in the browser using Babel, similar to codepen.io and babeljs.io.

### Challenge 3: Handling Import Statements

Code might contain import statements for other JavaScript files or CSS. I need to manage these import statements before executing the code. To solve this, I use a bundler, like webpack, to bundle the code and its dependencies.

## Component Structure

JavaScript-Verse is structured around two main components:

- **Code Cell Component**: This component houses the code editing and execution functionality.
  - **Code Editor**: Where you write and edit your code.
  - **Preview**: Where you can see the execution results and the output of your code.

## Solutions

### Solving Problem 2: Code Transpilation

To transpile code with advanced syntax, I use Babel as the transpiler. I provide two options for code transpilation:

**Option 1: Backend API Server**
- React App -> User Code -> Backend API Server -> Transpiled Code -> React App
- This option involves sending user code to a backend API server, which transpiles the code and returns it to the React App. It's similar to codepen.io.

**Option 2: In-Browser Transpiler**
- React App -> User Code -> In-Browser Transpiler -> Transpiled Result
- This option performs code transpilation directly within the browser, similar to babeljs.io. It avoids the need for a backend server.

### Solving Problem 3: Handling Import Statements

To manage import statements and bundle code and its dependencies, I use a bundler. I offer three bundling options:

**Bundling Option 1: Backend Bundler**
- React App -> User Code -> Backend API Server (Webpack runs) -> Bundled Code -> React App
- The backend bundler installs necessary modules based on user actions, but it may include unnecessary modules for some users.

**Bundling Option 2: Improved Backend Bundler**
- An improved version of option 1, where heavy dependencies are not installed. Instead, the source files of the modules are used, ensuring a more efficient bundling process.

**Bundling Option 3: Frontend Bundler (ESBuild)**
- In this option, I integrate the bundling process into the frontend application. I use ESBuild, which can transpile and bundle code directly in the browser.

I use postMessage to allow the iframe to retrieve transpiled code, and I utilize event listeners to communicate with the iframe, avoiding the need for state management.

## Important Feature: Code Cell Access

JavaScript-Verse allows all code cells to have access to the code written in prior code cells. This feature enhances code modularity and reusability within the application.

## Packaging and Sharing

The long-term goal is to package the JavaScript-Verse project into an NPM module and publish it. This will enable other users to easily integrate and use The application in their projects, promoting code collaboration and sharing.

JavaScript-Verse is a powerful and user-friendly tool for web developers, offering a secure and versatile coding environment with an array of features to enhance your coding experience. I hope you find it valuable for your web development projects.

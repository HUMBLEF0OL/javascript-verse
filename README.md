# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


Features:

can use any npm module at the run time
can create react component
make api calls
documentation + code side by side
coding cheatsheet
functionality to export the written code
----------------------------------------

3 big challenges:

1. code will be provided to preview as a string. We have to execute it safely(need to tackles situations like prevention of malicious activity, infinite look etc----use iframe to solve this issue)
2. the code might have advanced JS syntax in it like jsx that that browser can't execute.
3. The code might have import statements for other JS files or CSS. we have to deal with those import statements before executing the code
-----------------------------------------

Component Structure:

codeCellComponent -> CodeEditor
		  -> Preview 
-----------------------------------------

Solving problem2:

Code transpilling in the browser
a tool that take code, will strip out the feature that might not be widely supported in modern browser and convert into equivalent js code
Will be using Babel as the transpilling
codepen.io and babeljs.io is a similar application to ours

Option1: react App --> userCode -> backend api server --> transpilled code -> react app(just like codepen.io)

Option2: react app --> userCode -> In-Browser Transpiler -> Transpiled Result (just like babeljs.io)
------------------------------------------

Solving problem3:

JS modules are the files that make some values available to other file and/or consumes values from other files
Different Module Systems:
- AMD e.g define(['dep'],(dep)=>{});
- common js e.g require()  module.exports
- ES Moduels e.g import a from 'a';   export default 243;
Babel converts ES Module Syntax to Common js structure

Will be using Bundler (webpack is one such example) a single file containign both modules linked together in some way
BUNDLER: 
1. read the content of the entry file -> 
2. automatically found all the different require/import/export statements -> 3. automatically found all the modules on our hard drives (in our case it should automatically find all the modules the user has imported from NPM) -> 
3. linked these files together into a single output file with all values being correctly communicated around

We need to tweak step 3 according to our requirements

Bundling Option-1:

React App --> code -> Backend API Server (webpack runs--webpack finds missing module--npm install plugin gets module(npm registry)--Bundle complete!) --> bundled code --> react App
The drawback is backend api will install tons of unnecessay modules based on user action as not all user will use the same modules.

Bundling Option-2:
Improved version of option-1, here we will not install heavy weight dependencies we will just use the src file of the module and the rest will remain the same

Bundling Option-3:
Here instead of calling the backend we will integrate the webpack process in the fronend application only.

* As webpack doesn't work correctly on the browswer hence we can't use Babel + webpack. A good replace for them is ESBuild which can transpile as well as bundle our code in the browswer

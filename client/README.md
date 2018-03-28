# react-webpack-materialui-boilerplate


This is a boilerplate to start creating a single-page React App using:
- React
- React-router
- Express
- Node
- Webpack


It is also configured for use of Material-UI's React Component Library. If you
wish to use another CSS framework or none at all you simply need to remove the
related code from the file `src/ReactRouter`. See [Material-UI's component
library](http://www.material-ui.com/#/).


This boilerplate is also configured with use of Babel to allow use of ES6 syntax.


# Install


1. Fork and clone this repository.
2. `npm install` to install dependencies.
3. `npm run start:dev` to build and run the server.
4. In a second shell/window in your terminal run `npm run watch` (this
  enables nodemon to work with webpack so that you do not need to restart your server to see changes while developing).
5. Visit http://localhost:3000/ and you should see "Hello World!"  


# Guide

This app boilerplate is configured so that you can jump right in and make a single
page React app. The TL;DR is: the home page renders `src/views/LandingPage/landingPage.js`,
so start building components, import them into that file, and render them. Add new URLs and
views to the `src/reactRouter.js` file. It's that easy.


### Notes:
- Webpack builds into a `public/build` folder.
- Always re-build and merge to master before deploying to production.
- I recommend a file system where each `page` has a separate folder inside `src/views` and the components that compose that view live inside that folder.
- Feel free to reach out with questions, suggestions, or feedback.

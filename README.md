# Live code of Roam (Learners Guild Project)

## Links

- [Module](https://curriculum.learnersguild.org/Phases/Practice/Modules/Roam/)
- [Github](https://github.com/LearnersGuild/roam-live-coding)
- [YouTube channel](https://www.youtube.com/watch?v=JoJrNRIsdPI&list=PLcSbxZVkmW_i2I9Ll8ki92z4Kci5XUE_Y)

## Daily Log

### April 4, 2018

  - Complete SignIn component
    - create an Input component for redux-form Field
    - enable cors on the server

  - Update router so landing page doesn't show on other pages.

  - WIP: start SignUp component
    - Create component (close copy of the SignIn component)
    - Create signUpUser action

  Tomorrow: 
    - fix bug in signUpUser action where it's not sending data to server
    - form validation on signUp form

### April 3, 2018

  - Epic battle with `react-router`, `history`, `react-router-dom`, `redux-form`, semver.
  - Finally upgraded to latest version (4.x) of everything, and updated code accordingly. 
  - To do tomorrow: use Field component instead of <input> to take advantage of `redux-form` / use latest version of `redux-form` properly

### April 2, 2018

  - Review code that was hastily copied and pasted on Friday
  - Update SignIn component to display errors without using clarityui (including creating `error-alert` style)
  - Update SignIn to bind handleFormSubmit in the constructor

### March 29, 2018

  - Create browser history using `history` npm module
  - Started signIn infrastructure:
    - component
    - actions
    - reducer
    - route
  - Updated (started?) user component
    - component
    - route

### March 28, 2018

  - Start React! 
  - Use Di's boilerplate: [http://github.com/DianaVashti/react-webpack-materialui-boilerplate.git]
  - Add Redux
  - Make Header component


### March 27, 2018

  - Protect `PATCH /posts/:id` (including checking for correct user) and test
  - Ditto for  `DELETE /posts/:id`

### March 26, 2018

  - [YouTube link to recording (warning: screen not shared for part of it!)](https://youtu.be/k97J4pdzbkM)

  - Add jwt middleware for route authentication
  - Protect `PATCH /users/:id` route and test
    - Test for requests without jwt
    - Test for request with user that doesn't match jwt
  - Protect `POST /posts` route and test

### March 23, 2018

  - [YouTube link to recording](https://youtu.be/FKIXWF_jZF8)

  - Make sign-up route: `/auth/sign-up`
    - Return either error if bad user info
      - blank email / password
      - email already in use
    - Or return jwt if user created
  - Write tests for `/auth/sign-up`
  - Discuss mutable objects and why you have to be careful with them
  - Discuss testing philosophy and the balance between completeness vs. wasted effort

### March 22, 2018

  - Add tests for `checkUserLogin`
  - Add tests for `/auth/sign-in` route
  - Update `checkUserLogin` to return user on success
  - Add code to generate token on sign-in

### March 21, 2018

  - Revive `getUserByEmail` from previous git commits (it had been changed into `getUserById`)
  - Finish `checkUserLogin` (it was there but woefully incomplete)
  - Create files for the passport strategies (`services/passport.js`) and authentication route functions (`controllers/authentication.js`)
  - Create `/auth/sign-in` route with passport local strategy middleware
  - Started the server, worked out some kinks with `dotenv`
  - Try to test `/auth/sign-in` using postman; realized we don't have anyone in our production database whose password we know. Will test tomorrow.

### March 20, 2018

  - Update deletePostById to return `null` when id doesn't exist
  - Create `DELETE /posts/:id` route and tests
  - Create `POST /posts` route and tests

### March 13, 2018

  - Change PUT to PATCH for `/users/:id`
  - Fix tests for PATCH `/users/:id` (check for returns!!)
  - Add routes and tests for GET and PATCH `/posts/:id`

### March 12, 2018

  - Merged Dev's changes from Thursday
  - Started PUT `/users/:id` route and tests

### March 8, 2018

  - Changed `getUser*ByEmail` to `getUser*ById`
  - Implemented GET `/users/:id` route and tests

### March 6, 2018

  - Added routes files and test files
  - Created tests and functionality for `/cities/:id` route

### March 1, 2018

  - Complete tests for `getPostsByCityId`
  - Complete tests and functions for `getCityDataById`
  - Start writing express server (instantiate express)

### February 27, 2018

  - Fix `update*ById` tests so that `beforeEach` doesn't clobber `before`
  - Changed name of `getUserData` and `getPostById` to `getUserDataByEmail` and `getPostDataById` (respectively) for consistency
  - Started functions and tests for `getPostsByCityId

### February 23, 2018

  - Complete `updatePostById` function
  - Write tests and functions for `updateUserById`
  - Learn that mocha runs all the `beforeEach` functions *after* the `before` functions, which caused problems with our tests

### February 22, 2018

  - completed tests for `updatePostById` and *almost* finished function

### February 21, 2018

  - Completed `deletePostById` (including tests). 
  - Started to write `updatePostById` and tests

### February 16, 2018

  - Completed `getPostById` (including tests). 
  - Started to write `deletePostById` and tests

### February 15, 2018

  - Started going faster through back end looking to start react
  - Introduced async / await
  - Finished `getUserData`; started `getPostsByUserId`

### February 14, 2018 <3

  - Discovered that abstracted property tests function wasn't actually running the tests; un-refactored.
  - Created some tests for `getUserData` -- property set tests and values for some of the properties

### February 13, 2018

  - Discussed why Bonnie prefers one `expect` per test
  - Refactor property tests to make more DRY
  - Abstract out property tests into a function
    - now can be used in multiple tests
    - if we change to test in a different way it will affect all tests
  - Discussed integration vs. unit tests and stub/mock
  - Start to write tests and code for `getUserData`

### February 8, 2018

  - Discussed possible options for testing `getUserByEmail`:
    - Test for existence of each property individually
    - Create an object that represents all expected properties and values and do a "deep equal"
    - Create a set of properties, and a set of expected properties, and compare. 
  - Decided on (and coded) option 1

### February 6, 2018

#### Part I (9:15 - 10:00)
  - Researched `bcrypt` vs `bcryptjs`; decided on the latter
  - Completed `encryptPassword` and `comparePassword` functions in `password.js`
  - Added test to check that password was encrypted properly 
  - Discussed testing functions that return promises (and how easy it is to get false positives)

#### Part II (10:15 - 12:00)
  - harped on using JSDoc
  - Started to create getUserData, realized we needed getUserByEmail
  - refused to use chai includes despite Kelcey's best efforts
  - WIP: created tests for getUserByEmail
    - got stuck on comparing the object returned by the success case
    - will resume tomorrow by doing deepEqual using known userRow
      - this will involve giving user fixed "joined_at" data
      - export user data from db_reset so code is DRY and there's less chance for discrepancies

### February 2, 2018

- Implemented mocha.opts
- Researched `--exclude` option for mocha, which was implemented 16 days ago and has not yet been merged: https://github.com/mochajs/mocha/pull/3210
- Create tests and functionality for addUser action (without encrypted password)
- Start to create and employ password ecryption function

### February 1, 2018

- Complete seed function in `db_reset.js`
- Research best way to use `dotenv` with multiple test files
- Start to implement `mocha.opts`

### January 31, 2018

- Create `db.js` file
- Start setting up for db testing
  - create `db_reset.js` file
  - create functions to truncate all tables
  - start function to seed db

### January 30, 2018

- Create file structure
- Brainstorm actions
  - Decided to create comment actions later
- Start to fill out file structure for the project
- `npm init` and `npm install` dependencies
- Write `db:` npm scripts
- Discuss `.env` vs shell scripts to create env variables
  - variables from the latter can be used in `package.json` scripts

### January 25, 2018

- More data modeling
  - Decided to let user enter arbitrary string for primary city, rather than associating it with a city id in the cities table.
  - Discussed TEXT vs. VARCHAR (see [this article](https://www.depesz.com/2010/03/02/charx-vs-varcharx-vs-varchar-vs-text/))
  - Discussed how to disallow empty string

### January 24, 2018
- Complete lists of views and routes
- List and decide on express modules
  - Research/discuss `cookie-session` vs. `express-session` vs. `client-sessions`
  - Research/discuss `passport` and `bcrypt`
- Start data modeling

### January 23, 2018
- Read Module
- Create git repo and github repo
- Start to brainstorm architecture
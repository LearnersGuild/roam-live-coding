# Live code of Roam (Learners Guild Project)

## Links

- [Module](https://curriculum.learnersguild.org/Phases/Practice/Modules/Roam/)
- [Github](https://github.com/LearnersGuild/roam-live-coding)
- [YouTube channel](https://www.youtube.com/watch?v=JoJrNRIsdPI&list=PLcSbxZVkmW_i2I9Ll8ki92z4Kci5XUE_Y)

## Daily Log

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
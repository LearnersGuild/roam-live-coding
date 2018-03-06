# Live code of Roam (Learners Guild Project)

## Links

- [Module](https://curriculum.learnersguild.org/Phases/Practice/Modules/Roam/)
- [Github](https://github.com/LearnersGuild/roam-live-coding)
- [YouTube channel](https://www.youtube.com/watch?v=JoJrNRIsdPI&list=PLcSbxZVkmW_i2I9Ll8ki92z4Kci5XUE_Y)

## Daily Log

### February 2, 2018

- Implemented mocha.opts
- Researched `--exclude` option for mocha, which was implemented 16 days ago and has not yet been merged: https://github.com/mochajs/mocha/pull/3210
- Create tests for addUser action (without encrypted password)

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
# 🎓 Senior Enrichment

A Single Page App created with React, Redux, & Express, along with multiple Testing libraries (Enzyme, Mocha, Chai, Sinon, SuperTest).

## Live Demo

Currently deployed to [Heroku](https://senior-enrichment-btam.herokuapp.com/)!

## Setting up

### Dependencies

* [React](https://reactjs.org)
* [Redux](https://redux.js.org)
* [Enzyme](https://airbnb.io/enzyme)
* [Mocha](https://mochajs.org)
* [Express](https://expressjs.com)

### Installation

* `createdb senior-enrichment`
* `npm install` (or `yarn install`)
* `npm run start:dev`
* open up [localhost:8080](http://localhost:8080) in a web browser

The `run start:dev` command will run both the `webpack` process (in watch mode) to build your client-side javascript files, and the Node process for your server with `nodemon`.

### Miscellaneous

* created React, Redux, Express, Sequelize, and Function tests, which can be run with `npm run test`
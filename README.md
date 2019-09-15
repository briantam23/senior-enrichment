[![Build Status](https://travis-ci.org/briantam23/senior-enrichment.svg?branch=master)](https://travis-ci.org/briantam23/senior-enrichment)
[![Dependency Status](https://david-dm.org/briantam23/senior-enrichment.svg)](https://david-dm.org/briantam23/senior-enrichment)
[![devDependencies Status](https://david-dm.org/briantam23/senior-enrichment/dev-status.svg)](https://david-dm.org/briantam23/senior-enrichment?type=dev)

# 🎓 Senior Enrichment

A Single Page App created with React, Redux, & Express, along with multiple Testing libraries (Enzyme, Mocha, Chai, Sinon, SuperTest).

## Table of contents
* [Live Demo](#live-demo)
* [Dependencies](#dependencies)
* [Requirements](#requirements)
* [Installation](#installation)
* [Running Locally](#running-locally)
* [Deploying to Heroku](#deploying-to-heroku)
* [Tests](#tests)
* [Contact](#contact)

## Live Demo

Currently deployed to [Heroku](https://senior-enrichment-btam.herokuapp.com/)!

## Dependencies

* [React](https://reactjs.org)
* [Redux](https://redux.js.org)
* [Enzyme](https://airbnb.io/enzyme)
* [Mocha](https://mochajs.org)
* [Express](https://expressjs.com)

## Requirements

* [Node.js (v10.16.0)](https://nodejs.org/en/)
* [Git](https://git-scm.com/downloads)
* [PostgreSQL](https://www.postgresql.org/download/)

## Installation

Step 1: Clone Repo
```sh
git clone https://github.com/briantam23/senior-enrichment.git` # or clone your own fork
```

Step 2: Create Database
```sh
createdb senior-enrichment
```

Step 3: Install `node_modules`
```sh
npm install # or yarn install
```

## Running Locally

```sh
npm run start:dev
```

The `npm run start:dev` command will run 2 processes:
* the `webpack` process (in watch mode) to build your client-side Javascript files
* the Node process for your server with `nodemon`

Your app should now be running on [localhost:8080](http://localhost:8080).

## Deploying to Heroku

Make sure you have the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed.

```
heroku create
git push heroku master
heroku open
```

Alternatively, you can deploy your own copy of the app using the web-based flow:

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Tests

Created Tests for React Components, the Redux Store, Routes, Models, and Functions:

> To run without "watch mode": 
```sh
npm run test
``` 

> To run with "watch mode":
```sh
npm run test:dev
```

## Contact
Created by [Brian Tam](http://briantam23.github.io) - feel free to contact me at [briantam23@gmail.com](mailto:briantam23@gmail.com)!

Personal Website - [briantam23.github.io](http://briantam23.github.io) <br/>
LinkedIn - [@briantam23](https://linkedin.com/in/briantam23/) <br/>
Github - [@briantam23](https://github.com/briantam23)
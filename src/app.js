'use strict';
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const membersRouter = require('./members/members-router');
const authRouter = require('./auth/auth-router');
const usersRouter = require('./users/users-router');

const app = express();

app.use(
  morgan(NODE_ENV === 'production' ? 'tiny' : 'common', {
    skip: () => NODE_ENV === 'test'
  })
);
app.use(cors());
app.use(helmet());

app.use('/api/members', membersRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);

// template for using chron job!
// add this for middleware to get API's data and post to DB -- https://www.npmjs.com/package/request
// require("./app/auth-routes.js")(app, passport); // load the routes and pass in the app and configured passport
// require("./app/game-routes.js")(app);

// cron.schedule("*/59 * * * *", () => {
//   console.log("cron running");
//   app.runMiddleware("/checkPredictions", { connection: {} }, function(
//     response
//   ) {
//     console.log("checkPredictions response", response);
//     app.runMiddleware("/updatePoints", { connection: {} }, function(response) {
//       console.log("updatePoints response", response);
//     });
//   });
// });


app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: 'Server error' };
  } else {
    console.error(error);
    response = { error: error.message, object: error };
  }
  res.status(500).json(response);
});

module.exports = app;

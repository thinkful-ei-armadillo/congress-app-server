'use strict';
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const cron = require('node-cron');
const membersRouter = require('./members/members-router');
const authRouter = require('./auth/auth-router');
const usersRouter = require('./users/users-router');

const app = express();

require('run-middleware')(app);

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

cron.schedule('1 * * * *', () => {
  console.log('cron running');
  app.runMiddleware('/api/members/seedMembers', { connection: {} }, function(
    response
  ) {
    console.log('members response', response);
  });
});

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

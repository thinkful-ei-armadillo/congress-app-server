'use strict';
const express = require('express');
const path = require('path');
const UsersService = require('./users-service');
const MembersService = require('../members/members-service');

const usersRouter = express.Router();
const jsonBodyParser = express.json();

usersRouter.post('/', jsonBodyParser, (req, res, next) => {
  const { password, user_name, full_name } = req.body;
  for (const field of ['full_name', 'user_name', 'password'])
    if (!req.body[field])
      return res.status(400).json({
        error: `Missing '${field}' in request body`
      });
  const passwordError = UsersService.validatePassword(password);
  if (passwordError) {
    return res.status(400).json({ error: passwordError });
  }
  UsersService.hasUserWithUserName(req.app.get('db'), user_name)
    .then(hasUserWithUserName => {
      if (hasUserWithUserName) {
        return res.status(400).json({ error: 'Username already taken' });
      }
      return UsersService.hashPassword(password).then(hashedPassword => {
        const newUser = {
          user_name,
          password: hashedPassword,
          full_name,
          date_created: 'now()'
        };
        return UsersService.insertUser(req.app.get('db'), newUser).then(
          user => {
            res
              .status(201)
              .location(path.posix.join(req.originalUrl, `/${user.id}`))
              .json(UsersService.serializeUser(user));
          }
        );
      });
    })
    .catch(next);
});

usersRouter
  .route('/:id/followed')
  .get((req, res, next) => {
    try {
      const id = req.params.id;

      UsersService.getFollowedMembers(req.app.get('db'), id).then(members => {
        res.json(MembersService.serializeMembers(members));
      });
    } catch (e) {
      next(e);
    }
  })
  .post(jsonBodyParser, (req, res, next) => {
    const { member } = req.body;
    try {
      const id = req.params.id;
      UsersService.addFollowedMembers(req.app.get('db'), id, member)
      // .then(member => {
      //   res.json(MembersService.serializeMember(member));
      // });
    } catch (e) {
      next(e);
    }
  });

module.exports = usersRouter;

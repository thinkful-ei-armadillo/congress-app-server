const express = require('express');
const MembersService = require('./members-service');
const config = require('../config');

const membersRouter = express.Router();

membersRouter.route('/').get((req, res, next) => {
  fetch(`${config.PROPUBLICA_API}/113/senate/members.json`);
  fetch(`${config.PROPUBLICA_API}/113/house/members.json`);

  MembersService.getAllMembers(req.app.get('db'))
    .then(members => {
      res.json(MembersService.serializeMembers(members));
    })
    .catch(next);
});

module.exports = membersRouter;

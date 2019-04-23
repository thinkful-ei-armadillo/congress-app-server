const express = require('express');
const MembersService = require('./members-service');
const config = require('../config');

const membersRouter = express.Router();

membersRouter.route('/').get((req, res, next) => {

  MembersService.getAllSenators(req.app.get('db'))
    // .then(members => {
    //   res.json(MembersService.serializeMembers(members));
    // })
    .catch(next);
});

module.exports = membersRouter;

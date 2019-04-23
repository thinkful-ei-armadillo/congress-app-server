const express = require('express');
const requestPromise = require('request-promise');
const MembersService = require('./members-service');
const { PROPUBLICA_API, PROPUBLICA_APIKEY } = require('../config');

const membersRouter = express.Router();

membersRouter.route('/').get((req, res, next) => {
  MembersService.getAllSenators(req.app.get('db'))
    // .then(members => {
    //   res.json(MembersService.serializeMembers(members));
    // })
    .catch(next);
});

membersRouter.route('/seedMembers').get((req, res, next) => {
  requestPromise({
    method: 'GET',
    uri: PROPUBLICA_API,
    json: true,
    headers: {
      'X-Auth-Token': PROPUBLICA_APIKEY
    },
    rejectUnauthorized: false
  }).then(data => {
    if (!data) {
      const message = 'No Data';
      console.error(message);
      return res.status(404).send(message);
    }
    debugger;
  });
});

membersRouter.route('/').get((req, res, next) => {
  // fetch(`${config.PROPUBLICA_API}/113/senate/members.json`)
  //   .then(senators => senators.json())
  //   .then(senatorsJSON => {
  //     let senators = senatorsJSON.results.members;
  //     MembersService.updateSenators(req.app.get('db'), senators);
  //   });
  // fetch(`${config.PROPUBLICA_API}/113/house/members.json`)
  //   .then(reps => reps.json())
  //   .then(repsJSON => {
  //     let reps = repsJSON.results.members;
  //     MembersService.updateReps(req.app.get('db'), reps);
  //   })
  // fetch(`${config.PROPUBLICA_API}/113/house/members.json`);
  // MembersService.getAllSenators(req.app.get('db'))
  // .then(members => {
  //   res.json(MembersService.serializeMembers(members));
  // })
  // .catch(next);
});

module.exports = membersRouter;

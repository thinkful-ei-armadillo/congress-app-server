'use strict';
const express = require('express');
const requestPromise = require('request-promise');
const MembersService = require('./members-service');
const { PROPUBLICA_API, PROPUBLICA_APIKEY } = require('../config');

const membersRouter = express.Router();

membersRouter.route('/search').get((req, res, next) => {
  console.log('hello from base members route!');
  // MembersService.getAllSenators(req.app.get('db'))
  //   // .then(members => {
  //   //   res.json(MembersService.serializeMembers(members));
  //   // })
  //   .catch(next);
});

membersRouter.route('/seedMembers').get(async (req, res, next) => {
  debugger;
  console.log('hello from seedMembers route!');
  try {
    await Promise.all([
      requestPromise({
        method: 'GET',
        uri: `${PROPUBLICA_API}/115/senate/members.json`,
        json: true,
        headers: {
          'X-API-Key': PROPUBLICA_APIKEY
        },
        rejectUnauthorized: false
      }).then(data => {
        if (!data) {
          const message = 'No Data';
          console.error(message);
          return res.status(404).send(message);
        }
        MembersService.updateSenators(
          req.app.get('db'),
          data.results[0].members
        ).then(result => {
          debugger;
          console.log('completed');
        });
      }),
      requestPromise({
        method: 'GET',
        uri: `${PROPUBLICA_API}/115/house/members.json`,
        json: true,
        headers: {
          'X-API-Key': PROPUBLICA_APIKEY
        },
        rejectUnauthorized: false
      }).then(data => {
        if (!data) {
          const message = 'No Data';
          console.error(message);
          return res.status(404).send(message);
        }
        debugger;

        MembersService.updateReps(
          req.app.get('db'),
          data.results[0].members
        ).then(result => {
          debugger;
          console.log('completed');
        });
      })
    ]).then(data => {
      return res.sendStatus(200);
    });
  } catch (e) {
    next(e);
  }
});

// membersRouter.route('/').get((req, res, next) => {
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
// });

module.exports = membersRouter;

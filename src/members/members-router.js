'use strict';
const express = require('express');
const requestPromise = require('request-promise');
const MembersService = require('./members-service');
const { PROPUBLICA_API, PROPUBLICA_APIKEY } = require('../config');

const membersRouter = express.Router();

membersRouter.route('/senators').get((req, res, next) => {

  MembersService.getAllSenators(req.app.get('db'))
    .then(senators => {
      res.json(MembersService.serializeSenators(senators))
    })
    .catch(next);
});

membersRouter.route('/representatives').get((req, res, next) => {

  MembersService.getAllReps(req.app.get('db'))
  .then(representatives => {
    res.json(MembersService.serializeReps(representatives))
    .catch(next);
  });
});


membersRouter.route('/search').get((req, res, next) => {
  console.log('hello from search members route!');
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
        uri: `${PROPUBLICA_API}/116/senate/members.json`,
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
        uri: `${PROPUBLICA_API}/116/house/members.json`,
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


module.exports = membersRouter;

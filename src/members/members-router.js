'use strict';
const express = require('express');
const requestPromise = require('request-promise');
const MembersService = require('./members-service');
const url = require('url');
const { PROPUBLICA_API, PROPUBLICA_APIKEY } = require('../config');

const membersRouter = express.Router();

// GET api/members/ with search compatability
membersRouter.route('/').get((req, res, next) => {
  const { state, firstname, lastname } = req.body;
  const newSearch = { state, firstname, lastname };
  console.log(newSearch);

  if (!req.body) {
    MembersService.getAllMembers(req.app.get('db'))
      .then(members => {
        res.json(MembersService.serializeMembers(members));
      })
      .catch(next);
  } else {
    if (state) {
      res.json(MembersService.getMemberByState(state));
    }
    if (firstname) {
      res.json(MembersService.getMemberByFirstName(firstname));
    }
    if (lastname) {
      res.json(MembersService.getMemberByLastName(lastname));
    }
  }
});

membersRouter.route('/search').get((req, res, next) => {
  debugger;
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;

  if (Object.keys(query).length > 0) {
    console.log(query.query);
    if (query.query === undefined) {
      query.query = '';
    }
    MembersService.searchMemberQuery(req.app.get('db'), query.query)
      .then(members => {
        res.json(members);
      })
      .catch(next);
  } else {
    MembersService.getAllMembers(req.app.get('db'))
      .then(member => {
        res.json(member);
      })
      .catch(next);
  }
});

// seeding the members in db
membersRouter.route('/seedMembers').get(async (req, res, next) => {
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

        return data.results[0].members;
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
        return data.results[0].members;
      })
    ]).then(data => {
      MembersService.updateMembers(req.app.get('db'), data[0], data[1]).then(
        result => {
          res.sendStatus(200);
        }
      );
    });
  } catch (e) {
    next(e);
  }
});

// seeding the bills in db
membersRouter.route('/seedBills').get(async (req, res, next) => {
  console.log('hello from seedBills route!');
  try {
    await Promise.all([
      requestPromise({
        method: 'GET',
        uri: `${PROPUBLICA_API}/116/house/bills/introduced.json`,
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

        MembersService.updateBills(
          req.app.get('db'),
          data.results[0].bills
        ).then(result => {
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

'use strict';
const express = require('express');
const requestPromise = require('request-promise');
const MembersService = require('./members-service');
const url = require('url');
const { PROPUBLICA_API, PROPUBLICA_APIKEY } = require('../config');

const membersRouter = express.Router();

// GET api/members/ with search compatability
membersRouter.route('/').get((req, res, next) => {
  // const { state } = req.query;
	const newSearch = req.query;
	
  console.log('this is the state search term ', newSearch.query);

  if (!req.query) {
    MembersService.getAllMembers(req.app.get('db'))
      .then(members => {
        res.json(MembersService.serializeMembers(members));
      })
      .catch(next);
  } else {
    if (newSearch) {
      res.json(
				MembersService.serializeMembers(
					MembersService.getMembersByState(newSearch.query)
				)
			);
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
    MembersService.searchMemberQuery(req.app.get('db'), query.query.split(' '))
      .then(members => {
        debugger;
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

membersRouter.route('/:id').get((req, res, next) => {
  debugger;
  try {
    const id = req.params.id;

    MembersService.getMemberByID(req.app.get('db'), id).then(member => {
      res.json(member);
    });
  } catch (e) {
    next(e);
  }
});

module.exports = membersRouter;

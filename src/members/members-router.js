'use strict';
const express = require('express');
const requestPromise = require('request-promise');
const MembersService = require('./members-service');
const { PROPUBLICA_API, PROPUBLICA_APIKEY } = require('../config');

const membersRouter = express.Router();

// GET api/members/ with search compatability
membersRouter.route('/').get((req, res, next) => {
	const { state, firstname, lastname } = req.body;
	const newSearch = { state, firstname, lastname }
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

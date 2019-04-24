'use strict';
const express = require('express');
const requestPromise = require('request-promise');
const BillsService = require('./bills-service');
const { PROPUBLICA_API, PROPUBLICA_APIKEY } = require('../config');

const billsRouter = express.Router();

// seeding the bills in db
billsRouter.route('/seedBills').get(async (req, res, next) => {
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
      }),
    ]).then(data => {
      return res.sendStatus(200);
    });
  } catch (e) {
    next(e);
  }
});
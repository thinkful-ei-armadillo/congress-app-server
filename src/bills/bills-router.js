'use strict';
const express = require('express');
const requestPromise = require('request-promise');
const BillsService = require('./bills-service');
const { PROPUBLICA_API, PROPUBLICA_APIKEY } = require('../config');
const url = require('url');
const billsRouter = express.Router();

//getall route

billsRouter.route('/').get((req, res, next) => {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;

  if (query.filter === 'active') {
    BillsService.getActiveBills(req.app.get('db'))
      .then(bills => {
        return res.json(BillsService.serializeBills(bills));
      })
      .catch(next);
  } else if (query.filter === 'introduced') {
    BillsService.getIntroducedBills(req.app.get('db'))
      .then(bills => {
        return res.json(BillsService.serializeBills(bills));
      })
      .catch(next);
  } else {
    BillsService.getAllBills(req.app.get('db'))
      .then(bills => {
        return res.json(BillsService.serializeBills(bills));
      })
      .catch(next);
  }
});

// seeding the bills in db
billsRouter.route('/seedBills').get(async (req, res, next) => {
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

        BillsService.updateBills(req.app.get('db'), data.results[0].bills).then(
          result => {
            console.log('completed');
          }
        );
      })
    ]).then(data => {
      return res.sendStatus(200);
    });
  } catch (e) {
    next(e);
  }
});

module.exports = billsRouter;

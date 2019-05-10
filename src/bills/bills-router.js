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
    await BillsService.seedBills(req.app.get('db'));
    console.log('nice')
    res.send('OK')
  } catch (e) {
    next(e);
  }
});

module.exports = billsRouter;

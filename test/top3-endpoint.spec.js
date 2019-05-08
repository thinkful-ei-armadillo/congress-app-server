'use strict';
const app = require('../src/app');
const helpers = require('./test-helpers');
const knex = require('knex');
const supertest = require('supertest');
const { expect } = require('chai');

describe('Top 3 Router Endpoints', () => {
  let db;

  const { testTops } = helpers.makeCongressFixtures();
  const testTop = testTops[0];

  describe('GET /top3s', () => {

    context('Given there are no top3s in the database', () => {

      it('responds with 404', () => {
        return supertest(app)
          .get('/api/top3s/:id')
          .expect((res) => {
            console.log(res.status);
            expect(res.status).to.equal(404);
          });
      });

    });

    before('make knex instance', () => {
      db = knex({
        client: 'pg',
        connection: process.env.TEST_DB_URL_DOS
      });
      app.set('db', db);
    });

    context('Given there are top3s in the database', () => {

      it('responds with 200 and all of the top3s', () => {
        const expectedTop3s = testTops.map(top =>
          helpers.makeExpectedBill(
            testTops,
            top
          )
        );
        console.log('expectedTop3ss is ', expectedTop3s);
        return supertest(app)
          .get('/api/top3s')
          .expect(res => {
            console.log(res.body);
            expect(res.body[0].id).to.equal(testTops[0].bill_id);
            // expect(res.body[0].title).to.equal(expectedBills[0].title);
            // expect(res.body[0].sponsor_id).to.equal(expectedBills[0].sponsor_id);
            // expect(res.body[0].summary).to.equal(expectedBills[0].summary);
          });
      });
    });

  });

});
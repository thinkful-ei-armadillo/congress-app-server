'use strict';
const app = require('../src/app');
const helpers = require('./test-helpers');
const knex = require('knex');
const supertest = require('supertest');
const { expect } = require('chai');

describe('Bills Router Endpoints', () => {
  let db;

  const { testBills } = helpers.makeCongressFixtures();
  const testBill = testBills[0];

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('cleanup', () => helpers.cleanTables(db));

  afterEach('cleanup', () => helpers.cleanTables(db));

  describe('GET /bills', () => {

    context('Given there are bills in the database', () => {
      beforeEach('insert bills', () =>
        helpers.seedBillsTable(
          db,
          testBills
        )
      );

      it('responds with 200 and all of the bills', () => {
        const expectedBills = testBills.map(bill =>
          helpers.makeExpectedBill(
            testBills,
            bill
          )
        );
        console.log('expectedBills is ', expectedBills);
        return supertest(app)
          .get('/api/bills')
          .expect((res) => {
            console.log(res.body);
            expect(res.body[0].id).to.equal(expectedBills[0].bill_id);
            expect(res.body[0].title).to.equal(expectedBills[0].title);
            expect(res.body[0].sponsor_id).to.equal(expectedBills[0].sponsor_id);
            expect(res.body[0].summary).to.equal(expectedBills[0].summary);            
          });
      });
    });

  });
});
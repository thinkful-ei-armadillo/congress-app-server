'use strict';
const app = require('../src/app');
const helpers = require('./test-helpers');
const knex = require('knex');
const supertest = require('supertest');
const { expect } = require('chai');

// INSERT INTO members (id, missed_votes_pct) VALUES ('1', 80), ('2',99), ('3',90);

describe('Top 3 Router Endpoints', () => {
  let db;

  describe('GET /top3s', () => {
    context('Given there are no top3s in the database', () => {
      it('responds with 404', () => {
        return supertest(app)
          .get('/api/top3s/:id')
          .expect(res => {
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
        return supertest(app)
          .get('/api/top3s')
          .expect(res => {
            expect(res.body.length).to.equal(3);
          });
      });
    });
  });
});

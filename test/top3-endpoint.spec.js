'use strict';
const app = require('../src/app');
const helpers = require('./test-helpers');
const knex = require('knex');
const supertest = require('supertest');
const { expect } = require('chai');

describe('Top 3 Router Endpoints', () => {
  let db;

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL_DOS
    });
    app.set('db', db);
  });

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

  });

});
'use strict';
const app = require('../src/app');
const helpers = require('./test-helpers');
const knex = require('knex');
const { expect } = require('chai');
const supertest = require('supertest');

describe('Users Router Endpoints', () => {
  let db;

  const { testUsers } = helpers.makeCongressFixtures();
  const testUser = testUsers[0];

  describe('GET /followers', () => {

    context('Given no followers', () => {
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

    context('Given a valid list of followers in database', () => {
      it('responds with 200 and all of the followed members', () => {
  
        return supertest(app)
          .get('/api/followers')
          .expect(res => {
            console.log(res.body);
            expect(res.body.length).to.equal();
          });
      });
    });

  });

});
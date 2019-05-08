'use strict';
const app = require('../src/app');
const helpers = require('./test-helpers');
const knex = require('knex');
const jwt = require('jsonwebtoken');
const { expect } = require('chai');
const supertest = require('supertest');

describe('Followers Endpoint', () => {
  let db;

  const { testFollowers } = helpers.makeCongressFixtures();
  const testFollower = [ testFollowers[0], testFollowers[1] ];

  describe('GET /followers', () => {

    context('Given no followers', () => {
      it('responds with 404', () => {
        return supertest(app)
          .get('/api/1/followers')
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

    after('disconnect from db', () => db.destroy());

    before('cleanup', () => helpers.cleanTables(db));
    // INSERT INTO followers (user_id, member_id) VALUES (1, 'K000394'), (1, 'C001111'), (2, 'R000307'), (2, 'A000361');

    context('Given a valid list of followers in database', () => {

      beforeEach('insert followers', () => helpers.seedFollowers(db, testFollowers));


      it('responds with 200 and all of the followed members', () => {

        return supertest(app)
          .get('/api/1/followers'),
        expect(res => {
          console.log(res.body, 'hello there');
          expect(res.body.length).to.equal(testFollower.length);
        });
      });
    });

  });

});
'use strict';
const app = require('../src/app');
const helpers = require('./test-helpers');
const knex = require('knex');
const { expect } = require('chai');
const supertest = require('supertest');

describe('Users Router Endpoints', () => {
  let db;


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

  describe('POST /users', () => {
    context('given a valid new user registration', () => {
      it('returns the new user on POST /users', () => {
        const newUser = {
          user_name: 'guy101112',
          full_name: 'Guy Largenum',
          password: 'PasswordA1!',
        };

        const expectedResponse = {
          id: 5,
          full_name: 'Guy Largenum',
          user_name: 'guy101112',
          date_created: '2019-03-29T02:04:15.098Z'
        };

        supertest(app)
          .post('/api/users')
          .send(newUser)
          .expect(200)
          .expect(res => expect(res.body).to.equal(expectedResponse));
      });
    });
  });
});

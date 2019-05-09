'use strict';
const app = require('../src/app');
const helpers = require('./test-helpers');
const knex = require('knex');
const jwt = require('jsonwebtoken');
const supertest = require('supertest');

describe('Auth Router Endpoints', () => {
  let db;

  const { testUsers } = helpers.makeCongressFixtures();
  const testUser = testUsers[0];

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('cleanup', () => helpers.cleanTables(db));

  describe('POST /auth/login', () => {

    context('Given a user logs in', () => {
      beforeEach('insert users', () => helpers.seedUsers(db, testUsers));

      it('authenticates username/password on POST /auth/login', () => {
        const loginAttemptBody = {
          user_name: testUser.user_name,
          password: testUser.password
        };

        const expectedToken = jwt.sign({ user_id: 1 }, process.env.JWT_SECRET, {
          subject: testUser.user_name,
          expiresIn: process.env.JWT_EXPIRY,
          algorithm: 'HS256'
        });

        supertest(app)
          .post('/api/auth/login')
          .send(loginAttemptBody)
          .expect(200, {
            authToken: expectedToken,
            user_id: 1
          });
      });

      it('responds 400 \'invalid user_name or password\' when bad user_name', () => {
        const userInvalidUser = {
          user_name: 'user-not',
          password: 'existy'
        };
        return supertest(app)
          .post('/api/auth/login')
          .send(userInvalidUser)
          .expect(400, {
            error: 'Incorrect user_name or password'
          });
      });

      it('responds 400 \'invalid user_name or password\' when bad password', () => {
        const userInvalidPass = {
          user_name: testUser.user_name,
          password: 'incorrect'
        };
        return supertest(app)
          .post('/api/auth/login')
          .send(userInvalidPass)
          .expect(400, {
            error: 'Incorrect user_name or password'
          });
      });

      

      describe('POST /auth/refresh', () => {

        context('Given an authorized user is still using the application', () => {
          
          it('sends a new JWT on POST with authorized credentials', () => {
            const expectedToken = jwt.sign(
              { user_id: 1 },
              process.env.JWT_SECRET,
              {
                subject: testUser.user_name,
                expiresIn: process.env.JWT_EXPIRY,
                algorithm: 'HS256'
              }
            );

            supertest(app)
              .post('/api/auth/refresh')
              .send({
                Authorization:
									'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE1NTM4MDE2NjcsImV4cCI6MTU1MzgxMjQ2Nywic3ViIjoiZ3V5MTIzIn0.qG7vEHkPQLKrJ6WwlWeIp4asKroMgf_En7xhbfRaKx0'
              })
              .expect(expectedToken);
          });
        });
      });
    });
  });
});

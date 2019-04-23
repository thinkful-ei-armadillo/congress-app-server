const app = require('../src/app');
const helpers = require('./test-helpers');
const knex = require('knex');
const jwt = require('jsonwebtoken');

describe('Auth Router Endpoints', () => {
  let db;

  const { testUsers } = helpers.makePetFoodsFixtures();
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

  afterEach('cleanup', () => helpers.cleanTables(db));

  describe('POST /auth/login', () => {
    context('given some users', () => {
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
            nickname: testUser.nickname,
            user_id: 1
          });
      });
      describe('POST /auth/refresh', () => {
        context('given an authorized user', () => {
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

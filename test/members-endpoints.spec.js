const app = require('../src/app');
const helpers = require('./test-helpers');
const knex = require('knex');

describe.only('Members Router Endpoints', () => {
  let db;

  const { testMembers } = helpers.makeCongressFixtures();

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

  describe('GET /', () => {
    context('Given some members in database', () => {
      before('insert members', () => {
        helpers.seedCongressTables(db, testMembers);
      });
      it('responds with 200 and members', () => {
        return supertest(app)
          .get('/api/members')
          .expect(200)
          .expect(res => {
            expect(res.body[0].id).to.exist;
            expect(res.body[0].title).to.exist;
            expect(res.body[0].short_title).to.exist;
            expect(res.body[0].first_name).to.exist;
            expect(res.body[0].last_name).to.exist;
            expect(res.body[0].date_of_birth).to.exist;
            expect(res.body[0].party).to.exist;
            expect(res.body[0].govtrack_id).to.exist;
            expect(res.body[0].url).to.exist;
          });
      });
    });
  });

  describe('GET /:id', () => {
    context('Given there are members in the database', () => {
      before('insert members', () => {
        helpers.seedCongressTables(db, testMembers);
      });
      it('responds with 200 and a member with matching id', () => {
        return supertest(app)
          .get('/api/members')
          .expect(200)
          .expect(res => {
            expect(res.body[0].id).to.equal('1');
          });
      });
      it('responds with no member when no match', () => {
        return supertest(app)
          .get('/api/members/1234567')
          .expect(200)
          .expect(res => {
            expect(res.body).to.equal('');
          });
      });
    });
    context('Given there are no members in the database', () => {
      it('responds with no member', () => {
        return supertest(app)
          .get('/api/members/1234567')
          .expect(200)
          .expect(res => {
            expect(res.body).to.equal('');
          });
      });
    });
  });
});

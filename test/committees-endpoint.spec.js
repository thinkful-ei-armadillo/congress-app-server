const app = require('../src/app');
const helpers = require('./test-helpers');
const knex = require('knex');

describe('Committees Router Endpoints', () => {
  let db;

  const { testCommittees } = helpers.makeCongressFixtures();

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

  describe('GET /committees', () => {
    context('Given some committees', () => {
      beforeEach('insert committees', () =>
        helpers.seedCongressTables(db, [], [], testCommittees)
      );

      it('responds with 200 and committees', () => {
        const expectedCommittees = [
          {
            committee_id: 'SSAF',
            committee_name: 'Committee on Agriculture, Nutrition, and Forestry',
            committee_chamber: 'Senate',
            committee_url: 'http://www.agriculture.senate.gov/',
            member: {
              id: 'R000307',
              short_title: 'Sen.',
              first_name: 'Pat',
              last_name: 'Roberts',
              party: 'R',
              phone: '202-224-4774',
              fax: '202-224-3514',
              missed_votes_pct: '0',
              votes_with_party_pct: '96.81'
            }
          },
          {
            committee_id: 'SSAP',
            committee_name: 'Committee on Appropriations',
            committee_chamber: 'Senate',
            committee_url: 'http://www.appropriations.senate.gov/',
            member: {
              id: 'S000320',
              short_title: 'Sen.',
              first_name: 'Richard',
              last_name: 'Shelby',
              party: 'R',
              phone: '202-224-5744',
              fax: '202-224-3416',
              missed_votes_pct: '0',
              votes_with_party_pct: '96.81'
            }
          },
          {
            committee_id: 'SSAS',
            committee_name: 'Committee on Armed Services',
            committee_chamber: 'Senate',
            committee_url: 'http://www.armed-services.senate.gov/',
            member: {
              id: 'I000024',
              short_title: 'Sen.',
              first_name: 'James',
              last_name: 'Inhofe',
              party: 'R',
              phone: '202-224-4721',
              fax: '202-228-0380',
              missed_votes_pct: '3.19',
              votes_with_party_pct: '94.51'
            }
          },
          {
            committee_id: 'SSBK',
            committee_name: 'Committee on Banking, Housing, and Urban Affairs',
            committee_chamber: 'Senate',
            committee_url: 'http://banking.senate.gov/',
            member: {
              id: 'C000880',
              short_title: 'Sen.',
              first_name: 'Michael',
              last_name: 'Crapo',
              party: 'R',
              phone: '202-224-6142',
              fax: '202-228-1375',
              missed_votes_pct: '2.13',
              votes_with_party_pct: '98.91'
            }
          }
        ];
        return supertest(app)
          .get('/api/committees')
          .expect(res => {
            expect(res.body[0].committee_id).to.equal(
              expectedCommittees[0].committee_id
            );
            expect(res.body[0].committee_name).to.equal(
              expectedCommittees[0].committee_name
            );
            expect(res.body[0].committee_chamber).to.equal(
              expectedCommittees[0].committee_chamber
            );
            expect(res.body[0].committee_url).to.equal(
              expectedCommittees[0].committee_url
            );
          });
      });
    });
  });
});

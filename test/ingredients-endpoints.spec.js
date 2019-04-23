const app = require('../src/app');
const helpers = require('./test-helpers');
const knex = require('knex');

describe('Ingredient Router Endpoints', () => {
  let db;

  const {
    testUsers,
    testFoods,
    testIngredients,
    testRatings,
    testBrands,
    testSumOfRatings
  } = helpers.makePetFoodsFixtures();

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
  describe('GET /ingredients', () => {
    beforeEach('insert Ratings', () =>
      helpers.seedPetFoodsTables(
        db,
        testBrands,
        testIngredients,
        testFoods,
        testUsers,
        testRatings
      )
    );
    context('given some ingredients', () => {
      it('returns list of ingredients from database on GET /ingredients', () => {
        const expectedIngredients = testIngredients;

        return supertest(app)
          .get('/api/ingredients')
          .expect(200, expectedIngredients);
      });
    });
  });
});

const app = require('../src/app');
const helpers = require('./test-helpers');
const knex = require('knex');

describe('Food Router Endpoints', () => {
  let db;

  const {
    testUsers,
    testFoods,
    testIngredients,
    testRatings,
    testBrands
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

  describe('GET /foods', () => {
    context('given some foods', () => {
      beforeEach('insertFoods', () =>
        helpers.seedPetFoodsTables(
          db,
          testBrands,
          testIngredients,
          testFoods,
          testUsers,
          testRatings
        )
      );
      it('returns list of foods from database on GET /foods', () => {
        const expectedFoods = [
          {
            id: 1,
            variety: 'beef',
            kcal: 130,
            grade: 'C',
            brand: 'Royal Canin',
            i1: 1,
            i2: 2,
            i3: 3,
            i4: 4,
            i5: 5,
            rating: 1
          },
          {
            id: 2,
            variety: 'pork',
            kcal: 110,
            grade: 'B',
            brand: 'Purina Pro Plan',
            i1: 6,
            i2: 7,
            i3: 8,
            i4: 9,
            i5: 10,
            rating: 2
          },
          {
            id: 3,
            variety: 'chicken',
            kcal: 120,
            grade: 'A',
            brand: 'Royal Canin',
            i1: 2,
            i2: 4,
            i3: 6,
            i4: 8,
            i5: 10,
            rating: 3
          },
          {
            id: 4,
            variety: 'turkey',
            kcal: 115,
            grade: 'A',
            brand: 'Weruva',
            i1: 1,
            i2: 3,
            i3: 5,
            i4: 7,
            i5: 9,
            rating: -4
          }
        ];

        return supertest(app)
          .get('/api/foods')
          .expect(200, expectedFoods);
      });
    });
  });
});

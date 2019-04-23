const Treeize = require('treeize');

const IngredientsService = {
  getAllIngredients(db) {
    return db('ingredients').select(
      'ingredients.id',
      'ingredients.name',
      'ingredients.description',
      'ingredients.impact'
    );
  },

  getById(db, id) {
    return IngredientsService.getAllIngredients(db)
      .where('ingredients.id', id)
      .first();
  },

  // getReviewsForIngredient(db, ingredient_id) {
  //   return db
  //     .from('ingredientful_reviews AS rev')
  //     .select(
  //       'rev.id',
  //       'rev.rating',
  //       'rev.text',
  //       'rev.date_created',
  //       ...userFields
  //     )
  //     .where('rev.ingredient_id', ingredient_id)
  //     .leftJoin('ingredientful_users AS usr', 'rev.user_id', 'usr.id')
  //     .groupBy('rev.id', 'usr.id');
  // },

  serializeIngredients(ingredients) {
    return ingredients.map(this.serializeIngredient);
  },

  serializeIngredient(ingredient) {
    const ingredientTree = new Treeize();

    // Some light hackiness to allow for the fact that `treeize`
    // only accepts arrays of objects, and we want to use a single
    // object.
    const ingredientData = ingredientTree.grow([ingredient]).getData()[0];

    return {
      id: ingredientData.id,
      name: ingredientData.name,
      description: ingredientData.description,
      impact: ingredientData.impact
    };
  }

  //   serializeIngredientReviews(reviews) {
  //     return reviews.map(this.serializeIngredientReview);
  //   },

  //   serializeIngredientReview(review) {
  //     const reviewTree = new Treeize();

  //     // Some light hackiness to allow for the fact that `treeize`
  //     // only accepts arrays of objects, and we want to use a single
  //     // object.
  //     const reviewData = reviewTree.grow([review]).getData()[0];

  //     return {
  //       id: reviewData.id,
  //       rating: reviewData.rating,
  //       ingredient_id: reviewData.ingredient_id,
  //       text: xss(reviewData.text),
  //       user: reviewData.user || {},
  //       date_created: reviewData.date_created
  //     };
  //   }
};

// const userFields = [
//   'usr.id AS user:id',
//   'usr.user_name AS user:user_name',
//   'usr.full_name AS user:full_name',
//   'usr.nickname AS user:nickname',
//   'usr.date_created AS user:date_created',
//   'usr.date_modified AS user:date_modified'
// ];

module.exports = IngredientsService;

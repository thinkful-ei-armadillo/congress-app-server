const Treeize = require('treeize');

const RatingsService = {
  getAllRatings(db) {
    return db('ratings')
      .select('ratings.foodid as foodid')
      .sum('ratings.rating as rating')
      .groupBy('ratings.foodid');
  },

  getById(db, id) {
    return RatingsService.getAllRatings(db)
      .where('ratings.id', id)
      .first();
  },

  getUserRatedFoods(db, userid) {
    return db('ratings')
      .select('foodid', 'rating')
      .where('userid', userid);
  },

  insertRating(db, newRating) {
    return db
      .insert(newRating)
      .into('ratings')
      .returning('*');
  },
  serializeRatings(ratings) {
    return ratings.map(this.serializeRating);
  },

  serializeRating(rating) {
    const ratingTree = new Treeize();
    const ratingData = ratingTree.grow([rating]).getData()[0];

    return {
      rating: ratingData.rating,
      foodid: ratingData.foodid,
      userid: ratingData.userid
    };
  }
};

module.exports = RatingsService;

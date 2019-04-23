const express = require('express');
const RatingsService = require('./ratings-service');
const { requireAuth } = require('../middleware/jwt-auth');

const ratingsRouter = express.Router();
const jsonBodyParser = express.json();

ratingsRouter.route('/').get((req, res, next) => {
  RatingsService.getAllRatings(req.app.get('db'))
    .then(ratings => {
      res.json(RatingsService.serializeRatings(ratings));
    })
    .catch(next);
});

ratingsRouter
  .route('/users')
  .all(requireAuth)
  .get((req, res, next) => {
    RatingsService.getUserRatedFoods(req.app.get('db'), req.query.userid)
      .then(userRatings =>
        res.json(RatingsService.serializeRatings(userRatings))
      )
      .catch(next);
  });

ratingsRouter
  .route('/foods/:food_id')
  .all(requireAuth)
  .post(jsonBodyParser, (req, res, next) => {
    return RatingsService.insertRating(req.app.get('db'), req.body)
      .then(ratingAsInDB => res.json(ratingAsInDB))
      .catch(next);
  });

module.exports = ratingsRouter;

const express = require('express');
const FoodsService = require('./foods-service');

const foodsRouter = express.Router();

foodsRouter.route('/').get((req, res, next) => {
  FoodsService.getAllFoods(req.app.get('db'))
    .then(foods => {
      res.json(FoodsService.serializeFoods(foods));
    })
    .catch(next);
});

module.exports = foodsRouter;

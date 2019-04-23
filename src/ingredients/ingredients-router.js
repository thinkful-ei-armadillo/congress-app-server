const express = require('express');
const IngredientsService = require('./ingredients-service');

const ingredientsRouter = express.Router();

ingredientsRouter.route('/').get((req, res, next) => {
  IngredientsService.getAllIngredients(req.app.get('db'))
    .then(ingredients => {
      res.json(IngredientsService.serializeIngredients(ingredients));
    })
    .catch(next);
});

module.exports = ingredientsRouter;

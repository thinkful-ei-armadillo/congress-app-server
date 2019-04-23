const Treeize = require('treeize');

const FoodsService = {
  getAllFoods(db) {
    return db('foods')
      .select(
        'foods.id',
        'foods.variety',
        'foods.kcal',
        'foods.grade',
        'foods.brand',
        'foods.i1',
        'foods.i2',
        'foods.i3',
        'foods.i4',
        'foods.i5',
        'foods.rating',
        'brands.company AS brand_name'
      )
      .leftJoin('brands', 'foods.brand', 'brands.id');
  },
  getById(db, id) {
    return FoodsService.getAllFoods(db)
      .where('foods.id', id)
      .first();
  },
  serializeFoods(foods) {
    return foods.map(this.serializeFood);
  },
  serializeFood(food) {
    const foodTree = new Treeize();
    const foodData = foodTree.grow([food]).getData()[0];

    return {
      id: foodData.id,
      variety: foodData.variety,
      kcal: foodData.kcal,
      grade: foodData.grade,
      brand: foodData.brand_name,
      i1: foodData.i1,
      i2: foodData.i2,
      i3: foodData.i3,
      i4: foodData.i4,
      i5: foodData.i5,
      rating: foodData.rating
    };
  }
};

module.exports = FoodsService;

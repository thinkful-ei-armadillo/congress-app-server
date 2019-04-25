const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function makeUsersArray() {
	return [
		{
			user_name: 'guy123',
			full_name: 'Guy-Manuel de Homem-Cristo',
			password: '$2y$12$Dv1ZTKh3pzW1QCjssNOMmuwjBClUiFbycwOwD73fx4RHAMn.4hx56'
		},
		{
			user_name: 'guy456',
			full_name: 'Garrett Douglas',
			password: '$2y$12$Dv1ZTKh3pzW1QCjssNOMmuwjBClUiFbycwOwD73fx4RHAMn.4hx56'
		},
		{
			user_name: 'guy789',
			full_name: 'Baker Mayfield',
			password: '$2y$12$Dv1ZTKh3pzW1QCjssNOMmuwjBClUiFbycwOwD73fx4RHAMn.4hx56'
		}
	];
}

function makeFoodsArray() {
	return [
		{
			id: 1,
			variety: 'beef',
			kcal: 130,
			grade: 'C',
			brand: 1,
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
			brand: 2,
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
			brand: 1,
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
			brand: 3,
			i1: 1,
			i2: 3,
			i3: 5,
			i4: 7,
			i5: 9,
			rating: -4
		}
	];
}

function makeIngredientsArray() {
	return [
		{
			id: 1,
			name: 'cow',
			description: 'a cow',
			impact: 7
		},
		{
			id: 2,
			name: 'pig',
			description: 'a pig',
			impact: 6
		},
		{
			id: 3,
			name: 'chicken',
			description: 'a chicken',
			impact: 2
		},
		{
			id: 4,
			name: 'turkey',
			description: 'a turkey',
			impact: 3
		},
		{
			id: 5,
			name: 'cow5',
			description: 'a cow',
			impact: 2
		},
		{
			id: 6,
			name: 'cow6',
			description: 'desciption',
			impact: 7
		},
		{
			id: 7,
			name: 'cow7',
			description: 'deskiptio',
			impact: 2
		},
		{
			id: 8,
			name: 'cow8',
			description: 'descripto',
			impact: 2
		},
		{
			id: 9,
			name: 'cow9',
			description: 'desukuripushunnu',
			impact: 2
		},
		{
			id: 10,
			name: 'cow0',
			description: 'wow',
			impact: 2
		}
	];
}

function makeRatingsArray() {
	return [
		{ rating: 1, userid: 1, foodid: 1 },
		{ rating: 1, userid: 1, foodid: 2 },
		{ rating: -1, userid: 1, foodid: 3 },
		{ rating: -1, userid: 1, foodid: 4 },
		{ rating: -1, userid: 2, foodid: 1 },
		{ rating: -1, userid: 2, foodid: 2 },
		{ rating: 1, userid: 2, foodid: 3 },
		{ rating: -1, userid: 2, foodid: 4 },
		{ rating: -1, userid: 3, foodid: 1 },
		{ rating: -1, userid: 3, foodid: 2 },
		{ rating: 1, userid: 3, foodid: 3 },
		{ rating: 1, userid: 3, foodid: 4 }
	];
}

function makeSumOfRatingsArray() {
	return [
		{
			rating: '1',
			foodid: 3
		},
		{
			rating: '-1',
			foodid: 4
		},
		{
			rating: '-1',
			foodid: 2
		},
		{
			rating: '-1',
			foodid: 1
		}
	];
}

function makeBrandsArray() {
	return [
		{ company: 'Royal Canin' },
		{ company: 'Purina Pro Plan' },
		{ company: 'Weruva' }
	];
}

function makeExpectedThing(users, thing, reviews = []) {
	const user = users.find(user => user.id === thing.user_id);

	const thingReviews = reviews.filter(review => review.thing_id === thing.id);

	const number_of_reviews = thingReviews.length;
	const average_review_rating = calculateAverageReviewRating(thingReviews);

	return {
		id: thing.id,
		image: thing.image,
		title: thing.title,
		content: thing.content,
		date_created: thing.date_created,
		number_of_reviews,
		average_review_rating,
		user: {
			id: user.id,
			user_name: user.user_name,
			full_name: user.full_name,
			date_created: user.date_created
		}
	};
}

function makePetFoodsFixtures() {
	const testUsers = makeUsersArray();
	const testFoods = makeFoodsArray();
	const testIngredients = makeIngredientsArray();
	const testSumOfRatings = makeSumOfRatingsArray();
	const testRatings = makeRatingsArray();
	const testBrands = makeBrandsArray();
	return {
		testUsers,
		testFoods,
		testIngredients,
		testRatings,
		testSumOfRatings,
		testBrands
	};
}

function cleanTables(db) {
	return db.raw(
		`TRUNCATE
  ratings,
  ingredients,
  brands,
  users,
  foods
  RESTART IDENTITY CASCADE;`
	);
}

function seedUsers(db, users) {
	const preppedUsers = users.map(user => ({
		...user,
		password: bcrypt.hashSync(user.password, 12)
	}));
	return db.into('users').insert(preppedUsers);
}

function seedPetFoodsTables(
	db,
	brands = [],
	ingredients = [],
	foods = [],
	users = [],
	ratings = []
) {
	return seedUsers(db, users)
		.then(() => db.into('brands').insert(brands))
		.then(() => db.into('ingredients').insert(ingredients))
		.then(() => db.into('foods').insert(foods))
		.then(() => db.into('ratings').insert(ratings));
}

function seedMaliciousThing(db, user, thing) {
	return seedUsers(db, [user]).then(() =>
		db.into('thingful_things').insert([thing])
	);
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
	const token = jwt.sign({ user_id: user.id }, secret, {
		subject: user.user_name,
		algorithm: 'HS256'
	});
	return `Bearer ${token}`;
}

module.exports = {
	makeUsersArray,
	makeFoodsArray,
	makeIngredientsArray,
	makeSumOfRatingsArray,
	makeBrandsArray,

	makePetFoodsFixtures,
	cleanTables,
	seedUsers,
	seedPetFoodsTables,
	seedMaliciousThing,
	makeAuthHeader
};

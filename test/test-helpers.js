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

function makeMembersArray() {
	// fields to add:
	// id TEXT PRIMARY KEY,
  // title TEXT,
  // short_title TEXT,
  // first_name TEXT,
  // middle_name TEXT,
  // last_name TEXT,
  // suffix TEXT,
  // date_of_birth TEXT,
  // party TEXT,
  // leadership_role TEXT,
  // twitter_account TEXT,
  // facebook_account TEXT,
  // youtube_account TEXT,
  // govtrack_id INTEGER,
  // url TEXT,
  // in_office BOOLEAN,
  // seniority INTEGER,
  // district TEXT DEFAULT NULL,
  // committees TEXT DEFAULT NULL,
  // next_election INTEGER,
  // total_votes INTEGER,
  // missed_votes INTEGER,
  // total_present INTEGER, -- 'present' votes rather than yea or nay
  // last_updated TEXT,
  // office TEXT,
  // phone TEXT,
  // fax TEXT,
  // state TEXT,
  // senate_class INTEGER DEFAULT NULL,
  // state_rank TEXT DEFAULT NULL,
  // missed_votes_pct NUMERIC,
  // votes_with_party_pct NUMERIC,
	// type TEXT
	
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

function makeBillsArray() {
	// fields to add:
	// bill_id TEXT,
  // bill_type TEXT,
  // number TEXT,
  // bill_uri TEXT,
  // title TEXT,
  // sponsor_id TEXT,
  // sponsor_name TEXT,
  // sponsor_state TEXT,
  // sponsor_uri TEXT,
  // gpo_pdf_uri TEXT,
  // congressdotgov_url TEXT,
  // govtrack_url TEXT,
  // introduced_date TEXT,
  // active BOOLEAN,
  // house_passage TEXT,
  // senate_passage TEXT,
  // enacted TEXT,
  // vetoed TEXT,
  // cosponsors INTEGER,
  // committees TEXT,
  // committee_codes TEXT,
  // subcommittee_codes TEXT,
  // primary_subject TEXT,
  // summary TEXT,
  // summary_short TEXT,
  // latest_major_action_date TEXT,
  // latest_major_action TEXT
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

function makeCommitteesArray() {
	// fields to add:
	// committee_id TEXT,
  // committee_name TEXT,
  // committee_chamber TEXT,
  // committee_url TEXT,
  // committee_chair TEXT,
  // committee_chair_id TEXT
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

function makeFollowersArray() {
	//fields to add:
	// user_id INTEGER 
	// member_id TEXT 
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

function makeCongressFixtures() {
	const testUsers = makeUsersArray();
	const testMembers = makeMembersArray();
	const testBills = makeBillsArray();
	const testCommittees = makeCommitteesArray();
	const testFollowers = makeFollowersArray();

	return {
		testUsers,
		testMembers,
		testBills,
		testCommittees,
		testFollowers
	};
}

function cleanTables(db) {
	return db.raw(
		`TRUNCATE
			bills,
			committees,
			followers,
			members,
			users;`
	);
}

function seedUsers(db, users) {
	const preppedUsers = users.map(user => ({
		...user,
		password: bcrypt.hashSync(user.password, 12)
	}));
	return db.into('users').insert(preppedUsers);
}

function seedCongressTables(
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
	makeMembersArray,
	makeBillsArray,
	makeCommitteesArray,
	makeFollowersArray,
	makeCongressFixtures,
	cleanTables,
	seedUsers,
	seedCongressTables,
	seedMaliciousThing,
	makeAuthHeader
};

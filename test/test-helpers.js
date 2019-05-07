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
	return [
		{
			bill_id: '1',
			bill_type: 'bill',
			number: '2',
			bill_uri: 'http://cow.com/bill/text',
			title: 'cow people should live as equals',
			sponsor_id: '2',
			sponsor_name: 'cow',
			sponsor_state: 'tejas',
			sponsor_uri: 'http://cow.com/sponsor',
			gpo_pdf_uri: 'http://cowpdf.com',
			congressdotgov_url: 'http://cowcongress.com',
			govtrack_url: 'http://cow.com',
			introduced_date: '2',
			active: true,
			house_passage: 'yes',
			senate_passage: 'yes',
			enacted: 'yes',
			vetoed: 'no',
			cosponsors: 2,
			committees: 'farm committee',
			committee_codes: '1',
			subcommittee_codes: '1',
			primary_subject: 'cow',
			summary: 'a cow bill',
			summary_short: 'a cow',
			latest_major_action_date: '5 days ago',
			latest_major_action: 'referred'
		},
		{
			bill_id: '1',
			bill_type: 'bill',
			number: '2',
			bill_uri: 'http://cow.com/bill/text',
			title: 'cow people should live as equals',
			sponsor_id: '2',
			sponsor_name: 'cow',
			sponsor_state: 'tejas',
			sponsor_uri: 'http://cow.com/sponsor',
			gpo_pdf_uri: 'http://cowpdf.com',
			congressdotgov_url: 'http://cowcongress.com',
			govtrack_url: 'http://cow.com',
			introduced_date: '2',
			active: true,
			house_passage: 'yes',
			senate_passage: 'yes',
			enacted: 'yes',
			vetoed: 'no',
			cosponsors: 2,
			committees: 'farm committee',
			committee_codes: '1',
			subcommittee_codes: '1',
			primary_subject: 'cow',
			summary: 'a cow bill',
			summary_short: 'a cow',
			latest_major_action_date: '5 days ago',
			latest_major_action: 'referred'
		},
		{
			bill_id: '1',
			bill_type: 'bill',
			number: '2',
			bill_uri: 'http://cow.com/bill/text',
			title: 'cow people should live as equals',
			sponsor_id: '2',
			sponsor_name: 'cow',
			sponsor_state: 'tejas',
			sponsor_uri: 'http://cow.com/sponsor',
			gpo_pdf_uri: 'http://cowpdf.com',
			congressdotgov_url: 'http://cowcongress.com',
			govtrack_url: 'http://cow.com',
			introduced_date: '2',
			active: true,
			house_passage: 'yes',
			senate_passage: 'yes',
			enacted: 'yes',
			vetoed: 'no',
			cosponsors: 2,
			committees: 'farm committee',
			committee_codes: '1',
			subcommittee_codes: '1',
			primary_subject: 'cow',
			summary: 'a cow bill',
			summary_short: 'a cow',
			latest_major_action_date: '5 days ago',
			latest_major_action: 'referred'
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


function makeExpectedBill(bills, expectedBill) {
	const bill = bills.find(bill => expectedBill.bill_id === bill.bill_id)
	// console.log('bill is ', bill);	
	// console.log('expected bill is ', expectedBill);
	return {
		id: bill.bill_id,
		title: bill.title,
		sponsor_id: bill.sponsor_id,
		summary: bill.summary
	}
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
	members = [],
	bills = [],
	committees = [],
	users = [],
	followers = []
) {
	return seedUsers(db, users)
		.then(() => db.into('members').insert(members))
		.then(() => db.into('bills').insert(bills))
		.then(() => db.into('committees').insert(committees))
		.then(() => db.into('followers').insert(followers));
}

function seedBillsTable(db, bills = []) {
	const preppedBills = bills.map(bill => ({
		...bill
	}));
	// console.log('prepped bills for db insert: ', preppedBills)
	return () => db.into('bills').insert(preppedBills);
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
	makeExpectedBill,
	cleanTables,
	seedUsers,
	seedCongressTables,
	seedBillsTable,
	makeAuthHeader
};

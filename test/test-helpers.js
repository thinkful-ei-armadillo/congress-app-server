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
	// length 12
	return [
		{
			committee_id: 'SSAF',
			committee_name: 'Committee on Agriculture, Nutrition, and Forestry',
			committee_chamber: 'Senate',
			committee_url: 'http://www.agriculture.senate.gov/',
			committee_chair: 'Pat Roberts',
			committee_chair_id: 'R000307'
		},
		{
			committee_id: 'SSAP',
			committee_name: 'Committee on Appropriations',
			committee_chamber: 'Senate',
			committee_url: 'http://www.appropriations.senate.gov/',
			committee_chair: 'Richard Shelby',
			committee_chair_id: 'S000320'
		},
		{
			committee_id: 'SSAS',
			committee_name: 'Committee on Armed Services',
			committee_chamber: 'Senate',
			committee_url: 'http://www.armed-services.senate.gov/',
			committee_chair: 'James Inhofe',
			committee_chair_id: 'I000024'
		},
		{
			committee_id: 'SSBK',
			committee_name: 'Committee on Banking, Housing, and Urban Affairs',
			committee_chamber: 'Senate',
			committee_url: 'http://banking.senate.gov/',
			committee_chair: 'Michael Crapo',
			committee_chair_id: 'C000880'
		},
		{
			committee_id: 'SSCM',
			committee_name: 'Committee on Commerce, Science, and Transportation',
			committee_chamber: 'Senate',
			committee_url: 'http://www.commerce.senate.gov/',
			committee_chair: 'Roger Wicker',
			committee_chair_id: 'W000437'
		},
		{
			committee_id: 'SSEG',
			committee_name: 'Committee on Energy and Natural Resources',
			committee_chamber: 'Senate',
			committee_url: 'http://www.energy.senate.gov/',
			committee_chair: 'Lisa Murkowski',
			committee_chair_id: 'M001153'
		},
		{
			committee_id: 'SSFI',
			committee_name: 'Committee on Finance',
			committee_chamber: 'Senate',
			committee_url: 'http://www.finance.senate.gov/',
			committee_chair: 'Charles Grassley',
			committee_chair_id: 'G000386'
		},
		{
			committee_id: 'SSEV',
			committee_name: 'Committee on Environment and Public Works',
			committee_chamber: 'Senate',
			committee_url: 'http://www.epw.senate.gov/',
			committee_chair: 'John Barrasso',
			committee_chair_id: 'B001261'
		},
		{
			committee_id: 'SSFR',
			committee_name: 'Committee on Foreign Relations',
			committee_chamber: 'Senate',
			committee_url: 'http://www.foreign.senate.gov/',
			committee_chair: 'Jim Risch',
			committee_chair_id: 'R000584'
		},
		{
			committee_id: 'SSHR',
			committee_name: 'Committee on Health, Education, Labor, and Pensions',
			committee_chamber: 'Senate',
			committee_url: 'http://www.help.senate.gov/',
			committee_chair: 'Lamar Alexander',
			committee_chair_id: 'A000360'
		},
		{
			committee_id: 'SSGA',
			committee_name: 'Committee on Homeland Security and Governmental Affairs',
			committee_chamber: 'Senate',
			committee_url: 'http://www.hsgac.senate.gov/',
			committee_chair: 'Ron Johnson',
			committee_chair_id: 'J000293'
		},
		{
			committee_id: 'SLIA',
			committee_name: 'Committee on Indian Affairs',
			committee_chamber: 'Senate',
			committee_url: 'http://www.indian.senate.gov/',
			committee_chair: 'John Hoeven',
			committee_chair_id: 'H001061'
		}
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

// function makeExpectedThing(users, thing, reviews = []) {
// 	const user = users.find(user => user.id === thing.user_id);

// 	const thingReviews = reviews.filter(review => review.thing_id === thing.id);

// 	const number_of_reviews = thingReviews.length;
// 	const average_review_rating = calculateAverageReviewRating(thingReviews);

// 	return {
// 		id: thing.id,
// 		image: thing.image,
// 		title: thing.title,
// 		content: thing.content,
// 		date_created: thing.date_created,
// 		number_of_reviews,
// 		average_review_rating,
// 		user: {
// 			id: user.id,
// 			user_name: user.user_name,
// 			full_name: user.full_name,
// 			date_created: user.date_created
// 		}
// 	};
// }

function makeExpectedBill(bills, expectedBill) {
	const bill = bills.find(bill => expectedBill.bill_id === bill.bill_id);
	// console.log('bill is ', bill);
	// console.log('expected bill is ', expectedBill);
	return {
		id: bill.bill_id,
		title: bill.title,
		sponsor_id: bill.sponsor_id,
		summary: bill.summary
	};
}
//        committee_id: 'SSAF',
// 				committee_name: 'Committee on Agriculture, Nutrition, and Forestry',
// 				committee_chamber: 'Senate',
// 				committee_url: 'http://www.agriculture.senate.gov/',
// 				member: {
function makeExpectedCommittee(committees, expectedCommittee) {
	const committee = committees.find(
		committee => committee.committee_id === expectedCommittee.committee_id
	);

	return {
		id: committee.committee_id,
		name: committee.name,
		chamber: committee.chamber,
		url: committee.url,
		member: committee.member
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

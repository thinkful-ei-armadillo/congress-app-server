const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function makeUsersArray() {
  return [
    {
      user_name: "guy123",
      full_name: "Guy-Manuel de Homem-Cristo",
      password: "$2y$12$Dv1ZTKh3pzW1QCjssNOMmuwjBClUiFbycwOwD73fx4RHAMn.4hx56"
    },
    {
      user_name: "guy456",
      full_name: "Garrett Douglas",
      password: "$2y$12$Dv1ZTKh3pzW1QCjssNOMmuwjBClUiFbycwOwD73fx4RHAMn.4hx56"
    },
    {
      user_name: "guy789",
      full_name: "Baker Mayfield",
      password: "$2y$12$Dv1ZTKh3pzW1QCjssNOMmuwjBClUiFbycwOwD73fx4RHAMn.4hx56"
    }
  ];
}

function makeMembersArray() {

  return [
    // length 6
    {
      id: 1,
      title: "someText",
      short_title: "lessText",
      first_name: "Daniel",
      last_name: "Ors",
      suffix: "My Guy",
      date_of_birth: "December 25th",
      party: "D",
      leadership_role: "Project Manager",
      twitter_account: "twitter",
      facebook_account: "facebook",
      youtube_account: "youtube",
      govtrack_id: 1,
      url: "someUrl",
      in_office: true,
      seniority: 1,
      district: "someDistrict",
      committees: "someCommittees",
      next_election: 1,
      total_votes: 9000,
      missed_votes: 0,
      total_present: 1,
      last_updated: "updated",
      office: "someOffice",
      phone: "123456789",
      fax: "123456789",
      state: "VA",
      senate_class: 1,
      state_rank: "1",
      missed_votes_pct: 0,
      votes_with_party_pct: 100,
      type: "someType",
      // committee_id: "someId",
      // committee_name: "someName",
      // committee_chamber: "someChamber",
      // committee_url: "someUrl",
      // committee_chair: "someChair",
      // committee_chair_id: "someChairId"
    },
    {
      id: 2,
      title: "someText",
      short_title: "lessText",
      first_name: "Irem",
      last_name: "Sen",
      suffix: "Say Chill",
      date_of_birth: "December 25th",
      party: "D",
      leadership_role: "Design Lead",
      twitter_account: "twitter",
      facebook_account: "facebook",
      youtube_account: "youtube",
      govtrack_id: 2,
      url: "someUrl",
      in_office: true,
      seniority: 1,
      district: "someDistrict",
      committees: "someCommittees",
      next_election: 1,
      total_votes: 9000,
      missed_votes: 0,
      total_present: 1,
      last_updated: "updated",
      office: "someOffice",
      phone: "123456789",
      fax: "123456789",
      state: "MA",
      senate_class: 1,
      state_rank: "1",
      missed_votes_pct: 0,
      votes_with_party_pct: 100,
      type: "someType",
      // committee_id: "someId",
      // committee_name: "someName",
      // committee_chamber: "someChamber",
      // committee_url: "someUrl",
      // committee_chair: "someChair",
      // committee_chair_id: "someChairId"
    },
    {
      id: 3,
      title: "someText",
      short_title: "lessText",
      first_name: "Owen",
      last_name: "Cyr",
      suffix: "The Sir",
      date_of_birth: "December 25th",
      party: "R",
      leadership_role: "Testing Lead",
      twitter_account: "twitter",
      facebook_account: "facebook",
      youtube_account: "youtube",
      govtrack_id: 2,
      url: "someUrl",
      in_office: true,
      seniority: 1,
      district: "someDistrict",
      committees: "someCommittees",
      next_election: 1,
      total_votes: 9000,
      missed_votes: 0,
      total_present: 1,
      last_updated: "updated",
      office: "someOffice",
      phone: "123456789",
      fax: "123456789",
      state: "VA",
      senate_class: 1,
      state_rank: "1",
      missed_votes_pct: 0,
      votes_with_party_pct: 100,
      type: "someType",
      // committee_id: "someId",
      // committee_name: "someName",
      // committee_chamber: "someChamber",
      // committee_url: "someUrl",
      // committee_chair: "someChair",
      // committee_chair_id: "someChairId"
    },
    {
      id: 4,
      title: "someText",
      short_title: "lessText",
      first_name: "Payman",
      last_name: "Kossari",
      suffix: "Brotha",
      date_of_birth: "December 25th",
      party: "D",
      leadership_role: "Marketing Manager",
      twitter_account: "twitter",
      facebook_account: "facebook",
      youtube_account: "youtube",
      govtrack_id: 2,
      url: "someUrl",
      in_office: true,
      seniority: 1,
      district: "someDistrict",
      committees: "someCommittees",
      next_election: 1,
      total_votes: 9000,
      missed_votes: 0,
      total_present: 1,
      last_updated: "updated",
      office: "someOffice",
      phone: "123456789",
      fax: "123456789",
      state: "MD",
      senate_class: 1,
      state_rank: "1",
      missed_votes_pct: 0,
      votes_with_party_pct: 100,
      type: "someType",
      // committee_id: "someId",
      // committee_name: "someName",
      // committee_chamber: "someChamber",
      // committee_url: "someUrl",
      // committee_chair: "someChair",
      // committee_chair_id: "someChairId"
    },
    {
      id: 5,
      title: "someText",
      short_title: "lessText",
      first_name: "Ali",
      last_name: "Lahrime",
      suffix: "Bruh",
      date_of_birth: "December 25th",
      party: "D",
      leadership_role: "Project Manager",
      twitter_account: "twitter",
      facebook_account: "facebook",
      youtube_account: "youtube",
      govtrack_id: 2,
      url: "someUrl",
      in_office: true,
      seniority: 1,
      district: "someDistrict",
      committees: "someCommittees",
      next_election: 1,
      total_votes: 9000,
      missed_votes: 0,
      total_present: 1,
      last_updated: "updated",
      office: "someOffice",
      phone: "123456789",
      fax: "123456789",
      state: "VA",
      senate_class: 1,
      state_rank: "1",
      missed_votes_pct: 0,
      votes_with_party_pct: 100,
      type: "someType",
      // committee_id: "someId",
      // committee_name: "someName",
      // committee_chamber: "someChamber",
      // committee_url: "someUrl",
      // committee_chair: "someChair",
      // committee_chair_id: "someChairId"
    },
    {
      id: 6,
      title: "someText",
      short_title: "lessText",
      first_name: "TJ",
      last_name: "Stalcup",
      suffix: "Indaweeds",
      date_of_birth: "December 25th",
      party: "D",
      leadership_role: "The Boss",
      twitter_account: "twitter",
      facebook_account: "facebook",
      youtube_account: "youtube",
      govtrack_id: 2,
      url: "someUrl",
      in_office: true,
      seniority: 1,
      district: "someDistrict",
      committees: "someCommittees",
      next_election: 1,
      total_votes: 9000,
      missed_votes: 0,
      total_present: 1,
      last_updated: "updated",
      office: "someOffice",
      phone: "123456789",
      fax: "123456789",
      state: "Japan",
      senate_class: 1,
      state_rank: "1",
      missed_votes_pct: 0,
      votes_with_party_pct: 100,
      type: "someType",
      // committee_id: "someId",
      // committee_name: "someName",
      // committee_chamber: "someChamber",
      // committee_url: "someUrl",
      // committee_chair: "someChair",
      // committee_chair_id: "someChairId"
    }
  ];
}

function makeBillsArray() {
  return [
    {
      bill_id: "1",
      bill_type: "bill",
      number: "2",
      bill_uri: "http://cow.com/bill/text",
      title: "cow people should live as equals",
      sponsor_id: "2",
      sponsor_name: "cow",
      sponsor_state: "tejas",
      sponsor_uri: "http://cow.com/sponsor",
      gpo_pdf_uri: "http://cowpdf.com",
      congressdotgov_url: "http://cowcongress.com",
      govtrack_url: "http://cow.com",
      introduced_date: "2",
      active: true,
      house_passage: "yes",
      senate_passage: "yes",
      enacted: "yes",
      vetoed: "no",
      cosponsors: 2,
      committees: "farm committee",
      committee_codes: "1",
      subcommittee_codes: "1",
      primary_subject: "cow",
      summary: "a cow bill",
      summary_short: "a cow",
      latest_major_action_date: "5 days ago",
      latest_major_action: "referred"
    },
    {
      bill_id: "1",
      bill_type: "bill",
      number: "2",
      bill_uri: "http://cow.com/bill/text",
      title: "cow people should live as equals",
      sponsor_id: "2",
      sponsor_name: "cow",
      sponsor_state: "tejas",
      sponsor_uri: "http://cow.com/sponsor",
      gpo_pdf_uri: "http://cowpdf.com",
      congressdotgov_url: "http://cowcongress.com",
      govtrack_url: "http://cow.com",
      introduced_date: "2",
      active: true,
      house_passage: "yes",
      senate_passage: "yes",
      enacted: "yes",
      vetoed: "no",
      cosponsors: 2,
      committees: "farm committee",
      committee_codes: "1",
      subcommittee_codes: "1",
      primary_subject: "cow",
      summary: "a cow bill",
      summary_short: "a cow",
      latest_major_action_date: "5 days ago",
      latest_major_action: "referred"
    },
    {
      bill_id: "1",
      bill_type: "bill",
      number: "2",
      bill_uri: "http://cow.com/bill/text",
      title: "cow people should live as equals",
      sponsor_id: "2",
      sponsor_name: "cow",
      sponsor_state: "tejas",
      sponsor_uri: "http://cow.com/sponsor",
      gpo_pdf_uri: "http://cowpdf.com",
      congressdotgov_url: "http://cowcongress.com",
      govtrack_url: "http://cow.com",
      introduced_date: "2",
      active: true,
      house_passage: "yes",
      senate_passage: "yes",
      enacted: "yes",
      vetoed: "no",
      cosponsors: 2,
      committees: "farm committee",
      committee_codes: "1",
      subcommittee_codes: "1",
      primary_subject: "cow",
      summary: "a cow bill",
      summary_short: "a cow",
      latest_major_action_date: "5 days ago",
      latest_major_action: "referred"
    }
  ];
}

function makeCommitteesArray() {
  // length 12
  return [
    {
      committee_id: "SSAF",
      committee_name: "Committee on Agriculture, Nutrition, and Forestry",
      committee_chamber: "Senate",
      committee_url: "http://www.agriculture.senate.gov/",
      committee_chair: "Pat Roberts",
      committee_chair_id: "R000307"
    },
    {
      committee_id: "SSAP",
      committee_name: "Committee on Appropriations",
      committee_chamber: "Senate",
      committee_url: "http://www.appropriations.senate.gov/",
      committee_chair: "Richard Shelby",
      committee_chair_id: "S000320"
    },
    {
      committee_id: "SSAS",
      committee_name: "Committee on Armed Services",
      committee_chamber: "Senate",
      committee_url: "http://www.armed-services.senate.gov/",
      committee_chair: "James Inhofe",
      committee_chair_id: "I000024"
    },
    {
      committee_id: "SSBK",
      committee_name: "Committee on Banking, Housing, and Urban Affairs",
      committee_chamber: "Senate",
      committee_url: "http://banking.senate.gov/",
      committee_chair: "Michael Crapo",
      committee_chair_id: "C000880"
    },
    {
      committee_id: "SSCM",
      committee_name: "Committee on Commerce, Science, and Transportation",
      committee_chamber: "Senate",
      committee_url: "http://www.commerce.senate.gov/",
      committee_chair: "Roger Wicker",
      committee_chair_id: "W000437"
    },
    {
      committee_id: "SSEG",
      committee_name: "Committee on Energy and Natural Resources",
      committee_chamber: "Senate",
      committee_url: "http://www.energy.senate.gov/",
      committee_chair: "Lisa Murkowski",
      committee_chair_id: "M001153"
    },
    {
      committee_id: "SSFI",
      committee_name: "Committee on Finance",
      committee_chamber: "Senate",
      committee_url: "http://www.finance.senate.gov/",
      committee_chair: "Charles Grassley",
      committee_chair_id: "G000386"
    },
    {
      committee_id: "SSEV",
      committee_name: "Committee on Environment and Public Works",
      committee_chamber: "Senate",
      committee_url: "http://www.epw.senate.gov/",
      committee_chair: "John Barrasso",
      committee_chair_id: "B001261"
    },
    {
      committee_id: "SSFR",
      committee_name: "Committee on Foreign Relations",
      committee_chamber: "Senate",
      committee_url: "http://www.foreign.senate.gov/",
      committee_chair: "Jim Risch",
      committee_chair_id: "R000584"
    },
    {
      committee_id: "SSHR",
      committee_name: "Committee on Health, Education, Labor, and Pensions",
      committee_chamber: "Senate",
      committee_url: "http://www.help.senate.gov/",
      committee_chair: "Lamar Alexander",
      committee_chair_id: "A000360"
    },
    {
      committee_id: "SSGA",
      committee_name: "Committee on Homeland Security and Governmental Affairs",
      committee_chamber: "Senate",
      committee_url: "http://www.hsgac.senate.gov/",
      committee_chair: "Ron Johnson",
      committee_chair_id: "J000293"
    },
    {
      committee_id: "SLIA",
      committee_name: "Committee on Indian Affairs",
      committee_chamber: "Senate",
      committee_url: "http://www.indian.senate.gov/",
      committee_chair: "John Hoeven",
      committee_chair_id: "H001061"
    }
  ];
}

function makeFollowersArray() {
	return [
		{
			user_id: 1,
			member_id: 'K000394'
		},
		{
			user_id: 1,
			member_id: 'C001111'
		},
		{
			user_id: 2,
			member_id: 'R000307'
		},
		{
			user_id: 2,
			member_id: 'A000361'
		}
	];
}

function seedFollowers(db, followers = []) {
	return db.into('followers').insert(followers);
}

function makeExpectedBill(bills, expectedBill) {
  const bill = bills.find(bill => expectedBill.bill_id === bill.bill_id);

  return {
    id: bill.bill_id,
    title: bill.title,
    sponsor_id: bill.sponsor_id,
    summary: bill.summary
  };
}

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

function makeExpectedTops(tops, expectedTops) {
	let top3 = tops.sort();
	top3 = top3.splice(0, 3);

	return top3;
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
		testFollowers,
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
  return db.into("users").insert(preppedUsers);
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
    .then(() => db.into("members").insert(members))
    .then(() => db.into("bills").insert(bills))
    .then(() => db.into("committees").insert(committees))
    .then(() => db.into("followers").insert(followers));
}

function seedBillsTable(db, bills = []) {
  const preppedBills = bills.map(bill => ({
    ...bill
  }));
  return () => db.into("bills").insert(preppedBills);
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.user_name,
    algorithm: "HS256"
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
	makeExpectedTops,
	cleanTables,
	seedUsers,
	seedCongressTables,
	seedBillsTable,
	seedFollowers,
	makeAuthHeader
};

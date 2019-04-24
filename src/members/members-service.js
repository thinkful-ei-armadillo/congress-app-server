'use strict';
const Treeize = require('treeize');
const {
  getSenatorObj,
  getRepObj,
  getBillObj,
  getMembersObj
} = require('../utils/extract');

const MembersService = {
  updateMembers(db, senate, house) {
    return Promise.all([
      db('members').truncate(),
      ...house.map(member => {
        member = getMembersObj(member);
        return db('members').insert({ ...member, type: 'HOUSE' });
      }),
      ...senate.map(member => {
        member = getMembersObj(member);
        return db('members').insert({ ...member, type: 'SENATE' });
      })
    ]);
  },

  /*addHouseMembers(db, members) {
    return Promise.all([
      ...members.map(member => {
        member = getMembersObj(member);
        return db('members').insert({ ...member, type: 'HOUSE' });
      })
    ]);
  },

  addSenateMembers(db, members) {
    return Promise.all([
      ...members.map(member => {
        member = getMembersObj(member);
        return db('members').insert({ ...member, type: 'SENATE' });
      })
    ]);
  },*/
  // updateSenators(db, senators) {
  //   return Promise.all([
  //     db('senate').truncate(),
  //     ...senators.map(senator => {
  //       senator = getSenatorObj(senator);
  //       return db('senate').insert({ ...senator });
  //     })
  //   ]);
  // },

  // updateReps(db, reps) {
  //   return Promise.all([
  //     db('house').truncate(),
  //     ...reps.map(rep => {
  //       rep = getRepObj(rep);
  //       console.log(rep);
  //       return db('house').insert({ ...rep });
  //     })
  //   ]);
  // },

  updateBills(db, bills) {
    return Promise.all([
      db('bills').truncate(),
      ...bills.map(bill => {
        bill = getBillObj(bill);
        return db('bills').insert({ ...bill });
      })
    ]);
  },

  getAllMembers(db) {
    return db
      .select('*')
      .from('senate')
      .union([db.select('*').from('house')]);
  },

  getAllSenators(db) {
    return db.select('*').from('senate');
  },

  getAllReps(db) {
    return db.select('*').from('house');
  },

  getSenById(db, id) {
    return MembersService.getAllSenators(db)
      .where('id', id)
      .first();
  },

  getRepById(db, id) {
    return MembersService.getAllReps(db)
      .where('id', id)
      .first();
  },

  serializeMembers(members) {
    return members.map(this.serializeMember);
  },

  serializeMember(member) {
    const memberTree = new Treeize();
    const memberData = memberTree.grow([member]).getData()[0];

    return {
      id: memberData.id,
      title: memberData.title,
      first_name: memberData.first_name,
      middle_name: memberData.middle_name,
      last_name: memberData.last_name,
      suffix: memberData.suffix,
      date_of_birth: memberData.date_of_birth,
      party: memberData.party,
      leadership_role: memberData.leadership_role,
      twitter_account: memberData.twitter_account,
      facebook_account: memberData.facebook_account,
      youtube_account: memberData.youtube_account,
      govtrack_id: memberData.govtrack_id,
      url: memberData.url,
      in_office: memberData.in_office,
      seniority: memberData.seniority,
      next_election: memberData.next_election,
      total_votes: memberData.total_votes,
      missed_votes: memberData.total_votes,
      total_present: memberData.total_present,
      last_updated: memberData.last_updated,
      office: memberData.office,
      phone: memberData.phone,
      fax: memberData.fax,
      state: memberData.state,
      // senate_class: memberData.senate_class,
      // state_rank: memberData.state_rank,
      missed_votes_pct: memberData.missed_votes_pct,
      votes_with_party_pct: memberData.votes_with_party_pct
    };
  },

  serializeSenators(members) {
    return members.map(this.serializeSenator);
  },

  serializeSenator(member) {
    const memberTree = new Treeize();
    const memberData = memberTree.grow([member]).getData()[0];

    return {
      id: memberData.id,
      title: memberData.title,
      first_name: memberData.first_name,
      middle_name: memberData.middle_name,
      last_name: memberData.last_name,
      suffix: memberData.suffix,
      date_of_birth: memberData.date_of_birth,
      party: memberData.party,
      leadership_role: memberData.leadership_role,
      twitter_account: memberData.twitter_account,
      facebook_account: memberData.facebook_account,
      youtube_account: memberData.youtube_account,
      govtrack_id: memberData.govtrack_id,
      url: memberData.url,
      in_office: memberData.in_office,
      seniority: memberData.seniority,
      next_election: memberData.next_election,
      total_votes: memberData.total_votes,
      missed_votes: memberData.total_votes,
      total_present: memberData.total_present,
      last_updated: memberData.last_updated,
      office: memberData.office,
      phone: memberData.phone,
      fax: memberData.fax,
      state: memberData.state,
      senate_class: memberData.senate_class,
      state_rank: memberData.state_rank,
      missed_votes_pct: memberData.missed_votes_pct,
      votes_with_party_pct: memberData.votes_with_party_pct
    };
  },

  serializeReps(members) {
    return members.map(this.serializeRep);
  },

  serializeRep(member) {
    const memberTree = new Treeize();
    const memberData = memberTree.grow([member]).getData()[0];

    return {
      id: memberData.id,
      title: memberData.title,
      first_name: memberData.first_name,
      middle_name: memberData.middle_name,
      last_name: memberData.last_name,
      suffix: memberData.suffix,
      date_of_birth: memberData.date_of_birth,
      party: memberData.party,
      leadership_role: memberData.leadership_role,
      twitter_account: memberData.twitter_account,
      facebook_account: memberData.facebook_account,
      youtube_account: memberData.youtube_account,
      govtrack_id: memberData.govtrack_id,
      url: memberData.url,
      in_office: memberData.in_office,
      seniority: memberData.seniority,
      district: memberData.district,
      committees: memberData.committees,
      next_election: memberData.next_election,
      total_votes: memberData.total_votes,
      missed_votes: memberData.total_votes,
      total_present: memberData.total_present,
      last_updated: memberData.last_updated,
      office: memberData.office,
      phone: memberData.phone,
      fax: memberData.fax,
      state: memberData.state,
      missed_votes_pct: memberData.missed_votes_pct,
      votes_with_party_pct: memberData.votes_with_party_pct
    };
  }
};

module.exports = MembersService;

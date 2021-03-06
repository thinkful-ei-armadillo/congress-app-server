'use strict';
const Treeize = require('treeize');
const { getBillObj, getMembersObj } = require('../utils/extract');
const { PROPUBLICA_API, PROPUBLICA_APIKEY } = require('../config');
const requestPromise = require('request-promise');

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

  seedMembers(db) {
    Promise.all([
      requestPromise({
        method: 'GET',
        uri: `${PROPUBLICA_API}/116/senate/members.json`,
        json: true,
        headers: {
          'X-API-Key': PROPUBLICA_APIKEY
        },
        rejectUnauthorized: false
      })
        .then(data => {
          if (!data) {
            const message = 'No Data';
            console.error(message);
            return;
          }

          return data.results[0].members;
        })
        .catch(e => {
          console.log(e);
        }),
      requestPromise({
        method: 'GET',
        uri: `${PROPUBLICA_API}/116/house/members.json`,
        json: true,
        headers: {
          'X-API-Key': PROPUBLICA_APIKEY
        },
        rejectUnauthorized: false
      })
        .then(data => {
          if (!data) {
            const message = 'No Data';
            console.error(message);
            return;
          }
          return data.results[0].members;
        })
        .catch(e => {
          console.log(e);
        })
    ])
      .then(data => {
        MembersService.updateMembers(db, data[0], data[1]).then(result => {
          console.log('complete');
        });
      })
      .catch(e => {
        console.log(e);
      });
  },

  updateBills(db, bills) {
    return Promise.all([
      db('bills').truncate(),
      ...bills.map(bill => {
        bill = getBillObj(bill);
        return db('bills').insert({ ...bill });
      })
    ]);
  },

  searchMemberQuery(db, query) {
    return db
      .select('*')
      .from('members')
      .whereRaw(
        `lower(first_name) similar to '%(${query.join('|').toLowerCase()})%'`
      )
      .orWhereRaw(
        `lower(last_name) similar to '%(${query.join('|').toLowerCase()})%'`
      );
  },

  getAllMembers(db) {
    return db.select('*')
    .from('members')
  },
  getMembersByState(db, state) {
    return db
      .select('*')
      .from('members')
      .where('state', state);
  },

  getMemberByID(db, id) {
    return MembersService.getAllMembers(db)
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
      short_title: memberData.short_title,
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
      missed_votes_pct: memberData.missed_votes_pct,
      votes_with_party_pct: memberData.votes_with_party_pct
    };
  }
};

module.exports = MembersService;

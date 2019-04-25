'use strict';

const Top3sService = {
  getAllMembers(db) {
    return db.from('members').select('*');
  },
  getMemberMissedVotesPct(db) {
    return db.from('members').select('id', 'missed_votes_pct');
  }
};

module.exports = Top3sService;

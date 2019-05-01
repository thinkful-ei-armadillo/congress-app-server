'use strict';
const Treeize = require('treeize');
const { getCommitteeObj } = require('../utils/extract');

const CommitteesService = {
  updateCommittees(db, committees) {
    return Promise.all([
      db('committees').truncate(),
      ...committees.map(committee => {
        committee = getCommitteeObj(committee);
        return db('committees').insert({ ...committee });
      })
    ]);
  },

  getAllCommittees(db) {
    return db
      .from('committees AS committee')
      .select(
        'committee.committee_id',
        'committee.committee_name',
        'committee.committee_chamber',
        'committee.committee_url',
        'committee.committee_chair',
        'committee.committee_chair_id'
      )
  },

  serializeCommittees(committees) {
    return committees.map(this.serializeCommittee);
  },

  serializeCommittee(committee) {
    const committeeTree = new Treeize();
    const committeeData = committeeTree.grow([committee]).getData()[0];

    return {
      committee_id: committeeData.committee_id,
      committee_name: committeeData.committee_name,
      committee_chamber: committeeData.committee_chamber,
      committee_url: committeeData.committee_url,
      committee_chair: committeeData.committee_chair,
      committee_chair_id: committeeData.committee_chair_id,
    };
  }
};

module.exports = CommitteesService;

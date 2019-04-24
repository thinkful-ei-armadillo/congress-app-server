'use strict';
const Treeize = require('treeize');
const config = require('../config');
const { getSenatorObj, getRepObj } = require('../utils/extract');

const MembersService = {
  updateSenators(db, senators) {
    return Promise.all([
      db('senate').truncate(),
      ...senators.map(senator => {
        senator = getSenatorObj(senator);
        return db('senate').insert({ ...senator });
        // } else {
        //   return db('senate').insert({ senator });
        // }
      })
    ]);
  },

  updateReps(db, reps) {
    debugger;
    return Promise.all([
      db('house').truncate(),
      ...reps.map(rep => {
        rep = getRepObj(rep);
        console.log(rep);
        return db('house').insert({ ...rep });
      })
    ]);
  },

  serializeMembers(members) {
    return members.map(this.serializeMember);
  },
  serializeMember(member) {
    const memberTree = new Treeize();
    const memberData = memberTree.grow([member]).getData()[0];

    return {
      id: memberData.id,
      variety: memberData.variety,
      kcal: memberData.kcal,
      grade: memberData.grade,
      brand: memberData.brand_name,
      i1: memberData.i1,
      i2: memberData.i2,
      i3: memberData.i3,
      i4: memberData.i4,
      i5: memberData.i5,
      rating: memberData.rating
    };
  }
};

module.exports = MembersService;

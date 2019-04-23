'use strict';

const Treeize = require('treeize');
const config = require('../config');

const MembersService = {
  // updateSenators(db, senators) {
  //   await Promise.all([...senators.map(senator => {
  //     // check if senator already in senate? how

  //     //  if in senate, update, if not, insert
  //     return db('senate')
  //       .update({ ...senator });
  //     return db('senate')
  //       .insert({...senator});
  //   })]);
  // },
  // updateReps(db, reps) {
  //   await Promise.all([...reps.map(rep => {
  //     return db('house')
  //       .where('first_name', rep.first_name)
  //       .update(rep);
  //   })]);
  // },
  //   getAllSenators(db) {
  // https.get(`${config.PROPUBLICA_API}/113/senate/members.json`, res => {
  //   res.setEncoding("utf8");
  //   let body = "";
  //   res.on("data", data => {
  //     body += data;
  //   });
  //   res.on("end", () => {
  //     body = JSON.parse(body);
  //     console.log(body);
  //   });
  // });
  //

  //   getAllRepresentatives(db) {
  //
  //   return;
  // },

  serializeMembers(members) {
    return members.map(this.serializeMember);
  },
  serializeMember(food) {
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

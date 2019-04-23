const Treeize = require('treeize');

const MembersService = {
  getAllMembers(db) {
    return;
  },

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

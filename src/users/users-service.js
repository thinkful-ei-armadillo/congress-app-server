'use strict';
const xss = require('xss');
const bcrypt = require('bcryptjs');
const Treeize = require('treeize');

const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/;

const UsersService = {
  hasUserWithUserName(db, user_name) {
    return db('users')
      .where({ user_name })
      .first()
      .then(user => !!user);
  },
  insertUser(db, newUser) {
    return db
      .insert(newUser)
      .into('users')
      .returning('*')
      .then(([user]) => user);
  },
  validatePassword(password) {
    if (password.length < 8) {
      return 'Password be longer than 8 characters';
    }
    if (password.length > 72) {
      return 'Password be less than 72 characters';
    }
    if (password.startsWith(' ') || password.endsWith(' ')) {
      return 'Password must not start or end with empty spaces';
    }
    if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
      return 'Password must contain 1 upper case, lower case, number and special character';
    }
    return null;
  },
  hashPassword(password) {
    return bcrypt.hash(password, 12);
  },
  serializeUser(user) {
    return {
      id: user.id,
      full_name: xss(user.full_name),
      user_name: xss(user.user_name),
      date_created: user.date_created
    };
  },

  getFollowedMembers(db, id) {
    return db
      .select('*')
      .from('followers')
      .where('user_id', id)
      .innerJoin('members', 'member_id', '=', 'members.id');
  },

  getFollowedMembersId(db, id) {
    return db
      .select('member_id')
      .from('followers')
      .where('user_id', id);
  },

  addFollowedMember(db, user_id, member_id) {
    return db
      .insert({user_id, member_id})
      .into('followers')
      .returning('*');
  },

  removeFollowedMember(db, member_id) {
    return db
      .from('followers')
      .where('member_id', member_id)
      .delete();
  }
};

module.exports = UsersService;

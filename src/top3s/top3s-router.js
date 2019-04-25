'use strict';
const express = require('express');
const Top3sService = require('./top3s-service');

const top3sRouter = express.Router();

// 'api/top3s/' get members, then calc top 3 missed_votes_pct
top3sRouter.route('/').get(async (req, res, next) => {
	try {
		let membersMVP = [];
		membersMVP = await Top3sService.getAllMembers(req.app.get('db'));
		// sort descending by vote pct (integer)
		membersMVP.sort((a, b) => {
			if (parseInt(a.missed_votes_pct) > parseInt(b.missed_votes_pct)) {
				return -1;
			} else if (parseInt(a.missed_votes_pct) < parseInt(b.missed_votes_pct)) {
				return 1;
			} else {
				return 0;
			}
		});
		// return only top 3
		let top3MVP = membersMVP.slice(0, 3);
		res.status(200).send(top3MVP);
	} catch (e) {
		next(e);
	}
});
// eventually, api/top3s/ instead returns table of top3s (top3_name, id1, id2, id3) that top3 service will create whenever the members are updated

module.exports = top3sRouter;

'use strict';
const express = require('express');
const requestPromise = require('request-promise');
const MembersService = require('./members-service');
const { PROPUBLICA_API, PROPUBLICA_APIKEY } = require('../config');

const membersRouter = express.Router();

// api/members/senators
membersRouter.route('/senators').get((req, res, next) => {
	MembersService.getAllSenators(req.app.get('db'))
		.then(senators => {
			res.json(MembersService.serializeSenators(senators));
		})
		.catch(next);
});

// api/members/representatives
membersRouter.route('/representatives').get((req, res, next) => {
	MembersService.getAllReps(req.app.get('db')).then(representatives => {
		res.json(MembersService.serializeReps(representatives)).catch(next);
	});
});

membersRouter.route('/search').get((req, res, next) => {
	console.log('hello from search members route!');
	// MembersService.getAllSenators(req.app.get('db'))
	//   // .then(members => {
	//   //   res.json(MembersService.serializeMembers(members));
	//   // })
	//   .catch(next);
});

// seeding the members in db
membersRouter.route('/seedMembers').get(async (req, res, next) => {
	console.log('hello from seedMembers route!');
	try {
		await Promise.all([
			requestPromise({
				method: 'GET',
				uri: `${PROPUBLICA_API}/116/senate/members.json`,
				json: true,
				headers: {
					'X-API-Key': PROPUBLICA_APIKEY
				},
				rejectUnauthorized: false
			}).then(data => {
				if (!data) {
					const message = 'No Data';
					console.error(message);
					return res.status(404).send(message);
				}
				MembersService.updateMembers(
					req.app.get('db'),
					data.results[0].members
				).then(result => {
					console.log('completed');
				});
			}),
			requestPromise({
				method: 'GET',
				uri: `${PROPUBLICA_API}/116/house/members.json`,
				json: true,
				headers: {
					'X-API-Key': PROPUBLICA_APIKEY
				},
				rejectUnauthorized: false
			}).then(data => {
				if (!data) {
					const message = 'No Data';
					console.error(message);
					return res.status(404).send(message);
				}

				MembersService.updateMembers(
					req.app.get('db'),
					data.results[0].members
				).then(result => {
					console.log('completed');
				});
			})
		]).then(data => {
			return res.sendStatus(200);
		});
	} catch (e) {
		next(e);
	}
});

// seeding the bills in db
membersRouter.route('/seedBills').get(async (req, res, next) => {
	console.log('hello from seedBills route!');
	try {
		await Promise.all([
			requestPromise({
				method: 'GET',
				uri: `${PROPUBLICA_API}/116/house/bills/introduced.json`,
				json: true,
				headers: {
					'X-API-Key': PROPUBLICA_APIKEY
				},
				rejectUnauthorized: false
			}).then(data => {
				if (!data) {
					const message = 'No Data';
					console.error(message);
					return res.status(404).send(message);
				}

				MembersService.updateBills(
					req.app.get('db'),
					data.results[0].bills
				).then(result => {
					console.log('completed');
				});
			})
		]).then(data => {
			return res.sendStatus(200);
		});
	} catch (e) {
		next(e);
	}
});

module.exports = membersRouter;

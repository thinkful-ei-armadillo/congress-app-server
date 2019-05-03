'use strict';
const express = require('express');
const requestPromise = require('request-promise');
const MembersService = require('./members-service');
const url = require('url');
const {
	PROPUBLICA_API,
	PROPUBLICA_APIKEY,
	GOOGLE_CIVIC_INFO_API,
	GOOGLE_CIVIC_INFO_APIKEY
} = require('../config');

const membersRouter = express.Router();

// GET api/members/ with search compatability
membersRouter.route('/').get(async (req, res, next) => {
	let { query = null, address = null } = req.query;

	if (!query && !address) {
		await MembersService.getAllMembers(req.app.get('db'))
			.then(members => {
				res.json(MembersService.serializeMembers(members));
			})
			.catch(next);
	} else {
		try {
			if (query) {
				let members = await MembersService.getMembersByState(
					req.app.get('db'),
					query
				);
				res.json(await MembersService.serializeMembers(members));
			}

			if (address) {
				let data = await requestPromise({
					method: 'GET',
					uri: `${GOOGLE_CIVIC_INFO_API}?address=${address}&key=${GOOGLE_CIVIC_INFO_APIKEY}&levels=country&roles=legislatorUpperBody&roles=legislatorLowerBody`,
					headers: { Accept: 'application/json' }
				});
				if (!data) {
					const message = 'No Results for this Address, try again';
					console.error(message);
					return res.status(404).send(message);
				} else {
					data = JSON.parse(data);
					let districtKey = Object.keys(data.divisions)[1];
					let repDistrict = districtKey.split('/')[3].slice(-2);
					let repState = districtKey
						.split('/')[2]
						.slice(-2)
						.toUpperCase();

					let stateReps = await MembersService.getMembersByState(
						req.app.get('db'),
						repState
					);
					let localRepresentatives = stateReps.filter((item, index) => {
						if (item.district === repDistrict || item.short_title === 'Sen.') {
							return true;
						} else {
							return false;
						}
					});
					// at this point, localRepresentatives has the district specific rep and the state senators
					return res.status(200).send(localRepresentatives);
				}
			}
		} catch (e) {
			next(e);
		}
	}
});

membersRouter.route('/search').get((req, res, next) => {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;

	if (Object.keys(query).length > 0) {
		console.log(query.query);
		if (query.query === undefined) {
			query.query = '';
		}
		MembersService.searchMemberQuery(req.app.get('db'), query.query.split(' '))
			.then(members => {
				res.json(members);
			})
			.catch(next);
	} else {
		MembersService.getAllMembers(req.app.get('db'))
			.then(member => {
				res.json(member);
			})
			.catch(next);
	}
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

				return data.results[0].members;
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
				return data.results[0].members;
			})
		]).then(data => {
			MembersService.updateMembers(req.app.get('db'), data[0], data[1]).then(
				result => {
					res.sendStatus(200);
				}
			);
		});
	} catch (e) {
		next(e);
	}
});

membersRouter.route('/:id').get((req, res, next) => {
	try {
		const id = req.params.id;

		MembersService.getMemberByID(req.app.get('db'), id).then(member => {
			res.json(member);
		});
	} catch (e) {
		next(e);
	}
});

module.exports = membersRouter;

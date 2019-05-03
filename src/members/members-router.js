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
		MembersService.getAllMembers(req.app.get('db'))
			.then(members => {
				res.json(MembersService.serializeMembers(members));
			})
			.catch(next);
	} else {
		if (query) {
			MembersService.getMembersByState(req.app.get('db'), query)
				.then(members => {
					res.json(MembersService.serializeMembers(members));
				})
				.catch(next);
		}
		if (address) {
			requestPromise({
				method: 'GET',
				uri: `${GOOGLE_CIVIC_INFO_API}?address=${address}&key=${GOOGLE_CIVIC_INFO_APIKEY}&levels=country&roles=legislatorUpperBody&roles=legislatorLowerBody`,
				headers: { Accept: 'application/json' }
			})
				.then(data => {
					if (!data) {
						const message = 'No Results for this Address, try again';
						console.error(message);
						return res.status(404).send(message);
					} else {
						data = JSON.parse(data);
						let districtKey = Object.keys(data.divisions)[1];
						let repDistrict = districtKey.split('/')[3].slice(-2);
						let senState = districtKey.split('/')[2].slice(-2);

						// maybe just get members by state then filter that result?
						// await MembersService.getRepByDistrict(
						// 	req.app.get('db'),
						// 	repDistrict
						// )
						// await MembersService.getSenbyState(
						// 	req.app.get('db'), senState
						// )
					}
				})
				.then(data => {
					return res.sendStatus(200);
				});
			// request to civic information API with address
			// will need state and district from response
			// use returned district information to return house members matching district, and both state senator members
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

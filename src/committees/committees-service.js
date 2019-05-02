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

	async seedCommittees(db) {
		try {
			console.log('hello from seedCommittees');
			await Promise.all([
				requestPromise({
					method: 'GET',
					uri: `${PROPUBLICA_API}/116/senate/committees.json`,
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

					return data.results[0].committees;
				}),
				requestPromise({
					method: 'GET',
					uri: `${PROPUBLICA_API}/116/house/committees.json`,
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
					return data.results[0].committees;
				}),
				requestPromise({
					method: 'GET',
					uri: `${PROPUBLICA_API}/116/joint/committees.json`,
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
					return data.results[0].committees;
				})
			]).then(data => {
				CommitteesService.updateCommittees(req.app.get('db'), [
					...data[0],
					...data[1],
					...data[2]
				]).then(result => {
					res.sendStatus(200);
				});
			});
		} catch (e) {
			console.log(e)
		}
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
				'member.id as committee_chair_id',
				'member.short_title',
				'member.first_name',
				'member.last_name',
				'member.suffix',
				'member.party',
				'member.phone',
				'member.fax',
				'member.missed_votes_pct',
				'member.votes_with_party_pct'
			)
			.leftJoin('members AS member', 'committee_chair_id', 'member.id');
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
			member: {
				id: committeeData.committee_chair_id,
				short_title: committeeData.short_title,
				first_name: committeeData.first_name,
				last_name: committeeData.last_name,
				suffix: committeeData.suffix,
				party: committeeData.party,
				phone: committeeData.phone,
				fax: committeeData.fax,
				missed_votes_pct: committeeData.missed_votes_pct,
				votes_with_party_pct: committeeData.votes_with_party_pct
			}
		};
	}
};

module.exports = CommitteesService;

'use strict';
const Treeize = require('treeize');
const { getBillObj } = require('../utils/extract');

const BillsService = {
  updateBills(db, bills) {
    return Promise.all([
      db('bills').truncate(),
      ...bills.map(bill => {
        bill = getBillObj(bill);
        return db('bills').insert({ ...bill });
      })
    ]);
  },

  getAllBills(db) {
    return db
      .from('bills AS bill')
      .select(
        'bill.bill_id',
        'bill.bill_type',
        'bill.title',
        'bill.bill_uri',
        'bill.govtrack_url',
        'bill.introduced_date',
        'bill.primary_subject',
        'bill.latest_major_action',
        'bill.latest_major_action_date',
        'member.id as sponsor_id',
        'member.first_name',
        'member.last_name',
        'member.suffix',
        'member.party',
        'member.phone',
        'member.fax',
        'member.missed_votes_pct',
        'member.votes_with_party_pct'
      )
      .leftJoin('members AS member', 'bill.sponsor_id', 'member.id');
  },

  serializeBills(bills) {
    return bills.map(this.serializeBill);
  },

  serializeBill(bill) {
    const billTree = new Treeize();
    const billData = billTree.grow([bill]).getData()[0];

    return {
      bill_id: billData.bill_id,
      bill_type: billData.bill_type,
      bill_uri: billData.bill_uri,
      title: billData.title,
      member: {
        id: billData.sponsor_id,
        first_name: billData.first_name,
        last_name: billData.last_name,
        suffix: billData.suffix,
        party: billData.party,
        phone: billData.phone,
        fax: billData.fax,
        missed_votes_pct: billData.missed_votes_pct,
        votes_with_party_pct: billData.votes_with_party_pct
      },
      gpo_pdf_uri: billData.gpo_pdf_uri,
      congressdotgov_url: billData.congressdotgov_url,
      govtrack_url: billData.govtrack_url,
      introduced_date: billData.introduced_date,
      active: billData.active,
      house_passage: billData.house_passage,
      senate_passage: billData.senate_passage,
      enacted: billData.enacted,
      vetoed: billData.vetoed,
      cosponsors: billData.cosponsors,
      committees: billData.committees,
      committee_codes: billData.committee_codes,
      subcommittee_codes: billData.subcommittee_codes,
      primary_subject: billData.primary_subject,
      summary: billData.summary,
      summary_short: billData.summary_short,
      latest_major_action_date: billData.latest_major_action_date,
      latest_major_action: billData.latest_major_action
    };
  }
};

module.exports = BillsService;

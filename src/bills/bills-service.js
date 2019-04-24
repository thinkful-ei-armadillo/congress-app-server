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
    ])
  },

  getAllBills(db) {
      return db
        .select('*')
        .from('bills')
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
      number: billData.number,
      bill_uri: billData.bill_uri,
      title: billData.title,
      sponsor_id: billData.sponsor_id,
      sponsor_name: billData.sponsor_name,
      sponsor_state: billData.sponsor_state,
      sponsor_uri: billData.sponsor_uri,
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
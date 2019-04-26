'use strict';

const getMembersObj = obj => {
  const {
    id,
    title,
    short_title,
    first_name,
    middle_name,
    last_name,
    suffix,
    date_of_birth,
    party,
    leadership_role,
    twitter_account,
    facebook_account,
    youtube_account,
    govtrack_id,
    url,
    in_office,
    seniority,
    district,
    committees,
    next_election,
    total_votes,
    missed_votes,
    total_present,
    last_updated,
    office,
    phone,
    fax,
    state,
    senate_class,
    state_rank,
    missed_votes_pct,
    votes_with_party_pct
  } = obj;
  return {
    id,
    title,
    short_title,
    first_name,
    middle_name,
    last_name,
    suffix,
    date_of_birth,
    party,
    leadership_role,
    twitter_account,
    facebook_account,
    youtube_account,
    govtrack_id,
    url,
    in_office,
    seniority,
    district,
    committees,
    next_election,
    total_votes,
    missed_votes,
    total_present,
    last_updated,
    office,
    phone,
    fax,
    state,
    senate_class,
    state_rank,
    missed_votes_pct,
    votes_with_party_pct
  };
};

const getSenatorObj = obj => {
  const {
    id,
    title,
    first_name,
    middle_name,
    last_name,
    suffix,
    date_of_birth,
    party,
    leadership_role,
    twitter_account,
    facebook_account,
    youtube_account,
    govtrack_id,
    url,
    in_office,
    seniority,
    next_election,
    total_votes,
    missed_votes,
    total_present,
    last_updated,
    office,
    phone,
    fax,
    state,
    senate_class,
    state_rank,
    missed_votes_pct,
    votes_with_party_pct
  } = obj;

  return {
    id,
    title,
    first_name,
    middle_name,
    last_name,
    suffix,
    date_of_birth,
    party,
    leadership_role,
    twitter_account,
    facebook_account,
    youtube_account,
    govtrack_id,
    url,
    in_office,
    seniority,
    next_election,
    total_votes,
    missed_votes,
    total_present,
    last_updated,
    office,
    phone,
    fax,
    state,
    senate_class,
    state_rank,
    missed_votes_pct,
    votes_with_party_pct
  };
};

const getRepObj = obj => {
  const {
    member_id,
    title,
    first_name,
    middle_name,
    last_name,
    suffix,
    date_of_birth,
    party,
    leadership_role,
    twitter_account,
    facebook_account,
    youtube_account,
    govtrack_id,
    url,
    in_office,
    seniority,
    district,
    committees,
    next_election,
    total_votes,
    missed_votes,
    total_present,
    last_updated,
    office,
    phone,
    fax,
    state,
    senate_class,
    state_rank,
    missed_votes_pct,
    votes_with_party_pct
  } = obj;
  return {
    member_id,
    title,
    first_name,
    middle_name,
    last_name,
    suffix,
    date_of_birth,
    party,
    leadership_role,
    twitter_account,
    facebook_account,
    youtube_account,
    govtrack_id,
    url,
    in_office,
    seniority,
    district,
    committees,
    next_election,
    total_votes,
    missed_votes,
    total_present,
    last_updated,
    office,
    phone,
    fax,
    state,
    senate_class,
    state_rank,
    missed_votes_pct,
    votes_with_party_pct
  };
};

const getBillObj = obj => {
  const {
    bill_id,
    bill_type,
    number,
    bill_uri,
    title,
    sponsor_id,
    sponsor_name,
    sponsor_state,
    sponsor_uri,
    gpo_pdf_uri,
    congressdotgov_url,
    govtrack_url,
    introduced_date,
    active,
    house_passage,
    senate_passage,
    enacted,
    vetoed,
    cosponsors,
    committees,
    committee_codes,
    subcommittee_codes,
    primary_subject,
    summary,
    summary_short,
    latest_major_action_date,
    latest_major_action
  } = obj;
  return {
    bill_id,
    bill_type,
    number,
    bill_uri,
    title,
    sponsor_id,
    sponsor_name,
    sponsor_state,
    sponsor_uri,
    gpo_pdf_uri,
    congressdotgov_url,
    govtrack_url,
    introduced_date,
    active,
    house_passage,
    senate_passage,
    enacted,
    vetoed,
    cosponsors,
    committees,
    committee_codes,
    subcommittee_codes,
    primary_subject,
    summary,
    summary_short,
    latest_major_action_date,
    latest_major_action
  };
};

module.exports = { getSenatorObj, getRepObj, getBillObj, getMembersObj };

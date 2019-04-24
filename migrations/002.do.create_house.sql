CREATE TABLE IF NOT EXISTS house (
  member_id TEXT,
  title TEXT,
  first_name TEXT,
  middle_name TEXT,
  last_name TEXT,
  suffix TEXT,
  date_of_birth TEXT,
  part TEXT,
  leadership_role TEXT,
  twitter_account TEXT,
  facebook_account TEXT,
  youtube_account TEXT,
  govtrack_id INTEGER,
  url TEXT,
  in_office BOOLEAN,
  seniority INTEGER,
  district TEXT,
  committees TEXT,
  next_election INTEGER,
  total_votes INTEGER,
  missed_votes INTEGER,
  total_present INTEGER, -- 'present' votes rather than yea or nay
  last_updated TEXT,
  office TEXT,
  phone TEXT,
  fax TEXT,
  state TEXT,
  senate_class INTEGER,
  state_rank TEXT,
  missed_votes_pct NUMERIC,
  votes_with_party_pct NUMERIC
);
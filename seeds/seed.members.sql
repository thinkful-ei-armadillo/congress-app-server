-- psql -d congress -f ./seeds/seed.members.sql

BEGIN;

INSERT INTO members (
  id,
  title,
  first_name,
  middle_name,
  last_name,
  suffix,
  date_of_birth,
  part,
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
)
VALUES
(
  "A000360",
  "Senator, 2nd Class",
  "Lamar",
  "null",
  "Alexander",
  "null",
  "1940-07-03",
  "R",
  "null",
  "SenAlexander",
  "senatorlamaralexander",
  "lamaralexander",
  300002,
  "https://www.alexander.senate.gov/public",
  true,
  15,
  2020,
  444,
  20,
  0,
  "2018-06-08 09:17:29 -0400",
  "455 Dirksen Senate Office Building",
  "202-224-4944",
  "202-228-3398",
  "TN",
  2,
  "senior",
  4.50,
  97.88
);

COMMIT;
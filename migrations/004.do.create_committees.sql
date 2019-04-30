CREATE TABLE IF NOT EXISTS committees (
  committee_id SERIAL PRIMARY KEY,
  committee_name TEXT,
  committee_chamber TEXT,
  committee_url TEXT,
  committee_chair TEXT,
  committee_chair_id TEXT
);

ALTER TABLE members
ADD COLUMN
    committee_chaired INTEGER REFERENCES committees(committee_id)
    ON DELETE SET NULL;
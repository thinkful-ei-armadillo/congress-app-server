ALTER TABLE members
  DROP COLUMN IF EXISTS committee_chaired;

DROP TABLE IF EXISTS committees;
-- psql -d congress -f ./seeds/truncate.members.sql
-- psql -d congress-test -f ./seeds/truncate.members.sql

-- OWEN psql -d congress -U dev -f ./seeds/truncate.members.sql
TRUNCATE "senate", "house";
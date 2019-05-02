-- SECIL psql -U secilreel -d congress -f ./seeds/seed.followers.sql
BEGIN;

TRUNCATE "followers";

INSERT INTO "followers" (
  "user_id",
  "member_id"
)
VALUES
  (1,'A000374'),
  (1, 'B001291');

COMMIT;
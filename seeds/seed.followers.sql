-- SECIL psql -U secilreel -d congress -f ./seeds/seed.followers.sql
BEGIN;

TRUNCATE "followers";

INSERT INTO "followers" (
  "user_id",
  "member_id"
)
VALUES
  (3,'A000374'),
  (3, 'B001291');

COMMIT;
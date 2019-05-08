-- CREATE TABLE IF NOT EXISTS followers (
--   user_id INTEGER,
--   member_id TEXT
-- );
-- INSERT INTO followers (user_id, member_id)  VALUES (1, 'R000515') (1, 'G000583');

CREATE TABLE IF NOT EXISTS followers (
  user_id INTEGER
    REFERENCES users(id) ON DELETE SET NULL,
  member_id TEXT
    REFERENCES members(id) ON DELETE CASCADE
);
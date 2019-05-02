CREATE TABLE IF NOT EXISTS followers (
  user_id INTEGER 
    REFERENCES users(id) ON DELETE SET NULL,
  member_id TEXT 
    REFERENCES members(id) ON DELETE CASCADE
);
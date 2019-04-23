module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DB_URL: process.env.DATABASE_URL || 'postgresql://pfm@localhost/pet-food',
  JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret',
  JWT_EXPIRY: process.env.JWT_EXPIRY || '3h',
  PROPUBLICA_API:
		process.env.PROPUBURL || 'https://api.propublica.org/congress/v1',
  PROPUBLICA_APIKEY: process.env.PROPUBLICA_APIKEY
};

require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DB_URL: process.env.DATABASE_URL,
  TEST_DB_URL: process.env.TEST_DB_URL,
  TEST_DB_URL_DOS: process.env.TEST_DB_URL_DOS,
  JWT_SECRET: process.env.JWT_SECRET || 'i-like-lemons',
  JWT_EXPIRY: process.env.JWT_EXPIRY || '3h',
  PROPUBLICA_API:
		process.env.PROPUBURL || 'https://api.propublica.org/congress/v1',
  PROPUBLICA_APIKEY: process.env.PROPUBLICA_APIKEY,
  GOOGLE_CIVIC_INFO_API:
		process.env.GOOGLE_CIVIC_INFO_API ||
		'https://www.googleapis.com/civicinfo/v2/representatives',
  GOOGLE_CIVIC_INFO_APIKEY: process.env.GOOGLE_CIVIC_INFO_APIKEY
};

-- psql -U pfm -d pet-food -f ./seeds/truncate.pet-food.sql

TRUNCATE
  ratings,
  ingredients,
  brands,
  users,
  foods
  RESTART IDENTITY CASCADE;
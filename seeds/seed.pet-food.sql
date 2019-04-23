-- psql -U pfm -d pet-food -f ./seeds/seed.pet-food.sql
-- psql -U pfm -d pet-food -f ./seeds/truncate.pet-food.sql

BEGIN;

INSERT INTO brands (company)
VALUES
('Royal Canin'),
('Purina Pro Plan'),
('Weruva');

INSERT INTO ingredients (name, description, impact)
VALUES
('cow', 'a cow', 7),
('pig', 'a pig', 6),
('chicken', 'a chicken', 2),
('turkey', 'a turkey', 3),
('monosodium phosphate', 'a cow', 2),
('biotin', 'desciption', 7),
('copper sulfate', 'deskiptio', 2),
('copper proteinate', 'descripto', 2),
('L-ascorbyl-2-polyphosphate ', 'source of vitamin C', 2),
('mixed tocopherols', 'preservative', 2);

INSERT INTO foods (variety, kcal, grade, rating, i1, i2, i3, i4, i5, brand)
VALUES
('Protein Selective Dry Cat Food', 130, 'C', 1, 1, 2, 3, 4, 5, 1),
('Intense Beauty Thin Slices in Gravy Canned Cat Food', 110, 'S', 2, 6, 7, 8, 9, 10, 2),
('chicken', 120, 'A', 3, 2, 4, 6, 8, 10, 3),
('turkey', 115, 'A', -4, 1, 3, 5, 7, 9, 1);

INSERT INTO users (user_name, full_name, nickname, password)
VALUES
('guy123', 'Guy-Manuel de Homem-Cristo', 'goldguy', '$2y$12$Dv1ZTKh3pzW1QCjssNOMmuwjBClUiFbycwOwD73fx4RHAMn.4hx56'),
('guy456', 'Garrett Douglas', 'someguy', '$2y$12$Dv1ZTKh3pzW1QCjssNOMmuwjBClUiFbycwOwD73fx4RHAMn.4hx56'),
('guy789', 'Baker Mayfield', 'ourguy', '$2y$12$Dv1ZTKh3pzW1QCjssNOMmuwjBClUiFbycwOwD73fx4RHAMn.4hx56');

INSERT INTO ratings (rating, userId, foodId)
VALUES
(1, 1, 1),
(1, 1, 2),
(-1, 1, 3),
(-1, 1, 4),
(-1, 2, 1),
(-1, 2, 2),
(1, 2, 3),
(-1, 2, 4),
(-1, 3, 1),
(-1, 3, 2),
(1, 3, 3),
(1, 3, 4);

COMMIT;

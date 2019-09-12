CREATE DATABASE game_library;
\connect game_library

BEGIN;

-- Country: store a list of countries and their associated ids
CREATE TABLE country (
  id    SERIAL PRIMARY KEY,
  name  VARCHAR(100) NOT NULL
);

-- Collection: store a library of game titles
CREATE TABLE collection (
  id                SERIAL PRIMARY KEY,
  name              VARCHAR(100) NOT NULL,
  alternate_name    VARCHAR(100) NULL,
  description       TEXT NULL,
  publisher         VARCHAR(100) NULL,
  year              INTEGER NOT NULL,
  country           INTEGER REFERENCES country(id),
  created_date      DATE NOT NULL DEFAULT NOW(),
  image             TEXT
);

-- Create a unique index with name/year on the collection table
CREATE UNIQUE INDEX name_year_unique_idx on collection (LOWER(name), year);

COMMIT;

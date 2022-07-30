
CREATE TABLE questions (
	question_id integer NOT NULL PRIMARY KEY,
  product_id integer REFERENCES products (id),
  question_body TEXT NOT NULL,
  date bigint,
  asker_name TEXT NOT NULL,
  asker_email TEXT NOT NULL,
  reported BOOLEAN NOT NULL,
  helpful integer NOT NULL
);

CREATE TABLE products (
  id integer NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  slogan TEXT NOT NULL,
  description TEXT NOT NULL,
  catagory TEXT NOT NULL,
  price NUMERIC

);

CREATE TABLE answers (
  answer_id integer PRIMARY KEY,
  question_id integer NOT NULL REFERENCES questions (question_id),
  answer_body TEXT,
  date bigint,
  answerer_name TEXT NOT NULL,
  answerer_email TEXT NOT NULL,
  reported BOOLEAN NOT NULL,
  helpful integer NOT NULL
);

CREATE TABLE photos (
  photo_id integer PRIMARY KEY,
  answer_id integer REFERENCES answers (answer_id),
  url TEXT NOT NULL
);
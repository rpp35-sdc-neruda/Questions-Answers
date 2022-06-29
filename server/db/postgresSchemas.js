
CREATE TABLE [IF NOT EXISTS] questions (
	question_id SERIAL PRIMARY KEY
  question_body VARCHAR(1000) NOT NULL,
  question_date TIMESTAMP,
  asker_name VARCHAR(50) NOT NULL,
  question_helpfulness INT NOT NULL,
  reported BOOLEAN NOT NULL,
  answerIds integer[]
);

CREATE TABLE [IF NOT EXISTS] products (
  product_id SERIAL PRIMARY KEY,
  product TEXT NOT NULL,
  questionIds integer[]
);

CREATE TABLE [IF NOT EXISTS] answers (
  answer_id SERIAL PRIMARY KEY,
  answer_body VARCHAR(1000) NOT NULL,
  answerer_name VARCHAR(50) NOT NULL,
  answer_date TIMESTAMP,
  answer_helpfulness INT NOT NULL,
  photoIds integer[]
);

CREATE TABLE [IF NOT EXISTS] photos (
  photo_id SERIAL PRIMARY KEY,
  url TEXT NOT NULL
);
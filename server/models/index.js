const db = require('../db');
module.exports = {
  questions: {
    get: function (params, cb) {
      let queuryString = `select q.question_id,
      q.question_body,
      q.date as question_date,
      q.asker_name,
      q.helpful AS question_helpfulness,
      q.reported,
      a.answer_id,
      a.date AS answer_date,
      a.answer_body,
      a.helpful AS helpfulness,
      a.answerer_name,
      ph.url
      FROM questions q
      left JOIN answers a
      ON q.question_id = a.question_id
      left JOIN photos ph
      ON a.answer_id = ph.answer_id
      WHERE product_id = $1
      ORDER BY question_id ASC;`
      ;
      db.query(queuryString, params, (err, results) => {
        cb(err, results)
      })
    },
    post: function (params, cb) {
      var queuryString = `INSERT INTO questions
      (question_id, product_id, question_body, date, asker_name, asker_email, reported, helpful)
      VALUES((select count(*) from questions) + 1, $1, $2, $3, $4, $5, false, 0) ;`;
      db.query(queuryString, params, (err, results) => {
        cb(err, results);
      })
    },
    helpful: function (question_id, cb) {
      var queuryString = `UPDATE questions
      SET helpful = helpful + 1
      WHERE question_id = $1`;
      db.query(queuryString, [question_id], (err, results) => {
        cb(err, results)
      })
    },
    report: function (question_id, cb) {
      var queuryString = `UPDATE questions
      SET reported = true
      WHERE question_id = $1`;
      db.query(queuryString, [question_id], (err, results) => {
        cb(err, results)
      })
    }
  },
  answers: {
    get: function (params, cb) {
      var queuryString = `select a.answer_id,
      a.answer_body as body,
      a. date,
      a.answerer_name,
      a.helpful as helpfulness,
      ph.photo_id,
      ph.url
      From answers a
      Left JOIN photos ph
      ON a.answer_id = ph.answer_id
      WHERE question_id = $1
      order by answer_id ASC;`;
      db.query(queuryString, params, (err, results) => {
        //console.log('testing when there is no matching answers for given question Id ', err)
        cb(err, results)
      })
    },
    post: function (params, cb) {
      var queuryString = `WITH addAnswer AS (
        INSERT INTO answers (answer_id, question_id, answer_body, date, answerer_name, answerer_email, reported, helpful)
        VALUES((select count(*) from answers) + 1, $1, $2, $3, $4, $5, false, 0)
        RETURNING answer_id
        )
        INSERT INTO photos(answer_id, url)
        VALUES((select answer_id from addAnswer), unnest($6 ::text[]));`
      db.query(queuryString, params, (err, results) => {
        cb(err, results);
      })
    },
    helpful: function (answer_id, cb) {
      var queuryString = `UPDATE answers
      SET helpful = helpful + 1
      WHERE answer_id = $1`;
      db.query(queuryString, [answer_id], (err, results) => {
        cb(err, results)
      })
    },
    report: function (answer_id, cb) {
      var queuryString = `UPDATE answers
      SET reported = true
      WHERE answer_id = $1`;
      db.query(queuryString, [answer_id], (err, results) => {
        cb(err, results)
      })
    }
  }
};
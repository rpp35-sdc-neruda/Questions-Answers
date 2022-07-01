const db = require('../db');
module.exports = {
  questions: {
    get: function (product_id, cb) {
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
      WHERE product_id = 1
      ORDER BY question_id ASC;`;
      db.query(queuryString, product_id, (err, results) => {
        console.log(results);
        cb(err, results)
      })
    },
    post: function (params, cb) {
      var queuryString = '';
      db.query(queuryString, params, (err, results) => {
        cb(err, results);
      })
    },
    useful: function (cb) {
      var queuryString = '';
      db.query(queuryString, (err, results) => {
        cb(err, results)
      })
    },
    report: function (cb) {
      var queuryString = '';
      db.query(queuryString, (err, results) => {
        cb(err, results)
      })
    }
  },
  answers: {
    get: function (cb) {
      var queuryString = '';
      db.query(queuryString, (err, results) => {
        cb(err, results)
      })
    },
    post: function (params, cb) {
      var queuryString = '';
      db.query(queuryString, params, (err, results) => {
        cb(err, results);
      })
    },
    useful: function (cb) {
      var queuryString = '';
      db.query(queuryString, (err, results) => {
        cb(err, results)
      })
    },
    report: function (cb) {
      var queuryString = '';
      db.query(queuryString, (err, results) => {
        cb(err, results)
      })
    }
  }
};
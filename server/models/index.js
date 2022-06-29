const db = require('../db');
module.exports = {
  questions: {
    get: function (product_id, cb) {
      let queuryString = '';
      db.query(queuryString, product_id, (err, results) => {
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
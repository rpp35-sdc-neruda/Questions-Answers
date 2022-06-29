var models = require('../models')
module.exports = {
  questions: {
    get: function (req, res) {
      let product_id = req.query.product_id;
      models.questions.get(product_id, (err, results) => {
        if(err) {throw err;}
        let response = {
          "product_id": product_id,
          "results": results;
        }
        res.json(response);
      });
    },
    post: function(req, res) {
        var params = [];
        models.questions.post(params, (err, results) => {
          if(err) {throw err;}
          res.status(201).end();
        })
      },
    helpful: function(req, res) {
      models.questions.helpful((req, res) => {
        if(err) {throw err;}
          res.status(204).end();
      })
    },
    report: function(req, res) {
      models.questions.report((req, res) => {
        if(err) {throw err;}
          res.status(204).end();
      })
    }
  },
  answers: {
    get: function(req, res) {
      models.answers.get((err, results) => {
        if(err) {throw err;}
        res.json(results)
      });
    },
    post: function(req, res) {
      models.answers.post((err, results) => {
        var params = [];
        models.answers.post(params, (err, results) => {
          if(err) {throw err;}
          res.status(201).end();
        })
      })
    },
    helpful: function(req, res) {
      models.answers.helpful((req, res) => {
        if(err) {throw err;}
          res.status(204).end();
      })
    },
    report: function(req, res) {
      models.answers.report((req, res) => {
        if(err) {throw err;}
          res.status(204).end();
      })
    }
  }
}
var models = require('../models')
module.exports = {
  questions: {
    get: function (req, res) {
      let product_id = req.query.product_id;
      models.questions.get(product_id, (err, results) => {
        if (err) { throw err; }
        let response = {
          "product_id": "1",
          "results": []
        }
        let foundProduct_id = false;
        //for each row of the results
        for (let i = 0; i < results.rows.length; i++) {
          let row = results.rows[i];
          let foundProduct_id = false;
          //check the response.result array
          for (let j = 0; j < response.results.length; j++) {
            let question = response.results[j];
            //if this row is for an existing question_id
            if (question.question_id === row.question_id) {
              //if this row for an existing answer_id
              foundProduct_id = true;
              if (Object.keys(question.answers).includes(row.answer_id.toString())) {
                //add photo url to response.results
                question.answers[row.answer_id.toString()].photos.push(row.url)
              //if this row is an new answer
              } else {
                question.answers[row.answer_id.toString()] = {
                  id: row.answer_id,
                  body: row.answer_body,
                  date: row.answer_date,
                  answerer_name: row.answerer_name,
                  helpfulness: row.helpfulness,
                  photos: (row.url ? [row.url] : [])
                }
              }
              break;
            }
          }
          let newQuestion = {
            question_id: row.question_id,
            question_body: row.question_body,
            question_date: row.question_date,
            asker_name: row.asker_name,
            question_helpfulness: row.question_helpfulness,
            reported: row.reported,
            answers: {}
          }
          newQuestion.answers[row.answer_id] = {
            id: row.answer_id,
            body: row.answer_body,
            date: row.answer_date,
            answerer_name: row.answerer_name,
            helpfulness: row.helpfulness,
            photos: (row.url ? [row.url] : [])
          }
          if(!foundProduct_id) {response.results.push(newQuestion)};

        }
        console.log(response);
          res.json(response);
      })},
    post: function (req, res) {
      var params = [];
      models.questions.post(params, (err, results) => {
        if (err) { throw err; }
        res.status(201).end();
      })
    },
    helpful: function (req, res) {
      models.questions.helpful((req, res) => {
        if (err) { throw err; }
        res.status(204).end();
      })
    },
    report: function (req, res) {
      models.questions.report((req, res) => {
        if (err) { throw err; }
        res.status(204).end();
      })
    }
  },
  answers: {
    get: function (req, res) {
      models.answers.get((err, results) => {
        if (err) { throw err; }
        res.json(results)
      });
    },
    post: function (req, res) {
      models.answers.post((err, results) => {
        var params = [];
        models.answers.post(params, (err, results) => {
          if (err) { throw err; }
          res.status(201).end();
        })
      })
    },
    helpful: function (req, res) {
      models.answers.helpful((req, res) => {
        if (err) { throw err; }
        res.status(204).end();
      })
    },
    report: function (req, res) {
      models.answers.report((req, res) => {
        if (err) { throw err; }
        res.status(204).end();
      })
    }
  }
}
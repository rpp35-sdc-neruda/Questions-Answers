var models = require('../models')
module.exports = {
  questions: {
    get: function (req, res) {
      let product_id = req.query.product_id;
      models.questions.get(product_id, (err, results) => {
        if (err) { throw err; }
        let response = {
          "product_id": product_id,
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
                //if this row is an new answer of the same question, add ti answers array
              } else {
                question.answers[row.answer_id.toString()] = {
                  id: row.answer_id,
                  body: row.answer_body,
                  date: (new Date(parseInt(row.answer_date))).toISOString(),
                  answerer_name: row.answerer_name,
                  helpfulness: row.helpfulness,
                  photos: (row.url ? [row.url] : [])
                }
              }
              break;
            }
          }
          //create a new question object
          let newQuestion = {
            question_id: row.question_id,
            question_body: row.question_body,
            question_date: (new Date(parseInt(row.question_date))).toISOString(),
            asker_name: row.asker_name,
            question_helpfulness: row.question_helpfulness,
            reported: row.reported,
            answers: {}
          }
          if (row.answer_id) {
            newQuestion.answers[row.answer_id] = {
              id: row.answer_id,
              body: row.answer_body,
              date: (new Date(parseInt(row.answer_date))).toISOString(),
              answerer_name: row.answerer_name,
              helpfulness: row.helpfulness,
              photos: row.url ? [row.url] : []
            }
          }

          // if the question_id is not found in the response, add the new question object to response
          if (!foundProduct_id) { response.results.push(newQuestion) };

        }
        res.json(response);
      })
    },
    post: function (req, res) {
      var params = [req.body.question.product_id, req.body.question.body, Math.floor(Date.now()), req.body.question.name, req.body.question.email];
      //let params = [1, 'haha', Math.floor(Date.now()), "alex", "alex.gmail.com"];
      models.questions.post(params, (err, results) => {
        if (err) { throw err; }
        res.status(201).end();
      })
    },
    helpful: function (req, res) {
      models.questions.helpful(req.query.question_id, (err, results) => {
        if (err) { throw err; }
        res.status(204).end();
      })
    },
    report: function (req, res) {
      models.questions.report(req.query.question_id, (err, results) => {
        if (err) { throw err; }
        res.status(204).end();
      })
    }
  },
  answers: {
    get: function (req, res) {
      let question_id = req.query.question_id
      models.answers.get(question_id, (err, results) => {
        if (err) { throw err; }
        let response = {
          question: "1",
          page: 0,
          count: 5,
          results: []
        }
        for (let i = 0; i < results.rows.length; i++) {
          let row = results.rows[i];
          let foundAnswer_id = false;
          for (let j = 0; j < response.results.length; j++) {
            let answer = response.results[j];
            if (row.answer_id === answer.answer_id) {
              foundAnswer_id = true;
              answer.photos.push({
                id: row.photo_id,
                url: row.url
              })
              break;
            }
          }
          let newAnwer = {
            answer_id: row.answer_id,
            body: row.body,
            date: (new Date(ParseInt(row.date))).toISOString(),
            answerer_name: row.answerer_name,
            helpfulness: row.helpfulness,
            photos: row.photo_id ? [{ id: row.photo_id, url: row.url }] : []
          }

          if (!foundAnswer_id) {
            response.results.push(newAnwer);
          }
        }
        res.json(response);
      });
    },
    post: function (req, res) {
      let question_id = req.query.question_id;
      let params = [question_id, req.body.answer.body, Math.floor(Date.now()), req.body.answer.name, req.body.answer.email, req.body.answer.photos];
      models.answers.post(params, (err, results) => {
        if (err) { throw err; }
        res.status(201).end();
      })
    },
    helpful: function (req, res) {
      models.answers.helpful(req.query.answer_id, (err, results) => {
        if (err) { throw err; }
        res.status(204).end();
      })
    },
    report: function (req, res) {
      models.answers.report(req.query.answer_id, (err, results) => {
        if (err) { throw err; }
        res.status(204).end();
      })
    }
  }
}
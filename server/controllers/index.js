var models = require('../models')
const redisClient = require('./redisConnect.js')

module.exports = {
  questions: {
    get: async function (req, res) {
      if (isNaN(req.query.product_id)) {
        res.status(400).end()
        return;
      }
      let product_id = req.query.product_id.toString();
      console.log(product_id);
      params = [req.query.product_id]
      let response = {
        "product_id": req.query.product_id,
        "results": []
      }
       //redisClient to check if there is cached value in the redis
      const getOrSetCache = new Promise(async (resolve, reject) => {
        console.log('in the new Promise')
        let data = await redisClient.get(`questions?product_id${product_id}`);
        //if the key 'questions?product_id${product_id}' is cached, return the corresponding value
        if (data !== null) {
          //console.log('hit cache')
          resolve(JSON.parse(data))

        } else {
          //if not cached, query database
          //console.log('cache Miss')
          models.questions.get(params, (err, results) => {
            if (err) console.log(err)
           // console.log('Miss Cache')
            shapeResponse(err, results);
            //set the key and corresponding value in redis
            redisClient.set(`questions?product_id${product_id}`, JSON.stringify(response));
            resolve(response);
          })
        }
      });
      //get value from database or from cache, and send to client
      getOrSetCache
        .then((response) => {
          res.json(response);
        })

      function shapeResponse(err, results) {
        if (err) { throw err; }
        console.log('shaping response')
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
        //paginate the response to send the correct count and page
        let page = req.query.page || 1;
        let count = req.query.count || 5;
        let questionsBeforePagenating = response.results;
        let startingIndex = (page - 1) * count;
        let endingIndex = count * page;
        let questionsAfterPagenation = questionsBeforePagenating.slice(startingIndex, endingIndex);
        //replace with the correct portion of response.results
        response.results = questionsAfterPagenation;
        //store the key product_id and response to the redis
        // console.log('response in shape function', response)
      }
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
      let question_id = req.query.question_id;
      let params = [req.query.question_id]
      let page = Number(req.query.page) || 1;
      let count = Number(req.query.count) || 5;
      let response = {
        question: req.query.question_id,
        page: page,
        count: count,
        results: []
      }
      const getOrSetCache = new Promise(async (resolve, reject) => {
        console.log('in the new Promise')
        let data = await redisClient.get(`answers?question_id${question_id}`);
        //console.log(redisClient);
        if (data !== null) {
          //console.log('hit cache')
          resolve(JSON.parse(data))
        } else {
          //console.log('cache Miss')
          models.answers.get(params, (err, results) => {
            if (err) console.log(err)
            //console.log('Miss Cache')
            shapeResponse(err, results);
            redisClient.set(`answers?question_id${question_id}`, JSON.stringify(response));
            resolve(response);
          })
        }
      });
      getOrSetCache
        .then((response) => {
          res.json(response);
        })

      function shapeResponse(err, results) {
        if (err) { throw err; }


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
            date: (new Date(parseInt(row.date))).toISOString(),
            answerer_name: row.answerer_name,
            helpfulness: row.helpfulness,
            photos: row.photo_id ? [{ id: row.photo_id, url: row.url }] : []
          }

          if (!foundAnswer_id) {
            response.results.push(newAnwer);
          }
        }
        //paginate the response to send the correct count and page

        let questionsBeforePagenating = response.results;
        let startingIndex = (page - 1) * count;
        let endingIndex = count * page;
        let questionsAfterPagenation = questionsBeforePagenating.slice(startingIndex, endingIndex);
        //replace with the correct portion of response.results
        response.results = questionsAfterPagenation;
      };
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
  },

}
function getOrSetCache(key, cb) {
  console.log('hello in the getOrSetCache');
  return new Promise((resolve, reject) => {
    redisClient.get(key, async (error, data) => {
      if (error) return reject(error)
      if (data !== null) return resolve(JSON.parse(data))
      const freshData = await cb();
      redisClient.set(key, JOSN.stringify(freshData))
      resolve(freshData)
    })
  })
}

const router = require('express').Router();
const controller = require('./controllers');


//Retrieves a list of questions for a particular product
router.get('',  controller.questions.get)

//Returns answers for a given question
router.get('/:question_id/answers', controller.answers.get)

//Adds a question for the given product
router.post('', controller.questions.post)

//Adds an answer for the given question
router.post('/:question_id/answers', controller.answers.post)

//Updates a question to show it was found helpful
router.put('/:question_id/helpful', controller.questions.helpful)

//Updates a question to show it was reported.
router.put('/:question_id/report', controller.questions.report)

//Updates an answer to show it was found helpful.
router.put('/:answer_id/helpful', controller.answers.helpful)

//Updates an answer to show it has been reported
router.put('/:answer_id/report', controller.answers.report)


module.exports = router;
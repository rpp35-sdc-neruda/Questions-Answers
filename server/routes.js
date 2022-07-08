const questions = require('express').Router();
const answers = require('express').Router();
const controller = require('./controllers');


//Retrieves a list of questions for a particular product
questions.get('',  controller.questions.get)

//Returns answers for a given question
questions.get('/:question_id/answers', controller.answers.get)

//Adds a question for the given product
questions.post('', controller.questions.post)

//Adds an answer for the given question
questions.post('/:question_id/answers', controller.answers.post)

//Updates a question to show it was found helpful
questions.put('/:question_id/helpful', controller.questions.helpful)

//Updates a question to show it was reported.
questions.put('/:question_id/report', controller.questions.report)

//Updates an answer to show it was found helpful.
answers.put('/:answer_id/helpful', controller.answers.helpful)

//Updates an answer to show it has been reported
answers.put('/:answer_id/report', controller.answers.report)


module.exports.questions = questions;
module.exports.answers = answers;
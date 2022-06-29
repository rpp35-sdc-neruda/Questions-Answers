import mongoose from 'mongoose';
const { Schema } = mongoose;

const PhotosSchema = new Schema({
  url: String
})

const AnswerSchema = new Schema({
  answer_body: String,
  answer_date: Date,
  answerer_name: String,
  helpfulness: Boolean,
  photos: [PhotosSchema]
})


const QuestionsSchema = new Schema({
  question_body: String, // String is shorthand for {type: String}
  question_date: Date,
  asker_name: String,
  question_helpfulness: Boolean,
  reported: Boolean,
  answers: [AnswerSchema]
});
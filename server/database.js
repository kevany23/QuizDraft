const mongoose = require('mongoose');
const config = require('./config');
var Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

/*
Connection setup here
*/
mongoose.connect(config.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.set('useFindAndModify', false);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected");
});

/*
Database models here
*/

const QuizSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    default: ""
  },
});
const Quiz = mongoose.model('Quiz', QuizSchema, 'quizzes');

/**
 * Note: QuizQuestion is the whole 'question' object.
 * Question refers to what is being asked, 
 * aka what is to be answered
 */
const QuizQuestionSchema = new Schema({
  quizId: {
    type: ObjectId,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  answer : {
    type: String,
    default: ""
  }
});
const QuizQuestion = mongoose.model('QuizQuestion', QuizQuestionSchema, 'quizQuestions');

async function getQuizQuestions(quiz) {
  let id = quiz.id;
  let findResult = await QuizQuestion.find({ quizId: id });
  quiz.quizQuestions = findResult;
}

module.exports.Quiz = Quiz;
module.exports.QuizQuestion = QuizQuestion;
module.exports.getQuizQuestions = getQuizQuestions;
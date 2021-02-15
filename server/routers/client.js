/**
 * This is the router for rendering ejs pages from the client for
 * server testing pages.
 */

 const express = require('express');
 const Database = require('../models/database');
 const router = express.Router();

router.get('/', (req, res) => {
  res.render('home.ejs');
})

router.get('/quiz/:id', async (req, res) => {
  // lookup quiz info
  let id = req.params.id;
  try {
    let quiz = await Database.Quiz.findById(id);
    await Database.getQuizQuestions(quiz);
    if (!quiz) {
      throw new Error();
    }
    res.render('quiz.ejs', {quiz: quiz});
  } catch (err) {
    res.status(404).send("Not found.")
  }
})

router.post('/createQuiz', async (req, res) => {
  let { name, subject } = req.body;
  let quiz = Database.Quiz({
    name: name,
    subject: subject
  });
  try {
    let result = await quiz.save();
    console.dir(result);
    res.redirect('/client/quiz/' + result._id);
  } catch (err) {
    res.status(404).send("Quiz Creation Error");
  }
})

router.post('/editQuiz/:id', async (req, res) => {
  let id = req.params.id;
  let { name, subject } = req.body;
  try {
    let quizLookup = await Database.Quiz.findByIdAndUpdate(id, {
      name: name,
      subject: subject
    });
    res.redirect(`/client/quiz/${id}`);
  } catch(err) {
    res.status(404).send("Quiz Edit Error");
  }
})

router.post('/addQuestion/:id', async (req, res) => {
  let id = req.params.id;
  let { question, answer } = req.body;
  let quiz = await Database.Quiz.findById(id);
  let quizQuestion = new Database.QuizQuestion({
    quizId: id,
    question: question,
    answer: answer
  });
  try {
    let result = await quizQuestion.save();
  } catch(err) {
    res.status(404).send("Add question error");
  }
  res.redirect('back');
})

router.get('/getQuizzes', async (req, res) => {
  let quizList = await Database.Quiz.find();
  //console.log(quizList);
  try {
    res.render('quizlist.ejs', { quizList: quizList });
  } catch(err) {
    res.status(404).send("Not found");
  }
})

module.exports = router;
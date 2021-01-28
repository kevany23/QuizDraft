const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
console.log("PORT: " + port);
const Database = require('./database');
const client = require('./client');
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/client', client);

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.redirect('/client');
})

app.get('/quiz/:id', async (req, res) => {
  let id = req.params.id;
  try {
    let quiz = await Database.Quiz.findById(id);
    let questions = await Database.getQuizQuestions(quiz);
    res.status(200).json(quiz);
  } catch (err) {
    res.status(404).send("Quiz Not found.");
  }
})

app.get('/quizQuestions/:id', async (req, res) => {
  let id = req.params.id;
  try {
    let questionList = await Database.getQuizQuestionsById(id);
    res.status(200).json(questionList);
  } catch (err) {
    res.status(404).send("Quiz questions not found.");
  }
})

app.post('/createQuiz', async (req, res) => {
  let name = req.body.quizName;
  let subject = req.body.quizSubject;
  let quiz = Database.Quiz({
    name: name,
    subject: subject
  });
  try {
    let result = await quiz.save();
    res.status(200).json({
      id: result._id
    });
  } catch (err) {
    res.status(404).send("Quiz Creation Error");
  }
})

app.get('/quizList', async (req, res) => {
  let quizList = await Database.Quiz.find();
  try {
    res.status(200).send(quizList);
  } catch(err) {
    res.status(404).send("Not found");
  }
})

app.listen(port, () => {
  console.log("Server connected.")
});
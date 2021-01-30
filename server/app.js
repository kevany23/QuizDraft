const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
console.log("PORT: " + port);
const Database = require('./database');
const client = require('./client');
app.use(cors());
app.use(express.urlencoded({ extended: true }));
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
  } catch (err) {
    res.status(404).send("Not found");
  }
})

app.get('/searchQuiz', async (req, res) => {
  let query = req.query.query;
  var map = new Map();
  try {
    // search by both Quiz Name and subject
    // Map to prevent duplicates
    let nameSearch = await Database.Quiz.find({
      name: {
        $regex: query,
        $options: 'i'
      }
    });
    for (let quiz of nameSearch) {
      map.set(quiz._id.toString(), quiz);
    }
    let subjectSearch = await Database.Quiz.find({
      subject: {
        $regex: query,
        $options: 'i'
      }
    })
    for (let quiz of subjectSearch) {
      map.set(quiz._id.toString(), quiz)
    }
    let quizList = [];
    for (let value of map.values()) {
      quizList.push(value);
    }
    res.status(200).json(quizList);

  } catch (err) {
    res.status(404).send("Search error");
  }
})

app.post('/addQuestion/:id', async (req, res) => {
  try {
    let id = req.params.id;
    let { question, answer } = req.body;
    let quiz = await Database.Quiz.findById(id);
    let quizQuestion = new Database.QuizQuestion({
      quizId: id,
      question: question,
      answer: answer
    });
    await quizQuestion.save();
    res.status(200).send(quizQuestion);
  } catch (err) {
    res.status(404).send("Failed to add question");
  }
})

app.post('/editQuiz/:id', async (req, res) => {
  let id = req.params.id;
  let { name, subject } = req.body;
  try {
    let quizLookup = await Database.Quiz.findByIdAndUpdate(id, {
      name: name,
      subject: subject
    });
    res.status(200).send({
      name: name,
      subject: subject
    });
  } catch (err) {
    res.status(404).send("Quiz Edit Error");
  }
})

app.post('/editQuestion', async (req, res) => {
  try {
    let { id, question, answer } = req.body;
    let result = await Database.QuizQuestion.findByIdAndUpdate(id, {
      question: question,
      answer: answer,
    })
    res.status(200).send({ id, question, answer });
  } catch (err) {
    res.status(404).send("Question Edit Error");
  }
})

app.post('/deleteQuestion', async (req, res) => {
  try {
    let { id } = req.body;
    let result = await Database.QuizQuestion.findByIdAndDelete(id);
    res.status(200).send();
  } catch (err) {
    res.status(404).send("Question not found.");
  }
})

app.listen(port, () => {
  console.log("Server connected.")
});
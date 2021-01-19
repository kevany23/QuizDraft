const express = require('express');
const app = express();
const port = 3000;
const Database = require('./database');
app.use(express.urlencoded({extended: true}));

console.log(process.argv);
console.log(process.argv.length);

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('home.ejs');
})

app.get('/quiz/:id', async (req, res) => {
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

app.post('/createQuiz', async (req, res) => {
  let { name, subject } = req.body;
  let quiz = Database.Quiz({
    name: name,
    subject: subject
  });
  try {
    let result = await quiz.save();
    console.dir(result);
    res.redirect('/quiz/' + result._id);
  } catch (err) {
    res.status(404).send("Quiz Creation Error");
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
    res.redirect(`/quiz/${id}`);
  } catch(err) {
    res.status(404).send("Quiz Edit Error");
  }
})

app.post('/addQuestion/:id', async (req, res) => {
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

app.get('/getQuizzes', async (req, res) => {
  let quizList = await Database.Quiz.find();
  //console.log(quizList);
  try {
    res.render('quizlist.ejs', { quizList: quizList });
  } catch(err) {
    res.status(404).send("Not found");
  }
})

app.listen(port, () => {
  console.log("Server connected.")
});
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const auth = require('./auth');
const app = express();
const port = process.env.PORT || 3000;
const session = require('./session');
console.log("PORT: " + port);
const Database = require('./models/database');
const client = require('./routers/client');
const accountRouter = require('./routers/account');
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/client', client);
app.use('/account', accountRouter);

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

app.post('/login', async (req, res) => {
  try {
    let code = req.body.code;
    const result = await auth.oauth2Client.getToken({
      code,
      redirect_uri: 'postmessage'
    });
    const tokens = result.tokens;
    const { id_token } = tokens;
    let userLookup = await auth.exchangeUserInfo(id_token);
    let user = userLookup.data;
    let email = user.email;
    // Need to create/get account here
    // Lookup if account is created already
    let accountLookup = await Database.Account.findOne({ email });
    //console.log(accountLookup);
    //otherwise new account
    if (accountLookup == null) {
      let username = email.split('@')[0];
      let newAccount = new Database.Account({
        username: username,
        email: email,
      })
      let result = await newAccount.save();
      accountLookup = result;
      //console.log(result);
    }
    else {
      console.log("Account already created");
    }
    let session_token = auth.generateSessionToken();
    session.set(session_token, {
      email: email,
      accountId: accountLookup._id
    });
    res.status(200).send({ access_token: session_token });
  } catch (err) {
    console.log(err);
    res.status(404).send("Login Error");
  }
})

app.post('/testLogin', (req, res) => {
  try {
    let token = req.body.authorization;
    if (session.has(token)) {
      //console.log("Logged In");
      res.status(200).send("Logged In");
    } else {
      res.status(200).send("Not logged In");
    }
  } catch (err) {
    res.status(404).send("Invalid");
  }
})

app.listen(port, () => {
  console.log("Server connected.")
});
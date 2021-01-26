const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
console.log("PORT: " + port);
const Database = require('./database');
const client = require('./client');
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use('/client', client);

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.redirect('/client');
})

app.get('/quiz:id', (req, res) => {
  res.redirect('/');
})

app.listen(port, () => {
  console.log("Server connected.")
});
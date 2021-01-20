const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
console.log("PORT: " + port);
const Database = require('./database');
const client = require('./client');
app.use(express.urlencoded({extended: true}));
app.use('/client', client);

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.redirect('/client');
})

app.listen(port, () => {
  console.log("Server connected.")
});
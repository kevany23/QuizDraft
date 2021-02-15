const mongoose = require('mongoose');
//const config = require('./config');
var Schema = mongoose.Schema;
//const ObjectId = mongoose.ObjectId;

const AccountSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  }
});

const Account = mongoose.model('Account', AccountSchema, 'accounts');

module.exports.Account = Account;
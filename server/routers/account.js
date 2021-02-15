const express = require('express');
const Database = require('../models/database');
const Account = require('../models/account');
const session = require('../session');
const router = express.Router();

router.post('/profile', async (req, res) => {
  // Check session token to get account
  try {
    let token = req.body.authorization;
    let userId = session.get(token).accountId;
    if (! userId) {
      throw Error("Not logged in");
    }
    let accountLookup = await Database.Account.findById(userId);
    //console.log(accountLookup);
    res.status(200).send({
      username: accountLookup.username,
      email: accountLookup.email
    });
  } catch(err) {
    //console.log(err);
    res.status(404).send("Profile not found.")
  }
})

module.exports = router;
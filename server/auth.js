const { google } = require('googleapis');
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = require('./config/config');
const https = require('https');
const axios = require('axios');

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  'postmessage'
);

async function exchangeUserInfo(access_token) {
  try {
    let lookup = await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${access_token}`);
    //console.log(lookup);
    return lookup;
  } catch(err) {
    console.log(err);
    return null;
  }
}

function generateSessionToken() {
  let token = [];
  token.length = 32;
  for (let i = 0; i < 32; i++) {
    token[i] = String.fromCharCode(Math.random() * (126 - 48) + 48)
  }
  return token.join('');
}

module.exports.oauth2Client = oauth2Client;
module.exports.exchangeUserInfo = exchangeUserInfo;
module.exports.generateSessionToken = generateSessionToken;